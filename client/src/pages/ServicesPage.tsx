import { Helmet } from "react-helmet";
import QuoteSection from "@/components/sections/QuoteSection";
import { 
  Ship, 
  Plane, 
  Truck, 
  Train, 
 BadgeCheck,
  Warehouse, 
  FileSearch, 
  BarChart, 
  PackageOpen 
} from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services - Ultimate Freight and Cargo Shippers</title>
        <meta name="description" content="Explore our comprehensive freight and cargo shipping services including ocean freight, air freight, land transportation, warehousing, and more." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Our Comprehensive Services</h1>
              <p className="text-lg md:text-xl text-neutral-100">
                From sea to air, local to global, we offer end-to-end logistics solutions tailored to your business needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="ocean-freight">
              <div>
                <div className="flex items-center mb-4">
                  <Ship className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Ocean Freight</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  Our ocean freight services offer reliable and cost-effective solutions for shipping goods internationally. Whether you need full container load (FCL) or less than container load (LCL) shipping, we have options to accommodate your specific requirements.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800">Full Container Load (FCL)</h3>
                    <p className="text-neutral-600">
                      Dedicated containers for exclusive use, ideal for larger shipments or sensitive cargo requiring segregation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Less than Container Load (LCL)</h3>
                    <p className="text-neutral-600">
                      Cost-effective solution for smaller shipments where you only pay for the space your cargo occupies.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Special Equipment</h3>
                    <p className="text-neutral-600">
                      Access to refrigerated containers, open-top containers, flat racks, and other specialized equipment for unique cargo needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Ocean freight container ship" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="air-freight">
              <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/11192837/pexels-photo-11192837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Air freight cargo plane" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-4">
                  <Plane className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Air Freight</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  When speed is essential, our air freight services provide the fastest transportation option for your cargo. We offer a range of air freight solutions to meet your timeline and budget requirements.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800">Express Air Freight</h3>
                    <p className="text-neutral-600">
                      Priority handling and accelerated transit times for time-critical shipments, with next-flight-out options available.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Standard Air Freight</h3>
                    <p className="text-neutral-600">
                      Balanced solution offering reasonable transit times at competitive rates for less urgent cargo.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Charter Services</h3>
                    <p className="text-neutral-600">
                      Dedicated aircraft solutions for oversized, heavy, or project-specific cargo requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="land-freight">
              <div>
                <div className="flex items-center mb-4">
                  <Truck className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Land Transportation</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  Our extensive land transportation network offers flexible and reliable shipping options for domestic and cross-border freight. We provide comprehensive road and rail services to meet your logistics needs.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800">Road Freight</h3>
                    <p className="text-neutral-600">
                      Full truckload (FTL), less than truckload (LTL), and expedited trucking services with nationwide coverage.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Rail Freight</h3>
                    <p className="text-neutral-600">
                      Cost-effective and environmentally friendly option for long-distance bulk transportation across major corridors.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">Specialized Transportation</h3>
                    <p className="text-neutral-600">
                      Temperature-controlled, hazardous materials, and oversized load transportation with appropriate equipment and permits.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Trucks and land transportation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="customs-brokerage">
  <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
    <img 
      src="https://images.pexels.com/photos/955395/pexels-photo-955395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Customs document processing"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="order-1 lg:order-2">
    <div className="flex items-center mb-4">
      <BadgeCheck className="h-8 w-8 text-primary mr-3" />
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Customs Brokerage</h2>
    </div>
    <p className="text-neutral-600 mb-6">
      Our expert customs brokers ensure your shipments clear borders quickly and comply with international trade regulations. Avoid delays, fines, and confusion with our end-to-end compliance support.
    </p>
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-neutral-800">Import & Export Compliance</h3>
        <p className="text-neutral-600">
          We handle all documentation, duties, tariffs, and inspections for seamless international shipping.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-neutral-800">Customs Clearance</h3>
        <p className="text-neutral-600">
          Fast and accurate clearance processes through customs to keep your supply chain moving efficiently.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-neutral-800">Trade Consulting</h3>
        <p className="text-neutral-600">
          Guidance on product classification, trade agreements, and import/export laws to minimize risk and cost.
        </p>
      </div>
    </div>
  </div>
</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="warehousing">
  <div>
    <div className="flex items-center mb-4">
      <Warehouse className="h-8 w-8 text-primary mr-3" />
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Warehousing</h2>
    </div>
    <p className="text-neutral-600 mb-6">
      Our secure and strategically located warehouses provide flexible storage and distribution solutions to support your supply chain. Whether you need short-term or long-term warehousing, we’ve got you covered.
    </p>
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-neutral-800">Inventory Management</h3>
        <p className="text-neutral-600">
          Real-time tracking and control over your inventory, including receiving, storage, and order fulfillment.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-neutral-800">Cross-Docking</h3>
        <p className="text-neutral-600">
          Efficient transloading services to minimize storage time and speed up delivery timelines.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-neutral-800">Climate-Controlled Facilities</h3>
        <p className="text-neutral-600">
          Specialized warehousing for perishable, sensitive, or high-value goods requiring regulated conditions.
        </p>
      </div>
    </div>
  </div>
  <div className="rounded-lg overflow-hidden shadow-lg">
    <img 
      src="https://images.pexels.com/photos/5775099/pexels-photo-5775099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Warehouse storage"
      className="w-full h-full object-cover"
    />
  </div>
</div>



          </div>
        </section>
        
        {/* Additional Services */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">Additional Services</h2>
              <p className="max-w-3xl mx-auto text-neutral-600">
                Beyond transportation, we offer a comprehensive suite of logistics services to streamline your supply chain.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Warehouse className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Warehousing & Distribution</h3>
                <p className="text-neutral-600">
                  Strategic warehouse facilities for storage, inventory management, order fulfillment, and distribution services.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <FileSearch className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customs Clearance</h3>
                <p className="text-neutral-600">
                  Expert handling of documentation, duties, and regulatory compliance for smooth international shipping.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <BarChart className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Supply Chain Solutions</h3>
                <p className="text-neutral-600">
                  End-to-end supply chain management, optimization, and consulting services tailored to your business.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <PackageOpen className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cargo Insurance</h3>
                <p className="text-neutral-600">
                  Comprehensive coverage options to protect your valuable shipments against loss or damage during transit.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industries We Serve */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">Industries We Serve</h2>
              <p className="max-w-3xl mx-auto text-neutral-600">
                We provide specialized logistics solutions for a diverse range of industries, each with unique requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Retail & E-commerce</h3>
                <p className="text-neutral-600">
                  Omnichannel fulfillment, last-mile delivery, and returns management solutions for retailers of all sizes.
                </p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Manufacturing</h3>
                <p className="text-neutral-600">
                  Raw material supply, just-in-time delivery, and finished goods distribution for manufacturing companies.
                </p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Automotive</h3>
                <p className="text-neutral-600">
                  Specialized handling of vehicles, parts, and components with precise delivery scheduling.
                </p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Healthcare & Pharmaceuticals</h3>
                <p className="text-neutral-600">
                  Temperature-controlled transportation and handling for sensitive medical products and pharmaceuticals.
                </p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Technology</h3>
                <p className="text-neutral-600">
                  Secure transportation of high-value electronics and IT equipment with specialized handling procedures.
                </p>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Food & Beverage</h3>
                <p className="text-neutral-600">
                  Temperature-controlled shipping solutions ensuring product integrity and compliance with safety regulations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <QuoteSection />
      </main>
    </>
  );
}
