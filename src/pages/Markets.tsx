import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Globe, DollarSign } from "lucide-react";
import LogoCarousel from "@/components/LogoCarousel";

const Markets = () => {
  const marketSections = [
    {
      title: "Global Markets",
      icon: Globe,
      description: "Access major stock exchanges worldwide",
      markets: ["NYSE", "NASDAQ", "LSE", "TSE", "HKEX"]
    },
    {
      title: "Real-time Data",
      icon: TrendingUp,
      description: "Live market feeds and instant updates",
      markets: ["Live Quotes", "Market Depth", "Trade History", "Volume Analysis", "Price Alerts"]
    },
    {
      title: "Market Analytics",
      icon: BarChart3,
      description: "Advanced tools for market analysis",
      markets: ["Technical Indicators", "Chart Patterns", "Trend Analysis", "Market Sentiment", "Risk Metrics"]
    },
    {
      title: "Trading Instruments",
      icon: DollarSign,
      description: "Diverse investment options",
      markets: ["Stocks", "ETFs", "Options", "Futures", "Forex"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-20"
      >
        <div className="container px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-normal mb-6 tracking-tight">
              Explore Global <span className="text-gradient font-medium">Markets</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Trade across multiple markets with real-time data, advanced analytics, and comprehensive market coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {marketSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass glass-hover rounded-xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <section.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{section.title}</h3>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {section.markets.map((market) => (
                    <div key={market} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary/60" />
                      <span className="text-gray-300">{market}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <LogoCarousel />
        </div>
      </motion.div>
    </div>
  );
};

export default Markets;