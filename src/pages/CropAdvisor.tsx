import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Thermometer, Calendar, Sprout, Search, ArrowRight, Info } from "lucide-react";
import { cn } from "@/src/lib/utils";

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Desert", "Mountain"];
const seasons = ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"];

const cropData: Record<string, string[]> = {
  "Alluvial-Kharif (Monsoon)": ["Rice", "Sugar Cane", "Cotton", "Jute"],
  "Alluvial-Rabi (Winter)": ["Wheat", "Barley", "Gram", "Mustard"],
  "Alluvial-Zaid (Summer)": ["Watermelon", "Muskmelon", "Cucumber", "Vegetables"],
  "Black-Kharif (Monsoon)": ["Cotton", "Soybean", "Groundnut", "Sorghum"],
  "Black-Rabi (Winter)": ["Wheat", "Gram", "Linseed", "Safflower"],
  "Red-Kharif (Monsoon)": ["Millets", "Pulses", "Tobacco", "Oilseeds"],
  "Red-Rabi (Winter)": ["Wheat", "Barley", "Gram"],
};

export default function CropAdvisor() {
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!soilType || !season) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      const key = `${soilType}-${season}`;
      setRecommendations(cropData[key] || ["Maize", "Pulses", "Vegetables", "Fodder Crops"]);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold"
        >
          <Sprout size={18} />
          <span>AI-Powered Insights</span>
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          AI Crop Advisor
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Get personalized crop recommendations based on your soil type, 
          location, and current season to maximize your yield and profit.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Location
              </label>
              <input
                type="text"
                placeholder="Enter your city/district"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Info size={16} className="text-primary" />
                Soil Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {soilTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSoilType(type)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-semibold border transition-all",
                      soilType === type
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-white text-gray-600 border-gray-100 hover:border-primary/50"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
              >
                <option value="">Select Season</option>
                {seasons.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!soilType || !season || isAnalyzing}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
          >
            {isAnalyzing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Search size={20} />
              </motion.div>
            ) : (
              <>
                <Search size={20} />
                Analyze & Recommend
              </>
            )}
          </button>
        </motion.div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-12 space-y-6 bg-white rounded-[2rem] border border-dashed border-gray-200"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <Sprout size={48} className="text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute -inset-2 border-2 border-dashed border-primary/30 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">Analyzing Soil & Climate...</h3>
                  <p className="text-gray-500">Our AI is processing thousands of data points for your location.</p>
                </div>
              </motion.div>
            ) : recommendations ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Recommended Crops</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    Best Matches
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {recommendations.map((crop, i) => (
                    <motion.div
                      key={crop}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                          <Sprout size={24} />
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-400 uppercase">Yield Potential</div>
                          <div className="text-lg font-bold text-primary">High</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{crop}</h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Ideal for {soilType} soil during {season} in {location || "your area"}.
                      </p>
                      <button className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                        View Cultivation Guide
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 space-y-6 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <Search size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">No Analysis Yet</h3>
                  <p className="text-gray-500 max-w-xs">
                    Fill in your farm details on the left and click analyze to see recommendations.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
