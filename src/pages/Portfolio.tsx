import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PortfolioCard from "@/components/dashboard/PortfolioCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

const Portfolio = () => {
  const [currentMarket, setCurrentMarket] = useState<'india' | 'usa'>('usa');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.marketPreference) {
      setCurrentMarket(user.marketPreference);
    }
  }, [user]);

  const handleAction = (action: string) => {
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
        {/* Portfolio Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
            <p className="text-muted-foreground">
              Manage your investments and track performance
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

        {/* Portfolio Actions */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => handleAction('Add Investment')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Investment
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleAction('Rebalance Portfolio')}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Rebalance
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleAction('Export Portfolio')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Portfolio Content */}
        <div className="grid gap-6">
          {/* Main Portfolio Card */}
          <PortfolioCard market={currentMarket} formatCurrency={formatCurrency} />
          
          {/* Portfolio Analytics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Asset allocation chart will be available with full implementation</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Return</span>
                    <span className="text-sm font-medium text-primary">+12.45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Annual Return</span>
                    <span className="text-sm font-medium">+18.23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Drawdown</span>
                    <span className="text-sm font-medium text-destructive">-8.91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                    <span className="text-sm font-medium">1.24</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Portfolio Beta</span>
                    <span className="text-sm font-medium">0.92</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Volatility</span>
                    <span className="text-sm font-medium">15.67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Value at Risk</span>
                    <span className="text-sm font-medium text-destructive">-2.34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Score</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;