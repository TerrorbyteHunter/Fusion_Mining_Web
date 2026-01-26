import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Mountain, Lock, User, Plus, Trash2, Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [customUsers, setCustomUsers] = useState<TestUser[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "buyer" | "seller">("buyer");

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
        // Invalidate auth query to refresh user state
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
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

  const addCustomUser = async () => {
    if (!newUsername.trim() || !newPassword.trim()) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    try {
      // Register the custom credential with the backend
      const response = await fetch("/api/register-test-credential", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          firstName: "Test",
          lastName: "User",
          role: newRole
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.message || "Failed to register custom user",
          variant: "destructive",
        });
        return;
      }

      setCustomUsers([...customUsers, { username: newUsername, password: newPassword }]);
      setNewUsername("");
      setNewPassword("");

      toast({
        title: "Success",
        description: `Custom user "${newUsername}" added and ready to login`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register custom user",
        variant: "destructive",
      });
    }
  };

  const removeCustomUser = (index: number) => {
    setCustomUsers(customUsers.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <Card className="shadow-2xl border-0">
          <CardContent className="pt-12 pb-10">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mountain className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Fusion Mining</h1>
              </div>
              <p className="text-xs text-muted-foreground text-center">Test Login - Development Only</p>
            </div>

            {/* Login Form - VERY VISIBLE INPUTS */}
            <form onSubmit={handleLogin} className="space-y-4 mb-8">
              {/* Username Input - PROMINENT */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600 pointer-events-none" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="pl-12 h-14 text-base border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 placeholder:text-blue-400"
                  data-testid="input-username"
                />
              </div>

              {/* Password Input - PROMINENT */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600 pointer-events-none" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-12 pr-12 h-14 text-base border-2 border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 placeholder:text-blue-400"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Login Button - LARGE & PROMINENT */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-base font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                data-testid="button-login"
              >
                {isLoading ? "LOGGING IN..." : "LOGIN"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400">Quick Access</span>
              </div>
            </div>

            {/* Preset Accounts */}
            <div className="space-y-2 mb-8">
              {presetUsers.map((user) => (
                <button
                  key={user.username}
                  type="button"
                  onClick={() => fillCredentials(user)}
                  className="w-full p-3 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  data-testid={`button-${user.username}-preset`}
                >
                  <div className="font-semibold text-sm capitalize">{user.username}</div>
                  <div className="text-xs text-muted-foreground">Click to auto-fill</div>
                </button>
              ))}
            </div>

            {/* Custom Users Section */}
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-3">Create Test User</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Username</label>
                    <Input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Enter username"
                      className="h-10 text-sm border-2 border-gray-300 dark:border-gray-600"
                      data-testid="input-new-username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter password"
                      className="h-10 text-sm border-2 border-gray-300 dark:border-gray-600"
                      data-testid="input-new-password"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full h-10 px-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800"
                      data-testid="select-new-role"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <Button
                    type="button"
                    onClick={addCustomUser}
                    variant="outline"
                    className="w-full h-9 text-sm"
                    data-testid="button-add-custom-user"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Custom User
                  </Button>
                </div>
              </div>

              {/* Display Custom Users */}
              {customUsers.length > 0 && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Your custom users:</p>
                  {customUsers.map((user, index) => (
                    <div
                      key={index}
                      className="p-2 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                      data-testid={`custom-user-${index}`}
                    >
                      <div>
                        <div className="font-medium text-xs">{user.username}</div>
                        <div className="text-xs text-muted-foreground">{user.password}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCustomUser(index)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-950/30 rounded transition-colors"
                        data-testid={`button-remove-custom-${index}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-4">
          Development testing only • Firebase in production
        </p>
      </div>
    </div>
  );
}
