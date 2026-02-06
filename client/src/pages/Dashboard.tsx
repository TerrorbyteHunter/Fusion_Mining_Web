// User dashboard with overview and quick actions
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Star,
  ArrowRight,
  Activity
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

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
    const tierConfig: Record<string, { icon: React.ReactNode; label: string; className: string; gradient: string }> = {
      premium: {
        icon: <Crown className="h-3.5 w-3.5" />,
        label: 'Premium Tier',
        className: 'border-amber-500/50 text-amber-700 dark:text-amber-300',
        gradient: 'from-amber-200 to-yellow-400 dark:from-amber-900/40 dark:to-yellow-700/40'
      },
      standard: {
        icon: <Zap className="h-3.5 w-3.5" />,
        label: 'Standard Tier',
        className: 'border-blue-500/50 text-blue-700 dark:text-blue-300',
        gradient: 'from-blue-200 to-cyan-400 dark:from-blue-900/40 dark:to-cyan-700/40'
      },
      basic: {
        icon: <Star className="h-3.5 w-3.5" />,
        label: 'Basic Tier',
        className: 'border-slate-500/50 text-slate-700 dark:text-slate-300',
        gradient: 'from-slate-200 to-gray-300 dark:from-slate-800/40 dark:to-gray-700/40'
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <section className="py-8 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground mb-2">
                Welcome back, <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">{user?.firstName || user?.email}</span>!
              </h1>
              <p className="text-muted-foreground max-w-lg text-lg">
                Here's what's happening with your account today
              </p>
            </div>
            {user?.role === 'buyer' && tierBadge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-gradient-to-r ${tierBadge.gradient} backdrop-blur-sm shadow-sm`}>
                  <div className={`p-1.5 rounded-full bg-background/50 ${tierBadge.className}`}>
                    {tierBadge.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Current Plan</span>
                    <span className="text-sm font-bold">{tierBadge.label}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Overview Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">Overview</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={item}>
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/60 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {isSeller ? "My Listings" : "My Requests"}
                    </CardTitle>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {statsLoading ? (
                      <Skeleton className="h-8 w-16 my-1" />
                    ) : (
                      <div className="text-3xl font-bold">{stats?.listingsCount || 0}</div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {isSeller ? "Active & Pending listings" : "Active & Pending requests"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-chart-2/60 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Messages
                    </CardTitle>
                    <div className="p-2 bg-chart-2/10 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-chart-2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {statsLoading ? (
                      <Skeleton className="h-8 w-16 my-1" />
                    ) : (
                      <div className="text-3xl font-bold">{stats?.unreadMessagesCount || 0}</div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Unread messages in your inbox
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-chart-3/60 hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Interests
                    </CardTitle>
                    <div className="p-2 bg-chart-3/10 rounded-lg">
                      <Heart className="h-4 w-4 text-chart-3" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {statsLoading ? (
                      <Skeleton className="h-8 w-16 my-1" />
                    ) : (
                      <div className="text-3xl font-bold">{stats?.interestsCount || 0}</div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Projects you're watching
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-chart-4/60 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Profile Status
                    </CardTitle>
                    <div className="p-2 bg-chart-4/10 rounded-lg">
                      <Settings className="h-4 w-4 text-chart-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold capitalize flex items-center gap-2">
                      {user?.role === 'admin' ? 'Administrator' : user?.role === 'seller' ? 'Seller Account' : 'Buyer Account'}
                    </div>
                    <Link href="/dashboard/profile">
                      <Button variant="link" className="h-auto p-0 text-xs mt-2 group-hover:translate-x-1 transition-transform">
                        Manage Profile <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <Link href="/projects">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer h-full"
                >
                  <Card className="h-full hover:shadow-xl hover:border-chart-1/30 transition-all duration-300 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="relative">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-chart-1/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <TrendingUp className="h-6 w-6 text-chart-1" />
                        </div>
                        <div>
                          <CardTitle className="text-base group-hover:text-chart-1 transition-colors">Browse Projects</CardTitle>
                          <CardDescription>Explore and invest in mining opportunities</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </Link>

              <Link href="/marketplace">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer h-full"
                >
                  <Card className="h-full hover:shadow-xl hover:border-chart-5/30 transition-all duration-300 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-chart-5/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="relative">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-chart-5/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <Users className="h-6 w-6 text-chart-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base group-hover:text-chart-5 transition-colors">Marketplace</CardTitle>
                          <CardDescription>Trade minerals and find strategic partners</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenAdminDialog(true)}
                className="cursor-pointer h-full"
              >
                <Card className="h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 group overflow-hidden relative border-dashed">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">Contact Support</CardTitle>
                        <CardDescription>Get help or send feedback to administrators</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>

              {isSeller && (
                <>
                  <Link href="/dashboard/create-listing">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer h-full">
                      <Card className="h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 border-primary/20 bg-primary/5 group overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                        <CardHeader className="relative">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-background rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                              <Package className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-base text-primary">Create Listing</CardTitle>
                              <CardDescription>Post a new offer to the marketplace</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </Link>

                  <Link href="/dashboard/verification">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer h-full">
                      <Card className="h-full hover:shadow-xl hover:border-chart-3/30 transition-all duration-300 group overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-chart-3/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="relative">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-chart-3/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                              <Shield className="h-6 w-6 text-chart-3" />
                            </div>
                            <div>
                              <CardTitle className="text-base group-hover:text-chart-3 transition-colors">Get Verified</CardTitle>
                              <CardDescription>Build trust and unlock premium features</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </Link>
                </>
              )}

              {isAdmin && (
                <Link href="/admin">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer h-full">
                    <Card className="h-full hover:shadow-xl hover:border-destructive/30 transition-all duration-300 group overflow-hidden relative border-destructive/20 bg-destructive/5">
                      <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent" />
                      <CardHeader className="relative">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-background rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <FileText className="h-6 w-6 text-destructive" />
                          </div>
                          <div>
                            <CardTitle className="text-base text-destructive">Admin Panel</CardTitle>
                            <CardDescription>Manage system activity and users</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </Link>
              )}
            </div>
          </section>
        </motion.div>

        {/* Contact Admin Dialog */}
        <Dialog open={openAdminDialog} onOpenChange={(open) => setOpenAdminDialog(open)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Contact Support
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="How can we help?"
                  value={adminSubject}
                  onChange={(e) => setAdminSubject(e.target.value)}
                  className="focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Describe your issue or question..."
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  className="min-h-[120px] focus-visible:ring-primary resize-none"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpenAdminDialog(false)}>Cancel</Button>
              <Button
                disabled={!adminMessage.trim() || contactAdminMutation.isPending}
                onClick={sendContactToAdmin}
                className="gap-2"
              >
                {contactAdminMutation.isPending ? 'Sending...' : (
                  <>Send Message <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
