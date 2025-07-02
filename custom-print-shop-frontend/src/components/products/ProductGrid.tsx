
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart, CartProduct } from '@/contexts/CartContext';
import { formatCurrency, ensurePriceInINR } from '@/utils/currencyFormatter';
import { Heart, Search, IndianRupee } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { productApi } from '@/api/productApi';
import { useToast } from '@/hooks/use-toast';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Sample product data - in a real app, this would come from an API
const allProducts: ProductProps[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 't-shirts'
  },
  {
    id: '2',
    name: 'Pullover Hoodie',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'hoodies'
  },
  {
    id: '3',
    name: 'Classic Snapback Cap',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'caps'
  },
  {
    id: '4',
    name: 'Ceramic Mug',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'mugs'
  },
  {
    id: '5',
    name: 'Graphic Print T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 't-shirts'
  },
  {
    id: '6',
    name: 'Zip-Up Hoodie',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'hoodies'
  },
  {
    id: '7',
    name: 'Travel Mug',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1577937927133-88c8300a3399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'mugs'
  },
  {
    id: '8',
    name: 'Trucker Cap',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'caps'
  }
];

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const { toast } = useToast();

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    addToCart(cartProduct);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Ensure price is in INR
  const priceInINR = ensurePriceInINR(product.price);
  const formattedPrice = formatCurrency(priceInINR);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
      <div className="h-64 overflow-hidden">
        <Link to={`/products/${product.category}/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      <button 
        className={`absolute top-3 right-3 p-2 rounded-full ${inWishlist ? 'bg-red-100' : 'bg-white'}`} 
        onClick={() => toggleWishlist(product)}
      >
        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
      </button>
      <div className="p-4">
        <Link to={`/products/${product.category}/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-700 mb-2 flex items-center">
          <IndianRupee className="h-4 w-4 mr-1" />
          {formattedPrice}
        </p>
        <div className="flex justify-between items-center pt-2">
          <Link to={`/custom-designer?product=${product.id}`}>
            <Button variant="outline" size="sm">Customize</Button>
          </Link>
          <Button variant="default" size="sm" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
  category?: string;
  searchTerm?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, searchTerm = '' }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Try to get products from API, fall back to sample data
        try {
          const apiProducts = await productApi.getProducts();
          if (apiProducts && apiProducts.length > 0) {
            setProducts(apiProducts.map(p => ({
              id: p.id,
              name: p.name,
              price: p.price,
              image: p.image || 'https://placehold.co/500x500?text=Product+Image',
              category: p.category || 't-shirts'
            })));
            return;
          }
        } catch (error) {
          console.log('Failed to fetch products from API, using sample data');
        }
        
        // Fallback to sample data
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive"
        });
        setProducts(allProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);

  // Filter products by category and search term
  const filteredProducts = products
    .filter(product => !category || product.category === category)
    .filter(product => 
      product.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(localSearchTerm.toLowerCase())
    );

  return (
    <div>
      {!searchTerm && (
        <div className="mb-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;