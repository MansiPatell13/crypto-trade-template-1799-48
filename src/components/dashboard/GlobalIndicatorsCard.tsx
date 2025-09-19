import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { marketService, GlobalIndicator } from '@/services/market/marketService';

const GlobalIndicatorsCard = () => {
  const [indicators, setIndicators] = useState<GlobalIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIndicators = async () => {
      setIsLoading(true);
      try {
        const data = await marketService.getGlobalIndicators();
        setIndicators(data);
      } catch (error) {
        console.error('Failed to fetch global indicators:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndicators();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Global Markets
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {indicators.map((indicator) => {
              const isPositive = indicator.changePercent >= 0;
              
              return (
                <div 
                  key={indicator.name} 
                  className="p-3 rounded-lg border bg-card/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{indicator.name}</h4>
                      <p className="text-lg font-bold mt-1">
                        {indicator.currency && `${indicator.currency} `}
                        {indicator.value.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className={`text-right ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                      <div className="flex items-center gap-1">
                        {isPositive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="font-medium text-sm">
                          {isPositive ? '+' : ''}{indicator.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-xs mt-1">
                        {isPositive ? '+' : ''}{indicator.change.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GlobalIndicatorsCard;