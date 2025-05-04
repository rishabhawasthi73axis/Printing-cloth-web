
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
  
  // Sample orders
  const sampleOrders: Order[] = [
    { 
      id: "#ORD-1001",
      customer: "John Smith",
      email: "john@example.com",
      date: "2023-05-14",
      items: [
        { name: "Custom T-Shirt", quantity: 2, price: 19.99 },
        { name: "Custom Cap", quantity: 1, price: 14.99 }
      ],
      total: 54.97,
      status: "Delivered"
    },
    { 
      id: "#ORD-1002",
      customer: "Jane Doe",
      email: "jane@example.com",
      date: "2023-05-15",
      items: [
        { name: "Hoodie", quantity: 1, price: 39.99 }
      ],
      total: 39.99,
      status: "In Processing"
    },
    { 
      id: "#ORD-1003",
      customer: "Robert Johnson",
      email: "robert@example.com",
      date: "2023-05-16",
      items: [
        { name: "Long Sleeve Shirt", quantity: 1, price: 24.99 },
        { name: "Custom T-Shirt", quantity: 3, price: 19.99 }
      ],
      total: 84.96,
      status: "Shipped"
    },
    { 
      id: "#ORD-1004",
      customer: "Sarah Williams",
      email: "sarah@example.com",
      date: "2023-05-17",
      items: [
        { name: "Custom Cap", quantity: 2, price: 14.99 }
      ],
      total: 29.98,
      status: "Pending"
    }
  ];
  
  // Initialize orders in localStorage if not exists
  const initializeOrders = (): void => {
    const orders = localStorage.getItem('orders');
    if (!orders) {
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
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