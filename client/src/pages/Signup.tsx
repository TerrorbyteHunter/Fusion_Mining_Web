import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mountain, Check, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["buyer", "seller"], {
    required_error: "Please select a role",
  }),
  membershipTier: z.enum(["basic", "standard", "premium"], {
    required_error: "Please select a membership tier",
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { data: benefits } = useQuery<any[]>({
    queryKey: ['/api/membership-benefits'],
  });

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: undefined,
      membershipTier: "basic",
    },
  });

  const selectedTier = form.watch("membershipTier");

  const handleSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Registration successful",
          description: `Welcome to Fusion Mining, ${data.firstName}!`,
        });
        setLocation('/login');
      } else {
        toast({
          title: "Registration failed",
          description: result.message || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const tierFeatures = {
    basic: [
      "1 active RFQ at a time",
      "Basic marketplace access",
      "Standard support",
      "Community access",
    ],
    standard: [
      "5 active RFQs at a time",
      "Full marketplace access",
      "Analytics dashboard",
      "Direct messaging",
      "Standard support",
      "Priority visibility",
    ],
    premium: [
      "Unlimited active RFQs",
      "Full marketplace access",
      "Advanced analytics",
      "Direct messaging",
      "Priority support 24/7",
      "Highest visibility ranking",
      "Dedicated account manager",
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-6xl">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Mountain className="h-10 w-10 text-primary" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-display tracking-tight">
                Fusion Mining
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Limited
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Join Zambia's premier mining marketplace platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} data-testid="input-firstname" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} data-testid="input-lastname" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} data-testid="input-password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-role">
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buyer">Buyer - I want to purchase minerals/services</SelectItem>
                            <SelectItem value="seller">Seller - I want to sell minerals/services</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="membershipTier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membership Tier</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-tier">
                              <SelectValue placeholder="Select membership tier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basic">Basic - Free</SelectItem>
                            <SelectItem value="standard">Standard - $50/month</SelectItem>
                            <SelectItem value="premium">Premium - $200/month</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                    data-testid="button-register"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setLocation('/login')}
                      data-testid="link-login"
                    >
                      Already have an account? Login
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Membership Comparison</h3>
              <Separator />
              
              <div className="space-y-4">
                {(['basic', 'standard', 'premium'] as const).map((tier) => (
                  <Card 
                    key={tier}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedTier === tier ? 'border-primary ring-2 ring-primary' : ''
                    }`}
                    onClick={() => form.setValue('membershipTier', tier)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold capitalize text-base">{tier}</h4>
                          {selectedTier === tier && (
                            <Badge variant="default" className="h-5">
                              <Check className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {tier === 'basic' && '$0'}
                          {tier === 'standard' && '$50'}
                          {tier === 'premium' && '$200'}
                          <span className="text-sm text-muted-foreground font-normal">/month</span>
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {tierFeatures[tier].map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  All plans include access to our marketplace and verified sellers. Upgrade anytime to unlock more features.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
