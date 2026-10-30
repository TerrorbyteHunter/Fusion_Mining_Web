// Landing page with hero, category cards, latest RFQs, and video
import { useEffect } from "react";
import { Link } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mountain, 
  HandshakeIcon, 
  Gem, 
  Shield, 
  ArrowRight,
  Boxes,
  Wrench,
  Briefcase,
  CheckCircle2,
  ShoppingCart,
  Package,
  BadgeCheck,
  Bookmark,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  MapPin,
  Share2
} from "lucide-react";
import { format } from "date-fns";
import heroImage from "@assets/generated_images/Zambian_copper_mining_operation_aerial_46e06322.png";
import mineralsImg from "@assets/stock_images/mining_minerals_copp_a83cbefb.jpg";
import toolsImg from "@assets/stock_images/mining_heavy_equipme_90ded174.jpg";
import servicesImg from "@assets/stock_images/mining_engineer_serv_7e4e30bf.jpg";
import type { Video, BuyerRequestWithBuyer } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

function LatestRFQCard({ rfq, index }: { rfq: BuyerRequestWithBuyer; index: number }) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const requestHref = `/marketplace?tab=requests&requestId=${rfq.id}`;
  const interestQueryKey = ["/api/projects", rfq.id, "has-interest"];
  const interestQuery = useQuery<boolean>({
    queryKey: interestQueryKey,
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/projects/${rfq.id}/has-interest`);
      const data = await response.json() as { hasInterest?: boolean };
      if (typeof data.hasInterest !== "boolean") {
        throw new Error("The bookmark status response was invalid.");
      }
      return data.hasInterest;
    },
    enabled: isAuthenticated,
  });
  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/projects/interest", { buyerRequestId: rfq.id });
      const data = await response.json() as { bookmarked?: boolean };
      return data.bookmarked ?? true;
    },
    onSuccess: (bookmarked) => {
      queryClient.setQueryData(interestQueryKey, bookmarked);
      toast({
        title: bookmarked ? "RFQ bookmarked" : "Bookmark removed",
        description: bookmarked ? "You can find this request in your saved items." : "This request was removed from your saved items.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        window.location.href = "/api/login";
        return;
      }
      toast({
        title: "Unable to update bookmark",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (interestQuery.error) {
      toast({
        title: "Unable to load bookmark status",
        description: interestQuery.error.message || "Please try again.",
        variant: "destructive",
      });
    }
  }, [interestQuery.error, toast]);

  const commodityName = rfq.specificType || rfq.mineralType || rfq.title;
  const buyerName = [rfq.buyer?.firstName, rfq.buyer?.lastName].filter(Boolean).join(" ") || "Buyer on Fusion";
  const buyerIsVerified = Boolean(rfq.buyer?.verified);
  const rfqIsVerified = Boolean(rfq.verified);
  const thumbnail = rfq.mainCategory === "mining_equipment" || rfq.mainCategory === "mining_tools" || rfq.mainCategory === "mining_ppe"
    ? toolsImg
    : rfq.mainCategory === "mining_services"
      ? servicesImg
      : mineralsImg;
  const createdAt = new Date(rfq.createdAt);
  const ageInHours = (Date.now() - createdAt.getTime()) / (60 * 60 * 1000);
  const expiryAt = rfq.expiryDate ? new Date(rfq.expiryDate) : null;
  const isNew = Number.isFinite(ageInHours) && ageInHours >= 0 && ageInHours <= 48;
  const isUrgent = Boolean(
    expiryAt &&
    expiryAt.getTime() > Date.now() &&
    expiryAt.getTime() - Date.now() <= 7 * 24 * 60 * 60 * 1000
  );
  const isBookmarked = interestQuery.data ?? false;

  const shareRequest = async () => {
    const url = new URL(requestHref, window.location.origin).toString();
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: commodityName, url });
        return;
      }
      if (!navigator.clipboard?.writeText) {
        throw new Error("Sharing is not supported by this browser.");
      }
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "The RFQ link is ready to share." });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      toast({
        title: "Unable to share this RFQ",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className="group/rfq relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-700/30 hover:shadow-lg focus-within:border-amber-700/30"
      data-testid={`card-rfq-${index}`}
    >
      <Link
        href={requestHref}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-700"
        aria-label={`View ${commodityName} RFQ`}
      />
      <CardContent className="relative z-10 flex flex-1 pointer-events-none flex-col gap-3 p-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={thumbnail}
            alt=""
            className="h-[100px] w-[100px] shrink-0 rounded-lg border border-border/70 bg-muted object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <CardTitle className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight">
                {commodityName}
              </CardTitle>
              {rfqIsVerified && (
                <Badge className="shrink-0 gap-1 border-amber-700/15 bg-amber-100 px-1.5 py-0 text-[9px] text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                  <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                  Verified RFQ
                </Badge>
              )}
            </div>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {buyerName}
              {buyerIsVerified && (
                <span className="ml-1.5 inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  Verified Buyer
                </span>
              )}
            </p>
            <p className="mt-1 line-clamp-1 text-xs leading-4 text-muted-foreground transition-all group-hover/rfq:line-clamp-3 group-focus-within/rfq:line-clamp-3">
              {rfq.description}
            </p>
          </div>
        </div>

        <div className="flex min-h-5 flex-wrap items-center gap-1.5">
          {isNew && (
            <Badge className="border-emerald-700/10 bg-emerald-100 px-1.5 py-0 text-[9px] text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              New
            </Badge>
          )}
          {isUrgent && (
            <Badge className="border-rose-700/10 bg-rose-100 px-1.5 py-0 text-[9px] text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              <Clock3 className="mr-1 h-3 w-3" aria-hidden="true" />
              Urgent
            </Badge>
          )}
          <span className="ml-auto truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {rfq.mainCategory?.replace(/_/g, " ") || "Mineral request"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border/60 pt-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <Boxes className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <span className="shrink-0 text-[10px] text-muted-foreground">Quantity</span>
            <span className="min-w-0 truncate text-xs font-medium">{rfq.quantity || "Not specified"}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5">
            <CircleDollarSign className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <span className="shrink-0 text-[10px] text-muted-foreground">Budget</span>
            <span className="min-w-0 truncate text-xs font-medium text-emerald-700 dark:text-emerald-400">{rfq.budget || "Not specified"}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <span className="shrink-0 text-[10px] text-muted-foreground">Location</span>
            <span className="min-w-0 truncate text-xs font-medium">{rfq.location || rfq.country || "Not specified"}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <span className="shrink-0 text-[10px] text-muted-foreground">Requested</span>
            <span className="min-w-0 truncate text-xs font-medium">
              {Number.isFinite(createdAt.getTime()) ? format(createdAt, "MMM d, yyyy") : "Unavailable"}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-2">
          <Button asChild size="sm" className="pointer-events-auto h-8 min-h-8 min-w-0 flex-1 px-3 text-xs">
            <Link href={requestHref}>
              Respond
            </Link>
          </Button>
          <Button
            type="button"
            variant={isBookmarked ? "secondary" : "outline"}
            size="icon"
            className="pointer-events-auto h-8 w-8"
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark RFQ"}
            aria-pressed={isBookmarked}
            title={isBookmarked ? "Remove bookmark" : "Bookmark RFQ"}
            disabled={bookmarkMutation.isPending || interestQuery.isLoading}
            onClick={() => {
              if (!isAuthenticated) {
                window.location.href = "/api/login";
                return;
              }
              bookmarkMutation.mutate();
            }}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current text-primary" : ""}`} aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="pointer-events-auto h-8 w-8"
            aria-label="Share RFQ"
            title="Share RFQ"
            onClick={() => void shareRequest()}
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Convert YouTube URL to embed format
function getEmbedUrl(url: string): string {
  // Already an embed URL
  if (url.includes('youtube.com/embed/') || url.includes('youtu.be/embed/')) {
    return url;
  }
  
  // Extract video ID from various YouTube URL formats
  let videoId = '';
  
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch?v=')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v') || '';
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split(/[?&]/)[0] || '';
  }
  // Format: https://www.youtube.com/v/VIDEO_ID
  else if (url.includes('youtube.com/v/')) {
    videoId = url.split('youtube.com/v/')[1]?.split(/[?&]/)[0] || '';
  }
  
  // Return embed URL if we found a video ID, otherwise return original URL
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default function Landing() {
  const { t } = useLanguage();
  
  const categoryCards = [
    {
      title: t('categories.minerals'),
      description: t('categories.minerals.desc'),
      icon: Gem,
      image: mineralsImg,
      href: "/marketplace?category=minerals",
      color: "text-chart-1"
    },
    {
      title: t('categories.equipment'),
      description: t('categories.equipment.desc'),
      icon: Wrench,
      image: toolsImg,
      href: "/marketplace?category=mining_equipment",
      color: "text-chart-2"
    },
    {
      title: t('categories.services'),
      description: t('categories.services.desc'),
      icon: Briefcase,
      image: servicesImg,
      href: "/marketplace?category=mining_services",
      color: "text-chart-3"
    },
  ];

  const { data: platformStats } = useQuery<{ activeProjects: number; verifiedPartners: number; mineralsTraded: number; successRate: string }>({
    queryKey: ["/api/platform-stats"],
  });

  const stats = [
    { label: t('stats.activeProjects'), value: platformStats ? `${platformStats.activeProjects}+` : "50+", icon: Mountain },
    { label: t('stats.verifiedPartners'), value: platformStats ? `${platformStats.verifiedPartners}+` : "200+", icon: HandshakeIcon },
    { label: t('stats.mineralsTraded'), value: platformStats ? `${platformStats.mineralsTraded}+` : "15+", icon: Gem },
    { label: t('stats.successRate'), value: platformStats?.successRate || "98%", icon: Shield },
  ];
  const { data: activeVideos } = useQuery<Video[]>({
    queryKey: ["/api/videos/active"],
  });

  const { data: latestRFQs } = useQuery<BuyerRequestWithBuyer[]>({
    queryKey: ["/api/buyer-requests/latest"],
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4" data-testid="text-hero-title">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-buy-minerals"
              >
                <Link href="/marketplace">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t('hero.buy')}
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-sell-minerals"
              >
                <Link href="/login">
                  <Package className="mr-2 h-5 w-5" />
                  {t('hero.sell')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card/50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl md:text-4xl font-bold font-display mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              {t('categories.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categoryCards.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="hover-elevate active-elevate-2 h-full transition-all cursor-pointer overflow-hidden group" data-testid={`card-category-${index}`}>
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <category.icon className={`absolute bottom-3 right-3 h-8 w-8 text-white ${category.color}`} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest RFQs Section */}
      {latestRFQs && latestRFQs.length > 0 && (
        <section className="py-16 bg-card/50 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                {t('rfq.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('rfq.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {latestRFQs.slice(0, 6).map((rfq, index) => (
                <LatestRFQCard key={rfq.id} rfq={rfq} index={index} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg" data-testid="button-view-all-rfqs">
                <Link href="/marketplace?tab=requests">
                  {t('rfq.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {activeVideos && activeVideos.length > 0 && (
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                {t('video.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('video.subtitle')}
              </p>
            </div>

            <div className={`grid gap-6 ${
              activeVideos.length === 1 
                ? 'max-w-4xl mx-auto' 
                : activeVideos.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
            }`}>
              {activeVideos.map((video, index) => (
                <Card key={video.id} className="overflow-hidden" data-testid={`video-card-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">{video.title}</CardTitle>
                    {video.description && (
                      <CardDescription>{video.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-muted">
                      <iframe
                        src={getEmbedUrl(video.videoUrl)}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        data-testid={`video-player-${index}`}
                        title={video.title || `Video ${index + 1}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold font-display mb-4">
                {t('cta.title')}
              </CardTitle>
              <CardDescription className="text-lg">
                {t('cta.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button 
                asChild 
                size="lg"
                data-testid="button-cta-signup"
              >
                <a href="/api/login">
                  Create Account
                </a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                data-testid="button-cta-learn-more"
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
