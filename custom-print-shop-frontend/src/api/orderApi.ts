
import { fetchApi } from './apiClient';

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
    return orders.map(order => ({
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0]
    }));
  },

  // Get order by ID
  async getOrderById(id: string): Promise<Order> {
    const order = await fetchApi<Order>(`/orders/${id}`);
    return {
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0]
    };
  },

  // Add a new order
  async addOrder(orderData: CreateOrderInput): Promise<Order> {
    const order = await fetchApi<Order>('/orders', {
      method: 'POST',
      body: orderData,
    });
    
    return {
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0]
    };
  },

  // Update order status
  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const order = await fetchApi<Order>(`/orders/${id}/status`, {
      method: 'PUT',
      body: { status },
    });
    
    return {
      ...order,
      date: new Date(order.date || Date.now()).toISOString().split('T')[0]
    };
  }
};