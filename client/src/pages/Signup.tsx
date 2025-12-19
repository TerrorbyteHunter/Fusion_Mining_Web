import { SignUp } from '@clerk/clerk-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Store } from "lucide-react";

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Join Fusion Mining</h1>
          <p className="text-sm text-muted-foreground">Choose your account type to get started</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            onClick={() => setSelectedRole('buyer')}
            variant={selectedRole === 'buyer' ? 'default' : 'outline'}
            className="h-20 flex flex-col items-center justify-center gap-3 rounded-lg"
            data-testid="button-role-buyer"
          >
            <User className="w-5 h-5" />
            <div className="text-center">
              <div className="font-semibold text-sm">Buyer</div>
              <div className="text-xs opacity-80">Find & Invest</div>
            </div>
          </Button>

          <Button
            type="button"
            onClick={() => setSelectedRole('seller')}
            variant={selectedRole === 'seller' ? 'default' : 'outline'}
            className="h-20 flex flex-col items-center justify-center gap-3 rounded-lg"
            data-testid="button-role-seller"
          >
            <Store className="w-5 h-5" />
            <div className="text-center">
              <div className="font-semibold text-sm">Seller</div>
              <div className="text-xs opacity-80">List Assets</div>
            </div>
          </Button>
        </div>

        {/* Clerk Sign Up Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <SignUp
            routing="virtual"
            signInUrl="/login"
            fallbackRedirectUrl="/dashboard"
            unsafeMetadata={{ role: selectedRole }}
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium',
                card: 'shadow-none',
              },
            }}
          />
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-blue-600 hover:underline" data-testid="link-signin">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
