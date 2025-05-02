
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ShoppingBag, Package, User } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // This would normally come from your API
  const stats = {
    revenue: 12450,
    orders: 42,
    products: 24,
    customers: 156
  };

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
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
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
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{1000 + order}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(2023, 5, order).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded">
                      Completed
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
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
              {["Custom T-Shirt", "Hoodie", "Cap", "Long Sleeve Shirt", "Sweatshirt"].map((product, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-gray-200 mr-3"></div>
                    <p className="font-medium">{product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 40 + 10).toFixed(2)}</p>
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