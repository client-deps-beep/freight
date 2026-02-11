import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";
import { services } from "@/lib/data";
import { Link } from "wouter";

export default function ServicesSection() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">Our Comprehensive Services</h2>
          <p className="max-w-3xl mx-auto text-neutral-600">
            From sea to air, local to global, we offer end-to-end logistics solutions tailored to your business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              eleid={service.eleid}
            />
          ))}
          <ServiceCard 
          key="6"
          title="Connect With Us!"
          description="Start your seamless freight journey with Ultimate Freight & Cargo, and never look back again."
          imageUrl="https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600"
          eleid="#"
          />
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/services">
            <Button className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-3">
              View All Services
            </Button>
          </Link>
        </div>

        
      </div>
    </section>
  );
}
