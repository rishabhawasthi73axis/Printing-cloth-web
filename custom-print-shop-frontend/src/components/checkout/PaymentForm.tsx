
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndianRupee } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentFormProps {
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Choose your payment method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upi">UPI Payment</TabsTrigger>
            <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upi" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" placeholder="yourname@upi" />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    Verify & Pay
                  </Button>
                </div>
                
                <div className="bg-muted p-3 rounded-md flex items-center">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <IndianRupee className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Secure UPI Payment</p>
                    <p className="text-muted-foreground">Your payment is processed securely.</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
                <div className="bg-gray-100 w-48 h-48 flex items-center justify-center rounded-md mb-3">
                  <p className="text-gray-500">QR Code will appear here</p>
                </div>
                <p className="text-sm text-center text-gray-500">Scan with any UPI app to pay</p>
                <div className="flex space-x-2 mt-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/120px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Pay_%28GPay%29_Logo.svg" alt="Google Pay" className="h-8" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-8" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-8" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cod" className="space-y-4 mt-4">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-2 mr-3 mt-1">
                  <IndianRupee className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Cash on Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Pay with cash when your order is delivered to your doorstep.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mb-4">
                    <li>Keep exact change ready if possible</li>
                    <li>Verify your order before paying</li>
                    <li>Additional ₹40 COD handling fee may apply</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} className="w-full">
          {paymentMethod === 'cod' ? 'Place Order (Cash on Delivery)' : 'Complete Payment'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;