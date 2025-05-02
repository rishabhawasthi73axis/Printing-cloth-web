
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardName">Name on card</Label>
          <Input id="cardName" placeholder="John Doe" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card number</Label>
          <div className="relative">
            <Input 
              id="cardNumber" 
              placeholder="1234 5678 9012 3456"
              className="pl-10" 
            />
            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 space-y-2">
            <Label htmlFor="expMonth">Month</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, '0');
                  return (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-1 space-y-2">
            <Label htmlFor="expYear">Year</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="YY" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString().slice(-2);
                  return (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-1 space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" maxLength={4} />
          </div>
        </div>
        
        <div className="pt-4">
          <div className="bg-muted p-3 rounded-md flex items-center">
            <div className="bg-primary/10 rounded-full p-2 mr-3">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Secure Payment</p>
              <p className="text-muted-foreground">Your payment information is encrypted and secure.</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} className="w-full">
          Place Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
