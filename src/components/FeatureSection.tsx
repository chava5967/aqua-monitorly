
import { motion } from "framer-motion";
import { 
  Activity, 
  Bell, 
  Clock, 
  Cloud, 
  Shield, 
  ChartBar
} from "lucide-react";

const features = [
  {
    title: "Real-time Monitoring",
    description: "Track water quality parameters in real-time with accurate data visualization.",
    icon: <Activity className="h-6 w-6" />,
    delay: 0.1
  },
  {
    title: "Smart Alerts",
    description: "Receive instant notifications when water parameters exceed safe thresholds.",
    icon: <Bell className="h-6 w-6" />,
    delay: 0.2
  },
  {
    title: "Historical Data",
    description: "Access and analyze historical water quality data to identify trends.",
    icon: <Clock className="h-6 w-6" />,
    delay: 0.3
  },
  {
    title: "Cloud Storage",
    description: "All data is securely stored in the cloud for easy access from anywhere.",
    icon: <Cloud className="h-6 w-6" />,
    delay: 0.4
  },
  {
    title: "Advanced Security",
    description: "Enterprise-grade security to protect your sensitive water quality data.",
    icon: <Shield className="h-6 w-6" />,
    delay: 0.5
  },
  {
    title: "Detailed Analytics",
    description: "Comprehensive analytics tools to gain insights from your water data.",
    icon: <ChartBar className="h-6 w-6" />,
    delay: 0.6
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advanced Features for Water Quality Management
          </h2>
          <p className="text-lg text-gray-600">
            Our comprehensive water monitoring system provides all the tools you need to ensure water safety and quality with unparalleled precision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <div className="w-12 h-12 rounded-lg bg-aqua-100 flex items-center justify-center text-aqua-600 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
