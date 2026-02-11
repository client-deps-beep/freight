import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { initEmailJs, sendQuoteRequestEmail } from "@/lib/emailService";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { insertQuoteRequestSchema } from "@shared/schema";
import { shipmentTypes } from "@/lib/data";
import { Loader2 } from "lucide-react";

// Extend the schema with client-side validation
const formSchema = insertQuoteRequestSchema.extend({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  shipmentType: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  additionalInfo: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteSection() {
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
      fullName: "",
      email: "",
      phone: "",
      company: "",
      shipmentType: "",
      origin: "",
      destination: "",
      additionalInfo: "",
      terms: false,
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    
    try {
      if (!emailJsInitialized) {
        throw new Error("Email service not initialized yet. Please try again.");
      }
      
      // Prepare template parameters for quote request
      const templateParams = {
        from_name: data.fullName,
        from_email: data.email,
        phone: data.phone || "Not provided",
        company: data.company || "Not provided",
        shipment_type: data.shipmentType || "Not specified",
        origin: data.origin || "Not specified",
        destination: data.destination || "Not specified",
        details: data.additionalInfo || "No additional information provided"
      };
      
      // Send email using our email service utility
      const response = await sendQuoteRequestEmail(templateParams);
      
      if (response.status === 200) {
        toast({
          title: "Quote Request Sent",
          description: "Your quote request has been submitted successfully. We'll contact you within 24 hours.",
        });
        form.reset();
      } else {
        throw new Error("Failed to submit your quote request. Please try again.");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Request a Free Quote Today</h2>
            <p className="text-neutral-100">
              Fill out the form below to get a customized shipping quote tailored to your specific needs. Our team will respond within 24 hours.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg p-6 sm:p-8 shadow-xl text-neutral-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="shipmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipment Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a shipment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shipmentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin (City, Country)</FormLabel>
                      <FormControl>
                        <Input placeholder="New York, USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination (City, Country)</FormLabel>
                      <FormControl>
                        <Input placeholder="London, UK" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about your cargo (dimensions, weight, special requirements, etc.)"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex items-center mb-6">
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          id="terms" 
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-neutral-600">
                          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/80 text-white font-medium py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
