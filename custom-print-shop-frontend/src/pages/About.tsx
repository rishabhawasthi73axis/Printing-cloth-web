
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, Custom Prints began with a simple mission: to give people the power to wear their creativity. 
              What started as a small home-based operation has grown into a full-service custom apparel printing business, 
              serving individuals, teams, and businesses across the country.
            </p>
            <p className="text-gray-700">
              Our team of designers and production specialists work tirelessly to ensure that every item that leaves our 
              facility meets our high standards of quality. We believe that custom apparel should be accessible to everyone, 
              which is why we've built an easy-to-use online platform that puts design control in your hands.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[300px]">
            <p className="text-gray-500 text-lg">Company Image</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">What Sets Us Apart</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-2">Quality First</h3>
              <p className="text-gray-700">
                We use premium materials and cutting-edge printing technology to ensure your designs look vibrant and last through countless washes.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-2">Design Freedom</h3>
              <p className="text-gray-700">
                Our custom designer tool gives you complete creative control, allowing you to bring your unique vision to life.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-2">Fast Turnaround</h3>
              <p className="text-gray-700">
                From order to delivery, we prioritize efficiency without sacrificing quality, getting your custom apparel to you quickly.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="text-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <h3 className="font-medium">Team Member {item}</h3>
              <p className="text-sm text-gray-600">Position</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            To provide high-quality custom printed apparel that empowers individuals and businesses to express themselves through wearable art, 
            delivered with exceptional service and care.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;