
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface SidebarProps {
  selectedProduct: ProductInfo | null;
  onAddToCart: () => void;
}

const CustomizerSidebar: React.FC<SidebarProps> = ({ selectedProduct, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [selectedColor, setSelectedColor] = React.useState('white');

  const colors = [
    { name: 'White', value: 'white', class: 'bg-white border-gray-300' },
    { name: 'Black', value: 'black', class: 'bg-black' },
    { name: 'Gray', value: 'gray', class: 'bg-gray-500' },
    { name: 'Red', value: 'red', class: 'bg-red-600' },
    { name: 'Blue', value: 'blue', class: 'bg-blue-600' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-xl font-semibold mb-4">Product Details</h3>
        <p className="text-gray-500">Please select a product to customize</p>
      </div>
    );
  }

  const totalPrice = selectedProduct.price * quantity;

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-xl font-semibold mb-4">Product Details</h3>
      
      <div className="mb-4">
        <h4 className="font-medium">{selectedProduct.name}</h4>
        <p className="text-gray-700">${selectedProduct.price.toFixed(2)}</p>
      </div>
      
      {(selectedProduct.category === 't-shirts' || selectedProduct.category === 'hoodies') && (
        <>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Select Size</h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`w-10 h-10 rounded-md flex items-center justify-center border ${
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
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Select Color</h4>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color.value}
                  className={`w-10 h-10 rounded-full ${color.class} flex items-center justify-center ${
                    selectedColor === color.value 
                      ? 'ring-2 ring-primary ring-offset-2' 
                      : 'border hover:ring-1 hover:ring-gray-400 hover:ring-offset-1'
                  }`}
                  title={color.name}
                  onClick={() => setSelectedColor(color.value)}
                >
                  {selectedColor === color.value && (
                    <svg className={`w-4 h-4 ${color.value === 'white' ? 'text-black' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Quantity</h4>
        <div className="flex items-center">
          <button
            className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="mb-5">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      
      <Button className="w-full" onClick={onAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default CustomizerSidebar;
