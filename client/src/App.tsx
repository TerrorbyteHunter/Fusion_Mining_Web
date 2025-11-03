// Main App component with routing
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// useAuth removed from this file (not used here)

// Import all pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Projects from "@/pages/Projects";
import Marketplace from "@/pages/Marketplace";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import AdminCMS from "@/pages/AdminCMS";
import ProfileManagement from "@/pages/ProfileManagement";
import ProfileView from "@/pages/ProfileView";
import CreateListing from "@/pages/CreateListing";
import Messages from "@/pages/Messages";
import LMEPrices from "@/pages/LMEPrices";
import ServicesCompliance from "@/pages/ServicesCompliance";
import LegalTerms from "@/pages/LegalTerms";
import LegalPrivacy from "@/pages/LegalPrivacy";
import LegalDisclaimer from "@/pages/LegalDisclaimer";
import CategoryBrowse from "@/pages/CategoryBrowse";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          {/* Public Routes */}
          <Route path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/services" component={ServicesCompliance} />
          <Route path="/projects" component={Projects} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/news" component={News} />
          <Route path="/contact" component={Contact} />

          {/* Protected Routes */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/profile" component={ProfileManagement} />
          <Route path="/profile/:id" component={ProfileView} />
          <Route path="/dashboard/create-listing" component={CreateListing} />
          <Route path="/dashboard/messages" component={Messages} />
          <Route path="/dashboard/:section" component={Dashboard} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/cms" component={AdminCMS} />

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
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
