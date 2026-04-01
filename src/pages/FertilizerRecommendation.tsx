import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Droplets, Sprout, Search, ArrowRight, Info, AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import { cn } from "@/src/lib/utils";

const crops = ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane", "Potato"];
const soilTypes = ["Alluvial", "Black", "Red", "Laterite"];

interface Recommendation {
  fertilizer: string;
  quantity: string;
  schedule: string[];
  tips: string[];
}

const recommendations: Record<string, Recommendation> = {
  "Wheat-Alluvial": {
    fertilizer: "Urea + DAP + MOP",
    quantity: "120kg Urea, 50kg DAP, 40kg MOP per acre",
    schedule: [
      "Basal dose: Full DAP & MOP + 1/3 Urea at sowing",
      "First top dressing: 1/3 Urea at first irrigation (21-25 days)",
      "Second top dressing: 1/3 Urea at second irrigation (40-45 days)"
    ],
    tips: [
      "Apply fertilizer when soil is moist",
      "Avoid application during heavy rain",
      "Use neem-coated urea for better efficiency"
    ]
  },
  "Rice-Black": {
    fertilizer: "Urea + SSP + Zinc Sulfate",
    quantity: "100kg Urea, 150kg SSP, 10kg Zinc per acre",
    schedule: [
      "Basal: Full SSP & Zinc + 1/3 Urea at transplanting",
      "Tillering stage: 1/3 Urea (20-25 days after transplanting)",
      "Panicle initiation: 1/3 Urea (45-50 days after transplanting)"
    ],
    tips: [
      "Maintain 2-3cm water level during application",
      "Drain excess water before top dressing",
      "Incorporate basal dose into the soil"
    ]
  }
};

export default function FertilizerRecommendation() {
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!crop || !soil) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const key = `${crop}-${soil}`;
      setResult(recommendations[key] || {
        fertilizer: "NPK 19:19:19 (Water Soluble)",
        quantity: "5kg per acre via fertigation",
        schedule: ["Apply every 15 days during vegetative growth"],
        tips: ["Check soil pH before application", "Monitor for nutrient deficiency symptoms"]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold"
        >
          <Droplets size={18} />
          <span>Nutrient Optimization</span>
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          Fertilizer Recommendation
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Optimize your crop nutrition with AI-driven fertilizer guides. 
          Reduce waste and increase yield by applying the right nutrients at the right time.
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
                <Sprout size={16} className="text-primary" />
                Select Crop
              </label>
              <div className="grid grid-cols-2 gap-2">
                {crops.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCrop(c)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-semibold border transition-all",
                      crop === c
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-white text-gray-600 border-gray-100 hover:border-primary/50"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Info size={16} className="text-primary" />
                Soil Type
              </label>
              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
              >
                <option value="">Select Soil Type</option>
                {soilTypes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!crop || !soil || isAnalyzing}
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
                Get Recommendation
              </>
            )}
          </button>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
            <AlertCircle size={18} className="text-orange-500 flex-shrink-0" />
            <p className="text-[10px] text-orange-800 leading-relaxed">
              Note: These are general recommendations. For precise results, 
              we recommend conducting a soil test at your nearest government lab.
            </p>
          </div>
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
                    className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center"
                  >
                    <Droplets size={48} className="text-cyan-600" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute -inset-2 border-2 border-dashed border-cyan-300 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">Calculating Nutrient Balance...</h3>
                  <p className="text-gray-500">Optimizing N-P-K ratios for your specific crop and soil conditions.</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                        Recommended Fertilizer
                        <CheckCircle2 size={14} className="text-green-500" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{result.fertilizer}</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-400 uppercase">Quantity</div>
                      <div className="text-xl font-bold text-primary">{result.quantity}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Calendar size={18} className="text-primary" />
                        Application Schedule
                      </h3>
                      <div className="space-y-3">
                        {result.schedule.map((step, i) => (
                          <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-primary shadow-sm flex-shrink-0">
                              {i + 1}
                            </div>
                            <p className="text-xs text-gray-700 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Info size={18} className="text-primary" />
                        Expert Tips
                      </h3>
                      <div className="space-y-3">
                        {result.tips.map((tip, i) => (
                          <div key={i} className="flex gap-3 p-4 bg-green-50/50 rounded-xl border border-green-100">
                            <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-700 leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10">
                    Download Fertilizer Plan
                    <ArrowRight size={20} />
                  </button>
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
                  <Droplets size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">No Analysis Yet</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    Select your crop and soil type on the left to get a customized fertilizer recommendation.
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
