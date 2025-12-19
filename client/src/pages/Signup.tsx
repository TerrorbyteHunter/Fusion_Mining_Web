import { SignUp } from '@clerk/clerk-react';

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <SignUp
          routing="virtual"
          signInUrl="/login"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
              card: 'shadow-xl',
              headerTitle: 'text-2xl font-bold text-center',
              headerSubtitle: 'text-center text-gray-600',
            },
          }}
        />
      </div>
    </div>
  );
}
