
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { formatCurrency, convertUSDtoINR } from '@/utils/currencyFormatter';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Trash2, ShoppingCart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Browse our products and find something you love</p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-medium">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</div>
              <Button variant="outline" size="sm" onClick={clearWishlist}>Clear Wishlist</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => {
                const priceInINR = convertUSDtoINR(product.price);
                const formattedPrice = formatCurrency(priceInINR);
                
                return (
                  <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                    <div className="relative">
                      <Link to={`/products/${product.category}/${product.id}`}>
                        <img 
                          src={product.image || "https://via.placeholder.com/300x300"} 
                          alt={product.name} 
                          className="w-full h-56 object-cover"
                        />
                      </Link>
                    </div>
                    <div className="p-4">
                      <Link to={`/products/${product.category}/${product.id}`} className="block">
                        <h3 className="text-lg font-medium mb-2 hover:text-primary transition-colors">{product.name}</h3>
                      </Link>
                      <p className="text-lg font-bold mb-3">{formattedPrice}</p>
                      <div className="flex space-x-2">
                        <Button 
                          variant="default" 
                          className="flex-1"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;