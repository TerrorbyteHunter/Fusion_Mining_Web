import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Settings,
  FileText,
  Activity,
  Shield,
  TrendingUp,
  Menu,
  UserX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AdminPermissions {
  canManageUsers?: boolean;
  canManageListings?: boolean;
  canManageProjects?: boolean;
  canManageBlog?: boolean;
  canManageCMS?: boolean;
  canViewAnalytics?: boolean;
  canManageMessages?: boolean;
  canManageVerification?: boolean;
  canManageSettings?: boolean;
  canManageAdmins?: boolean;
  canAccessAuditLogs?: boolean;
  canManageDocuments?: boolean;
}

interface AdminSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  /**
   * Optional explicit permissions/adminRole. If not provided, we fall back to
   * values derived from useAuth() so that standalone admin pages (settings,
   * CMS, verification review, etc.) still get the correct navigation.
   */
  permissions?: AdminPermissions | null;
  adminRole?: "super_admin" | "verification_admin" | "content_admin" | "support_admin" | "analytics_admin";
  /**
   * Control mobile sidebar state externally (for header integration)
   */
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

const ADMIN_ROLE_LABELS: Record<string, { label: string; variant: "default" | "destructive" | "outline" | "secondary" }> = {
  super_admin: { label: "Super Admin", variant: "destructive" },
  // Shortened label to avoid overlap in the sidebar badge
  verification_admin: { label: "Verify & Support Admin", variant: "default" },
  content_admin: { label: "Content Admin", variant: "secondary" },
  analytics_admin: { label: "Analytics Admin", variant: "secondary" },
};

export function AdminSidebar({
  activeTab,
  onTabChange,
  permissions,
  adminRole,
  mobileOpen: externalMobileOpen,
  onMobileOpenChange
}: AdminSidebarProps) {
  const [location] = useLocation();
  const { user, permissions: authPermissions } = useAuth();
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const mobileOpen = externalMobileOpen !== undefined ? externalMobileOpen : internalMobileOpen;
  const setMobileOpen = onMobileOpenChange || setInternalMobileOpen;

  // Prefer explicitly passed-in permissions (used on the main Admin dashboard),
  // but fall back to the permissions coming from useAuth() so that other admin
  // pages still render the full sidebar for the current admin user.
  const effectivePermissions: AdminPermissions | null =
    (permissions as AdminPermissions | null) ?? (authPermissions as AdminPermissions | null) ?? null;

  const effectiveAdminRole =
    adminRole ?? (authPermissions as any)?.adminRole ?? (permissions as any)?.adminRole;

  const getUserInitials = () => {
    if (!user) return "A";
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.email?.[0].toUpperCase() || "A";
  };

  const allMenuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      tab: "overview",
      testId: "admin-sidebar-dashboard",
      permission: null // Always visible
    },
    {
      label: "Users",
      icon: Users,
      tab: "users",
      testId: "admin-sidebar-users",
      permission: 'canManageUsers'
    },
    {
      label: "Listings",
      icon: Package,
      tab: "listings",
      testId: "admin-sidebar-listings",
      permission: 'canManageListings'
    },
    {
      label: "Messages",
      icon: MessageSquare,
      tab: "messages",
      testId: "admin-sidebar-messages",
      permission: 'canManageMessages'
    },
    {
      label: "Verification Queue",
      icon: ShieldCheck,
      tab: "verification",
      testId: "admin-sidebar-verification",
      permission: 'canManageVerification'
    },
    {
      label: "Seller Verification",
      icon: Shield,
      href: "/admin/seller-verification",
      testId: "admin-sidebar-seller-verification",
      permission: 'canManageVerification'
    },
    {
      label: "Buyer Tier Upgrades",
      icon: TrendingUp,
      href: "/admin/buyer-upgrades",
      testId: "admin-sidebar-buyer-upgrades",
      permission: 'canManageUsers'
    },
    {
      label: "Account Deletions",
      icon: UserX,
      tab: "account-deletions",
      testId: "admin-sidebar-account-deletions",
      permission: 'canManageUsers'
    },
    {
      label: "Analytics",
      icon: BarChart3,
      tab: "analytics",
      testId: "admin-sidebar-analytics",
      permission: 'canViewAnalytics'
    },
    {
      label: "Content CMS",
      icon: FileText,
      href: "/admin/cms",
      testId: "admin-sidebar-cms",
      permission: 'canManageCMS'
    },
    {
      label: "Activity Logs",
      icon: Activity,
      tab: "activity",
      testId: "admin-sidebar-activity",
      permission: 'canAccessAuditLogs'
    },
    {
      label: "Admin Activities",
      icon: ShieldCheck,
      tab: "admin-activities",
      testId: "admin-sidebar-admin-activities",
      permission: 'canAccessAuditLogs'
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      testId: "admin-sidebar-settings",
      permission: 'canManageSettings'
    },
  ];

  // Filter menu items based on permissions
  const menuItems = allMenuItems.filter((item) => {
    if (!item.permission) return true; // Always show items with no permission requirement

    // If no permissions object exists (null/undefined), grant all permissions (assume super_admin)
    // This is a safety net in case permission loading fails
    if (!effectivePermissions) {
      console.warn('[AdminSidebar] No effective permissions found, granting all access (super_admin fallback)');
      return true;
    }

    return effectivePermissions[item.permission as keyof AdminPermissions] === true; // Only show if explicitly permitted
  });

  const handleTabClick = (item: typeof menuItems[0]) => {
    if (item.tab && onTabChange) {
      onTabChange(item.tab);
    }
    setMobileOpen(false);
  };

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  // Shared sidebar content component
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300">
      {/* User Info */}
      <div className="p-6 border-b border-slate-800 bg-gradient-to-br from-indigo-950/50 to-slate-900/50">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Avatar className="h-12 w-12 border border-slate-700 relative bg-slate-900">
              <AvatarImage src={user?.profileImageUrl || undefined} />
              <AvatarFallback className="bg-indigo-600 text-white font-bold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold truncate text-slate-100 text-sm tracking-tight" data-testid="admin-username">
              {user?.firstName || user?.email || "Admin"}
            </p>
            <div className="mt-1">
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-2 py-0 h-4 border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-medium",
                  effectiveAdminRole === "super_admin" && "border-rose-500/30 bg-rose-500/10 text-rose-400"
                )}
                data-testid="badge-admin-role"
              >
                {effectiveAdminRole ? ADMIN_ROLE_LABELS[effectiveAdminRole]?.label : "Administrator"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Main Menu</p>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const itemColorClass =
              item.tab === 'overview' ? 'text-blue-400' :
                item.tab === 'users' ? 'text-green-400' :
                  item.tab === 'listings' ? 'text-amber-400' :
                    item.tab === 'rfqs' ? 'text-purple-400' :
                      item.tab === 'messages' ? 'text-pink-400' :
                        item.tab === 'verification' ? 'text-cyan-400' :
                          'text-indigo-400';

            // For tab-based items
            if (item.tab) {
              const isActive = activeTab === item.tab;

              // If we're on a href-based page (no onTabChange), navigate to the
              // Admin dashboard with the appropriate ?tab= query so the tab
              // selection is preserved and deep-linkable.
              if (!onTabChange) {
                const href = `/admin?tab=${item.tab}`;
                return (
                  <Link key={item.tab} href={href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 text-xs font-semibold h-10 transition-all duration-200 hover:bg-slate-800/50 hover:text-white group",
                        isActive ? "bg-indigo-600/10 text-indigo-400 border-r-2 border-indigo-600" : "hover:translate-x-1"
                      )}
                      onClick={handleLinkClick}
                      data-testid={item.testId}
                    >
                      <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-indigo-400" : itemColorClass)} />
                      <span className="truncate">{item.label}</span>
                    </Button>
                  </Link>
                );
              }

              // If we're on the Admin page with tab support
              return (
                <Button
                  key={item.tab}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-xs font-semibold h-10 transition-all duration-200 hover:bg-slate-800/50 hover:text-white group",
                    isActive ? "bg-indigo-600/10 text-indigo-400 border-r-2 border-indigo-600 shadow-sm" : "hover:translate-x-1"
                  )}
                  onClick={() => handleTabClick(item)}
                  data-testid={item.testId}
                >
                  <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-indigo-400" : itemColorClass)} />
                  <span className="truncate">{item.label}</span>
                </Button>
              );
            }

            // For href-based items - use Link for client-side navigation
            if (item.href) {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 text-xs font-semibold h-10 transition-all duration-200 hover:bg-slate-800/50 hover:text-white group",
                      isActive ? "bg-indigo-600/10 text-indigo-400 border-r-2 border-indigo-600 shadow-sm" : "hover:translate-x-1"
                    )}
                    onClick={handleLinkClick}
                    data-testid={item.testId}
                  >
                    <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-indigo-400" : itemColorClass)} />
                    <span className="truncate">{item.label}</span>
                  </Button>
                </Link>
              );
            }

            return null;
          })}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-slate-800 bg-slate-900/30">
        <div className="flex flex-col items-center gap-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Powered by</div>
          <div className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Fusion Mining
          </div>
          <p className="text-[10px] text-slate-600 mt-2 font-medium">
            Admin Panel v1.2
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sheet Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0 flex flex-col pt-0 border-r-slate-800">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-slate-800 min-h-screen sticky top-0 h-screen flex-col shadow-xl z-20">
        <SidebarContent />
      </aside>
    </>
  );
}

// Export a component for the mobile menu trigger to be used in Admin page header
export function AdminMobileMenuTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onOpen}
      className="md:hidden border-slate-200 hover:bg-slate-50"
      data-testid="button-admin-mobile-menu"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}

