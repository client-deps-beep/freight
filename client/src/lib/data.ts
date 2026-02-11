export const features = [
  {
    id: 1,
    title: "Global Network",
    description: "Access to international shipping routes with presence in over 120 countries worldwide.",
    icon: "globe"
  },
  {
    id: 2,
    title: "Express Delivery",
    description: "Time-sensitive shipping solutions with guaranteed on-time delivery for urgent cargo.",
    icon: "truck"
  },
  {
    id: 3,
    title: "Secure Shipping",
    description: "Advanced cargo protection measures and comprehensive insurance options for peace of mind.",
    icon: "shield"
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Round-the-clock customer service with real-time tracking and dedicated account managers.",
    icon: "headphones"
  }
];

export const services = [
  {
    id: 1,
    eleid:"ocean-freight",
    title: "Ocean Freight",
    description: "Full container load (FCL) and less than container load (LCL) solutions for cost-effective international shipping.",
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    eleid:"air-freight",
    title: "Air Freight",
    description: "Express and standard air cargo services with competitive rates and flexible scheduling options.",
    imageUrl: "https://images.pexels.com/photos/9749472/pexels-photo-9749472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    eleid:"land-freight",
    title: "Land Transportation",
    description: "Nationwide trucking and rail freight services for efficient domestic shipping and distribution.",
    imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
  },
   {
    id: 4,
    eleid:"warehousing",
    title: "Warehousing",
    description: "Secure storage solutions with real-time inventory tracking and value-added services like packaging and labeling.",
    imageUrl: "https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 5,
    eleid:"customs-brokerage",
    title: "Customs Broker",
    description: "Expert handling of customs documentation, compliance, and clearance to ensure smooth international shipments.",
    imageUrl: "https://images.pexels.com/photos/2226457/pexels-photo-2226457.jpeg?auto=compress&cs=tinysrgb&w=600"
  }

];

export const testimonials = [
  {
    id: 1,
    content: "Ultimate Freight & Cargo has transformed our international shipping operations. Their reliability and attention to detail have saved us time and money while expanding our global reach.",
    author: "James Donovan",
    position: "CEO, Global Imports Inc.",
    initials: "JD",
    rating: 5
  },
  {
    id: 2,
    content: "We've been working with Ultimate Freight for over 5 years now, and their service is consistently excellent. Their customer support team is responsive, and their tracking technology gives us peace of mind.",
    author: "Sarah Reynolds",
    position: "Logistics Manager, Tech Solutions Ltd.",
    initials: "SR",
    rating: 5
  },
  {
    id: 3,
    content: "As a small business, finding an affordable and reliable shipping partner was challenging until we discovered Ultimate Freight & Cargo. They treat us like a priority despite our size.",
    author: "Michael Lee",
    position: "Owner, Artisan Crafts Co.",
    initials: "ML",
    rating: 4.5
  },
  {
  id: 4,
  content: "Ultimate Freight’s warehousing services have been a game changer for our inventory management. Their secure facilities and real-time tracking give us full visibility and peace of mind.",
  author: "Linda Martinez",
  position: "Operations Director, Nova Retail Group",
  initials: "LM",
  rating: 4.5
},
{
  id: 5,
  content: "Their customs brokerage team handled all our import paperwork flawlessly. What used to be a stressful part of our supply chain is now completely streamlined thanks to their expertise.",
  author: "Raj Patel",
  position: "Supply Chain Manager, Horizon Electronics",
  initials: "RP",
  rating: 5
}
];

export const shipmentTypes = [
  { value: "ocean-fcl", label: "Ocean Freight - Full Container" },
  { value: "ocean-lcl", label: "Ocean Freight - Less than Container" },
  { value: "air-standard", label: "Air Freight - Standard" },
  { value: "air-express", label: "Air Freight - Express" },
  { value: "road", label: "Road Transportation" },
  { value: "rail", label: "Rail Transportation" },
  { value: "multimodal", label: "Multimodal Transportation" }
];
