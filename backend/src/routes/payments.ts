import { Router, Request, Response } from 'express';
import { stripeService } from '../services/stripe.service';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Create payment intent
router.post('/create-intent', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== req.user!.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const paymentIntent = await stripeService.createPaymentIntent(
      order.total,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: req.user!.id,
      }
    );

    // Update order with payment intent ID
    await prisma.order.update({
      where: { id: orderId },
      data: { stripePaymentId: paymentIntent.id },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Stripe webhook
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripeService.verifyWebhookSignature(
      req.body,
      sig
    );

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        // Update order status
        await prisma.order.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: {
            paymentStatus: 'COMPLETED',
            status: 'CONFIRMED',
          },
        });
        
        console.log('Payment succeeded:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        
        await prisma.order.updateMany({
          where: { stripePaymentId: failedPayment.id },
          data: {
            paymentStatus: 'FAILED',
          },
        });
        
        console.log('Payment failed:', failedPayment.id);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

export default router;
