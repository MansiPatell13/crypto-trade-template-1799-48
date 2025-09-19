import { useState, useEffect } from "react";
import { Target, Menu, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import StockSearch from "@/components/dashboard/StockSearch";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, signOut } = useAuth();

  // Removed scroll behavior as per requirements

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account."
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const publicNavItems = [
    { name: "Features", href: "/features" },
    { name: "Markets", href: "/markets" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const authenticatedNavItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Markets", href: "/markets" },
    { name: "Crypto", href: "/crypto" },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <header className="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 h-14 bg-card/95 backdrop-blur-xl border border-border rounded-full w-[95%] max-w-3xl">
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="font-bold text-base">Bullseye</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm transition-all duration-300 ${
                  location.pathname === item.href 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <StockSearch className="w-64" />
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden lg:inline">Profile</span>
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="flex items-center gap-2 text-red-500 hover:text-red-600">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm" className="button-gradient">
                    Start Trading
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1B1B1B]">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-lg transition-colors ${
                        location.pathname === item.href 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                      <div className="text-sm text-muted-foreground">
                        Signed in as {user?.name}
                      </div>
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="w-4 h-4 mr-2" />
                          Profile & Settings
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-500 border-red-500 hover:bg-red-500/10"
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mt-4">
                      <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="button-gradient w-full">
                          Start Trading
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;