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
    description: "Full container load (FCL) and less than container load (LCL) solutions for cost-effective international shipping. We offer comprehensive ocean freight services with access to major shipping lines, competitive rates, and reliable transit times. Our network covers all major ports worldwide, ensuring seamless cargo movement across continents.",
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80",
    features: [
      "FCL and LCL options",
      "Refrigerated containers available",
      "Hazardous cargo handling",
      "Port-to-port and door-to-door service",
      "Real-time vessel tracking"
    ]
  },
  {
    id: 2,
    eleid:"air-freight",
    title: "Air Freight",
    description: "Express and standard air cargo services with competitive rates and flexible scheduling options. Whether you need next-flight-out service or cost-effective standard air freight, we provide reliable solutions with access to major airlines and cargo carriers worldwide.",
    imageUrl: "https://images.pexels.com/photos/9749472/pexels-photo-9749472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "Express and standard options",
      "Charter services available",
      "Temperature-controlled transport",
      "Same-day and next-day delivery",
      "Priority handling for urgent shipments"
    ]
  },
  {
    id: 3,
    eleid:"land-freight",
    title: "Road Transportation",
    description: "Comprehensive road freight services for efficient domestic and cross-border shipping. Our extensive fleet and network ensure reliable delivery across all major routes with flexible scheduling and specialized equipment for various cargo types.",
    imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    features: [
      "Full truckload (FTL) and LTL",
      "Expedited services",
      "Temperature-controlled vehicles",
      "Oversized load handling",
      "Cross-border expertise"
    ]
  },
  {
    id: 4,
    eleid:"rail-freight",
    title: "Rail Freight",
    description: "Cost-effective and environmentally friendly rail freight solutions for long-distance bulk transportation. Ideal for heavy cargo, bulk commodities, and intermodal shipments across major rail corridors. Our rail services offer significant cost savings and reduced carbon footprint compared to road transport.",
    imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=800&q=80",
    features: [
      "Intermodal container services",
      "Bulk commodity transport",
      "Heavy machinery handling",
      "Cross-border rail connections",
      "Eco-friendly transportation"
    ]
  },
   {
    id: 5,
    eleid:"warehousing",
    title: "Warehousing",
    description: "Secure storage solutions with real-time inventory tracking and value-added services like packaging and labeling. Our strategically located warehouses offer flexible storage options, advanced inventory management systems, and comprehensive distribution services to optimize your supply chain.",
    imageUrl: "https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "Climate-controlled facilities",
      "Real-time inventory tracking",
      "Cross-docking services",
      "Pick and pack operations",
      "Value-added services"
    ]
  },
  {
    id: 6,
    eleid:"customs-brokerage",
    title: "Customs Brokerage",
    description: "Expert handling of customs documentation, compliance, and clearance to ensure smooth international shipments. Our licensed customs brokers navigate complex regulations, minimize delays, and ensure full compliance with import/export requirements across all major trading countries.",
    imageUrl: "https://images.pexels.com/photos/2226457/pexels-photo-2226457.jpeg?auto=compress&cs=tinysrgb&w=600",
    features: [
      "Licensed customs brokers",
      "Documentation preparation",
      "Duty and tax calculation",
      "Trade compliance consulting",
      "24/7 customs support"
    ]
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
  { value: "ground", label: "Road Transportation" },
  { value: "rail", label: "Rail Freight" },
  { value: "express", label: "Express Shipping" },
  { value: "multimodal", label: "Multimodal Transportation" }
];
