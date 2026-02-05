import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  FileText,
  BarChart3,
  Crown,
  ChevronDown,
  Users,
  Search,
  MoreVertical,
  Mail,
  UserPlus,
  Lock,
  MessageSquare
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User, AdminPermissions } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";

interface AdminRoleDefinition {
  role: 'super_admin' | 'verification_admin' | 'content_admin' | 'analytics_admin' | 'support_admin';
  label: string;
  description: string;
  icon: any;
  color: string;
  permissions: {
    label: string;
    key: keyof AdminPermissions;
    value: boolean;
  }[];
}

const adminRoleDefinitions: AdminRoleDefinition[] = [
  {
    role: 'super_admin',
    label: 'Super Admin',
    description: 'Full platform control with all permissions (founder-level access)',
    icon: Crown,
    color: 'text-yellow-600 dark:text-yellow-500',
    permissions: [
      { label: 'Manage Users', key: 'canManageUsers', value: true },
      { label: 'Manage Admins', key: 'canManageAdmins', value: true },
      { label: 'Manage Listings', key: 'canManageListings', value: true },
      { label: 'Manage Projects', key: 'canManageProjects', value: true },
      { label: 'Manage Verification', key: 'canManageVerification', value: true },
      { label: 'Manage CMS & Blog', key: 'canManageCMS', value: true },
      { label: 'Manage Messages', key: 'canManageMessages', value: true },
      { label: 'View Analytics', key: 'canViewAnalytics', value: true },
      { label: 'Manage Settings', key: 'canManageSettings', value: true },
      { label: 'Access Audit Logs', key: 'canAccessAuditLogs', value: true },
      { label: 'Manage Documents', key: 'canManageDocuments', value: true },
      { label: 'Reset Passwords', key: 'canResetPasswords', value: true },
      { label: 'Force Logout Users', key: 'canForceLogout', value: true },
    ],
  },
  {
    role: 'verification_admin',
    label: 'Verification & Support Admin',
    description: 'Handle compliance, KYC/AML, listing approvals, and user support operations',
    icon: ShieldCheck,
    color: 'text-blue-600 dark:text-blue-500',
    permissions: [
      { label: 'Manage Verification', key: 'canManageVerification', value: true },
      { label: 'Manage Listings', key: 'canManageListings', value: true },
      { label: 'Manage Documents', key: 'canManageDocuments', value: true },
      { label: 'Manage Messages', key: 'canManageMessages', value: true },
      { label: 'Reset Passwords', key: 'canResetPasswords', value: true },
      { label: 'Force Logout Users', key: 'canForceLogout', value: true },
      { label: 'View Analytics', key: 'canViewAnalytics', value: true },
      { label: 'Access Audit Logs', key: 'canAccessAuditLogs', value: true },
    ],
  },
  {
    role: 'content_admin',
    label: 'Content Admin',
    description: 'Manage platform content, branding, and CMS',
    icon: FileText,
    color: 'text-purple-600 dark:text-purple-500',
    permissions: [
      { label: 'Manage CMS & Blog', key: 'canManageCMS', value: true },
      { label: 'Manage Projects', key: 'canManageProjects', value: true },
      { label: 'Manage Documents', key: 'canManageDocuments', value: true },
      { label: 'View Analytics', key: 'canViewAnalytics', value: true },
    ],
  },
  {
    role: 'analytics_admin',
    label: 'Analytics Admin',
    description: 'Monitor platform performance and fraud detection',
    icon: BarChart3,
    color: 'text-orange-600 dark:text-orange-500',
    permissions: [
      { label: 'View Analytics', key: 'canViewAnalytics', value: true },
      { label: 'Access Audit Logs', key: 'canAccessAuditLogs', value: true },
      { label: 'Manage Listings', key: 'canManageListings', value: true },
      { label: 'Manage Projects', key: 'canManageProjects', value: true },
    ],
  },
];

export function AdminControls() {
  const [roleInfoExpanded, setRoleInfoExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [editPermissionsOpen, setEditPermissionsOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<(User & { adminRole?: string; permissions?: AdminPermissions }) | null>(null);

  // Form states for Add Staff
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    adminRole: "content_admin" as const
  });

  // Fetch all users with permissions
  const { data: users, isLoading } = useQuery<(User & { adminRole?: string; permissions?: AdminPermissions })[]>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/users");
      return res.json();
    }
  });

  const staff = users?.filter(u => u.role === 'admin') || [];
  const filteredStaff = staff.filter(s =>
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addStaffMutation = useMutation({
    mutationFn: async (data: typeof newStaff) => {
      // 1. Create user
      const userRes = await apiRequest("POST", "/api/admin/users", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        role: 'admin'
      });
      const user = await userRes.json();

      // 2. Set admin role and default permissions
      await apiRequest("PATCH", `/api/admin/users/${user.id}/admin-role`, {
        adminRole: data.adminRole
      });

      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setAddStaffOpen(false);
      setNewStaff({ firstName: "", lastName: "", email: "", username: "", password: "", adminRole: "content_admin" });
      toast({ title: "Staff member added successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add staff", description: error.message, variant: "destructive" });
    }
  });

  const updatePermissionsMutation = useMutation({
    mutationFn: async (data: { userId: string; permissions: Partial<AdminPermissions> }) => {
      const res = await apiRequest("PUT", `/api/admin/users/${data.userId}/custom-permissions`, data.permissions);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setEditPermissionsOpen(false);
      toast({ title: "Permissions updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update permissions", description: error.message, variant: "destructive" });
    }
  });

  const handleContactAdmin = (admin: User) => {
    // In a real app, this would redirect to a message thread or open a chat
    // For now, we'll navigate to support messages
    setLocation(`/dashboard/messages?new=true&recipientId=${admin.id}`);
    toast({ title: "Redirecting to messages...", description: `Starting conversation with ${admin.firstName}` });
  };

  const handleEditPermissions = (person: any) => {
    setSelectedStaff(person);
    setEditPermissionsOpen(true);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Administrative Staff
            </CardTitle>
            <CardDescription>Manage your team and their platform permissions</CardDescription>
          </div>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setAddStaffOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search staff members..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground italic">Loading team...</TableCell>
                </TableRow>
              ) : filteredStaff.length > 0 ? (
                filteredStaff.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                          {person.firstName?.[0]}{person.lastName?.[0]}
                        </div>
                        <div>
                          <div className="font-medium">{person.firstName} {person.lastName}</div>
                          <div className="text-[10px] text-muted-foreground">@{person.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 font-mono text-xs">{person.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 capitalize">
                        {person.adminRole?.replace('_', ' ') || 'Admin'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleContactAdmin(person)}>
                            <MessageSquare className="h-4 w-4" />
                            Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleEditPermissions(person)}>
                            <ShieldCheck className="h-4 w-4" />
                            Edit Permissions
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No staff members found matching your search</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <Dialog open={addStaffOpen} onOpenChange={setAddStaffOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>
              Create a new administrative account. They will be assigned default permissions based on their role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={newStaff.firstName} onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={newStaff.lastName} onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={newStaff.username} onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Initial Password</Label>
              <Input id="password" type="password" value={newStaff.password} onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Admin Role</Label>
              <Select value={newStaff.adminRole} onValueChange={(val: any) => setNewStaff({ ...newStaff, adminRole: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="verification_admin">Verification Admin</SelectItem>
                  <SelectItem value="content_admin">Content Admin</SelectItem>
                  <SelectItem value="analytics_admin">Analytics Admin</SelectItem>
                  <SelectItem value="support_admin">Support Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddStaffOpen(false)}>Cancel</Button>
            <Button onClick={() => addStaffMutation.mutate(newStaff)} disabled={addStaffMutation.isPending}>
              {addStaffMutation.isPending ? "Creating..." : "Create Staff Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permissions Dialog */}
      <Dialog open={editPermissionsOpen} onOpenChange={setEditPermissionsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Permissions: {selectedStaff?.firstName} {selectedStaff?.lastName}</DialogTitle>
            <DialogDescription>
              Adjust granular permissions for this administrator.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1 py-4">
            {selectedStaff?.permissions && Object.keys(selectedStaff.permissions).filter(k => k.startsWith('can')).map((key) => (
              <div key={key} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium capitalize">{key.replace('can', '').replace(/([A-Z])/g, ' $1')}</Label>
                </div>
                <Checkbox
                  checked={(selectedStaff.permissions as any)[key]}
                  onCheckedChange={(checked) => {
                    setSelectedStaff({
                      ...selectedStaff,
                      permissions: {
                        ...selectedStaff.permissions!,
                        [key]: checked
                      }
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <DialogFooter className="sticky bottom-0 bg-white pt-2 border-t mt-4">
            <Button variant="outline" onClick={() => setEditPermissionsOpen(false)}>Cancel</Button>
            <Button
              onClick={() => updatePermissionsMutation.mutate({
                userId: selectedStaff!.id,
                permissions: selectedStaff!.permissions!
              })}
              disabled={updatePermissionsMutation.isPending}
            >
              {updatePermissionsMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Role Definitions Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <CardTitle>Role Types & Capabilities</CardTitle>
          </div>
          <CardDescription>
            Reference for specialized the four admin roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {adminRoleDefinitions.map((roledef) => {
            const RoleIcon = roledef.icon;
            const isExpanded = roleInfoExpanded === roledef.role;

            return (
              <Collapsible
                key={roledef.role}
                open={isExpanded}
                onOpenChange={() => setRoleInfoExpanded(isExpanded ? null : roledef.role)}
              >
                <div className="border rounded-md hover-elevate transition-all">
                  <CollapsibleTrigger className="w-full" data-testid={`collapsible-${roledef.role}`}>
                    <div className="flex flex-row flex-wrap items-center justify-between gap-2 p-4">
                      <div className="flex items-center gap-3">
                        <RoleIcon className={`h-5 w-5 ${roledef.color}`} />
                        <div className="text-left">
                          <h4 className="text-sm font-semibold text-slate-800">{roledef.label}</h4>
                          <p className="text-xs text-muted-foreground">{roledef.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2 border-t border-slate-50 bg-slate-50/30">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {roledef.permissions.map((perm, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Badge variant={perm.value ? "default" : "outline"} className="text-[10px] h-5">
                              {perm.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
