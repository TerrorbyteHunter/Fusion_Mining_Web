import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Plus, Edit, Trash2 } from "lucide-react";
import type { EmailTemplate } from "@shared/schema";

export function CommunicationSettings() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [templateForm, setTemplateForm] = useState({
    templateKey: "",
    subject: "",
    bodyHtml: "",
    variables: [] as string[],
  });

  const { data: emailTemplates } = useQuery<EmailTemplate[]>({
    queryKey: ["/api/email-templates"],
  });

  const createTemplateMutation = useMutation({
    mutationFn: async (data: any) =>
      apiRequest("POST", "/api/email-templates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/email-templates"] });
      toast({ title: "Success", description: "Email template created" });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create template", variant: "destructive" });
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) =>
      apiRequest("PATCH", `/api/email-templates/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/email-templates"] });
      toast({ title: "Success", description: "Email template updated" });
      setEditingTemplate(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update template", variant: "destructive" });
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: string) =>
      apiRequest("DELETE", `/api/email-templates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/email-templates"] });
      toast({ title: "Success", description: "Email template deleted" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete template", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setTemplateForm({
      templateKey: "",
      subject: "",
      bodyHtml: "",
      variables: [],
    });
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setTemplateForm({
      templateKey: template.templateKey,
      subject: template.subject,
      bodyHtml: template.bodyHtml,
      variables: template.variables || [],
    });
  };

  const handleCreateTemplate = () => {
    createTemplateMutation.mutate(templateForm);
  };

  const handleUpdateTemplate = () => {
    if (editingTemplate) {
      updateTemplateMutation.mutate({ id: editingTemplate.id, data: templateForm });
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>Email Templates</CardTitle>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-template">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Email Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable email template for system notifications
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="template-name">Template Key</Label>
                    <Input
                      id="template-name"
                      value={templateForm.templateKey}
                      onChange={(e) => setTemplateForm({ ...templateForm, templateKey: e.target.value })}
                      placeholder="welcome_email"
                      data-testid="input-template-name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="template-subject">Subject Line</Label>
                    <Input
                      id="template-subject"
                      value={templateForm.subject}
                      onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                      placeholder="Welcome to Fusion Mining"
                      data-testid="input-template-subject"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="template-body">Email Body (HTML)</Label>
                    <Textarea
                      id="template-body"
                      value={templateForm.bodyHtml}
                      onChange={(e) => setTemplateForm({ ...templateForm, bodyHtml: e.target.value })}
                      placeholder="<p>Hello {{firstName}},</p><p>Welcome to our platform...</p>"
                      rows={10}
                      data-testid="input-template-body"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTemplate}
                    disabled={createTemplateMutation.isPending || !templateForm.templateKey}
                    data-testid="button-submit-template"
                  >
                    {createTemplateMutation.isPending ? "Creating..." : "Create Template"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>Manage email templates for automated notifications</CardDescription>
        </CardHeader>
        <CardContent>
          {emailTemplates && emailTemplates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Variables</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emailTemplates.map((template) => (
                  <TableRow key={template.id} data-testid={`row-template-${template.id}`}>
                    <TableCell className="font-mono text-sm">{template.templateKey}</TableCell>
                    <TableCell className="font-medium">{template.subject}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {template.variables?.map((variable) => (
                          <Badge key={variable} variant="outline" className="font-mono text-xs">
                            {`{{${variable}}}`}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                          data-testid={`button-edit-template-${template.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteTemplateMutation.mutate(template.id)}
                          data-testid={`button-delete-template-${template.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No email templates configured</p>
          )}
        </CardContent>
      </Card>

      {editingTemplate && (
        <Dialog open={!!editingTemplate} onOpenChange={() => setEditingTemplate(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Email Template</DialogTitle>
              <DialogDescription>Update the email template</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-template-name">Template Key</Label>
                <Input
                  id="edit-template-name"
                  value={templateForm.templateKey}
                  onChange={(e) => setTemplateForm({ ...templateForm, templateKey: e.target.value })}
                  data-testid="input-edit-template-name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-template-subject">Subject Line</Label>
                <Input
                  id="edit-template-subject"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                  data-testid="input-edit-template-subject"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-template-body">Email Body (HTML)</Label>
                <Textarea
                  id="edit-template-body"
                  value={templateForm.bodyHtml}
                  onChange={(e) => setTemplateForm({ ...templateForm, bodyHtml: e.target.value })}
                  rows={10}
                  data-testid="input-edit-template-body"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdateTemplate}
                disabled={updateTemplateMutation.isPending}
                data-testid="button-update-template"
              >
                {updateTemplateMutation.isPending ? "Updating..." : "Update Template"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
