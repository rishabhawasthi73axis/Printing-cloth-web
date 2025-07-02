
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart, CartProduct } from '@/contexts/CartContext';
import { formatCurrency, ensurePriceInINR } from '@/utils/currencyFormatter';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart, IndianRupee } from 'lucide-react';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: ProductProps[] = [
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

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline">
            View All Products →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;