
import { motion } from "framer-motion";
import { WaterParameter } from "@/utils/mockData";
import { Activity, Eye, Thermometer, Droplet, Zap, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  parameter: WaterParameter;
  className?: string;
  delay?: number;
}

// Map parameter icon names to actual Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  eye: Eye,
  thermometer: Thermometer,
  droplet: Droplet,
  zap: Zap,
};

const StatusCard = ({ parameter, className, delay = 0 }: StatusCardProps) => {
  const statusColors = {
    normal: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    critical: "bg-red-50 text-red-700 border-red-200",
  };

  const statusBarWidth = () => {
    const range = parameter.max - parameter.min;
    const normalized = (parameter.value - parameter.min) / range;
    return `${Math.max(0, Math.min(100, normalized * 100))}%`;
  };

  // Get the appropriate icon component
  const IconComponent = iconMap[parameter.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={cn(
        "glass-card p-6 flex flex-col space-y-4 h-full",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {IconComponent && (
            <div className="w-8 h-8 rounded-full bg-aqua-100 flex items-center justify-center text-aqua-700">
              <IconComponent className="h-5 w-5" />
            </div>
          )}
          <h3 className="text-lg font-semibold">{parameter.name}</h3>
        </div>
        <div
          className={cn(
            "px-2.5 py-1 text-xs font-medium rounded-full",
            statusColors[parameter.status]
          )}
        >
          {parameter.status.charAt(0).toUpperCase() + parameter.status.slice(1)}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">
            {parameter.value.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            {parameter.unit}
          </span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute left-0 top-0 h-full bg-gray-300 rounded-full" style={{width: '100%'}}></div>
          <div
            className={cn(
              "absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out",
              parameter.status === "normal" ? "bg-aqua-500" : 
                parameter.status === "warning" ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: statusBarWidth() }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{parameter.min.toFixed(1)}</span>
        <span>{parameter.max.toFixed(1)}</span>
      </div>
    </motion.div>
  );
};

export default StatusCard;
