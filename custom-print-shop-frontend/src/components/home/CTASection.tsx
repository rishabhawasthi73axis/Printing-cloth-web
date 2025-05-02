
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Custom Design?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Start with our easy-to-use design tool and bring your ideas to life. No minimum orders required!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/custom-designer">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-200 min-w-[160px]">
                Start Designing
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white hover:bg-white/10 min-w-[160px]">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
