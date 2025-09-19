import { 
  Stock, 
  PortfolioData, 
  PortfolioPosition, 
  MarketIndex, 
  ActivityItem, 
  MarketType 
} from '@/types/dashboard';

class MockDataGenerator {
  private generateSparklineData(): number[] {
    const data: number[] = [];
    let baseValue = 100;
    
    for (let i = 0; i < 20; i++) {
      baseValue += (Math.random() - 0.5) * 10;
      data.push(Math.max(0, baseValue));
    }
    
    return data;
  }

  private getStockSymbols(market: MarketType): Array<{ symbol: string; name: string }> {
    if (market === 'india') {
      return [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd' },
        { symbol: 'TCS', name: 'Tata Consultancy Services' },
        { symbol: 'INFY', name: 'Infosys Ltd' },
        { symbol: 'HDFC', name: 'HDFC Bank Ltd' },
        { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd' },
        { symbol: 'WIPRO', name: 'Wipro Ltd' },
        { symbol: 'SBIN', name: 'State Bank of India' },
        { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd' }
      ];
    } else {
      return [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
        { symbol: 'TSLA', name: 'Tesla Inc.' },
        { symbol: 'META', name: 'Meta Platforms Inc.' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation' },
        { symbol: 'NFLX', name: 'Netflix Inc.' }
      ];
    }
  }

  generateWatchlist(market: MarketType): Stock[] {
    const symbols = this.getStockSymbols(market);
    const basePrice = market === 'india' ? 2000 : 150;
    
    return symbols.slice(0, 6).map(({ symbol, name }) => {
      const price = basePrice + Math.random() * basePrice;
      const change = (Math.random() - 0.5) * price * 0.1;
      
      return {
        symbol,
        name,
        price: Math.round(price * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round((change / price) * 100 * 100) / 100,
        sparklineData: this.generateSparklineData()
      };
    });
  }

  generatePortfolio(market: MarketType): PortfolioData {
    const symbols = this.getStockSymbols(market);
    const basePrice = market === 'india' ? 2000 : 150;
    
    const positions: PortfolioPosition[] = symbols.slice(0, 4).map(({ symbol, name }) => {
      const quantity = Math.floor(Math.random() * 100) + 10;
      const avgPrice = basePrice + Math.random() * basePrice * 0.5;
      const currentPrice = avgPrice + (Math.random() - 0.5) * avgPrice * 0.2;
      const value = quantity * currentPrice;
      const changePercent = Math.round(((currentPrice - avgPrice) / avgPrice) * 100 * 100) / 100;
      
      return {
        symbol,
        name,
        quantity,
        value: Math.round(value * 100) / 100,
        changePercent
      };
    });

    const balance = positions.reduce((sum, pos) => sum + pos.value, 0);
    const totalInvested = positions.reduce((sum, pos) => sum + (pos.value / (1 + pos.changePercent / 100)), 0);
    const change = balance - totalInvested;
    const changePercent = Math.round((change / totalInvested) * 100 * 100) / 100;
    
    return {
      balance: Math.round(balance * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent,
      positions
    };
  }

  generateMarketOverview(market: MarketType): MarketIndex[] {
    if (market === 'india') {
      return [
        {
          name: 'Nifty 50',
          value: 19500 + Math.random() * 1000,
          change: (Math.random() - 0.5) * 200,
          changePercent: (Math.random() - 0.5) * 2
        },
        {
          name: 'Sensex',
          value: 65000 + Math.random() * 5000,
          change: (Math.random() - 0.5) * 500,
          changePercent: (Math.random() - 0.5) * 2
        }
      ];
    } else {
      return [
        {
          name: 'S&P 500',
          value: 4200 + Math.random() * 400,
          change: (Math.random() - 0.5) * 50,
          changePercent: (Math.random() - 0.5) * 2
        },
        {
          name: 'Nasdaq',
          value: 13000 + Math.random() * 1000,
          change: (Math.random() - 0.5) * 100,
          changePercent: (Math.random() - 0.5) * 2
        }
      ];
    }
  }

  generateActivityFeed(market: MarketType): ActivityItem[] {
    const symbols = this.getStockSymbols(market);
    const activities: ActivityItem[] = [];
    
    for (let i = 0; i < 8; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const types: ActivityItem['type'][] = ['trade', 'watchlist', 'system'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      let message = '';
      let activitySymbol: string | undefined;
      
      switch (type) {
        case 'trade':
          const amount = Math.floor(Math.random() * 50000) + 1000;
          const action = Math.random() > 0.5 ? 'Bought' : 'Sold';
          message = `${action} ${symbol.symbol} shares worth ${market === 'india' ? '₹' : '$'}${amount.toLocaleString()}`;
          activitySymbol = symbol.symbol;
          break;
        case 'watchlist':
          message = `Added ${symbol.symbol} to watchlist`;
          activitySymbol = symbol.symbol;
          break;
        case 'system':
          message = `Market analysis updated for ${market === 'india' ? 'Indian' : 'US'} market`;
          break;
      }
      
      activities.push({
        id: `activity-${i}`,
        type,
        message,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        symbol: activitySymbol
      });
    }
    
    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  searchStocks(query: string, market: MarketType): Stock[] {
    const symbols = this.getStockSymbols(market);
    const filtered = symbols.filter(
      ({ symbol, name }) =>
        symbol.toLowerCase().includes(query.toLowerCase()) ||
        name.toLowerCase().includes(query.toLowerCase())
    );
    
    const basePrice = market === 'india' ? 2000 : 150;
    
    return filtered.slice(0, 5).map(({ symbol, name }) => {
      const price = basePrice + Math.random() * basePrice;
      const change = (Math.random() - 0.5) * price * 0.1;
      
      return {
        symbol,
        name,
        price: Math.round(price * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round((change / price) * 100 * 100) / 100,
        sparklineData: this.generateSparklineData()
      };
    });
  }
}

export const mockDataGenerator = new MockDataGenerator();