// Replit Auth integration hook
import { useQuery } from "@tanstack/react-query";
import type { User, AdminPermissions } from "@shared/schema";

type AuthUser = User & { adminPermissions?: AdminPermissions | null };

export function useAuth() {
  const { data: user, isLoading } = useQuery<AuthUser>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isSeller: user?.role === 'seller',
    isBuyer: user?.role === 'buyer',
    permissions: user?.adminPermissions || null,
  };
}
