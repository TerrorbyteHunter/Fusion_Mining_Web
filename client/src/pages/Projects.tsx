// Projects page with interactive map and project cards
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MessageDialog } from "@/components/MessageDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { StatusBadge } from "@/components/StatusBadge";
import { apiRequest } from "@/lib/queryClient";
import type { ProjectWithOwner } from "@shared/schema";
import {
  MapPin,
  FileText,
  Search,
  Heart,
  MessageCircle,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  Gem,
  Share2
} from "lucide-react";
import { MiningOperationsMap } from "@/components/MiningOperationsMap";
import { ImageDisplay } from "@/components/ImageDisplay";
// image imports from repository attached_assets
import catalogueImg from "../../../attached_assets/files/catalogue.jpg";
import copper1Img from "../../../attached_assets/files/copper1.jpg";
import gold1Img from "../../../attached_assets/files/gold1.jpg";
import green1Img from "../../../attached_assets/files/green-emerald1.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/Spinner";
void 0; // Suppress "unused import" warnings - dialog feature planned for future use
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";

export default function Projects() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedMineral, setSelectedMineral] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expressedInterests, setExpressedInterests] = useState<Set<string>>(new Set());
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: string;
    name?: string;
    email?: string;
    subject?: string;
    projectTitle?: string;
    projectId?: string;
  } | null>(null);

  // Fetch projects
  const { data: projects, isLoading: loadingProjects } = useQuery<ProjectWithOwner[]>({
    queryKey: ["/api/projects"],
  });

  // Fetch platform contact settings (for fallback)
  const { data: adminSettings, isLoading: loadingAdminContact } = useQuery<any>({
    queryKey: ['/api/contact/settings'],
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
      const res = await apiRequest("POST", "/api/projects/interest", { projectId });
      return { projectId, data: await res.json() };
    },
    onSuccess: ({ projectId, data }) => {
      setExpressedInterests(prev => {
        const next = new Set(prev);
        if (data.bookmarked === false) {
          next.delete(projectId);
        } else {
          next.add(projectId);
        }
        return next;
      });

      toast({
        title: data.bookmarked === false ? "Bookmark Removed" : "Project Bookmarked",
        description: data.bookmarked === false ? "Project removed from your saved items." : "This project has been added to your saved items.",
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

  // Contact seller mutation (creates a new thread)
  const contactSellerMutation = useMutation({
    mutationFn: async (projectId: string) => {
      return await apiRequest("POST", "/api/threads", { projectId });
    },
    onSuccess: () => {
      toast({
        title: "Thread Created",
        description: "You can now message about this project",
      });
      window.location.href = "/dashboard/messages";
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
        description: "Failed to create conversation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleExpressInterest = (projectId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to bookmark projects",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }
    expressInterestMutation.mutate(projectId);
  };

  const handleContactSeller = (project: ProjectWithOwner) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to contact about projects",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    const recipientId = project.ownerId || project.owner?.id;
    const recipientName = project.owner
      ? `${project.owner.firstName || ''} ${project.owner.lastName || ''}`.trim() || 'Owner'
      : adminSettings?.email || 'Administrator';
    const recipientEmail = project.owner?.email || adminSettings?.supportEmail;

    if (!recipientId) {
      toast({
        title: "Error",
        description: "Could not contact project owner. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setSelectedRecipient({
      id: recipientId,
      name: recipientName,
      email: recipientEmail || '',
      subject: `Inquiry about: ${project.name}`,
      projectTitle: project.name,
      projectId: project.id,
    });
    setMessageDialogOpen(true);
  };

  const shareProject = async (project: ProjectWithOwner) => {
    const url = new URL(`/projects/${encodeURIComponent(project.id)}`, window.location.origin).toString();
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: project.name, url });
        return;
      }
      if (!navigator.clipboard?.writeText) throw new Error("Sharing is not supported by this browser.");
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "The project link is ready to share." });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      toast({
        title: "Unable to share this project",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const normalizeLoc = (loc: string) => loc.toLowerCase().replace(" province", "").trim();
    const matchesRegion = selectedRegion === "all" ||
      normalizeLoc(project.location) === normalizeLoc(selectedRegion);
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

      {/* Loading Skeleton */}
      {loadingProjects && (
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        </div>
      )}

      {/* Interactive Mining Operations Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Interactive Zambia Map
            </h2>
            <p className="text-slate-500 text-sm">
              Click on regions to filter projects
            </p>
          </div>
          <MiningOperationsMap
            projects={filteredProjects}
            onProjectClick={(project) => setLocation(`/projects/${encodeURIComponent(project.id)}`)}
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
                  <SelectItem value="Lusaka">Lusaka</SelectItem>
                  <SelectItem value="Central Province">Central Province</SelectItem>
                  <SelectItem value="Eastern Province">Eastern Province</SelectItem>
                  <SelectItem value="Copperbelt Province">Copperbelt Province</SelectItem>
                  <SelectItem value="Muchinga Province">Muchinga Province</SelectItem>
                  <SelectItem value="Northern Province">Northern Province</SelectItem>
                  <SelectItem value="Luapula Province">Luapula Province</SelectItem>
                  <SelectItem value="Southern Province">Southern Province</SelectItem>
                  <SelectItem value="North-Western Province">North-Western Province</SelectItem>
                  <SelectItem value="Western Province">Western Province</SelectItem>
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
                  <SelectItem value="Cobalt">Cobalt</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Emerald">Emerald</SelectItem>
                  <SelectItem value="Manganese">Manganese</SelectItem>
                  <SelectItem value="Aquamarine">Aquamarine</SelectItem>
                  <SelectItem value="Tourmaline">Tourmaline</SelectItem>
                  <SelectItem value="Amethyst">Amethyst</SelectItem>
                  <SelectItem value="Uranium">Uranium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loadingProjects ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-[120px] w-[120px] shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group/project relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-700/30 hover:shadow-lg"
                  data-testid={`card-project-${project.id}`}
                >
                  <Link
                    href={`/projects/${encodeURIComponent(project.id)}`}
                    className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
                    aria-label={`View project ${project.name}`}
                  >
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center bg-gradient-to-t from-black/70 to-transparent py-5 pt-12 text-sm font-medium text-white opacity-0 transition-all group-hover/project:translate-y-0 group-hover/project:opacity-100">
                      View project details
                    </span>
                  </Link>
                  <CardContent className="pointer-events-none relative z-20 flex flex-1 flex-col gap-4 p-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <ImageDisplay
                        imageUrl={project.imageUrls?.[0] || project.imageUrl}
                        alt={project.name}
                        fallbackImage={
                          project.minerals && project.minerals.length > 0
                            ? (function getMineralImage(mineral: string) {
                              const m = mineral.toLowerCase();
                              if (m.includes('copper')) return copper1Img;
                              if (m.includes('gold')) return gold1Img;
                              if (m.includes('emerald') || m.includes('green')) return green1Img;
                              return catalogueImg;
                            })(project.minerals[0])
                            : catalogueImg
                        }
                        className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg border border-border/70 bg-muted"
                        iconClassName="h-12 w-12"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2">
                          <CardTitle className="min-w-0 flex-1 truncate text-lg font-semibold tracking-tight">
                            {project.name}
                          </CardTitle>
                          {project.itemId && (
                            <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                              #{project.itemId}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground" data-testid={`text-owner-${project.id}`}>
                          <span className="truncate">
                            {project.owner
                              ? `${project.owner.firstName || ""} ${project.owner.lastName || ""}`.trim() || "Project owner"
                              : "Project owner"}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground transition-all group-hover/project:line-clamp-4">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-h-6 flex-wrap items-center gap-2">
                      <StatusBadge status={project.status} />
                      {project.owner?.verified && (
                        <Badge className="gap-1 border-emerald-700/15 bg-emerald-100 px-2 py-0 text-[10px] text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <BadgeCheck className="h-3 w-3" aria-hidden="true" data-testid={`badge-verified-${project.id}`} />
                          Verified Owner
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        <span className="shrink-0 text-xs text-muted-foreground">License</span>
                        <span className="min-w-0 truncate text-sm font-medium capitalize">{project.licenseType.replace(/_/g, " ")}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        <span className="shrink-0 text-xs text-muted-foreground">Location</span>
                        <span className="min-w-0 truncate text-sm font-medium">{project.location}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2">
                        <Gem className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        <span className="shrink-0 text-xs text-muted-foreground">Minerals</span>
                        <span className="min-w-0 truncate text-sm font-medium">{project.minerals.join(", ") || "Not specified"}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2">
                        <Boxes className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        <span className="shrink-0 text-xs text-muted-foreground">Area</span>
                        <span className="min-w-0 truncate text-sm font-medium">{project.area || "Not specified"}</span>
                      </div>
                      <div className="col-span-2 flex min-w-0 items-center gap-2">
                        <CircleDollarSign className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        <span className="shrink-0 text-xs text-muted-foreground">Estimated value</span>
                        <span className="min-w-0 truncate text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                          {project.estimatedValue || "Contact owner"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-3">
                      <Button
                        className="h-9 min-h-9 min-w-0 flex-1 px-3 text-sm"
                        variant="default"
                        style={{ pointerEvents: "auto" }}
                        onClick={() => handleContactSeller(project)}
                        disabled={contactSellerMutation.isPending || loadingAdminContact}
                        data-testid={`button-contact-seller-${project.id}`}
                      >
                        {contactSellerMutation.isPending || loadingAdminContact ? (
                          <>
                            <Spinner size="sm" className="mr-2" />
                            {loadingAdminContact ? 'Preparing...' : 'Connecting...'}
                          </>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Contact
                          </>
                        )}
                      </Button>
                      <Button
                        variant={expressedInterests.has(project.id) ? "secondary" : "outline"}
                        size="icon"
                        className="h-9 w-9"
                        style={{ pointerEvents: "auto" }}
                        onClick={() => handleExpressInterest(project.id)}
                        disabled={expressInterestMutation.isPending}
                        data-testid={`button-express-interest-${project.id}`}
                        title={expressedInterests.has(project.id) ? "Remove Bookmark" : "Bookmark Project"}
                        aria-label={expressedInterests.has(project.id) ? "Remove project bookmark" : "Bookmark project"}
                      >
                        <Heart className={`h-4 w-4 ${expressedInterests.has(project.id) ? 'fill-current text-red-500' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        style={{ pointerEvents: "auto" }}
                        onClick={() => void shareProject(project)}
                        aria-label="Share project"
                        title="Share project"
                        data-testid={`button-share-project-${project.id}`}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <img src={catalogueImg} className="h-24 w-24 mx-auto mb-4 object-cover rounded" alt="no-projects" />
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

      {/* Message Dialog */}
      {selectedRecipient && (
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          recipientId={selectedRecipient.id}
          recipientName={selectedRecipient.name}
          recipientEmail={selectedRecipient.email}
          defaultSubject={selectedRecipient.subject}
          projectId={selectedRecipient.projectId}
          projectTitle={selectedRecipient.projectTitle}
        />
      )}
    </div>
  );
}
