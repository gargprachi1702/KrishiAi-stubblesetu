import { motion } from "motion/react";
import { Sprout, Users, Target, Award, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  { name: "Dr. Arvind Sharma", role: "Agricultural Scientist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" },
  { name: "Priya Verma", role: "AI Research Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
  { name: "Rahul Kapoor", role: "Product Designer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
  { name: "Ananya Iyer", role: "Community Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" }
];

const values = [
  { title: "Innovation", desc: "Pushing the boundaries of AI to solve real-world agricultural challenges.", icon: Target },
  { title: "Sustainability", desc: "Promoting farming practices that protect our planet for future generations.", icon: Heart },
  { title: "Integrity", desc: "Building trust through transparent data and reliable expert advice.", icon: ShieldCheck },
  { title: "Empowerment", desc: "Providing farmers with the tools they need to thrive independently.", icon: Award }
];

export default function About() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
          >
            <Sprout size={18} />
            <span>Our Mission</span>
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
            Empowering Farmers with <br />
            <span className="text-primary">Intelligence & Innovation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            KrishiAI was founded with a simple yet powerful vision: to bridge the gap 
            between traditional farming and modern technology. We believe every farmer 
            deserves access to world-class insights.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
            alt="Farming landscape"
            className="relative rounded-[3rem] shadow-2xl border border-white/50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            The Story Behind <br />
            <span className="text-primary">KrishiAI</span>
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              It started in 2024, when a group of engineers and agricultural experts 
              witnessed the devastating impact of crop diseases and the environmental 
              crisis caused by stubble burning in Northern India.
            </p>
            <p>
              We realized that while technology was advancing rapidly, it wasn't 
              reaching the people who needed it most—our farmers. We set out to 
              build a platform that was not only powerful but also accessible and 
              easy to use for everyone.
            </p>
            <p>
              Today, KrishiAI serves thousands of farmers across the country, 
              providing them with real-time data, AI-driven advice, and a 
              marketplace that turns waste into wealth.
            </p>
          </div>
          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="text-sm text-gray-500 font-medium">Active Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50k+</div>
              <div className="text-sm text-gray-500 font-medium">Crops Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-gray-500 font-medium">Expert Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at KrishiAI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center space-y-6"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
                  <value.icon size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Meet the Experts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A diverse team of scientists, engineers, and dreamers working together.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/5]"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-sm opacity-80">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-white space-y-8 relative overflow-hidden">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight relative z-10">
            Join the agricultural revolution
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto relative z-10">
            Whether you're a farmer, a buyer, or an expert, there's a place for you at KrishiAI.
          </p>
          <div className="flex justify-center relative z-10">
            <Link 
              to="/contact" 
              className="px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
