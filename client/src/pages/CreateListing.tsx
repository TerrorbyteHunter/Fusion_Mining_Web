import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
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
import { Package, CheckCircle, Info, ArrowLeft } from "lucide-react";
import { useLocation, Link } from "wouter";
import { MAIN_CATEGORIES, getSubcategoriesForMain, getSpecificTypes } from "@shared/categories";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

export default function CreateListing() {
  const { toast } = useToast();
  const { isAuthenticated, isSeller, isAdmin, isLoading: authLoading } = useAuth();
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

  const createListingMutation = useMutation({
    mutationFn: async (data: typeof listingForm) => {
      const payload: any = {
        type: data.type,
        title: data.title,
        description: data.description,
        location: data.location,
        imageUrl: data.imageUrl,
      };

      // Add category fields based on main category
      if (data.mainCategory) {
        payload.mainCategory = data.mainCategory;

        if (data.mainCategory === 'minerals' && data.subcategory) {
          payload.mineralSubcategory = data.subcategory;
        } else if (data.mainCategory === 'mining_equipment' && data.subcategory) {
          payload.toolSubcategory = data.subcategory;
        } else if (data.mainCategory === 'mining_services' && data.subcategory) {
          payload.serviceSubcategory = data.subcategory;
        } else if (data.mainCategory === 'mining_tools' && data.subcategory) {
          payload.toolSubcategory = data.subcategory;
        } else if (data.mainCategory === 'mining_ppe' && data.subcategory) {
          payload.ppeSubcategory = data.subcategory;
        }

        if (data.specificType) {
          payload.specificType = data.specificType;
        }
      }

      // Add mineral-specific fields for backward compatibility
      if (data.type === "mineral" || data.mainCategory === "minerals") {
        if (data.mineralType) payload.mineralType = data.mineralType;
        if (data.grade) payload.grade = data.grade;
        if (data.quantity) payload.quantity = data.quantity;
        if (data.price) payload.price = data.price;
      } else {
        // For non-mineral listings, still include quantity and price if provided
        if (data.quantity) payload.quantity = data.quantity;
        if (data.price) payload.price = data.price;
      }

      return await apiRequest("POST", "/api/marketplace/listings", payload);
    },
    onSuccess: () => {
      toast({
        title: "Listing Created",
        description: "Your listing has been submitted for verification",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/listings"] });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", variant: "destructive" });
        setTimeout(() => window.location.href = "/api/login", 500);
        return;
      }
      toast({ title: "Error", description: "Failed to create listing", variant: "destructive" });
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
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
    if (!authLoading && isAuthenticated && !isSeller && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need seller or admin privileges to create listings",
        variant: "destructive",
      });
      setLocation("/dashboard");
    }
  }, [isAuthenticated, isSeller, isAdmin, authLoading, toast, setLocation]);

  // Reset subcategory and specific type when main category changes
  useEffect(() => {
    setListingForm(prev => ({
      ...prev,
      subcategory: "",
      specificType: "",
    }));
  }, [listingForm.mainCategory]);

  // Reset specific type when subcategory changes
  useEffect(() => {
    setListingForm(prev => ({
      ...prev,
      specificType: "",
    }));
  }, [listingForm.subcategory]);

  if (authLoading || !isAuthenticated || (!isSeller && !isAdmin)) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingForm.title || !listingForm.description || !listingForm.location) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    createListingMutation.mutate(listingForm);
  };

  // Get available subcategories based on selected main category
  const availableSubcategories = listingForm.mainCategory
    ? getSubcategoriesForMain(listingForm.mainCategory)
    : {};

  // Get available specific types based on selected subcategory
  const availableSpecificTypes = listingForm.subcategory && listingForm.mainCategory
    ? getSpecificTypes(listingForm.mainCategory, listingForm.subcategory)
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      {/* Premium Header */}
      <section className="py-8 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground" data-testid="text-page-title">
                Create Listing
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">
                List your minerals, equipment, services, or safety gear on the marketplace
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-muted/60 shadow-lg shadow-muted/10 overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/50 pb-6">
              <CardTitle>Listing Information</CardTitle>
              <CardDescription>
                Fill in the details about your listing. It will be reviewed before going live.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Alert className="bg-blue-50/50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-300">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Use the category system to help buyers find your listing more easily
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-base font-semibold">Listing Type *</Label>
                  <Select
                    value={listingForm.type}
                    onValueChange={(value: "mineral" | "partnership" | "project") =>
                      setListingForm({ ...listingForm, type: value })
                    }
                  >
                    <SelectTrigger id="type" data-testid="select-listing-type" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mineral">Mineral</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mainCategory" className="text-base font-semibold">Main Category</Label>
                  <Select
                    value={listingForm.mainCategory}
                    onValueChange={(value) =>
                      setListingForm({ ...listingForm, mainCategory: value })
                    }
                  >
                    <SelectTrigger id="mainCategory" data-testid="select-main-category" className="h-11">
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(MAIN_CATEGORIES).map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {listingForm.mainCategory && Object.keys(availableSubcategories).length > 0 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="subcategory" className="text-base font-semibold">Subcategory</Label>
                    <Select
                      value={listingForm.subcategory}
                      onValueChange={(value) =>
                        setListingForm({ ...listingForm, subcategory: value })
                      }
                    >
                      <SelectTrigger id="subcategory" data-testid="select-subcategory" className="h-11">
                        <SelectValue placeholder="Select a subcategory..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(availableSubcategories).map((subcat: any) => (
                          <SelectItem key={subcat.value} value={subcat.value}>
                            {subcat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {listingForm.subcategory && availableSpecificTypes.length > 0 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="specificType" className="text-base font-semibold">Specific Type</Label>
                    <Select
                      value={listingForm.specificType}
                      onValueChange={(value) =>
                        setListingForm({ ...listingForm, specificType: value })
                      }
                    >
                      <SelectTrigger id="specificType" data-testid="select-specific-type" className="h-11">
                        <SelectValue placeholder="Select a specific type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSpecificTypes.map((type: string) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">Title *</Label>
                  <Input
                    id="title"
                    value={listingForm.title}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, title: e.target.value })
                    }
                    placeholder="e.g., High-Grade Copper Ore, Excavator for Sale"
                    data-testid="input-listing-title"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
                  <Textarea
                    id="description"
                    value={listingForm.description}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, description: e.target.value })
                    }
                    placeholder="Provide detailed information about your listing"
                    rows={4}
                    data-testid="textarea-listing-description"
                    className="resize-none text-base"
                  />
                </div>

                {(listingForm.type === "mineral" || listingForm.mainCategory === "minerals") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Label htmlFor="mineralType" className="text-base font-semibold">Mineral Type (Optional)</Label>
                      <Input
                        id="mineralType"
                        value={listingForm.mineralType}
                        onChange={(e) =>
                          setListingForm({ ...listingForm, mineralType: e.target.value })
                        }
                        placeholder="e.g., Copper, Emerald, Gold"
                        data-testid="input-mineral-type"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade" className="text-base font-semibold">Grade/Purity</Label>
                      <Input
                        id="grade"
                        value={listingForm.grade}
                        onChange={(e) =>
                          setListingForm({ ...listingForm, grade: e.target.value })
                        }
                        placeholder="e.g., High Grade, 25% purity"
                        data-testid="input-grade"
                        className="h-11"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-base font-semibold">Quantity</Label>
                    <Input
                      id="quantity"
                      value={listingForm.quantity}
                      onChange={(e) =>
                        setListingForm({ ...listingForm, quantity: e.target.value })
                      }
                      placeholder="e.g., 1000 tonnes, 5 units"
                      data-testid="input-quantity"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-base font-semibold">Price</Label>
                    <Input
                      id="price"
                      value={listingForm.price}
                      onChange={(e) =>
                        setListingForm({ ...listingForm, price: e.target.value })
                      }
                      placeholder="e.g., $5000/tonne, Contact for pricing"
                      data-testid="input-price"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-semibold">Location *</Label>
                  <Input
                    id="location"
                    value={listingForm.location}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, location: e.target.value })
                    }
                    placeholder="e.g., Copperbelt Province, Lusaka"
                    data-testid="input-location"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold">Listing Image</Label>
                  <ImageSelector
                    value={listingForm.imageUrl}
                    onChange={(value) =>
                      setListingForm({ ...listingForm, imageUrl: value })
                    }
                    label=""
                    testId="input-image-url"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={createListingMutation.isPending}
                  className="w-full h-12 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all font-semibold"
                  data-testid="button-submit-listing"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {createListingMutation.isPending ? "Submitting..." : "Submit for Verification"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
