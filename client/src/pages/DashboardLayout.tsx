import { Switch, Route } from "wouter";
import { useState } from "react";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import CreateListing from "./CreateListing";
import CreateBuyerRequest from "./CreateBuyerRequest";
import DashboardListings from "./DashboardListings";
import EditBuyerRequest from "./EditBuyerRequest";
import ProfileManagement from "./ProfileManagement";
import EditListing from "./EditListing";
import SellerVerification from "./SellerVerification";
import BuyerTierUpgrade from "./BuyerTierUpgrade";
import { DashboardSidebar, DashboardMobileMenuTrigger } from "@/components/DashboardSidebar";
import { LayoutDashboard } from "lucide-react";

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile header with menu trigger */}
        <div className="md:hidden flex items-center gap-3 p-4 border-b bg-card/50">
          <DashboardMobileMenuTrigger onOpen={() => setMobileMenuOpen(true)} />
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">Dashboard</span>
        </div>
        <div className="flex-1">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/messages" component={Messages} />
            <Route path="/dashboard/create-listing" component={CreateListing} />
            <Route path="/dashboard/create-rfq" component={CreateBuyerRequest} />
            <Route path="/dashboard/listings" component={DashboardListings} />
            <Route path="/dashboard/requests" component={DashboardListings} />
            <Route path="/dashboard/edit-rfq/:id" component={EditBuyerRequest} />
            <Route path="/dashboard/edit-listing/:id" component={EditListing} />
            <Route path="/dashboard/profile" component={ProfileManagement} />
            <Route path="/dashboard/verification" component={SellerVerification} />
            <Route path="/dashboard/upgrade-tier" component={BuyerTierUpgrade} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
