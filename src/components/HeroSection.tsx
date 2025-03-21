
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="absolute top-40 left-10 w-72 h-72 bg-aqua-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-60 right-10 w-96 h-96 bg-aqua-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-16 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-aqua-100 text-aqua-800 rounded-full mb-4">
                Innovative Water Quality Monitoring
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Ensuring Water Safety Through Advanced Monitoring
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-xl text-balance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Aqua-Alert provides real-time water quality monitoring, allowing you to track vital parameters, receive timely alerts, and ensure safe water conditions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link 
                to="/dashboard" 
                className="bg-aqua-600 hover:bg-aqua-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center group transition-all duration-300 shadow-lg shadow-aqua-600/20"
              >
                <span>View Dashboard</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/alerts" 
                className="border border-gray-300 hover:border-gray-400 bg-white text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                View Alerts
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/3 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative">
              <div className="glass-card overflow-hidden rounded-2xl border border-white/50 shadow-xl">
                <div className="water-bg aspect-square bg-gradient-to-b from-aqua-500/10 to-aqua-600/20 overflow-hidden p-8 flex items-center justify-center">
                  <div className="w-40 h-40 relative">
                    <div className="absolute inset-0 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center shadow-inner">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-aqua-700">7.2</div>
                        <div className="text-sm text-aqua-800 font-medium">pH Level</div>
                      </div>
                    </div>
                    <svg className="animate-spin-slow absolute -top-1 -left-1 -right-1 -bottom-1" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="8 4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-lg rotate-12 border border-white/50 flex items-center justify-center bg-gradient-to-br from-aqua-100 to-aqua-200 shadow-lg">
                <div className="font-bold text-aqua-700 text-xl">25°C</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-28 h-16 glass-card rounded-lg -rotate-6 border border-white/50 flex items-center justify-center bg-gradient-to-br from-aqua-50 to-aqua-100 shadow-lg">
                <div className="text-center">
                  <div className="font-bold text-aqua-700 text-lg">8.2 mg/L</div>
                  <div className="text-xs text-aqua-600">Oxygen</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
