
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

interface SensorCardProps {
  label: string;
  value: number | string;
  unit?: string;
  icon: React.ReactNode;
  status?: 'healthy' | 'warning' | 'critical';
  info?: string;
}

const SensorCard = ({ label, value, unit, icon, status = 'healthy', info }: SensorCardProps) => {
  const statusClass = {
    healthy: 'healthy-value',
    warning: 'warning-value',
    critical: 'critical-value'
  }[status];

  return (
    <Card className="sensor-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="card-label flex items-center">
            {label}
            {info && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-1">
                      <InfoIcon className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </div>
        <div className="mt-2">
          <span className={`card-value ${statusClass}`}>
            {typeof value === 'number' ? Number(value).toLocaleString() : value}
          </span>
          {unit && <span className="card-unit">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
