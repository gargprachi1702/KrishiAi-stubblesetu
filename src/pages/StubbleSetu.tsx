import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  Wind, 
  TrendingUp,
  X,
  Info,
  Building2,
  IndianRupee,
  Factory,
  LayoutDashboard,
  UserCircle
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Industry {
  id: string;
  name: string;
  type: string;
  location: string;
  contact: string;
}

interface StubbleRequest {
  id: string;
  farmerName: string;
  phone: string;
  location: string;
  cropType: string;
  quantity: string;
  selectedIndustryId: string;
  priceEstimate: number;
  status: "pending" | "accepted" | "rejected";
  timestamp: string;
}

export default function StubbleSetu() {
  const [view, setView] = useState<"farmer" | "industry">("farmer");
  const [prices, setPrices] = useState<Record<string, number>>({ Paddy: 2000, Wheat: 3500 });
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [requests, setRequests] = useState<StubbleRequest[]>([]);
  const [isAddingListing, setIsAddingListing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    farmerName: "",
    phone: "",
    location: "",
    cropType: "Paddy",
    quantity: "1",
    selectedIndustryId: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pricesRes, industriesRes, requestsRes] = await Promise.all([
        axios.get("/api/prices"),
        axios.get("/api/industries"),
        axios.get("/api/stubble-requests")
      ]);
      setPrices(pricesRes.data);
      setIndustries(industriesRes.data);
      setRequests(requestsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const priceEstimate = prices[formData.cropType] * parseFloat(formData.quantity);
      await axios.post("/api/stubble-requests", {
        ...formData,
        priceEstimate
      });
      setIsAddingListing(false);
      setFormData({
        farmerName: "",
        phone: "",
        location: "",
        cropType: "Paddy",
        quantity: "1",
        selectedIndustryId: ""
      });
      fetchData();
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/stubble-requests/${id}`, { status });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const currentPrice = prices[formData.cropType] || 0;
  const estimatedEarning = currentPrice * parseFloat(formData.quantity || "0");

  const [filterLocation, setFilterLocation] = useState("");
  const [filterCrop, setFilterCrop] = useState("");

  const filteredRequests = requests.filter(req => {
    const matchesLocation = req.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesCrop = filterCrop === "" || req.cropType === filterCrop;
    return matchesLocation && matchesCrop;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold"
        >
          <Wind size={18} />
          <span>Combat Stubble Burning</span>
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          Stubble Setu Marketplace
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Connecting farmers with industrial buyers to turn crop residue into revenue. 
          Stop burning, start earning.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button 
            onClick={() => setView("farmer")}
            className={cn(
              "px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2",
              view === "farmer" ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <UserCircle size={20} />
            Farmer View
          </button>
          <button 
            onClick={() => setView("industry")}
            className={cn(
              "px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2",
              view === "industry" ? "bg-gray-900 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <LayoutDashboard size={20} />
            Industry Dashboard
          </button>
        </div>
      </div>

      {view === "farmer" ? (
        <div className="space-y-12">
          {/* Market Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(prices).map(([crop, price], i) => (
              <motion.div
                key={crop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{crop} Residue</h3>
                    <p className="text-sm text-gray-500">Current Market Price</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{price}/ton</div>
                  <div className="text-xs font-bold text-green-500 uppercase tracking-wider flex items-center gap-1 justify-end">
                    <TrendingUp size={12} /> +5% Today
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nearby Industries */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Nearby Industries with High Demand</h2>
              <button 
                onClick={() => setIsAddingListing(true)}
                className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <Plus size={20} />
                Create Sell Request
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((ind, i) => (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{ind.name}</h4>
                    <p className="text-xs text-gray-500">{ind.type} Industry</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin size={14} className="text-primary" />
                    {ind.location}
                  </div>
                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">High Demand</span>
                    <button className="text-primary text-xs font-bold hover:underline">View Details</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Industry Dashboard */
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <LayoutDashboard size={24} className="text-primary" />
                Incoming Farmer Requests
              </h2>
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Filter by location"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <select 
                  value={filterCrop}
                  onChange={(e) => setFilterCrop(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="">All Crops</option>
                  <option value="Paddy">Paddy</option>
                  <option value="Wheat">Wheat</option>
                </select>
                <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center">
                  {filteredRequests.filter(r => r.status === "pending").length} Pending
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Farmer Details</th>
                    <th className="px-8 py-4">Residue Info</th>
                    <th className="px-8 py-4">Estimated Price</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-gray-500">
                        No requests found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-gray-900">{req.farmerName}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone size={12} /> {req.phone}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin size={12} /> {req.location}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-gray-900">{req.cropType}</div>
                          <div className="text-xs text-gray-500">{req.quantity} Tons</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-lg font-bold text-primary">₹{req.priceEstimate}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            req.status === "pending" ? "bg-orange-100 text-orange-700" :
                            req.status === "accepted" ? "bg-green-100 text-green-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          {req.status === "pending" ? (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleStatusUpdate(req.id, "accepted")}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(req.id, "rejected")}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Listing Modal */}
      <AnimatePresence>
        {isAddingListing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingListing(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 space-y-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold text-gray-900">Sell Your Stubble</h2>
                  <p className="text-sm text-gray-500">Fill in the details to list your crop residue.</p>
                </div>
                <button 
                  onClick={() => setIsAddingListing(false)}
                  className="p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleFarmerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      value={formData.farmerName}
                      onChange={(e) => setFormData({...formData, farmerName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="Enter your phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Farm Location</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ludhiana, Punjab"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Crop Residue Type</label>
                    <select
                      value={formData.cropType}
                      onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    >
                      <option value="Paddy">Paddy Stubble</option>
                      <option value="Wheat">Wheat Straw</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Quantity (Tons)</label>
                    <input
                      required
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Select Industry to Sell To</label>
                  <div className="grid grid-cols-1 gap-3">
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setFormData({...formData, selectedIndustryId: ind.id})}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all flex items-center justify-between",
                          formData.selectedIndustryId === ind.id 
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "border-gray-100 hover:border-primary/50"
                        )}
                      >
                        <div>
                          <div className="font-bold text-gray-900">{ind.name}</div>
                          <div className="text-xs text-gray-500">{ind.location} • {ind.type}</div>
                        </div>
                        {formData.selectedIndustryId === ind.id && <CheckCircle2 size={20} className="text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Earnings Estimate */}
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <IndianRupee size={20} />
                      Estimated Earnings
                    </div>
                    <div className="text-2xl font-bold text-primary">₹{estimatedEarning.toLocaleString()}</div>
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Info size={12} />
                    Calculation: {formData.quantity} Tons × ₹{currentPrice}/ton
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.selectedIndustryId}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                  {isLoading ? "Submitting..." : "Confirm Sell Request"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
