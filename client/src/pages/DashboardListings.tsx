import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  AlertCircle,
  FileText,
  MapPin,
  Package,
  Clock,
  ArrowRight,
  Plus,
  Filter,
  CheckCircle2,
  XCircle,
  Archive,
  MoreHorizontal
} from "lucide-react";

export default function DashboardListings() {
  const { user, isAuthenticated } = useAuth();
  const isSeller = user?.role === "seller";
  const userId = user?.id || (user as any)?.claims?.sub;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  // Seller: my listings; Buyer: my requests (filtered client-side)
  const { data: sellerListings, isLoading: loadingListings, isError: errorListings } = useQuery({
    queryKey: ["/api/dashboard/listings"],
    enabled: isAuthenticated && isSeller,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/dashboard/listings");
      return await res.json();
    }
  });

  const { data: allBuyerRequests, isLoading: loadingRequests, isError: errorRequests } = useQuery({
    queryKey: ["/api/marketplace/buyer-requests"],
    enabled: isAuthenticated && !isSeller,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/marketplace/buyer-requests");
      return await res.json();
    }
  });

  const closeRequestMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("PATCH", `/api/marketplace/buyer-requests/${id}/close`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to close request");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request closed",
        description: "Your RFQ has been marked as closed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/buyer-requests"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to close request",
        variant: "destructive",
      });
    },
  });

  const closeListingMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("PATCH", `/api/marketplace/listings/${id}/close`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to close listing");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Listing closed",
        description: "Your listing has been marked as closed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/listings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to close listing",
        variant: "destructive",
      });
    },
  });

  // Combined filtered list search logic
  const filteredItems = useMemo(() => {
    let list: any[] = [];
    if (isSeller) {
      if (sellerListings) list = [...sellerListings];
    } else {
      if (allBuyerRequests) list = (allBuyerRequests as any[]).filter(r => r.buyerId === userId);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(item =>
        (item.title || "").toLowerCase().includes(q) ||
        (item.location || "").toLowerCase().includes(q) ||
        (item.description || "").toLowerCase().includes(q) ||
        (item.mineralType || "").toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [sellerListings, allBuyerRequests, userId, isSeller, search]);

  if (!isAuthenticated) return null;

  const isLoading = loadingListings || loadingRequests;
  const isError = errorListings || errorRequests;

  const getStatusColor = (status: string) => {
    const s = (status || "pending").toLowerCase();
    switch (s) {
      case 'active':
      case 'approved':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'pending':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'rejected':
        return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'closed':
      case 'archived':
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderContent = (statusFilter: string | string[]) => {
    const items = filteredItems.filter(item => {
      const status = (item.status || "pending").toLowerCase();
      if (statusFilter === "all") return true;
      if (Array.isArray(statusFilter)) {
        return statusFilter.includes(status);
      }
      return status === statusFilter;
    });

    if (items.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center p-12 text-center bg-muted/30 rounded-lg border border-dashed border-muted-foreground/25"
        >
          <div className="p-4 rounded-full bg-primary/5 mb-4">
            <Package className="h-8 w-8 text-primary/40" />
          </div>
          <h3 className="text-lg font-medium text-foreground">No {isSeller ? "listings" : "requests"} found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto mb-6">
            {search
              ? "Try adjusting your search terms to find what you're looking for."
              : `You don't have any ${Array.isArray(statusFilter) ? statusFilter[0] : statusFilter} items yet.`}
          </p>
          {statusFilter !== "all" && !search ? (
            <p className="text-sm text-muted-foreground">Check other tabs for your items.</p>
          ) : (
            isSeller ? (
              <Link href="/dashboard/create-listing">
                <Button className="gap-2 shadow-lg shadow-primary/20">
                  <Package className="h-4 w-4" /> Create Listing
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard/create-rfq">
                <Button className="gap-2 shadow-lg shadow-primary/20">
                  <FileText className="h-4 w-4" /> Create RFQ
                </Button>
              </Link>
            )
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6"
      >
        <AnimatePresence>
          {items.map((item: any) => (
            <motion.div key={item.id} variants={itemVariants} layoutId={item.id}>
              <motion.div
                className="h-full group relative p-0 overflow-hidden rounded-2xl border bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-900/5 transition-all duration-300 flex flex-col"
              >
                <CardHeader className="pb-4 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    {/* Icon Box */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${item.status === 'active' || item.status === 'approved'
                      ? 'bg-emerald-500 text-white shadow-emerald-200'
                      : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}>
                      {isSeller ? <Package className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                    </div>

                    <Badge
                      variant="outline"
                      className={`px-3 py-1 capitalize border shadow-sm ${getStatusColor(item.status)}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-current opacity-75`} />
                      {(item.status || "active").toLowerCase()}
                    </Badge>
                  </div>

                  <div>
                    <CardTitle className="line-clamp-1 group-hover:text-indigo-600 transition-colors text-lg font-bold text-slate-900 mb-1.5">
                      {item.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {item.location || item.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {format(new Date(item.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p className="text-sm text-slate-600 line-clamp-3 mb-6 min-h-[3.75rem] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {item.mineralType && (
                      <div className="flex flex-col space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 group-hover:border-indigo-100 transition-colors">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Mineral</span>
                        <span className="text-sm font-semibold text-slate-700 truncate" title={item.mineralType}>{item.mineralType}</span>
                      </div>
                    )}
                    {item.quantity && (
                      <div className="flex flex-col space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 group-hover:border-indigo-100 transition-colors">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Quantity</span>
                        <span className="text-sm font-semibold text-slate-700 truncate" title={item.quantity}>{item.quantity}</span>
                      </div>
                    )}
                    {item.budget && (
                      <div className="flex flex-col space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 col-span-2 group-hover:border-indigo-100 transition-colors">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Volume / Budget</span>
                        <span className="text-sm font-semibold text-emerald-600 truncate" title={item.budget}>{item.budget}</span>
                      </div>
                    )}
                  </div>

                  {item.status === 'rejected' && item.rejectionReason && (
                    <div className="mt-2 text-sm bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 p-3 rounded-lg animate-in fade-in zoom-in-95 duration-300">
                      <div className="flex items-start gap-2 text-red-700 dark:text-red-400">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <div>
                            <span className="font-semibold block mb-0.5">Rejection Reason</span>
                            <p className="text-xs opacity-90 leading-relaxed">{item.rejectionReason}</p>
                          </div>
                          <Link href={`/dashboard/edit-rfq/${item.id}`}>
                            <Button size="sm" variant="destructive" className="w-full text-xs h-8 shadow-sm">
                              Edit & Resubmit <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                {(isSeller ? item.status === "approved" || item.status === "active" : item.status === "active") && (
                  <CardFooter className="pt-0 pb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                      onClick={() => isSeller ? closeListingMutation.mutate(item.id) : closeRequestMutation.mutate(item.id)}
                      disabled={isSeller ? closeListingMutation.isPending : closeRequestMutation.isPending}
                      data-testid={`button-close-${isSeller ? 'listing' : 'request'}-${item.id}`}
                    >
                      {isSeller
                        ? (closeListingMutation.isPending ? "Closing..." : "Close Listing")
                        : (closeRequestMutation.isPending ? "Closing..." : "Close RFQ")}
                    </Button>
                  </CardFooter>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Header */}
      <section className="py-10 border-b bg-gradient-to-r from-white via-indigo-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold font-display tracking-tight text-slate-900 mb-2">
                {isSeller ? "My Listings" : "My Requests"}
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                {isSeller
                  ? "Manage your marketplace listings and track their performance."
                  : "Track status updates and manage your sourcing requests."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              {isSeller ? (
                <Link href="/dashboard/create-listing">
                  <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-base font-semibold">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Listing
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard/create-rfq">
                  <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-base font-semibold">
                    <Plus className="h-5 w-5 mr-2" />
                    Create RFQ
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8 flex-1">

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative group max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${isSeller ? "listings" : "requests"}...`}
                className="pl-10 h-11 bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus:border-primary/50 transition-all shadow-sm"
                data-testid="input-dashboard-search"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="p-0 overflow-hidden h-[340px] flex flex-col border-border/50">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-6 w-6" />
                <CardTitle>Failed to load items</CardTitle>
              </div>
              <CardDescription>
                We couldn't load your {isSeller ? "listings" : "requests"}. Please try refreshing the page.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-8 p-1 bg-muted/40 border border-border/40 inline-flex w-auto h-auto rounded-lg">
              <TabsTrigger value="active" className="px-4 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Active
              </TabsTrigger>
              <TabsTrigger value="pending" className="px-4 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
                <Clock className="w-4 h-4 mr-2" /> Pending
              </TabsTrigger>
              <TabsTrigger value="history" className="px-4 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
                <Archive className="w-4 h-4 mr-2" /> History
              </TabsTrigger>
              <TabsTrigger value="all" className="px-4 py-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
                <Filter className="w-4 h-4 mr-2" /> All
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4 outline-none min-h-[300px]">
              {renderContent(["active", "approved"])}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4 outline-none min-h-[300px]">
              {renderContent("pending")}
            </TabsContent>

            <TabsContent value="history" className="space-y-4 outline-none min-h-[300px]">
              {renderContent(["closed", "rejected", "archived", "draft"])}
            </TabsContent>

            <TabsContent value="all" className="space-y-4 outline-none min-h-[300px]">
              {renderContent("all")}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
