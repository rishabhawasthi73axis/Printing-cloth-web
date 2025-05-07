
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const AdminSettings: React.FC = () => {
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
                <Input id="store-phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;