
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProductOption {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const productOptions: ProductOption[] = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 't-shirts'
  },
  {
    id: '2',
    name: 'Premium T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 't-shirts'
  },
  {
    id: '3',
    name: 'Pullover Hoodie',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'hoodies'
  },
  {
    id: '4',
    name: 'Zip-up Hoodie',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'hoodies'
  },
  {
    id: '5',
    name: 'Snapback Cap',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'caps'
  },
  {
    id: '6',
    name: 'Ceramic Mug',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'mugs'
  }
];

interface ProductSelectorProps {
  onProductSelect: (product: ProductOption) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ onProductSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('t-shirts');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = Array.from(new Set(productOptions.map(product => product.category)));
  
  const filteredProducts = productOptions.filter(product => 
    (!selectedCategory || product.category === selectedCategory) &&
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-xl font-semibold mb-4">Select a Product</h3>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-3 py-1 text-sm rounded-full ${selectedCategory === null ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`px-3 py-1 text-sm rounded-full ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            className="border border-gray-200 rounded-md p-2 cursor-pointer hover:border-primary transition-colors"
            onClick={() => onProductSelect(product)}
          >
            <div className="aspect-square overflow-hidden mb-2 rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-medium text-sm">{product.name}</h4>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-700">${product.price.toFixed(2)}</span>
              <Button variant="outline" size="sm" onClick={(e) => {
                e.stopPropagation();
                onProductSelect(product);
              }}>
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;