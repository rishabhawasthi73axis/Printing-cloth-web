
// Order management service using localStorage

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'In Processing' | 'Shipped' | 'Delivered' | 'Canceled';
}

// Initialize orders in localStorage if not exists (without demo data)
const initializeOrders = (): void => {
  const orders = localStorage.getItem('orders');
  if (!orders) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
};

// Get all orders
export const getOrders = (): Order[] => {
  initializeOrders();
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

// Get order by ID
export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === id);
};

// Add a new order
export const addOrder = (order: Omit<Order, 'id' | 'date'>): Order => {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: `#ORD-${1000 + orders.length + 1}`,
    date: new Date().toISOString().split('T')[0]
  };
  
  localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
  return newOrder;
};

// Update order status
export const updateOrderStatus = (id: string, status: Order['status']): Order | undefined => {
  const orders = getOrders();
  const index = orders.findIndex(order => order.id === id);
  
  if (index === -1) {
    return undefined;
  }
  
  orders[index] = {
    ...orders[index],
    status
  };
  
  localStorage.setItem('orders', JSON.stringify(orders));
  return orders[index];
};