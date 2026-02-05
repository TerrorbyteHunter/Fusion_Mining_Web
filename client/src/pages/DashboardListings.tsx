import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>No {isSeller ? "listings" : "requests"} found</CardTitle>
            <CardDescription>
              {search
                ? "Try adjusting your search terms."
                : `You have no ${Array.isArray(statusFilter) ? statusFilter.join("/") : statusFilter} items.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statusFilter !== "all" && !search ? (
              <p className="text-sm text-muted-foreground">Check other tabs for your items.</p>
            ) : (
              isSeller ? (
                <Link href="/dashboard/create-listing">
                  <Button variant="secondary" data-testid="cta-create-listing">Create listing</Button>
                </Link>
              ) : (
                <Link href="/dashboard/create-rfq">
                  <Button variant="secondary" data-testid="cta-browse-marketplace">Create RFQ</Button>
                </Link>
              )
            )}
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {items.map((item: any) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="truncate">{item.title}</CardTitle>
                  <CardDescription className="truncate">{item.location || item.country}</CardDescription>
                </div>
                <Badge
                  variant={
                    (item.status || "active") === 'rejected' ? 'destructive' :
                      (item.status || "active") === 'pending' ? 'secondary' :
                        (item.status || "active") === 'active' || (item.status || "active") === 'approved' ? 'default' : 'outline'
                  }
                  className="capitalize shrink-0"
                >
                  {(item.status || "active").toLowerCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 break-words">{item.description}</p>

              {item.status === 'rejected' && item.rejectionReason && (
                <div className="mt-2 text-xs text-destructive bg-destructive/10 p-2 rounded">
                  <span className="font-semibold">Rejection Reason:</span> {item.rejectionReason}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                {item.mineralType && <span>Mineral: {item.mineralType}</span>}
                {item.quantity && <span>Qty: {item.quantity}</span>}
                {item.budget && <span>Budget: {item.budget}</span>}
              </div>

              {item.createdAt && (
                <p className="text-xs text-muted-foreground mt-3">Created {format(new Date(item.createdAt), "MMM d, yyyy")}</p>
              )}

              {!isSeller && item.status === "active" && (
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => closeRequestMutation.mutate(item.id)}
                    disabled={closeRequestMutation.isPending}
                    data-testid={`button-close-request-${item.id}`}
                  >
                    {closeRequestMutation.isPending ? "Closing..." : "Close RFQ"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">{isSeller ? "My Listings" : "My Requests"}</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          {isSeller && (
            <Link href="/dashboard/create-listing">
              <Button data-testid="button-create-listing">Create listing</Button>
            </Link>
          )}
          {!isSeller && (
            <Link href="/dashboard/create-rfq">
              <Button data-testid="button-create-rfq">Create RFQ</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${isSeller ? "listings" : "requests"}...`}
          className="pl-9 max-w-md"
          data-testid="input-dashboard-search"
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              <Skeleton className="h-16 w-full" />
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Failed to load</CardTitle>
            <CardDescription>There was an error loading your {isSeller ? "listings" : "requests"}.</CardDescription>
          </CardHeader>
        </Card>
      )}

      {!isLoading && !isError && (
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {isSeller ? "Your approved and live listings." : "Your active requests visible to sellers."}
              </p>
            </div>
            {renderContent(["active", "approved"])}
          </TabsContent>

          <TabsContent value="pending">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Items waiting for admin approval.
              </p>
            </div>
            {renderContent("pending")}
          </TabsContent>

          <TabsContent value="history">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Closed, rejected, or archived items.
              </p>
            </div>
            {renderContent(["closed", "rejected", "archived", "draft"])}
          </TabsContent>

          <TabsContent value="all">
            {renderContent("all")}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
