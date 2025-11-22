// Main navigation header component
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  Mountain, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard,
  ShieldCheck,
  CheckCircle,
  Crown,
  Zap,
  Star
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { NotificationBell } from "@/components/ui/notification-bell";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.home'), path: "/", key: "home" },
    { label: t('nav.services'), path: "/services", key: "services" },
    { label: t('nav.marketplace'), path: "/marketplace", key: "marketplace" },
    { label: t('nav.projects'), path: "/projects", key: "projects" },
    { label: t('nav.sustainability'), path: "/sustainability", key: "sustainability" },
    { label: t('nav.news'), path: "/news", key: "news" },
    { label: t('nav.contact'), path: "/contact", key: "contact" },
  ];

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/logout", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      window.location.href = "/";
    },
  });

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.email?.[0].toUpperCase() || "U";
  };

  const getTierBadge = () => {
    const tier = user?.membershipTier || 'basic';
    const tierConfig: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
      premium: { 
        icon: <Crown className="h-3 w-3" />, 
        label: 'Premium', 
        className: 'bg-amber-600 hover:bg-amber-700' 
      },
      standard: { 
        icon: <Zap className="h-3 w-3" />, 
        label: 'Standard', 
        className: 'bg-blue-600 hover:bg-blue-700' 
      },
      basic: { 
        icon: <Star className="h-3 w-3" />, 
        label: 'Basic', 
        className: 'bg-gray-500 hover:bg-gray-600' 
      },
    };
    return tierConfig[tier];
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover-elevate active-elevate-2 rounded-lg">
            <div className="flex items-center gap-2" data-testid="link-home">
              <Mountain className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold font-display tracking-tight">
                  Fusion Mining
                </span>
                <span className="text-[10px] text-muted-foreground -mt-1">
                  Limited
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-${item.key}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/dashboard">
                <Button
                  variant={location.startsWith("/dashboard") ? "secondary" : "ghost"}
                  size="sm"
                  className="ml-1"
                  data-testid="link-dashboard"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </nav>

          {/* Auth & User Menu */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {isAuthenticated && isAdmin && <NotificationBell />}
            {isAuthenticated && user?.role === 'buyer' && getTierBadge() && (
              <Badge 
                className={`${getTierBadge()?.className} text-white flex items-center gap-1 px-2.5 py-1`}
                data-testid="badge-nav-tier"
              >
                {getTierBadge()?.icon}
                <span className="hidden sm:inline text-xs font-medium">{getTierBadge()?.label}</span>
              </Badge>
            )}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-2"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || "User"} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:flex items-center gap-1">
                      {user?.firstName || user?.email}
                      {user?.verificationStatus === 'approved' && (
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" data-testid="badge-verified" />
                      )}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        {t('nav.adminPanel')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2" data-testid="menu-dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="flex items-center gap-2 text-destructive cursor-pointer"
                    data-testid="button-logout"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                asChild 
                variant="default"
                data-testid="button-login"
              >
                <Link href="/login">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.login')}
                </Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.key}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/dashboard">
                <Button
                  variant={location.startsWith("/dashboard") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-dashboard"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
