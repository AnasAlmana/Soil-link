
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  lastUpdated: string;
  onRefresh: () => void;
  isLoading: boolean;
}

const DashboardHeader = ({ lastUpdated, onRefresh, isLoading }: DashboardHeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 py-4 border-b">
      <div className="flex items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">🌱 Soil Monitoring Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
