
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { PencilLine, Trash, PackagePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { productApi, Product } from '@/api/productApi';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await productApi.getProducts();
        setProducts(allProducts);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [toast]);

  const handleAddEdit = (product: Product | null = null) => {
    setCurrentProduct(product || {
      name: '',
      price: 0,
      inventory: 0,
      variants: '',
      colors: ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const success = await productApi.deleteProduct(id);
      if (success) {
        setProducts(products.filter(product => product.id !== id));
        toast({
          title: "Product Deleted",
          description: "The product has been removed successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the product.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the product.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    setIsLoading(true);
    try {
      if ('id' in currentProduct && currentProduct.id) {
        // Edit existing product
        const updatedProduct = await productApi.updateProduct(currentProduct as Product);
        setProducts(products.map(p => 
          p.id === updatedProduct.id ? updatedProduct : p
        ));
        toast({
          title: "Product Updated",
          description: "The product has been updated successfully.",
        });
      } else {
        // Add new product
        const newProduct = await productApi.addProduct(currentProduct as Omit<Product, 'id'>);
        setProducts([...products, newProduct]);
        toast({
          title: "Product Added",
          description: "The new product has been added successfully.",
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the product.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'inventory' ? parseFloat(value) : value
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Search products..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => handleAddEdit()} className="max-w-xs" disabled={isLoading}>
          <PackagePlus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 font-medium">Product</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium">Inventory</th>
                <th className="p-3 font-medium">Variants</th>
                <th className="p-3 font-medium">Colors</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">{product.inventory}</td>
                  <td className="p-3">{product.variants}</td>
                  <td className="p-3">{product.colors}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddEdit(product)}
                        disabled={isLoading}
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        disabled={isLoading}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentProduct && 'id' in currentProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {currentProduct && 'id' in currentProduct 
                ? 'Make changes to the product details.' 
                : 'Fill in the details for the new product.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Product Name</label>
                <Input
                  id="name"
                  name="name"
                  value={currentProduct?.name || ''}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="price">Price ($)</label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={currentProduct?.price || ''}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="inventory">Inventory</label>
                  <Input
                    id="inventory"
                    name="inventory"
                    type="number"
                    value={currentProduct?.inventory || ''}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="variants">Variants</label>
                <Input
                  id="variants"
                  name="variants"
                  value={currentProduct?.variants || ''}
                  onChange={handleChange}
                  placeholder="S, M, L, XL"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="colors">Colors</label>
                <Input
                  id="colors"
                  name="colors"
                  value={currentProduct?.colors || ''}
                  onChange={handleChange}
                  placeholder="Black, White, Red"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {currentProduct && 'id' in currentProduct ? 'Save Changes' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;