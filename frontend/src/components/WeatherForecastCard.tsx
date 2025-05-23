
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CloudSun, CloudRain, Sun, Thermometer } from 'lucide-react';

interface WeatherForecastCardProps {
  temperature: number;
  humidity: number;
  condition: string;
}

const WeatherForecastCard = ({ temperature, humidity, condition }: WeatherForecastCardProps) => {
  // Choose the appropriate weather icon based on the condition
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-weather-dark" />;
      case 'cloudy':
        return <CloudSun className="h-8 w-8 text-weather-DEFAULT" />;
      case 'sunny':
      default:
        return <Sun className="h-8 w-8 text-amber-400" />;
    }
  };

  return (
    <Card className="sensor-card">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="card-label">Weather Forecast</div>
            <div className="mt-2">
              <div className="card-value capitalize">{condition}</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 text-muted-foreground mr-1" />
                  <span>{temperature}°C</span>
                </div>
                <div className="flex items-center">
                  <CloudRain className="h-4 w-4 text-muted-foreground mr-1" />
                  <span>{humidity}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            {getWeatherIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecastCard;
