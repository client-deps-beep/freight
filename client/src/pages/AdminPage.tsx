import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { getAllQueries,getRemoteQueries, getPricingConfig, setPricingConfig, PricingConfig, QueryRecord } from "@/lib/storage";

import { exportToExcel, loadXLSXLibrary } from "@/lib/excelExport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download,RefreshCw, Settings, Eye, EyeOff, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const { toast } = useToast();
  const [queries, setQueries] = useState<QueryRecord[]>([]);
  const [pricingConfig, setPricingConfigState] = useState<PricingConfig | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const [isSyncing, setIsSyncing] = useState(false);
  // Simple password protection (in production, use proper auth)
  const ADMIN_PASSWORD = "UltimateAdmin123"; // Change this in production

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
  setIsSyncing(true);
  try {
    // Call the newly completed function
    const data = await getRemoteQueries();
    setQueries(data);
    
    // Still pull pricing from local (since that's admin-specific)
    const config = getPricingConfig();
    setPricingConfigState(config);
    
    toast({
      title: "Sync Complete",
      description: `Loaded ${data.length} total queries from Cloud & Local storage.`,
    });
  } catch (error) {
    toast({
      title: "Sync Warning",
      description: "Could not reach the cloud. Showing local data only.",
      variant: "destructive",
    });
  } finally {
    setIsSyncing(false);
  }
};

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      loadData();
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel.",
      });
    } else {
      toast({
        title: "Invalid Password",
        description: "Please enter the correct password.",
        variant: "destructive",
      });
    }
    setPassword("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setPassword("");
  };

  const handleExportExcel = async () => {
    setIsLoading(true);
    try {
      await loadXLSXLibrary();
      
      const exportData = queries.map((query) => {
        const baseData: any = {
          ID: query.id,
          Type: query.type,
          Timestamp: new Date(query.timestamp).toLocaleString(),
        };

        if (query.type === "contact") {
          return {
            ...baseData,
            Name: query.data.name || "",
            Email: query.data.email || "",
            Subject: query.data.subject || "",
            Message: query.data.message || "",
          };
        } else if (query.type === "quote") {
          return {
            ...baseData,
            "Full Name": query.data.fullName || "",
            Email: query.data.email || "",
            Phone: query.data.phone || "",
            Company: query.data.company || "",
            "Shipment Type": query.data.shipmentType || "",
            Origin: query.data.origin || "",
            Destination: query.data.destination || "",
            "Additional Info": query.data.additionalInfo || "",
          };
        } else if (query.type === "price_calculation") {
          return {
            ...baseData,
            "Origin Country": query.data.originCountry || "",
            "Origin City": query.data.originCity || "",
            "Destination Country": query.data.destinationCountry || "",
            "Destination City": query.data.destinationCity || "",
            "Shipment Type": query.data.shipmentType || "",
            Weight: query.data.weight || "",
            "Dimensions (LxWxH)": `${query.data.dimensions?.length || ""}x${query.data.dimensions?.width || ""}x${query.data.dimensions?.height || ""}`,
            Currency: query.data.currency || "",
            Urgent: query.data.urgent ? "Yes" : "No",
            Price: query.data.result?.priceInSelectedCurrency || "",
            "Price Currency": query.data.result?.currency || "",
            "Shipping Codes": `${query.data.result?.shippingCodes?.origin || ""} → ${query.data.result?.shippingCodes?.destination || ""}`,
            "Estimated Delivery": query.data.result?.estimatedDelivery?.days || "",
          };
        }
        return baseData;
      });

      await exportToExcel(exportData, `queries_export_${new Date().toISOString().split("T")[0]}`);
      toast({
        title: "Export Successful",
        description: "Queries have been exported successfully.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export queries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePricing = () => {
    if (pricingConfig) {
      setPricingConfig(pricingConfig);
      toast({
        title: "Pricing Updated",
        description: "Pricing configuration has been saved successfully.",
      });
    }
  };

  const updatePricingField = (path: string[], value: number) => {
    if (!pricingConfig) return;
    
    const newConfig = { ...pricingConfig };
    let current: any = newConfig;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setPricingConfigState(newConfig);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login - Ultimate Freight and Cargo Shippers</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
          >
            <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Admin Login
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Enter admin password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700"
              >
                Login
              </Button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - Ultimate Freight and Cargo Shippers</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-neutral-600 mt-2">Manage queries and pricing configuration</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Logout
            </Button>
          </motion.div>

          <Tabs defaultValue="queries" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="queries">Queries & Quotes ({queries.length})</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="queries" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>All Queries & Quotes</CardTitle>
                      <CardDescription>
                        View all contact messages, quote requests, and price calculations
                      </CardDescription>
                    </div>
                    <Button
    variant="outline"
    onClick={loadData}
    disabled={isSyncing}
    className="border-blue-300 text-blue-700"
  >
    <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
    {isSyncing ? "Syncing..." : "Sync Cloud Data"}
  </Button>

                    <Button
                      onClick={handleExportExcel}
                      disabled={queries.length === 0 || isLoading}
                      className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isLoading ? "Exporting..." : "Export to Excel"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {queries.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                      <p>No queries found.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {queries.map((query) => (
                            <TableRow key={query.id}>
                              <TableCell>
                                <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                                  {query.type}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-neutral-600">
                                {new Date(query.timestamp).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {query.type === "contact" && (
                                    <>
                                      <div><strong>Name:</strong> {query.data.name}</div>
                                      <div><strong>Email:</strong> {query.data.email}</div>
                                      <div><strong>Subject:</strong> {query.data.subject}</div>
                                    </>
                                  )}
                                  {query.type === "quote" && (
                                    <>
                                      <div><strong>Name:</strong> {query.data.fullName}</div>
                                      <div><strong>Email:</strong> {query.data.email}</div>
                                      <div><strong>From:</strong> {query.data.origin} → <strong>To:</strong> {query.data.destination}</div>
                                    </>
                                  )}
                                  {query.type === "price_calculation" && (
                                    <>
                                      <div><strong>Route:</strong> {query.data.originCity}, {query.data.originCountry} → {query.data.destinationCity}, {query.data.destinationCountry}</div>
                                      <div><strong>Type:</strong> {query.data.shipmentType} | <strong>Weight:</strong> {query.data.weight} kg</div>
                                      <div><strong>Price:</strong> {query.data.result?.currencySymbol}{query.data.result?.priceInSelectedCurrency} {query.data.result?.currency}</div>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Pricing Configuration</CardTitle>
                      <CardDescription>
                        Update base fees and pricing parameters for the quote calculator
                      </CardDescription>
                    </div>
                    <Button
                      onClick={handleSavePricing}
                      className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {pricingConfig ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">Base Fees (USD)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(pricingConfig.baseFees).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <label className="text-sm font-medium capitalize">{key} Freight</label>
                              <Input
                                type="number"
                                value={value}
                                onChange={(e) =>
                                  updatePricingField(["baseFees", key], parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">Weight Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Weight Fee per kg (USD)</label>
                            <Input
                              type="number"
                              step="0.01"
                              value={pricingConfig.weightFeePerKg}
                              onChange={(e) =>
                                updatePricingField(["weightFeePerKg"], parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Weight Threshold (kg)</label>
                            <Input
                              type="number"
                              step="0.1"
                              value={pricingConfig.weightThresholdKg}
                              onChange={(e) =>
                                updatePricingField(["weightThresholdKg"], parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">Fee Percentages</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Handling Fee (%)</label>
                            <Input
                              type="number"
                              step="0.1"
                              value={pricingConfig.handlingFeePercent}
                              onChange={(e) =>
                                updatePricingField(["handlingFeePercent"], parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Fuel Surcharge (%)</label>
                            <Input
                              type="number"
                              step="0.1"
                              value={pricingConfig.fuelSurchargePercent}
                              onChange={(e) =>
                                updatePricingField(["fuelSurchargePercent"], parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Insurance Fee (%)</label>
                            <Input
                              type="number"
                              step="0.01"
                              value={pricingConfig.insuranceFeePercent}
                              onChange={(e) =>
                                updatePricingField(["insuranceFeePercent"], parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Urgent Fee (%)</label>
                            <Input
                              type="number"
                              step="0.1"
                              value={pricingConfig.urgentFeePercent}
                              onChange={(e) =>
                                updatePricingField(["urgentFeePercent"], parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">Exchange Rates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {Object.entries(pricingConfig.exchangeRates).map(([currency, rate]) => (
                            <div key={currency} className="space-y-2">
                              <label className="text-sm font-medium">{currency} Rate</label>
                              <Input
                                type="number"
                                step="0.0001"
                                value={rate}
                                onChange={(e) =>
                                  updatePricingField(["exchangeRates", currency], parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-neutral-500">
                      <p>Loading pricing configuration...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
