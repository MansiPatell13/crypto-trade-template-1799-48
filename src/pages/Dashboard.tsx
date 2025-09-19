import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MarketOverviewCard from "@/components/dashboard/MarketOverviewCard";
import PortfolioCard from "@/components/dashboard/PortfolioCard";
import WatchlistCard from "@/components/dashboard/WatchlistCard";
import ActivityFeedCard from "@/components/dashboard/ActivityFeedCard";
import MarketNewsCard from "@/components/dashboard/MarketNewsCard";
import TopStocksCard from "@/components/dashboard/TopStocksCard";
import GlobalIndicatorsCard from "@/components/dashboard/GlobalIndicatorsCard";
import MarketTrendChart from "@/components/dashboard/MarketTrendChart";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const [currentMarket, setCurrentMarket] = useState<'india' | 'usa'>('usa');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Get user's market preference
    if (user?.marketPreference) {
      setCurrentMarket(user.marketPreference);
    }
  }, [user]);

  const handleQuickAction = (action: string) => {
    toast({
      title: "Feature coming soon",
      description: `${action} functionality will be available with backend integration`
    });
  };

  const formatCurrency = (value: number) => {
    if (currentMarket === 'usa') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    } else {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your portfolio today.
            </p>
          </div>
          
          {/* Market Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Market:</span>
            <Button
              variant={currentMarket === 'usa' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentMarket('usa')}
            >
              🇺🇸 US
            </Button>
            <Button
              variant={currentMarket === 'india' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentMarket('india')}
            >
              🇮🇳 India
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => handleQuickAction('Add to Watchlist')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add to Watchlist
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleQuickAction('Create Trade')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Create Trade
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleQuickAction('Download Report')}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            {/* Market Chart and Latest News */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <MarketTrendChart />
              </div>
              <MarketNewsCard market={currentMarket} />
            </div>
            
            {/* Portfolio Chart */}
            <PortfolioCard market={currentMarket} formatCurrency={formatCurrency} />
            
            {/* Top Stocks */}
            <TopStocksCard market={currentMarket} formatCurrency={formatCurrency} />
            
            {/* Market Overview and Global Indicators */}
            <div className="grid gap-6 md:grid-cols-2">
              <MarketOverviewCard market={currentMarket} formatCurrency={formatCurrency} />
              <GlobalIndicatorsCard />
            </div>
          </div>
          
          <div className="space-y-6">
            <ActivityFeedCard market={currentMarket} />
            <WatchlistCard market={currentMarket} formatCurrency={formatCurrency} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;