import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth/authService";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const response = await authService.sendResetEmail(email);
      
      if (response.ok) {
        setEmailSent(true);
        toast({
          title: "Password reset email sent",
          description: "Check your email for reset instructions.",
        });
      } else {
        setError(response.error || "Failed to send reset email");
        toast({
          title: "Failed to send email",
          description: response.error || "Please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError("Server error — try again later");
      toast({
        title: "Error",
        description: "Server error — try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError("");
    }
  };

  if (emailSent) {
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
            <p className="text-muted-foreground">
              We've sent password reset instructions to
            </p>
            <p className="text-white font-medium mt-1">{email}</p>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <Button
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full"
            >
              Try different email
            </Button>
            
            <Link to="/auth/login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Reset your password
          </h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => handleInputChange(e.target.value)}
            error={error}
            required
            autoComplete="email"
            autoFocus
          />

          <Button
            type="submit"
            className="w-full button-gradient"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="mr-1 w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;