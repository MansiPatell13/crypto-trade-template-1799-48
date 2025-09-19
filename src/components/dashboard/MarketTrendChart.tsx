import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketData {
  time: string;
  nifty: number;
  sensex: number;
  bankNifty: number;
  volume: number;
}

interface MarketTrendChartProps {
  className?: string;
}

const MarketTrendChart = ({ className }: MarketTrendChartProps) => {
  const [data, setData] = useState<MarketData[]>([]);
  const [activeIndex, setActiveIndex] = useState('nifty');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate mock intraday data
    const generateIntraDayData = () => {
      const baseValues = {
        nifty: 25420,
        sensex: 83000,
        bankNifty: 51250
      };

      const data: MarketData[] = [];
      const startTime = new Date();
      startTime.setHours(9, 15, 0, 0); // Market opens at 9:15 AM

      for (let i = 0; i < 96; i++) { // 96 intervals of 4 minutes each (6.4 hours)
        const time = new Date(startTime.getTime() + i * 4 * 60 * 1000);
        const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
        
        data.push({
          time: time.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          nifty: baseValues.nifty * (1 + variation + (Math.sin(i / 10) * 0.005)),
          sensex: baseValues.sensex * (1 + variation + (Math.sin(i / 10) * 0.005)),
          bankNifty: baseValues.bankNifty * (1 + variation + (Math.sin(i / 10) * 0.008)),
          volume: Math.floor(Math.random() * 1000000) + 500000
        });
      }
      
      return data;
    };

    const mockData = generateIntraDayData();
    setData(mockData);
    setIsLoading(false);

    // Update data every 30 seconds
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        const variation = (Math.random() - 0.5) * 0.01;
        
        // Update last entry to simulate real-time updates
        newData[newData.length - 1] = {
          ...lastEntry,
          nifty: lastEntry.nifty * (1 + variation),
          sensex: lastEntry.sensex * (1 + variation),
          bankNifty: lastEntry.bankNifty * (1 + variation),
          volume: Math.floor(Math.random() * 1000000) + 500000
        };
        
        return newData;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getIndexColor = (index: string) => {
    const colors = {
      nifty: 'hsl(var(--primary))',
      sensex: 'hsl(var(--chart-2))',
      bankNifty: 'hsl(var(--chart-3))'
    };
    return colors[index as keyof typeof colors] || 'hsl(var(--primary))';
  };

  const getCurrentValue = (index: string) => {
    if (data.length === 0) return 0;
    const latest = data[data.length - 1];
    return latest[index as keyof MarketData] as number;
  };

  const getChange = (index: string) => {
    if (data.length < 2) return { value: 0, percent: 0 };
    const latest = data[data.length - 1];
    const previous = data[0];
    const current = latest[index as keyof MarketData] as number;
    const prev = previous[index as keyof MarketData] as number;
    const change = current - prev;
    const percent = (change / prev) * 100;
    return { value: change, percent };
  };

  if (isLoading) {
    return <div className="h-96 animate-pulse bg-muted rounded-lg" />;
  }

  return (
    <Card className={cn("col-span-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Market Trends (Intraday)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeIndex} onValueChange={setActiveIndex} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nifty" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              NIFTY 50
            </TabsTrigger>
            <TabsTrigger value="sensex" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2"></div>
              SENSEX
            </TabsTrigger>
            <TabsTrigger value="bankNifty" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-3"></div>
              BANK NIFTY
            </TabsTrigger>
          </TabsList>

          {/* Current Values Display */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {['nifty', 'sensex', 'bankNifty'].map((index) => {
              const change = getChange(index);
              const isPositive = change.value >= 0;
              
              return (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground capitalize">
                    {index === 'bankNifty' ? 'Bank Nifty' : index.toUpperCase()}
                  </div>
                  <div className="text-lg font-semibold">
                    ₹{getCurrentValue(index).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm",
                    isPositive ? "text-primary" : "text-destructive"
                  )}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}{change.percent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <TabsContent value="nifty" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="niftyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(':')[0] + ':' + value.split(':')[1]}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}K`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                            <p className="text-sm text-muted-foreground">{label}</p>
                            <p className="text-sm font-medium">
                              NIFTY 50: ₹{payload[0].value?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="nifty"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#niftyGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="sensex" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(':')[0] + ':' + value.split(':')[1]}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}K`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                            <p className="text-sm text-muted-foreground">{label}</p>
                            <p className="text-sm font-medium">
                              SENSEX: ₹{payload[0].value?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sensex"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="bankNifty" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="bankNiftyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(':')[0] + ':' + value.split(':')[1]}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}K`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                            <p className="text-sm text-muted-foreground">{label}</p>
                            <p className="text-sm font-medium">
                              BANK NIFTY: ₹{payload[0].value?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="bankNifty"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    fill="url(#bankNiftyGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketTrendChart;