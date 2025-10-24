// User dashboard with overview and quick actions
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { 
  Package, 
  MessageSquare, 
  Heart, 
  Settings,
  Plus,
  TrendingUp,
  Users,
  FileText
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading, isAdmin, isSeller } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery<{
    listingsCount: number;
    unreadMessagesCount: number;
    interestsCount: number;
  }>({
    queryKey: ["/api/dashboard/stats"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-display mb-2" data-testid="text-page-title">
                Welcome back, {user?.firstName || user?.email}!
              </h1>
              <p className="text-muted-foreground">
                Manage your mining investments and partnerships
              </p>
            </div>
            {isSeller && (
              <Button asChild data-testid="button-create-listing">
                <Link href="/dashboard/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Listing
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  My Listings
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{stats?.listingsCount || 0}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  Active marketplace listings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{stats?.unreadMessagesCount || 0}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  Unread messages
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Interests
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{stats?.interestsCount || 0}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  Projects you're interested in
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Profile
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user?.role === 'admin' ? 'Admin' : user?.role === 'seller' ? 'Seller' : 'Buyer'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Account type
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-display mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/dashboard/profile">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full" data-testid="card-profile">
                <CardHeader>
                  <Settings className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle>Manage Profile</CardTitle>
                  <CardDescription>
                    Update your account details and preferences
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard/messages">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full" data-testid="card-messages">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 mb-4 text-chart-4" />
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>
                    View and manage your conversations
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/projects">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full" data-testid="card-projects">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 mb-4 text-chart-3" />
                  <CardTitle>Browse Projects</CardTitle>
                  <CardDescription>
                    Explore new mining opportunities
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {isSeller && (
              <Link href="/dashboard/listings">
                <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full" data-testid="card-listings">
                  <CardHeader>
                    <Package className="h-10 w-10 mb-4 text-chart-2" />
                    <CardTitle>My Listings</CardTitle>
                    <CardDescription>
                      Manage your marketplace offerings
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}

            {isAdmin && (
              <Link href="/admin">
                <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full" data-testid="card-admin">
                  <CardHeader>
                    <FileText className="h-10 w-10 mb-4 text-destructive" />
                    <CardTitle>Admin Panel</CardTitle>
                    <CardDescription>
                      Manage users and verify listings
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}

            <Link href="/marketplace">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full" data-testid="card-marketplace">
                <CardHeader>
                  <Users className="h-10 w-10 mb-4 text-chart-5" />
                  <CardTitle>Marketplace</CardTitle>
                  <CardDescription>
                    Buy minerals and find partnerships
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
