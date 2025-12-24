import { Router } from 'express';
import { lalamoveService } from '../services/lalamove.service';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorizeRole, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get delivery quotation
router.post('/quote', authenticate, async (req: AuthRequest, res) => {
  try {
    const { addressId } = req.body;

    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    if (!address.latitude || !address.longitude) {
      return res.status(400).json({ 
        error: 'Address coordinates not available. Please update address.' 
      });
    }

    // Store/warehouse location (you should set this in env or database)
    const storeLocation = {
      lat: 1.3521, // Example: Singapore Central
      lng: 103.8198,
      address: 'Soora Warehouse, Singapore',
    };

    const quotation = await lalamoveService.getDeliveryEstimate(
      storeLocation.lat,
      storeLocation.lng,
      address.latitude,
      address.longitude,
      storeLocation.address,
      `${address.street}, Singapore ${address.postalCode}`
    );

    res.json(quotation);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create delivery order (Admin only)
router.post('/create', authenticate, authorizeRole('ADMIN'), async (req: AuthRequest, res) => {
  try {
    const { orderId } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        address: true,
        user: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!order.address.latitude || !order.address.longitude) {
      return res.status(400).json({ 
        error: 'Address coordinates not available' 
      });
    }

    // Store location
    const storeLocation = {
      lat: '1.3521',
      lng: '103.8198',
      address: 'Soora Warehouse, Singapore',
    };

    // Get quotation first
    const quotation = await lalamoveService.getDeliveryEstimate(
      parseFloat(storeLocation.lat),
      parseFloat(storeLocation.lng),
      order.address.latitude,
      order.address.longitude,
      storeLocation.address,
      `${order.address.street}, Singapore ${order.address.postalCode}`
    );

    // Create delivery order
    const deliveryOrder = await lalamoveService.createOrder({
      serviceType: 'MOTORCYCLE',
      stops: [
        {
          location: {
            lat: storeLocation.lat,
            lng: storeLocation.lng,
            address: storeLocation.address,
          },
          name: 'Soora Store',
          phone: process.env.STORE_PHONE || '+6512345678',
        },
        {
          location: {
            lat: order.address.latitude.toString(),
            lng: order.address.longitude.toString(),
            address: `${order.address.street}, Singapore ${order.address.postalCode}`,
          },
          name: order.customerName,
          phone: order.customerPhone,
          remarks: order.deliveryNotes || '',
        },
      ],
      quotedTotalFee: quotation.quotedTotalFee,
      sender: {
        name: 'Soora Store',
        phone: process.env.STORE_PHONE || '+6512345678',
      },
      recipients: [
        {
          name: order.customerName,
          phone: order.customerPhone,
          remarks: order.deliveryNotes || '',
        },
      ],
    });

    // Update order with Lalamove details
    await prisma.order.update({
      where: { id: orderId },
      data: {
        lalamoveOrderId: deliveryOrder.orderId,
        lalamoveStatus: deliveryOrder.status,
        status: 'OUT_FOR_DELIVERY',
      },
    });

    res.json(deliveryOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get delivery status
router.get('/track/:orderId', authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.orderId },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!order.lalamoveOrderId) {
      return res.status(400).json({ error: 'No delivery assigned yet' });
    }

    const deliveryStatus = await lalamoveService.getOrderDetails(order.lalamoveOrderId);

    res.json(deliveryStatus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get driver location
router.get('/driver/:orderId', authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.orderId },
    });

    if (!order || !order.lalamoveOrderId) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (order.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const driverLocation = await lalamoveService.getDriverLocation(order.lalamoveOrderId);

    res.json(driverLocation);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
