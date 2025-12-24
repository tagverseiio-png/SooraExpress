import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

interface LalamoveLocation {
  lat: string;
  lng: string;
  address: string;
}

interface LalamoveStop {
  location: LalamoveLocation;
  name?: string;
  phone?: string;
  remarks?: string;
}

interface LalamoveQuoteRequest {
  serviceType: string;
  stops: LalamoveStop[];
  deliveryTime?: string;
}

interface LalamoveOrderRequest extends LalamoveQuoteRequest {
  quotedTotalFee: {
    amount: string;
    currency: string;
  };
  sender: {
    name: string;
    phone: string;
  };
  recipients: Array<{
    name: string;
    phone: string;
    remarks?: string;
  }>;
}

export class LalamoveService {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;
  private market: string;
  private client: AxiosInstance;

  constructor() {
    this.apiKey = process.env.LALAMOVE_API_KEY!;
    this.apiSecret = process.env.LALAMOVE_API_SECRET!;
    this.baseUrl = process.env.LALAMOVE_BASE_URL || 'https://rest.lalamove.com';
    this.market = process.env.LALAMOVE_MARKET || 'SG';

    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
    });
  }

  /**
   * Generate signature for Lalamove API authentication
   */
  private generateSignature(
    timestamp: string,
    method: string,
    path: string,
    body: string = ''
  ): string {
    const rawSignature = `${timestamp}\r\n${method}\r\n${path}\r\n\r\n${body}`;
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(rawSignature)
      .digest('hex');
  }

  /**
   * Get delivery quotation
   */
  async getQuotation(request: LalamoveQuoteRequest) {
    try {
      const timestamp = Date.now().toString();
      const method = 'POST';
      const path = `/v3/quotations`;
      const body = JSON.stringify(request);

      const signature = this.generateSignature(timestamp, method, path, body);

      const response = await this.client.post(path, request, {
        headers: {
          'Authorization': `hmac ${this.apiKey}:${timestamp}:${signature}`,
          'Content-Type': 'application/json',
          'Market': this.market,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Lalamove quotation error:', error.response?.data || error.message);
      throw new Error(`Failed to get delivery quotation: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Create delivery order
   */
  async createOrder(request: LalamoveOrderRequest) {
    try {
      const timestamp = Date.now().toString();
      const method = 'POST';
      const path = `/v3/orders`;
      const body = JSON.stringify(request);

      const signature = this.generateSignature(timestamp, method, path, body);

      const response = await this.client.post(path, request, {
        headers: {
          'Authorization': `hmac ${this.apiKey}:${timestamp}:${signature}`,
          'Content-Type': 'application/json',
          'Market': this.market,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Lalamove order creation error:', error.response?.data || error.message);
      throw new Error(`Failed to create delivery order: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get order details
   */
  async getOrderDetails(orderId: string) {
    try {
      const timestamp = Date.now().toString();
      const method = 'GET';
      const path = `/v3/orders/${orderId}`;

      const signature = this.generateSignature(timestamp, method, path);

      const response = await this.client.get(path, {
        headers: {
          'Authorization': `hmac ${this.apiKey}:${timestamp}:${signature}`,
          'Market': this.market,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Lalamove order details error:', error.response?.data || error.message);
      throw new Error(`Failed to get order details: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Cancel delivery order
   */
  async cancelOrder(orderId: string) {
    try {
      const timestamp = Date.now().toString();
      const method = 'PUT';
      const path = `/v3/orders/${orderId}/cancel`;

      const signature = this.generateSignature(timestamp, method, path);

      const response = await this.client.put(
        path,
        {},
        {
          headers: {
            'Authorization': `hmac ${this.apiKey}:${timestamp}:${signature}`,
            'Market': this.market,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Lalamove order cancellation error:', error.response?.data || error.message);
      throw new Error(`Failed to cancel order: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get driver location
   */
  async getDriverLocation(orderId: string) {
    try {
      const timestamp = Date.now().toString();
      const method = 'GET';
      const path = `/v3/orders/${orderId}/drivers`;

      const signature = this.generateSignature(timestamp, method, path);

      const response = await this.client.get(path, {
        headers: {
          'Authorization': `hmac ${this.apiKey}:${timestamp}:${signature}`,
          'Market': this.market,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Lalamove driver location error:', error.response?.data || error.message);
      throw new Error(`Failed to get driver location: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Calculate delivery estimate for Singapore
   */
  async getDeliveryEstimate(
    pickupLat: number,
    pickupLng: number,
    dropoffLat: number,
    dropoffLng: number,
    pickupAddress: string,
    dropoffAddress: string
  ) {
    const request: LalamoveQuoteRequest = {
      serviceType: 'MOTORCYCLE', // Options: MOTORCYCLE, CAR, VAN
      stops: [
        {
          location: {
            lat: pickupLat.toString(),
            lng: pickupLng.toString(),
            address: pickupAddress,
          },
        },
        {
          location: {
            lat: dropoffLat.toString(),
            lng: dropoffLng.toString(),
            address: dropoffAddress,
          },
        },
      ],
    };

    return this.getQuotation(request);
  }
}

export const lalamoveService = new LalamoveService();
