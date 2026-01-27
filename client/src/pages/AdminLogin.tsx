import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User, LogOut } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { user, isLoaded, isSignedIn, signOut } = useClerkAuth();
  const [showSignOut, setShowSignOut] = useState(false);

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect if already authenticated as admin via Clerk
  if (isSignedIn && user?.publicMetadata?.role === 'admin') {
    setLocation("/admin");
    return null;
  }

  // Show sign out option if already signed in but not as admin
  if (isSignedIn && !showSignOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-500/10 rounded-full w-fit">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Already Signed In</CardTitle>
            <CardDescription>
              You are currently signed in as {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Current role: <span className="font-medium">{user?.publicMetadata?.role || 'none'}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                To access the admin portal, you need admin privileges in your Clerk account.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLocation("/")}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Back to Home
              </button>
              <button
                onClick={() => setShowSignOut(true)}
                className="flex-1 px-4 py-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show confirmation for sign out
  if (isSignedIn && showSignOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-red-500/10 rounded-full w-fit">
              <LogOut className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Sign Out</CardTitle>
            <CardDescription>
              Are you sure you want to sign out and use a different account?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowSignOut(false)}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  signOut().then(() => {
                    window.location.reload();
                  });
                }}
                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-yellow-500/10 rounded-full w-fit">
            <Lock className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>
            Sign in to access the administration dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignIn
            routing="virtual"
            forceRedirectUrl="/admin"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90',
                card: 'shadow-none border-0 bg-transparent',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                formFieldInput: 'border-input',
                formFieldLabel: 'text-foreground',
                footerActionLink: 'text-primary hover:text-primary/90',
              }
            }}
          />

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Admin Access Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• User must be configured as admin in Clerk dashboard</li>
              <li>• Public metadata must include: {JSON.stringify({ role: "admin" })}</li>
              <li>• Optional adminRole for specific permissions</li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={() => setLocation("/")}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Back to Main Site
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
