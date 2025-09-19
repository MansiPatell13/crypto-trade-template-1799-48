import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { marketService, TopStock } from '@/services/market/marketService';
import { MarketType } from '@/types/dashboard';

interface TopStocksCardProps {
  market: MarketType;
  formatCurrency: (value: number) => string;
}

const TopStocksCard = ({ market, formatCurrency }: TopStocksCardProps) => {
  const [gainers, setGainers] = useState<TopStock[]>([]);
  const [losers, setLosers] = useState<TopStock[]>([]);
  const [mostTraded, setMostTraded] = useState<TopStock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopStocks = async () => {
      setIsLoading(true);
      try {
        const [gainersData, losersData, tradedData] = await Promise.all([
          marketService.getTopGainers(market),
          marketService.getTopLosers(market),
          marketService.getMostTraded(market)
        ]);
        
        setGainers(gainersData);
        setLosers(losersData);
        setMostTraded(tradedData);
      } catch (error) {
        console.error('Failed to fetch top stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopStocks();
  }, [market]);

  const StockList = ({ stocks, type }: { stocks: TopStock[], type: 'gainers' | 'losers' | 'traded' }) => (
    <div className="space-y-3">
      {stocks.slice(0, 5).map((stock) => {
        const isPositive = stock.changePercent >= 0;
        
        return (
          <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{stock.symbol}</span>
                {type === 'gainers' && <TrendingUp className="h-3 w-3 text-primary" />}
                {type === 'losers' && <TrendingDown className="h-3 w-3 text-destructive" />}
                {type === 'traded' && <Activity className="h-3 w-3 text-muted-foreground" />}
              </div>
              <p className="text-xs text-muted-foreground truncate">{stock.name}</p>
            </div>
            
            <div className="text-right">
              <p className="font-medium text-sm">{formatCurrency(stock.price)}</p>
              <div className={`text-xs ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="text-right space-y-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Movers</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
            <TabsTrigger value="traded">Most Traded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gainers" className="mt-4">
            {isLoading ? <LoadingSkeleton /> : <StockList stocks={gainers} type="gainers" />}
          </TabsContent>
          
          <TabsContent value="losers" className="mt-4">
            {isLoading ? <LoadingSkeleton /> : <StockList stocks={losers} type="losers" />}
          </TabsContent>
          
          <TabsContent value="traded" className="mt-4">
            {isLoading ? <LoadingSkeleton /> : <StockList stocks={mostTraded} type="traded" />}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TopStocksCard;