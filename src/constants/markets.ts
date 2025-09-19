import { MarketType } from '@/types/dashboard';

export const MARKET_CONFIGS = {
  india: {
    name: 'India',
    description: 'Trade in NSE & BSE indices (Nifty, Sensex).',
    indices: ['Nifty 50', 'Sensex'],
    currency: 'INR',
    timezone: 'Asia/Kolkata'
  },
  usa: {
    name: 'USA',
    description: 'Access US markets (S&P 500, Nasdaq, Dow Jones).',
    indices: ['S&P 500', 'Nasdaq', 'Dow Jones'],
    currency: 'USD',
    timezone: 'America/New_York'
  }
} as const;

export const DEFAULT_MARKET: MarketType = 'india';

export const DEMO_CREDENTIALS = {
  email: 'demo@bullseye.test',
  password: 'Demo@123'
} as const;