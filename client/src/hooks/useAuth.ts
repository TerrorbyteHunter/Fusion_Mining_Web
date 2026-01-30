import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export function useAuth() {
  const clerkAuth = useClerkAuth();
  const { user: clerkUser } = useUser();

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
  const user = userData || (clerkUser ? {
    id: clerkAuth.userId,
    role: (clerkUser.publicMetadata?.role || clerkUser.unsafeMetadata?.role) as string,
    email: clerkUser.primaryEmailAddress?.emailAddress,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    profileImageUrl: clerkUser.imageUrl,
    verificationStatus: clerkUser.publicMetadata?.verificationStatus || 'unverified',
    membershipTier: clerkUser.publicMetadata?.membershipTier || 'basic',
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
    onboardingCompleted: userData?.onboardingCompleted || user?.role === 'admin' || false,
    permissions: userData?.adminPermissions || null, // Return admin permissions from user data
  };
}
