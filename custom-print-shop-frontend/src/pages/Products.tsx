
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';

const Products: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
          </h1>
          
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
          
          <ProductGrid category={category} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;