# Soora Liquor Backend API

Backend API for Soora - Quick Commerce Liquor Delivery Platform (Singapore)

## 🚀 Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe (SGD)
- **Delivery**: Lalamove API (Singapore)
- **Authentication**: JWT
- **Caching**: Redis (optional)

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── routes/                # API routes
│   │   ├── auth.ts           # Authentication endpoints
│   │   ├── products.ts       # Product catalog
│   │   ├── orders.ts         # Order management
│   │   ├── users.ts          # User profile & addresses
│   │   ├── payments.ts       # Stripe integration
│   │   ├── delivery.ts       # Lalamove integration
│   │   └── admin.ts          # Admin panel endpoints
│   ├── services/             # Business logic
│   │   ├── stripe.service.ts # Payment processing
│   │   └── lalamove.service.ts # Delivery management
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts          # JWT authentication
│   │   ├── errorHandler.ts # Error handling
│   │   └── validators.ts    # Request validation
│   └── server.ts            # Express server setup
├── .env.example             # Environment variables template
├── package.json
└── tsconfig.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `STRIPE_SECRET_KEY`: Stripe API key
- `LALAMOVE_API_KEY`: Lalamove API key
- `LALAMOVE_API_SECRET`: Lalamove API secret

### 3. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run seed
```

### 4. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - List all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/categories/list` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/addresses` - List addresses
- `POST /api/users/addresses` - Create address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address

### Payments (Stripe)
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/webhook` - Stripe webhook handler

### Delivery (Lalamove)
- `POST /api/delivery/quote` - Get delivery quotation
- `POST /api/delivery/create` - Create delivery order
- `GET /api/delivery/track/:orderId` - Track delivery
- `GET /api/delivery/driver/:orderId` - Get driver location

### Admin (Requires ADMIN role)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - List all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - List all users
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/reports/sales` - Sales report

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 💳 Stripe Integration (Singapore)

- Currency: SGD
- Payment methods: Cards, Apple Pay, Google Pay
- Webhook URL: `POST /api/payments/webhook`
- Test mode supported

## 🚚 Lalamove Integration (Singapore)

- Service types: Motorcycle, Car, Van
- Real-time tracking
- Driver location updates
- Automatic quotation calculation

## 📊 Database Models

Key models:
- **User**: Customer accounts with role-based access
- **Product**: Liquor products with inventory
- **Order**: Customer orders with items
- **Address**: Delivery addresses
- **Category**: Product categories
- **Review**: Product reviews
- **DeliveryZone**: Singapore delivery zones
- **Promotion**: Discount codes

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📦 Deployment

### Production Build

```bash
npm run build
npm start
```

### Recommended Platforms
- **API**: Railway, Render, DigitalOcean
- **Database**: Railway PostgreSQL, Neon
- **Redis**: Upstash, Redis Cloud

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Age verification (18+)
- ✅ Input validation
- ✅ CORS protection
- ✅ Rate limiting (recommended)
- ✅ Webhook signature verification

## 📝 Notes

- All prices in SGD
- Age verification required for alcohol purchases
- Business hours: 10:00 - 23:00 (configurable)
- Minimum order: S$50
- Free delivery on orders above S$100
- Default delivery time: 30 minutes

## 🆘 Support

For issues or questions, contact the development team.

## 📄 License

Private - All Rights Reserved
