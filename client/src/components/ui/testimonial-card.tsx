import { Star, StarHalf, Quote } from "lucide-react";

interface TestimonialCardProps {
  content: string;
  author: string;
  position: string;
  initials: string;
  rating: number;
  isActive?: boolean;
}

export default function TestimonialCard({
  content,
  author,
  position,
  initials,
  rating,
  isActive = false,
}: TestimonialCardProps) {
  // Generate star rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-orange-500 text-orange-500" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-orange-500 text-orange-500" />);
    }

    return stars;
  };

  // Generate a gradient based on initials
  const getAvatarGradient = () => {
    const gradients = [
      'from-orange-400 to-red-500',
      'from-blue-400 to-blue-600',
      'from-amber-400 to-orange-600'
    ];
    const index = initials.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className={`w-full flex-shrink-0 px-4 sm:px-8 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="frosted-glass-card rounded-xl p-8 shadow-lg relative">
        {/* Decorative quote icon */}
        <div className="absolute -top-4 -left-4 bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-full shadow-md">
          <Quote className="h-4 w-4 text-white" />
        </div>
        
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-blue-50 opacity-30 rounded-xl backdrop-blur-sm"></div>
        
        <div className="relative">
          {/* Rating stars */}
          <div className="flex items-center mb-6">
            <div className="text-orange-500 flex">
              {renderStars()}
            </div>
          </div>
          
          {/* Testimonial content */}
          <p className="text-neutral-700 text-lg leading-relaxed mb-8 relative">
            <span className="text-4xl absolute -top-3 -left-2 text-orange-200">"</span>
            <span className="relative z-10">{content}</span>
            <span className="text-4xl absolute -bottom-5 -right-2 text-orange-200">"</span>
          </p>
          
          {/* Author information */}
          <div className="flex items-center">
            <div className={`mr-4 bg-gradient-to-br ${getAvatarGradient()} rounded-full w-14 h-14 flex items-center justify-center shadow-md`}>
              <span className="text-white font-bold">{initials}</span>
            </div>
            <div>
              <h4 className="font-bold text-neutral-800">{author}</h4>
              <p className="text-sm text-orange-600">{position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
