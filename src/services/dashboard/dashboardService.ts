import { 
  Stock, 
  PortfolioData, 
  MarketIndex, 
  ActivityItem, 
  MarketType 
} from '@/types/dashboard';
import { mockDataGenerator } from './mockDataGenerator';

class DashboardService {
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getPortfolio(market: MarketType): Promise<PortfolioData> {
    await this.delay(300);
    return mockDataGenerator.generatePortfolio(market);
  }

  async getWatchlist(market: MarketType): Promise<Stock[]> {
    await this.delay(400);
    return mockDataGenerator.generateWatchlist(market);
  }

  async getMarketOverview(market: MarketType): Promise<MarketIndex[]> {
    await this.delay(200);
    return mockDataGenerator.generateMarketOverview(market);
  }

  async getActivityFeed(market: MarketType): Promise<ActivityItem[]> {
    await this.delay(350);
    return mockDataGenerator.generateActivityFeed(market);
  }

  async addToWatchlist(symbol: string): Promise<{ ok: boolean; error?: string }> {
    await this.delay(500);
    
    // Mock validation
    if (!symbol || symbol.length < 2) {
      return { ok: false, error: 'Invalid symbol' };
    }

    return { ok: true };
  }

  async removeFromWatchlist(symbol: string): Promise<{ ok: boolean; error?: string }> {
    await this.delay(300);
    return { ok: true };
  }

  async searchStocks(query: string, market: MarketType): Promise<Stock[]> {
    await this.delay(400);
    
    if (!query || query.length < 2) {
      return [];
    }

    return mockDataGenerator.searchStocks(query, market);
  }
}

export const dashboardService = new DashboardService();