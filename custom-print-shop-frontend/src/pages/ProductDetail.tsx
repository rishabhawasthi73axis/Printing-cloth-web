
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatCurrency, convertUSDtoINR } from '@/utils/currencyFormatter';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';

// Sample product data - in a real app, this would come from an API
const allProducts = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 't-shirts',
    description: 'High-quality premium cotton t-shirt that offers both comfort and durability. Available in various sizes and colors.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray']
  },
  {
    id: '2',
    name: 'Pullover Hoodie',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'hoodies',
    description: 'Stay warm and stylish with our cozy pullover hoodie. Features a spacious front pocket and adjustable drawstrings.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy']
  },
  {
    id: '3',
    name: 'Classic Snapback Cap',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'caps',
    description: 'Classic snapback cap with an adjustable strap for perfect fit. Ideal for casual wear or outdoor activities.',
    sizes: ['One Size'],
    colors: ['Black', 'Blue', 'Red', 'White']
  },
  {
    id: '4',
    name: 'Ceramic Mug',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'mugs',
    description: 'High-quality ceramic mug perfect for coffee, tea, or any hot beverage. Dishwasher and microwave safe.',
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black']
  },
  {
    id: '5',
    name: 'Graphic Print T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 't-shirts',
    description: 'Stylish graphic print t-shirt made with premium materials for maximum comfort and durability.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray']
  },
  {
    id: '6',
    name: 'Zip-Up Hoodie',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'hoodies',
    description: 'Comfortable zip-up hoodie with pockets and a modern fit, perfect for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy']
  },
  {
    id: '7',
    name: 'Travel Mug',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1577937927133-88c8300a3399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'mugs',
    description: 'Insulated travel mug that keeps your drinks hot or cold for hours. Leakproof lid and easy-grip design.',
    sizes: ['16oz', '20oz'],
    colors: ['Silver', 'Black', 'Blue']
  },
  {
    id: '8',
    name: 'Trucker Cap',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'caps',
    description: 'Classic trucker cap with mesh back for breathability. One size fits most with adjustable snapback.',
    sizes: ['One Size'],
    colors: ['Black/White', 'Blue/White', 'Red/White']
  }
];

const ProductDetail: React.FC = () => {
  const { category, productId } = useParams<{ category?: string; productId?: string }>();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = allProducts.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const inWishlist = isInWishlist(product.id);
  const priceInINR = convertUSDtoINR(product.price);
  const formattedPrice = formatCurrency(priceInINR);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      size: selectedSize,
      color: selectedColor
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain min-h-[400px]"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <button 
                className={`p-2 rounded-full ${inWishlist ? 'bg-red-100' : 'bg-gray-100'}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart className={`h-6 w-6 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
              </button>
            </div>
            
            <p className="text-2xl font-bold mb-4">{formattedPrice}</p>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Select Size</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Select Color</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`px-4 py-2 border rounded-md ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Link to={`/custom-designer?product=${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Customize Design
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;