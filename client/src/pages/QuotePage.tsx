import { Helmet } from "react-helmet";
import QuoteSection from "@/components/sections/QuoteSection";
import PriceCalculator from "@/components/sections/PriceCalculator";
import FeaturesSection from "@/components/sections/FeaturesSection";

export default function QuotePage() {
  return (
    <>
      <Helmet>
        <title>Get a Quote - Ultimate Freight and Cargo Shippers</title>
        <meta name="description" content="Request a free shipping quote for your freight and cargo needs. Our team will provide you with competitive rates and customized solutions." />
      </Helmet>
      
      <main>
        {/* Hero Section with Gradient Background */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 gradient-primary-bg animated-bg"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 transform origin-top-right"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Get a <span className="relative">
                  Free Shipping Quote
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Use our instant price calculator below to get an immediate estimate, or fill out the detailed form for a customized quote from our team.
              </p>
              <div className="inline-block px-6 py-3 gradient-secondary-bg rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <a href="#calculator" className="flex items-center text-white font-semibold">
                  Go to Calculator
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Real-time Price Calculator Section */}
        <div id="calculator">
          <PriceCalculator />
        </div>
        
        {/* Divider with Gradient */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="relative">
            {/* Gradient divider instead of plain border */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500 rounded-full"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/3 transform -translate-y-1/2 w-6 h-6 rounded-full gradient-primary-bg shadow-lg"></div>
            <div className="absolute top-0 right-1/3 transform -translate-y-1/2 w-6 h-6 rounded-full gradient-secondary-bg shadow-lg"></div>
          </div>
          
          <div className="text-center mt-12 mb-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Need a <span className="text-gradient-primary">More Detailed</span> Quote?
            </h2>
            <p className="text-neutral-600 text-lg">
              For complex shipments, special requirements, or custom logistics solutions, fill out our detailed form below and our expert team will provide a personalized quote.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 rounded-md border border-orange-200 bg-orange-50 text-orange-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Response within 24 hours guaranteed
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Quote Request Form */}
        <QuoteSection />
        
        <section className="py-20 relative overflow-hidden">
          {/* Background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-blue-50 opacity-70"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/3 right-0 w-64 h-64 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="text-gradient-primary">What to</span> <span className="text-gradient-secondary">Expect</span>
              </h2>
              <p className="max-w-3xl mx-auto text-neutral-700 text-lg">
                Here's what happens after you submit your detailed quote request.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="frosted-glass-card p-8 rounded-xl shadow-lg relative card-hover group">
                {/* Step number with gradient */}
                <div className="absolute -top-5 -left-5 gradient-primary-bg w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">1</div>
                
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-gradient-primary">Initial Assessment</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Our team of experts reviews your shipment details to understand your specific requirements, route constraints, and special handling needs.
                  </p>
                </div>
                
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-6"></div>
              </div>
              
              <div className="frosted-glass-card p-8 rounded-xl shadow-lg relative card-hover group">
                {/* Step number with gradient */}
                <div className="absolute -top-5 -left-5 gradient-blend-bg w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">2</div>
                
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-gradient-blend">Customized Quote</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Within 24 hours, you'll receive a detailed quote with transparent pricing, multiple service options, and estimated delivery timeframes.
                  </p>
                </div>
                
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full mt-6"></div>
              </div>
              
              <div className="frosted-glass-card p-8 rounded-xl shadow-lg relative card-hover group">
                {/* Step number with gradient */}
                <div className="absolute -top-5 -left-5 gradient-secondary-bg w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">3</div>
                
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-gradient-secondary">Personal Consultation</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    A dedicated account manager will discuss your quote, answer any questions, and help finalize your shipping plan with custom optimizations.
                  </p>
                </div>
                
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-6"></div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturesSection />
      </main>
    </>
  );
}
