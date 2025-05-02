
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";

// This would come from your cart state in a real app
const mockCartItems = [
  {
    id: 1,
    name: "Custom T-Shirt",
    price: 19.99,
    quantity: 2,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Custom Cap",
    price: 14.99,
    quantity: 1,
    image: "/placeholder.svg"
  }
];

const OrderSummary: React.FC = () => {
  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {mockCartItems.map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="h-16 w-16 bg-muted rounded flex items-center justify-center mr-3">
                <img src={item.image} alt={item.name} className="h-12 w-12 object-contain" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
              </div>
              <div className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <Separator />
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 items-start text-sm text-muted-foreground">
        <p>Delivery estimated in 3-5 business days</p>
        <p>Custom designs will be reviewed before production</p>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
