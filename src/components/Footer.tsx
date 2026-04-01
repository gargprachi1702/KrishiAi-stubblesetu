import { Link } from "react-router-dom";
import { Sprout, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Sprout size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              KrishiAI
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering farmers with AI-driven insights for smarter farming, 
            better yields, and a sustainable future through innovation.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/crop-advisor" className="hover:text-primary transition-colors">AI Crop Advisor</Link></li>
            <li><Link to="/disease-detection" className="hover:text-primary transition-colors">Disease Detection</Link></li>
            <li><Link to="/weather" className="hover:text-primary transition-colors">Weather Dashboard</Link></li>
            <li><Link to="/stubble-setu" className="hover:text-primary transition-colors">Stubble Setu</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            <li><Link to="/schemes" className="hover:text-primary transition-colors">Govt. Schemes</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <span>support@krishiai.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary" />
              <span>+91 1800-123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-primary" />
              <span>Krishi Bhavan, New Delhi, India</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} KrishiAI. All rights reserved. Built for a better tomorrow.</p>
      </div>
    </footer>
  );
}
