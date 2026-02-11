import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug?: string;
  eleid: string;
}

export default function ServiceCard({ title, description, imageUrl, slug, eleid }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg border-0 relative group card-hover">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/90 opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
      
      {/* Image container with gradient border on hover */}
      <div className="w-full h-52 overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-70"></div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Title overlay for better readability */}
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white z-20 group-hover:bottom-24 transition-all duration-300">{title}</h3>
      </div>
      
      <CardContent className="p-6 frosted-glass-card relative z-20">
        <p className="text-neutral-600 mb-5 group-hover:text-neutral-800 transition-colors duration-300">
          {description}
        </p>
        
      <Link href={`${slug || "/services"}#${eleid}`}>
          <a className="gradient-primary-bg text-white font-medium px-4 py-2 rounded-md inline-flex items-center transition-all duration-300 group-hover:shadow-md">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
