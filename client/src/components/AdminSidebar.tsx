import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
}

const ADMIN_ROLE_LABELS: Record<string, { label: string; variant: "default" | "destructive" | "outline" | "secondary" }> = {
  super_admin: { label: "Super Admin", variant: "destructive" },
  // Shortened label to avoid overlap in the sidebar badge
  verification_admin: { label: "Verify & Support Admin", variant: "default" },
  content_admin: { label: "Content Admin", variant: "secondary" },
  analytics_admin: { label: "Analytics Admin", variant: "secondary" },
};

export function AdminSidebar({ activeTab, onTabChange, permissions, adminRole }: AdminSidebarProps) {
  const [location] = useLocation();
  const { user, permissions: authPermissions } = useAuth();

  // Prefer explicitly passed-in permissions (used on the main Admin dashboard),
  // but fall back to the permissions coming from useAuth() so that other admin
  // pages still render the full sidebar for the current admin user.
  const effectivePermissions: AdminPermissions | null =
    (permissions as AdminPermissions | null) ?? (authPermissions as AdminPermissions | null) ?? null;

  const effectiveAdminRole =
    adminRole ?? (authPermissions as any)?.adminPermissions?.adminRole ?? (permissions as any)?.adminRole;

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
    return effectivePermissions?.[item.permission as keyof AdminPermissions] === true; // Only show if explicitly permitted
  });

  const handleTabClick = (item: typeof menuItems[0]) => {
    if (item.tab && onTabChange) {
      onTabChange(item.tab);
    }
  };

  return (
    <aside className="w-64 bg-card border-r min-h-screen sticky top-0 h-screen flex flex-col">
      {/* User Info */}
      <div className="p-6 border-b bg-gradient-to-r from-destructive/10 to-primary/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={user?.profileImageUrl || undefined} />
            <AvatarFallback className="bg-destructive text-destructive-foreground">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate text-sm" data-testid="admin-username">
              {user?.firstName || user?.email || "Admin"}
            </p>
            <Badge
              variant={effectiveAdminRole ? ADMIN_ROLE_LABELS[effectiveAdminRole]?.variant : "destructive"}
              className="text-xs mt-1"
              data-testid="badge-admin-role"
            >
              {effectiveAdminRole ? ADMIN_ROLE_LABELS[effectiveAdminRole]?.label : "Administrator"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
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
                        "w-full justify-start gap-3"
                      )}
                      data-testid={item.testId}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              }
              
              // If we're on the Admin page with tab support
              return (
                <Button
                  key={item.tab}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary/10 text-primary font-semibold"
                  )}
                  onClick={() => handleTabClick(item)}
                  data-testid={item.testId}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            }
            
            // For href-based items - use Link for client-side navigation
            if (item.href) {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive && "bg-primary/10 text-primary font-semibold"
                    )}
                    data-testid={item.testId}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            }
            
            return null;
          })}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t bg-accent/10">
        <p className="text-xs text-muted-foreground text-center">
          Fusion Mining Limited
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          Admin Panel v1.0
        </p>
      </div>
    </aside>
  );
}

