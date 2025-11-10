import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

export default function DashboardListings() {
  const { user, isAuthenticated } = useAuth();
  const isSeller = user?.role === "seller";
  const userId = user?.id || (user as any)?.claims?.sub;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const filteredSellerListings = useMemo(() => {
    if (!sellerListings) return [];
    let list = sellerListings as any[];
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(l =>
        (l.title || "").toLowerCase().includes(q) ||
        (l.location || "").toLowerCase().includes(q) ||
        (l.description || "").toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      list = list.filter(l => (l.status || "").toLowerCase() === statusFilter);
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [sellerListings, search, statusFilter]);

  const filteredBuyerRequests = useMemo(() => {
    if (!allBuyerRequests) return [];
    let list = (allBuyerRequests as any[]).filter(r => r.buyerId === userId);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(r =>
        (r.title || "").toLowerCase().includes(q) ||
        (r.location || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q) ||
        (r.mineralType || "").toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      list = list.filter(r => (r.status || "").toLowerCase() === statusFilter);
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allBuyerRequests, userId, search, statusFilter]);

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{isSeller ? "My Listings" : "My Requests"}</h1>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${isSeller ? "listings" : "requests"}...`}
            className="border rounded-md px-3 py-2 text-sm bg-background"
            data-testid="input-dashboard-search"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-background"
            data-testid="select-dashboard-status"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
          {isSeller && (
            <Link href="/dashboard/create-listing">
              <Button data-testid="button-create-listing">Create listing</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Loading / Error states */}
      {(loadingListings || loadingRequests) && (
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

      {(errorListings || errorRequests) && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Failed to load</CardTitle>
            <CardDescription>There was an error loading your {isSeller ? "listings" : "requests"}.</CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Content */}
      {!loadingListings && !loadingRequests && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isSeller
            ? (filteredSellerListings.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No listings found</CardTitle>
                    <CardDescription>You have not created any listings yet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/dashboard/create-listing">
                      <Button variant="secondary" data-testid="cta-create-listing">Create listing</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                filteredSellerListings.map((l: any) => (
                  <Card key={l.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="truncate">{l.title}</CardTitle>
                          <CardDescription className="truncate">{l.location}</CardDescription>
                        </div>
                        <Badge variant="outline" className="capitalize">{(l.status || "pending").toLowerCase()}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{l.description}</p>
                      {l.createdAt && (
                        <p className="text-xs text-muted-foreground mt-3">Created {format(new Date(l.createdAt), "MMM d, yyyy")}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              ))
            : (filteredBuyerRequests.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No requests found</CardTitle>
                    <CardDescription>You have not created any buyer requests yet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/marketplace">
                      <Button variant="secondary" data-testid="cta-browse-marketplace">Browse marketplace</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                filteredBuyerRequests.map((r: any) => (
                  <Card key={r.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="truncate">{r.title}</CardTitle>
                          <CardDescription className="truncate">{r.location || r.country}</CardDescription>
                        </div>
                        <Badge variant="outline" className="capitalize">{(r.status || "active").toLowerCase()}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{r.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                        {r.mineralType && <span>Mineral: {r.mineralType}</span>}
                        {r.quantity && <span>Qty: {r.quantity}</span>}
                        {r.budget && <span>Budget: {r.budget}</span>}
                      </div>
                      {r.createdAt && (
                        <p className="text-xs text-muted-foreground mt-3">Created {format(new Date(r.createdAt), "MMM d, yyyy")}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              ))
          }
        </div>
      )}
    </div>
  );
}
