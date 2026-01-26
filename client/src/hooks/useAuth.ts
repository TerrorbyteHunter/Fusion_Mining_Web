// Clerk Auth integration hook
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export function useAuth() {
  const clerkAuth = useClerkAuth();

  // Fetch user data (works in both development and production)
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/auth/user');
        return await res.json();
      } catch {
        return null;
      }
    },
    staleTime: 0,
  });

  // Use user data from API, or fall back to Clerk
  const user = userData || (clerkAuth.user ? {
    id: clerkAuth.userId,
    role: clerkAuth.user.publicMetadata?.role as string,
    email: clerkAuth.user.primaryEmailAddress?.emailAddress,
    firstName: clerkAuth.user.firstName,
    lastName: clerkAuth.user.lastName,
  } : null);

  const isLoading = userLoading || clerkAuth.isLoaded === false;
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller';
  const isBuyer = user?.role === 'buyer';

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isSeller,
    isBuyer,
    permissions: userData?.adminPermissions || null, // Return admin permissions from user data
  };
}
