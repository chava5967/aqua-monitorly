
import { subDays, format, addHours } from 'date-fns';

export interface WaterParameter {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'normal' | 'warning' | 'critical';
  icon: string;
}

export interface HistoricalDataPoint {
  timestamp: string;
  ph: number;
  turbidity: number;
  temperature: number;
  dissolvedOxygen: number;
  conductivity: number;
}

export interface Alert {
  id: string;
  parameter: string;
  value: number;
  unit: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  isRead: boolean;
}

export const getCurrentParameters = (): WaterParameter[] => {
  return [
    {
      id: "ph",
      name: "pH Level",
      value: 7.2 + (Math.random() * 0.6 - 0.3),
      unit: "pH",
      min: 6.5,
      max: 8.5,
      status: "normal",
      icon: "activity",
    },
    {
      id: "turbidity",
      name: "Turbidity",
      value: 2.8 + (Math.random() * 2),
      unit: "NTU",
      min: 0,
      max: 5,
      status: "normal",
      icon: "eye",
    },
    {
      id: "temperature",
      name: "Temperature",
      value: 22 + (Math.random() * 6 - 3),
      unit: "°C",
      min: 10,
      max: 30,
      status: "normal",
      icon: "thermometer",
    },
    {
      id: "dissolved_oxygen",
      name: "Dissolved Oxygen",
      value: 7.5 + (Math.random() * 2 - 1),
      unit: "mg/L",
      min: 6,
      max: 12,
      status: "normal",
      icon: "droplet",
    },
    {
      id: "conductivity",
      name: "Conductivity",
      value: 350 + (Math.random() * 100 - 50),
      unit: "µS/cm",
      min: 200,
      max: 500,
      status: "normal",
      icon: "zap",
    }
  ].map(param => {
    // Determine status based on value compared to min/max
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    const range = param.max - param.min;
    const warningBuffer = range * 0.15;
    
    if (param.value < param.min + warningBuffer || param.value > param.max - warningBuffer) {
      status = 'warning';
    }
    
    if (param.value < param.min || param.value > param.max) {
      status = 'critical';
    }
    
    return { ...param, status };
  });
};

export const generateHistoricalData = (days = 7): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const endDate = new Date();
  const startDate = subDays(endDate, days);
  
  // Generate a data point for every hour
  for (let date = startDate; date <= endDate; date = addHours(date, 1)) {
    // Base values
    let ph = 7.2;
    let turbidity = 2.5;
    let temperature = 22;
    let dissolvedOxygen = 8;
    let conductivity = 350;
    
    // Add daily cycle variations
    const hour = date.getHours();
    
    // pH slightly varies throughout the day
    ph += Math.sin(hour / 24 * Math.PI * 2) * 0.2 + (Math.random() * 0.4 - 0.2);
    
    // Temperature is higher during the day
    temperature += Math.sin((hour - 3) / 24 * Math.PI * 2) * 3 + (Math.random() * 2 - 1);
    
    // Turbidity might increase with rainfall (simulated random events)
    if (Math.random() > 0.95) {
      turbidity += Math.random() * 5;
    } else {
      turbidity += Math.random() * 1 - 0.5;
    }
    
    // Dissolved oxygen inversely related to temperature
    dissolvedOxygen += -Math.sin((hour - 3) / 24 * Math.PI * 2) * 1 + (Math.random() * 1 - 0.5);
    
    // Conductivity changes slowly
    conductivity += Math.random() * 20 - 10;
    
    data.push({
      timestamp: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
      ph: Math.max(6, Math.min(9, ph)),
      turbidity: Math.max(0, turbidity),
      temperature: Math.max(10, Math.min(30, temperature)),
      dissolvedOxygen: Math.max(5, Math.min(12, dissolvedOxygen)),
      conductivity: Math.max(200, Math.min(500, conductivity))
    });
  }
  
  return data;
};

export const generateAlerts = (count = 8): Alert[] => {
  const alerts: Alert[] = [];
  const now = new Date();
  
  const parameters = [
    { name: 'pH Level', unit: 'pH', minThreshold: 6.5, maxThreshold: 8.5 },
    { name: 'Turbidity', unit: 'NTU', minThreshold: 0, maxThreshold: 5 },
    { name: 'Temperature', unit: '°C', minThreshold: 15, maxThreshold: 30 },
    { name: 'Dissolved Oxygen', unit: 'mg/L', minThreshold: 6, maxThreshold: 12 },
    { name: 'Conductivity', unit: 'µS/cm', minThreshold: 200, maxThreshold: 500 }
  ];
  
  const severities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  
  for (let i = 0; i < count; i++) {
    const parameter = parameters[Math.floor(Math.random() * parameters.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const isBelowThreshold = Math.random() > 0.5;
    const alertDate = subDays(now, Math.floor(Math.random() * 7));
    
    let value, message;
    
    if (isBelowThreshold) {
      const deviation = severity === 'low' ? 0.1 : severity === 'medium' ? 0.2 : 0.3;
      value = parameter.minThreshold * (1 - deviation);
      message = `${parameter.name} below recommended threshold`;
    } else {
      const deviation = severity === 'low' ? 0.1 : severity === 'medium' ? 0.2 : 0.3;
      value = parameter.maxThreshold * (1 + deviation);
      message = `${parameter.name} above recommended threshold`;
    }
    
    alerts.push({
      id: `alert-${i}`,
      parameter: parameter.name,
      value: parseFloat(value.toFixed(2)),
      unit: parameter.unit,
      timestamp: format(alertDate, "yyyy-MM-dd'T'HH:mm:ss"),
      severity,
      message,
      isRead: Math.random() > 0.3
    });
  }
  
  return alerts.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};
