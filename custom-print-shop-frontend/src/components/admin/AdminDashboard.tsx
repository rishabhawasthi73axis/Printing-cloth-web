
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ShoppingBag, Package, User } from 'lucide-react';
import { getProducts } from '@/services/productService';
import { getOrders } from '@/services/orderService';
import { getUsers } from '@/services/authService';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0
  });

  useEffect(() => {
    // Load data when component mounts
    const loadData = () => {
      const orders = getOrders();
      const products = getProducts();
      const users = getUsers();
      
      // Calculate total revenue from orders
      const revenue = orders.reduce((total, order) => total + order.total, 0);
      
      setStats({
        revenue,
        orders: orders.length,
        products: products.length,
        customers: users.filter(user => !user.isAdmin).length
      });
    };
    
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary">$</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground flex items-center space-x-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />18.2%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground flex items-center space-x-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />12.5%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
            <p className="text-xs text-muted-foreground flex items-center space-x-1">
              <span className="text-red-500 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />4.3%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <p className="text-xs text-muted-foreground flex items-center space-x-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />9.2%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getOrders().slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div>
                    <span className={`${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} text-xs px-2.5 py-0.5 rounded`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <button className="text-primary text-sm hover:underline">View all orders</button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>Top selling items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getProducts().slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-200 mr-3"></div>
                    <p className="font-medium">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100)} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <button className="text-primary text-sm hover:underline">View all products</button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;