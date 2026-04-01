import { motion } from "motion/react";
import { Search, ExternalLink, CheckCircle2, Info, Landmark, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

const schemes = [
  {
    id: 1,
    title: "PM-Kisan Samman Nidhi",
    description: "An initiative by the Government of India in which all farmers will get up to ₹6,000 per year as minimum income support.",
    eligibility: ["Small and marginal farmers", "Landholding up to 2 hectares", "Indian citizenship"],
    benefits: "Direct income support of ₹6,000 per year in three installments.",
    category: "Income Support"
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "A government-sponsored crop insurance scheme that integrates multiple stakeholders for risk management.",
    eligibility: ["All farmers including sharecroppers", "Tenant farmers growing notified crops", "Compulsory for loanee farmers"],
    benefits: "Comprehensive insurance cover against failure of the crop.",
    category: "Insurance"
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC)",
    description: "Provides farmers with timely access to credit for their cultivation and other needs as well as for contingency expenses.",
    eligibility: ["All farmers – individuals/joint borrowers", "Tenant farmers", "Oral lessees & sharecroppers"],
    benefits: "Credit for crop production, repair of farm assets, and consumption needs.",
    category: "Credit"
  },
  {
    id: 4,
    title: "Soil Health Card Scheme",
    description: "Promotes soil test based and balanced use of fertilizers to enable farmers to realize higher yields at lower cost.",
    eligibility: ["All farmers across the country", "No specific landholding limit"],
    benefits: "Detailed report on soil health and recommendations for fertilizers.",
    category: "Advisory"
  },
  {
    id: 5,
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    description: "Promotes organic farming through a cluster approach and PGS (Participatory Guarantee System) certification.",
    eligibility: ["Groups of farmers (clusters)", "Minimum 50 farmers per cluster", "Focus on North East and hilly areas"],
    benefits: "Financial assistance for organic inputs, certification, and marketing.",
    category: "Organic Farming"
  }
];

const categories = ["All", "Income Support", "Insurance", "Credit", "Advisory", "Organic Farming"];

export default function GovernmentSchemes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || scheme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
        >
          <Landmark size={18} />
          <span>Government Support</span>
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          Government Schemes
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Stay updated with the latest agricultural schemes and subsidies 
          provided by the government to support and empower farmers.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          <Filter size={18} className="text-gray-400 mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-white text-gray-600 border-gray-100 hover:border-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSchemes.map((scheme, i) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all p-8 flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Landmark size={28} />
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                {scheme.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">{scheme.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
              {scheme.description}
            </p>

            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  Eligibility
                </h4>
                <ul className="grid gap-2">
                  {scheme.eligibility.map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Info size={14} />
                  Key Benefits
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {scheme.benefits}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-grow py-4 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Apply Now
                <ExternalLink size={18} />
              </button>
              <button className="p-4 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all border border-gray-100">
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No schemes found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
}
