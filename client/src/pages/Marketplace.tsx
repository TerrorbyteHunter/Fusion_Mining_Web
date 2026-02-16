// Marketplace portal with hierarchical categories, listings, and buyer requests
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageDialog } from "@/components/MessageDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/StatusBadge";
import { VerificationBadge } from "@/components/VerificationBadge";
import { MarketplaceMap } from "@/components/MarketplaceMap";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { MarketplaceListingWithSeller, BuyerRequest } from "@shared/schema";
import { MAIN_CATEGORIES, getSubcategoriesForMain } from "@shared/categories";
import {
  Search,
  MapPin,
  Package,
  Users,
  Plus,
  Gem,
  Wrench,
  Briefcase,
  BadgeCheck,
  Heart,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Spinner from "@/components/Spinner";
import { Link } from "wouter";
import { ImageDisplay } from "@/components/ImageDisplay";

// image imports from repository attached_assets
import catalogueImg from "../../../attached_assets/files/catalogue.jpg";
import copper2Img from "../../../attached_assets/files/copper2.jpg";
import gold2Img from "../../../attached_assets/files/gold2.jpg";
import green2Img from "../../../attached_assets/files/green-emerald2.jpg";
// Equipment and Services images
import blastingImg from "../../../attached_assets/files/Services and Mining Equipment/blasting.png";
import drillingImg from "../../../attached_assets/files/Services and Mining Equipment/drilling.png";
import equipmentImg from "../../../attached_assets/files/Services and Mining Equipment/equipment.png";
import equipment2Img from "../../../attached_assets/files/Services and Mining Equipment/equipment2.png";
import feasibilityImg from "../../../attached_assets/files/Services and Mining Equipment/Feasibility.png";
import shippingImg from "../../../attached_assets/files/Services and Mining Equipment/Shipping.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper function to get appropriate image for equipment/service based on keywords
function getEquipmentImage(listing: MarketplaceListingWithSeller): string {
  if (!listing.mainCategory) {
    return catalogueImg;
  }

  const title = (listing.title || '').toLowerCase();
  const specificType = (listing.specificType || '').toLowerCase();
  const toolSubcategory = (listing.toolSubcategory || '').toLowerCase();
  const serviceSubcategory = (listing.serviceSubcategory || '').toLowerCase();

  // Check for drilling-related
  if (title.includes('drill') || specificType.includes('drill') || toolSubcategory.includes('drilling')) {
    return drillingImg;
  }

  // Check for blasting-related
  if (title.includes('blast') || specificType.includes('blast') || serviceSubcategory.includes('blasting')) {
    return blastingImg;
  }

  // Check for shipping/freight-related
  if (title.includes('freight') || title.includes('shipping') || title.includes('transport') ||
    serviceSubcategory.includes('freight') || serviceSubcategory.includes('supply_chain')) {
    return shippingImg;
  }

  // Check for feasibility/consulting
  if (title.includes('feasibility') || title.includes('consult') || title.includes('advisory') ||
    serviceSubcategory.includes('consulting') || serviceSubcategory.includes('advisory')) {
    return feasibilityImg;
  }

  // Equipment fallbacks
  if (listing.mainCategory === 'mining_tools' || listing.mainCategory === 'mining_ppe') {
    return equipmentImg;
  }

  // Services fallback
  if (listing.mainCategory === 'mining_services') {
    return equipment2Img;
  }

  return catalogueImg;
}

export default function Marketplace() {
  const { isAuthenticated, isSeller } = useAuth();
  const { toast } = useToast();
  const [location] = useLocation();

  const [activeTab, setActiveTab] = useState("minerals");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("minerals");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: string;
    name?: string;
    email?: string;
    subject?: string;
    listingTitle?: string;
    listingId?: string;
  } | null>(null);
  const [contactedListings, setContactedListings] = useState<Set<string>>(new Set());
  const [expressedInterests, setExpressedInterests] = useState<Set<string>>(new Set());

  // Express interest mutation
  const expressInterestMutation = useMutation({
    mutationFn: async ({ listingId, buyerRequestId }: { listingId?: string, buyerRequestId?: string }) => {
      const res = await apiRequest("POST", "/api/projects/interest", { listingId, buyerRequestId });
      return { id: listingId || buyerRequestId, data: await res.json() };
    },
    onSuccess: ({ id, data }) => {
      if (id) {
        setExpressedInterests(prev => {
          const next = new Set(prev);
          if (data.bookmarked === false) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });

        toast({
          title: data.bookmarked === false ? "Bookmark Removed" : "Added to Saved Items",
          description: data.bookmarked === false ? "Item removed from your saved items." : "This item has been saved to your dashboard.",
        });
      }
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to express interest. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleExpressInterest = (id: string, type: 'listing' | 'rfq') => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: `Please log in to save this ${type === 'rfq' ? 'RFQ' : 'listing'}`,
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }
    if (type === 'listing') {
      expressInterestMutation.mutate({ listingId: id });
    } else {
      expressInterestMutation.mutate({ buyerRequestId: id });
    }
  };

  // Synchronize state with URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    const category = searchParams.get('category');
    const tab = searchParams.get('tab');

    if (tab) {
      setActiveTab(tab);
      // Sync filters when tab changes from URL
      if (tab === 'minerals') {
        setSelectedMainCategory('minerals');
      } else if (tab === 'mining_equipment') {
        setSelectedMainCategory('mining_equipment');
      } else if (tab === 'mining_tools') {
        setSelectedMainCategory('mining_equipment');
      } else if (tab === 'mining_ppe') {
        setSelectedMainCategory('mining_equipment');
      } else if (tab === 'mining_services') {
        setSelectedMainCategory('mining_services');
      } else if (tab === 'requests') {
        setSelectedMainCategory('all');
      }
    } else if (category) {
      setActiveTab(category);
      setSelectedMainCategory(category === 'mining_tools' || category === 'mining_ppe' ? 'mining_equipment' : category);
    }
  }, [location]);

  // Fetch platform contact settings (public)
  const { data: adminSettings, isLoading: loadingAdminContact } = useQuery<any>({
    queryKey: ['/api/contact/settings'],
  });

  const handleContactSeller = (listing: MarketplaceListingWithSeller) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to contact the seller",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    // Use seller ID if available, otherwise fall back to admin
    const recipientId = listing.sellerId || listing.seller?.id;
    const recipientName = listing.seller
      ? `${listing.seller.firstName || ''} ${listing.seller.lastName || ''}`.trim() || 'Seller'
      : adminSettings?.email || 'Administrator'; // Use email as fallback name if name missing
    const recipientEmail = listing.seller?.email || adminSettings?.supportEmail;

    if (!recipientId) {
      toast({
        title: "Error",
        description: "Could not contact seller. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setSelectedRecipient({
      id: recipientId,
      name: recipientName,
      email: recipientEmail,
      subject: `Inquiry about: ${listing.title}`,
      listingTitle: listing.title,
      listingId: listing.id,
    });
    setMessageDialogOpen(true);
  };

  const handleRespondToRequest = (request: BuyerRequest) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to respond to requests",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    setSelectedRecipient({
      id: request.buyerId,
      subject: `Response to: ${request.title}`,
      listingTitle: request.title,
    });
    setMessageDialogOpen(true);
  };

  // Helper for rendering verification badges for seller
  const renderVerificationBadges = (listing: MarketplaceListingWithSeller) => {
    const sellerName = listing.profile?.companyName ||
      (listing.seller ? `${listing.seller.firstName || ''} ${listing.seller.lastName || ''}`.trim() : 'Unknown Seller');

    return (
      <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
        {/* Seller Info & Verification - Shows individual seller verification status next to name */}
        {listing.seller && (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Posted by</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700 font-bold">{sellerName}</span>
                {listing.seller.verificationStatus === 'approved' && (
                  <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10 shrink-0" />
                )}
                {listing.seller.verificationStatus === 'approved' ? (
                  <VerificationBadge
                    verificationStatus={listing.seller.verificationStatus}
                    badgeColor={listing.seller.badgeColor}
                    size="sm"
                    showIcon={true}
                  />
                ) : (
                  <Badge variant="outline" className="text-[9px] h-4 px-1.5 text-slate-400 border-slate-200 bg-slate-50 font-medium">
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  // Fetch listings
  const { data: listings, isLoading: loadingListings } = useQuery<MarketplaceListingWithSeller[]>({
    queryKey: ["/api/marketplace/listings"],
  });

  // Fetch buyer requests
  const { data: buyerRequests, isLoading: loadingRequests } = useQuery<BuyerRequest[]>({
    queryKey: ["/api/marketplace/buyer-requests"],
  });

  // Check contact status for all listings when they load
  useEffect(() => {
    if (!isAuthenticated || !listings) return;

    const checkContactStatus = async () => {
      const contacted = new Set<string>();

      for (const listing of listings) {
        try {
          const response = await fetch(
            `/api/messages/check-contact?listingId=${listing.id}`,
            { credentials: 'include' }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.hasContacted) {
              contacted.add(listing.id);
            }
          }
        } catch (error) {
          // Silently fail - don't disrupt UX
        }
      }

      setContactedListings(contacted);
    };

    checkContactStatus();
  }, [listings, isAuthenticated]);

  // Check for expressed interests when data loads
  useEffect(() => {
    const checkInterests = async () => {
      if (!isAuthenticated) return;

      const interests = new Set<string>();

      // Check listings interests
      if (listings) {
        for (const listing of listings) {
          try {
            const response = await fetch(`/api/projects/${listing.id}/has-interest`, {
              credentials: 'include',
            });
            const data = await response.json();
            if (data.hasInterest) {
              interests.add(listing.id);
            }
          } catch (error) {
            console.error('Error checking interest for listing:', error);
          }
        }
      }

      // Check RFQ interests
      if (buyerRequests) {
        for (const request of buyerRequests) {
          try {
            const response = await fetch(`/api/projects/${request.id}/has-interest`, {
              credentials: 'include',
            });
            const data = await response.json();
            if (data.hasInterest) {
              interests.add(request.id);
            }
          } catch (error) {
            console.error('Error checking interest for RFQ:', error);
          }
        }
      }

      setExpressedInterests(interests);
    };

    checkInterests();
  }, [listings, buyerRequests, isAuthenticated]);

  // Get subcategories for current main category
  const availableSubcategories = selectedMainCategory !== "all"
    ? getSubcategoriesForMain(selectedMainCategory)
    : {};

  const filteredListings = listings?.filter((listing) => {
    // Location filter with normalization
    const normalizeLoc = (loc: string) => loc.toLowerCase().replace(" province", "").trim();
    const matchesLocation = selectedLocation === "all" ||
      normalizeLoc(listing.location) === normalizeLoc(selectedLocation);

    // Handle main category matching - "mining_equipment" maps to both "mining_tools" and "mining_ppe"
    let matchesMainCategory = true;
    if (selectedMainCategory !== "all") {
      if (selectedMainCategory === "mining_equipment") {
        matchesMainCategory = listing.mainCategory === "mining_tools" || listing.mainCategory === "mining_ppe";
      } else {
        matchesMainCategory = listing.mainCategory === selectedMainCategory;
      }
    }

    // Subcategory filter should only check the relevant field based on main category
    let matchesSubcategory = true;
    if (selectedSubcategory !== "all") {
      if (selectedMainCategory === "minerals") {
        matchesSubcategory = listing.mineralSubcategory === selectedSubcategory;
      } else if (selectedMainCategory === "mining_equipment") {
        matchesSubcategory = listing.toolSubcategory === selectedSubcategory || listing.ppeSubcategory === selectedSubcategory;
      } else if (selectedMainCategory === "mining_services") {
        matchesSubcategory = listing.serviceSubcategory === selectedSubcategory;
      } else {
        // When main category is "all", match any subcategory
        matchesSubcategory =
          listing.mineralSubcategory === selectedSubcategory ||
          listing.toolSubcategory === selectedSubcategory ||
          listing.serviceSubcategory === selectedSubcategory ||
          listing.ppeSubcategory === selectedSubcategory;
      }
    }

    const matchesSearch = !searchQuery ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.specificType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.mineralType?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesMainCategory && matchesSubcategory && matchesSearch && listing.status === 'approved';
  });

  const partnershipsListings = listings?.filter(l =>
    l.type === 'partnership' &&
    l.status === 'approved' &&
    (!searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredRequests = buyerRequests?.filter((request) => {
    const normalizeLoc = (loc: string) => (loc || "").toLowerCase().replace(" province", "").trim();
    const matchesLocation = selectedLocation === "all" ||
      normalizeLoc(request.location || "") === normalizeLoc(selectedLocation);
    const matchesMainCategory = selectedMainCategory === "all" || request.mainCategory === selectedMainCategory;
    const matchesSubcategory = selectedSubcategory === "all" ||
      request.mineralSubcategory === selectedSubcategory ||
      request.toolSubcategory === selectedSubcategory ||
      request.serviceSubcategory === selectedSubcategory ||
      request.ppeSubcategory === selectedSubcategory;
    const matchesSearch = !searchQuery ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.specificType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.mineralType?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesMainCategory && matchesSubcategory && matchesSearch && request.status === 'active';
  });


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 border-b bg-gradient-to-b from-chart-2/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6" data-testid="text-page-title">
              Marketplace
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Trade minerals and find partnerships in Zambia's premier mining marketplace
            </p>
            {isAuthenticated && isSeller && (
              <Button asChild size="lg" data-testid="button-create-listing">
                <Link href="/dashboard/create-listing">
                  <Plus className="mr-2 h-5 w-5" />
                  Create New Listing
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
      {/* Regional Trading Insights Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Regional Trading Intelligence
            </h2>
            <p className="text-slate-500 text-sm">
              Visualize verified supply hubs and mining activity across Zambia.
            </p>
          </div>

          <MarketplaceMap
            listings={listings || []}
            onListingClick={(listing) => handleContactSeller(listing as any)}
          />
        </div>
      </section>

      {/* Marketplace Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="minerals" data-testid="tab-minerals" onClick={() => { setSelectedMainCategory("minerals"); setSelectedSubcategory("all"); }}>
                <Gem className="mr-2 h-4 w-4" />
                Minerals
              </TabsTrigger>
              <TabsTrigger value="mining_equipment" data-testid="tab-equipment" onClick={() => { setSelectedMainCategory("mining_equipment"); setSelectedSubcategory("all"); }}>
                <Wrench className="mr-2 h-4 w-4" />
                Equipment
              </TabsTrigger>
              <TabsTrigger value="mining_services" data-testid="tab-services" onClick={() => { setSelectedMainCategory("mining_services"); setSelectedSubcategory("all"); }}>
                <Briefcase className="mr-2 h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="requests" data-testid="tab-requests" onClick={() => { setSelectedMainCategory("all"); setSelectedSubcategory("all"); }}>
                <Package className="mr-2 h-4 w-4" />
                RFQs
              </TabsTrigger>
              <TabsTrigger value="partnerships" data-testid="tab-partnerships" onClick={() => { setSelectedMainCategory("all"); setSelectedSubcategory("all"); }}>
                <Users className="mr-2 h-4 w-4" />
                Partnerships
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <div>
                <Label htmlFor="search-marketplace">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-marketplace"
                    placeholder="Search listings..."
                    className="pl-10 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-marketplace"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="main-category">Main Category</Label>
                <Select value={selectedMainCategory} onValueChange={(val) => {
                  setSelectedMainCategory(val);
                  setSelectedSubcategory("all");
                }}>
                  <SelectTrigger id="main-category" data-testid="select-main-category" className="h-10">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.entries(MAIN_CATEGORIES).map(([key, cat]) => (
                      <SelectItem key={key} value={key}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  value={selectedSubcategory}
                  onValueChange={setSelectedSubcategory}
                  disabled={selectedMainCategory === "all"}
                >
                  <SelectTrigger id="subcategory" data-testid="select-subcategory" className="h-10">
                    <SelectValue placeholder="All Subcategories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subcategories</SelectItem>
                    {Object.entries(availableSubcategories).map(([key, sub]: [string, any]) => (
                      <SelectItem key={key} value={key}>{sub.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location-filter">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location-filter" data-testid="select-location" className="h-10">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Lusaka">Lusaka</SelectItem>
                    <SelectItem value="Central Province">Central Province</SelectItem>
                    <SelectItem value="Copperbelt Province">Copperbelt Province</SelectItem>
                    <SelectItem value="Eastern Province">Eastern Province</SelectItem>
                    <SelectItem value="Luapula Province">Luapula Province</SelectItem>
                    <SelectItem value="Muchinga Province">Muchinga Province</SelectItem>
                    <SelectItem value="Northern Province">Northern Province</SelectItem>
                    <SelectItem value="North-Western Province">North-Western Province</SelectItem>
                    <SelectItem value="Southern Province">Southern Province</SelectItem>
                    <SelectItem value="Western Province">Western Province</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="minerals">
              {loadingListings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : filteredListings && filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="hover-elevate transition-all" data-testid={`card-listing-${listing.id}`}>
                      <ImageDisplay
                        imageUrl={listing.imageUrl}
                        alt={listing.title}
                        fallbackImage={
                          listing.mineralType
                            ? (function getMineralImage(mineral: string) {
                              const m = mineral.toLowerCase();
                              if (m.includes('copper')) return copper2Img;
                              if (m.includes('gold')) return gold2Img;
                              if (m.includes('emerald') || m.includes('green')) return green2Img;
                              return catalogueImg;
                            })(listing.mineralType)
                            : catalogueImg
                        }
                      />
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl line-clamp-1">{listing.title}</CardTitle>
                            {listing.itemId && (
                              <Badge variant="secondary" className="uppercase text-xs">{listing.itemId}</Badge>
                            )}
                          </div>
                          <StatusBadge status={listing.status} />
                        </div>
                        <CardDescription className="line-clamp-2">
                          {listing.description}
                        </CardDescription>
                        {renderVerificationBadges(listing)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {listing.mineralType && (
                            <div>
                              <p className="text-muted-foreground text-xs">Type</p>
                              <p className="font-medium">{listing.mineralType}</p>
                            </div>
                          )}
                          {listing.grade && (
                            <div>
                              <p className="text-muted-foreground text-xs">Grade</p>
                              <p className="font-medium">{listing.grade}</p>
                            </div>
                          )}
                          {listing.quantity && (
                            <div>
                              <p className="text-muted-foreground text-xs">Quantity</p>
                              <p className="font-medium">{listing.quantity}</p>
                            </div>
                          )}
                          {listing.price && (
                            <div>
                              <p className="text-muted-foreground text-xs">Price</p>
                              <p className="font-medium text-chart-3">{listing.price}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            variant={contactedListings.has(listing.id) ? "outline" : "default"}
                            data-testid={`button-contact-seller-${listing.id}`}
                            onClick={() => handleContactSeller(listing)}
                            disabled={loadingAdminContact}
                          >
                            {loadingAdminContact ? (
                              <><Spinner size="sm" className="mr-2" />Preparing...</>
                            ) : (
                              'Contact'
                            )}
                          </Button>
                          <Button
                            variant={expressedInterests.has(listing.id) ? "secondary" : "outline"}
                            size="icon"
                            onClick={() => handleExpressInterest(listing.id, 'listing')}
                            disabled={expressInterestMutation.isPending}
                            data-testid={`button-interest-minerals-${listing.id}`}
                            title={expressedInterests.has(listing.id) ? "Remove Bookmark" : "Save to Interests"}
                          >
                            <Heart className={`h-4 w-4 ${expressedInterests.has(listing.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <img src={catalogueImg} className="h-24 w-24 mx-auto mb-4 object-cover rounded" alt="no-listings" />
                    <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or check back later
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="requests">
              {loadingRequests ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : filteredRequests && filteredRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRequests.map((request) => (
                    <Card key={request.id} className="hover-elevate transition-all" data-testid={`card-request-${request.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl line-clamp-1">{request.title}</CardTitle>
                            {request.itemId && (
                              <Badge variant="secondary" className="uppercase text-xs">{request.itemId}</Badge>
                            )}
                          </div>
                          {request.status === 'approved' || request.status === 'active' ? (
                            <Badge className="bg-emerald-600 text-white border-emerald-500 h-5 text-[10px] w-fit font-bold">
                              <BadgeCheck className="h-3 w-3 mr-1" />
                              Verified Ad
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="capitalize">{request.status}</Badge>
                          )}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {request.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs">Mineral</p>
                            <p className="font-medium">{request.mineralType}</p>
                          </div>
                          {request.quantity && (
                            <div>
                              <p className="text-muted-foreground text-xs">Quantity</p>
                              <p className="font-medium">{request.quantity}</p>
                            </div>
                          )}
                          {request.budget && (
                            <div className="col-span-2">
                              <p className="text-muted-foreground text-xs">Budget</p>
                              <p className="font-medium text-chart-3">{request.budget}</p>
                            </div>
                          )}
                        </div>
                        {request.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{request.location}</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            data-testid={`button-respond-${request.id}`}
                            onClick={() => handleRespondToRequest(request)}
                          >
                            Contact
                          </Button>
                          <Button
                            variant={expressedInterests.has(request.id) ? "secondary" : "outline"}
                            size="icon"
                            onClick={() => handleExpressInterest(request.id, 'rfq')}
                            disabled={expressInterestMutation.isPending || expressedInterests.has(request.id)}
                            data-testid={`button-interest-rfq-${request.id}`}
                            title={expressedInterests.has(request.id) ? "Expressed Interest" : "Express Interest"}
                          >
                            <Heart className={`h-4 w-4 ${expressedInterests.has(request.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Buyer Requests Found</h3>
                    <p className="text-muted-foreground">
                      Check back later for new requests
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="mining_equipment">
              {loadingListings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : filteredListings && filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="hover-elevate transition-all" data-testid={`card-equipment-${listing.id}`}>
                      <ImageDisplay
                        imageUrl={listing.imageUrl}
                        alt={listing.title}
                        fallbackImage={getEquipmentImage(listing)}
                      />
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl line-clamp-1">{listing.title}</CardTitle>
                            {listing.itemId && (
                              <Badge variant="secondary" className="uppercase text-xs">{listing.itemId}</Badge>
                            )}
                          </div>
                          <StatusBadge status={listing.status} />
                        </div>
                        <CardDescription className="line-clamp-2">
                          {listing.description}
                        </CardDescription>
                        {renderVerificationBadges(listing)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {listing.specificType && (
                            <div>
                              <p className="text-muted-foreground text-xs">Type</p>
                              <p className="font-medium">{listing.specificType}</p>
                            </div>
                          )}
                          {listing.price && (
                            <div>
                              <p className="text-muted-foreground text-xs">Price</p>
                              <p className="font-medium text-chart-3">{listing.price}</p>
                            </div>
                          )}
                          {listing.quantity && (
                            <div className="col-span-2">
                              <p className="text-muted-foreground text-xs">Quantity</p>
                              <p className="font-medium">{listing.quantity}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            data-testid={`button-contact-seller-${listing.id}`}
                            onClick={() => handleContactSeller(listing)}
                            disabled={loadingAdminContact}
                          >
                            {loadingAdminContact ? (
                              <><Spinner size="sm" className="mr-2" />Preparing...</>
                            ) : (
                              'Contact'
                            )}
                          </Button>
                          <Button
                            variant={expressedInterests.has(listing.id) ? "secondary" : "outline"}
                            size="icon"
                            onClick={() => handleExpressInterest(listing.id, 'listing')}
                            disabled={expressInterestMutation.isPending}
                            data-testid={`button-interest-equipment-${listing.id}`}
                            title={expressedInterests.has(listing.id) ? "Remove Bookmark" : "Save to Interests"}
                          >
                            <Heart className={`h-4 w-4 ${expressedInterests.has(listing.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Wrench className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Equipment Listings Found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or check back later
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="mining_services">
              {loadingListings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : filteredListings && filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="hover-elevate transition-all" data-testid={`card-service-${listing.id}`}>
                      <ImageDisplay
                        imageUrl={listing.imageUrl}
                        alt={listing.title}
                        fallbackImage={getEquipmentImage(listing)}
                      />
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl line-clamp-1">{listing.title}</CardTitle>
                            {listing.itemId && (
                              <Badge variant="secondary" className="uppercase text-xs">{listing.itemId}</Badge>
                            )}
                          </div>
                          <StatusBadge status={listing.status} />
                        </div>
                        <CardDescription className="line-clamp-2">
                          {listing.description}
                        </CardDescription>
                        {renderVerificationBadges(listing)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {listing.specificType && (
                            <div>
                              <p className="text-muted-foreground text-xs">Service Type</p>
                              <p className="font-medium">{listing.specificType}</p>
                            </div>
                          )}
                          {listing.price && (
                            <div>
                              <p className="text-muted-foreground text-xs">Price</p>
                              <p className="font-medium text-chart-3">{listing.price}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            data-testid={`button-contact-seller-${listing.id}`}
                            onClick={() => handleContactSeller(listing)}
                            disabled={loadingAdminContact}
                          >
                            {loadingAdminContact ? (
                              <><Spinner size="sm" className="mr-2" />Preparing...</>
                            ) : (
                              'Contact'
                            )}
                          </Button>
                          <Button
                            variant={expressedInterests.has(listing.id) ? "secondary" : "outline"}
                            size="icon"
                            onClick={() => handleExpressInterest(listing.id, 'listing')}
                            disabled={expressInterestMutation.isPending || expressedInterests.has(listing.id)}
                            data-testid={`button-interest-service-${listing.id}`}
                            title={expressedInterests.has(listing.id) ? "Saved to Interests" : "Save to Interests"}
                          >
                            <Heart className={`h-4 w-4 ${expressedInterests.has(listing.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Service Listings Found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or check back later
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="partnerships">
              {loadingListings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : partnershipsListings && partnershipsListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partnershipsListings.map((listing) => (
                    <Card key={listing.id} className="hover-elevate transition-all" data-testid={`card-partnership-${listing.id}`}>
                      <ImageDisplay
                        imageUrl={listing.imageUrl}
                        alt={listing.title}
                        fallbackImage={catalogueImg}
                      />
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl line-clamp-1">{listing.title}</CardTitle>
                            {listing.itemId && (
                              <Badge variant="secondary" className="uppercase text-xs">{listing.itemId}</Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="capitalize">{listing.type}</Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {listing.description}
                        </CardDescription>
                        {renderVerificationBadges(listing)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{listing.location}</span>
                          </div>
                          {listing.price && (
                            <div className="text-chart-3 font-bold mt-2">
                              {listing.price}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            data-testid={`button-contact-seller-${listing.id}`}
                            onClick={() => handleContactSeller(listing)}
                            disabled={loadingAdminContact}
                          >
                            {loadingAdminContact ? (
                              <><Spinner size="sm" className="mr-2" />Preparing...</>
                            ) : (
                              'Contact'
                            )}
                          </Button>
                          <Button
                            variant={expressedInterests.has(listing.id) ? "secondary" : "outline"}
                            size="icon"
                            onClick={() => handleExpressInterest(listing.id, 'listing')}
                            disabled={expressInterestMutation.isPending}
                            data-testid={`button-interest-partnership-${listing.id}`}
                            title={expressedInterests.has(listing.id) ? "Remove Bookmark" : "Save to Interests"}
                          >
                            <Heart className={`h-4 w-4 ${expressedInterests.has(listing.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Partnerships Found</h3>
                    <p className="text-muted-foreground">
                      Interested in joining forces? Check back later for new opportunities.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Message Dialog */}
      {selectedRecipient && (
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          recipientId={selectedRecipient.id}
          recipientName={selectedRecipient.name}
          recipientEmail={selectedRecipient.email}
          defaultSubject={selectedRecipient.subject}
          listingTitle={selectedRecipient.listingTitle}
          listingId={selectedRecipient.listingId}
        />
      )}
    </div>
  );
}
