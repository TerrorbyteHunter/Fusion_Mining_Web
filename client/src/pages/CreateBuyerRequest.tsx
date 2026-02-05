import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
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
import { MAIN_CATEGORIES, getSubcategoriesForMain, getSpecificTypes } from "@shared/categories";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, Info, Crown, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "wouter";

export default function CreateBuyerRequest() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showTierModal, setShowTierModal] = useState(false);
  const [limitInfo, setLimitInfo] = useState<{ limit?: number; current?: number; reason?: string }>({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    mainCategory: "",
    subcategory: "",
    specificType: "",
    mineralType: "",
    quantity: "",
    budget: "",
    location: "",
    country: "",
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Redirecting to login...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [authLoading, isAuthenticated, toast]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      subcategory: "",
      specificType: "",
    }));
  }, [form.mainCategory]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      specificType: "",
    }));
  }, [form.subcategory]);

  const createRequest = useMutation({
    mutationFn: async () => {
      const payload: any = {
        title: form.title,
        description: form.description,
        location: form.location,
        country: form.country,
      };

      if (form.mainCategory) {
        payload.mainCategory = form.mainCategory;

        if (form.mainCategory === "minerals" && form.subcategory) {
          payload.mineralSubcategory = form.subcategory;
        } else if (form.mainCategory === "mining_equipment" && form.subcategory) {
          const ppeKeys = [
            'head_face_protection',
            'respiratory_protection',
            'hand_foot_protection',
            'fall_protection',
            'protective_clothing',
            'other_ppe'
          ];

          if (ppeKeys.includes(form.subcategory)) {
            payload.ppeSubcategory = form.subcategory;
            // Also update mainCategory to mining_ppe if it's strictly a PPE item, 
            // to ensure data consistency, although flexible schema might allow equipment+ppe
            // payload.mainCategory = 'mining_ppe';
          } else {
            payload.toolSubcategory = form.subcategory;
          }
        } else if (form.mainCategory === "mining_services" && form.subcategory) {
          payload.serviceSubcategory = form.subcategory;
        } else if (form.mainCategory === "mining_ppe" && form.subcategory) {
          payload.ppeSubcategory = form.subcategory;
        }

        if (form.specificType) {
          payload.specificType = form.specificType;
        }
      }

      if (form.mineralType) payload.mineralType = form.mineralType;
      if (form.quantity) payload.quantity = form.quantity;
      if (form.budget) payload.budget = form.budget;

      const res = await apiRequest("POST", "/api/marketplace/buyer-requests", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "RFQ created",
        description: "Your request has been submitted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/buyer-requests"] });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      // Handle tier limit error with a nice modal
      if (error.status === 403 && error.data?.tierLimitReached) {
        setLimitInfo({
          limit: error.data.limit,
          current: error.data.current,
          reason: error.message
        });
        setShowTierModal(true);
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  if (authLoading || !isAuthenticated || user?.role !== "buyer") {
    return null;
  }

  const availableSubcategories = form.mainCategory
    ? getSubcategoriesForMain(form.mainCategory)
    : {};

  const availableSpecificTypes =
    form.subcategory && form.mainCategory
      ? getSpecificTypes(form.mainCategory, form.subcategory)
      : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) {
      toast({
        title: "Missing fields",
        description: "Please fill in title, description, and location.",
        variant: "destructive",
      });
      return;
    }
    createRequest.mutate();
  };

  return (
    <div className="flex flex-col">
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Create RFQ
            </h1>
          </div>
          <p className="text-muted-foreground">
            Describe what you are looking to buy so verified sellers can respond.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>
                Provide clear details about your requirements to get the best responses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    RFQs count toward your membership tier limits. Close requests when they are no
                    longer active.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Looking for high-grade copper ore supply"
                    data-testid="input-rfq-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Share quality requirements, delivery schedule, and other key details"
                    rows={4}
                    data-testid="textarea-rfq-description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mainCategory">Main Category</Label>
                  <Select
                    value={form.mainCategory}
                    onValueChange={(value) => setForm({ ...form, mainCategory: value })}
                  >
                    <SelectTrigger id="mainCategory" data-testid="select-rfq-main-category">
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

                {form.mainCategory && Object.keys(availableSubcategories).length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select
                      value={form.subcategory}
                      onValueChange={(value) => setForm({ ...form, subcategory: value })}
                    >
                      <SelectTrigger id="subcategory" data-testid="select-rfq-subcategory">
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

                {form.subcategory && availableSpecificTypes.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="specificType">Specific Type</Label>
                    <Select
                      value={form.specificType}
                      onValueChange={(value) => setForm({ ...form, specificType: value })}
                    >
                      <SelectTrigger id="specificType" data-testid="select-rfq-specific-type">
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
                  <Label htmlFor="mineralType">Mineral / Product (optional)</Label>
                  <Input
                    id="mineralType"
                    value={form.mineralType}
                    onChange={(e) => setForm({ ...form, mineralType: e.target.value })}
                    placeholder="e.g., Copper, Emerald, Drilling services"
                    data-testid="input-rfq-mineral-type"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (optional)</Label>
                  <Input
                    id="quantity"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    placeholder="e.g., 10,000 tonnes/month"
                    data-testid="input-rfq-quantity"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (optional)</Label>
                  <Input
                    id="budget"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="e.g., $1-5M per shipment"
                    data-testid="input-rfq-budget"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location *</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g., Copperbelt Province, Lusaka"
                    data-testid="input-rfq-location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country (optional)</Label>
                  <Input
                    id="country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="e.g., Zambia"
                    data-testid="input-rfq-country"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={createRequest.isPending}
                  className="w-full"
                  data-testid="button-submit-rfq"
                >
                  {createRequest.isPending ? "Submitting..." : "Submit RFQ"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Dialog open={showTierModal} onOpenChange={setShowTierModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <DialogTitle className="text-center text-2xl font-display font-bold">Limit Reached</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {limitInfo.reason || "You have reached the maximum number of active RFQs for your current membership tier."}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 my-4 space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-500">Current Usage</span>
              <span className="text-slate-900 font-bold">{limitInfo.current} / {limitInfo.limit} RFQs</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: '100%' }}
              />
            </div>
            <p className="text-xs text-slate-500 text-center italic">
              Close inactive RFQs in your dashboard to free up slots.
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setShowTierModal(false)}
              className="w-full"
            >
              Maybe Later
            </Button>
            <Link href="/dashboard/upgrade-tier">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-md">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Membership
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


