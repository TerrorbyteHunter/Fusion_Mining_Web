import { useClerk } from '@clerk/clerk-react';

type SafeAuthReturn = {
  userId: string | null | undefined;
  user: any;
  signOut: () => Promise<void>;
  isLoaded: boolean;
};

export function useSafeAuth(): SafeAuthReturn {
  try {
    const clerk = useClerk();
    return {
      userId: clerk.user?.id,
      user: clerk.user,
      signOut: () => clerk.signOut(),
      isLoaded: clerk.loaded,
    };
  } catch {
    return {
      userId: null,
      user: null,
      signOut: async () => { window.location.href = '/'; },
      isLoaded: true,
    };
  }
}
