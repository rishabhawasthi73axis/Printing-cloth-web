
import { fetchApi } from './apiClient';
import { convertUSDtoINR, formatCurrency } from '@/utils/currencyFormatter';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date?: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'In Processing' | 'Shipped' | 'Delivered' | 'Canceled';
}

export interface CreateOrderInput {
  customer: string;
  email: string;
  items: OrderItem[];
  total: number;
}

// Order API methods
export const orderApi = {
  // Get all orders
  async getOrders(): Promise<Order[]> {
    const orders = await fetchApi<Order[]>('/orders');
    
    // Convert all prices to INR and format dates
    return orders.map(order => ({
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0],
      total: convertUSDtoINR(order.total),
      items: order.items.map(item => ({
        ...item,
        price: convertUSDtoINR(item.price)
      }))
    }));
  },

  // Get order by ID
  async getOrderById(id: string): Promise<Order> {
    const order = await fetchApi<Order>(`/orders/${id}`);
    
    // Convert all prices to INR
    return {
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0],
      total: convertUSDtoINR(order.total),
      items: order.items.map(item => ({
        ...item,
        price: convertUSDtoINR(item.price)
      }))
    };
  },

  // Add a new order
  async addOrder(orderData: CreateOrderInput): Promise<Order> {
    const order = await fetchApi<Order>('/orders', {
      method: 'POST',
      body: orderData,
    });
    
    // Convert all prices to INR
    return {
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0],
      total: convertUSDtoINR(order.total),
      items: order.items.map(item => ({
        ...item,
        price: convertUSDtoINR(item.price)
      }))
    };
  },

  // Update order status
  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const order = await fetchApi<Order>(`/orders/${id}/status`, {
      method: 'PUT',
      body: { status },
    });
    
    // Convert all prices to INR
    return {
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0],
      total: convertUSDtoINR(order.total),
      items: order.items.map(item => ({
        ...item,
        price: convertUSDtoINR(item.price)
      }))
    };
  }
};