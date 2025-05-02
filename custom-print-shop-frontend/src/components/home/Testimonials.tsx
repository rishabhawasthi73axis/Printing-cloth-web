
import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah Johnson",
    role: "Event Organizer",
    content: "The t-shirts we ordered for our company event were perfect! The print quality exceeded our expectations and delivery was faster than promised. Will definitely order again!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Michael Thompson",
    role: "Small Business Owner",
    content: "I've been using PrintWear for my shop's merchandise for over a year now. The quality is consistently excellent and my customers love the designs. Their customer service is top-notch too!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Graphic Designer",
    content: "As a designer, print quality matters a lot to me. PrintWear nails the details every time. The colors are vibrant and true to my designs. They're my go-to for all client merchandise projects.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const TestimonialCard: React.FC<{ testimonial: TestimonialProps }> = ({ testimonial }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-50">
    <div className="flex items-center mb-4">
      <img
        className="h-12 w-12 rounded-full object-cover mr-4"
        src={testimonial.avatar}
        alt={testimonial.name}
      />
      <div>
        <h4 className="font-semibold">{testimonial.name}</h4>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">"{testimonial.content}"</p>
    <div className="mt-4 flex text-yellow-400">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their 
            experience with PrintWear.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
