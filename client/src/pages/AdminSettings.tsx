import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Settings, Users, Award, Database, AlertCircle } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import type { User, MembershipBenefit } from "@shared/schema";

export default function AdminSettings() {
  const { toast } = useToast();
  const { isAdmin, isAuthenticated, isLoading: authLoading } = useAuth();
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [tierForm, setTierForm] = useState({
    maxActiveRFQs: 0,
    canAccessAnalytics: false,
    canDirectMessage: false,
    prioritySupport: false,
    visibilityRanking: 3,
    monthlyPrice: "0.00",
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newTier, setNewTier] = useState<string>("");
  const [isTierDialogOpen, setIsTierDialogOpen] = useState(false);

  const { data: benefits, isLoading: loadingBenefits, error: benefitsError } = useQuery<MembershipBenefit[]>({
    queryKey: ["/api/membership-benefits"],
  });

  const { data: users, isLoading: loadingUsers, error: usersError } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const updateBenefitMutation = useMutation({
    mutationFn: async ({ tier, data }: { tier: string; data: any }) =>
      apiRequest("PUT", `/api/admin/membership-benefits/${tier}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/membership-benefits"] });
      toast({ title: "Success", description: "Membership benefit updated successfully" });
      setEditingTier(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update membership benefit", variant: "destructive" });
    },
  });

  const updateUserTierMutation = useMutation({
    mutationFn: async ({ userId, tier }: { userId: string; tier: string }) =>
      apiRequest("POST", `/api/admin/users/${userId}/tier`, { tier }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Success", description: "User tier updated successfully" });
      setIsTierDialogOpen(false);
      setSelectedUser(null);
      setNewTier("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user tier", variant: "destructive" });
    },
  });

  const seedSampleDataMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/admin/seed-sample-data"),
    onSuccess: (data: any) => {
      toast({
        title: "Success",
        description: `Sample data seeded: ${data.results.users} users created`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to seed sample data", variant: "destructive" });
    },
  });

  const handleEditBenefit = (tier: string) => {
    const benefit = benefits?.find((b) => b.tier === tier);
    if (benefit) {
      setTierForm({
        maxActiveRFQs: benefit.maxActiveRFQs,
        canAccessAnalytics: benefit.canAccessAnalytics,
        canDirectMessage: benefit.canDirectMessage,
        prioritySupport: benefit.prioritySupport,
        visibilityRanking: benefit.visibilityRanking,
        monthlyPrice: benefit.monthlyPrice,
      });
      setEditingTier(tier);
    }
  };

  const handleSaveBenefit = () => {
    if (!editingTier) return;
    updateBenefitMutation.mutate({ tier: editingTier, data: tierForm });
  };

  const handleChangeUserTier = (user: User) => {
    setSelectedUser(user);
    setNewTier(user.membershipTier);
    setIsTierDialogOpen(true);
  };

  const handleConfirmTierChange = () => {
    if (!selectedUser || !newTier) return;
    updateUserTierMutation.mutate({ userId: selectedUser.id, tier: newTier });
  };

  if (authLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab="settings" onTabChange={() => {}} />
      <div className="flex-1 flex flex-col">
        <section className="py-8 border-b bg-gradient-to-r from-primary/10 to-chart-2/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Platform Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage membership tiers, user accounts, and system configuration
            </p>
          </div>
        </section>

        <div className="flex-1 p-8">
          <Tabs defaultValue="tiers" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="tiers" data-testid="tab-tier-management">
                <Award className="mr-2 h-4 w-4" />
                Tier Management
              </TabsTrigger>
              <TabsTrigger value="users" data-testid="tab-user-tiers">
                <Users className="mr-2 h-4 w-4" />
                User Tiers
              </TabsTrigger>
              <TabsTrigger value="sample-data" data-testid="tab-sample-data">
                <Database className="mr-2 h-4 w-4" />
                Sample Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tiers" className="mt-6">
              <div className="grid gap-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Membership Tier Benefits</h2>
                </div>

                {loadingBenefits ? (
                  <Skeleton className="h-96 w-full" />
                ) : benefitsError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Loading Membership Tiers</AlertTitle>
                    <AlertDescription>
                      Failed to load membership benefits. Please try again later or contact support if the issue persists.
                    </AlertDescription>
                  </Alert>
                ) : benefits && benefits.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-3">
                    {benefits.map((benefit) => (
                      <Card key={benefit.tier} data-testid={`card-tier-${benefit.tier}`}>
                        <CardHeader>
                          <CardTitle className="capitalize flex items-center justify-between">
                            {benefit.tier}
                            <Badge variant={benefit.tier === "premium" ? "default" : "secondary"}>
                              ${benefit.monthlyPrice}/mo
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Tier configuration and benefits
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {editingTier === benefit.tier ? (
                            <div className="space-y-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`max-rfqs-${benefit.tier}`}>Max Active RFQs</Label>
                                <Input
                                  id={`max-rfqs-${benefit.tier}`}
                                  type="number"
                                  value={tierForm.maxActiveRFQs}
                                  onChange={(e) => setTierForm({ ...tierForm, maxActiveRFQs: parseInt(e.target.value) })}
                                  data-testid={`input-max-rfqs-${benefit.tier}`}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`price-${benefit.tier}`}>Monthly Price ($)</Label>
                                <Input
                                  id={`price-${benefit.tier}`}
                                  value={tierForm.monthlyPrice}
                                  onChange={(e) => setTierForm({ ...tierForm, monthlyPrice: e.target.value })}
                                  data-testid={`input-price-${benefit.tier}`}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor={`visibility-${benefit.tier}`}>Visibility Ranking (1-3)</Label>
                                <Input
                                  id={`visibility-${benefit.tier}`}
                                  type="number"
                                  min="1"
                                  max="3"
                                  value={tierForm.visibilityRanking}
                                  onChange={(e) => setTierForm({ ...tierForm, visibilityRanking: parseInt(e.target.value) })}
                                  data-testid={`input-visibility-${benefit.tier}`}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={handleSaveBenefit} disabled={updateBenefitMutation.isPending} data-testid={`button-save-${benefit.tier}`}>
                                  Save
                                </Button>
                                <Button variant="outline" onClick={() => setEditingTier(null)} data-testid={`button-cancel-${benefit.tier}`}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Max RFQs</span>
                                <Badge variant="outline">{benefit.maxActiveRFQs}</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Analytics</span>
                                <Badge variant={benefit.canAccessAnalytics ? "default" : "secondary"}>
                                  {benefit.canAccessAnalytics ? "Yes" : "No"}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Direct Messaging</span>
                                <Badge variant={benefit.canDirectMessage ? "default" : "secondary"}>
                                  {benefit.canDirectMessage ? "Yes" : "No"}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Priority Support</span>
                                <Badge variant={benefit.prioritySupport ? "default" : "secondary"}>
                                  {benefit.prioritySupport ? "Yes" : "No"}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Visibility</span>
                                <Badge variant="outline">Rank {benefit.visibilityRanking}</Badge>
                              </div>
                              <Button
                                className="w-full"
                                variant="outline"
                                onClick={() => handleEditBenefit(benefit.tier)}
                                data-testid={`button-edit-${benefit.tier}`}
                              >
                                Edit Benefits
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No Membership Tiers</h3>
                      <p className="text-muted-foreground">Membership tiers need to be configured</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">User Membership Tiers</h2>
                </div>

                {loadingUsers ? (
                  <Skeleton className="h-96 w-full" />
                ) : usersError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Loading Users</AlertTitle>
                    <AlertDescription>
                      Failed to load user data. Please try again later or contact support if the issue persists.
                    </AlertDescription>
                  </Alert>
                ) : users && users.length > 0 ? (
                  <Card>
                    <CardContent className="p-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Current Tier</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.filter((u) => u.role !== "admin").map((user) => (
                            <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                              <TableCell className="font-medium">
                                {user.firstName} {user.lastName}
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.membershipTier === "premium"
                                      ? "default"
                                      : user.membershipTier === "standard"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className="capitalize"
                                >
                                  {user.membershipTier}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleChangeUserTier(user)}
                                  data-testid={`button-change-tier-${user.id}`}
                                >
                                  Change Tier
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No Users</h3>
                      <p className="text-muted-foreground">No users found in the system</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="sample-data" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Sample Data Management</h2>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Generate Sample Data</CardTitle>
                    <CardDescription>
                      Create sample users, projects, listings, and other test data for development and testing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <p className="text-sm font-medium">This will create:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                        <li>Sample users with Basic, Standard, and Premium tiers</li>
                        <li>Verified seller account with Premium tier</li>
                        <li>Test data for all membership tier features</li>
                      </ul>
                    </div>
                    <Button
                      onClick={() => seedSampleDataMutation.mutate()}
                      disabled={seedSampleDataMutation.isPending}
                      data-testid="button-seed-sample-data"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      {seedSampleDataMutation.isPending ? "Seeding..." : "Generate Sample Data"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sample Accounts</CardTitle>
                    <CardDescription>Login credentials for testing different tier levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Password</TableHead>
                          <TableHead>Tier</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-sm">basic.user@fusionmining.com</TableCell>
                          <TableCell className="font-mono text-sm">basic123</TableCell>
                          <TableCell>
                            <Badge variant="outline">Basic</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-sm">standard.user@fusionmining.com</TableCell>
                          <TableCell className="font-mono text-sm">standard123</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Standard</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-sm">premium.user@fusionmining.com</TableCell>
                          <TableCell className="font-mono text-sm">premium123</TableCell>
                          <TableCell>
                            <Badge variant="default">Premium</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-sm">seller.verified@fusionmining.com</TableCell>
                          <TableCell className="font-mono text-sm">seller123</TableCell>
                          <TableCell>
                            <Badge variant="default">Premium (Seller)</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isTierDialogOpen} onOpenChange={setIsTierDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Tier</DialogTitle>
            <DialogDescription>
              Update the membership tier for {selectedUser?.firstName} {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-tier">New Membership Tier</Label>
              <Select value={newTier} onValueChange={setNewTier}>
                <SelectTrigger id="new-tier" data-testid="select-new-tier">
                  <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTierDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmTierChange}
              disabled={updateUserTierMutation.isPending || !newTier}
              data-testid="button-confirm-tier-change"
            >
              {updateUserTierMutation.isPending ? "Updating..." : "Update Tier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
