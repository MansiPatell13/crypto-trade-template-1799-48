import { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
}

interface StockSearchProps {
  className?: string;
}

const StockSearch = ({ className }: StockSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mockStocks: SearchResult[] = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 2847.30, change: 15.20, changePercent: 0.54, sector: 'Oil & Gas' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4156.75, change: -8.45, changePercent: -0.20, sector: 'IT Services' },
    { symbol: 'INFY', name: 'Infosys Ltd.', price: 1789.20, change: 12.35, changePercent: 0.70, sector: 'IT Services' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1654.80, change: -5.60, changePercent: -0.34, sector: 'Banking' },
    { symbol: 'ITC', name: 'ITC Ltd.', price: 456.90, change: 7.15, changePercent: 1.59, sector: 'FMCG' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', price: 1247.85, change: -12.45, changePercent: -0.99, sector: 'Telecom' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 812.30, change: 18.70, changePercent: 2.36, sector: 'Banking' },
    { symbol: 'LT', name: 'Larsen & Toubro Ltd.', price: 3642.15, change: 45.20, changePercent: 1.26, sector: 'Construction' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd.', price: 2934.60, change: -23.15, changePercent: -0.78, sector: 'Paints' },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd.', price: 11847.30, change: 125.40, changePercent: 1.07, sector: 'Automobile' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = mockStocks.filter(stock =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
        setIsOpen(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleStockSelect = (symbol: string) => {
    navigate(`/stock/${symbol}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">Searching...</div>
            ) : results.length > 0 ? (
              <div className="space-y-0">
                {results.map((stock) => {
                  const isPositive = stock.change >= 0;
                  return (
                    <Button
                      key={stock.symbol}
                      variant="ghost"
                      className="w-full justify-between p-4 h-auto rounded-none border-b border-border last:border-b-0"
                      onClick={() => handleStockSelect(stock.symbol)}
                    >
                      <div className="flex flex-col items-start space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{stock.symbol}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {stock.sector}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{stock.name}</span>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="font-medium">₹{stock.price.toFixed(2)}</span>
                        <div className={cn(
                          "flex items-center gap-1 text-xs",
                          isPositive ? "text-primary" : "text-destructive"
                        )}>
                          {isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span>{isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">No stocks found</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockSearch;