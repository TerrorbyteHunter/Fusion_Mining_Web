import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Loader2, Save, MapPin, Package, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function EditBuyerRequest({ params }: { params: { id: string } }) {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: rfq, isLoading } = useQuery({
    queryKey: ["/api/marketplace/buyer-requests", params.id],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/marketplace/buyer-requests");
      const all = await res.json();
      return all.find((r: any) => r.id === params.id);
    },
    enabled: !!params.id && isAuthenticated,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    quantity: "",
    budget: "",
    location: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (rfq) {
      setForm({
        title: rfq.title || "",
        description: rfq.description || "",
        quantity: rfq.quantity || "",
        budget: rfq.budget || "",
        location: rfq.location || "",
        expiryDate: rfq.expiryDate ? rfq.expiryDate.slice(0, 10) : "",
      });
    }
  }, [rfq]);

  const resubmitMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("PATCH", `/api/marketplace/buyer-requests/${params.id}/resubmit`, form);
      if (!res.ok) throw new Error("Failed to resubmit RFQ");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "RFQ Resubmitted", description: "Your request has been resubmitted for review." });
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/buyer-requests"] });
      setTimeout(() => setLocation("/dashboard/requests"), 1200);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to resubmit RFQ", variant: "destructive" });
    },
  });

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">RFQ not found.</p>
        <Link href="/dashboard/requests">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Requests
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      {/* Premium Header */}
      <section className="py-8 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Link href="/dashboard/requests" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Requests
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Edit3 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground" data-testid="text-page-title">
                Edit Request
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">
                Update details and resubmit for approval
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-muted/60 shadow-lg shadow-muted/10 overflow-hidden">
              <CardHeader className="bg-muted/5 border-b border-border/50 pb-6">
                <CardTitle>Request Details</CardTitle>
                <CardDescription>
                  Make necessary changes to your request below.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    resubmitMutation.mutate();
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-semibold">Title</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      required
                      rows={5}
                      className="resize-none text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="quantity"
                          value={form.quantity}
                          onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                          className="pl-9 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        value={form.budget}
                        onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={form.location}
                          onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                          className="pl-9 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="expiryDate"
                          type="date"
                          value={form.expiryDate}
                          onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
                          className="pl-9 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={resubmitMutation.isPending || isSubmitted}
                      className="w-full h-12 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all font-semibold"
                    >
                      {resubmitMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <Save className="mr-2 h-5 w-5" /> Saved!
                        </>
                      ) : (
                        "Resubmit RFQ"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
