import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export class StripeService {
  /**
   * Create a payment intent for Singapore (SGD)
   */
  async createPaymentIntent(amount: number, metadata: any = {}) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'sgd',
        metadata: {
          region: 'Singapore',
          ...metadata
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error: any) {
      throw new Error(`Stripe payment intent creation failed: ${error.message}`);
    }
  }

  /**
   * Confirm a payment intent
   */
  async confirmPaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
      return paymentIntent;
    } catch (error: any) {
      throw new Error(`Payment confirmation failed: ${error.message}`);
    }
  }

  /**
   * Retrieve payment intent
   */
  async getPaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error: any) {
      throw new Error(`Failed to retrieve payment: ${error.message}`);
    }
  }

  /**
   * Create a refund
   */
  async createRefund(paymentIntentId: string, amount?: number) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
      });

      return refund;
    } catch (error: any) {
      throw new Error(`Refund failed: ${error.message}`);
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(email: string, name?: string, phone?: string) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        phone,
        metadata: {
          region: 'Singapore'
        }
      });

      return customer;
    } catch (error: any) {
      throw new Error(`Customer creation failed: ${error.message}`);
    }
  }

  /**
   * Update customer
   */
  async updateCustomer(customerId: string, data: any) {
    try {
      const customer = await stripe.customers.update(customerId, data);
      return customer;
    } catch (error: any) {
      throw new Error(`Customer update failed: ${error.message}`);
    }
  }

  /**
   * Create a payment method for saved cards
   */
  async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    try {
      const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      return paymentMethod;
    } catch (error: any) {
      throw new Error(`Payment method attachment failed: ${error.message}`);
    }
  }

  /**
   * List customer payment methods
   */
  async listPaymentMethods(customerId: string) {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return paymentMethods;
    } catch (error: any) {
      throw new Error(`Failed to list payment methods: ${error.message}`);
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string | Buffer, signature: string) {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      return event;
    } catch (error: any) {
      throw new Error(`Webhook signature verification failed: ${error.message}`);
    }
  }
}

export const stripeService = new StripeService();
