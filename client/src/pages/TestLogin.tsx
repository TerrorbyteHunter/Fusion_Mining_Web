import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mountain, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Test credentials available
const TEST_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123', email: 'admin@fusionmining.com' },
  buyer: { username: 'henry', password: 'henry123', email: 'henry@fusionmining.com' },
  seller: { username: 'ray', password: 'ray123', email: 'ray@fusionmining.com' },
};

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function TestLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.user.firstName}!`,
        });
        // Redirect based on role
        if (result.user.role === "admin") {
          setLocation("/admin");
        } else {
          setLocation("/dashboard");
        }
      } else {
        toast({
          title: "Login failed",
          description: result.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestCredentials = (role: keyof typeof TEST_CREDENTIALS) => {
    const creds = TEST_CREDENTIALS[role];
    form.setValue("username", creds.username);
    form.setValue("password", creds.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Mountain className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold font-display tracking-tight">
              Fusion Mining
            </span>
          </div>
          <CardTitle>Test Login</CardTitle>
          <CardDescription>
            Development credentials for testing. Firebase will be used in production.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="Enter username"
                          className="pl-10"
                          data-testid="input-username"
                        />
                      </div>
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
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter password"
                          className="pl-10"
                          data-testid="input-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login">
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Quick Test Accounts</span>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-3">Click to auto-fill credentials</p>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fillTestCredentials("admin")}
              data-testid="button-admin-creds"
            >
              <div className="text-left w-full">
                <div className="font-semibold text-sm">Admin Account</div>
                <div className="text-xs text-muted-foreground">admin / admin123</div>
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fillTestCredentials("buyer")}
              data-testid="button-buyer-creds"
            >
              <div className="text-left w-full">
                <div className="font-semibold text-sm">Buyer Account</div>
                <div className="text-xs text-muted-foreground">henry / henry123</div>
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fillTestCredentials("seller")}
              data-testid="button-seller-creds"
            >
              <div className="text-left w-full">
                <div className="font-semibold text-sm">Seller Account</div>
                <div className="text-xs text-muted-foreground">ray / ray123</div>
              </div>
            </Button>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-md">
            <p className="text-xs text-blue-900 dark:text-blue-200">
              <strong>Testing only:</strong> These simple credentials are for development testing. 
              Firebase authentication will be implemented for production deployment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
