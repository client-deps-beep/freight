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

// This function contains all the price calculation logic in the frontend
function calculateShippingPrice(data: FormData): PriceResult {
  const { origin, destination, shipmentType, weight, dimensions, urgent } = data;
  
  // Base pricing factors
  const basePriceByType = {
    'ocean': 500,
    'air': 1200,
    'ground': 300,
    'express': 800,
    'rail': 400
  };
  
  // Simplified distance calculation
  const distanceFactors = {
    'domestic': 1,
    'regional': 1.5,
    'international': 2.5,
    'intercontinental': 3.2
  };
  
  // Determine distance factor based on origin/destination
  let distanceFactor = 1;
  if (origin.toLowerCase().includes('usa') && destination.toLowerCase().includes('usa')) {
    distanceFactor = distanceFactors.domestic;
  } else if ((origin.toLowerCase().includes('usa') && destination.toLowerCase().includes('canada')) || 
             (origin.toLowerCase().includes('canada') && destination.toLowerCase().includes('usa'))) {
    distanceFactor = distanceFactors.regional;
  } else if (origin.toLowerCase().includes('usa') && destination.toLowerCase().includes('europe') || 
             origin.toLowerCase().includes('europe') && destination.toLowerCase().includes('usa')) {
    distanceFactor = distanceFactors.international;
  } else {
    distanceFactor = distanceFactors.intercontinental;
  }
  
  // Calculate volume in cubic feet
  const volume = (dimensions.length * dimensions.width * dimensions.height) / 1728; // convert cubic inches to cubic feet
  
  // Determine which is greater - actual weight or dimensional weight
  const dimWeight = volume * 10; // Industry standard dimensional weight factor
  const calculatedWeight = Math.max(weight, dimWeight);
  
  // Base price for the selected shipment type
  const basePrice = basePriceByType[shipmentType as keyof typeof basePriceByType] || 500;
  
  // Calculate total price
  const distancePrice = basePrice * distanceFactor;
  const weightPrice = calculatedWeight * 0.75;
  const urgentFee = urgent ? (distancePrice + weightPrice) * 0.3 : 0;
  const handlingFee = 50;
  const fuelSurcharge = distancePrice * 0.08;
  
  const subtotal = distancePrice + weightPrice + handlingFee + fuelSurcharge;
  const insuranceFee = subtotal * 0.02;
  const total = subtotal + insuranceFee + urgentFee;
  
  // Calculate estimated delivery time in days
  let estimatedDeliveryDays;
  if (shipmentType === 'express') {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 1.5);
  } else if (shipmentType === 'air') {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 2.5);
  } else if (shipmentType === 'ocean') {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 12);
  } else if (shipmentType === 'ground') {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 5);
  } else if (shipmentType === 'rail') {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 7);
  } else {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 5);
  }
  
  if (urgent) {
    estimatedDeliveryDays = Math.max(1, Math.floor(estimatedDeliveryDays * 0.7));
  }
  
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + estimatedDeliveryDays);
  
  return {
    price: Math.round(total * 100) / 100,
    breakdown: {
      baseFee: Math.round(distancePrice * 100) / 100,
      weightFee: Math.round(weightPrice * 100) / 100,
      handlingFee: handlingFee,
      fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
      insuranceFee: Math.round(insuranceFee * 100) / 100,
      urgentFee: Math.round(urgentFee * 100) / 100
    },
    currency: "USD",
    estimatedDelivery: {
      days: estimatedDeliveryDays,
      date: deliveryDate.toISOString().split('T')[0]
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
      urgent: false
    },
  });

  function onSubmit(data: FormData) {
    setIsCalculating(true);
    
    // Simulate a short delay to make it feel like a calculation is happening
    setTimeout(() => {
      try {
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
                
                <div className="relative rounded-lg bg-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-500/10 to-blue-500/10">
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
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
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
              <div className="h-full flex flex-col justify-center items-center p-8 border-2 border-dashed border-neutral-200 rounded-lg bg-neutral-50">
                <div className="text-center">
                  <div className="mb-4">
                    <DollarSign className="h-12 w-12 text-neutral-300 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-700 mb-2">Your Price Estimate</h3>
                  <p className="text-neutral-500 mb-6">
                    Fill out the form and click "Calculate Price" to get an instant shipping estimate.
                  </p>
                  <div className="text-sm text-neutral-400">
                    <p>• Fast and accurate estimates</p>
                    <p>• See delivery timeframes</p>
                    <p>• Compare different shipping options</p>
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