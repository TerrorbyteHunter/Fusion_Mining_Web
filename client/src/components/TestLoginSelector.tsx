// Development-only test login selector
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { TestTube, LogIn, Key } from "lucide-react";

interface TestAccount {
  id: string;
  email: string;
  role: string;
  name: string;
}

export function TestLoginSelector() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: testAccounts } = useQuery<TestAccount[]>({
    queryKey: ["/api/test-accounts"],
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await apiRequest("POST", "/api/test-login", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      window.location.reload();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/test-logout", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      window.location.reload();
    },
  });

  const credentialsLoginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return await apiRequest("POST", "/api/login", credentials);
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      setIsDialogOpen(false);
      queryClient.invalidateQueries();
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    credentialsLoginMutation.mutate({ username, password });
  };

  if (!testAccounts || testAccounts.length === 0) {
    return null;
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'seller':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'buyer':
        return 'bg-green-500/10 text-green-700 border-green-200';
      default:
        return '';
    }
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 border-dashed"
          >
            <TestTube className="h-4 w-4" />
            <span className="hidden sm:inline">Test Login</span>
            {isAuthenticated && user && (
              <Badge 
                variant="outline" 
                className={`ml-1 ${getRoleBadgeColor(user.role)}`}
              >
                {user.role}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Development Test Accounts
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {testAccounts.map((account) => (
            <DropdownMenuItem
              key={account.id}
              onClick={() => loginMutation.mutate(account.id)}
              disabled={loginMutation.isPending}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-medium">{account.name}</span>
                <span className="text-xs text-muted-foreground">{account.email}</span>
              </div>
              <Badge 
                variant="outline" 
                className={getRoleBadgeColor(account.role)}
              >
                {account.role}
              </Badge>
            </DropdownMenuItem>
          ))}
          {isAuthenticated && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="text-destructive cursor-pointer"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Logout Test Account
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">Login with Credentials</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Development Login</DialogTitle>
            <DialogDescription>
              Enter test credentials for development access.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Test accounts:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Admin: admin / admin123</li>
                <li>User: user / user123</li>
              </ul>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={credentialsLoginMutation.isPending}>
                {credentialsLoginMutation.isPending ? (
                  <span>Logging in...</span>
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
