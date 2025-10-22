// Development-only test login selector
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { TestTube, LogIn } from "lucide-react";

interface TestAccount {
  id: string;
  email: string;
  role: string;
  name: string;
}

export function TestLoginSelector() {
  const { user, isAuthenticated } = useAuth();

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
  );
}
