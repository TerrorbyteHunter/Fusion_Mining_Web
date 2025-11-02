// Category browsing page for hierarchical navigation
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowRight, 
  Search, 
  MapPin,
  Gem,
  Wrench,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import type { MarketplaceListing } from "@shared/schema";
import { 
  MAIN_CATEGORIES, 
  getSubcategoriesForMain 
} from "@shared/categories";
import { ImageDisplay } from "@/components/ImageDisplay";

const iconMap: Record<string, any> = {
  gem: Gem,
  wrench: Wrench,
  briefcase: Briefcase,
  shield: ShieldCheck,
};

export default function CategoryBrowse() {
  const [, params] = useRoute("/categories/:mainCategory/:subcategory?");
  const mainCategory = params?.mainCategory;
  const subcategory = params?.subcategory;
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all listings
  const { data: listings, isLoading } = useQuery<MarketplaceListing[]>({
    queryKey: ["/api/marketplace/listings"],
  });

  // Filter listings based on category and search
  const filteredListings = listings?.filter((listing) => {
    if (listing.status !== 'approved') return false;
    
    // Filter by main category
    if (mainCategory && listing.mainCategory !== mainCategory) return false;

    // Filter by subcategory if provided
    if (subcategory) {
      const matchesSubcategory = 
        listing.mineralSubcategory === subcategory ||
        listing.toolSubcategory === subcategory ||
        listing.serviceSubcategory === subcategory ||
        listing.ppeSubcategory === subcategory;
      if (!matchesSubcategory) return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        (listing.title?.toLowerCase() ?? '').includes(query) ||
        (listing.description?.toLowerCase() ?? '').includes(query) ||
        (listing.specificType?.toLowerCase() ?? '').includes(query) ||
        (listing.mineralType?.toLowerCase() ?? '').includes(query)
      );
    }

    return true;
  });

  if (!mainCategory) {
    return <div>Invalid category</div>;
  }

  const categoryInfo = Object.values(MAIN_CATEGORIES).find(
    (cat) => cat.value === mainCategory
  );

  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  const IconComponent = iconMap[categoryInfo.icon] || Gem;
  const subcategories = getSubcategoriesForMain(mainCategory);
  const subcategoryInfo = subcategory 
    ? Object.values(subcategories).find((sub: any) => sub.value === subcategory)
    : null;

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="py-12 border-b bg-card/50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-4 text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:text-foreground">Marketplace</Link>
            <span>/</span>
            <Link href={`/categories/${mainCategory}`} className="hover:text-foreground">
              {categoryInfo.label}
            </Link>
            {subcategoryInfo && typeof subcategoryInfo === 'object' && 'label' in subcategoryInfo ? (
              <>
                <span>/</span>
                <span className="text-foreground">{subcategoryInfo.label as string}</span>
              </>
            ) : null}
          </nav>

          {/* Title and Description */}
          <div className="flex items-center gap-4 mb-4">
            <IconComponent className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-4xl font-bold font-display" data-testid="text-category-title">
                {subcategoryInfo ? (subcategoryInfo as any).label : categoryInfo.label}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                {subcategoryInfo ? `Browse ${(subcategoryInfo as any).label.toLowerCase()}` : categoryInfo.description}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search within category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-category-search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories Section - only show if on main category page */}
      {!subcategory && Object.keys(subcategories).length > 0 && (
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold font-display mb-6">Subcategories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(subcategories).map((subcat: any) => {
                const subcatListingCount = listings?.filter((l) => 
                  l.status === 'approved' && (
                    l.mineralSubcategory === subcat.value ||
                    l.toolSubcategory === subcat.value ||
                    l.serviceSubcategory === subcat.value ||
                    l.ppeSubcategory === subcat.value
                  )
                ).length || 0;

                return (
                  <Link 
                    key={subcat.value} 
                    href={`/categories/${mainCategory}/${subcat.value}`}
                  >
                    <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer h-full" data-testid={`card-subcategory-${subcat.value}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {subcat.label}
                          <ArrowRight className="h-5 w-5 text-primary" />
                        </CardTitle>
                        <CardDescription>
                          {subcatListingCount} listing{subcatListingCount !== 1 ? 's' : ''}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display">
              {filteredListings?.length || 0} Listings
            </h2>
            {!subcategory && (
              <Button asChild variant="outline">
                <Link href="/marketplace">View All Categories</Link>
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-40 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredListings && filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="hover-elevate active-elevate-2 overflow-hidden" data-testid={`card-listing-${listing.id}`}>
                  {listing.imageUrl && (
                    <div className="relative h-48 bg-muted">
                      <ImageDisplay 
                        imageUrl={listing.imageUrl} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                      <Badge variant="secondary" className="capitalize">
                        {listing.type}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {listing.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {listing.specificType && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">{listing.specificType}</Badge>
                        </div>
                      )}
                      {(listing.mineralType || listing.quantity || listing.price) && (
                        <div className="text-sm text-muted-foreground space-y-1">
                          {listing.mineralType && (
                            <div>Type: {listing.mineralType}</div>
                          )}
                          {listing.quantity && (
                            <div>Quantity: {listing.quantity}</div>
                          )}
                          {listing.price && (
                            <div className="font-semibold text-foreground">
                              {listing.price}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                        <MapPin className="h-4 w-4" />
                        {listing.location}
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4" data-testid={`button-view-listing-${listing.id}`}>
                      <Link href="/marketplace">View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No listings found in this category.
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/marketplace">Browse All Listings</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
