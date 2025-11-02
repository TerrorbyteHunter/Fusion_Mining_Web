// Landing page with hero, category cards, latest RFQs, and video
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mountain, 
  HandshakeIcon, 
  Gem, 
  Shield, 
  ArrowRight,
  Wrench,
  Briefcase,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { format } from "date-fns";
import heroImage from "@assets/generated_images/Zambian_copper_mining_operation_aerial_46e06322.png";
import mineralsImg from "@assets/stock_images/mining_minerals_copp_a83cbefb.jpg";
import toolsImg from "@assets/stock_images/mining_heavy_equipme_90ded174.jpg";
import servicesImg from "@assets/stock_images/mining_engineer_serv_7e4e30bf.jpg";
import ppeImg from "@assets/stock_images/mining_safety_helmet_b557deed.jpg";
import type { Video, BuyerRequest } from "@shared/schema";

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

const categoryCards = [
  {
    title: "Minerals",
    description: "Metallic and non-metallic minerals, natural stones",
    icon: Gem,
    image: mineralsImg,
    href: "/marketplace?category=minerals",
    color: "text-chart-1"
  },
  {
    title: "Mining Tools",
    description: "Equipment and machinery for mining operations",
    icon: Wrench,
    image: toolsImg,
    href: "/marketplace?category=mining_tools",
    color: "text-chart-2"
  },
  {
    title: "Mining & Engineering Services",
    description: "Professional services for mining operations",
    icon: Briefcase,
    image: servicesImg,
    href: "/marketplace?category=mining_services",
    color: "text-chart-3"
  },
  {
    title: "Mining PPE",
    description: "Personal Protective Equipment for mining safety",
    icon: ShieldCheck,
    image: ppeImg,
    href: "/marketplace?category=mining_ppe",
    color: "text-chart-4"
  },
];

const stats = [
  { label: "Active Projects", value: "50+", icon: Mountain },
  { label: "Verified Partners", value: "200+", icon: HandshakeIcon },
  { label: "Minerals Traded", value: "15+", icon: Gem },
  { label: "Success Rate", value: "98%", icon: Shield },
];

export default function Landing() {
  const { data: activeVideos } = useQuery<Video[]>({
    queryKey: ["/api/videos/active"],
  });

  const { data: latestRFQs } = useQuery<BuyerRequest[]>({
    queryKey: ["/api/buyer-requests/latest"],
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6" data-testid="text-hero-title">
              Unlock Zambia's Mining Potential
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Connect with investors, trade minerals, and build partnerships in Africa's premier mining marketplace.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-get-started"
              >
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-explore-projects"
              >
                <Link href="/projects">
                  Explore Projects
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
              All Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive marketplace for mining minerals, equipment, services, and safety gear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                Latest RFQs
              </h2>
              <p className="text-lg text-muted-foreground">
                Recent requests for quotation from verified buyers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {latestRFQs.slice(0, 6).map((rfq, index) => (
                <Link key={rfq.id} href={`/marketplace?tab=requests`}>
                  <Card className="hover-elevate active-elevate-2 h-full transition-all cursor-pointer" data-testid={`card-rfq-${index}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {rfq.country && (
                            <img
                              src={`https://flagsapi.com/${rfq.country}/flat/24.png`}
                              alt={rfq.country}
                              className="w-6 h-4 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                          <CardTitle className="text-base line-clamp-1">{rfq.title}</CardTitle>
                        </div>
                        {rfq.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">{rfq.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{rfq.mineralType || rfq.specificType || 'Various'}</span>
                        <span>{format(new Date(rfq.createdAt), 'yyyy/MM/dd')}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg" data-testid="button-view-all-rfqs">
                <Link href="/marketplace?tab=requests">
                  View All RFQs
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
                Discover Our Impact
              </h2>
              <p className="text-lg text-muted-foreground">
                Watch our latest videos showcasing Zambia's mining potential
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
                Ready to Start Your Mining Journey?
              </CardTitle>
              <CardDescription className="text-lg">
                Join hundreds of successful investors and traders on our platform
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
