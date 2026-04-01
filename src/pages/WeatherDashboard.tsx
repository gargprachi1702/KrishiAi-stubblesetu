import { motion } from "motion/react";
import { 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudRain, 
  Sun, 
  MapPin, 
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const forecast = [
  { day: "Mon", temp: 32, condition: "Sunny", icon: Sun },
  { day: "Tue", temp: 30, condition: "Cloudy", icon: CloudSun },
  { day: "Wed", temp: 28, condition: "Rainy", icon: CloudRain },
  { day: "Thu", temp: 29, condition: "Cloudy", icon: CloudSun },
  { day: "Fri", temp: 31, condition: "Sunny", icon: Sun },
  { day: "Sat", temp: 33, condition: "Sunny", icon: Sun },
  { day: "Sun", temp: 32, condition: "Partly Cloudy", icon: CloudSun },
];

const alerts = [
  {
    type: "Heatwave Alert",
    severity: "medium",
    message: "Temperatures expected to rise above 40°C in the next 48 hours. Ensure proper irrigation.",
    time: "2 hours ago"
  },
  {
    type: "Heavy Rain Warning",
    severity: "high",
    message: "Intense rainfall predicted for Wednesday. Check drainage systems to prevent waterlogging.",
    time: "5 hours ago"
  }
];

export default function WeatherDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold">
            <MapPin size={20} />
            Ludhiana, Punjab, India
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Weather Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Calendar size={20} className="text-gray-400" />
          <div className="text-sm">
            <div className="font-bold text-gray-900">April 1, 2026</div>
            <div className="text-gray-500">Wednesday, 10:52 AM</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-gradient-to-br from-primary to-green-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="absolute top-0 right-0 p-12 opacity-20">
            <Sun size={200} />
          </div>
          
          <div className="relative z-10 space-y-12">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="text-8xl font-bold tracking-tighter">32°C</div>
                <div className="text-2xl font-medium opacity-90">Mostly Sunny</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-lg font-bold">Feels like 35°C</div>
                <div className="text-sm opacity-70">Humidity: 45%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2 opacity-70 text-sm">
                  <Wind size={16} /> Wind Speed
                </div>
                <div className="text-xl font-bold">12 km/h</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 opacity-70 text-sm">
                  <Droplets size={16} /> Precipitation
                </div>
                <div className="text-xl font-bold">5%</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 opacity-70 text-sm">
                  <Thermometer size={16} /> Pressure
                </div>
                <div className="text-xl font-bold">1012 hPa</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 opacity-70 text-sm">
                  <Sun size={16} /> UV Index
                </div>
                <div className="text-xl font-bold">High (8)</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alerts Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 p-8 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Weather Alerts</h2>
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">Live</span>
          </div>
          
          <div className="space-y-4">
            {alerts.map((alert, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-5 rounded-2xl border flex gap-4 transition-all hover:scale-[1.02]",
                  alert.severity === "high" ? "bg-red-50 border-red-100" : "bg-orange-50 border-orange-100"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  alert.severity === "high" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                )}>
                  <AlertTriangle size={20} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-sm">{alert.type}</h4>
                    <span className="text-[10px] text-gray-400 font-medium">{alert.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all border border-gray-100">
            View All Alerts
          </button>
        </motion.div>
      </div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 p-10 space-y-10"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">7-Day Forecast</h2>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
              <ArrowUpRight size={14} className="text-red-500" /> Max
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
              <ArrowDownRight size={14} className="text-blue-500" /> Min
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
          {forecast.map((day, i) => (
            <div 
              key={i} 
              className="p-6 bg-gray-50 rounded-3xl text-center space-y-4 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{day.day}</div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-primary shadow-sm group-hover:scale-110 transition-transform">
                <day.icon size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{day.temp}°</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">{day.condition}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
