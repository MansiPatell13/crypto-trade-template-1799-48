import { useState, useEffect } from 'react';
import { 
  Stock, 
  PortfolioData, 
  MarketIndex, 
  ActivityItem, 
  MarketType 
} from '@/types/dashboard';
import { LoadingState } from '@/types/common';
import { dashboardService } from '@/services/dashboard/dashboardService';

export const useDashboardData = (market: MarketType) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [marketOverview, setMarketOverview] = useState<MarketIndex[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoadingState({ isLoading: true, error: null });
        
        const [portfolioData, watchlistData, marketData, activityData] = await Promise.all([
          dashboardService.getPortfolio(market),
          dashboardService.getWatchlist(market),
          dashboardService.getMarketOverview(market),
          dashboardService.getActivityFeed(market)
        ]);

        setPortfolio(portfolioData);
        setWatchlist(watchlistData);
        setMarketOverview(marketData);
        setActivityFeed(activityData);
        setLoadingState({ isLoading: false, error: null });
      } catch (error) {
        setLoadingState({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to load dashboard data' 
        });
      }
    };

    fetchDashboardData();
  }, [market]);

  const addToWatchlist = async (symbol: string) => {
    const result = await dashboardService.addToWatchlist(symbol);
    if (result.ok) {
      // Refresh watchlist
      const updatedWatchlist = await dashboardService.getWatchlist(market);
      setWatchlist(updatedWatchlist);
    }
    return result;
  };

  const removeFromWatchlist = async (symbol: string) => {
    const result = await dashboardService.removeFromWatchlist(symbol);
    if (result.ok) {
      setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
    }
    return result;
  };

  return {
    portfolio,
    watchlist,
    marketOverview,
    activityFeed,
    loadingState,
    addToWatchlist,
    removeFromWatchlist
  };
};

export const useStockSearch = (market: MarketType) => {
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchStocks = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await dashboardService.searchStocks(query, market);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchResults,
    isSearching,
    searchStocks,
    clearResults: () => setSearchResults([])
  };
};