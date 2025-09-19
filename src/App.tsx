import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import LiveTicker from "@/components/ui/LiveTicker";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/store/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import Markets from "@/pages/Markets";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import MarketSelection from "@/pages/auth/MarketSelection";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import ResetPassword from "@/pages/auth/ResetPassword";
import ResetPasswordToken from "@/pages/auth/ResetPasswordToken";
import Dashboard from "@/pages/Dashboard";
import Portfolio from "@/pages/Portfolio";
import Watchlist from "@/pages/Watchlist";
import ProfileSettings from "@/pages/ProfileSettings";
import StockDetails from "@/pages/StockDetails";
import Crypto from "@/pages/Crypto";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Router>
              <div className="min-h-screen bg-background text-foreground">
                <div className="fixed top-0 left-0 right-0 z-50">
                  <Navigation />
                </div>
                <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <LiveTicker />
                </div>
                <main className="pt-28">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/markets" element={<Markets />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    
                    {/* Auth Routes */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="/auth/market-selection" element={<MarketSelection />} />
                    <Route path="/auth/verify-email" element={<VerifyEmail />} />
                    <Route path="/auth/reset-password" element={<ResetPassword />} />
                    <Route path="/auth/reset-password/:token" element={<ResetPasswordToken />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
                    <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
                    <Route path="/stock/:symbol" element={<ProtectedRoute><StockDetails /></ProtectedRoute>} />
                    <Route path="/crypto" element={<ProtectedRoute><Crypto /></ProtectedRoute>} />
                  </Routes>
                </main>
                <Footer />
                <Toaster />
              </div>
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;