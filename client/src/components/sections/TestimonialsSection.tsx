import { useState, useEffect } from "react";
import TestimonialCard from "@/components/ui/testimonial-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = testimonials.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">What Our Clients Say</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">
            Don't just take our word for it — hear from some of our satisfied clients about their experience with Ultimate Freight & Cargo.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id}
                  content={testimonial.content}
                  author={testimonial.author}
                  position={testimonial.position}
                  initials={testimonial.initials}
                  rating={testimonial.rating}
                  isActive={index === currentSlide}
                />
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-primary hover:text-primary/80 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-primary hover:text-primary/80 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary' : 'bg-neutral-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
