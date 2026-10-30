import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
    Heart,
    Search,
    ChevronRight,
    MessageSquare,
    Calendar,
    MapPin,
    Boxes,
    CircleDollarSign,
    Scale,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageDialog } from "@/components/MessageDialog";
import { useToast } from "@/hooks/use-toast";

interface Interest {
    id: string;
    projectId: string | null;
    listingId: string | null;
    userId: string;
    message: string | null;
    createdAt: string;
    projectName: string | null;
    projectImageUrl: string | null;
    listingTitle: string | null;
    listingImageUrl: string | null;
    projectLicenseType: string | null;
    projectMinerals?: string[] | null;
    projectLocation?: string | null;
    projectArea?: string | null;
    listingType: string | null;
    listingSpecificType?: string | null;
    listingGrade?: string | null;
    listingQuantity?: string | null;
    listingPrice?: string | null;
    listingLocation?: string | null;
    projectOwnerId?: string;
    listingSellerId?: string;
}

export default function Interests() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);
    const { toast } = useToast();

    const { data: interests, isLoading } = useQuery<Interest[]>({
        queryKey: ["/api/dashboard/interests"],
    });

    const filteredInterests = interests?.filter(interest => {
        const title = interest.projectName || interest.listingTitle || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    const handleContact = (interest: Interest) => {
        const recipientId = interest.projectOwnerId || interest.listingSellerId;
        if (!recipientId) {
            toast({
                title: "Error",
                description: "Cannot contact seller for this item",
                variant: "destructive"
            });
            return;
        }
        setSelectedInterest(interest);
        setIsMessageOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Premium Header */}
            <section className="py-12 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden flex-none">
                <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                <Heart className="h-8 w-8 fill-primary/20" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold font-display tracking-tight text-foreground">Saved Items</h1>
                                <p className="text-muted-foreground text-lg mt-1">
                                    Keep track of the listings and projects you've bookmarked for later.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search saved items..."
                            className="pl-10 bg-card border-border/50 focus:ring-primary/20 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                        Showing {filteredInterests?.length || 0} items
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="overflow-hidden border-border/50 shadow-sm">
                                <Skeleton className="h-48 w-full" />
                                <CardContent className="p-6">
                                    <Skeleton className="h-6 w-3/4 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-2/3" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : filteredInterests && filteredInterests.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6"
                    >
                        {filteredInterests.map((interest) => {
                            const displayImage = interest.listingImageUrl || interest.projectImageUrl;
                            const displayTitle = interest.projectName || interest.listingTitle;
                            const displayType = interest.projectId ? 'Project' : 'Marketplace';
                            const displaySubtype = interest.projectLicenseType || interest.listingType;
                            const attributes = interest.projectId
                                ? [
                                    { label: "Minerals", value: interest.projectMinerals?.join(", "), icon: Boxes },
                                    { label: "Area", value: interest.projectArea, icon: Scale },
                                    { label: "Location", value: interest.projectLocation, icon: MapPin },
                                ]
                                : [
                                    { label: "Grade", value: interest.listingGrade, icon: Scale },
                                    { label: "Quantity", value: interest.listingQuantity, icon: Boxes },
                                    { label: "Price", value: interest.listingPrice, icon: CircleDollarSign },
                                    { label: "Location", value: interest.listingLocation, icon: MapPin },
                                ];
                            const detailHref = interest.projectId
                                ? `/projects/${encodeURIComponent(interest.projectId)}`
                                : interest.listingId
                                    ? `/marketplace/listings/${encodeURIComponent(interest.listingId)}`
                                    : null;

                            return (
                                <motion.div key={interest.id} variants={item}>
                                    <Card className="group/saved relative h-full overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-700/30 hover:shadow-lg">
                                        <CardContent className="flex h-full flex-col gap-3 p-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                        <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-lg border border-border/70 bg-muted">
                                            {displayImage ? (
                                                <img
                                                    src={displayImage}
                                                    alt={displayTitle || "Interest"}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover/saved:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Heart className="h-8 w-8 text-amber-700/30" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                                                <Badge variant="secondary" className="border-amber-700/10 bg-amber-100 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                                                    {displayType}
                                                </Badge>
                                                {displaySubtype && (
                                                    <Badge variant="outline" className="h-5 px-1.5 text-[9px] capitalize">
                                                        {displaySubtype.replace('_', ' ')}
                                                    </Badge>
                                                )}
                                            </div>
                                            <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-foreground transition-colors group-hover/saved:text-amber-800 dark:group-hover/saved:text-amber-300">
                                                {displayTitle || "Saved item"}
                                            </h3>
                                            <p className="mt-1 truncate text-xs text-muted-foreground">
                                                {interest.projectId
                                                    ? interest.projectMinerals?.join(", ") || "Mining project"
                                                    : interest.listingSpecificType || interest.listingType || "Marketplace listing"}
                                            </p>
                                            <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                                                <Calendar className="h-3 w-3 text-amber-700 dark:text-amber-400" />
                                                Saved {format(new Date(interest.createdAt), 'MMM d, yyyy')}
                                            </p>
                                        </div>
                                        </div>

                                        {attributes.some(({ value }) => Boolean(value)) && (
                                            <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border/60 pt-2">
                                                {attributes.filter(({ value }) => Boolean(value)).map(({ label, value, icon: Icon }) => (
                                                    <div key={label} className="flex min-w-0 items-center gap-1.5">
                                                        <Icon className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
                                                        <span className="shrink-0 text-[10px] text-muted-foreground">{label}</span>
                                                        <span className={`min-w-0 truncate text-xs font-medium ${label === "Price" ? "text-emerald-700 dark:text-emerald-400" : ""}`}>{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {interest.message && (
                                            <p className="line-clamp-2 rounded-lg border border-border/60 bg-muted/30 p-2 text-xs italic text-muted-foreground">
                                                "{interest.message}"
                                            </p>
                                        )}

                                            <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-2">
                                                {detailHref ? (
                                                    <Link href={`${detailHref}?returnTo=${encodeURIComponent("/dashboard/interests")}`} className="flex-1">
                                                        <Button className="h-8 w-full justify-between px-3 text-xs" variant="outline">
                                                            <span>View details</span>
                                                            <ChevronRight className="h-4 w-4 transition-transform group-hover/saved:translate-x-1" />
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button className="h-8 flex-1 justify-between px-3 text-xs" variant="outline" disabled>
                                                        <span>Details unavailable</span>
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    className="h-8 gap-1.5 px-3 text-xs"
                                                    variant="default"
                                                    onClick={() => handleContact(interest)}
                                                >
                                                    <span>Contact</span>
                                                    <MessageSquare className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-card/30 rounded-3xl border-2 border-dashed border-border/50">
                        <div className="p-6 rounded-full bg-muted/50 mb-6">
                            <Heart className="h-12 w-12 text-muted-foreground opacity-20" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">No saved items yet</h3>
                        <p className="text-muted-foreground max-w-sm mb-8">
                            Explore the marketplace and projects to find opportunities you'd like to save for later.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/marketplace">
                                <Button variant="default">Browse Marketplace</Button>
                            </Link>
                            <Link href="/projects">
                                <Button variant="outline">Explore Projects</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <MessageDialog
                open={isMessageOpen}
                onOpenChange={setIsMessageOpen}
                recipientId={selectedInterest?.projectOwnerId || selectedInterest?.listingSellerId || ""}
                listingTitle={selectedInterest?.listingTitle || undefined}
                listingId={selectedInterest?.listingId || undefined}
                projectTitle={selectedInterest?.projectName || undefined}
                projectId={selectedInterest?.projectId || undefined}
                defaultSubject={selectedInterest?.projectName ? `Inquiry about ${selectedInterest.projectName}` : selectedInterest?.listingTitle ? `Inquiry about ${selectedInterest.listingTitle}` : ""}
            />
        </div>
    );
}
