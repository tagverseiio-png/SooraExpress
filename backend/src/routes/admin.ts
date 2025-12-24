import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorizeRole, AuthRequest } from '../middleware/auth';
import { validators } from '../middleware/validators';
import { validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();

// All admin routes require authentication and ADMIN role
router.use(authenticate);
router.use(authorizeRole('ADMIN'));

// ===== PRODUCTS MANAGEMENT =====

// Create product
router.post('/products', validators.createProduct, async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await prisma.product.create({
      data: {
        ...req.body,
        slug: req.body.name.toLowerCase().replace(/\s+/g, '-'),
      },
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/products/:id', async (req: AuthRequest, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/products/:id', async (req: AuthRequest, res) => {
  try {
    await prisma.product.update({
      where: { id: req.params.id },
      data: { isActive: false },
    });

    res.json({ message: 'Product deactivated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update stock
router.put('/products/:id/stock', async (req: AuthRequest, res) => {
  try {
    const { stock } = req.body;

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { stock },
    });

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ORDERS MANAGEMENT =====

// Get all orders
router.get('/orders', async (req: AuthRequest, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: {
            select: { name: true, email: true, phone: true },
          },
          items: {
            include: { product: true },
          },
          address: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { 
        status,
        ...(status === 'DELIVERED' && { deliveredAt: new Date() }),
      },
      include: {
        items: true,
        user: true,
      },
    });

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ===== USERS MANAGEMENT =====

// Get all users
router.get('/users', async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: Number(limit),
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          tier: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: { orders: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update user tier
router.put('/users/:id/tier', async (req: AuthRequest, res) => {
  try {
    const { tier } = req.body;

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { tier },
      select: {
        id: true,
        email: true,
        name: true,
        tier: true,
      },
    });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ANALYTICS =====

// Get dashboard stats
router.get('/stats', async (req: AuthRequest, res) => {
  try {
    const [
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalUsers,
      lowStockProducts,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({
        where: { status: { in: ['DELIVERED', 'CONFIRMED'] } },
        _sum: { total: true },
      }),
      prisma.user.count(),
      prisma.product.count({
        where: {
          stock: { lte: prisma.product.fields.lowStockAlert },
        },
      }),
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalUsers,
      lowStockProducts,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get sales report
router.get('/reports/sales', async (req: AuthRequest, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where: any = {
      status: { in: ['DELIVERED', 'CONFIRMED'] },
    };

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalRevenue / totalOrders || 0;

    res.json({
      totalRevenue,
      totalOrders,
      averageOrderValue,
      orders,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
