import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider, ClerkLoaded, useClerk } from '@clerk/clerk-react';
import App from "./App";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Component to expose Clerk globally
function ClerkGlobalProvider({ children }: { children: React.ReactNode }) {
  const clerk = useClerk();
  
  // Expose Clerk instance globally for API requests
  React.useEffect(() => {
    // @ts-ignore
    window.Clerk = clerk;
  }, [clerk]);
  
  return <>{children}</>;
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignInUrl="/dashboard"
    afterSignUpUrl="/dashboard"
  >
    <ClerkLoaded>
      <ClerkGlobalProvider>
        <App />
      </ClerkGlobalProvider>
    </ClerkLoaded>
  </ClerkProvider>
);
