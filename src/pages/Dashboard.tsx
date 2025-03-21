
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import StatusCard from "@/components/StatusCard";
import WaterQualityChart from "@/components/WaterQualityChart";
import { 
  DropletIcon, 
  CalendarIcon, 
  RefreshCwIcon, 
  Clock3Icon,
  BellIcon,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { 
  getCurrentParameters, 
  generateHistoricalData, 
  generateAlerts,
  WaterParameter
} from "@/utils/mockData";

const Dashboard = () => {
  const [currentParameters, setCurrentParameters] = useState<WaterParameter[]>([]);
  const [historicalData, setHistoricalData] = useState(generateHistoricalData());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [alerts, setAlerts] = useState(generateAlerts(3));
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    setCurrentParameters(getCurrentParameters());
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentParameters(getCurrentParameters());
      setLastUpdated(new Date());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentParameters(getCurrentParameters());
      setHistoricalData(generateHistoricalData());
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };
  
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold">Water Quality Dashboard</h1>
              <div className="flex items-center mt-2 text-gray-500">
                <Clock3Icon className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  Last updated: {format(lastUpdated, "MMM d, h:mm:ss a")}
                </span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center mt-4 md:mt-0 space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                onClick={refreshData}
              >
                <RefreshCwIcon className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
              
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Last 7 Days</span>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {currentParameters.map((param, index) => (
              <StatusCard 
                key={param.id} 
                parameter={param} 
                delay={index} 
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WaterQualityChart data={historicalData} />
            </div>
            
            <div className="lg:col-span-1">
              <motion.div 
                className="glass-card p-6 h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Recent Alerts</h3>
                  <Link 
                    to="/alerts" 
                    className="text-sm text-aqua-600 hover:text-aqua-700 transition-colors"
                  >
                    View all
                  </Link>
                </div>
                
                {alerts.map((alert, index) => (
                  <motion.div 
                    key={alert.id}
                    className="flex items-start p-3 rounded-lg mb-3 transition-colors hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  >
                    <div className={`p-2 rounded-full ${
                      alert.severity === 'low' ? 'bg-green-100 text-green-600' :
                      alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      <BellIcon className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(alert.timestamp), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
