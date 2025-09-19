import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/layout/AuthLayout";
import { Check, TrendingUp } from "lucide-react";

const MarketSelection = () => {
  const [selectedMarket, setSelectedMarket] = useState<'india' | 'usa' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setMarketPreference } = useAuth();

  const handleContinue = async () => {
    if (!selectedMarket) {
      toast({
        title: "Please select a market",
        description: "Choose your preferred market to continue",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await setMarketPreference(selectedMarket);
      
      if (response.ok) {
        toast({
          title: "Market preference saved",
          description: `${selectedMarket === 'usa' ? 'US' : 'Indian'} market set as default`
        });
        navigate('/dashboard');
      } else {
        throw new Error(response.error || 'Failed to save preference');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save market preference. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markets = [
    {
      id: 'usa' as const,
      name: 'United States',
      description: 'Trade US stocks (NASDAQ, NYSE)',
      currency: 'USD',
      examples: ['AAPL', 'TSLA', 'MSFT', 'AMZN'],
      flag: '🇺🇸'
    },
    {
      id: 'india' as const,
      name: 'India',
      description: 'Trade Indian stocks (NSE, BSE)',
      currency: 'INR',
      examples: ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY'],
      flag: '🇮🇳'
    }
  ];

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Choose Your Market</h2>
          <p className="text-gray-400">Select your preferred market to get started with trading</p>
        </div>
        
        <div className="grid gap-4">
          {markets.map((market) => (
            <Card
              key={market.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedMarket === market.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => setSelectedMarket(market.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{market.flag}</span>
                    <div>
                      <CardTitle className="text-lg">{market.name}</CardTitle>
                      <CardDescription>{market.description}</CardDescription>
                    </div>
                  </div>
                  {selectedMarket === market.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Currency: {market.currency}</span>
                  </div>
                  <div className="flex gap-2">
                    {market.examples.map((symbol, index) => (
                      <span
                        key={symbol}
                        className="px-2 py-1 bg-muted rounded text-xs font-mono"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleContinue}
            disabled={!selectedMarket || isLoading}
            className="w-full button-gradient"
            size="lg"
          >
            {isLoading ? "Setting up..." : "Continue to Dashboard"}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            You can change your market preference later in settings
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default MarketSelection;