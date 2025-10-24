// Projects page with interactive map and project cards
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { StatusBadge } from "@/components/StatusBadge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Project } from "@shared/schema";
import { 
  MapPin, 
  FileText, 
  Gem, 
  Search, 
  Heart,
  ArrowRight
} from "lucide-react";
import { ZambiaMap } from "@/components/ZambiaMap";
import { ImageDisplay } from "@/components/ImageDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Projects() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedMineral, setSelectedMineral] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expressedInterests, setExpressedInterests] = useState<Set<string>>(new Set());

  // Fetch projects
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Check for expressed interests when projects load
  useEffect(() => {
    const checkInterests = async () => {
      if (!isAuthenticated || !projects) return;
      
      const interests = new Set<string>();
      for (const project of projects) {
        try {
          const response = await fetch(`/api/projects/${project.id}/has-interest`, {
            credentials: 'include',
          });
          const data = await response.json();
          if (data.hasInterest) {
            interests.add(project.id);
          }
        } catch (error) {
          console.error('Error checking interest:', error);
        }
      }
      setExpressedInterests(interests);
    };
    
    checkInterests();
  }, [projects, isAuthenticated]);

  // Express interest mutation
  const expressInterestMutation = useMutation({
    mutationFn: async (projectId: string) => {
      return await apiRequest("POST", "/api/projects/interest", { projectId });
    },
    onSuccess: (_, projectId) => {
      setExpressedInterests(prev => new Set(prev).add(projectId));
      toast({
        title: "Interest Expressed",
        description: "Your interest has been recorded. We'll be in touch soon!",
      });
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

  const handleExpressInterest = (projectId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to express interest in projects",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }
    expressInterestMutation.mutate(projectId);
  };

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const matchesRegion = selectedRegion === "all" || project.location === selectedRegion;
    const matchesMineral = selectedMineral === "all" || project.minerals.includes(selectedMineral);
    const matchesSearch = !searchQuery || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesMineral && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6" data-testid="text-page-title">
              Explore Mining Projects
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover active mining opportunities across Zambia's mineral-rich regions
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Interactive Zambia Map</h2>
            <p className="text-muted-foreground">Click on regions to filter projects</p>
          </div>
          <ZambiaMap 
            onRegionClick={(region) => setSelectedRegion(region)} 
            selectedRegion={selectedRegion === "all" ? undefined : selectedRegion}
          />
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Projects</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or description..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-projects"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="region">Filter by Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger id="region" data-testid="select-region">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Copperbelt">Copperbelt</SelectItem>
                  <SelectItem value="Northern Province">Northern Province</SelectItem>
                  <SelectItem value="Luapula Province">Luapula Province</SelectItem>
                  <SelectItem value="Central Province">Central Province</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mineral">Filter by Mineral</Label>
              <Select value={selectedMineral} onValueChange={setSelectedMineral}>
                <SelectTrigger id="mineral" data-testid="select-mineral">
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
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
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
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover-elevate transition-all" data-testid={`card-project-${project.id}`}>
                  <ImageDisplay 
                    imageUrl={project.imageUrl}
                    alt={project.name}
                    fallbackIcon={Gem}
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl line-clamp-1">{project.name}</CardTitle>
                      <StatusBadge status={project.status} />
                    </div>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span className="capitalize">{project.licenseType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.minerals.map((mineral, idx) => (
                        <Badge key={idx} variant="secondary">
                          {mineral}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleExpressInterest(project.id)}
                      disabled={expressInterestMutation.isPending || expressedInterests.has(project.id)}
                      variant={expressedInterests.has(project.id) ? "secondary" : "default"}
                      data-testid={`button-express-interest-${project.id}`}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${expressedInterests.has(project.id) ? 'fill-current' : ''}`} />
                      {expressedInterests.has(project.id) ? 'Interest Expressed' : 'Express Interest'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Gem className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedRegion || selectedMineral
                    ? "Try adjusting your filters to see more results"
                    : "Check back soon for new opportunities"}
                </p>
                {(searchQuery || selectedRegion !== "all" || selectedMineral !== "all") && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedRegion("all");
                      setSelectedMineral("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
