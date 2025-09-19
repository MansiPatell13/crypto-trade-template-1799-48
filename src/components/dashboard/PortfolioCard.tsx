import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardService } from '@/services/dashboard/dashboardService';
import { PortfolioData } from '@/types/dashboard';
import ChartPortfolio from "./ChartPortfolio";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface PortfolioCardProps {
  market: 'india' | 'usa';
  formatCurrency: (value: number) => string;
}

const PortfolioCard = ({ market, formatCurrency }: PortfolioCardProps) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await dashboardService.getPortfolio(market);
        setPortfolio(data);
      } catch (err) {
        setError('Failed to load portfolio data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [market]);

  const isPositive = portfolio ? portfolio.changePercent >= 0 : true;

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
          <Wallet className="h-5 w-5" />
          Your Portfolio Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-40 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ) : portfolio ? (
          <div className="space-y-6">
            {/* Balance Section */}
            <div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl md:text-3xl font-bold break-words">
                  {formatCurrency(portfolio.balance)}
                </h3>
                <div className={`flex items-center gap-1 ${
                  isPositive ? 'text-primary' : 'text-destructive'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="font-medium text-sm">
                    {formatCurrency(Math.abs(portfolio.change || 0))} ({Math.abs(portfolio.changePercent || 0).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Change (24h)
              </p>
            </div>

            {/* Portfolio Chart */}
            <div>
              <ChartPortfolio positive={isPositive} />
            </div>

            {/* Top Holdings */}
            <div>
              <h4 className="font-semibold mb-3">Top Holdings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {portfolio.positions.map((position) => (
                  <div 
                    key={position.symbol} 
                    className="p-4 rounded-lg bg-muted/30 border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{position.symbol}</span>
                      <span className={`text-sm ${
                        (position.changePercent || 0) >= 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {(position.changePercent || 0) >= 0 ? '+' : ''}
                        {(position.changePercent || 0).toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{position.quantity || 0} shares</p>
                      <p className="font-medium text-foreground">
                        {formatCurrency(position.value || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;