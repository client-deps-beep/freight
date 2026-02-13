// Frontend-only storage utilities using localStorage

export interface QueryRecord {
  id: string;
  type: 'contact' | 'quote' | 'price_calculation';
  timestamp: string;
  data: Record<string, any>;
}

export interface PricingConfig {
  baseFees: {
    ocean: number;
    air: number;
    ground: number;
    express: number;
    rail: number;
  };
  weightFeePerKg: number;
  weightThresholdKg: number;
  handlingFeePercent: number;
  fuelSurchargePercent: number;
  insuranceFeePercent: number;
  urgentFeePercent: number;
  currency: string;
  exchangeRates: Record<string, number>;
}

const STORAGE_KEYS = {
  QUERIES: 'ufc_queries',
  PRICING_CONFIG: 'ufc_pricing_config',
} as const;

// Initialize default pricing configuration
const DEFAULT_PRICING: PricingConfig = {
  baseFees: {
    ocean: 350,
    air: 550,
    ground: 200,
    express: 650,
    rail: 300,
  },
  weightFeePerKg: 6.6, // $3 per lb = ~$6.6 per kg
  weightThresholdKg: 4.5, // 10 lbs = ~4.5 kg
  handlingFeePercent: 5,
  fuelSurchargePercent: 10,
  insuranceFeePercent: 0.5,
  urgentFeePercent: 50,
  currency: 'USD',
  exchangeRates: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.5,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 150.5,
    CNY: 7.24,
  },
};

// Get all queries
export function getAllQueries(): QueryRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUERIES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading queries from storage:', error);
    return [];
  }
}

// Save a query
export function saveQuery(query: Omit<QueryRecord, 'id' | 'timestamp'>): void {
  try {
    const queries = getAllQueries();
    const newQuery: QueryRecord = {
      ...query,
      id: `query_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    queries.push(newQuery);
    localStorage.setItem(STORAGE_KEYS.QUERIES, JSON.stringify(queries));
  } catch (error) {
    console.error('Error saving query to storage:', error);
  }
}

// Get pricing configuration
export function getPricingConfig(): PricingConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRICING_CONFIG);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default if not exists
    setPricingConfig(DEFAULT_PRICING);
    return DEFAULT_PRICING;
  } catch (error) {
    console.error('Error reading pricing config:', error);
    return DEFAULT_PRICING;
  }
}

// Set pricing configuration
export function setPricingConfig(config: PricingConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRICING_CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving pricing config:', error);
  }
}

// Clear all queries (for admin)
export function clearAllQueries(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.QUERIES);
  } catch (error) {
    console.error('Error clearing queries:', error);
  }
}
