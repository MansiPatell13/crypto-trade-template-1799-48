import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import stockDashboard from "@/assets/stock-dashboard.jpg";
import stockHeroBg from "@/assets/stock-hero-bg.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container pt-28 pb-20"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 -z-10 bg-[#0A0A0A]"
          style={{
            backgroundImage: `url(${stockHeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
        >
          <span className="text-sm font-medium">
            <Target className="w-4 h-4 inline-block mr-2" />
            Next-gen stock trading platform
          </span>
        </motion.div>
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className="text-gray-200">
              <TextGenerateEffect words="Trade stocks with" />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words="confidence & precision" />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left"
          >
            Experience real-time market analytics, portfolio insights, and seamless stock trading simulation.{" "}
            <span className="text-white">Learn, practice, and invest smarter.</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button size="lg" className="button-gradient">
              Start Trading Now
            </Button>
            <Button size="lg" variant="link" className="text-white" asChild>
              <Link to="/markets">
                Explore Markets <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mx-auto max-w-5xl mt-20"
        >
          <div className="glass rounded-xl overflow-hidden">
            <img
              src={stockDashboard}
              alt="Bullseye Stock Trading Dashboard"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Feature Highlights */}
      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass glass-hover rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Live Market Data</h3>
            </div>
            <p className="text-muted-foreground">
              Real-time stock tickers & charts for global indices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass glass-hover rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smarter Insights</h3>
            </div>
            <p className="text-muted-foreground">
              AI-driven stock analysis & gainers/losers trends.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass glass-hover rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Practice Mode</h3>
            </div>
            <p className="text-muted-foreground">
              Gamified intraday trading with historical data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="container py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="glass rounded-xl overflow-hidden">
              <img
                src={stockDashboard}
                alt="Bullseye Trading Dashboard Preview"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight">
              Stay ahead of the
              <br />
              <span className="text-gradient font-medium">markets.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Track your portfolio, discover top movers, and compare indices across global and domestic markets. Everything in one place.
            </p>
            <Button size="lg" className="button-gradient">
              View Dashboard
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 relative">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start your trading journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of smart investors who are already using Bullseye to make informed trading decisions.
          </p>
          <Button size="lg" className="button-gradient">
            Start Trading Today
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;