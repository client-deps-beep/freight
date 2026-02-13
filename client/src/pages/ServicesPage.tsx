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
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services - Ultimate Freight and Cargo Shippers</title>
        <meta name="description" content="Explore our comprehensive freight and cargo shipping services including ocean freight, air freight, land transportation, warehousing, and more." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-sky-500/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Our Comprehensive Services</h1>
              <p className="text-lg md:text-xl text-blue-50">
                From sea to air, local to global, we offer end-to-end logistics solutions tailored to your business needs.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Main Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="ocean-freight"
            >
              <div>
                <div className="flex items-center mb-4">
                  <Ship className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Ocean Freight</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  Our ocean freight services offer reliable and cost-effective solutions for shipping goods internationally. We provide comprehensive ocean freight services with access to major shipping lines, competitive rates, and reliable transit times. Our network covers all major ports worldwide, ensuring seamless cargo movement across continents.
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
                    <h3 className="font-semibold text-neutral-800 mb-1">Special Equipment</h3>
                    <p className="text-neutral-600">
                      Access to refrigerated containers, open-top containers, flat racks, and other specialized equipment for unique cargo needs including hazardous materials and oversized loads.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Port-to-Port & Door-to-Door</h3>
                    <p className="text-neutral-600">
                      Flexible service options from port-to-port or complete door-to-door solutions with inland transportation coordination.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Real-Time Vessel Tracking</h3>
                    <p className="text-neutral-600">
                      Advanced tracking technology providing real-time visibility of your cargo's location throughout the shipping journey.
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Ocean freight container ship" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="air-freight"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.pexels.com/photos/11192837/pexels-photo-11192837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Air freight cargo plane" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-4">
                  <Plane className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Air Freight</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  When speed is essential, our air freight services provide the fastest transportation option for your cargo. Whether you need next-flight-out service or cost-effective standard air freight, we provide reliable solutions with access to major airlines and cargo carriers worldwide.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Express Air Freight</h3>
                    <p className="text-neutral-600">
                      Priority handling and accelerated transit times for time-critical shipments, with next-flight-out options available and same-day or next-day delivery guarantees.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Standard Air Freight</h3>
                    <p className="text-neutral-600">
                      Balanced solution offering reasonable transit times at competitive rates for less urgent cargo with flexible scheduling options.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Charter Services</h3>
                    <p className="text-neutral-600">
                      Dedicated aircraft solutions for oversized, heavy, or project-specific cargo requirements with complete control over routing and timing.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Temperature-Controlled Transport</h3>
                    <p className="text-neutral-600">
                      Specialized air cargo services for perishable goods, pharmaceuticals, and temperature-sensitive products with monitored environments.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="land-freight">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Truck className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Road Transportation</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  Our extensive road transportation network offers flexible and reliable shipping options for domestic and cross-border freight. We provide comprehensive trucking services with nationwide coverage and specialized equipment for various cargo types.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Full Truckload (FTL)</h3>
                    <p className="text-neutral-600">
                      Dedicated trucks for exclusive use, ideal for larger shipments requiring full vehicle capacity and faster transit times.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Less Than Truckload (LTL)</h3>
                    <p className="text-neutral-600">
                      Cost-effective solution for smaller shipments where you only pay for the space your cargo occupies, with consolidated shipping options.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Expedited Services</h3>
                    <p className="text-neutral-600">
                      Priority handling and accelerated transit times for time-sensitive shipments with guaranteed delivery windows.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Specialized Transportation</h3>
                    <p className="text-neutral-600">
                      Temperature-controlled vehicles, hazardous materials handling, and oversized load transportation with appropriate equipment and permits.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Trucks and road transportation" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16" id="rail-freight">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src="/railFreight.png" 
                  alt="Rail freight train" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="flex items-center mb-4">
                  <Train className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">Rail Freight</h2>
                </div>
                <p className="text-neutral-600 mb-6">
                  Cost-effective and environmentally friendly rail freight solutions for long-distance bulk transportation. Ideal for heavy cargo, bulk commodities, and intermodal shipments across major rail corridors. Our rail services offer significant cost savings and reduced carbon footprint compared to road transport.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Intermodal Container Services</h3>
                    <p className="text-neutral-600">
                      Seamless container transport via rail with easy transfer to trucks for final delivery, combining the efficiency of rail with the flexibility of road transport.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Bulk Commodity Transport</h3>
                    <p className="text-neutral-600">
                      Specialized railcars for bulk materials including grains, coal, minerals, and other commodities requiring large-volume transport.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Heavy Machinery Handling</h3>
                    <p className="text-neutral-600">
                      Flatcars and specialized rail equipment for transporting oversized and heavy machinery, construction equipment, and industrial components.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Cross-Border Rail Connections</h3>
                    <p className="text-neutral-600">
                      Extensive network connecting major trade routes across borders, facilitating international rail freight with customs coordination.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Eco-Friendly Transportation</h3>
                    <p className="text-neutral-600">
                      Significantly lower carbon emissions per ton-mile compared to road transport, making rail an environmentally responsible choice for large shipments.
                    </p>
                  </div>
                </div>
              </motion.div>
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
