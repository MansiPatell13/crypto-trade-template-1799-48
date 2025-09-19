import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, TrendingUp, TrendingDown, Star, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ChartSparkline from "@/components/dashboard/ChartSparkline";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  market: 'usa' | 'india';
  data: number[];
}

interface WatchlistItem extends Stock {
  id: string;
  addedAt: Date;
}

const Watchlist = () => {
  const { toast } = useToast();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock stock data for search
  const mockStocks: Stock[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.34,
      changePercent: 1.35,
      market: 'usa',
      data: Array.from({ length: 7 }, () => 170 + Math.random() * 10)
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 242.68,
      change: -5.23,
      changePercent: -2.11,
      market: 'usa',
      data: Array.from({ length: 7 }, () => 240 + Math.random() * 15)
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 378.85,
      change: 4.67,
      changePercent: 1.25,
      market: 'usa',
      data: Array.from({ length: 7 }, () => 375 + Math.random() * 8)
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      price: 2456.30,
      change: 34.50,
      changePercent: 1.42,
      market: 'india',
      data: Array.from({ length: 7 }, () => 2450 + Math.random() * 20)
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3625.80,
      change: -28.90,
      changePercent: -0.79,
      market: 'india',
      data: Array.from({ length: 7 }, () => 3620 + Math.random() * 25)
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      price: 1542.65,
      change: 18.45,
      changePercent: 1.21,
      market: 'india',
      data: Array.from({ length: 7 }, () => 1540 + Math.random() * 15)
    }
  ];

  // Load initial watchlist
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('bullseye-watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else {
      // Add some default stocks
      const defaultWatchlist: WatchlistItem[] = [
        { ...mockStocks[0], id: '1', addedAt: new Date() },
        { ...mockStocks[3], id: '2', addedAt: new Date() }
      ];
      setWatchlist(defaultWatchlist);
      localStorage.setItem('bullseye-watchlist', JSON.stringify(defaultWatchlist));
    }
  }, []);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const results = mockStocks.filter(stock =>
        stock.symbol.toLowerCase().includes(term.toLowerCase()) ||
        stock.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  const addToWatchlist = (stock: Stock) => {
    const isAlreadyAdded = watchlist.some(item => item.symbol === stock.symbol);
    
    if (isAlreadyAdded) {
      toast({
        title: "Already in watchlist",
        description: `${stock.symbol} is already in your watchlist.`,
        variant: "destructive"
      });
      return;
    }

    const newItem: WatchlistItem = {
      ...stock,
      id: Date.now().toString(),
      addedAt: new Date()
    };

    const updatedWatchlist = [...watchlist, newItem];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('bullseye-watchlist', JSON.stringify(updatedWatchlist));

    toast({
      title: "Added to watchlist",
      description: `${stock.symbol} has been added to your watchlist.`
    });

    setIsAddDialogOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  const removeFromWatchlist = (id: string) => {
    const updatedWatchlist = watchlist.filter(item => item.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('bullseye-watchlist', JSON.stringify(updatedWatchlist));

    toast({
      title: "Removed from watchlist",
      description: "Stock has been removed from your watchlist."
    });
  };

  const formatCurrency = (value: number, market: 'usa' | 'india') => {
    return market === 'usa' 
      ? `$${value.toFixed(2)}` 
      : `₹${value.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
              <p className="text-muted-foreground">
                Monitor your favorite stocks and track their performance.
              </p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="button-gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stock
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Stock to Watchlist</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search stocks (e.g., AAPL, TSLA)..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                      }}
                      className="pl-10"
                    />
                  </div>
                  
                  {isLoading && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Searching...</p>
                    </div>
                  )}
                  
                  {searchResults.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {searchResults.map((stock) => (
                        <div
                          key={stock.symbol}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                          onClick={() => addToWatchlist(stock)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{stock.symbol}</span>
                              <Badge variant="outline" className="text-xs">
                                {stock.market.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {formatCurrency(stock.price, stock.market)}
                            </p>
                            <p className={`text-xs ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {searchTerm && !isLoading && searchResults.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No stocks found matching "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Watchlist Grid */}
          {watchlist.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your watchlist is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Add stocks to monitor their performance and get quick insights.
                </p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="button-gradient"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Stock
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlist.map((stock, index) => (
                <motion.div
                  key={stock.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {stock.market.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWatchlist(stock.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Price Info */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold">
                              {formatCurrency(stock.price, stock.market)}
                            </p>
                            <div className="flex items-center gap-1">
                              {stock.change >= 0 ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              )}
                              <span className={`text-sm font-medium ${
                                stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mini Chart */}
                        <div className="h-16">
                          <ChartSparkline 
                            data={stock.data} 
                            positive={stock.change >= 0}
                          />
                        </div>

                        {/* Action Button */}
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Watchlist;