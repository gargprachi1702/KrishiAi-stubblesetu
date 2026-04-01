import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
        >
          <MessageSquare size={18} />
          <span>We're Here to Help</span>
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          Contact Support
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Have questions about KrishiAI? Our team of experts is ready to assist you 
          with technical support, agricultural advice, or marketplace queries.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          {[
            { title: "Email Us", value: "support@krishiai.com", icon: Mail, color: "bg-blue-50 text-blue-600" },
            { title: "Call Us", value: "+91 1800-123-4567", icon: Phone, color: "bg-green-50 text-green-600" },
            { title: "Visit Us", value: "Krishi Bhavan, New Delhi, India", icon: MapPin, color: "bg-orange-50 text-orange-600" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-6"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0", item.color)}>
                <item.icon size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.title}</h3>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            </motion.div>
          ))}

          <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Globe size={120} />
            </div>
            <h3 className="text-xl font-bold relative z-10">Global Support</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 text-sm opacity-80">
                <Clock size={18} className="text-primary" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-80">
                <Globe size={18} className="text-primary" />
                <span>Available in 12+ Regional Languages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Message Sent!</h2>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Thank you for reaching out. One of our experts will get back to you within 24 hours.
                </p>
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subject</label>
                <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Agricultural Advice</option>
                  <option>Stubble Setu Marketplace</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea
                  required
                  rows={6}
                  placeholder="How can we help you?"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Send size={24} />
                  </motion.div>
                ) : (
                  <>
                    <Send size={24} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
