import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0 gradient-blend-bg animated-bg opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')",
          backgroundBlendMode: "soft-light",
          opacity: 0.7
        }}
      ></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            <span className="text-gradient-primary">Global Logistics</span> <br />
            <span className="text-white">Solutions for Your Business</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-white drop-shadow-md max-w-2xl">
            From local deliveries to international shipping, we connect your business to the world with reliable, efficient, and cost-effective cargo solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/quote">
              <Button className="gradient-cta-bg hover:opacity-90 text-white border-none px-8 py-7 h-auto font-semibold text-base rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
                Get Free Quote
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 border-2 px-8 py-7 h-auto font-semibold text-base rounded-md">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
