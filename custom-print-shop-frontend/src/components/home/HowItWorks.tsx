
import React from 'react';

const StepCard: React.FC<{ number: number; title: string; description: string; icon: string }> = ({ 
  number, title, description, icon 
}) => (
  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 relative">
    <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <div className="mb-4 text-primary text-4xl">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our custom printing process is simple. Choose a product, upload your design, preview it, 
            and place your order. We'll handle the rest and deliver your custom apparel straight to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StepCard
            number={1}
            title="Choose Product"
            description="Select from our wide range of high-quality apparel options."
            icon="👕"
          />
          <StepCard
            number={2}
            title="Upload Design"
            description="Upload your artwork or use our design tools to create something new."
            icon="🎨"
          />
          <StepCard
            number={3}
            title="Preview Design"
            description="See exactly how your design will look on your chosen product."
            icon="👁️"
          />
          <StepCard
            number={4}
            title="Place Order"
            description="Complete your purchase and we'll handle printing and delivery."
            icon="📦"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
