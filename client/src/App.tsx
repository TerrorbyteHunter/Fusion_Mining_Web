// Main App component with routing
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LMEPriceTicker } from "@/components/ui/lme-price-ticker";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
// useAuth removed from this file (not used here)

// Import all pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import AdminLogin from "@/pages/AdminLogin";
import TestLogin from "@/pages/TestLogin";
import Signup from "@/pages/Signup";
import Projects from "@/pages/Projects";
import Marketplace from "@/pages/Marketplace";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import AdminCMS from "@/pages/AdminCMS";
import AdminSettings from "@/pages/AdminSettings";
import AdminVerificationReview from "@/pages/AdminVerificationReview";
import AdminBuyerUpgradeReview from "@/pages/AdminBuyerUpgradeReview";
import ProfileView from "@/pages/ProfileView";
import ServicesCompliance from "@/pages/ServicesCompliance";
// Dashboard pages are routed through DashboardLayout to keep sidebar visible
// The following imports are no longer needed:
// Dashboard, Messages, CreateListing, ProfileManagement, Marketplace
import Sustainability from "@/pages/Sustainability";
import About from "@/pages/About";
import CategoryBrowse from "@/pages/CategoryBrowse";
import NotFound from "@/pages/not-found";
import LegalTerms from "@/pages/LegalTerms";
import LegalPrivacy from "@/pages/LegalPrivacy";
import LegalDisclaimer from "@/pages/LegalDisclaimer";
import DashboardLayout from "@/pages/DashboardLayout";
import SellerVerification from "@/pages/SellerVerification";
import { SupportChatWidget } from "@/components/SupportChatWidget";
import CreateBuyerRequest from "@/pages/CreateBuyerRequest";

function Router() {
  const [location] = useLocation();
  
  const isAdminSection = location.startsWith('/admin');
  const showLMETicker = !isAdminSection && location !== '/login' && location !== '/signup';

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div className="flex flex-1">
        {showLMETicker && (
          <aside className="hidden lg:block w-64 border-r bg-card/30 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
            <LMEPriceTicker />
          </aside>
        )}
        <main className="flex-1">
          <Switch>
            {/* Public Routes */}
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/test-login" component={TestLogin} />
            <Route path="/signup" component={Signup} />
            <Route path="/services" component={ServicesCompliance} />
            <Route path="/projects" component={Projects} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/sustainability" component={Sustainability} />
            <Route path="/news" component={News} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />

            {/* Protected Routes */}
            <Route path="/profile/:id" component={ProfileView} />
            <Route path="/seller-verification" component={SellerVerification} />
            {/* Dashboard & user area routes */}
            {/* Dashboard area (keeps sidebar visible across subpages) */}
            <Route path="/dashboard" component={DashboardLayout} />
            <Route path="/dashboard/messages" component={DashboardLayout} />
            <Route path="/dashboard/create-listing" component={DashboardLayout} />
            <Route path="/dashboard/create-rfq" component={DashboardLayout} />
            <Route path="/dashboard/listings" component={DashboardLayout} />
            <Route path="/dashboard/requests" component={DashboardLayout} />
            <Route path="/dashboard/profile" component={DashboardLayout} />
            <Route path="/dashboard/verification" component={DashboardLayout} />
            <Route path="/dashboard/upgrade-tier" component={DashboardLayout} />

            <Route path="/admin" component={Admin} />
            <Route path="/admin/cms" component={AdminCMS} />
            <Route path="/admin/settings" component={AdminSettings} />
            <Route path="/admin/seller-verification" component={AdminVerificationReview} />
            <Route path="/admin/buyer-upgrades" component={AdminBuyerUpgradeReview} />

            {/* Category Browsing Routes */}
            <Route path="/categories/:mainCategory/:subcategory?" component={CategoryBrowse} />

            {/* Legal Routes */}
            <Route path="/legal/terms" component={LegalTerms} />
            <Route path="/legal/privacy" component={LegalPrivacy} />
            <Route path="/legal/disclaimer" component={LegalDisclaimer} />

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Footer />
      {/* Floating support assistant (shown on all pages) */}
      <SupportChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
