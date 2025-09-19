import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Shield, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track market movements with precision"
    },
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Bank-level security for your investments"
    },
    {
      icon: BarChart3,
      title: "Advanced Charts",
      description: "Professional trading tools and indicators"
    }
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ADE80' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="flex flex-col justify-center px-12 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-8">
              <Target className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-white">Bullseye</span>
            </Link>
            
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Trade smarter with
              <span className="text-gradient block">advanced analytics</span>
            </h1>
            
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Join thousands of traders who trust Bullseye for real-time market insights, 
              secure transactions, and professional-grade trading tools.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2 rounded-lg bg-primary/20 flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-white">Bullseye</span>
            </Link>
            <p className="text-gray-400">
              Professional trading platform
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-8"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;