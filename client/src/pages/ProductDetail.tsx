import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useRoute, useSearch } from "wouter";
import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Gem,
  Heart,
  MapPin,
  Package,
  Scale,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageDisplay } from "@/components/ImageDisplay";
import { MessageDialog } from "@/components/MessageDialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { MarketplaceListingWithSeller } from "@shared/schema";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import catalogueImg from "../../../attached_assets/files/catalogue.jpg";
import copper2Img from "../../../attached_assets/files/copper2.jpg";
import gold2Img from "../../../attached_assets/files/gold2.jpg";
import green2Img from "../../../attached_assets/files/green-emerald2.jpg";

function getListingImage(listing: MarketplaceListingWithSeller): string {
  const mineral = `${listing.mineralType || ""} ${listing.specificType || ""} ${listing.title || ""}`.toLowerCase();
  if (mineral.includes("copper")) return copper2Img;
  if (mineral.includes("gold")) return gold2Img;
  if (mineral.includes("emerald") || mineral.includes("green")) return green2Img;
  return catalogueImg;
}

function formatListingCategory(listing: MarketplaceListingWithSeller): string {
  return (listing.mainCategory || listing.type || "marketplace listing")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ProductDetail() {
  const [, params] = useRoute("/marketplace/listings/:id");
  const [, setLocation] = useLocation();
  const search = useSearch();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const requestedReturnTo = new URLSearchParams(search).get("returnTo");
  const backHref = requestedReturnTo === "/dashboard/interests" ? requestedReturnTo : "/marketplace";

  const listingsQuery = useQuery<MarketplaceListingWithSeller[]>({
    queryKey: ["/api/marketplace/listings"],
  });
  const listing = listingsQuery.data?.find((item) => item.id === params?.id);
  useEffect(() => {
    setActivePhoto(0);
  }, [listing?.id]);

  const interestQueryKey = ["/api/projects", listing?.id, "has-interest"];
  const interestQuery = useQuery<boolean>({
    queryKey: interestQueryKey,
    queryFn: async () => {
      if (!listing) return false;
      const response = await apiRequest("GET", `/api/projects/${listing.id}/has-interest`);
      const data = await response.json() as { hasInterest?: boolean };
      if (typeof data.hasInterest !== "boolean") {
        throw new Error("The bookmark status response was invalid.");
      }
      return data.hasInterest;
    },
    enabled: Boolean(isAuthenticated && listing),
  });
  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!listing) throw new Error("This listing is not available.");
      const response = await apiRequest("POST", "/api/projects/interest", { listingId: listing.id });
      const data = await response.json() as { bookmarked?: boolean };
      return data.bookmarked ?? true;
    },
    onSuccess: (bookmarked) => {
      queryClient.setQueryData(interestQueryKey, bookmarked);
      toast({
        title: bookmarked ? "Listing bookmarked" : "Bookmark removed",
        description: bookmarked ? "You can find this listing in your saved items." : "This listing was removed from your saved items.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        setLocation("/login");
        return;
      }
      toast({
        title: "Unable to update bookmark",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const shareListing = async () => {
    if (!listing) return;
    const url = new URL(`/marketplace/listings/${encodeURIComponent(listing.id)}`, window.location.origin).toString();
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: listing.title, url });
        return;
      }
      if (!navigator.clipboard?.writeText) throw new Error("Sharing is not supported by this browser.");
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "The listing link is ready to share." });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      toast({
        title: "Unable to share this listing",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (listingsQuery.isLoading) {
    return (
      <main className="container mx-auto max-w-6xl px-4 py-10">
        <Skeleton className="mb-6 h-8 w-36" />
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (listingsQuery.isError) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Unable to load this listing</h1>
        <p className="mt-2 text-muted-foreground">Please try again in a moment.</p>
        <Button className="mt-6" onClick={() => void listingsQuery.refetch()}>Try again</Button>
        <Button asChild className="ml-2 mt-6" variant="outline">
          <Link href={backHref}>{backHref === "/dashboard/interests" ? "Back to saved items" : "Back to marketplace"}</Link>
        </Button>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-semibold">Listing not found</h1>
        <p className="mt-2 text-muted-foreground">This listing may have been removed or is no longer available.</p>
        <Button asChild className="mt-6">
          <Link href={backHref}>{backHref === "/dashboard/interests" ? "Back to saved items" : "Back to marketplace"}</Link>
        </Button>
      </main>
    );
  }

  const sellerName = listing.profile?.companyName ||
    [listing.seller?.firstName, listing.seller?.lastName].filter(Boolean).join(" ") ||
    "Fusion Mining";
  const sellerVerified = Boolean(listing.seller?.verified || listing.seller?.verificationStatus === "approved");
  const fallbackImage = getListingImage(listing);
  const uploadedImages = Array.from(new Set([...(listing.imageUrls || []), listing.imageUrl].filter((url): url is string => Boolean(url))));
  const gallery = uploadedImages.length
    ? uploadedImages.map((src, index) => ({ src, label: index === 0 ? "Cover photo" : `Photo ${index + 1}` }))
    : [{ src: fallbackImage, label: "Category image" }];
  const activeGalleryPhoto = gallery[Math.min(activePhoto, gallery.length - 1)];
  const category = formatListingCategory(listing);
  const details = [
    { label: "Type", value: listing.specificType || listing.mineralType || category, icon: Gem },
    { label: "Grade", value: listing.grade || "Not specified", icon: Scale },
    { label: "Quantity", value: listing.quantity || "Not specified", icon: Boxes },
    { label: "Price", value: listing.price || "Contact seller", icon: CircleDollarSign },
    { label: "Location", value: listing.location, icon: MapPin },
    { label: "Listed", value: Number.isFinite(new Date(listing.createdAt).getTime()) ? format(new Date(listing.createdAt), "MMM d, yyyy") : "Date unavailable", icon: CalendarDays },
  ];

  const similarListings = (listingsQuery.data || [])
    .filter((item) => item.id !== listing.id && (
      (listing.mainCategory && item.mainCategory === listing.mainCategory) ||
      (listing.mineralType && item.mineralType?.toLowerCase() === listing.mineralType.toLowerCase()) ||
      item.location.toLowerCase() === listing.location.toLowerCase()
    ))
    .slice(0, 3);
  const moreFromSeller = (listingsQuery.data || [])
    .filter((item) => item.id !== listing.id && item.sellerId === listing.sellerId)
    .slice(0, 3);

  const contactSeller = () => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }
    setMessageDialogOpen(true);
  };

  const productCard = (item: MarketplaceListingWithSeller) => (
    <Link key={item.id} href={`/marketplace/listings/${item.id}`}>
      <Card className="h-full overflow-hidden rounded-xl border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <ImageDisplay
          imageUrl={item.imageUrl}
          alt={item.title}
          fallbackImage={getListingImage(item)}
          className="aspect-[16/9] overflow-hidden bg-muted"
          iconClassName="h-12 w-12"
        />
        <CardContent className="space-y-2 p-4">
          <p className="line-clamp-1 font-semibold">{item.title}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />{item.location}
          </p>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{item.price || "Contact for price"}</p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-900/[0.03] via-background to-background">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <Button asChild variant="ghost" className="mb-6 -ml-3 text-muted-foreground">
          <Link href={backHref}><ArrowLeft className="mr-2 h-4 w-4" />{backHref === "/dashboard/interests" ? "Back to saved items" : "Back to marketplace"}</Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section aria-label="Product photos">
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-sm">
              <ImageDisplay
                imageUrl={activeGalleryPhoto.src}
                alt={`${listing.title} — ${activeGalleryPhoto.label}`}
                fallbackImage={fallbackImage}
                className="aspect-[4/3] w-full bg-muted"
                iconClassName="h-20 w-20"
              />
              <Badge className="absolute bottom-4 left-4 border-white/30 bg-black/60 text-white backdrop-blur">
                {activeGalleryPhoto.label}
              </Badge>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {gallery.map((photo, index) => (
                  <button
                    key={photo.label}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    aria-label={`View ${photo.label}`}
                    aria-pressed={activePhoto === index}
                    className={`overflow-hidden rounded-xl border transition-colors ${activePhoto === index ? "border-amber-700 ring-2 ring-amber-700/20" : "border-border/70 hover:border-amber-700/50"}`}
                  >
                    <ImageDisplay
                      imageUrl={photo.src}
                      alt={`${listing.title} — ${photo.label}`}
                      fallbackImage={fallbackImage}
                      className="aspect-[16/9] bg-muted"
                      iconClassName="h-8 w-8"
                    />
                    <span className="block px-2 py-1 text-left text-xs text-muted-foreground">{photo.label}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-amber-700/20 bg-amber-700/5 text-amber-900 dark:text-amber-200">{category}</Badge>
              {listing.itemId && <span className="text-xs text-muted-foreground">Ad #{listing.itemId}</span>}
              <div className="ml-auto"><Badge variant="secondary" className="capitalize">{listing.status}</Badge></div>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{listing.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Listed {details[5].value}</p>

            <Card className="mt-6 border-border/70 shadow-sm">
              <CardContent className="grid grid-cols-2 gap-x-4 gap-y-5 p-5 sm:grid-cols-3">
                {details.slice(0, 5).map(({ label, value, icon: Icon }) => (
                  <div key={label} className="min-w-0">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Icon className="h-4 w-4 text-amber-700 dark:text-amber-400" />{label}
                    </p>
                    <p className={`mt-1 truncate text-sm font-semibold ${label === "Price" ? "text-emerald-700 dark:text-emerald-400" : ""}`}>{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="flex-1 shadow-sm" onClick={contactSeller}>
                <ShieldCheck className="mr-2 h-4 w-4" />Contact Seller
              </Button>
              <Button
                size="lg"
                variant={interestQuery.data ? "secondary" : "outline"}
                onClick={() => {
                  if (!isAuthenticated) {
                    setLocation("/login");
                    return;
                  }
                  bookmarkMutation.mutate();
                }}
                disabled={bookmarkMutation.isPending || interestQuery.isLoading}
                aria-label={interestQuery.data ? "Remove bookmark" : "Bookmark listing"}
              >
                <Heart className={`mr-2 h-4 w-4 ${interestQuery.data ? "fill-current text-red-500" : ""}`} />
                {interestQuery.data ? "Saved" : "Save"}
              </Button>
              <Button size="icon" variant="outline" className="h-11 w-11" onClick={() => void shareListing()} aria-label="Share listing">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Card className="mt-6 border-amber-800/10 bg-gradient-to-br from-amber-800/[0.04] to-card">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-800/10 text-amber-800 dark:text-amber-300">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Seller</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{sellerName}</h2>
                      {sellerVerified ? (
                        <Badge className="gap-1 border-emerald-700/15 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <BadgeCheck className="h-3 w-3" />Verified seller
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Not verified</Badge>
                      )}
                    </div>
                    {listing.profile?.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />{listing.profile.location}
                      </p>
                    )}
                    {listing.profile?.bio && <p className="mt-3 text-sm leading-6 text-muted-foreground">{listing.profile.bio}</p>}
                    {listing.seller?.id && (
                      <Button asChild variant="ghost" className="-ml-3 mt-2 h-auto p-0 text-amber-800 dark:text-amber-300">
                        <Link href={`/profile/${listing.seller.id}`}>View seller profile</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-xl font-semibold">About this listing</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">{listing.description}</p>
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Specifications &amp; trust</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border/70 bg-card p-4">
                  <p className="text-xs font-medium text-muted-foreground">Seller verification</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                    {sellerVerified ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <ShieldCheck className="h-4 w-4 text-muted-foreground" />}
                    {sellerVerified ? "Seller identity verified" : "Seller not verified"}
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-card p-4">
                  <p className="text-xs font-medium text-muted-foreground">Certifications</p>
                  <p className="mt-2 text-sm font-medium">Not provided with this listing</p>
                </div>
              </div>
            </div>
          </div>
          <Card className="h-fit border-border/70">
            <CardContent className="p-5">
              <h2 className="font-semibold">At a glance</h2>
              <div className="mt-4 space-y-3">
                {details.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4 text-amber-700 dark:text-amber-400" />{label}
                    </span>
                    <span className="max-w-[55%] truncate text-right text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {similarListings.length > 0 && (
          <section className="mt-14">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-800 dark:text-amber-300">Explore more</p>
                <h2 className="mt-1 text-2xl font-bold">Similar listings</h2>
              </div>
              <Button asChild variant="ghost" size="sm"><Link href="/marketplace">Browse marketplace</Link></Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{similarListings.map(productCard)}</div>
          </section>
        )}

        {moreFromSeller.length > 0 && (
          <section className="mt-14 border-t border-border/70 pt-10">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">From this seller</p>
              <h2 className="mt-1 text-2xl font-bold">More from {sellerName}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{moreFromSeller.map(productCard)}</div>
          </section>
        )}
      </div>

      {listing.sellerId && (
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          recipientId={listing.sellerId}
          recipientName={sellerName}
          recipientEmail={listing.seller?.email || undefined}
          defaultSubject={`Inquiry about: ${listing.title}`}
          listingTitle={listing.title}
          listingId={listing.id}
        />
      )}
    </main>
  );
}
