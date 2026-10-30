import { useEffect, useState } from "react";
import { Link, useLocation, useRoute, useSearch } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  FileText,
  Gem,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
} from "lucide-react";
import type { ProjectWithOwner } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageDisplay } from "@/components/ImageDisplay";
import { MessageDialog } from "@/components/MessageDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import catalogueImg from "../../../attached_assets/files/catalogue.jpg";
import copper1Img from "../../../attached_assets/files/copper1.jpg";
import gold1Img from "../../../attached_assets/files/gold1.jpg";
import green1Img from "../../../attached_assets/files/green-emerald1.jpg";

function getProjectFallback(project: ProjectWithOwner): string {
  const minerals = (project.minerals || []).join(" ").toLowerCase();
  if (minerals.includes("copper")) return copper1Img;
  if (minerals.includes("gold")) return gold1Img;
  if (minerals.includes("emerald") || minerals.includes("green")) return green1Img;
  return catalogueImg;
}

function formatProjectDate(value: Date | string): string {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat(undefined, { month: "long", day: "numeric", year: "numeric" }).format(date)
    : "Date unavailable";
}

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const [, setLocation] = useLocation();
  const search = useSearch();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activePhoto, setActivePhoto] = useState(0);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const id = params?.id;
  const requestedReturnTo = new URLSearchParams(search).get("returnTo");
  const backHref = requestedReturnTo === "/dashboard/interests" ? requestedReturnTo : "/projects";

  const projectQuery = useQuery<ProjectWithOwner>({
    queryKey: ["/api/projects", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await fetch(`/api/projects/${encodeURIComponent(id!)}`, { credentials: "include" });
      if (!response.ok) throw new Error("Unable to load this project.");
      return response.json() as Promise<ProjectWithOwner>;
    },
  });
  const projectsQuery = useQuery<ProjectWithOwner[]>({
    queryKey: ["/api/projects"],
  });
  const project = projectQuery.data;

  useEffect(() => {
    setActivePhoto(0);
  }, [project?.id]);

  const interestQueryKey = ["/api/projects", id, "has-interest"];
  const interestQuery = useQuery<boolean>({
    queryKey: interestQueryKey,
    enabled: Boolean(isAuthenticated && id),
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/projects/${encodeURIComponent(id!)}/has-interest`);
      const data = await response.json() as { hasInterest?: boolean };
      if (typeof data.hasInterest !== "boolean") throw new Error("The bookmark status response was invalid.");
      return data.hasInterest;
    },
  });
  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("This project is not available.");
      const response = await apiRequest("POST", "/api/projects/interest", { projectId: id });
      const data = await response.json() as { bookmarked?: boolean };
      return data.bookmarked ?? true;
    },
    onSuccess: (bookmarked) => {
      queryClient.setQueryData(interestQueryKey, bookmarked);
      toast({
        title: bookmarked ? "Project bookmarked" : "Bookmark removed",
        description: bookmarked ? "You can find this project in your saved items." : "This project was removed from your saved items.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        setLocation("/login");
        return;
      }
      toast({ title: "Unable to update bookmark", description: error.message || "Please try again.", variant: "destructive" });
    },
  });

  const shareProject = async () => {
    if (!project) return;
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

  if (projectQuery.isLoading) {
    return (
      <main className="container mx-auto max-w-6xl px-4 py-10">
        <Skeleton className="mb-6 h-8 w-40" />
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <div className="space-y-4"><Skeleton className="h-10 w-3/4" /><Skeleton className="h-28 w-full" /><Skeleton className="h-48 w-full" /></div>
        </div>
      </main>
    );
  }

  if (projectQuery.isError || !project) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Unable to load this project</h1>
        <p className="mt-2 text-muted-foreground">It may have been removed or is temporarily unavailable.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => void projectQuery.refetch()}>Try again</Button>
          <Button asChild><Link href={backHref}>{backHref === "/dashboard/interests" ? "Back to saved items" : "Back to projects"}</Link></Button>
        </div>
      </main>
    );
  }

  const fallbackImage = getProjectFallback(project);
  const uploadedImages = Array.from(new Set([...(project.imageUrls || []), project.imageUrl].filter((image): image is string => Boolean(image))));
  const gallery = uploadedImages.length
    ? uploadedImages.map((src, index) => ({ src, label: index === 0 ? "Cover photo" : `Photo ${index + 1}` }))
    : [{ src: fallbackImage, label: "Project image" }];
  const activeGalleryPhoto = gallery[Math.min(activePhoto, gallery.length - 1)];
  const ownerName = project.owner
    ? [project.owner.firstName, project.owner.lastName].filter(Boolean).join(" ") || "Project operator"
    : "Project operator";
  const isVerified = Boolean(project.owner?.verified);
  const specifications = [
    { label: "License type", value: project.licenseType?.replace(/_/g, " ") || "Not specified", icon: FileText },
    { label: "Minerals", value: project.minerals?.join(", ") || "Not specified", icon: Gem },
    { label: "Area", value: project.area || "Not specified", icon: Boxes },
    { label: "Estimated value", value: project.estimatedValue || "Contact operator", icon: CircleDollarSign },
    { label: "Location", value: project.location || "Not specified", icon: MapPin },
    { label: "Listed", value: formatProjectDate(project.createdAt), icon: CalendarDays },
  ];
  const relatedProjects = (projectsQuery.data || [])
    .filter((item) => item.id !== project.id)
    .map((item) => {
      const sameRegion = item.location?.trim().toLowerCase() === project.location?.trim().toLowerCase();
      const sharedMineral = (item.minerals || []).some((mineral) =>
        (project.minerals || []).some((projectMineral) => mineral.toLowerCase() === projectMineral.toLowerCase()));
      const sameLicense = item.licenseType === project.licenseType;
      return { item, score: Number(sameRegion) * 3 + Number(sharedMineral) * 2 + Number(sameLicense) };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
  const moreFromOperator = (projectsQuery.data || [])
    .filter((item) => item.id !== project.id && item.ownerId === project.ownerId)
    .slice(0, 3);

  const contactOwner = () => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }
    if (!project.ownerId) {
      toast({ title: "Unable to contact operator", description: "No operator account is associated with this project.", variant: "destructive" });
      return;
    }
    setMessageDialogOpen(true);
  };

  const projectCard = (item: ProjectWithOwner) => (
    <Link key={item.id} href={`/projects/${encodeURIComponent(item.id)}`}>
      <Card className="h-full overflow-hidden rounded-xl border-border/70 transition-all hover:-translate-y-0.5 hover:border-amber-700/30 hover:shadow-lg">
        <ImageDisplay imageUrl={item.imageUrls?.[0] || item.imageUrl} alt={item.name} fallbackImage={getProjectFallback(item)} className="aspect-[16/9] overflow-hidden bg-muted" />
        <CardContent className="space-y-2 p-4">
          <p className="line-clamp-1 font-semibold">{item.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{item.location}</p>
          <p className="text-xs capitalize text-amber-800 dark:text-amber-300">{item.minerals?.join(", ") || item.licenseType}</p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-900/[0.03] via-background to-background">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <Button asChild variant="ghost" className="mb-6 -ml-3 text-muted-foreground">
          <Link href={backHref}><ArrowLeft className="mr-2 h-4 w-4" />{backHref === "/dashboard/interests" ? "Back to saved items" : "Back to projects"}</Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section aria-label="Project photos">
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-sm">
              <ImageDisplay imageUrl={activeGalleryPhoto.src} alt={`${project.name} — ${activeGalleryPhoto.label}`} fallbackImage={fallbackImage} className="aspect-[4/3] w-full bg-muted" iconClassName="h-20 w-20" />
              <Badge className="absolute bottom-4 left-4 border-white/30 bg-black/60 text-white backdrop-blur">{activeGalleryPhoto.label}</Badge>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {gallery.map((photo, index) => (
                  <button
                    key={photo.label}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    aria-label={`View ${photo.label}`}
                    aria-pressed={activePhoto === index}
                    className={`overflow-hidden rounded-xl border transition-colors ${activePhoto === index ? "border-amber-700 ring-2 ring-amber-700/20" : "border-border/70 hover:border-amber-700/50"}`}
                  >
                    <ImageDisplay imageUrl={photo.src} alt={`${project.name} — ${photo.label}`} fallbackImage={fallbackImage} className="aspect-[16/10] bg-muted" />
                    <span className="block px-2 py-1 text-left text-xs text-muted-foreground">{photo.label}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-amber-700/20 bg-amber-700/5 capitalize text-amber-900 dark:text-amber-200">{project.licenseType} project</Badge>
              {project.itemId && <span className="text-xs text-muted-foreground">Project #{project.itemId}</span>}
              <div className="ml-auto"><StatusBadge status={project.status} /></div>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{project.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Published {formatProjectDate(project.createdAt)}</p>

            <Card className="mt-6 border-border/70 shadow-sm">
              <CardContent className="grid grid-cols-2 gap-x-4 gap-y-5 p-5 sm:grid-cols-3">
                {specifications.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="min-w-0">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><Icon className="h-4 w-4 text-amber-700 dark:text-amber-400" />{label}</p>
                    <p className={`mt-1 truncate text-sm font-semibold capitalize ${label === "Estimated value" ? "text-emerald-700 dark:text-emerald-400" : ""}`} title={value}>{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="flex-1 shadow-sm" onClick={contactOwner}>
                <ShieldCheck className="mr-2 h-4 w-4" />Contact Owner
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
              >
                <Heart className={`mr-2 h-4 w-4 ${interestQuery.data ? "fill-current text-red-500" : ""}`} />
                {interestQuery.data ? "Saved" : "Save"}
              </Button>
              <Button size="icon" variant="outline" className="h-11 w-11" onClick={() => void shareProject()} aria-label="Share project">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Card className="mt-6 border-amber-800/10 bg-gradient-to-br from-amber-800/[0.04] to-card">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-800/10 text-amber-800 dark:text-amber-300"><Building2 className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Project operator</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{ownerName}</h2>
                      {isVerified && <Badge className="gap-1 border-emerald-700/15 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"><BadgeCheck className="h-3 w-3" />Verified operator</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Operator account on Fusion Mining</p>
                  </div>
                  {isVerified && <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-label="Verified operator" />}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <Card className="border-border/70 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Project overview</h2>
                <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">{project.description || "No project description has been provided."}</p>
              </CardContent>
            </Card>
            <Card className="border-border/70 shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold"><FileCheck2 className="h-5 w-5 text-amber-700 dark:text-amber-400" />Certifications</h2>
                {project.certifications?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.certifications.map((certification) => <Badge key={certification} variant="secondary" className="gap-1.5 px-3 py-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />{certification}</Badge>)}
                  </div>
                ) : <p className="mt-3 text-sm text-muted-foreground">No certifications have been provided for this project.</p>}
              </CardContent>
            </Card>
          </div>
          <Card className="h-fit border-border/70 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">At a glance</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3"><span className="text-sm text-muted-foreground">License</span><span className="text-right text-sm font-medium capitalize">{project.licenseType}</span></div>
                <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3"><span className="text-sm text-muted-foreground">Project status</span><StatusBadge status={project.status} /></div>
                <div className="flex items-center justify-between gap-4"><span className="text-sm text-muted-foreground">Minerals</span><span className="text-right text-sm font-medium">{project.minerals?.join(", ") || "Not specified"}</span></div>
              </div>
            </CardContent>
          </Card>
        </section>

        {projectsQuery.isError && (
          <p className="mt-10 text-sm text-muted-foreground">Related projects could not be loaded right now.</p>
        )}
        {relatedProjects.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">Similar projects in this region</h2>
            <p className="mt-1 text-sm text-muted-foreground">Selected by shared location, mineral, or license type.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{relatedProjects.map(projectCard)}</div>
          </section>
        )}
        {moreFromOperator.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">More from this operator</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{moreFromOperator.map(projectCard)}</div>
          </section>
        )}
      </div>
      {project.ownerId && (
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          recipientId={project.ownerId}
          recipientName={ownerName}
          recipientEmail={project.owner?.email || ""}
          defaultSubject={`Inquiry about: ${project.name}`}
          projectTitle={project.name}
          projectId={project.id}
        />
      )}
    </main>
  );
}
