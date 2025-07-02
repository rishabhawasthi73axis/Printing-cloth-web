
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ShoppingBag, Package, User, Users, Heart, IndianRupee } from 'lucide-react';
import { getProducts } from '@/services/productService';
import { getOrders } from '@/services/orderService';
import { getUsers } from '@/services/authService';
import { formatCurrency } from '@/utils/currencyFormatter';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0,
    activeUsers: 0,
    favorites: 10
  });

  useEffect(() => {
    // Load data when component mounts
    const loadData = () => {
      try {
        const orders = getOrders();
        const products = getProducts();
        const users = getUsers();
        
        // Calculate total revenue from orders
        const revenue = orders.reduce((total, order) => total + order.total, 0);
        
        // For demonstration purposes, we'll simulate active users and favorites counts
        const activeUsers = Math.floor(users.length * 0.7); // 70% of users are "active"
        
        setStats({
          revenue,
          orders: orders.length,
          products: products.length,
          customers: users.filter(user => !user.isAdmin).length,
          activeUsers,
          favorites: orders.reduce((total, order) => total + (order.items ? order.items.length : 0), 0)
        });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <IndianRupee className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.revenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center space-x-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />18.2%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-cyan-600" />
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
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <Package className="h-4 w-4 text-indigo-600" />
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
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-teal-600" />
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
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <User className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground flex items-center space-x-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />5.7%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <p className="text-xs text-muted-foreground flex items-center space-x-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />14.3%
              </span>
              <span>from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
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
                    <p className="font-medium">{formatCurrency(product.price)}</p>
                    <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100)} views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;