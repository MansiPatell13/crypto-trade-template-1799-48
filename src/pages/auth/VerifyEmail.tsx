import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Loader2, RefreshCw } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth/authService";
import { toast } from "@/hooks/use-toast";

const VerifyEmail = () => {
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const email = location.state?.email || "";

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address not found. Please try signing up again.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    
    try {
      const response = await authService.resendVerification(email);
      
      if (response.ok) {
        toast({
          title: "Verification email sent",
          description: "We've sent another verification email to your address.",
        });
      } else {
        toast({
          title: "Failed to resend",
          description: response.error || "Please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Server error — try again later",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Check your email
          </h1>
          <p className="text-muted-foreground mb-4">
            We've sent a verification link to
          </p>
          {email && (
            <p className="text-white font-medium bg-primary/10 px-3 py-2 rounded-lg">
              {email}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-border/20 rounded-lg p-4 text-left">
            <h3 className="font-medium text-white mb-2">Next steps:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Check your email inbox</li>
              <li>Click the verification link in the email</li>
              <li>Return here to sign in to your account</li>
            </ol>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="mb-3">Didn't receive the email?</p>
            <ul className="space-y-1 text-xs">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure {email} is correct</li>
              <li>• Wait a few minutes for delivery</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            onClick={handleResendVerification}
            variant="outline"
            className="w-full"
            disabled={isResending || !email}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 w-4 h-4" />
                Resend verification email
              </>
            )}
          </Button>
          
          <Link to="/auth/login">
            <Button className="w-full button-gradient">
              Back to sign in
            </Button>
          </Link>
        </div>

        {/* Demo notice */}
        <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-yellow-500 font-medium mb-1">Demo Mode</p>
          <p className="text-xs text-muted-foreground">
            In demo mode, no actual email is sent. Click "Back to sign in" to continue.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;