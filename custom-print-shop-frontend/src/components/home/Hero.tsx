
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-40 h-40 bg-white/10 rounded-full -top-20 -left-20"></div>
        <div className="absolute w-60 h-60 bg-white/10 rounded-full top-40 -right-20"></div>
        <div className="absolute w-20 h-20 bg-white/10 rounded-full bottom-10 right-40"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Design Your Perfect Apparel
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Upload your designs, choose your products, and we'll handle the printing and delivery. 
              Express yourself with custom clothing made easy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/custom-designer">
                <Button size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100">
                  Start Designing
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg p-4 shadow-xl transform rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Custom t-shirt design" 
                className="rounded-md w-full"
              />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-xl transform -rotate-6 absolute -bottom-10 -left-5">
              <img 
                src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
                alt="Custom hoodie design" 
                className="rounded-md w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
