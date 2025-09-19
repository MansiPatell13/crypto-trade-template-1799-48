import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth/authService";
import { toast } from "@/hooks/use-toast";

const ResetPasswordToken = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate token validation
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        setIsValidating(false);
        return;
      }

      // Mock token validation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation logic (invalid if token is "invalid-token")
      const valid = token !== "invalid-token";
      setIsValidToken(valid);
      setIsValidating(false);
    };

    validateToken();
  }, [token]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !token) return;

    setIsLoading(true);
    
    try {
      const response = await authService.resetPassword(token, formData.password);
      
      if (response.ok) {
        setResetComplete(true);
        toast({
          title: "Password reset successful",
          description: "Your password has been updated successfully.",
        });
      } else {
        toast({
          title: "Reset failed",
          description: response.error || "Failed to reset password",
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
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 8) return { strength: 1, label: "Too short" };
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) return { strength: 2, label: "Weak" };
    if (password.length >= 12) return { strength: 4, label: "Strong" };
    return { strength: 3, label: "Good" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Loading state while validating token
  if (isValidating) {
    return (
      <AuthLayout>
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Validating reset link
            </h1>
            <p className="text-muted-foreground">
              Please wait while we verify your reset token...
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <AuthLayout>
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Invalid reset link
            </h1>
            <p className="text-muted-foreground">
              This password reset link is invalid or has expired.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/auth/reset-password">
              <Button className="w-full button-gradient">
                Request new reset link
              </Button>
            </Link>
            
            <Link to="/auth/login">
              <Button variant="outline" className="w-full">
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Success state
  if (resetComplete) {
    return (
      <AuthLayout>
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Password reset complete
            </h1>
            <p className="text-muted-foreground">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
          </div>

          <Button
            onClick={() => navigate("/auth/login")}
            className="w-full button-gradient"
          >
            Continue to sign in
          </Button>
        </div>
      </AuthLayout>
    );
  }

  // Reset form
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Set new password
          </h1>
          <p className="text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <FormInput
              id="password"
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
              showPasswordToggle
              required
              autoComplete="new-password"
              autoFocus
            />
            
            {/* Password strength indicator */}
            {formData.password && (
              <div className="space-y-1">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        level <= passwordStrength.strength
                          ? level <= 2
                            ? "bg-red-500"
                            : level === 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {passwordStrength.label}
                </p>
              </div>
            )}
          </div>

          <FormInput
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            className="w-full button-gradient"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating password...
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            to="/auth/login"
            className="text-sm text-primary hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordToken;