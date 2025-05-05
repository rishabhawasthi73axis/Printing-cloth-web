import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Addresses: React.FC = () => {
  // Empty addresses array instead of demo data
  const [addresses, setAddresses] = useState<any[]>([]);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Addresses</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add New Address
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            // This will only show if there are added addresses
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
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                  <Trash className="h-4 w-4 mr-2" /> Delete
                </Button>
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
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Your First Address
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Addresses;