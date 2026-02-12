import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "/logo-ufcspl.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActiveLink = (path: string) => {
    return location === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 frosted-glass shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
         <div className="flex-shrink-0 flex items-center space-x-2 max-w-full">
  <Link href="/" className="flex items-center space-x-2">
    <img 
      src={logo}
      alt="Ultimate Freight & Cargo Logo" 
      className="h-10 sm:h-14 md:h-16 lg:h-16 w-auto"
    />
    <div className="text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
      <span className="block text-[#085bf5]">Ultimate</span> 
      <span className="block text-[#085bf5]">Freight & Cargo Shippers Pvt Ltd</span>
    </div>
  </Link>
</div>

          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/">
                <a className={`font-medium ${isActiveLink('/') ? 'text-primary border-b-2 border-primary' : 'text-neutral-600 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-2 transition-colors`}>
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a className={`font-medium ${isActiveLink('/about') ? 'text-primary border-b-2 border-primary' : 'text-neutral-600 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-2 transition-colors`}>
                  About
                </a>
              </Link>
              <Link href="/services">
                <a className={`font-medium ${isActiveLink('/services') ? 'text-primary border-b-2 border-primary' : 'text-neutral-600 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-2 transition-colors`}>
                  Services
                </a>
              </Link>
              <Link href="/contact">
                <a className={`font-medium ${isActiveLink('/contact') ? 'text-primary border-b-2 border-primary' : 'text-neutral-600 hover:text-primary hover:border-b-2 hover:border-primary'} px-1 py-2 transition-colors`}>
                  Contact Us
                </a>
              </Link>
              <Link href="/quote">
                <Button className="bg-[#085bf5]/80 hover:bg-[#085bf5] text-white">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/">
                <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActiveLink('/') ? 'text-primary bg-neutral-100' : 'text-neutral-600 hover:text-primary hover:bg-neutral-100'}`}>
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActiveLink('/about') ? 'text-primary bg-neutral-100' : 'text-neutral-600 hover:text-primary hover:bg-neutral-100'}`}>
                  About
                </a>
              </Link>
              <Link href="/services">
                <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActiveLink('/services') ? 'text-primary bg-neutral-100' : 'text-neutral-600 hover:text-primary hover:bg-neutral-100'}`}>
                  Services
                </a>
              </Link>
              <Link href="/contact">
                <a className={`block px-3 py-2 text-base font-medium rounded-md ${isActiveLink('/contact') ? 'text-primary bg-neutral-100' : 'text-neutral-600 hover:text-primary hover:bg-neutral-100'}`}>
                  Contact Us
                </a>
              </Link>
              <Link href="/quote">
                <a className="block px-3 py-2 text-base font-medium bg-primary text-white hover:bg-primary/80 rounded-md mt-2">
                  Get a Quote
                </a>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
