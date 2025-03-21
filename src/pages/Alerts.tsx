
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AlertItem from "@/components/AlertItem";
import { 
  generateAlerts, 
  Alert as AlertType 
} from "@/utils/mockData";
import { BellIcon, Filter, Search, CheckCircle, AlertCircle } from "lucide-react";

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<"all" | "low" | "medium" | "high">("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "read" | "unread">("all");
  
  useEffect(() => {
    const loadedAlerts = generateAlerts(12);
    setAlerts(loadedAlerts);
    setFilteredAlerts(loadedAlerts);
  }, []);
  
  useEffect(() => {
    let result = alerts;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(alert => 
        alert.parameter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by severity
    if (selectedSeverity !== "all") {
      result = result.filter(alert => alert.severity === selectedSeverity);
    }
    
    // Filter by read/unread status
    if (selectedStatus !== "all") {
      result = result.filter(alert => 
        (selectedStatus === "read" && alert.isRead) || 
        (selectedStatus === "unread" && !alert.isRead)
      );
    }
    
    setFilteredAlerts(result);
  }, [searchTerm, selectedSeverity, selectedStatus, alerts]);
  
  const handleAlertClick = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };
  
  const getUnreadCount = () => {
    return alerts.filter(alert => !alert.isRead).length;
  };
  
  const markAllAsRead = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({ ...alert, isRead: true }))
    );
  };
  
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <main className="container mx-auto px-4 py-8">
          <motion.div 
            className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold">Alerts</h1>
                {getUnreadCount() > 0 && (
                  <div className="ml-4 bg-aqua-100 text-aqua-800 px-2.5 py-1 text-xs font-medium rounded-full">
                    {getUnreadCount()} unread
                  </div>
                )}
              </div>
              <p className="text-gray-500 mt-2">
                Monitor and manage water quality alerts in one place
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button 
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-sm"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search alerts..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 appearance-none transition-all"
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value as any)}
                  >
                    <option value="all">All severities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 appearance-none transition-all"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                  >
                    <option value="all">All statuses</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-1">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert, index) => (
                <AlertItem 
                  key={alert.id} 
                  alert={alert} 
                  onClick={handleAlertClick}
                  index={index} 
                />
              ))
            ) : (
              <motion.div 
                className="glass-card p-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <BellIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-500">
                  {searchTerm || selectedSeverity !== "all" || selectedStatus !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "You don't have any water quality alerts at the moment"
                  }
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Alerts;
