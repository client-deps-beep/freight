import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Ultimate Freight & Cargo</h3>
            <p className="text-neutral-300 mb-4">
              Your trusted partner for global logistics and freight solutions. Connecting businesses worldwide since 2005.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#f39c12] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-neutral-300 hover:text-white transition-colors">Home</a></Link></li>
              <li><Link href="/about"><a className="text-neutral-300 hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/services"><a className="text-neutral-300 hover:text-white transition-colors">Services</a></Link></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Track Shipment</a></li>
              <li><Link href="/quote"><a className="text-neutral-300 hover:text-white transition-colors">Get a Quote</a></Link></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Ocean Freight</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Air Freight</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Land Transportation</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Customs Clearance</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Warehousing</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Supply Chain Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-[#f39c12]" />
                <span className=" text-neutral-300 text-xs">METROPLEX EAST MALL, UNIT NO. 303, 
                  <br/> THIRD FLOOR, LAXMI NAGAR NEW DELHI – 110092
                  <br/>Global City, NY 10001, USA</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mt-1 mr-3 text-[#f39c12]" />
                <span className="text-neutral-300">+91 82875 82275</span>
                
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mt-1 mr-3 text-[#f39c12]" />
                <span className="text-neutral-300">info@ultimatefreight.com</span>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 mt-1 mr-3 text-[#f39c12]" />
                <span className="text-neutral-300">Monday-Friday: 8AM-6PM<br/>Saturday: 9AM-1PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ultimate Freight & Cargo. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
