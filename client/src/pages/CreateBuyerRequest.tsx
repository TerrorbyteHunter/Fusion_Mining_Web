import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import { Package, Info, Crown, Zap, CheckCircle2, ArrowLeft, Loader2, MapPin, FileText, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function CreateBuyerRequest() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showTierModal, setShowTierModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/buyer-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
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

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh] animate-in fade-in zoom-in duration-500">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="rounded-full bg-green-100 dark:bg-green-900/30 p-6 mb-6 ring-8 ring-green-50 dark:ring-green-900/10"
        >
          <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
        </motion.div>
        <h2 className="text-3xl font-bold font-display mb-2 text-center text-foreground">RFQ Submitted!</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8 text-lg">
          Your request has been successfully submitted and is now being reviewed by our admin team.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="outline" className="min-w-[140px]">Go to Dashboard</Button>
          </Link>
          <Link href="/dashboard/requests">
            <Button className="min-w-[140px] shadow-lg shadow-primary/20">View My Requests</Button>
          </Link>
        </div>
      </div>
    );
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground" data-testid="text-page-title">
                Create New Request
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">
                Tell suppliers what you need and get competitive offers
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-muted/60 shadow-lg shadow-muted/10 overflow-hidden">
              <CardHeader className="bg-muted/5 border-b border-border/50 pb-6">
                <CardTitle>Request Details</CardTitle>
                <CardDescription>
                  Provide clear details about your requirements to get the best responses.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <Alert className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20 text-blue-800 dark:text-blue-300">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription>
                      RFQs count toward your membership tier limits. Close requests when they are no longer active.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-base font-semibold">Title *</Label>
                      <Input
                        id="title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="e.g., Looking for high-grade copper ore supply (5000t)"
                        className="h-12 text-lg"
                        data-testid="input-rfq-title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Share quality requirements, delivery schedule, payment preferences, and other key details..."
                        rows={6}
                        className="resize-none text-base"
                        data-testid="textarea-rfq-description"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mainCategory">Main Category</Label>
                        <Select
                          value={form.mainCategory}
                          onValueChange={(value) => setForm({ ...form, mainCategory: value })}
                        >
                          <SelectTrigger id="mainCategory" data-testid="select-rfq-main-category" className="h-11">
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
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          <Label htmlFor="subcategory">Subcategory</Label>
                          <Select
                            value={form.subcategory}
                            onValueChange={(value) => setForm({ ...form, subcategory: value })}
                          >
                            <SelectTrigger id="subcategory" data-testid="select-rfq-subcategory" className="h-11">
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
                    </div>

                    {form.subcategory && availableSpecificTypes.length > 0 && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <Label htmlFor="specificType">Specific Type</Label>
                        <Select
                          value={form.specificType}
                          onValueChange={(value) => setForm({ ...form, specificType: value })}
                        >
                          <SelectTrigger id="specificType" data-testid="select-rfq-specific-type" className="h-11">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="mineralType">Mineral / Product (optional)</Label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="mineralType"
                            value={form.mineralType}
                            onChange={(e) => setForm({ ...form, mineralType: e.target.value })}
                            placeholder="e.g. Copper, Emerald"
                            className="pl-9 h-11"
                            data-testid="input-rfq-mineral-type"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity (optional)</Label>
                        <div className="relative">
                          <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="quantity"
                            value={form.quantity}
                            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                            placeholder="e.g. 10,000 tonnes/month"
                            className="pl-9 h-11"
                            data-testid="input-rfq-quantity"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget (optional)</Label>
                        <Input
                          id="budget"
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          placeholder="e.g. $1-5M per shipment"
                          className="h-11"
                          data-testid="input-rfq-budget"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country (optional)</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="country"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                            placeholder="e.g. Zambia"
                            className="pl-9 h-11"
                            data-testid="input-rfq-country"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label htmlFor="location">Preferred Location / Delivery Point *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          placeholder="e.g. Copperbelt Province, Lusaka"
                          className="pl-9 h-11"
                          data-testid="input-rfq-location"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="bg-muted/5 border-t border-border/50 p-6 md:p-8">
                <Button
                  onClick={handleSubmit}
                  disabled={createRequest.isPending}
                  className="w-full h-12 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all font-semibold"
                  data-testid="button-submit-rfq"
                >
                  {createRequest.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                    </>
                  ) : "Submit Request"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
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
