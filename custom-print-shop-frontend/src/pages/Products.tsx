
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Products: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
          </h1>
          
          {/* Search bar */}
          <div className="mb-6 max-w-md">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Categories navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <Link to="/products" 
                className={`px-4 py-2 rounded-full whitespace-nowrap ${!category ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                All Products
              </Link>
              <Link to="/products/t-shirts" 
                className={`px-4 py-2 rounded-full whitespace-nowrap ${category === 't-shirts' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                T-Shirts
              </Link>
              <Link to="/products/hoodies" 
                className={`px-4 py-2 rounded-full whitespace-nowrap ${category === 'hoodies' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                Hoodies
              </Link>
              <Link to="/products/caps" 
                className={`px-4 py-2 rounded-full whitespace-nowrap ${category === 'caps' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                Caps
              </Link>
              <Link to="/products/mugs" 
                className={`px-4 py-2 rounded-full whitespace-nowrap ${category === 'mugs' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                Mugs
              </Link>
            </div>
          </div>
          
          <ProductGrid category={category} searchTerm={searchTerm} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;