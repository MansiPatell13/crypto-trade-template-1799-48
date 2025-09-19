import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface ChartSparklineProps {
  data: number[];
  positive?: boolean;
  height?: number;
}

const ChartSparkline = ({ data, positive = true, height = 40 }: ChartSparklineProps) => {
  const chartData = data.map((value, index) => ({ value, index }));
  const color = positive ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartSparkline;