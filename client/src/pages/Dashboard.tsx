// User dashboard with overview and quick actions
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { 
  Package, 
  MessageSquare, 
  Heart, 
  Settings,
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
    <div className="flex-1">
        {/* Header */}
        <section className="py-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container mx-auto px-6">
            <h1 className="text-2xl font-bold font-display mb-1" data-testid="text-page-title">
              Welcome back, {user?.firstName || user?.email}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening with your account today
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-6">
          <div className="container mx-auto px-6">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <section className="py-6 border-t">
          <div className="container mx-auto px-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/projects">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full" data-testid="card-projects">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-chart-3/10 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-chart-3" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">Browse Projects</CardTitle>
                        <CardDescription className="text-xs">
                          Explore new mining opportunities
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/marketplace">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full" data-testid="card-marketplace">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-chart-5/10 rounded-lg">
                        <Users className="h-5 w-5 text-chart-5" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">Marketplace</CardTitle>
                        <CardDescription className="text-xs">
                          Buy minerals and find partnerships
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              {isSeller && (
                <Link href="/dashboard/create-listing">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-primary/20" data-testid="card-create-listing">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">Create Listing</CardTitle>
                          <CardDescription className="text-xs">
                            Add a new marketplace offering
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )}

              {isAdmin && (
                <Link href="/admin">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full" data-testid="card-admin">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-destructive/10 rounded-lg">
                          <FileText className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">Admin Panel</CardTitle>
                          <CardDescription className="text-xs">
                            Manage users and verify listings
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
  );
}
