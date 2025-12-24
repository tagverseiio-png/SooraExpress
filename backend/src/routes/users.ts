import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validators } from '../middleware/validators';
import { validationResult } from 'express-validator';
import { ParamsDictionary } from 'express-serve-static-core';

const router = Router();
const prisma = new PrismaClient();

interface UpdateProfileBody {
  name?: string;
  phone?: string;
}

interface AddressPayload {
  type: string;
  name: string;
  street: string;
  unit?: string;
  building?: string;
  postalCode: string;
  district: string;
  isDefault?: boolean;
  deliveryNotes?: string;
}

// Get user profile
router.get('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        tier: true,
        dateOfBirth: true,
        ageVerified: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put(
  '/profile',
  authenticate,
  async (req: AuthRequest<ParamsDictionary, any, UpdateProfileBody>, res: Response) => {
  try {
    const { name, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { name, phone },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        tier: true,
      },
    });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Get user addresses
router.get('/addresses', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user!.id },
      orderBy: { isDefault: 'desc' },
    });

    res.json(addresses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create address
router.post(
  '/addresses',
  authenticate,
  validators.createAddress,
  async (
    req: AuthRequest<ParamsDictionary, any, AddressPayload>,
    res: Response
  ) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, name, street, unit, building, postalCode, district, isDefault, deliveryNotes } = req.body;

    // If setting as default, remove default from other addresses
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user!.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: req.user!.id,
        type,
        name,
        street,
        unit,
        building,
        postalCode,
        district,
        isDefault: isDefault || false,
        deliveryNotes,
      },
    });

    res.status(201).json(address);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Update address
router.put(
  '/addresses/:id',
  authenticate,
  async (
    req: AuthRequest<{ id: string }, any, AddressPayload>,
    res: Response
  ) => {
  try {
    const { type, name, street, unit, building, postalCode, district, isDefault, deliveryNotes } = req.body;

    // Check ownership
    const existing = await prisma.address.findUnique({
      where: { id: req.params.id },
    });

    if (!existing || existing.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // If setting as default, remove default from other addresses
    if (isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: req.user!.id, 
          isDefault: true,
          id: { not: req.params.id }
        },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id: req.params.id },
      data: {
        type,
        name,
        street,
        unit,
        building,
        postalCode,
        district,
        isDefault,
        deliveryNotes,
      },
    });

    res.json(address);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Delete address
router.delete(
  '/addresses/:id',
  authenticate,
  async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const existing = await prisma.address.findUnique({
      where: { id: req.params.id },
    });

    if (!existing || existing.userId !== req.user!.id) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await prisma.address.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Address deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  }
);

export default router;
