import { MarketType } from '@/types/dashboard';

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  timestamp: Date;
  source: string;
  impact: 'high' | 'medium' | 'low';
}

export interface TopStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface MarketAnnouncement {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'regulatory' | 'corporate' | 'economic';
}

export interface GlobalIndicator {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  currency?: string;
}

class MarketService {
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getMarketNews(market: MarketType): Promise<MarketNews[]> {
    await this.delay(300);
    
    const newsData: MarketNews[] = [
      {
        id: '1',
        title: 'RBI Monetary Policy: Repo Rate Unchanged at 6.50%',
        summary: 'Reserve Bank maintains status quo on policy rates, focuses on inflation control',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        source: 'Economic Times',
        impact: 'high'
      },
      {
        id: '2',
        title: 'IT Sector Shows Strong Q3 Results',
        summary: 'Major IT companies report better than expected earnings with improved margins',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        source: 'Business Standard',
        impact: 'medium'
      },
      {
        id: '3',
        title: 'FII Inflows Continue for Third Consecutive Week',
        summary: 'Foreign institutional investors pump ₹8,500 cr into Indian equities',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        source: 'Mint',
        impact: 'medium'
      }
    ];

    return newsData;
  }

  async getTopGainers(market: MarketType): Promise<TopStock[]> {
    await this.delay(250);
    
    const gainersData: TopStock[] = [
      { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 756.30, change: 45.20, changePercent: 6.35, volume: 2345678 },
      { symbol: 'TATASTEEL', name: 'Tata Steel', price: 134.85, change: 7.65, changePercent: 6.01, volume: 8976543 },
      { symbol: 'JSWSTEEL', name: 'JSW Steel', price: 912.40, change: 48.90, changePercent: 5.66, volume: 1234567 },
      { symbol: 'HINDALCO', name: 'Hindalco Ind.', price: 645.75, change: 31.25, changePercent: 5.08, volume: 3456789 },
      { symbol: 'COALINDIA', name: 'Coal India', price: 423.60, change: 19.85, changePercent: 4.91, volume: 5678901 }
    ];

    return gainersData;
  }

  async getTopLosers(market: MarketType): Promise<TopStock[]> {
    await this.delay(250);
    
    const losersData: TopStock[] = [
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 6789.25, change: -289.45, changePercent: -4.09, volume: 876543 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1654.80, change: -65.30, changePercent: -3.80, volume: 4567890 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1143.55, change: -41.25, changePercent: -3.48, volume: 6789012 },
      { symbol: 'AXISBANK', name: 'Axis Bank', price: 1087.70, change: -35.90, changePercent: -3.20, volume: 3456789 },
      { symbol: 'KOTAKBANK', name: 'Kotak Bank', price: 1756.40, change: -54.80, changePercent: -3.02, volume: 2345678 }
    ];

    return losersData;
  }

  async getMostTraded(market: MarketType): Promise<TopStock[]> {
    await this.delay(200);
    
    const tradedData: TopStock[] = [
      { symbol: 'RELIANCE', name: 'Reliance Ind.', price: 2847.30, change: 15.20, changePercent: 0.54, volume: 15678901 },
      { symbol: 'TCS', name: 'TCS Ltd.', price: 4156.75, change: -8.45, changePercent: -0.20, volume: 12345678 },
      { symbol: 'INFY', name: 'Infosys Ltd.', price: 1789.20, change: 12.35, changePercent: 0.70, volume: 10987654 },
      { symbol: 'ITC', name: 'ITC Ltd.', price: 456.90, change: 7.15, changePercent: 1.59, volume: 9876543 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1654.80, change: -65.30, changePercent: -3.80, volume: 8765432 }
    ];

    return tradedData;
  }

  async getMarketAnnouncements(market: MarketType): Promise<MarketAnnouncement[]> {
    await this.delay(200);
    
    const announcements: MarketAnnouncement[] = [
      {
        id: '1',
        title: 'SEBI Updates Margin Requirements',
        description: 'New margin norms for equity derivatives trading effective from next month',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        type: 'regulatory'
      },
      {
        id: '2',
        title: 'Q3 Results Season Begins',
        description: 'Major companies to announce quarterly results starting this week',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        type: 'corporate'
      },
      {
        id: '3',
        title: 'GDP Growth Estimates Revised',
        description: 'Government revises GDP growth forecast for current fiscal year',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        type: 'economic'
      }
    ];

    return announcements;
  }

  async getGlobalIndicators(): Promise<GlobalIndicator[]> {
    await this.delay(300);
    
    const indicators: GlobalIndicator[] = [
      { name: 'Dow Jones', value: 46156.22, change: 137.90, changePercent: 0.30 },
      { name: 'S&P 500', value: 6639.55, change: 39.20, changePercent: 0.59 },
      { name: 'Nasdaq', value: 21809.87, change: 185.45, changePercent: 0.86 },
      { name: 'Nikkei 225', value: 45303.43, change: 513.05, changePercent: 1.15 },
      { name: 'Hang Seng', value: 26544.85, change: -363.54, changePercent: -1.35 },
      { name: 'FTSE 100', value: 8247.35, change: 23.80, changePercent: 0.29 },
      { name: 'Crude Oil', value: 78.92, change: 0.45, changePercent: 0.57, currency: 'USD' },
      { name: 'Gold', value: 2685.40, change: -12.60, changePercent: -0.47, currency: 'USD' }
    ];

    return indicators;
  }
}

export const marketService = new MarketService();