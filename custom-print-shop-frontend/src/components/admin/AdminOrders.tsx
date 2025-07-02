
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, Eye } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { orderApi, Order } from '@/api/orderApi';
import { formatCurrency } from '@/utils/currencyFormatter';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load orders when component mounts
    const loadOrders = async () => {
      setIsLoading(true);
      try {
        const allOrders = await orderApi.getOrders();
        setOrders(allOrders);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load orders.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrders();
  }, [toast]);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    setIsLoading(true);
    try {
      const updatedOrder = await orderApi.updateOrderStatus(orderId, newStatus);
      if (updatedOrder) {
        setOrders(orders.map(order => 
          order.id === orderId ? updatedOrder : order
        ));
        
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(updatedOrder);
        }
        
        toast({
          title: "Order Updated",
          description: `Order ${orderId} status changed to ${newStatus}.`,
        });
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'Shipped':
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case 'In Processing':
        return <Badge className="bg-yellow-500">In Processing</Badge>;
      case 'Pending':
        return <Badge className="bg-gray-500">Pending</Badge>;
      case 'Canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-xs">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 font-medium">Order ID</th>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">
                    <div>
                      <div>{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{formatCurrency(order.total)}</td>
                  <td className="p-3">{getStatusBadge(order.status)}</td>
                  <td className="p-3">
                    <div className="flex space-x-2 items-center">
                      <Select 
                        defaultValue={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Processing">In Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                        disabled={isLoading}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} - {selectedOrder?.date}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm">Customer Information</h4>
                  <p>{selectedOrder.customer}</p>
                  <p>{selectedOrder.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Order Status</h4>
                  <p className="mt-1">{getStatusBadge(selectedOrder.status)}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-sm mb-3">Order Items</h4>
                <div className="bg-muted/30 rounded p-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-4 font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;