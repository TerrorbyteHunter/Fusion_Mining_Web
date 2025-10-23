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
import { Package, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function CreateListing() {
  const { toast } = useToast();
  const { isAuthenticated, isSeller, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [listingForm, setListingForm] = useState({
    type: "mineral" as "mineral" | "partnership",
    title: "",
    description: "",
    mineralType: "",
    grade: "",
    location: "",
    quantity: "",
    price: "",
    imageUrl: "",
  });

  const createListingMutation = useMutation({
    mutationFn: async (data: typeof listingForm) => {
      return await apiRequest("POST", "/api/marketplace/listings", data);
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
            List your minerals or partnership opportunities on the marketplace
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
                <div className="space-y-2">
                  <Label htmlFor="type">Listing Type *</Label>
                  <Select
                    value={listingForm.type}
                    onValueChange={(value: "mineral" | "partnership") =>
                      setListingForm({ ...listingForm, type: value })
                    }
                  >
                    <SelectTrigger id="type" data-testid="select-listing-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mineral">Mineral</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={listingForm.title}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, title: e.target.value })
                    }
                    placeholder="e.g., High-Grade Copper Ore"
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

                {listingForm.type === "mineral" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="mineralType">Mineral Type</Label>
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

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        value={listingForm.quantity}
                        onChange={(e) =>
                          setListingForm({ ...listingForm, quantity: e.target.value })
                        }
                        placeholder="e.g., 1000 tonnes"
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
                        placeholder="e.g., $5000/tonne"
                        data-testid="input-price"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={listingForm.location}
                    onChange={(e) =>
                      setListingForm({ ...listingForm, location: e.target.value })
                    }
                    placeholder="e.g., Copperbelt Province"
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
                  Submit for Verification
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
