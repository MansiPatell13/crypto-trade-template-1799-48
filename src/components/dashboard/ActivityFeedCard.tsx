import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { dashboardService } from '@/services/dashboard/dashboardService';
import { ActivityItem } from '@/types/dashboard';
import { Activity, TrendingUp, Eye, Settings } from "lucide-react";

interface ActivityFeedCardProps {
  market: 'india' | 'usa';
}

const ActivityFeedCard = ({ market }: ActivityFeedCardProps) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivityFeed = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await dashboardService.getActivityFeed(market);
        setActivities(data);
      } catch (err) {
        setError('Failed to load activity data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityFeed();
  }, [market]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'trade':
        return <TrendingUp className="h-4 w-4" />;
      case 'watchlist':
        return <Eye className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityBadgeVariant = (type: ActivityItem['type']) => {
    switch (type) {
      case 'trade':
        return 'default';
      case 'watchlist':
        return 'secondary';
      case 'system':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
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
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-3">
            {activities.slice(0, 3).map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
              >
                {/* Activity Icon */}
                <div className="flex-shrink-0 p-1.5 rounded-full bg-muted">
                  {getActivityIcon(activity.type)}
                </div>
                
                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-foreground line-clamp-2">{activity.message}</p>
                    <Badge 
                      variant={getActivityBadgeVariant(activity.type)}
                      className="text-xs flex-shrink-0"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                    {activity.symbol && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {activity.symbol}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeedCard;