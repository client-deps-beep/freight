import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">Ready to optimize your shipping?</h2>
              <p className="text-neutral-600 mb-6 md:mb-0">
                Join thousands of businesses that trust Ultimate Freight & Cargo with their logistics needs. Contact our team today to get started.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-3">
                  Contact Us Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
