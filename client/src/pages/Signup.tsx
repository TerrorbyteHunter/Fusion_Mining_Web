import { SignUp } from '@clerk/clerk-react';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { User, Store } from "lucide-react";

export default function Signup() {
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Select your account type to get started</p>
          </div>

          <ToggleGroup 
            type="single" 
            value={role} 
            onValueChange={(value) => value && setRole(value as 'buyer' | 'seller')}
            className="grid grid-cols-2 gap-4"
          >
            <ToggleGroupItem 
              value="buyer" 
              className="flex flex-col items-center gap-2 h-24 data-[state=on]:border-blue-600 data-[state=on]:bg-blue-50 dark:data-[state=on]:bg-blue-900/20"
            >
              <User className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="font-semibold">Buyer</span>
                <span className="text-xs text-muted-foreground font-normal text-center">I want to invest/buy</span>
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="seller" 
              className="flex flex-col items-center gap-2 h-24 data-[state=on]:border-blue-600 data-[state=on]:bg-blue-50 dark:data-[state=on]:bg-blue-900/20"
            >
              <Store className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="font-semibold">Seller</span>
                <span className="text-xs text-muted-foreground font-normal text-center">I want to list assets</span>
              </div>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <SignUp
          routing="virtual"
          signInUrl="/login"
          redirectUrl="/dashboard"
          unsafeMetadata={{ role }}
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
              card: 'shadow-none border-none p-0',
              header: 'hidden',
              rootBox: 'w-full',
              cardBox: 'shadow-xl rounded-lg overflow-hidden'
            },
          }}
        />
      </div>
    </div>
  );
}
