
import { Alert } from "@/utils/mockData";
import { format, parseISO } from "date-fns";
import { Bell, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlertItemProps {
  alert: Alert;
  onClick: (id: string) => void;
  index: number;
}

const AlertItem = ({ alert, onClick, index }: AlertItemProps) => {
  const severityColors = {
    low: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-700",
      icon: "text-green-500"
    },
    medium: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-700",
      icon: "text-amber-500"
    },
    high: {
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-700",
      icon: "text-red-500"
    }
  };

  const colorSet = severityColors[alert.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "p-4 rounded-lg mb-4 cursor-pointer transition-all duration-300 border",
        colorSet.bg,
        colorSet.border,
        !alert.isRead && "shadow-md"
      )}
      onClick={() => onClick(alert.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={cn("p-2 rounded-full mt-1", colorSet.bg)}>
            <Bell className={cn("h-4 w-4", colorSet.icon)} />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className={cn("font-medium", colorSet.text)}>
                {alert.message}
              </h3>
              {!alert.isRead && (
                <span className="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {alert.parameter}: {alert.value} {alert.unit}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {format(parseISO(alert.timestamp), "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
        <button
          className={cn(
            "p-2 rounded-full transition-all",
            alert.isRead
              ? "bg-gray-100 text-gray-400"
              : "bg-white hover:bg-blue-50 text-blue-500 shadow-sm"
          )}
        >
          <Check className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default AlertItem;
