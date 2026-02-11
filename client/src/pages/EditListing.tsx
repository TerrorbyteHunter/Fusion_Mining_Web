import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ImageSelector } from "@/components/ImageSelector";
import { Package, CheckCircle, Info, ArrowLeft, Loader2 } from "lucide-react";
import { useLocation, Link, useParams } from "wouter";
import { MAIN_CATEGORIES, getSubcategoriesForMain, getSpecificTypes } from "@shared/categories";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

export default function EditListing() {
    const { id } = useParams();
    const { toast } = useToast();
    const { isAuthenticated, isSeller, isAdmin, user, isLoading: authLoading } = useAuth();
    const [, setLocation] = useLocation();

    const [listingForm, setListingForm] = useState({
        type: "mineral" as "mineral" | "partnership" | "project",
        title: "",
        description: "",
        mainCategory: "",
        subcategory: "",
        specificType: "",
        mineralType: "",
        grade: "",
        location: "",
        quantity: "",
        price: "",
        imageUrl: "",
    });

    const { data: listing, isLoading: loadingListing } = useQuery({
        queryKey: [`/api/marketplace/listings/${id}`],
        queryFn: async () => {
            const res = await apiRequest("GET", `/api/marketplace/listings/${id}`);
            return await res.json();
        },
        enabled: !!id,
    });

    useEffect(() => {
        if (listing) {
            setListingForm({
                type: listing.type || "mineral",
                title: listing.title || "",
                description: listing.description || "",
                mainCategory: listing.mainCategory || "",
                subcategory: listing.mineralSubcategory || listing.toolSubcategory || listing.serviceSubcategory || listing.ppeSubcategory || "",
                specificType: listing.specificType || "",
                mineralType: listing.mineralType || "",
                grade: listing.grade || "",
                location: listing.location || "",
                quantity: listing.quantity || "",
                price: listing.price || "",
                imageUrl: listing.imageUrl || "",
            });
        }
    }, [listing]);

    const resubmitListingMutation = useMutation({
        mutationFn: async (data: typeof listingForm) => {
            const payload: any = {
                type: data.type,
                title: data.title,
                description: data.description,
                location: data.location,
                imageUrl: data.imageUrl,
            };

            if (data.mainCategory) {
                payload.mainCategory = data.mainCategory;
                if (data.mainCategory === 'minerals') payload.mineralSubcategory = data.subcategory;
                else if (data.mainCategory === 'mining_equipment') payload.toolSubcategory = data.subcategory;
                else if (data.mainCategory === 'mining_services') payload.serviceSubcategory = data.subcategory;
                else if (data.mainCategory === 'mining_tools') payload.toolSubcategory = data.subcategory;
                else if (data.mainCategory === 'mining_ppe') payload.ppeSubcategory = data.subcategory;

                if (data.specificType) payload.specificType = data.specificType;
            }

            if (data.type === "mineral" || data.mainCategory === "minerals") {
                if (data.mineralType) payload.mineralType = data.mineralType;
                if (data.grade) payload.grade = data.grade;
                if (data.quantity) payload.quantity = data.quantity;
                if (data.price) payload.price = data.price;
            } else {
                if (data.quantity) payload.quantity = data.quantity;
                if (data.price) payload.price = data.price;
            }

            return await apiRequest("PATCH", `/api/marketplace/listings/${id}/resubmit`, payload);
        },
        onSuccess: () => {
            toast({
                title: "Listing Resubmitted",
                description: "Your listing has been resubmitted for verification",
            });
            queryClient.invalidateQueries({ queryKey: ["/api/dashboard/listings"] });
            setLocation("/dashboard/listings");
        },
        onError: (error: Error) => {
            toast({ title: "Error", description: error.message || "Failed to resubmit listing", variant: "destructive" });
        },
    });

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            setLocation("/login");
        }
    }, [isAuthenticated, authLoading, setLocation]);

    if (authLoading || loadingListing) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Check ownership
    if (listing && user && listing.sellerId !== user.id && !isAdmin) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground mt-2">You don't have permission to edit this listing.</p>
                <Link href="/dashboard/listings">
                    <Button className="mt-4">Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resubmitListingMutation.mutate(listingForm);
    };

    const availableSubcategories = listingForm.mainCategory
        ? getSubcategoriesForMain(listingForm.mainCategory)
        : {};

    const availableSpecificTypes = listingForm.subcategory && listingForm.mainCategory
        ? getSpecificTypes(listingForm.mainCategory, listingForm.subcategory)
        : [];

    return (
        <div className="flex flex-col min-h-screen bg-background pb-12">
            <section className="py-8 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                        <Link href="/dashboard/listings" className="hover:text-primary transition-colors flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" /> Back to My Listings
                        </Link>
                    </div>
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600">
                            <Package className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Edit & Resubmit Listing</h1>
                            <p className="text-muted-foreground mt-1">Update your listing details and resubmit for verification</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-8 flex-1">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Listing Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Listing Type *</Label>
                                    <Select
                                        value={listingForm.type}
                                        onValueChange={(value: any) => setListingForm({ ...listingForm, type: value })}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mineral">Mineral</SelectItem>
                                            <SelectItem value="partnership">Partnership</SelectItem>
                                            <SelectItem value="project">Project</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Main Category</Label>
                                    <Select
                                        value={listingForm.mainCategory}
                                        onValueChange={(value) => setListingForm({ ...listingForm, mainCategory: value })}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Select a category..." /></SelectTrigger>
                                        <SelectContent>
                                            {Object.values(MAIN_CATEGORIES).map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {listingForm.mainCategory && Object.keys(availableSubcategories).length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Subcategory</Label>
                                        <Select
                                            value={listingForm.subcategory}
                                            onValueChange={(value) => setListingForm({ ...listingForm, subcategory: value })}
                                        >
                                            <SelectTrigger><SelectValue placeholder="Select a subcategory..." /></SelectTrigger>
                                            <SelectContent>
                                                {Object.values(availableSubcategories).map((sub: any) => (
                                                    <SelectItem key={sub.value} value={sub.value}>{sub.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label>Title *</Label>
                                    <Input
                                        value={listingForm.title}
                                        onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Description *</Label>
                                    <Textarea
                                        value={listingForm.description}
                                        onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Quantity</Label>
                                        <Input
                                            value={listingForm.quantity}
                                            onChange={(e) => setListingForm({ ...listingForm, quantity: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Price</Label>
                                        <Input
                                            value={listingForm.price}
                                            onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Location *</Label>
                                    <Input
                                        value={listingForm.location}
                                        onChange={(e) => setListingForm({ ...listingForm, location: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Listing Image</Label>
                                    <ImageSelector
                                        value={listingForm.imageUrl}
                                        onChange={(value) => setListingForm({ ...listingForm, imageUrl: value })}
                                        label=""
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={resubmitListingMutation.isPending}
                                    className="w-full h-12"
                                >
                                    {resubmitListingMutation.isPending ? "Resubmitting..." : "Resubmit for Verification"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
