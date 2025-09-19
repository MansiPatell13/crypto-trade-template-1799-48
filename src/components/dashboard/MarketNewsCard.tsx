import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Clock } from 'lucide-react';
import { marketService, MarketNews } from '@/services/market/marketService';
import { MarketType } from '@/types/dashboard';

interface MarketNewsCardProps {
  market: MarketType;
}

const MarketNewsCard = ({ market }: MarketNewsCardProps) => {
  const [news, setNews] = useState<MarketNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const data = await marketService.getMarketNews(market);
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [market]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    return `${hours}h ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Latest Market News
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="border-l-2 border-primary pl-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm leading-tight">{item.title}</h4>
                  <Badge variant="secondary" className={`${getImpactColor(item.impact)} text-white`}>
                    {item.impact}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.summary}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(item.timestamp)}</span>
                  <span>•</span>
                  <span>{item.source}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketNewsCard;