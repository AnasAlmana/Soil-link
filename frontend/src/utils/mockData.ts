
// This file provides mock data for development purposes
// In a real app, this would be replaced with API calls

// Mock API response
export const mockSensorReading = {
  timestamp: "2024-03-20T10:00:00",
  remaining_hours: 95.07,
  temperature_C: 30.5,
  CO2_ppm: 1200,
  moisture_percent: 60.0,
  mass_loss_percent: 15.0,
  pH: 7.2,
  forecast_temp_C: 26.0,
  forecast_humidity_percent: 65.0,
  forecast_condition: "sunny",
  humidity_sensor_percent: 62.0,
  gps_latitude: 24.7136,
  gps_longitude: 46.6753
};

// Mock historical data for the chart
export const mockHistoryData = [
  {
    timestamp: "2024-03-20T06:00:00",
    value: 120.5
  },
  {
    timestamp: "2024-03-20T07:00:00",
    value: 114.2
  },
  {
    timestamp: "2024-03-20T08:00:00",
    value: 108.7
  },
  {
    timestamp: "2024-03-20T09:00:00",
    value: 101.3
  },
  {
    timestamp: "2024-03-20T10:00:00",
    value: 95.07
  }
];

// Helper function to get sensor status based on value and thresholds
export const getSensorStatus = (
  value: number, 
  type: 'temperature' | 'moisture' | 'co2' | 'ph' | 'mass_loss' | 'humidity'
): 'healthy' | 'warning' | 'critical' => {
  const thresholds = {
    temperature: { min: 20, max: 35, warningMin: 25, warningMax: 32 },
    moisture: { min: 40, max: 80, warningMin: 45, warningMax: 75 },
    co2: { min: 400, max: 2000, warningMin: 800, warningMax: 1500 },
    ph: { min: 5.5, max: 8.0, warningMin: 6.0, warningMax: 7.5 },
    mass_loss: { min: 0, max: 50, warningMin: 10, warningMax: 30 },
    humidity: { min: 30, max: 80, warningMin: 40, warningMax: 70 }
  };

  const threshold = thresholds[type];
  
  if (value < threshold.min || value > threshold.max) {
    return 'critical';
  }
  
  if (value < threshold.warningMin || value > threshold.warningMax) {
    return 'warning';
  }
  
  return 'healthy';
};

// Helper function to get threshold info text
export const getSensorInfo = (type: 'temperature' | 'moisture' | 'co2' | 'ph' | 'mass_loss' | 'humidity'): string => {
  const info = {
    temperature: "Optimal range: 25-32°C. Critical below 20°C or above 35°C.",
    moisture: "Optimal range: 45-75%. Critical below 40% or above 80%.",
    co2: "Optimal range: 800-1500 ppm. Critical below 400 ppm or above 2000 ppm.",
    ph: "Optimal range: 6.0-7.5. Critical below 5.5 or above 8.0.",
    mass_loss: "Optimal range: 10-30%. Critical above 50%.",
    humidity: "Optimal range: 40-70%. Critical below 30% or above 80%."
  };
  
  return info[type];
};
