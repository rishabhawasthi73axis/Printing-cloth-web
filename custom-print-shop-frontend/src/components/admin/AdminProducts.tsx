
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { PencilLine, Trash, PackagePlus } from 'lucide-react';

// Mock product data - would come from API in real app
const initialProducts = [
  { 
    id: 1, 
    name: "T-Shirt", 
    price: 19.99, 
    inventory: 150, 
    variants: "S, M, L, XL", 
    colors: "Black, White, Gray"
  },
  { 
    id: 2, 
    name: "Hoodie", 
    price: 39.99, 
    inventory: 85, 
    variants: "S, M, L, XL", 
    colors: "Black, Navy Blue"
  },
  { 
    id: 3, 
    name: "Cap", 
    price: 14.99, 
    inventory: 120, 
    variants: "One Size", 
    colors: "Black, White, Red"
  },
  { 
    id: 4, 
    name: "Long Sleeve Shirt", 
    price: 24.99, 
    inventory: 95, 
    variants: "S, M, L, XL", 
    colors: "Black, White, Gray"
  }
];

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddEdit = (product: any = null) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct) {
      if (currentProduct.id) {
        // Edit existing product
        setProducts(products.map(p => 
          p.id === currentProduct.id ? currentProduct : p
        ));
      } else {
        // Add new product
        const newProduct = {
          ...currentProduct,
          id: Math.max(...products.map(p => p.id), 0) + 1
        };
        setProducts([...products, newProduct]);
      }
      setIsDialogOpen(false);
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
        <Button onClick={() => handleAddEdit()} className="max-w-xs">
          <PackagePlus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
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
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
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
            <DialogTitle>{currentProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {currentProduct?.id 
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{currentProduct?.id ? 'Save Changes' : 'Add Product'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;