import { Switch, Route } from "wouter";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import CreateListing from "./CreateListing";
import DashboardListings from "./DashboardListings";
import ProfileManagement from "./ProfileManagement";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1">
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/messages" component={Messages} />
          <Route path="/dashboard/create-listing" component={CreateListing} />
          <Route path="/dashboard/listings" component={DashboardListings} />
          <Route path="/dashboard/requests" component={DashboardListings} />
          <Route path="/dashboard/profile" component={ProfileManagement} />
        </Switch>
      </div>
    </div>
  );
}
