import { SignUp } from '@clerk/clerk-react';

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <SignUp
          routing="virtual"
          signInUrl="/login"
          fallbackRedirectUrl="/dashboard"
          unsafeMetadata={{ role: 'buyer' }}
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
              card: 'shadow-xl',
              headerTitle: 'text-2xl font-bold text-center',
              headerSubtitle: 'text-center text-gray-600',
            },
          }}
        />
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            You can change your account type to Seller after signup in your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
}
