import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Crown, Shield, FileText, Headphones, BarChart3, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminAccount {
  id: string;
  username: string;
  password: string;
  role: string;
  label: string;
  description: string;
  icon: typeof Crown;
  color: string;
}

const adminAccounts: AdminAccount[] = [
  {
    id: "super_admin",
    username: "superadmin",
    password: "super123",
    role: "super_admin",
    label: "Super Admin",
    description: "Full platform control with all permissions (founder-level access)",
    icon: Crown,
    color: "text-yellow-600",
  },
  {
    id: "verification_admin",
    username: "verifyadmin",
    password: "verify123",
    role: "verification_admin",
    label: "Verification Admin",
    description: "Handle compliance, KYC/AML, and listing approvals",
    icon: Shield,
    color: "text-blue-600",
  },
  {
    id: "content_admin",
    username: "contentadmin",
    password: "content123",
    role: "content_admin",
    label: "Content Admin",
    description: "Manage platform content, branding, and CMS",
    icon: FileText,
    color: "text-green-600",
  },
  {
    id: "support_admin",
    username: "supportadmin",
    password: "support123",
    role: "support_admin",
    label: "Support Admin",
    description: "Handle user communication and issue resolution",
    icon: Headphones,
    color: "text-purple-600",
  },
  {
    id: "analytics_admin",
    username: "analyticsadmin",
    password: "analytics123",
    role: "analytics_admin",
    label: "Analytics Admin",
    description: "Monitor platform performance and fraud detection",
    icon: BarChart3,
    color: "text-orange-600",
  },
];

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [manualLogin, setManualLogin] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("quick");

  const handleQuickLogin = async (account: AdminAccount) => {
    setLoading(account.id);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: account.username,
          password: account.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Admin Login Successful",
          description: `Welcome, ${account.label}!`,
        });
        setLocation("/admin");
      } else {
        toast({
          title: "Login Failed",
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

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("manual");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(manualLogin),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Admin Login Successful",
          description: `Welcome back!`,
        });
        setLocation("/admin");
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid admin credentials",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-destructive/10 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 flex flex-col items-center border-b pb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display tracking-tight">
                  Fusion Mining
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl">Administrator Access</CardTitle>
          <CardDescription>
            Secure access for platform administrators only
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="quick" data-testid="tab-quick-login">
                Quick Login (Demo)
              </TabsTrigger>
              <TabsTrigger value="manual" data-testid="tab-manual-login">
                Manual Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-3">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md mb-4">
                <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium text-center">
                  DEMO MODE - Each admin type has different permissions
                </p>
              </div>

              {adminAccounts.map((account) => {
                const Icon = account.icon;
                return (
                  <Button
                    key={account.id}
                    onClick={() => handleQuickLogin(account)}
                    disabled={loading !== null}
                    className="w-full h-auto py-4 flex items-center justify-start gap-4 px-6"
                    variant="outline"
                    data-testid={`button-login-${account.id}`}
                  >
                    <Icon className={`h-6 w-6 ${account.color}`} />
                    <div className="flex flex-col items-start text-left">
                      <span className="font-semibold text-base">
                        {account.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {account.description}
                      </span>
                    </div>
                    {loading === account.id && (
                      <span className="ml-auto text-xs">Logging in...</span>
                    )}
                  </Button>
                );
              })}
            </TabsContent>

            <TabsContent value="manual">
              <form onSubmit={handleManualLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter admin username"
                    value={manualLogin.username}
                    onChange={(e) =>
                      setManualLogin((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    data-testid="input-admin-username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={manualLogin.password}
                    onChange={(e) =>
                      setManualLogin((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    data-testid="input-admin-password"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading === "manual"}
                  data-testid="button-admin-login-submit"
                >
                  {loading === "manual" ? "Logging in..." : "Login to Admin Panel"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-4 border-t text-center">
            <Button
              variant="link"
              onClick={() => setLocation("/login")}
              className="text-sm text-muted-foreground"
              data-testid="link-user-login"
            >
              Not an admin? Go to User Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
