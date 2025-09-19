import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface ChartPortfolioProps {
  data?: { date: string; value: number }[];
  height?: number;
  positive?: boolean;
}

const ChartPortfolio = ({ data, height = 200, positive = true }: ChartPortfolioProps) => {
  // Generate mock data if none provided
  const chartData = data || Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: 25000 + Math.random() * 2000 - 1000
  }));

  const gradientColor = positive ? 'primary' : 'destructive';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`gradient-${gradientColor}`} x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="5%" 
              stopColor={positive ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} 
              stopOpacity={0.3}
            />
            <stop 
              offset="95%" 
              stopColor={positive ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} 
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="date" 
          hide 
        />
        <YAxis hide />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-popover border border-border rounded-lg p-2 shadow-lg">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">
                    ${payload[0].value?.toLocaleString()}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={positive ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'}
          strokeWidth={2}
          fill={`url(#gradient-${gradientColor})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartPortfolio;