import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  showPasswordToggle?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, hint, showPasswordToggle, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle && showPassword ? "text" : type;

    return (
      <div className="space-y-2">
        <Label 
          htmlFor={props.id} 
          className={cn(
            "text-sm font-medium",
            error && "text-destructive"
          )}
        >
          {label}
        </Label>
        
        <div className="relative">
          <Input
            {...props}
            ref={ref}
            type={inputType}
            className={cn(
              "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            aria-describedby={
              error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined
            }
            aria-invalid={!!error}
          />
          
          {/* Password toggle */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
          
          {/* Secure indicator for password fields */}
          {type === "password" && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <p 
            id={`${props.id}-error`}
            className="text-sm text-destructive"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
        
        {/* Hint message */}
        {hint && !error && (
          <p 
            id={`${props.id}-hint`}
            className="text-sm text-muted-foreground"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };