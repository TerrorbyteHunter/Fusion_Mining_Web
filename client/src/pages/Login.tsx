import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, UserCog, ShoppingBag, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleQuickLogin = async (role: 'admin' | 'buyer' | 'seller') => {
    setLoading(role);

    // Hardcoded credentials for each role
    const credentials = {
      admin: { username: 'admin', password: 'admin123' },
      buyer: { username: 'henry', password: 'henry123' },
      seller: { username: 'ray', password: 'ray123' },
    };

    const { username, password } = credentials[role];

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${data.user.firstName}!`,
        });
        // Redirect based on role
        const userRole = data?.user?.role || data?.role;
        if (userRole === 'admin') {
          setLocation('/admin');
        } else {
          setLocation('/dashboard');
        }
      } else {
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials",
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
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
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
          <CardTitle className="text-2xl">Quick Login</CardTitle>
          <CardDescription>
            Choose your account type to access the platform
          </CardDescription>
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
            <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium text-center">
              ⚠️ DEMO MODE - Not for production use with real data
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              onClick={() => handleQuickLogin('admin')}
              disabled={loading !== null}
              className="w-full h-16 flex items-center justify-start gap-4 px-6"
              variant="outline"
              data-testid="button-login-admin"
            >
              <UserCog className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">Login as Admin</span>
                <span className="text-xs text-muted-foreground">
                  Full platform access & management
                </span>
              </div>
              {loading === 'admin' && (
                <span className="ml-auto text-xs">Logging in...</span>
              )}
            </Button>

            <Button
              onClick={() => handleQuickLogin('buyer')}
              disabled={loading !== null}
              className="w-full h-16 flex items-center justify-start gap-4 px-6"
              variant="outline"
              data-testid="button-login-buyer"
            >
              <ShoppingBag className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">Login as Buyer</span>
                <span className="text-xs text-muted-foreground">
                  Browse projects & submit requests
                </span>
              </div>
              {loading === 'buyer' && (
                <span className="ml-auto text-xs">Logging in...</span>
              )}
            </Button>

            <Button
              onClick={() => handleQuickLogin('seller')}
              disabled={loading !== null}
              className="w-full h-16 flex items-center justify-start gap-4 px-6"
              variant="outline"
              data-testid="button-login-seller"
            >
              <Building2 className="h-6 w-6 text-primary" />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">Login as Seller</span>
                <span className="text-xs text-muted-foreground">
                  Manage listings & respond to buyers
                </span>
              </div>
              {loading === 'seller' && (
                <span className="ml-auto text-xs">Logging in...</span>
              )}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Demo accounts for testing - No security enabled
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
