import { LucideIcon } from "lucide-react";
import { 
  Globe, 
  Truck, 
  Shield, 
  Headphones, 
  Package, 
  BarChart, 
  Clock, 
  Settings 
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "globe":
        return Globe;
      case "truck":
        return Truck;
      case "shield":
        return Shield;
      case "headphones":
        return Headphones;
      case "package":
        return Package;
      case "chart":
        return BarChart;
      case "clock":
        return Clock;
      default:
        return Settings;
    }
  };

  const IconComponent = getIcon();
  
  // Generate random gradient (will be consistent for same title)
  const getGradientClass = () => {
    const firstGradients = ['from-orange-500', 'from-amber-500', 'from-blue-500'];
    const secondGradients = ['to-red-500', 'to-orange-600', 'to-blue-700'];
    
    // Use title's first character to determine a consistent gradient
    const index = title.charCodeAt(0) % 3;
    return `${firstGradients[index]} ${secondGradients[index]}`;
  };

  return (
    <div className="relative bg-white rounded-xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Subtle gradient background that shows on hover */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"
           style={{ backgroundImage: 'var(--gradient-blend)' }}></div>
      
      {/* Icon with gradient background */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getGradientClass()} opacity-10 blur-md`}></div>
        <div className={`relative inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br ${getGradientClass()} bg-opacity-10`}>
          <IconComponent className="h-7 w-7 text-primary" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
