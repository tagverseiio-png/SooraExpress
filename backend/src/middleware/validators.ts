import { body, param, query, ValidationChain } from 'express-validator';

export const validators = {
  // Auth validators
  register: [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').optional().trim().isLength({ min: 2 }),
    body('phone').optional().matches(/^(\+65)?[689]\d{7}$/),
    body('dateOfBirth').optional().isISO8601(),
  ],

  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],

  // Product validators
  createProduct: [
    body('name').trim().isLength({ min: 3 }),
    body('brand').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('category').notEmpty(),
    body('volume').notEmpty(),
    body('abv').notEmpty(),
    body('stock').isInt({ min: 0 }),
  ],

  // Order validators
  createOrder: [
    body('addressId').isUUID(),
    body('paymentMethod').isIn(['STRIPE', 'CASH_ON_DELIVERY']),
    body('items').isArray({ min: 1 }),
    body('items.*.productId').isUUID(),
    body('items.*.quantity').isInt({ min: 1 }),
  ],

  // Address validators
  createAddress: [
    body('street').trim().notEmpty(),
    body('postalCode').matches(/^\d{6}$/),
    body('district').trim().notEmpty(),
    body('type').isIn(['Home', 'Work', 'Other']),
  ],

  // Pagination
  pagination: [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
};
