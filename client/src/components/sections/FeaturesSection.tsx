import FeatureCard from "@/components/ui/feature-card";
import { features } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-gradient-blend">Why Choose</span> Ultimate Freight & Cargo Shippers
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600 text-lg">
            We combine industry expertise, global network, and cutting-edge technology to deliver exceptional shipping and logistics services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} 
                 className="transform transition-all duration-300 hover:translate-y-[-10px]"
                 style={{ transitionDelay: `${index * 50}ms` }}>
              <FeatureCard 
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
