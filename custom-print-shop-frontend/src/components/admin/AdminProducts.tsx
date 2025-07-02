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
import { PencilLine, Trash, PackagePlus, Upload, Image, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { productApi, Product } from '@/api/productApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from '@/utils/currencyFormatter';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = ["t-shirts", "hoodies", "caps", "mugs"];

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
      colors: '',
      description: '',
      category: 't-shirts',
      image: ''
    });
    setImagePreview(product?.image || null);
    setProductImage(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    // In a real implementation, this would upload to a server/cloud storage
    // For now, we'll use the FileReader to generate a base64 string
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    setIsLoading(true);
    try {
      let imageUrl = currentProduct.image || '';
      
      if (productImage) {
        imageUrl = await uploadImage(productImage);
      }
      
      // Make sure the price is saved as a number
      const price = typeof currentProduct.price === 'string' 
        ? parseFloat(currentProduct.price) 
        : currentProduct.price || 0;
      
      const inventory = typeof currentProduct.inventory === 'string'
        ? parseInt(currentProduct.inventory, 10)
        : currentProduct.inventory || 0;
      
      const productData = {
        ...currentProduct,
        price,
        inventory,
        image: imageUrl
      };
      
      console.log("Saving product with data:", productData);
      
      if ('id' in currentProduct && currentProduct.id) {
        // Edit existing product
        const updatedProduct = await productApi.updateProduct(productData as Product);
        setProducts(products.map(p => 
          p.id === updatedProduct.id ? updatedProduct : p
        ));
        toast({
          title: "Product Updated",
          description: "The product has been updated successfully.",
        });
      } else {
        // Add new product
        const newProduct = await productApi.addProduct(productData as Omit<Product, 'id'>);
        setProducts([...products, newProduct]);
        toast({
          title: "Product Added",
          description: "The new product has been added successfully.",
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save the product. Please check all fields are filled correctly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' || name === 'inventory' ? parseFloat(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-xs">
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
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
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium">Inventory</th>
                <th className="p-3 font-medium">Variants</th>
                <th className="p-3 font-medium">Colors</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <div className="h-12 w-12 rounded bg-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover rounded" 
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="p-3">{formatCurrency(product.price)}</td>
                  <td className="p-3">{product.category || '-'}</td>
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
        <DialogContent className="sm:max-w-lg">
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
              
              <div className="grid gap-2">
                <label htmlFor="category">Category</label>
                <Select 
                  value={currentProduct?.category || 't-shirts'} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="image">Product Image</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-2">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative h-32 w-full">
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="h-full w-full object-contain"
                          />
                          <Button 
                            type="button"
                            variant="destructive" 
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                            onClick={() => {
                              setImagePreview(null);
                              setProductImage(null);
                              if (currentProduct) {
                                setCurrentProduct({...currentProduct, image: ''});
                              }
                            }}
                          >
                            X
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <Image className="h-12 w-12 text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">No image selected</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Upload className="h-4 w-4 mr-2" />
                        <span>Upload Image</span>
                      </div>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="price">Price (₹)</label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="1"
                    min="0"
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
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentProduct?.description || ''}
                  onChange={handleChange}
                  placeholder="Product description"
                  rows={3}
                  disabled={isLoading}
                />
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