import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import RemainingHoursCard from '@/components/RemainingHoursCard';
import SensorCard from '@/components/SensorCard';
import HistoryChart from '@/components/HistoryChart';
import LocationMap from '@/components/LocationMap';
import WeatherForecastCard from '@/components/WeatherForecastCard';
import { 
  Thermometer, 
  Gauge, 
  Droplet, 
  Sprout, 
  Leaf, 
  CloudRain 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockSensorReading, mockHistoryData, getSensorStatus, getSensorInfo } from '@/utils/mockData';

const Index = () => {
  const [sensorData, setSensorData] = useState(mockSensorReading);
  const [historyData, setHistoryData] = useState(mockHistoryData);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Function to fetch data (real API implementation)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/latest-prediction');
      if (!response.ok) {
        throw new Error('Failed to fetch sensor data');
      }
      const data = await response.json();
      // The backend returns { input, prediction }, so align with frontend structure
      const sensor = {
        ...data.input,
        remaining_hours: data.prediction,
      };
      setSensorData(sensor);
      // Optionally update historyData if you want to track remaining_hours over time
      const newHistoryPoint = {
        timestamp: sensor.timestamp,
        value: sensor.remaining_hours
      };
      const updatedHistory = [...historyData.slice(-4), newHistoryPoint];
      setHistoryData(updatedHistory);
      setLastUpdated(formatTimestamp(sensor.timestamp));
      toast({
        title: "Data refreshed",
        description: "Soil monitoring data has been updated.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to fetch sensor data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch sensor data. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="container px-4 sm:px-6 py-4 sm:py-6 mx-auto">
      <DashboardHeader 
        lastUpdated={lastUpdated} 
        onRefresh={fetchData} 
        isLoading={isLoading}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - left side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Remaining hours card */}
          <RemainingHoursCard hours={sensorData.remaining_hours} />
          
          {/* Sensor readings grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SensorCard 
              label="Temperature" 
              value={sensorData.temperature_C} 
              unit="°C" 
              icon={<Thermometer className="h-5 w-5" />}
              status={getSensorStatus(sensorData.temperature_C, 'temperature')}
              info={getSensorInfo('temperature')}
            />
            <SensorCard 
              label="CO2 Level" 
              value={sensorData.CO2_ppm} 
              unit="ppm" 
              icon={<Gauge className="h-5 w-5" />}
              status={getSensorStatus(sensorData.CO2_ppm, 'co2')}
              info={getSensorInfo('co2')}
            />
            <SensorCard 
              label="Moisture" 
              value={sensorData.moisture_percent} 
              unit="%" 
              icon={<Droplet className="h-5 w-5" />}
              status={getSensorStatus(sensorData.moisture_percent, 'moisture')}
              info={getSensorInfo('moisture')}
            />
            <SensorCard 
              label="pH Level" 
              value={sensorData.pH} 
              unit="" 
              icon={<Leaf className="h-5 w-5" />}
              status={getSensorStatus(sensorData.pH, 'ph')}
              info={getSensorInfo('ph')}
            />
            <SensorCard 
              label="Mass Loss" 
              value={sensorData.mass_loss_percent} 
              unit="%" 
              icon={<Sprout className="h-5 w-5" />}
              status={getSensorStatus(sensorData.mass_loss_percent, 'mass_loss')}
              info={getSensorInfo('mass_loss')}
            />
            <SensorCard 
              label="Humidity" 
              value={sensorData.humidity_sensor_percent} 
              unit="%" 
              icon={<CloudRain className="h-5 w-5" />}
              status={getSensorStatus(sensorData.humidity_sensor_percent, 'humidity')}
              info={getSensorInfo('humidity')}
            />
          </div>
          
          {/* History chart */}
          <HistoryChart 
            data={historyData} 
            title="Remaining Hours Trend" 
            unit="hr" 
          />
        </div>
        
        {/* Sidebar - right side */}
        <div className="space-y-6">
          <WeatherForecastCard 
            temperature={sensorData.forecast_temp_C} 
            humidity={sensorData.forecast_humidity_percent} 
            condition={sensorData.forecast_condition} 
          />
          
          <LocationMap 
            latitude={sensorData.gps_latitude} 
            longitude={sensorData.gps_longitude} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
