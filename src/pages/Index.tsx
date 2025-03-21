
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        
        {/* Call-to-action Section */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Monitoring Your Water Quality Today
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Take the first step towards ensuring safer water quality management with our advanced monitoring system.
              </p>
              <Link 
                to="/dashboard" 
                className="bg-aqua-600 hover:bg-aqua-700 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center group transition-all duration-300 shadow-lg shadow-aqua-600/20"
              >
                <span>View Dashboard</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="bg-aqua-500 rounded-lg p-1.5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                  </svg>
                </div>
                <span className="font-bold text-xl">Aqua-Alert</span>
              </div>
              <div className="flex space-x-6">
                <Link to="/dashboard" className="text-gray-600 hover:text-aqua-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/alerts" className="text-gray-600 hover:text-aqua-600 transition-colors">
                  Alerts
                </Link>
                <Link to="/settings" className="text-gray-600 hover:text-aqua-600 transition-colors">
                  Settings
                </Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Aqua-Alert Water Monitoring System. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
