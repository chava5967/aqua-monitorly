
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { format, parseISO } from "date-fns";
import { HistoricalDataPoint } from "@/utils/mockData";
import { motion } from "framer-motion";

interface WaterQualityChartProps {
  data: HistoricalDataPoint[];
  className?: string;
}

const WaterQualityChart = ({ data, className }: WaterQualityChartProps) => {
  const [focusedParameter, setFocusedParameter] = useState<string | null>(null);

  const chartData = data.map(item => ({
    ...item,
    formattedTime: format(parseISO(item.timestamp), 'MMM dd, HH:mm')
  }));

  const parameters = [
    { id: "ph", name: "pH Level", color: "#0ea5e9" },
    { id: "temperature", name: "Temperature", color: "#ef4444" },
    { id: "turbidity", name: "Turbidity", color: "#f59e0b" },
    { id: "dissolvedOxygen", name: "Dissolved Oxygen", color: "#10b981" },
    { id: "conductivity", name: "Conductivity", color: "#8b5cf6" }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 bg-white shadow-lg border border-gray-100">
          <p className="font-medium text-sm mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`tooltip-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs">
                  {entry.name}: <span className="font-medium">{entry.value.toFixed(2)}{entry.name === "Temperature" ? "°C" : entry.name === "pH Level" ? "" : ""}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className={`glass-card p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Water Quality Trends</h3>
        <div className="flex gap-2">
          {parameters.map(param => (
            <button
              key={param.id}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                focusedParameter === null || focusedParameter === param.id
                  ? "bg-gray-100 font-medium"
                  : "bg-white text-gray-400 hover:bg-gray-50"
              }`}
              onClick={() => setFocusedParameter(focusedParameter === param.id ? null : param.id)}
              style={{
                borderColor: param.color,
                borderWidth: focusedParameter === param.id ? "1px" : "0px"
              }}
            >
              {param.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="formattedTime" 
              tickFormatter={(value) => format(new Date(value), "HH:mm")}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              minTickGap={50}
            />
            <YAxis yAxisId="left" orientation="left" hide={true} />
            <YAxis yAxisId="right" orientation="right" hide={true} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={0} />
            
            {parameters.map((param, index) => {
              const shouldRender = focusedParameter === null || focusedParameter === param.id;
              const opacity = focusedParameter === null || focusedParameter === param.id ? 1 : 0.2;
              const yAxisId = ["ph", "temperature", "turbidity"].includes(param.id) ? "left" : "right";
              
              return shouldRender ? (
                <Line
                  key={param.id}
                  type="monotone"
                  dataKey={param.id}
                  name={param.name}
                  stroke={param.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  yAxisId={yAxisId}
                  opacity={opacity}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              ) : null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WaterQualityChart;
