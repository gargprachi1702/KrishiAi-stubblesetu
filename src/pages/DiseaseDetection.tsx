import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Camera, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface DetectionResult {
  disease: string;
  confidence: number;
  treatment: string[];
  severity: "low" | "medium" | "high";
}

const mockResults: DetectionResult[] = [
  {
    disease: "Late Blight",
    confidence: 94.5,
    treatment: [
      "Remove infected leaves immediately",
      "Apply copper-based fungicides",
      "Improve air circulation around plants",
      "Avoid overhead watering"
    ],
    severity: "high"
  },
  {
    disease: "Leaf Spot",
    confidence: 88.2,
    treatment: [
      "Prune affected areas",
      "Apply neem oil or sulfur spray",
      "Keep foliage dry",
      "Rotate crops next season"
    ],
    severity: "medium"
  }
];

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const reset = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold"
        >
          <ShieldAlert size={18} />
          <span>AI Diagnostics</span>
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          Crop Disease Detection
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Instantly identify crop diseases and get expert treatment advice 
          by simply uploading a photo of your plant's leaves.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload Plant Photo</h2>
            
            <div 
              onClick={() => !selectedImage && fileInputRef.current?.click()}
              className={cn(
                "relative aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden",
                selectedImage 
                  ? "border-primary bg-gray-50" 
                  : "border-gray-200 hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
              )}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              
              {selectedImage ? (
                <>
                  <img 
                    src={selectedImage} 
                    alt="Selected plant" 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); reset(); }}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                    <Camera size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Click to upload or drag & drop</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
                className="flex-grow py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
              >
                {isAnalyzing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <RefreshCw size={20} />
                  </motion.div>
                ) : (
                  <>
                    <ShieldAlert size={20} />
                    Start Analysis
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div className="text-sm">
              <h4 className="font-bold text-blue-900 mb-1">Pro Tip for Best Results</h4>
              <p className="text-blue-800/70 leading-relaxed">
                Ensure the photo is clear, well-lit, and focused on the affected area of the leaf. 
                Avoid blurry or distant shots for higher accuracy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="space-y-8">
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
                    className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center"
                  >
                    <ShieldAlert size={48} className="text-red-600" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute -inset-2 border-2 border-dashed border-red-300 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">Scanning for Pathogens...</h3>
                  <p className="text-gray-500">Our neural network is identifying patterns in the leaf tissue.</p>
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
                        Analysis Result
                        <CheckCircle2 size={14} className="text-green-500" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{result.disease}</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{result.confidence}%</div>
                      <div className="text-xs font-bold text-gray-400 uppercase">Confidence</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest",
                      result.severity === "high" ? "bg-red-100 text-red-700" :
                      result.severity === "medium" ? "bg-orange-100 text-orange-700" :
                      "bg-green-100 text-green-700"
                    )}>
                      Severity: {result.severity}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <ShieldAlert size={18} className="text-primary" />
                      Recommended Treatments
                    </h3>
                    <div className="grid gap-3">
                      {result.treatment.map((step, i) => (
                        <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-primary shadow-sm flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10">
                    Download Full Report
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
                  <Upload size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">No Image Analyzed</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    Upload a photo of your crop to see the AI diagnosis and treatment recommendations.
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
