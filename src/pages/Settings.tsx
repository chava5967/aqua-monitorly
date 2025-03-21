
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Check, Save, Bell, Eye, Thermometer, Droplet, Zap } from "lucide-react";
import { toast } from "sonner";

interface ParameterSetting {
  id: string;
  name: string;
  min: number;
  max: number;
  unit: string;
  icon: JSX.Element;
}

const defaultSettings: ParameterSetting[] = [
  {
    id: "ph",
    name: "pH Level",
    min: 6.5,
    max: 8.5,
    unit: "pH",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    id: "turbidity",
    name: "Turbidity",
    min: 0,
    max: 5,
    unit: "NTU",
    icon: <Eye className="h-5 w-5" />,
  },
  {
    id: "temperature",
    name: "Temperature",
    min: 15,
    max: 30,
    unit: "°C",
    icon: <Thermometer className="h-5 w-5" />,
  },
  {
    id: "dissolved_oxygen",
    name: "Dissolved Oxygen",
    min: 6,
    max: 12,
    unit: "mg/L",
    icon: <Droplet className="h-5 w-5" />,
  },
  {
    id: "conductivity",
    name: "Conductivity",
    min: 200,
    max: 500,
    unit: "µS/cm",
    icon: <Zap className="h-5 w-5" />,
  },
];

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  critical: boolean;
  warning: boolean;
  daily: boolean;
  weekly: boolean;
}

const defaultNotifications: NotificationSettings = {
  email: true,
  push: true,
  sms: false,
  critical: true,
  warning: true,
  daily: false,
  weekly: true,
};

import { Activity } from "lucide-react";

const Settings = () => {
  const [parameterSettings, setParameterSettings] = 
    useState<ParameterSetting[]>(defaultSettings);
  const [notificationSettings, setNotificationSettings] = 
    useState<NotificationSettings>(defaultNotifications);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  const handleParameterChange = (id: string, field: 'min' | 'max', value: number) => {
    setParameterSettings(prev => 
      prev.map(param => 
        param.id === id ? { ...param, [field]: value } : param
      )
    );
    setUnsavedChanges(true);
  };
  
  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    setUnsavedChanges(true);
  };
  
  const saveSettings = () => {
    // Here you would typically save to a backend
    toast.success("Settings saved successfully", {
      position: "bottom-right",
    });
    setUnsavedChanges(false);
  };
  
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <main className="container mx-auto px-4 py-8">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-500 mt-2">
              Configure your water quality monitoring preferences
            </p>
          </motion.div>
          
          {unsavedChanges && (
            <motion.div 
              className="fixed bottom-6 right-6 flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <span>You have unsaved changes</span>
              <button 
                className="flex items-center gap-1 bg-white text-black px-3 py-1 rounded-md text-sm font-medium"
                onClick={saveSettings}
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="glass-card p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">Parameter Thresholds</h2>
                
                <div className="space-y-6">
                  {parameterSettings.map((param, index) => (
                    <div key={param.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-aqua-100 flex items-center justify-center text-aqua-600">
                            {param.icon}
                          </div>
                          <h3 className="font-medium">{param.name}</h3>
                        </div>
                        <span className="text-sm text-gray-500">{param.unit}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Minimum Threshold
                          </label>
                          <div className="flex">
                            <input
                              type="number"
                              value={param.min}
                              onChange={(e) => handleParameterChange(param.id, 'min', parseFloat(e.target.value))}
                              className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500"
                              step={param.id === "ph" ? 0.1 : 1}
                            />
                            <span className="ml-2 flex items-center text-gray-500">
                              {param.unit}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Maximum Threshold
                          </label>
                          <div className="flex">
                            <input
                              type="number"
                              value={param.max}
                              onChange={(e) => handleParameterChange(param.id, 'max', parseFloat(e.target.value))}
                              className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500"
                              step={param.id === "ph" ? 0.1 : 1}
                            />
                            <span className="ml-2 flex items-center text-gray-500">
                              {param.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {index < parameterSettings.length - 1 && (
                        <div className="border-b border-gray-200 my-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-aqua-100 flex items-center justify-center text-aqua-600">
                    <Bell className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Notifications</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Notification Methods</h3>
                    <div className="space-y-3">
                      {(["email", "push", "sms"] as const).map(method => (
                        <div key={method} className="flex items-center">
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings[method] ? 'bg-aqua-600' : 'bg-gray-200'
                            }`}
                            onClick={() => handleNotificationChange(method)}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings[method] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className="ml-3 capitalize">{method === "sms" ? "SMS" : method} notifications</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 my-4"></div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Alert Types</h3>
                    <div className="space-y-3">
                      {(["critical", "warning"] as const).map(alert => (
                        <div key={alert} className="flex items-center">
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings[alert] ? 'bg-aqua-600' : 'bg-gray-200'
                            }`}
                            onClick={() => handleNotificationChange(alert)}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings[alert] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className="ml-3 capitalize">{alert} alerts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 my-4"></div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Report Frequency</h3>
                    <div className="space-y-3">
                      {(["daily", "weekly"] as const).map(frequency => (
                        <div key={frequency} className="flex items-center">
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings[frequency] ? 'bg-aqua-600' : 'bg-gray-200'
                            }`}
                            onClick={() => handleNotificationChange(frequency)}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings[frequency] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className="ml-3 capitalize">{frequency} summary report</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                className="w-full bg-aqua-600 hover:bg-aqua-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-aqua-600/20 flex items-center justify-center"
                onClick={saveSettings}
              >
                <Save className="h-5 w-5 mr-2" />
                <span>Save All Settings</span>
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
