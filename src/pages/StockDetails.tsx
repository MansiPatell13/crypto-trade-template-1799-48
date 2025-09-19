import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Plus,
  Activity,
  BarChart3,
  Newspaper,
  Scale
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  marketCap: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  week52High: number;
  week52Low: number;
  pe: number;
  eps: number;
  sales: number;
  faceValue: number;
  netProfitMargin: number;
  lastDividend: number;
  roe: number;
  hotness: number; // 0-100 scale
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  timestamp: Date;
  source: string;
  impact: 'high' | 'medium' | 'low';
}

interface ComparisonStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

const StockDetails = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [chartPeriod, setChartPeriod] = useState('1D');
  const [chartData, setChartData] = useState<any[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [comparison, setComparison] = useState<ComparisonStock[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState('1000');
  const [investmentPeriod, setInvestmentPeriod] = useState('1 Week');

  useEffect(() => {
    if (symbol) {
      // Mock stock data
      const mockData: StockData = {
        symbol: symbol,
        name: getStockName(symbol),
        price: 2847.30,
        change: 15.20,
        changePercent: 0.54,
        sector: 'Oil & Gas',
        marketCap: 1925000,
        volume: 2847356,
        dayHigh: 2875.40,
        dayLow: 2832.15,
        week52High: 3020.50,
        week52Low: 2145.80,
        pe: 102.98,
        eps: 5.89,
        sales: 1371.70,
        faceValue: 1,
        netProfitMargin: 12.99,
        lastDividend: 25,
        roe: 15.48,
        hotness: 78
      };

      setStockData(mockData);

      // Generate mock chart data based on period
      const generateChartData = (period: string) => {
        const points = period === '1D' ? 96 : period === '1W' ? 7 : period === '1M' ? 30 : period === '6M' ? 180 : 365;
        const data = [];
        const basePrice = mockData.price;

        for (let i = 0; i < points; i++) {
          const variation = (Math.random() - 0.5) * 0.1;
          const price = basePrice * (1 + variation + Math.sin(i / 10) * 0.05);
          data.push({
            time: period === '1D' ? `${9 + Math.floor(i / 4)}:${(i % 4) * 15}` : `Day ${i + 1}`,
            price: price,
            volume: Math.floor(Math.random() * 1000000) + 500000
          });
        }
        return data;
      };

      setChartData(generateChartData(chartPeriod));

      // Mock news data
      setNews([
        {
          id: '1',
          title: `${symbol} Stocks Surge After Strong Q3 Results`,
          summary: 'Company reports better than expected earnings with improved margins',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          source: 'Economic Times',
          impact: 'high'
        },
        {
          id: '2',
          title: `Analysts Upgrade ${symbol} to Buy Rating`,
          summary: 'Multiple analysts raise target price citing strong fundamentals',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          source: 'Business Standard',
          impact: 'medium'
        },
        {
          id: '3',
          title: `${symbol} Announces New Expansion Plans`,
          summary: 'Company to invest ₹5,000 cr in capacity expansion over next 2 years',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          source: 'Mint',
          impact: 'medium'
        }
      ]);

      // Mock comparison data
      setComparison([
        { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', price: 280.70, changePercent: 1.2 },
        { symbol: 'BPCL', name: 'Bharat Petroleum Corp', price: 412.50, changePercent: -0.8 },
        { symbol: 'IOC', name: 'Indian Oil Corporation', price: 156.30, changePercent: 0.5 }
      ]);
    }
  }, [symbol, chartPeriod]);

  const getStockName = (symbol: string) => {
    const names: { [key: string]: string } = {
      'RELIANCE': 'Reliance Industries Ltd.',
      'TCS': 'Tata Consultancy Services',
      'INFY': 'Infosys Ltd.',
      'HDFCBANK': 'HDFC Bank Ltd.',
      'ITC': 'ITC Ltd.',
      'BHARTIARTL': 'Bharti Airtel Ltd.',
      'SBIN': 'State Bank of India',
      'LT': 'Larsen & Toubro Ltd.',
      'ASIANPAINT': 'Asian Paints Ltd.',
      'MARUTI': 'Maruti Suzuki India Ltd.'
    };
    return names[symbol] || `${symbol} Ltd.`;
  };

  const getHotnessColor = (hotness: number) => {
    if (hotness >= 80) return 'text-green-500';
    if (hotness >= 60) return 'text-yellow-500';
    if (hotness >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getHotnessLabel = (hotness: number) => {
    if (hotness >= 80) return 'Very Hot';
    if (hotness >= 60) return 'Hot';
    if (hotness >= 40) return 'Warm';
    return 'Cool';
  };

  const calculateInvestmentReturn = () => {
    const amount = parseFloat(investmentAmount);
    const periods: { [key: string]: number } = {
      '1 Week': 1.079,
      '1 Month': 1.15,
      '3 Months': 1.28,
      '6 Months': 1.45,
      '1 Year': 1.82
    };
    return amount * (periods[investmentPeriod] || 1);
  };

  if (!stockData) {
    return <div>Loading...</div>;
  }

  const isPositive = stockData.change >= 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{stockData.symbol}</h1>
              <Badge variant="secondary">{stockData.sector}</Badge>
            </div>
            <p className="text-muted-foreground">{stockData.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Watchlist
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add to Portfolio
            </Button>
          </div>
        </div>

        {/* Price and Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold">₹{stockData.price.toFixed(2)}</div>
                <div className={cn(
                  "flex items-center gap-2",
                  isPositive ? "text-primary" : "text-destructive"
                )}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-medium">
                    {isPositive ? '+' : ''}₹{stockData.change.toFixed(2)} ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Day High</span>
                  <span className="font-medium">₹{stockData.dayHigh.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Day Low</span>
                  <span className="font-medium">₹{stockData.dayLow.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="font-medium">{stockData.volume.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Stock Hotness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={cn("text-2xl font-bold", getHotnessColor(stockData.hotness))}>
                    {stockData.hotness}%
                  </span>
                  <span className={cn("font-medium", getHotnessColor(stockData.hotness))}>
                    {getHotnessLabel(stockData.hotness)}
                  </span>
                </div>
                <Progress value={stockData.hotness} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Based on market sentiment, volume, and recent performance
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Price Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Price Chart
                  </CardTitle>
                  <div className="flex gap-2">
                    {['1D', '1W', '1M', '6M', '1Y'].map((period) => (
                      <Button
                        key={period}
                        variant={chartPeriod === period ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartPeriod(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value.toFixed(0)}`} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                                <p className="text-sm text-muted-foreground">{label}</p>
                                <p className="text-sm font-medium">
                                  Price: ₹{payload[0].value?.toFixed(2)}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Snapshot */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Snapshot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-lg font-medium">If you had invested</div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground">Amount (₹)</label>
                      <Input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground">Period</label>
                      <Select value={investmentPeriod} onValueChange={setInvestmentPeriod}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 Week">1 Week</SelectItem>
                          <SelectItem value="1 Month">1 Month</SelectItem>
                          <SelectItem value="3 Months">3 Months</SelectItem>
                          <SelectItem value="6 Months">6 Months</SelectItem>
                          <SelectItem value="1 Year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      ₹{calculateInvestmentReturn().toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      You would have {investmentPeriod} ago
                    </div>
                  </div>
                  <Button className="w-full">Add to Portfolio</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Report Card */}
            <Card>
              <CardHeader>
                <CardTitle>Report Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">PE Ratios</span>
                    <span className="font-medium">{stockData.pe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">EPS (₹.)</span>
                    <span className="font-medium">{stockData.eps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sales (₹. Cr)</span>
                    <span className="font-medium">{stockData.sales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Face Value (₹.)</span>
                    <span className="font-medium">{stockData.faceValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Net Profit Margin (%)</span>
                    <span className="font-medium">{stockData.netProfitMargin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Dividend (%)</span>
                    <span className="font-medium">{stockData.lastDividend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Return on Average Equity</span>
                    <span className="font-medium">{stockData.roe}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* News */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Latest News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <h4 className="font-medium text-sm leading-tight">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.summary}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.source}</span>
                        <span>{item.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <hr className="border-border" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Compare with Similar Stocks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {comparison.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">₹{stock.price.toFixed(2)}</div>
                        <div className={cn(
                          "text-xs",
                          stock.changePercent >= 0 ? "text-primary" : "text-destructive"
                        )}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StockDetails;