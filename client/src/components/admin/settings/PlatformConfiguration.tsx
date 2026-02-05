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
import { Sliders, Award, Percent, Save, ChevronDown, Clock, Edit2, Database } from "lucide-react";
import type { PlatformSetting, MembershipBenefit, SettingsAudit } from "@shared/schema";
import { cn } from "@/lib/utils";

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

  const { data: platformSettings } = useQuery<PlatformSetting[]>({
    queryKey: ["/api/admin/settings/platform"],
  });

  const { data: auditLogs } = useQuery<SettingsAudit[]>({
    queryKey: ["/api/admin/settings/audit"],
    enabled: showAuditLogs,
  });

  const { data: benefits } = useQuery<MembershipBenefit[]>({
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

  const seedSettingsMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/admin/settings/seed"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings/platform"] });
      toast({ title: "Success", description: "Default settings seeded" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to seed settings", variant: "destructive" });
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

    // Numeric and boolean settings cannot be empty
    if (((setting.dataType as string) === 'number' || (setting.dataType as string) === 'boolean') && editingValue.trim() === '') {
      toast({
        title: "Validation Error",
        description: `${setting.dataType === 'number' ? 'Number' : 'Boolean'} settings cannot be empty`,
        variant: "destructive"
      });
      return;
    }

    // Number validation
    if (setting.dataType === 'number' && isNaN(Number(editingValue))) {
      toast({
        title: "Validation Error",
        description: "Value must be a valid number",
        variant: "destructive"
      });
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

    // Real-time validation
    const isEmpty = editingValue.trim() === '';
    const isNumericOrBoolean = (setting.dataType as string) === 'number' || (setting.dataType as string) === 'boolean';
    const isInvalidNumber = setting.dataType === 'number' && !isEmpty && isNaN(Number(editingValue));
    const hasValidationError = (isNumericOrBoolean && isEmpty) || isInvalidNumber;

    let errorMessage = '';
    if (isNumericOrBoolean && isEmpty) {
      errorMessage = `${setting.dataType === 'number' ? 'Number' : 'Boolean'} settings cannot be empty`;
    } else if (isInvalidNumber) {
      errorMessage = 'Must be a valid number';
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <Input
            type={setting.dataType === 'number' ? 'number' : 'text'}
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            className={`max-w-xs ${hasValidationError ? 'border-destructive' : ''}`}
            data-testid={`input-${setting.key}`}
          />
          {hasValidationError && (
            <span className="text-xs text-destructive">{errorMessage}</span>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => handleSaveSetting(setting.id)}
          disabled={updateSettingMutation.isPending || hasValidationError}
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
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAuditLogs(!showAuditLogs)}
              >
                <Clock className="h-4 w-4 mr-2" />
                {showAuditLogs ? "Hide Audit Logs" : "Show Audit Logs"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
                onClick={() => seedSettingsMutation.mutate()}
                disabled={seedSettingsMutation.isPending}
              >
                <Database className={cn("h-4 w-4 mr-2", seedSettingsMutation.isPending && "animate-spin")} />
                Seed Defaults
              </Button>
            </div>
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
                              <TableCell className="font-mono text-xs">{log.settingKey}</TableCell>
                              <TableCell className="text-xs">{log.oldValue}</TableCell>
                              <TableCell className="text-xs">{log.newValue}</TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {new Date(log.changedAt).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No audit logs found
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : (
            <div className="text-center py-12">
              <Database className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No Platform Settings</h3>
              <p className="text-muted-foreground mb-6">Initialize your platform with default settings.</p>
              <Button onClick={() => seedSettingsMutation.mutate()} disabled={seedSettingsMutation.isPending}>
                Seed Default Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            <CardTitle>Membership Benefits</CardTitle>
          </div>
          <CardDescription>Control feature limits for different user tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {['basic', 'standard', 'premium'].map((tier) => {
              const benefit = benefits?.find((b) => b.tier === tier);
              const isEditing = editingBenefit === tier;

              return (
                <div key={tier} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={tier === 'gold' ? 'default' : 'outline'} className="capitalize">
                      {tier}
                    </Badge>
                    {!isEditing && (
                      <Button variant="ghost" size="sm" onClick={() => handleEditBenefit(tier)}>
                        Edit
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">Max Active RFQs</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={benefitForm.maxActiveRFQs}
                          onChange={(e) => setbenefitForm({ ...benefitForm, maxActiveRFQs: parseInt(e.target.value) })}
                        />
                      ) : (
                        <p className="font-medium">{benefit?.maxActiveRFQs || 0}</p>
                      )}
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">Monthly Price</Label>
                      {isEditing ? (
                        <Input
                          value={benefitForm.monthlyPrice}
                          onChange={(e) => setbenefitForm({ ...benefitForm, monthlyPrice: e.target.value })}
                        />
                      ) : (
                        <p className="font-medium">${benefit?.monthlyPrice || '0.00'}</p>
                      )}
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">Visibility Ranking</Label>
                      {isEditing ? (
                        <Select
                          value={benefitForm.visibilityRanking.toString()}
                          onValueChange={(val) => setbenefitForm({ ...benefitForm, visibilityRanking: parseInt(val) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 (Highest)</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3 (Normal)</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium">Level {benefit?.visibilityRanking || 3}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1" onClick={handleSaveBenefit} disabled={updateBenefitMutation.isPending}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingBenefit(null)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            <CardTitle>Commission Structure</CardTitle>
          </div>
          <CardDescription>Default transactional fees and rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <div className="space-y-1">
              <p className="font-medium">Standard Marketplace Commission</p>
              <p className="text-sm text-muted-foreground italic">Applied to all successful project closures</p>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {platformSettings?.find(s => s.key === 'commission_rate')?.value || '0.0'}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
