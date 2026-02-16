import { Helmet } from "react-helmet";
import CTASection from "@/components/sections/CTASection";
import CertificationsSection from "@/components/sections/CertificationsSection";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - Ultimate Freight and Cargo Shippers</title>
        <meta name="description" content="Learn about Ultimate Freight and Cargo Shippers, our history, mission, values, and the team behind our global logistics solutions." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-sky-500/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">About Ultimate Freight & Cargo Shippers <span className="text-xl sm:text-2xl">Pvt. Ltd.</span> </h1>
              <p className="text-lg md:text-xl text-blue-50">
                Your trusted partner in global logistics since 2005. We connect businesses to opportunities worldwide through innovative shipping solutions.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-6">Our Story</h2>
                <p className="text-neutral-600 mb-4">
                  Ultimate Freight & Cargo was founded in 2015, but our roots in global logistics stretch back to 2005.
                </p>
                <p className="text-neutral-600 mb-4">
                 What began as a small operation has grown into a trusted global logistics partner, with presence in over 120 countries, a modern fleet, and partnerships with leading carriers worldwide.
                </p>
                <p className="text-neutral-600">
                  We're proud of our heritage and the relationships we've built, guided by our core values of reliability, transparency, and a customer-first approach that has earned us the trust of thousands of businesses globally.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Container port with ships and cargo" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">Our Mission & Values</h2>
              <p className="max-w-3xl mx-auto text-neutral-600">
                Our guiding principles shape everything we do, from daily operations to long-term strategic decisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Mission</h3>
                <p className="text-neutral-600">
                  To connect businesses with global markets through innovative, reliable, and sustainable logistics solutions that drive growth and success.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Vision</h3>
                <p className="text-neutral-600">
                  To be the world's most trusted and customer-centric logistics provider, known for excellence, innovation, and environmental responsibility.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Values</h3>
                <ul className="text-neutral-600 space-y-2">
                  <li>• Reliability in every shipment</li>
                  <li>• Transparency in operations and pricing</li>
                  <li>• Customer-centric approach</li>
                  <li>• Environmental sustainability</li>
                  <li>• Continuous innovation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        
        
        {/* Global Presence Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">Our Global Presence</h2>
              <p className="max-w-3xl mx-auto text-neutral-600">
                With operations in over 120 countries, we connect businesses to markets across six continents.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">120+</div>
                  <p className="text-neutral-600">Countries Served</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">250+</div>
                  <p className="text-neutral-600">Logistics Hubs</p>
                </div>
                
                {/* <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">5,000+</div>
                  <p className="text-neutral-600">Employees Worldwide</p>
                </div> */}
                
                {/* <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">10M+</div>
                  <p className="text-neutral-600">Shipments Annually</p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        
        <CertificationsSection />
        
        <CTASection />
      </main>
    </>
  );
}
