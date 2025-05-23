
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';

interface HistoryData {
  timestamp: string;
  value: number;
}

interface HistoryChartProps {
  data: HistoryData[];
  title: string;
  unit: string;
}

const HistoryChart = ({ data, title, unit }: HistoryChartProps) => {
  // Format dates for display
  const formattedData = data.map(item => ({
    ...item,
    formattedTime: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  return (
    <Card className="main-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5" /> 
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="formattedTime"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                width={40}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip 
                formatter={(value) => [`${value} ${unit}`, title]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryChart;
