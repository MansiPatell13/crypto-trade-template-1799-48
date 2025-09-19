import { TrendingUp, BarChart3, Shield, Target } from "lucide-react";

export const features = [
  {
    title: "Live Market Data",
    description: "Real-time stock tickers, charts, and analytics for global indices including Sensex, Nifty, and international markets.",
    icon: <TrendingUp className="w-6 h-6" />,
    image: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png"
  },
  {
    title: "Smarter Insights",
    description: "AI-driven stock analysis with gainers/losers trends, market predictions, and intelligent trade recommendations.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png"
  },
  {
    title: "Practice Mode",
    description: "Gamified intraday trading simulator with historical data to learn and practice without real money risks.",
    icon: <Target className="w-6 h-6" />,
    image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png"
  },
  {
    title: "Portfolio Security",
    description: "Bank-level security with encrypted data protection and secure trading environment for your peace of mind.",
    icon: <Shield className="w-6 h-6" />,
    image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png"
  }
];