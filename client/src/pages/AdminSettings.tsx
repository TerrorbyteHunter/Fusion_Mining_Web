import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Sliders, Mail, FileText, Terminal } from "lucide-react";
import { AccountSettings } from "@/components/admin/settings/AccountSettings";
import { AdminControls } from "@/components/admin/settings/AdminControls";
import { PlatformConfiguration } from "@/components/admin/settings/PlatformConfiguration";
import { CommunicationSettings } from "@/components/admin/settings/CommunicationSettings";
import { LegalCompliance } from "@/components/admin/settings/LegalCompliance";
import { SystemSettings } from "@/components/admin/settings/SystemSettings";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminSettings() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <section className="py-6 border-b bg-gradient-to-r from-destructive/10 to-primary/10">
          <div className="container mx-auto px-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
              <p className="text-muted-foreground">
                Manage platform configuration, user settings, and administrative controls
              </p>
            </div>
          </div>
        </section>

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-6">
            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="account" className="flex items-center gap-2" data-testid="tab-account">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">User</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2" data-testid="tab-admin">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Staff</span>
                </TabsTrigger>
                <TabsTrigger value="platform" className="flex items-center gap-2" data-testid="tab-platform">
                  <Sliders className="h-4 w-4" />
                  <span className="hidden sm:inline">Marketplace</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2" data-testid="tab-system">
                  <Terminal className="h-4 w-4" />
                  <span className="hidden sm:inline">System</span>
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex items-center gap-2" data-testid="tab-compliance">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Legal & Comms</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <AccountSettings />
              </TabsContent>

              <TabsContent value="admin">
                <AdminControls />
              </TabsContent>

              <TabsContent value="platform">
                <PlatformConfiguration />
              </TabsContent>

              <TabsContent value="system">
                <SystemSettings />
              </TabsContent>

              <TabsContent value="compliance">
                <div className="space-y-6">
                  <CommunicationSettings />
                  <LegalCompliance />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
