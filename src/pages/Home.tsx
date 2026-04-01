import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sprout, 
  ShieldAlert, 
  CloudSun, 
  Droplets, 
  MessageSquare, 
  ShoppingBag,
  TrendingUp,
  Wind,
  Users
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const features = [
  {
    title: "AI Crop Advisor",
    description: "Get personalized crop recommendations based on your soil and location.",
    icon: Sprout,
    path: "/crop-advisor",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Disease Detection",
    description: "Upload photos of your crops to identify diseases and get treatment advice.",
    icon: ShieldAlert,
    path: "/disease-detection",
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather updates and alerts tailored for your farm's location.",
    icon: CloudSun,
    path: "/weather",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Fertilizer Guide",
    description: "Optimize your fertilizer usage with AI-driven quantity recommendations.",
    icon: Droplets,
    path: "/fertilizer",
    color: "bg-cyan-100 text-cyan-600"
  },
  {
    title: "AI Chatbot",
    description: "24/7 agricultural assistant to answer all your farming queries.",
    icon: MessageSquare,
    path: "/chat",
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Stubble Setu",
    description: "A marketplace to sell crop residue and prevent stubble burning.",
    icon: ShoppingBag,
    path: "/stubble-setu",
    color: "bg-orange-100 text-orange-600"
  }
];

const stats = [
  { label: "Crop Loss Prevented", value: "20-40%", icon: TrendingUp },
  { label: "Stubble Burned Annually", value: "Millions of Tons", icon: Wind },
  { label: "Farmers Without Advice", value: "70%", icon: Users }
];

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Green farm field"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              <Sprout size={18} />
              <span>The Future of Farming is Here</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              Smart Farming for a <span className="text-primary">Better Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              KrishiAI is an AI-powered platform helping farmers to increase their income, reduce pollution, and optimize yields with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/crop-advisor" 
                className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group"
              >
                Try Demo
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about" 
                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000" 
              alt="Farmer using tablet"
              className="relative rounded-3xl shadow-2xl border border-white/50"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center space-y-4"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Comprehensive Farming Ecosystem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your farm efficiently, from seed to marketplace.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={feature.path}
                className="group block p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.color)}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center text-primary font-semibold text-sm">
                  Learn More
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Making a Real Impact on <br />
              <span className="text-primary">Agriculture & Environment</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Economic Impact", desc: "Increasing farmer income by up to 30% through better yield and residue sales." },
                { title: "Environmental Impact", desc: "Reducing air pollution by providing alternatives to stubble burning." },
                { title: "Social Impact", desc: "Empowering rural communities with data-driven decision making." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1 flex items-center justify-center text-white text-[10px] font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600" 
              alt="Healthy crops"
              className="rounded-2xl shadow-lg mt-8"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=600" 
              alt="Farmer market"
              className="rounded-2xl shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight relative z-10">
            Ready to transform your farm?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto relative z-10">
            Join thousands of farmers using KrishiAI to build a smarter, more profitable future.
          </p>
          <div className="flex justify-center relative z-10">
            <Link 
              to="/contact" 
              className="px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
