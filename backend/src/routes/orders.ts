import { Router, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validators } from '../middleware/validators';
import { validationResult } from 'express-validator';
import { stripeService } from '../services/stripe.service';
import { lalamoveService } from '../services/lalamove.service';
import { ParamsDictionary } from 'express-serve-static-core';

const router = Router();
const prisma = new PrismaClient();

type PaymentMethod = 'STRIPE' | 'CASH_ON_DELIVERY';

interface OrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderBody {
  addressId: string;
  items: OrderItemInput[];
  paymentMethod: PaymentMethod;
  deliveryNotes?: string;
}

interface CancelOrderBody {
  reason?: string;
}

// Create order
router.post(
  '/',
  authenticate,
  validators.createOrder,
  async (
    req: AuthRequest<ParamsDictionary, any, CreateOrderBody>,
    res: Response
  ) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { addressId, items, paymentMethod, deliveryNotes } = req.body;
    const userId = req.user!.id;

    // Get address
    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // Calculate order totals
    let subtotal = 0;
    const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}` 
        });
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product: {
          connect: { id: product.id },
        },
        productName: product.name,
        brand: product.brand ?? null,
        volume: product.volume ?? null,
        price: product.price,
        quantity: item.quantity,
        subtotal: itemSubtotal,
      });
    }

    // Calculate delivery fee
    const deliveryFee =
      subtotal >= Number(process.env.FREE_DELIVERY_THRESHOLD ?? 100)
        ? 0
        : Number(process.env.DELIVERY_FEE ?? 5);

    const total = subtotal + deliveryFee;

    // Get user details
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // Generate order number
    const orderNumber = `SG-${Date.now().toString().slice(-8)}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        addressId,
        status: 'PENDING',
        paymentMethod,
        paymentStatus: paymentMethod === 'CASH_ON_DELIVERY' ? 'PENDING' : 'PROCESSING',
        subtotal,
        deliveryFee,
        total,
        customerName: user!.name || '',
        customerPhone: user!.phone || '',
        customerEmail: user!.email,
        deliveryNotes,
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
        address: true,
      },
    });

    // Create Stripe payment intent if paying online
    let paymentIntent: Awaited<ReturnType<typeof stripeService.createPaymentIntent>> | null = null;
    if (paymentMethod === 'STRIPE') {
      paymentIntent = await stripeService.createPaymentIntent(total, {
        orderId: order.id,
        orderNumber: order.orderNumber,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripePaymentId: paymentIntent.id },
      });
    }

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { 
          stock: { decrement: item.quantity },
          salesCount: { increment: item.quantity }
        },
      });
    }

    res.status(201).json({
      order,
      ...(paymentIntent && {
        clientSecret: paymentIntent.client_secret,
      }),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Get user orders
router.get('/my-orders', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                images: true,
                thumbnail: true,
              },
            },
          },
        },
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get(
  '/:id',
  authenticate,
  async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        address: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check authorization
    if (order.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Cancel order
router.put(
  '/:id/cancel',
  authenticate,
  async (
    req: AuthRequest<{ id: string }, any, CancelOrderBody>,
    res: Response
  ) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== req.user!.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      return res.status(400).json({ error: 'Order cannot be cancelled' });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        status: 'CANCELLED',
        cancelReason: req.body.reason || 'Customer requested cancellation',
      },
    });

    // Restore product stock
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { 
          stock: { increment: item.quantity },
          salesCount: { decrement: item.quantity }
        },
      });
    }

    // Cancel Lalamove delivery if exists
    if (order.lalamoveOrderId) {
      await lalamoveService.cancelOrder(order.lalamoveOrderId);
    }

    res.json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }
);

export default router;
