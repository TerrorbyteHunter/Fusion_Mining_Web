// Marketplace portal with mineral listings, buyer requests, and partnerships
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageDialog } from "@/components/MessageDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { MarketplaceListing, BuyerRequest } from "@shared/schema";
import { 
  Search, 
  MapPin, 
  Package, 
  Users,
  Plus,
} from "lucide-react";
import Spinner from "@/components/Spinner";
import { Link } from "wouter";
import { ImageDisplay } from "@/components/ImageDisplay";
// image imports from repository attached_assets
import catalogueImg from "../../../attached_assets/files/catalogue.jpg";
import copper2Img from "../../../attached_assets/files/copper2.jpg";
import gold2Img from "../../../attached_assets/files/gold2.jpg";
import gold3Img from "../../../attached_assets/files/gold3.png";
import green2Img from "../../../attached_assets/files/green-emerald2.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Marketplace() {
  const { isAuthenticated, isSeller } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMineralType, setSelectedMineralType] = useState("all");
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

  // Fetch admin contact (public lightweight endpoint)
  const { data: adminContact, isLoading: loadingAdminContact } = useQuery<any>({
    queryKey: ['/api/admin/contact-user'],
  });

  const handleContactSeller = (listing: MarketplaceListing) => {
    if (!adminContact?.id) {
      toast({
        title: "Error",
        description: "Could not contact administrator. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setSelectedRecipient({
      id: adminContact.id,
      name: adminContact.name || 'Administrator',
      email: adminContact.email,
      subject: `Inquiry about: ${listing.title}`,
      listingTitle: listing.title,
      listingId: listing.id,
    });
    setMessageDialogOpen(true);
  };

  const handleRespondToRequest = (request: BuyerRequest) => {
    setSelectedRecipient({
      id: request.buyerId,
      subject: `Response to: ${request.title}`,
      listingTitle: request.title,
    });
    setMessageDialogOpen(true);
  };


  // Fetch listings
  const { data: listings, isLoading: loadingListings } = useQuery<MarketplaceListing[]>({
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

  const filteredListings = listings?.filter((listing) => {
    const matchesMineralType = selectedMineralType === "all" || listing.mineralType === selectedMineralType;
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMineralType && matchesSearch && listing.status === 'approved';
  });

  const filteredRequests = buyerRequests?.filter((request) => {
    const matchesMineralType = selectedMineralType === "all" || request.mineralType === selectedMineralType;
    const matchesSearch = !searchQuery || 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMineralType && matchesSearch && request.status === 'active';
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

      {/* Marketplace Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="minerals" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="minerals" data-testid="tab-minerals">
                <img src={gold3Img} className="mr-2 h-4 w-4 object-cover rounded" alt="minerals" />
                Minerals
              </TabsTrigger>
              <TabsTrigger value="requests" data-testid="tab-requests">
                <Package className="mr-2 h-4 w-4" />
                Requests
              </TabsTrigger>
              <TabsTrigger value="partnerships" data-testid="tab-partnerships">
                <Users className="mr-2 h-4 w-4" />
                Partnerships
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <Label htmlFor="search-marketplace">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-marketplace"
                    placeholder="Search listings..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-marketplace"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="mineral-type">Mineral Type</Label>
                <Select value={selectedMineralType} onValueChange={setSelectedMineralType}>
                  <SelectTrigger id="mineral-type" data-testid="select-mineral-type">
                    <SelectValue placeholder="All Minerals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Minerals</SelectItem>
                    <SelectItem value="Copper">Copper</SelectItem>
                    <SelectItem value="Emerald">Emerald</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Cobalt">Cobalt</SelectItem>
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
                  {filteredListings.filter(l => l.type === 'mineral').map((listing) => (
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
                        {contactedListings.has(listing.id) ? (
                          <div className="space-y-2">
                            <Badge variant="secondary" className="w-full justify-center py-2" data-testid={`badge-contacted-${listing.id}`}>
                              Already Contacted
                            </Badge>
                            <Button 
                              variant="outline"
                              className="w-full" 
                              data-testid={`button-contact-seller-${listing.id}`}
                              onClick={() => handleContactSeller(listing)}
                              disabled={loadingAdminContact}
                              title="Send another message"
                            >
                              {loadingAdminContact ? (
                                <>
                                  <Spinner size="sm" className="mr-2" />
                                  Preparing...
                                </>
                              ) : (
                                'Contact Again'
                              )}
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            className="w-full" 
                            data-testid={`button-contact-seller-${listing.id}`}
                            onClick={() => handleContactSeller(listing)}
                            disabled={loadingAdminContact}
                            title={loadingAdminContact ? 'Loading contact...' : undefined}
                          >
                            {loadingAdminContact ? (
                              <>
                                <Spinner size="sm" className="mr-2" />
                                Preparing...
                              </>
                            ) : (
                              'Contact Seller'
                            )}
                          </Button>
                        )}
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
                          <Badge variant="secondary">{request.status}</Badge>
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
                        <Button 
                          className="w-full" 
                          data-testid={`button-respond-${request.id}`}
                          onClick={() => handleRespondToRequest(request)}
                        >
                          Respond to Request
                        </Button>
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

            <TabsContent value="partnerships">
              {loadingListings ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : filteredListings && filteredListings.filter(l => l.type === 'partnership').length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredListings.filter(l => l.type === 'partnership').map((listing) => (
                    <Card key={listing.id} className="hover-elevate transition-all" data-testid={`card-partnership-${listing.id}`}>
                      <CardHeader>
                          <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{listing.title}</CardTitle>
                            {listing.itemId && (
                              <Badge variant="secondary" className="uppercase text-xs">{listing.itemId}</Badge>
                            )}
                          </div>
                          <StatusBadge status={listing.status} />
                        </div>
                        <CardDescription className="line-clamp-3">
                          {listing.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{listing.location}</span>
                        </div>
                        <Button 
                          className="w-full" 
                          data-testid={`button-learn-partnership-${listing.id}`}
                          onClick={() => handleContactSeller(listing)}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Partnership Opportunities</h3>
                    <p className="text-muted-foreground">
                      Check back later for new partnerships
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
        />
      )}
    </div>
  );
}
