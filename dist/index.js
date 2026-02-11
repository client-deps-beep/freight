// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  quoteRequests;
  contactMessages;
  currentUserId;
  currentQuoteRequestId;
  currentContactMessageId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.quoteRequests = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentQuoteRequestId = 1;
    this.currentContactMessageId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createQuoteRequest(insertQuoteRequest) {
    const id = this.currentQuoteRequestId++;
    const createdAt = /* @__PURE__ */ new Date();
    const quoteRequest = { ...insertQuoteRequest, id, createdAt };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }
  async getAllQuoteRequests() {
    return Array.from(this.quoteRequests.values());
  }
  async getQuoteRequest(id) {
    return this.quoteRequests.get(id);
  }
  async createContactMessage(insertContactMessage) {
    const id = this.currentContactMessageId++;
    const createdAt = /* @__PURE__ */ new Date();
    const contactMessage = { ...insertContactMessage, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  async getAllContactMessages() {
    return Array.from(this.contactMessages.values());
  }
  async getContactMessage(id) {
    return this.contactMessages.get(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  shipmentType: text("shipment_type"),
  origin: text("origin"),
  destination: text("destination"),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";
var shippingPriceRequestSchema = z.object({
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
async function registerRoutes(app2) {
  app2.post("/api/calculate-price", async (req, res) => {
    try {
      const priceData = shippingPriceRequestSchema.parse(req.body);
      const price = calculateShippingPrice(priceData);
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
  app2.post("/api/quote", async (req, res) => {
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
  app2.post("/api/contact", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}
function calculateShippingPrice(data) {
  const {
    origin,
    destination,
    shipmentType,
    weight = 10,
    dimensions = { length: 10, width: 10, height: 10 },
    urgent = false
  } = data;
  const dims = {
    length: dimensions.length ?? 10,
    width: dimensions.width ?? 10,
    height: dimensions.height ?? 10
  };
  const basePriceByType = {
    "ocean": 500,
    "air": 1200,
    "ground": 300,
    "express": 800,
    "rail": 400
  };
  const distanceFactors = {
    "domestic": 1,
    "regional": 1.5,
    "international": 2.5,
    "intercontinental": 3.2
  };
  let distanceFactor = 1;
  if (origin.includes("USA") && destination.includes("USA")) {
    distanceFactor = distanceFactors.domestic;
  } else if (origin.includes("USA") && destination.includes("Canada") || origin.includes("Canada") && destination.includes("USA")) {
    distanceFactor = distanceFactors.regional;
  } else if (origin.includes("USA") && destination.includes("Europe") || origin.includes("Europe") && destination.includes("USA")) {
    distanceFactor = distanceFactors.international;
  } else {
    distanceFactor = distanceFactors.intercontinental;
  }
  const volume = dims.length * dims.width * dims.height / 1728;
  const dimWeight = volume * 10;
  const calculatedWeight = Math.max(weight, dimWeight);
  const basePrice = shipmentType in basePriceByType ? basePriceByType[shipmentType] : 500;
  const distancePrice = basePrice * distanceFactor;
  const weightPrice = calculatedWeight * 0.75;
  const urgentFee = urgent ? (distancePrice + weightPrice) * 0.3 : 0;
  const handlingFee = 50;
  const fuelSurcharge = distancePrice * 0.08;
  const subtotal = distancePrice + weightPrice + handlingFee + fuelSurcharge;
  const insuranceFee = subtotal * 0.02;
  const total = subtotal + insuranceFee + urgentFee;
  let estimatedDeliveryDays;
  if (shipmentType === "express") {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 1.5);
  } else if (shipmentType === "air") {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 2.5);
  } else if (shipmentType === "ocean") {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 12);
  } else if (shipmentType === "ground") {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 5);
  } else if (shipmentType === "rail") {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 7);
  } else {
    estimatedDeliveryDays = Math.ceil(distanceFactor * 5);
  }
  if (urgent) {
    estimatedDeliveryDays = Math.max(1, Math.floor(estimatedDeliveryDays * 0.7));
  }
  const today = /* @__PURE__ */ new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + estimatedDeliveryDays);
  return {
    total: Math.round(total * 100) / 100,
    breakdown: {
      baseFee: Math.round(distancePrice * 100) / 100,
      weightFee: Math.round(weightPrice * 100) / 100,
      handlingFee,
      fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
      insuranceFee: Math.round(insuranceFee * 100) / 100,
      urgentFee: Math.round(urgentFee * 100) / 100
    },
    estimatedDelivery: {
      days: estimatedDeliveryDays,
      date: deliveryDate.toISOString().split("T")[0]
    }
  };
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
