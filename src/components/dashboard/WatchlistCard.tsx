import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardService } from '@/services/dashboard/dashboardService';
import { Stock } from '@/types/dashboard';
import ChartSparkline from "./ChartSparkline";
import { Eye, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WatchlistCardProps {
  market: 'india' | 'usa';
  formatCurrency: (value: number) => string;
}

const WatchlistCard = ({ market, formatCurrency }: WatchlistCardProps) => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWatchlist = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await dashboardService.getWatchlist(market);
        setWatchlist(data);
      } catch (err) {
        setError('Failed to load watchlist data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, [market]);

  const handleAddToWatchlist = () => {
    toast({
      title: "Add to Watchlist",
      description: "Stock search and watchlist functionality will be available with backend integration"
    });
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            My Watchlist
          </CardTitle>
          <Button size="sm" onClick={handleAddToWatchlist}>
            <Plus className="h-4 w-4 mr-1" />
            Add Stock
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        ) : watchlist.length > 0 ? (
          <div className="space-y-3">
            {watchlist.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              
              return (
                <div 
                  key={stock.symbol} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  {/* Stock Info */}
                  <div className="flex-1 min-w-0 max-w-[120px]">
                    <div className="flex items-center gap-3">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm truncate">{stock.symbol}</h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {stock.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="text-right mx-2 min-w-0 max-w-[100px]">
                    <p className="font-semibold text-sm truncate">
                      {market === 'usa' ? '$' : '₹'}{stock.price.toFixed(2)}
                    </p>
                    <div className={`flex items-center gap-1 text-xs ${
                      isPositive ? 'text-primary' : 'text-destructive'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3 flex-shrink-0" />
                      ) : (
                        <TrendingDown className="h-3 w-3 flex-shrink-0" />
                      )}
                      <span className="truncate">
                        {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Sparkline Chart */}
                  <div className="w-16 h-6 flex-shrink-0">
                    <ChartSparkline 
                      data={stock.sparklineData} 
                      positive={isPositive}
                      height={24}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your watchlist is empty</p>
            <Button onClick={handleAddToWatchlist}>
              <Plus className="h-4 w-4 mr-2" />
              Add your first stock
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WatchlistCard;