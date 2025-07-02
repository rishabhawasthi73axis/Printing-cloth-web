
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Partial<Address>>({});
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setCurrentAddress(address);
      setIsEditing(true);
    } else {
      setCurrentAddress({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
      });
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentAddress({
      ...currentAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveAddress = () => {
    if (!currentAddress.name || !currentAddress.street || !currentAddress.city || 
        !currentAddress.state || !currentAddress.zipCode) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && currentAddress.id) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === currentAddress.id ? currentAddress as Address : addr
      ));
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully",
      });
    } else {
      // Add new address
      const newAddress = {
        ...currentAddress,
        id: `addr_${Date.now()}`,
      } as Address;
      
      setAddresses([...addresses, newAddress]);
      toast({
        title: "Address Added",
        description: "Your new address has been added successfully",
      });
    }
    setDialogOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
    toast({
      title: "Address Deleted",
      description: "Your address has been removed successfully",
    });
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
    toast({
      title: "Default Address Set",
      description: "Your default address has been updated",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Addresses</h1>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" /> Add New Address
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" /> {address.name}
                    </CardTitle>
                    {address.isDefault && (
                      <CardDescription>
                        <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          Default Address
                        </span>
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {!address.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                    Set as Default
                  </Button>
                )}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(address)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10" onClick={() => handleDeleteAddress(address.id)}>
                    <Trash className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {addresses.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Addresses Yet</h2>
              <p className="text-center text-gray-500 mb-4">
                You haven't added any delivery addresses yet.
              </p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" /> Add Your First Address
              </Button>
            </CardContent>
          </Card>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Address' : 'Add New Address'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update your address details below.' : 'Fill in the details for your new address.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Address Name</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Home, Office, etc."
                  value={currentAddress.name || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="street">Street Address</label>
                <Input
                  id="street"
                  name="street"
                  placeholder="123 Main St"
                  value={currentAddress.street || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="city">City</label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Mumbai"
                    value={currentAddress.city || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="state">State</label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="Maharashtra"
                    value={currentAddress.state || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="zipCode">PIN Code</label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="400001"
                  value={currentAddress.zipCode || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={currentAddress.isDefault || false}
                  onChange={handleChange}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isDefault">Set as default address</label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSaveAddress}>
                {isEditing ? 'Update Address' : 'Save Address'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Addresses;