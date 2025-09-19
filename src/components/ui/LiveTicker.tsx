import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface LiveTickerProps {
  className?: string;
}

const LiveTicker = ({ className }: LiveTickerProps) => {
  const [tickerData, setTickerData] = useState<TickerItem[]>([]);

  useEffect(() => {
    // Mock live ticker data
    const mockData: TickerItem[] = [
      { symbol: 'NIFTY', price: 25423.60, change: 93.35, changePercent: 0.37 },
      { symbol: 'SENSEX', price: 83013.96, change: 320.25, changePercent: 0.39 },
      { symbol: 'BANK NIFTY', price: 51247.85, change: -127.45, changePercent: -0.25 },
      { symbol: 'RELIANCE', price: 2847.30, change: 15.20, changePercent: 0.54 },
      { symbol: 'TCS', price: 4156.75, change: -8.45, changePercent: -0.20 },
      { symbol: 'INFY', price: 1789.20, change: 12.35, changePercent: 0.70 },
      { symbol: 'HDFC BANK', price: 1654.80, change: -5.60, changePercent: -0.34 },
      { symbol: 'ITC', price: 456.90, change: 7.15, changePercent: 1.59 },
    ];

    setTickerData(mockData);

    // Update ticker data every 3 seconds
    const interval = setInterval(() => {
      setTickerData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 5,
        change: item.change + (Math.random() - 0.5) * 2,
        changePercent: item.changePercent + (Math.random() - 0.5) * 0.1,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      "bg-card/50 backdrop-blur-sm border-b border-border overflow-hidden",
      className
    )}>
      <div className="relative flex animate-marquee whitespace-nowrap py-2">
        {tickerData.concat(tickerData).map((item, index) => {
          const isPositive = item.change >= 0;
          
          return (
            <div
              key={`${item.symbol}-${index}`}
              className="inline-flex items-center gap-2 mx-6"
            >
              <span className="font-medium text-sm">{item.symbol}</span>
              <span className="text-sm">₹{item.price.toFixed(2)}</span>
              <div className={cn(
                "flex items-center gap-1 text-xs",
                isPositive ? "text-primary" : "text-destructive"
              )}>
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveTicker;