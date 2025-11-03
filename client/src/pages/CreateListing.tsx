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
import { Package, CheckCircle, Info } from "lucide-react";
import { useLocation } from "wouter";
import { MAIN_CATEGORIES, getSubcategoriesForMain, getSpecificTypes } from "@shared/categories";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateListing() {
  const { toast } = useToast();
  const { isAuthenticated, isSeller, isLoading: authLoading } = useAuth();
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
    if (!authLoading && isAuthenticated && !isSeller) {
      toast({
        title: "Access Denied",
        description: "You need seller privileges to create listings",
        variant: "destructive",
      });
      setLocation("/dashboard");
    }
  }, [isAuthenticated, isSeller, authLoading, toast, setLocation]);

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

  if (authLoading || !isAuthenticated || !isSeller) {
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
    <div className="flex flex-col">
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Create Listing
            </h1>
          </div>
          <p className="text-muted-foreground">
            List your minerals, equipment, services, or safety gear on the marketplace
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Listing Information</CardTitle>
              <CardDescription>
                Fill in the details about your listing. It will be reviewed before going live.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Use the category system to help buyers find your listing more easily
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="type">Listing Type *</Label>
                  <Select
                    value={listingForm.type}
                    onValueChange={(value: "mineral" | "partnership" | "project") =>
                      setListingForm({ ...listingForm, type: value })
                    }
                  >
                    <SelectTrigger id="type" data-testid="select-listing-type">
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
                  <Label htmlFor="mainCategory">Main Category</Label>
                  <Select
                    value={listingForm.mainCategory}
                    onValueChange={(value) =>
                      setListingForm({ ...listingForm, mainCategory: value })
                    }
                  >
                    <SelectTrigger id="mainCategory" data-testid="select-main-category">
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
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select
                      value={listingForm.subcategory}
                      onValueChange={(value) =>
                        setListingForm({ ...listingForm, subcategory: value })
                      }
                    >
                      <SelectTrigger id="subcategory" data-testid="select-subcategory">
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
                  <div className="space-y-2">
                    <Label htmlFor="specificType">Specific Type</Label>
                    <Select
                      value={listingForm.specificType}
                      onValueChange={(value) =>
                        setListingForm({ ...listingForm, specificType: value })
                      }
                    >
                      <SelectTrigger id="specificType" data-testid="select-specific-type">
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
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={listingForm.title}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, title: e.target.value })
                    }
                    placeholder="e.g., High-Grade Copper Ore, Excavator for Sale"
                    data-testid="input-listing-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={listingForm.description}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, description: e.target.value })
                    }
                    placeholder="Provide detailed information about your listing"
                    rows={4}
                    data-testid="textarea-listing-description"
                  />
                </div>

                {(listingForm.type === "mineral" || listingForm.mainCategory === "minerals") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="mineralType">Mineral Type (Optional)</Label>
                      <Input
                        id="mineralType"
                        value={listingForm.mineralType}
                        onChange={(e) =>
                          setListingForm({ ...listingForm, mineralType: e.target.value })
                        }
                        placeholder="e.g., Copper, Emerald, Gold"
                        data-testid="input-mineral-type"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade/Purity</Label>
                      <Input
                        id="grade"
                        value={listingForm.grade}
                        onChange={(e) =>
                          setListingForm({ ...listingForm, grade: e.target.value })
                        }
                        placeholder="e.g., High Grade, 25% purity"
                        data-testid="input-grade"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    value={listingForm.quantity}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, quantity: e.target.value })
                    }
                    placeholder="e.g., 1000 tonnes, 5 units"
                    data-testid="input-quantity"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={listingForm.price}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, price: e.target.value })
                    }
                    placeholder="e.g., $5000/tonne, Contact for pricing"
                    data-testid="input-price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={listingForm.location}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, location: e.target.value })
                    }
                    placeholder="e.g., Copperbelt Province, Lusaka"
                    data-testid="input-location"
                  />
                </div>

                <ImageSelector
                  value={listingForm.imageUrl}
                  onChange={(value) =>
                    setListingForm({ ...listingForm, imageUrl: value })
                  }
                  label="Listing Image"
                  placeholder="https://example.com/listing-image.jpg"
                  testId="input-image-url"
                />

                <Button
                  type="submit"
                  disabled={createListingMutation.isPending}
                  className="w-full"
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
