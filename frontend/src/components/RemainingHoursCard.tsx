
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from 'lucide-react';

interface RemainingHoursCardProps {
  hours: number;
}

const RemainingHoursCard = ({ hours }: RemainingHoursCardProps) => {
  // Calculate percentage for progress bar (assuming max of 168 hours / 1 week)
  const maxHours = 168;
  const progressPercent = 100 - Math.min(100, Math.round((hours / maxHours) * 100));
  
  // Determine status based on remaining hours
  const getStatusColor = () => {
    if (hours < 24) return "text-growth-dark";
    if (hours < 72) return "text-amber-500";
    return "text-blue-500";
  };
  
  const getStatusText = () => {
    if (hours < 24) return "Ready soon";
    if (hours < 72) return "In progress";
    return "Early stage";
  };

  return (
    <Card className="main-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5" /> 
            Time Until Ready
          </CardTitle>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="text-5xl font-bold mb-3">
            {Math.floor(hours)}
            <span className="text-2xl ml-1 font-normal text-muted-foreground">hours</span>
          </div>
          <div className="w-full">
            <Progress value={progressPercent} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>0%</span>
              <span>Progress</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RemainingHoursCard;
