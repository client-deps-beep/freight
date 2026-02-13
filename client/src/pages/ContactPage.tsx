import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { initEmailJs, sendContactEmail } from "@/lib/emailService";
import { saveQuery } from "@/lib/storage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { insertContactMessageSchema } from "@shared/schema";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";

// Extend the schema with client-side validation
const formSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailJsInitialized, setEmailJsInitialized] = useState(false);

  // Initialize EmailJS once the component mounts
  useEffect(() => {
    const result = initEmailJs();
    setEmailJsInitialized(result);
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    // Always store the contact message locally so it can be seen in the admin panel,
    // even if the email service is unavailable.
    saveQuery({
      type: "contact",
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    let emailSucceeded = false;

    if (emailJsInitialized) {
      try {
        // Prepare template parameters
        const templateParams = {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        };

        const response = await sendContactEmail(templateParams);
        emailSucceeded = response.status === 200;
      } catch (error) {
        console.error("EmailJS error (contact):", error);
      }
    }

    if (emailSucceeded) {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll respond to you shortly.",
      });
    } else {
      toast({
        title: "Message Received",
        description:
          "We've received your message and stored it safely. Our team will review it even though the email service is currently unavailable.",
      });
    }

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - Ultimate Freight and Cargo Shippers</title>
        <meta name="description" content="Get in touch with Ultimate Freight and Cargo Shippers for all your shipping and logistics needs. Contact our customer service team for inquiries and support." />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-sky-500/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg md:text-xl text-blue-50">
                Have questions about our services? Need a custom shipping solution? Our team is here to help you with all your logistics needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Info & Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-6">Get In Touch</h2>
                <p className="text-neutral-600 mb-8">
                  Whether you have a question about our services, need a custom shipping solution, or want to discuss your logistics needs, our team is ready to assist you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-neutral-800">Head Office</h3>
                      <p className="text-neutral-600">
                        METROPLEX EAST MALL, UNIT NO. 303, THIRD FLOOR, LAXMI NAGAR<br/>
                        New Delhi, Delhi 110092
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-neutral-800">Phone</h3>
                      <p className="text-neutral-600">
                        Customer Service: +91 82875 82275<br/>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-neutral-800">Email</h3>
                      <p className="text-neutral-600">
                        General Inquiries: info@ultimatefreight.com<br/>
                        Customer Support: support@ultimatefreight.com<br/>
                        Sales: sales@ultimatefreight.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-neutral-800">Business Hours</h3>
                      <p className="text-neutral-600">
                        Monday-Friday: 8:00 AM - 6:00 PM<br/>
                        Saturday: 9:00 AM - 1:00 PM<br/>
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help you?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about your inquiry..."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-medium py-3 shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4">Our Locations</h2>
              <p className="max-w-3xl mx-auto text-neutral-600">
                With offices and logistics centers around the world, we're never far from you.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30599844!2d77.2811!3d28.6358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2c0f4e5c6f1%3A0x4a3b2e4b8f4f4e7b!2sMetroplex%20East%20Mall%2C%20Unit%20No.%20303%2C%20Third%20Floor%2C%20Laxmi%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110092%2C%20India!5e0!3m2!1sen!2sin!4v1679876051222!5m2!1sen!2sin" 
  width="100%" 
  height="450" 
   style={{ border: 0 }} 
  allowFullScreen
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade" 
  title="Metroplex East Mall, Laxmi Nagar"
></iframe>

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
