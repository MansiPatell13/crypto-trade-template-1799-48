export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparklineData: number[];
}

export interface PortfolioData {
  balance: number;
  change: number;
  changePercent: number;
  positions: PortfolioPosition[];
}

export interface PortfolioPosition {
  symbol: string;
  name: string;
  quantity: number;
  value: number;
  changePercent: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface ActivityItem {
  id: string;
  type: 'trade' | 'watchlist' | 'system';
  message: string;
  timestamp: Date;
  symbol?: string;
}

export type MarketType = 'india' | 'usa';