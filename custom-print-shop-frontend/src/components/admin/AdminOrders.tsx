
import React, { useState } from 'react';
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

// Mock order data - would come from API in real app
const initialOrders = [
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

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewDetails = (order: any) => {
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

      {filteredOrders.length === 0 ? (
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
                  <td className="p-3">${order.total.toFixed(2)}</td>
                  <td className="p-3">{getStatusBadge(order.status)}</td>
                  <td className="p-3">
                    <div className="flex space-x-2 items-center">
                      <Select 
                        defaultValue={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
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
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-4 font-bold">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
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