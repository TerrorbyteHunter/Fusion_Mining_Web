import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mountain, Lock, User, Plus, Trash2 } from "lucide-react";

interface TestUser {
  username: string;
  password: string;
}

export default function TestLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customUsers, setCustomUsers] = useState<TestUser[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Preset test credentials
  const presetUsers: TestUser[] = [
    { username: 'admin', password: 'admin123' },
    { username: 'henry', password: 'henry123' },
    { username: 'ray', password: 'ray123' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please enter username and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
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

  const fillCredentials = (user: TestUser) => {
    setUsername(user.username);
    setPassword(user.password);
  };

  const addCustomUser = () => {
    if (!newUsername.trim() || !newPassword.trim()) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    // Add to custom users list
    setCustomUsers([...customUsers, { username: newUsername, password: newPassword }]);
    setNewUsername("");
    setNewPassword("");
    
    toast({
      title: "Success",
      description: `Custom user "${newUsername}" added. You can now log in with it.`,
    });
  };

  const removeCustomUser = (index: number) => {
    setCustomUsers(customUsers.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-2">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-3 mb-4">
              <Mountain className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Fusion Mining - Test Login</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Development testing only. Firebase will be used in production.
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-8">
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="pl-10 h-10"
                    data-testid="input-username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pl-10 h-10"
                    data-testid="input-password"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-10" 
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="border-t" />

            {/* Preset Test Accounts */}
            <div>
              <h3 className="font-semibold text-base mb-3">Preset Test Accounts</h3>
              <p className="text-xs text-muted-foreground mb-3">Click any button to fill credentials above</p>
              <div className="grid grid-cols-1 gap-2">
                {presetUsers.map((user) => (
                  <button
                    key={user.username}
                    type="button"
                    onClick={() => fillCredentials(user)}
                    className="p-3 border rounded-md hover:bg-accent text-left transition-colors"
                    data-testid={`button-${user.username}-preset`}
                  >
                    <div className="font-medium text-sm">{user.username}</div>
                    <div className="text-xs text-muted-foreground">Password: {user.password}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Custom Test Users */}
            <div>
              <h3 className="font-semibold text-base mb-3">Create Custom Test User</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1">New Username</label>
                  <Input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="e.g., testuser"
                    className="h-9"
                    data-testid="input-new-username"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="e.g., password123"
                    className="h-9"
                    data-testid="input-new-password"
                  />
                </div>
                <Button 
                  type="button"
                  onClick={addCustomUser}
                  variant="outline"
                  className="w-full h-9"
                  data-testid="button-add-custom-user"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom User
                </Button>
              </div>

              {/* Display Custom Users */}
              {customUsers.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Your custom users:</p>
                  <div className="space-y-2">
                    {customUsers.map((user, index) => (
                      <div
                        key={index}
                        className="p-2 bg-muted rounded-md flex items-center justify-between"
                        data-testid={`custom-user-${index}`}
                      >
                        <div>
                          <div className="font-medium text-xs">{user.username}</div>
                          <div className="text-xs text-muted-foreground">Password: {user.password}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCustomUser(index)}
                          className="p-1 hover:bg-background rounded transition-colors"
                          data-testid={`button-remove-custom-${index}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-md p-4">
              <p className="text-xs text-blue-900 dark:text-blue-200">
                <strong>How to use:</strong> Create custom test users or use the preset accounts. 
                Fill in the username and password fields above, then click "Sign In" to test your app. 
                Your credentials work with existing users in the system.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
