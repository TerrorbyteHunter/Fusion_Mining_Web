// User dashboard with overview and quick actions
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Package,
  MessageSquare,
  Heart,
  Settings,
  TrendingUp,
  Users,
  FileText,
  Shield,
  Crown,
  Zap,
  Star
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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

  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [adminSubject, setAdminSubject] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  const contactAdminMutation = useMutation({
    mutationFn: async (payload: any) => {
      return await apiRequest("POST", "/api/contact", payload);
    },
    onSuccess: () => {
      setOpenAdminDialog(false);
      setAdminSubject("");
      setAdminMessage("");
      toast({ title: "Message sent", description: "We'll get back to you soon." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
    },
  });

  const getTierBadge = () => {
    const tier = user?.membershipTier || 'basic';
    const tierConfig: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
      premium: {
        icon: <Crown className="h-3 w-3" />,
        label: 'Premium Tier',
        className: 'bg-amber-600 hover:bg-amber-700'
      },
      standard: {
        icon: <Zap className="h-3 w-3" />,
        label: 'Standard Tier',
        className: 'bg-blue-600 hover:bg-blue-700'
      },
      basic: {
        icon: <Star className="h-3 w-3" />,
        label: 'Basic Tier',
        className: 'bg-gray-500 hover:bg-gray-600'
      },
    };
    const config = tierConfig[tier];
    return config;
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        // Navigate to the client-side login page (not the API route)
        window.location.href = "/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const tierBadge = getTierBadge();

  const sendContactToAdmin = () => {
    const payload = {
      name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || undefined,
      email: user?.email,
      subject: adminSubject || "Contact from dashboard",
      message: adminMessage,
    };
    contactAdminMutation.mutate(payload);
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <section className="py-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <div>
              <h1 className="text-2xl font-bold font-display mb-1" data-testid="text-page-title">
                Welcome back, {user?.firstName || user?.email}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Here's what's happening with your account today
              </p>
            </div>
            {user?.role === 'buyer' && tierBadge && (
              <div className="flex items-center gap-2">
                <Badge
                  className={`${tierBadge.className} text-white flex items-center gap-1.5 px-3 py-1.5`}
                  data-testid="badge-membership-tier"
                >
                  {tierBadge.icon}
                  <span className="font-medium">{tierBadge.label}</span>
                </Badge>
              </div>
            )}
          </div>
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
                  {isSeller ? "My Listings" : "My Requests"}
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
                  {isSeller ? "Active marketplace listings" : "Active buyer requests"}
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

            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full" onClick={() => setOpenAdminDialog(true)} data-testid="card-contact-admin">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Contact Admin</CardTitle>
                    <CardDescription className="text-xs">
                      Send a message to site administrators
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {isSeller && (
              <>
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

                <Link href="/dashboard/verification">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-chart-3/20" data-testid="card-verification">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-chart-3/10 rounded-lg">
                          <Shield className="h-5 w-5 text-chart-3" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">Get Verified</CardTitle>
                          <CardDescription className="text-xs">
                            Build trust with buyers and unlock premium features
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </>
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
      {/* Contact Admin Dialog */}
      <Dialog open={openAdminDialog} onOpenChange={(open) => setOpenAdminDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Subject" value={adminSubject} onChange={(e) => setAdminSubject(e.target.value)} />
            <Textarea placeholder="Message" value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} className="min-h-32" />
          </div>
          <DialogFooter className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => setOpenAdminDialog(false)}>Cancel</Button>
            <Button disabled={!adminMessage.trim() || contactAdminMutation.isLoading} onClick={sendContactToAdmin}>{contactAdminMutation.isLoading ? 'Sending...' : 'Send'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
