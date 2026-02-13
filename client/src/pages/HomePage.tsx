import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import QuoteSection from "@/components/sections/QuoteSection";
import CTASection from "@/components/sections/CTASection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Ultimate Freight and Cargo Shippers - Worldwide Logistics Solutions</title>
        <meta name="description" content="From local deliveries to international shipping, Ultimate Freight and Cargo connects your business to the world with reliable, efficient, and cost-effective solutions." />
      </Helmet>
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <CertificationsSection />
        <TestimonialsSection />
        <QuoteSection />
        <CTASection />
      </main>
    </>
  );
}
