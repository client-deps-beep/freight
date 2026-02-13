import { motion } from "framer-motion";
import { Award, Shield, CheckCircle, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const certifications = [
  {
    id: 1,
    name: "MTO Licensed",
    description: "Multimodal Transport Operator",
    icon: Award,
    color: "from-blue-500 to-sky-500",
  },
  {
    id: 2,
    name: "WCA Member",
    description: "World Cargo Alliance Global Network Verified",
    icon: Shield,
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 3,
    name: "IATA Certified",
    description: "International Air Transport Association",
    icon: Globe,
    color: "from-sky-500 to-blue-500",
  },
  {
    id: 4,
    name: "JCtrans GCP Member",
    description: "Global Credit Pass Member\nVerified Logistics Provider\nFinancial & Operational Security Guaranteed",
    icon: CheckCircle,
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: 5,
    name: "CBP Approved",
    description: "Customs and Border Protection Approved",
    icon: Shield,
    color: "from-blue-500 to-sky-600",
  },
  
];

export default function CertificationsSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-400/10 to-sky-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-blue-600">Certifications</span> <span className="text-sky-600">& Compliance</span>
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600 text-lg">
            We maintain the highest standards of quality, security, and compliance to ensure your shipments are handled with the utmost care and professionalism.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className={`h-1 bg-gradient-to-r ${cert.color}`}></div>
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">{cert.name}</h3>
                    <p className="text-neutral-600">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-200/50">
            <p className="text-neutral-700 font-medium">
              All certifications are regularly audited and maintained to ensure continued compliance with international standards.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
