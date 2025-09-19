import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MarketOverviewCard from "@/components/dashboard/MarketOverviewCard";
import TopStocksCard from "@/components/dashboard/TopStocksCard";
import MarketNewsCard from "@/components/dashboard/MarketNewsCard";
import MarketTrendChart from "@/components/dashboard/MarketTrendChart";
import { Button } from "@/components/ui/button";
import { TrendingUp, Bitcoin, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Crypto = () => {
  const [currentMarket] = useState<'usa'>('usa'); // Crypto primarily trades in USD
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    toast({
      title: "Feature coming soon",
      description: `${action} functionality will be available with backend integration`
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Bitcoin className="h-8 w-8 text-primary" />
              Cryptocurrency Market
            </h1>
            <p className="text-muted-foreground">
              Track and analyze cryptocurrency trends and performance.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => handleQuickAction('Add Crypto to Watchlist')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Add to Watchlist
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleQuickAction('Download Crypto Report')}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Crypto Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Crypto Market Chart - First Priority */}
            <MarketTrendChart />
            
            {/* Crypto News and Top Cryptos - Second Priority */}
            <div className="grid gap-6 md:grid-cols-2">
              <MarketNewsCard market={currentMarket} />
              <TopStocksCard market={currentMarket} formatCurrency={formatCurrency} />
            </div>
          </div>
          
          <div className="space-y-6">
            <MarketOverviewCard market={currentMarket} formatCurrency={formatCurrency} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Crypto;