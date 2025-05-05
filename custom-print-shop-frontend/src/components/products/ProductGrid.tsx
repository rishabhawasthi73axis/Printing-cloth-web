
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart, CartProduct } from '@/contexts/CartContext';
import { formatCurrency, convertUSDtoINR } from '@/utils/currencyFormatter';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

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

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    addToCart(cartProduct);
  };

  // Convert price to INR for display
  const priceInINR = convertUSDtoINR(product.price);
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
        <p className="text-gray-700 mb-2">{formattedPrice}</p>
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
}

const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const filteredProducts = category 
    ? allProducts.filter(product => product.category === category) 
    : allProducts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;