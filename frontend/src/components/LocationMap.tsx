
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

const LocationMap = ({ latitude, longitude }: LocationMapProps) => {
  // Format coordinates to be more readable
  const formatCoordinate = (coord: number) => coord.toFixed(4);
  
  return (
    <Card className="main-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5" /> 
          Sensor Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full relative bg-slate-200 rounded-md overflow-hidden">
          {/* This is a placeholder for a real map */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <MapPin className="h-10 w-10 text-destructive mb-2" />
            <div className="text-center bg-white/80 py-2 px-4 rounded-md shadow-sm">
              <p className="font-semibold">Sensor coordinates:</p>
              <p className="text-muted-foreground">
                {formatCoordinate(latitude)}°, {formatCoordinate(longitude)}°
              </p>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 py-1 px-2 rounded">
            Map placeholder
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
