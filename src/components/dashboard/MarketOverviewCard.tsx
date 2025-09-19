import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardService } from '@/services/dashboard/dashboardService';
import { MarketIndex } from '@/types/dashboard';
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

interface MarketOverviewCardProps {
  market: 'india' | 'usa';
  formatCurrency: (value: number) => string;
}

const MarketOverviewCard = ({ market, formatCurrency }: MarketOverviewCardProps) => {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketOverview = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await dashboardService.getMarketOverview(market);
        setIndices(data);
      } catch (err) {
        setError('Failed to load market data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketOverview();
  }, [market]);

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
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : indices.length > 0 ? (
          <div className="space-y-3">
            {indices.map((index) => {
              const isPositive = index.changePercent >= 0;
              
              return (
                <div 
                  key={index.name} 
                  className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{index.name}</h4>
                      <p className="text-2xl font-bold mt-1">
                        {index.value.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className={`text-right ${
                      isPositive ? 'text-primary' : 'text-destructive'
                    }`}>
                      <div className="flex items-center gap-1">
                        {isPositive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-sm mt-1">
                        {isPositive ? '+' : ''}{index.change.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No market data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketOverviewCard;