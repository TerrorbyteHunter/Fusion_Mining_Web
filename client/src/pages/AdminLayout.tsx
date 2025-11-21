import { Switch, Route } from "wouter";
import Admin from "./Admin";
import AdminCMS from "./AdminCMS";
import AdminSettings from "./AdminSettings";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/admin/cms" component={AdminCMS} />
          <Route path="/admin/settings" component={AdminSettings} />
        </Switch>
      </div>
    </div>
  );
}
