import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactService } from '@/services/contact/contactService';
import { toast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing & Pricing" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await contactService.send(formData);
      
      if (response.ok) {
        toast({
          title: "Message sent successfully",
          description: "We will reply within 48 hours",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        toast({
          title: "Failed to send message",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="name"
        label="Full Name"
        type="text"
        placeholder="Your full name"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        error={errors.name}
        required
        autoComplete="name"
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        error={errors.email}
        required
        autoComplete="email"
      />

      <div className="space-y-2">
        <Label htmlFor="subject" className={errors.subject ? "text-destructive" : ""}>
          Subject
        </Label>
        <Select 
          onValueChange={(value) => handleInputChange("subject", value)}
          value={formData.subject}
        >
          <SelectTrigger 
            className={errors.subject ? "border-destructive" : ""}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          >
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subject && (
          <p id="subject-error" className="text-sm text-destructive" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label 
          htmlFor="message" 
          className={errors.message ? "text-destructive" : ""}
        >
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help you..."
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className={`min-h-[120px] ${errors.message ? "border-destructive" : ""}`}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="button-gradient w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="ml-2 w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;