
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatCurrency, convertUSDtoINR } from '@/utils/currencyFormatter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, formattedTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Your Cart is Empty</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-10">
              <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="px-6">
                <CardTitle>Items ({cartCount})</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="px-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex py-4 border-b last:border-0">
                    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center mr-4">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-contain" 
                        />
                      ) : (
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.variant && (
                        <p className="text-sm text-gray-500">Variant: {item.variant}</p>
                      )}
                      {item.color && (
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                      )}
                      <div className="mt-2 flex items-center">
                        <p className="text-primary font-medium">
                          {formatCurrency(convertUSDtoINR(item.price))}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-500 mb-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 text-gray-500"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 text-gray-500"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formattedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatCurrency(99)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(cart.reduce((acc, item) => acc + convertUSDtoINR(item.price * 0.18) * item.quantity, 0))}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(cart.reduce((acc, item) => 
                    acc + convertUSDtoINR(item.price) * item.quantity, 0) + 99 + 
                    cart.reduce((acc, item) => acc + convertUSDtoINR(item.price * 0.18) * item.quantity, 0))}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/checkout" className="w-full">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;