import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validators } from '../middleware/validators';

const router = Router();
const prisma = new PrismaClient();

interface ProductQuery {
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// Get all products with filters
router.get('/', validators.pagination, async (req: Request<unknown, unknown, unknown, ProductQuery>, res: Response) => {
  try {
    const { 
      category, 
      brand, 
      minPrice, 
      maxPrice, 
      search, 
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { isActive: true };

    if (category && category !== 'All') {
      where.category = category;
    }

    if (brand) {
      where.brand = brand;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { brand: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { [sortBy as string]: order },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
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

// Get single product
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        reviews: {
          where: { isPublished: true },
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment view count
    await prisma.product.update({
      where: { id: req.params.id },
      data: { viewCount: { increment: 1 } },
    });

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured products
router.get('/featured/list', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      take: 12,
      orderBy: { salesCount: 'desc' },
    });

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/categories/list', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
