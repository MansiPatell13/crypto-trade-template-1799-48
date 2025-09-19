import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Github } from "lucide-react";

interface SocialButtonsProps {
  action: "login" | "signup";
}

const SocialButtons = ({ action }: SocialButtonsProps) => {
  const handleSocialAuth = (provider: string) => {
    // TODO: integrate Supabase: await supabase.auth.signInWithOAuth({ provider })
    toast({
      title: "Social login coming soon",
      description: `${provider} ${action} will be enabled when backend is connected.`,
    });
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-muted-foreground">
            Or {action} with
          </span>
        </div>
      </div>
      
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialAuth("GitHub")}
        className="w-full"
      >
        <Github className="mr-2 h-4 w-4" />
        {action === "login" ? "Sign in" : "Sign up"} with GitHub
      </Button>
    </div>
  );
};

export default SocialButtons;