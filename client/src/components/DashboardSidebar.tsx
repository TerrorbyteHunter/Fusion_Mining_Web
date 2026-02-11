import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  Plus,
  ListOrdered,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  Menu,
  Crown,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

export function DashboardSidebar({
  mobileOpen: externalMobileOpen,
  onMobileOpenChange
}: DashboardSidebarProps = {}) {
  const [location] = useLocation();
  const { user, isSeller, isAdmin } = useAuth();
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const mobileOpen = externalMobileOpen !== undefined ? externalMobileOpen : internalMobileOpen;
  const setMobileOpen = onMobileOpenChange || setInternalMobileOpen;

  const { data: stats } = useQuery<{
    listingsCount: number;
    unreadMessagesCount: number;
    interestsCount: number;
  }>({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
    refetchInterval: 30000,
  });

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.email?.[0].toUpperCase() || "U";
  };

  const isSellerUnverified = isSeller && user?.verificationStatus !== 'approved';

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const menuItems = [
    ...(!isAdmin
      ? [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
          testId: "sidebar-dashboard"
        }
      ]
      : []),
    {
      label: "Messages",
      icon: MessageSquare,
      href: isAdmin ? "/admin/messages" : "/dashboard/messages",
      testId: "sidebar-messages",
      // Hide messages from dashboard sidebar for admins if we want them to use admin messages
      hidden: isAdmin
    },
    ...(!isAdmin
      ? [
        {
          label: "Saved Items",
          icon: Heart,
          href: "/dashboard/interests",
          testId: "sidebar-interests"
        }
      ]
      : []),
    ...(user?.permissions?.adminRole === 'super_admin'
      ? [
        {
          label: "Super Admin Panel",
          icon: Crown,
          href: "/admin/super",
          testId: "sidebar-super-admin-panel",
          highlight: true
        }
      ]
      : []),
    ...(isSeller && !isAdmin
      ? [
        {
          label: "My Listings",
          icon: Package,
          href: "/dashboard/listings",
          testId: "sidebar-listings"
        }
      ]
      : []),
    ...(!isSeller && !isAdmin
      ? [
        {
          label: "My Requests",
          icon: ListOrdered,
          href: "/dashboard/requests",
          testId: "sidebar-requests"
        }
      ]
      : []),
    ...(isSeller && !isAdmin
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
    ...(isSellerUnverified && !isAdmin
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
    ...(!isAdmin
      ? [
        {
          label: "Manage Account",
          icon: Settings,
          href: "/dashboard/profile",
          testId: "sidebar-manage-account"
        }
      ]
      : []),
    ...(isAdmin
      ? [
        {
          label: "Admin Panel",
          icon: ShieldCheck,
          href: "/admin",
          testId: "sidebar-admin-panel",
          highlight: true
        }
      ]
      : [])
  ].filter(item => !item.hidden);

  // Shared sidebar content component
  const SidebarContent = () => (
    <>
      {/* User Info */}
      <div className="p-4 md:p-6 border-b bg-accent/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 md:h-12 md:w-12">
            <AvatarImage src={user?.profileImageUrl || undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate text-sm" data-testid="text-username">
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
      <nav className="flex-1 p-3 md:p-4 overflow-y-auto">
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
                    "w-full justify-start gap-3 text-sm",
                    item.highlight && "border border-primary/20 hover:bg-primary/10"
                  )}
                  onClick={handleLinkClick}
                  data-testid={item.testId}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.label === "Messages" && stats && stats.unreadMessagesCount > 0 && (
                    <motion.div
                      key={stats.unreadMessagesCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { type: "spring", stiffness: 500, damping: 15 }
                      }}
                      className="ml-auto min-w-[20px] h-5 px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                    >
                      {stats.unreadMessagesCount > 99 ? '99+' : stats.unreadMessagesCount}
                    </motion.div>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-3 md:p-4 border-t bg-accent/10">
        <p className="text-xs text-muted-foreground text-center">
          Fusion Mining Limited
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          © 2024 All rights reserved
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sheet Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0 flex flex-col pt-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-card border-r min-h-screen sticky top-16 h-[calc(100vh-4rem)] flex-col">
        <SidebarContent />
      </aside>
    </>
  );
}

// Export a component for the mobile menu trigger to be used in Dashboard pages
export function DashboardMobileMenuTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onOpen}
      className="md:hidden"
      data-testid="button-dashboard-mobile-menu"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
