import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Shield, Activity, Plus } from "lucide-react";
import type { DocumentTemplate, VerificationRule, AdminAuditLog } from "@shared/schema";

export function LegalCompliance() {
  const { toast } = useToast();
  const [isCreateDocDialogOpen, setIsCreateDocDialogOpen] = useState(false);
  const [isCreateRuleDialogOpen, setIsCreateRuleDialogOpen] = useState(false);
  const [docForm, setDocForm] = useState({ templateName: "", content: "" });
  const [ruleForm, setRuleForm] = useState({ ruleName: "", active: true, minDocuments: 0 });

  const { data: documentTemplates } = useQuery<DocumentTemplate[]>({
    queryKey: ["/api/document-templates"],
  });

  const { data: verificationRules } = useQuery<VerificationRule[]>({
    queryKey: ["/api/verification-rules"],
  });

  const { data: auditLogs } = useQuery<AdminAuditLog[]>({
    queryKey: ["/api/admin/audit-logs"],
  });

  const createDocumentMutation = useMutation({
    mutationFn: async (data: any) =>
      apiRequest("POST", "/api/document-templates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/document-templates"] });
      toast({ title: "Success", description: "Document template created" });
      setIsCreateDocDialogOpen(false);
      setDocForm({ templateName: "", content: "" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create document", variant: "destructive" });
    },
  });

  const createRuleMutation = useMutation({
    mutationFn: async (data: any) =>
      apiRequest("POST", "/api/verification-rules", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/verification-rules"] });
      toast({ title: "Success", description: "Verification rule created" });
      setIsCreateRuleDialogOpen(false);
      setRuleForm({ ruleName: "", active: true, minDocuments: 0 });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create rule", variant: "destructive" });
    },
  });

  const toggleRuleMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) =>
      apiRequest("PATCH", `/api/verification-rules/${id}`, { active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/verification-rules"] });
      toast({ title: "Success", description: "Verification rule updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update rule", variant: "destructive" });
    },
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle>Document Templates</CardTitle>
            </div>
            <Dialog open={isCreateDocDialogOpen} onOpenChange={setIsCreateDocDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-document">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Document Template</DialogTitle>
                  <DialogDescription>
                    Create a legal document template (Terms of Service, Privacy Policy, etc.)
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="doc-name">Document Name</Label>
                    <Input
                      id="doc-name"
                      value={docForm.templateName}
                      onChange={(e) => setDocForm({ ...docForm, templateName: e.target.value })}
                      placeholder="Terms of Service"
                      data-testid="input-doc-name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDocDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => createDocumentMutation.mutate(docForm)}
                    disabled={createDocumentMutation.isPending || !docForm.templateName}
                    data-testid="button-submit-document"
                  >
                    {createDocumentMutation.isPending ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>Legal document templates for the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {documentTemplates && documentTemplates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentTemplates.map((doc) => (
                  <TableRow key={doc.id} data-testid={`row-document-${doc.id}`}>
                    <TableCell className="font-medium">{doc.templateName}</TableCell>
                    <TableCell><Badge variant="outline">{doc.documentType}</Badge></TableCell>
                    <TableCell className="font-mono text-sm">{doc.version}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(doc.updatedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No document templates configured</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>KYC/AML Verification Rules</CardTitle>
            </div>
            <Dialog open={isCreateRuleDialogOpen} onOpenChange={setIsCreateRuleDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-rule">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Rule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Verification Rule</DialogTitle>
                  <DialogDescription>
                    Add a new KYC/AML verification rule
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="rule-type">Rule Name</Label>
                    <Input
                      id="rule-type"
                      value={ruleForm.ruleName}
                      onChange={(e) => setRuleForm({ ...ruleForm, ruleName: e.target.value })}
                      placeholder="Identity Verification"
                      data-testid="input-rule-type"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="min-threshold">Minimum Documents</Label>
                    <Input
                      id="min-threshold"
                      type="number"
                      value={ruleForm.minDocuments}
                      onChange={(e) => setRuleForm({ ...ruleForm, minDocuments: parseInt(e.target.value) })}
                      data-testid="input-min-threshold"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateRuleDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => createRuleMutation.mutate(ruleForm)}
                    disabled={createRuleMutation.isPending || !ruleForm.ruleName}
                    data-testid="button-submit-rule"
                  >
                    {createRuleMutation.isPending ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>Configure verification requirements and thresholds</CardDescription>
        </CardHeader>
        <CardContent>
          {verificationRules && verificationRules.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Type</TableHead>
                  <TableHead>Min Threshold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verificationRules.map((rule) => (
                  <TableRow key={rule.id} data-testid={`row-rule-${rule.id}`}>
                    <TableCell className="font-medium">{rule.ruleName}</TableCell>
                    <TableCell>{rule.minDocuments}</TableCell>
                    <TableCell>
                      <Badge variant={rule.active ? "default" : "outline"}>
                        {rule.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={rule.active}
                        onCheckedChange={(checked) =>
                          toggleRuleMutation.mutate({ id: rule.id, active: checked })
                        }
                        data-testid={`switch-rule-${rule.id}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No verification rules configured</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <CardTitle>Admin Audit Log</CardTitle>
          </div>
          <CardDescription>Track all administrative actions on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {auditLogs && auditLogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.slice(0, 20).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-muted-foreground">
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">{log.adminId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{log.targetType} {log.targetId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No audit logs available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
