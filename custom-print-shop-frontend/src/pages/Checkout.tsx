
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout: React.FC = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState("information");
  
  const handleNextStep = () => {
    if (activeStep === "information") {
      setActiveStep("payment");
    } else if (activeStep === "payment") {
      // Simulate successful checkout
      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
      });
      // Redirect to order confirmation page (not implemented in this example)
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeStep} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="information" disabled={activeStep === "payment"}>
                  Customer Information
                </TabsTrigger>
                <TabsTrigger value="payment" disabled={activeStep === "information"}>
                  Payment
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="information" className="space-y-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your shipping details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street address</Label>
                      <Input id="address" placeholder="123 Main St" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="NY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP / Postal</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" placeholder="(123) 456-7890" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleNextStep} className="w-full">
                      Continue to Payment
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment" className="mt-4">
                <PaymentForm onSubmit={handleNextStep} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;