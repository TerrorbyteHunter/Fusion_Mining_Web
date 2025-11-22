import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  Plus,
  ListOrdered,
  TrendingUp,
  ShieldCheck,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const [location] = useLocation();
  const { user, isSeller, isAdmin } = useAuth();

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.email?.[0].toUpperCase() || "U";
  };

  const isSellerUnverified = isSeller && user?.verificationStatus !== 'approved';

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      testId: "sidebar-dashboard"
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      testId: "sidebar-messages"
    },
    ...(isSeller
      ? [
          {
            label: "My Listings",
            icon: Package,
            href: "/dashboard/listings",
            testId: "sidebar-listings"
          }
        ]
      : [
          {
            label: "My Requests",
            icon: ListOrdered,
            href: "/dashboard/requests",
            testId: "sidebar-requests"
          }
        ]),
    ...(isSeller
      ? [
          {
            label: "Create Listing",
            icon: Plus,
            href: "/dashboard/create-listing",
            testId: "sidebar-create-listing",
            highlight: true
          }
        ]
      : []),
    ...(!isSeller && !isAdmin
      ? [
          {
            label: "Upgrade Tier",
            icon: TrendingUp,
            href: "/dashboard/upgrade-tier",
            testId: "sidebar-upgrade-tier",
            highlight: true
          }
        ]
      : []),
    ...(isSellerUnverified
      ? [
          {
            label: "Get Verified",
            icon: ShieldCheck,
            href: "/dashboard/verification",
            testId: "sidebar-get-verified",
            highlight: true
          }
        ]
      : []),
    {
      label: "Manage Account",
      icon: Settings,
      href: "/dashboard/profile",
      testId: "sidebar-manage-account"
    }
  ];

  return (
    <aside className="w-64 bg-card border-r min-h-screen sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
      {/* User Info */}
      <div className="p-6 border-b bg-accent/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.profileImageUrl || undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate" data-testid="text-username">
              {user?.firstName || user?.email}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {isAdmin ? "Admin" : isSeller ? "Seller" : "Buyer"}
              </Badge>
              {user?.verificationStatus === 'approved' && (
                <Badge className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-200 flex items-center gap-1" data-testid="badge-verified-sidebar">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
            {menuItems.map((item) => {
            const Icon = item.icon;
            // mark as active when the current location equals the href or is a subpath
            const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    item.highlight && "border border-primary/20 hover:bg-primary/10"
                  )}
                  data-testid={item.testId}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t bg-accent/10">
        <p className="text-xs text-muted-foreground text-center">
          Fusion Mining Limited
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          © 2024 All rights reserved
        </p>
      </div>
    </aside>
  );
}
