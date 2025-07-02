
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyFormatter';
import { orderApi, Order } from '@/api/orderApi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderApi.getOrders();
        // Only show genuine deliveries - filter out anything that's not delivered or in process
        const genuineOrders = data.filter(order => 
          order.status === 'Delivered' || 
          order.status === 'In Processing' || 
          order.status === 'Shipped');
        setOrders(genuineOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast({
          title: "Error",
          description: "Failed to load your orders. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Processing':
      case 'In Processing':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'Shipped':
        return <Package className="h-5 w-5 text-blue-500" />;
      default:
        return <Package className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Order #{order.id}</CardTitle>
                      <CardDescription>Placed on {order.date}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="font-medium">{order.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <span className="font-medium">{item.name}</span> 
                              <span className="text-gray-500"> × {item.quantity}</span>
                            </div>
                            <div>{formatCurrency(item.price)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="text-lg font-bold">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-center text-gray-500 mb-4">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;