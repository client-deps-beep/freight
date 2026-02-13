import { useState, useEffect } from "react";
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
import { Loader2, DollarSign, TruckIcon, Clock, MapPin } from "lucide-react";
import { countries, currencies, getCountryByCode, getCityByCode } from "@/lib/countries";
import { getPricingConfig, saveQuery, PricingConfig } from "@/lib/storage";
import { motion, AnimatePresence } from "framer-motion";

// Define the schema for price calculation
const priceCalculatorSchema = z.object({
  originCountry: z.string().min(1, { message: "Please select origin country" }),
  originCity: z.string().min(1, { message: "Please select origin city" }),
  destinationCountry: z.string().min(1, { message: "Please select destination country" }),
  destinationCity: z.string().min(1, { message: "Please select destination city" }),
  shipmentType: z.string().min(1, { message: "Please select a shipment type" }),
  weight: z.coerce.number().min(0.1, { message: "Weight must be at least 0.1 kg" }),
  dimensions: z.object({
    length: z.coerce.number().min(1, { message: "Length must be at least 1 cm" }),
    width: z.coerce.number().min(1, { message: "Width must be at least 1 cm" }),
    height: z.coerce.number().min(1, { message: "Height must be at least 1 cm" })
  }),
  currency: z.string().min(1, { message: "Please select currency" }),
  urgent: z.boolean().default(false)
});

type FormData = z.infer<typeof priceCalculatorSchema>;

type PriceResult = {
  price: number;
  priceInSelectedCurrency: number;
  breakdown: {
    baseFee: number;
    weightFee: number;
    handlingFee: number;
    fuelSurcharge: number;
    insuranceFee: number;
    urgentFee: number;
  };
  currency: string;
  currencySymbol: string;
  estimatedDelivery: {
    days: number;
    date: string;
  };
  shippingCodes: {
    origin: string;
    destination: string;
  };
};

// Function to calculate shipping price based on form data
function calculateShippingPrice(data: FormData, config: PricingConfig): PriceResult {
  const originCountry = getCountryByCode(data.originCountry);
  const destinationCountry = getCountryByCode(data.destinationCountry);
  const originCity = getCityByCode(data.originCountry, data.originCity);
  const destinationCity = getCityByCode(data.destinationCountry, data.destinationCity);
  
  // Get base fee from config
  const baseFee = config.baseFees[data.shipmentType as keyof typeof config.baseFees] || config.baseFees.ocean;
  
  // Calculate dimensional weight (L x W x H / 5000 for cm - standard IATA formula)
  const volumeCm3 = data.dimensions.length * data.dimensions.width * data.dimensions.height;
  const dimensionalWeightKg = Math.ceil(volumeCm3 / 5000);
  
  // Use the greater of actual or dimensional weight
  const chargeableWeightKg = Math.max(data.weight, dimensionalWeightKg);
  
  // Weight fee calculation
  const weightFee = chargeableWeightKg > config.weightThresholdKg 
    ? (chargeableWeightKg - config.weightThresholdKg) * config.weightFeePerKg 
    : 0;
  
  // Calculate handling fee
  const handlingFee = baseFee * (config.handlingFeePercent / 100);
  
  // Calculate fuel surcharge
  const fuelSurcharge = baseFee * (config.fuelSurchargePercent / 100);
  
  // Insurance (percentage of base + weight)
  const insuranceFee = (baseFee + weightFee) * (config.insuranceFeePercent / 100);
  
  // Urgent fee
  const urgentFee = data.urgent ? (baseFee + weightFee) * (config.urgentFeePercent / 100) : 0;
  
  // Total price in USD
  const priceUSD = baseFee + weightFee + handlingFee + fuelSurcharge + insuranceFee + urgentFee;
  
  // Convert to selected currency
  const exchangeRate = config.exchangeRates[data.currency] || 1;
  const priceInSelectedCurrency = priceUSD * exchangeRate;
  
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
  
  const selectedCurrency = currencies.find(c => c.code === data.currency);
  
  return {
    price: Math.round(priceUSD * 100) / 100,
    priceInSelectedCurrency: Math.round(priceInSelectedCurrency * 100) / 100,
    breakdown: {
      baseFee: Math.round(baseFee * 100) / 100,
      weightFee: Math.round(weightFee * 100) / 100,
      handlingFee: Math.round(handlingFee * 100) / 100,
      fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
      insuranceFee: Math.round(insuranceFee * 100) / 100,
      urgentFee: Math.round(urgentFee * 100) / 100
    },
    currency: data.currency,
    currencySymbol: selectedCurrency?.symbol || '$',
    estimatedDelivery: {
      days: deliveryDays,
      date: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    shippingCodes: {
      origin: `${originCountry?.shippingCode || ''}-${originCity?.code || ''}`,
      destination: `${destinationCountry?.shippingCode || ''}-${destinationCity?.code || ''}`,
    }
  };
}

export default function PriceCalculatorSection() {
  const { toast } = useToast();
  const [isCalculating, setIsCalculating] = useState(false);
  const [priceResult, setPriceResult] = useState<PriceResult | null>(null);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | null>(null);
  const [originCities, setOriginCities] = useState<typeof countries[0]['cities']>([]);
  const [destinationCities, setDestinationCities] = useState<typeof countries[0]['cities']>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(priceCalculatorSchema),
    defaultValues: {
      originCountry: "",
      originCity: "",
      destinationCountry: "",
      destinationCity: "",
      shipmentType: "",
      weight: 1,
      dimensions: {
        length: 10,
        width: 10,
        height: 10
      },
      currency: "USD",
      urgent: false,
    },
  });

  // Load pricing config on mount
  useEffect(() => {
    const config = getPricingConfig();
    setPricingConfig(config);
  }, []);

  // Update cities when country changes
  const originCountry = form.watch("originCountry");
  const destinationCountry = form.watch("destinationCountry");

  useEffect(() => {
    if (originCountry) {
      const country = getCountryByCode(originCountry);
      setOriginCities(country?.cities || []);
      form.setValue("originCity", "");
    }
  }, [originCountry, form]);

  useEffect(() => {
    if (destinationCountry) {
      const country = getCountryByCode(destinationCountry);
      setDestinationCities(country?.cities || []);
      form.setValue("destinationCity", "");
    }
  }, [destinationCountry, form]);

  // Real-time calculation on form change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (
        value.originCountry &&
        value.originCity &&
        value.destinationCountry &&
        value.destinationCity &&
        value.shipmentType &&
        value.weight &&
        value.dimensions?.length &&
        value.dimensions?.width &&
        value.dimensions?.height &&
        value.currency &&
        pricingConfig
      ) {
        try {
          const result = calculateShippingPrice(value as FormData, pricingConfig);
          setPriceResult(result);
        } catch (error) {
          // Silently fail for real-time updates
        }
      } else {
        setPriceResult(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, pricingConfig]);

  function onSubmit(data: FormData) {
    if (!pricingConfig) {
      toast({
        title: "Error",
        description: "Pricing configuration not loaded. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    setPriceResult(null);

    // Small delay for UX
    setTimeout(() => {
      try {
        const result = calculateShippingPrice(data, pricingConfig);
        setPriceResult(result);
        
        // Save query to localStorage
        saveQuery({
          type: 'price_calculation',
          data: {
            ...data,
            result: {
              price: result.price,
              priceInSelectedCurrency: result.priceInSelectedCurrency,
              currency: result.currency,
              estimatedDelivery: result.estimatedDelivery,
              shippingCodes: result.shippingCodes,
            }
          }
        });

        setIsCalculating(false);
        toast({
          title: "Price Calculated",
          description: "Your quote has been calculated and saved.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to calculate price. Please try again.",
          variant: "destructive",
        });
        setIsCalculating(false);
      }
    }, 300);
  }

  if (!pricingConfig) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading calculator...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background with blue shades */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100/50 to-sky-50"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-400/10 to-sky-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-blue-600">Instant</span> <span className="text-sky-600">Price Estimate</span>
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600 text-lg">
            Fill out the form below to get a real-time price estimate for your shipment needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="originCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="originCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin City</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!originCountry || originCities.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {originCities.map((city) => (
                              <SelectItem key={city.code} value={city.code}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="destinationCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="destinationCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination City</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!destinationCountry || destinationCities.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {destinationCities.map((city) => (
                              <SelectItem key={city.code} value={city.code}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0.1" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Dimensions (cm)</h3>
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
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name} ({currency.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg transition-all duration-300 font-semibold"
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {priceResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-xl overflow-hidden relative card-hover">
                    <div className="absolute inset-0 p-[2px] rounded-lg bg-gradient-to-r from-blue-500/80 via-sky-500/80 to-indigo-500/80 opacity-70"></div>
                    
                    <div className="relative rounded-lg frosted-glass-card overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-500/5 to-sky-500/5 backdrop-blur-md">
                        <CardTitle className="flex items-center text-2xl">
                          <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                          <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Price Estimate</span>
                        </CardTitle>
                        <CardDescription>
                          Based on the information you provided
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-8">
                        <div className="mb-8 text-center">
                          <div className="text-5xl font-bold">
                            <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                              {priceResult.currencySymbol}{priceResult.priceInSelectedCurrency.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-sm font-normal text-neutral-500 ml-1">{priceResult.currency}</span>
                          </div>
                          <div className="mt-2 text-sm text-neutral-500">
                            ≈ ${priceResult.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                          </div>
                        </div>

                        {/* Shipping Codes */}
                        <div className="mb-6 p-4 bg-blue-50/50 rounded-lg border border-blue-200/50">
                          <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            Shipping Codes
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-neutral-600">Origin:</span>
                              <span className="font-mono font-semibold text-blue-700 ml-2">{priceResult.shippingCodes.origin}</span>
                            </div>
                            <div>
                              <span className="text-neutral-600">Destination:</span>
                              <span className="font-mono font-semibold text-blue-700 ml-2">{priceResult.shippingCodes.destination}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full mr-3">
                                <TruckIcon className="h-5 w-5 text-blue-600" />
                              </div>
                              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Price Breakdown</span>
                            </h3>
                            <ul className="space-y-3 bg-blue-50/50 p-4 rounded-lg">
                              <li className="flex justify-between">
                                <span className="text-neutral-600">Base Fee:</span>
                                <span className="font-medium">${priceResult.breakdown.baseFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-neutral-600">Weight Fee:</span>
                                <span className="font-medium">${priceResult.breakdown.weightFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-neutral-600">Handling Fee:</span>
                                <span className="font-medium">${priceResult.breakdown.handlingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-neutral-600">Fuel Surcharge:</span>
                                <span className="font-medium">${priceResult.breakdown.fuelSurcharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-neutral-600">Insurance:</span>
                                <span className="font-medium">${priceResult.breakdown.insuranceFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </li>
                              {priceResult.breakdown.urgentFee > 0 && (
                                <li className="flex justify-between">
                                  <span className="text-neutral-600">Urgent Delivery Fee:</span>
                                  <span className="font-medium">${priceResult.breakdown.urgentFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                              <div className="p-2 bg-gradient-to-br from-sky-500/20 to-sky-600/20 rounded-full mr-3">
                                <Clock className="h-5 w-5 text-sky-600" />
                              </div>
                              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Estimated Delivery</span>
                            </h3>
                            <p className="text-neutral-600 bg-sky-50/50 p-4 rounded-lg">
                              Approximately {priceResult.estimatedDelivery.days} {priceResult.estimatedDelivery.days === 1 ? 'day' : 'days'} ({priceResult.estimatedDelivery.date})
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="bg-gradient-to-r from-blue-50 to-sky-50 text-sm text-neutral-600 flex-col items-start">
                        <p className="mb-1">* This is an estimate only. Final pricing may vary based on actual shipment details.</p>
                        <p>* Customs duties and taxes are not included in this estimate.</p>
                      </CardFooter>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center items-center p-8 border border-white/20 rounded-lg frosted-glass-card"
                >
                  <div className="text-center relative z-10">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-300 to-sky-300 flex items-center justify-center shadow-xl">
                        <DollarSign className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-700 mb-2">Your Price Estimate</h3>
                    <p className="text-neutral-600 mb-6">
                      Fill out the form to get an instant shipping estimate. Prices update in real-time as you enter details.
                    </p>
                    <div className="text-sm text-neutral-600 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md">
                      <p className="mb-2 font-medium">What you'll get:</p>
                      <p className="flex items-center mb-1"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Real-time price updates</p>
                      <p className="flex items-center mb-1"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Detailed price breakdown</p>
                      <p className="flex items-center"><span className="w-2 h-2 rounded-full bg-sky-500 mr-2"></span> Shipping codes & delivery estimates</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
