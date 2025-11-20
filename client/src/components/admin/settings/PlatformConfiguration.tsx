import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sliders, Award, Percent, Palette, Plus, Check, X, Save, ChevronDown, Clock, Edit2 } from "lucide-react";
import type { PlatformSetting, MembershipBenefit, SettingsAudit } from "@shared/schema";

export function PlatformConfiguration() {
  const { toast } = useToast();
  const [editingBenefit, setEditingBenefit] = useState<string | null>(null);
  const [editingSettingId, setEditingSettingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  const [benefitForm, setbenefitForm] = useState({
    maxActiveRFQs: 0,
    monthlyPrice: "0.00",
    visibilityRanking: 3,
  });

  const { data: platformSettings, refetch: refetchSettings } = useQuery<PlatformSetting[]>({
    queryKey: ["/api/admin/settings/platform"],
  });

  const { data: auditLogs } = useQuery<SettingsAudit[]>({
    queryKey: ["/api/admin/settings/audit"],
    enabled: showAuditLogs,
  });

  const { data: benefits, refetch: refetchBenefits } = useQuery<MembershipBenefit[]>({
    queryKey: ["/api/membership-benefits"],
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) =>
      apiRequest("PATCH", `/api/admin/settings/platform/${id}`, { value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings/platform"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings/audit"] });
      toast({ title: "Success", description: "Setting updated successfully" });
      setEditingSettingId(null);
      setEditingValue("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update setting", variant: "destructive" });
    },
  });

  const seedPlatformSettingsMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/seed-platform-settings"),
    onSuccess: () => {
      toast({ title: "Success", description: "Platform settings seeded successfully" });
      refetchSettings();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to seed platform settings", variant: "destructive" });
    },
  });

  const seedMembershipBenefitsMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/seed-membership-benefits"),
    onSuccess: () => {
      toast({ title: "Success", description: "Membership tiers seeded successfully" });
      refetchBenefits();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to seed membership tiers", variant: "destructive" });
    },
  });

  const updateBenefitMutation = useMutation({
    mutationFn: async ({ tier, data }: { tier: string; data: any }) =>
      apiRequest("PUT", `/api/admin/membership-benefits/${tier}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/membership-benefits"] });
      toast({ title: "Success", description: "Membership benefit updated" });
      setEditingBenefit(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update benefit", variant: "destructive" });
    },
  });

  const handleEditBenefit = (tier: string) => {
    const benefit = benefits?.find((b) => b.tier === tier);
    if (benefit) {
      setbenefitForm({
        maxActiveRFQs: benefit.maxActiveRFQs,
        monthlyPrice: benefit.monthlyPrice,
        visibilityRanking: benefit.visibilityRanking,
      });
      setEditingBenefit(tier);
    }
  };

  const handleSaveBenefit = () => {
    if (!editingBenefit) return;
    updateBenefitMutation.mutate({ tier: editingBenefit, data: benefitForm });
  };

  const handleEditSetting = (setting: PlatformSetting) => {
    setEditingSettingId(setting.id);
    setEditingValue(setting.value);
  };

  const handleSaveSetting = (id: string) => {
    // Validation
    const setting = platformSettings?.find(s => s.id === id);
    if (!setting) return;

    if (setting.dataType === 'number' && isNaN(Number(editingValue))) {
      toast({ title: "Validation Error", description: "Value must be a number", variant: "destructive" });
      return;
    }

    if (editingValue.trim() === "") {
      toast({ title: "Validation Error", description: "Value cannot be empty", variant: "destructive" });
      return;
    }

    updateSettingMutation.mutate({ id, value: editingValue });
  };

  const handleCancelEdit = () => {
    setEditingSettingId(null);
    setEditingValue("");
  };

  const renderEditableValue = (setting: PlatformSetting) => {
    const isEditing = editingSettingId === setting.id;

    if (!isEditing) {
      return (
        <div className="flex items-center gap-2">
          {setting.dataType === 'boolean' ? (
            <Badge variant={setting.value === 'true' ? 'default' : 'secondary'}>
              {setting.value === 'true' ? 'Enabled' : 'Disabled'}
            </Badge>
          ) : (
            <span className="font-medium">{setting.value}</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleEditSetting(setting)}
            data-testid={`button-edit-${setting.key}`}
          >
            <Edit2 className="h-3 w-3" />
          </Button>
        </div>
      );
    }

    if (setting.dataType === 'boolean') {
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={editingValue === 'true'}
            onCheckedChange={(checked) => setEditingValue(checked ? 'true' : 'false')}
            data-testid={`switch-${setting.key}`}
          />
          <Button
            size="sm"
            onClick={() => handleSaveSetting(setting.id)}
            disabled={updateSettingMutation.isPending}
            data-testid={`button-save-${setting.key}`}
          >
            <Save className="h-3 w-3 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Input
          type={setting.dataType === 'number' ? 'number' : 'text'}
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
          className="max-w-xs"
          data-testid={`input-${setting.key}`}
        />
        <Button
          size="sm"
          onClick={() => handleSaveSetting(setting.id)}
          disabled={updateSettingMutation.isPending}
          data-testid={`button-save-${setting.key}`}
        >
          <Save className="h-3 w-3 mr-1" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
          Cancel
        </Button>
      </div>
    );
  };

  // Filter settings by category
  const filteredSettings = platformSettings?.filter(setting => 
    categoryFilter === 'all' || setting.category === categoryFilter
  );

  // Get unique categories for filter
  const categories = Array.from(new Set(platformSettings?.map(s => s.category) || [])).sort();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5" />
              <CardTitle>Platform Settings</CardTitle>
            </div>
            {(!platformSettings || platformSettings.length === 0) && import.meta.env.DEV && (
              <Button 
                onClick={() => seedPlatformSettingsMutation.mutate()}
                disabled={seedPlatformSettingsMutation.isPending}
                size="sm"
                data-testid="button-seed-settings"
              >
                <Plus className="h-4 w-4 mr-1" />
                {seedPlatformSettingsMutation.isPending ? "Seeding..." : "Seed Settings"}
              </Button>
            )}
          </div>
          <CardDescription>Configure platform-wide settings with inline editing</CardDescription>
        </CardHeader>
        <CardContent>
          {platformSettings && platformSettings.length > 0 ? (
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium">Filter by Category:</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]" data-testid="select-category-filter">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Settings Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSettings && filteredSettings.length > 0 ? (
                    filteredSettings.map((setting) => (
                      <TableRow key={setting.id} data-testid={`row-setting-${setting.key}`}>
                        <TableCell className="font-mono text-sm">{setting.key}</TableCell>
                        <TableCell>{renderEditableValue(setting)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-md">
                          {setting.description}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{setting.category}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No settings found for this category
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <Separator />

              {/* Audit Logs Section */}
              <Collapsible open={showAuditLogs} onOpenChange={setShowAuditLogs}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:underline" data-testid="button-toggle-audit-logs">
                  <Clock className="h-4 w-4" />
                  Recent Changes
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAuditLogs ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  {auditLogs && auditLogs.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Setting</TableHead>
                            <TableHead>Old Value</TableHead>
                            <TableHead>New Value</TableHead>
                            <TableHead>Changed At</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="font-mono text-sm">{log.settingKey}</TableCell>
                              <TableCell className="text-muted-foreground">{log.oldValue}</TableCell>
                              <TableCell className="font-medium">{log.newValue}</TableCell>
                              <TableCell className="text-sm">
                                {new Date(log.changedAt).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No changes recorded yet</p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">No platform settings configured</p>
              <p className="text-xs text-muted-foreground">Click "Seed Settings" to populate default configuration</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <CardTitle>Membership Tiers</CardTitle>
            </div>
            {(!benefits || benefits.length === 0) && import.meta.env.DEV && (
              <Button 
                onClick={() => seedMembershipBenefitsMutation.mutate()}
                disabled={seedMembershipBenefitsMutation.isPending}
                size="sm"
                data-testid="button-seed-tiers"
              >
                <Plus className="h-4 w-4 mr-1" />
                {seedMembershipBenefitsMutation.isPending ? "Seeding..." : "Seed Tiers"}
              </Button>
            )}
          </div>
          <CardDescription>Configure pricing and features for each membership tier</CardDescription>
        </CardHeader>
        <CardContent>
          {benefits && benefits.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map((benefit) => (
                <Card key={benefit.tier} data-testid={`card-tier-${benefit.tier}`}>
                  <CardHeader>
                    <CardTitle className="capitalize flex items-center justify-between">
                      <span className="text-lg">{benefit.tier}</span>
                      <Badge variant={benefit.tier === 'premium' ? 'default' : 'secondary'} className="text-base px-3">
                        ${benefit.monthlyPrice}/mo
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editingBenefit === benefit.tier ? (
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`max-rfqs-${benefit.tier}`}>Max Active RFQs</Label>
                          <Input
                            id={`max-rfqs-${benefit.tier}`}
                            type="number"
                            value={benefitForm.maxActiveRFQs}
                            onChange={(e) => setbenefitForm({ ...benefitForm, maxActiveRFQs: parseInt(e.target.value) })}
                            data-testid={`input-max-rfqs-${benefit.tier}`}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`price-${benefit.tier}`}>Monthly Price ($)</Label>
                          <Input
                            id={`price-${benefit.tier}`}
                            value={benefitForm.monthlyPrice}
                            onChange={(e) => setbenefitForm({ ...benefitForm, monthlyPrice: e.target.value })}
                            data-testid={`input-price-${benefit.tier}`}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveBenefit} disabled={updateBenefitMutation.isPending} data-testid={`button-save-${benefit.tier}`}>
                            Save
                          </Button>
                          <Button variant="outline" onClick={() => setEditingBenefit(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Max Listings</span>
                            <Badge variant="outline">
                              {benefit.maxActiveRFQs === -1 ? 'Unlimited' : benefit.maxActiveRFQs}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Analytics</span>
                            {benefit.canAccessAnalytics ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Direct Messaging</span>
                            {benefit.canDirectMessage ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Priority Support</span>
                            {benefit.prioritySupport ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Search Ranking</span>
                            <Badge variant="outline">Rank {benefit.visibilityRanking}</Badge>
                          </div>
                        </div>
                        <Button className="w-full" variant="outline" onClick={() => handleEditBenefit(benefit.tier)} data-testid={`button-edit-${benefit.tier}`}>
                          Edit Tier
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">No membership tiers configured</p>
              <p className="text-xs text-muted-foreground">Click "Seed Tiers" to populate default membership tiers (Basic, Standard, Premium)</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            <CardTitle>Commission Rates</CardTitle>
          </div>
          <CardDescription>Platform commission on transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Standard Commission</p>
                <p className="text-sm text-muted-foreground">Applied to all marketplace transactions</p>
              </div>
              <Badge variant="outline" className="text-lg px-3">5%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <CardTitle>Platform Branding</CardTitle>
          </div>
          <CardDescription>Company name, logo, and visual identity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Company Name</Label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="font-medium">Fusion Mining Limited</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Platform Tagline</Label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-muted-foreground">B2B Mining Marketplace & Investment Platform</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
