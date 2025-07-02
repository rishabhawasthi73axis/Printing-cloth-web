
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Settings saved",
        description: "Your admin settings have been updated successfully."
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Admin Settings</h2>
      
      <div className="grid gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure your admin dashboard preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Email notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for new orders, customer inquiries, and low stock alerts.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Analytics tracking</Label>
                <Switch id="analytics" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Allow collection of analytics data to improve your dashboard experience.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="stock-alerts">Low stock alerts</Label>
                <Switch id="stock-alerts" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Get notified when product inventory falls below the threshold limit.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Update your store details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="store-name">Store name</Label>
                <Input id="store-name" defaultValue="PrintWear" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="store-email">Support email</Label>
                <Input id="store-email" type="email" defaultValue="support@printwear.com" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="store-phone">Contact phone</Label>
                <Input id="store-phone" type="tel" defaultValue="+91 98765 43210" />
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Regional Settings</CardTitle>
            <CardDescription>Configure regional preferences for your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="INR">
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger>
                  <SelectValue placeholder="Select a date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy/mm/dd">YYYY/MM/DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time-zone">Time Zone</Label>
              <Select defaultValue="IST">
                <SelectTrigger>
                  <SelectValue placeholder="Select a time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                  <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                  <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>Configure payment options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="razorpay">Razorpay</Label>
                <Switch id="razorpay" defaultChecked />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="upi">UPI Payments</Label>
                <Switch id="upi" defaultChecked />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cod">Cash on Delivery</Label>
                <Switch id="cod" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;