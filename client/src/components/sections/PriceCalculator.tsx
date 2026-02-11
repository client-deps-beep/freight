import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, DollarSign, TruckIcon, Clock } from "lucide-react";

// Define the schema for price calculation
const priceCalculatorSchema = z.object({
  origin: z.string().min(2, { message: "Origin is required" }),
  destination: z.string().min(2, { message: "Destination is required" }),
  shipmentType: z.string().min(1, { message: "Please select a shipment type" }),
  weight: z.coerce.number().min(1, { message: "Weight must be at least 1 lb" }),
  dimensions: z.object({
    length: z.coerce.number().min(1, { message: "Length must be at least 1 inch" }),
    width: z.coerce.number().min(1, { message: "Width must be at least 1 inch" }),
    height: z.coerce.number().min(1, { message: "Height must be at least 1 inch" })
  }),
  urgent: z.boolean().default(false)
});

type FormData = z.infer<typeof priceCalculatorSchema>;

type PriceResult = {
  price: number;
  breakdown: {
    baseFee: number;
    weightFee: number;
    handlingFee: number;
    fuelSurcharge: number;
    insuranceFee: number;
    urgentFee: number;
  };
  currency: string;
  estimatedDelivery: {
    days: number;
    date: string;
  };
};

// Function to calculate shipping price based on form data
function calculateShippingPrice(data: FormData): PriceResult {
  // Base fee by shipment type
  const baseFeesByType: Record<string, number> = {
    ocean: 350,
    air: 550,
    ground: 200,
    express: 650,
    rail: 300
  };
  
  // Get base fee
  const baseFee = baseFeesByType[data.shipmentType] || 350;
  
  // Calculate dimensional weight (L x W x H / 139 for inches)
  const volume = data.dimensions.length * data.dimensions.width * data.dimensions.height;
  const dimensionalWeight = Math.ceil(volume / 139);
  
  // Use the greater of actual or dimensional weight
  const chargeableWeight = Math.max(data.weight, dimensionalWeight);
  
  // Weight fee = $3 per pound over 10 pounds
  const weightFee = chargeableWeight > 10 ? (chargeableWeight - 10) * 3 : 0;
  
  // Calculate handling fee (5% of base fee)
  const handlingFee = baseFee * 0.05;
  
  // Calculate fuel surcharge (10% of base fee)
  const fuelSurcharge = baseFee * 0.1;
  
  // Insurance (0.5% of (base + weight))
  const insuranceFee = (baseFee + weightFee) * 0.005;
  
  // Urgent fee (50% extra if urgent)
  const urgentFee = data.urgent ? (baseFee + weightFee) * 0.5 : 0;
  
  // Total price
  const price = baseFee + weightFee + handlingFee + fuelSurcharge + insuranceFee + urgentFee;
  
  // Estimate delivery date
  const today = new Date();
  let deliveryDays = 0;
  
  switch (data.shipmentType) {
    case 'express':
      deliveryDays = data.urgent ? 1 : 2;
      break;
    case 'air':
      deliveryDays = data.urgent ? 2 : 4;
      break;
    case 'ground':
      deliveryDays = data.urgent ? 3 : 5;
      break;
    case 'ocean':
      deliveryDays = data.urgent ? 10 : 20;
      break;
    case 'rail':
      deliveryDays = data.urgent ? 4 : 8;
      break;
    default:
      deliveryDays = data.urgent ? 3 : 7;
  }
  
  const deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() + deliveryDays);
  
  return {
    price: Math.round(price * 100) / 100,
    breakdown: {
      baseFee: Math.round(baseFee * 100) / 100,
      weightFee: Math.round(weightFee * 100) / 100,
      handlingFee: Math.round(handlingFee * 100) / 100,
      fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
      insuranceFee: Math.round(insuranceFee * 100) / 100,
      urgentFee: Math.round(urgentFee * 100) / 100
    },
    currency: "USD",
    estimatedDelivery: {
      days: deliveryDays,
      date: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  };
}

export default function PriceCalculatorSection() {
  const { toast } = useToast();
  const [isCalculating, setIsCalculating] = useState(false);
  const [priceResult, setPriceResult] = useState<PriceResult | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(priceCalculatorSchema),
    defaultValues: {
      origin: "",
      destination: "",
      shipmentType: "",
      weight: 10,
      dimensions: {
        length: 10,
        width: 10,
        height: 10
      },
      urgent: false,
    },
  });

  function onSubmit(data: FormData) {
    setIsCalculating(true);
    setPriceResult(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Calculate price
        const result = calculateShippingPrice(data);
        setPriceResult(result);
        setIsCalculating(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to calculate price. Please try again.",
          variant: "destructive",
        });
        setIsCalculating(false);
      }
    }, 800);
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-blue-50"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-gradient-primary">Instant</span> <span className="text-gradient-secondary">Price Estimate</span>
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600 text-lg">
            Fill out the form below to get a real-time price estimate for your shipment needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                          {/* Convert shipmentTypes to the format needed for this calculator */}
                          <SelectItem value="ocean">Ocean Freight</SelectItem>
                          <SelectItem value="air">Air Freight</SelectItem>
                          <SelectItem value="ground">Ground Shipping</SelectItem>
                          <SelectItem value="express">Express Shipping</SelectItem>
                          <SelectItem value="rail">Rail Freight</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (lbs)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Dimensions (inches)</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <FormField
                      control={form.control}
                      name="dimensions.length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dimensions.width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dimensions.height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="urgent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Urgent Delivery</FormLabel>
                        <p className="text-sm text-neutral-500">
                          Check this box for expedited shipping (additional fees apply)
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full gradient-cta-bg hover:shadow-lg transition-all duration-300 font-semibold"
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Calculate Price"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            {priceResult ? (
              <Card className="border-0 shadow-lg overflow-hidden relative card-hover">
                {/* Gradient border effect */}
                <div className="absolute inset-0 p-[2px] rounded-lg bg-gradient-to-r from-orange-500/80 via-amber-500/80 to-blue-500/80 opacity-70"></div>
                
                <div className="relative rounded-lg frosted-glass-card overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-500/5 to-blue-500/5 backdrop-blur-md">
                    <CardTitle className="flex items-center text-2xl">
                      <DollarSign className="h-6 w-6 mr-2 text-gradient-primary" />
                      <span className="text-gradient-blend">Price Estimate</span>
                    </CardTitle>
                    <CardDescription>
                      Based on the information you provided
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-8">
                    <div className="mb-8 text-center">
                      <div className="text-5xl font-bold">
                        <span className="text-gradient-primary">${priceResult.price.toLocaleString()}</span>
                        <span className="text-sm font-normal text-neutral-500 ml-1">{priceResult.currency}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full mr-3">
                            <TruckIcon className="h-5 w-5 text-orange-600" />
                          </div>
                          <span className="text-gradient-primary">Price Breakdown</span>
                        </h3>
                        <ul className="space-y-3 bg-orange-50/50 p-4 rounded-lg">
                          <li className="flex justify-between">
                            <span className="text-neutral-600">Base Fee:</span>
                            <span className="font-medium">${priceResult.breakdown.baseFee.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-neutral-600">Weight Fee:</span>
                            <span className="font-medium">${priceResult.breakdown.weightFee.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-neutral-600">Handling Fee:</span>
                            <span className="font-medium">${priceResult.breakdown.handlingFee.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-neutral-600">Fuel Surcharge:</span>
                            <span className="font-medium">${priceResult.breakdown.fuelSurcharge.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-neutral-600">Insurance:</span>
                            <span className="font-medium">${priceResult.breakdown.insuranceFee.toLocaleString()}</span>
                          </li>
                          {priceResult.breakdown.urgentFee > 0 && (
                            <li className="flex justify-between">
                              <span className="text-neutral-600">Urgent Delivery Fee:</span>
                              <span className="font-medium">${priceResult.breakdown.urgentFee.toLocaleString()}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full mr-3">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="text-gradient-secondary">Estimated Delivery</span>
                        </h3>
                        <p className="text-neutral-600 bg-blue-50/50 p-4 rounded-lg">
                          Approximately {priceResult.estimatedDelivery.days} {priceResult.estimatedDelivery.days === 1 ? 'day' : 'days'} ({priceResult.estimatedDelivery.date})
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gradient-to-r from-orange-50 to-blue-50 text-sm text-neutral-600 flex-col items-start">
                    <p className="mb-1">* This is an estimate only. Final pricing may vary based on actual shipment details.</p>
                    <p>* Customs duties and taxes are not included in this estimate.</p>
                  </CardFooter>
                </div>
              </Card>
            ) : (
              <div className="h-full flex flex-col justify-center items-center p-8 border border-white/20 rounded-lg frosted-glass-card">
                <div className="text-center relative z-10">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-orange-300 to-blue-300 flex items-center justify-center shadow-xl">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-700 mb-2">Your Price Estimate</h3>
                  <p className="text-neutral-600 mb-6">
                    Fill out the form and click "Calculate Price" to get an instant shipping estimate.
                  </p>
                  <div className="text-sm text-neutral-600 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md">
                    <p className="mb-2 font-medium">What you'll get:</p>
                    <p className="flex items-center mb-1"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span> Fast and accurate estimates</p>
                    <p className="flex items-center mb-1"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span> Detailed price breakdown</p>
                    <p className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Estimated delivery timeframes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}