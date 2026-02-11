import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";

// Define the shipping price calculation request schema
const shippingPriceRequestSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  shipmentType: z.string(),
  weight: z.number().optional(),
  dimensions: z.object({
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional()
  }).optional(),
  urgent: z.boolean().optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for calculating shipping prices
  app.post("/api/calculate-price", async (req, res) => {
    try {
      const priceData = shippingPriceRequestSchema.parse(req.body);
      
      // Calculate shipping price based on the provided data
      const price = calculateShippingPrice(priceData);
      
      // Return the calculated price
      res.status(200).json({ 
        price: price.total,
        breakdown: price.breakdown,
        currency: "USD",
        estimatedDelivery: price.estimatedDelivery
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // API endpoints for quote requests
  app.post("/api/quote", async (req, res) => {
    try {
      const quoteData = insertQuoteRequestSchema.parse(req.body);
      const newQuote = await storage.createQuoteRequest(quoteData);
      res.status(201).json({ 
        message: "Quote request submitted successfully",
        data: newQuote 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // API endpoints for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(contactData);
      res.status(201).json({ 
        message: "Message sent successfully",
        data: newMessage 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Shipping price calculation logic
function calculateShippingPrice(data: z.infer<typeof shippingPriceRequestSchema>) {
  const { 
    origin, 
    destination, 
    shipmentType, 
    weight = 10, 
    dimensions = { length: 10, width: 10, height: 10 }, 
    urgent = false 
  } = data;
  
  // Ensure dimensions are valid numbers
  const dims = {
    length: dimensions.length ?? 10,
    width: dimensions.width ?? 10,
    height: dimensions.height ?? 10
  };
  
  // Base pricing factors - these would typically come from a database in a real app
  const basePriceByType: Record<string, number> = {
    'ocean': 500,
    'air': 1200,
    'ground': 300,
    'express': 800,
    'rail': 400
  };
  
  // Simplified distance calculation - in a real app you'd use geocoding APIs or distance matrices
  const distanceFactors = {
    'domestic': 1,
    'regional': 1.5,
    'international': 2.5,
    'intercontinental': 3.2
  };
  
  // Determine distance factor based on origin/destination
  // This is a simplified version - real implementation would use geocoding
  let distanceFactor = 1;
  if (origin.includes('USA') && destination.includes('USA')) {
    distanceFactor = distanceFactors.domestic;
  } else if ((origin.includes('USA') && destination.includes('Canada')) || 
             (origin.includes('Canada') && destination.includes('USA'))) {
    distanceFactor = distanceFactors.regional;
  } else if (origin.includes('USA') && destination.includes('Europe') || 
             origin.includes('Europe') && destination.includes('USA')) {
    distanceFactor = distanceFactors.international;
  } else {
    distanceFactor = distanceFactors.intercontinental;
  }
  
  // Calculate volume in cubic feet
  const volume = (dims.length * dims.width * dims.height) / 1728; // convert cubic inches to cubic feet
  
  // Determine which is greater - actual weight or dimensional weight
  const dimWeight = volume * 10; // Industry standard dimensional weight factor
  const calculatedWeight = Math.max(weight, dimWeight);
  
  // Base price for the selected shipment type
  const basePrice = shipmentType in basePriceByType ? basePriceByType[shipmentType] : 500;
  
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
    total: Math.round(total * 100) / 100,
    breakdown: {
      baseFee: Math.round(distancePrice * 100) / 100,
      weightFee: Math.round(weightPrice * 100) / 100,
      handlingFee: handlingFee,
      fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
      insuranceFee: Math.round(insuranceFee * 100) / 100,
      urgentFee: Math.round(urgentFee * 100) / 100
    },
    estimatedDelivery: {
      days: estimatedDeliveryDays,
      date: deliveryDate.toISOString().split('T')[0]
    }
  };
}
