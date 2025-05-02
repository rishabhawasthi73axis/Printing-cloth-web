
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductSelector from '@/components/custom-designer/ProductSelector';
import DesignCanvas from '@/components/custom-designer/DesignCanvas';
import CustomizerSidebar from '@/components/custom-designer/CustomizerSidebar';

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const CustomDesigner: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
  const { toast } = useToast();

  const handleProductSelect = (product: ProductInfo) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${selectedProduct?.name} has been added to your cart.`,
      duration: 3000,
    });
    // In a real app, this would add the item to cart state/context or send to API
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Custom Design Studio</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <ProductSelector onProductSelect={handleProductSelect} />
            </div>
            
            <div className="lg:col-span-6">
              <DesignCanvas selectedProduct={selectedProduct} />
            </div>
            
            <div className="lg:col-span-3">
              <CustomizerSidebar 
                selectedProduct={selectedProduct} 
                onAddToCart={handleAddToCart} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomDesigner;