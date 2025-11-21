import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Shield, Users, LogOut, AlertTriangle, UserCog, Award, ShieldCheck, FileText, MessageSquare, BarChart3, Crown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import type { User, AdminPermissions } from "@shared/schema";

type ActionType = 'logout' | 'delete' | 'role' | 'tier' | 'admin-role';

interface AdminRoleDefinition {
  role: 'super_admin' | 'verification_admin' | 'content_admin' | 'support_admin' | 'analytics_admin';
  label: string;
  description: string;
  icon: any;
  color: string;
  permissions: {
    label: string;
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
      { label: 'Manage Users', value: true },
      { label: 'Manage Admins', value: true },
      { label: 'Manage Listings', value: true },
      { label: 'Manage Projects', value: true },
      { label: 'Manage Verification', value: true },
      { label: 'Manage CMS & Blog', value: true },
      { label: 'Manage Messages', value: true },
      { label: 'View Analytics', value: true },
      { label: 'Manage Settings', value: true },
      { label: 'Access Audit Logs', value: true },
      { label: 'Manage Documents', value: true },
      { label: 'Reset Passwords', value: true },
      { label: 'Force Logout Users', value: true },
    ],
  },
  {
    role: 'verification_admin',
    label: 'Verification Admin',
    description: 'Handle compliance, KYC/AML, and listing approvals',
    icon: ShieldCheck,
    color: 'text-blue-600 dark:text-blue-500',
    permissions: [
      { label: 'Manage Verification', value: true },
      { label: 'Manage Listings', value: true },
      { label: 'Manage Documents', value: true },
      { label: 'View Analytics', value: true },
      { label: 'Access Audit Logs', value: true },
    ],
  },
  {
    role: 'content_admin',
    label: 'Content Admin',
    description: 'Manage platform content, branding, and CMS',
    icon: FileText,
    color: 'text-purple-600 dark:text-purple-500',
    permissions: [
      { label: 'Manage CMS & Blog', value: true },
      { label: 'Manage Projects', value: true },
      { label: 'Manage Documents', value: true },
      { label: 'View Analytics', value: true },
    ],
  },
  {
    role: 'support_admin',
    label: 'Support Admin',
    description: 'Handle user communication and issue resolution',
    icon: MessageSquare,
    color: 'text-green-600 dark:text-green-500',
    permissions: [
      { label: 'Manage Messages', value: true },
      { label: 'Reset Passwords', value: true },
      { label: 'Force Logout Users', value: true },
      { label: 'View Analytics', value: true },
      { label: 'Access Audit Logs', value: true },
    ],
  },
  {
    role: 'analytics_admin',
    label: 'Analytics Admin',
    description: 'Monitor platform performance and fraud detection',
    icon: BarChart3,
    color: 'text-orange-600 dark:text-orange-500',
    permissions: [
      { label: 'View Analytics', value: true },
      { label: 'Access Audit Logs', value: true },
      { label: 'Manage Listings', value: true },
      { label: 'Manage Projects', value: true },
    ],
  },
];

export function AdminControls() {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('logout');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [selectedAdminRole, setSelectedAdminRole] = useState<string>('');
  const [userRoleTab, setUserRoleTab] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  const [roleInfoExpanded, setRoleInfoExpanded] = useState<string | null>(null);

  // Fetch users filtered by role
  const { data: buyers } = useQuery<User[]>({
    queryKey: ["/api/admin/users/by-role", "buyer"],
    queryFn: () => fetch(`/api/admin/users/by-role/buyer`).then(res => res.json()),
  });

  const { data: sellers } = useQuery<User[]>({
    queryKey: ["/api/admin/users/by-role", "seller"],
    queryFn: () => fetch(`/api/admin/users/by-role/seller`).then(res => res.json()),
  });

  const { data: admins } = useQuery<(User & { adminRole?: string; permissions?: AdminPermissions })[]>({
    queryKey: ["/api/admin/users/by-role", "admin"],
    queryFn: () => fetch(`/api/admin/users/by-role/admin`).then(res => res.json()),
  });

  const forceLogoutMutation = useMutation({
    mutationFn: async (userId: string) =>
      apiRequest("POST", `/api/admin/users/${userId}/force-logout`),
    onSuccess: () => {
      toast({ title: "Success", description: "User has been logged out" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setIsDialogOpen(false);
      setSelectedUser(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to log out user", variant: "destructive" });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) =>
      apiRequest("DELETE", `/api/admin/users/${userId}`),
    onSuccess: () => {
      toast({ title: "Success", description: "User has been deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setIsDialogOpen(false);
      setSelectedUser(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete user", variant: "destructive" });
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) =>
      apiRequest("PATCH", `/api/admin/users/${userId}/role`, { role }),
    onSuccess: () => {
      toast({ title: "Success", description: "User role has been updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users/by-role", "admin"] });
      setIsDialogOpen(false);
      setSelectedUser(null);
      setSelectedRole('');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user role", variant: "destructive" });
    },
  });

  const changeTierMutation = useMutation({
    mutationFn: async ({ userId, tier }: { userId: string; tier: string }) =>
      apiRequest("POST", `/api/admin/users/${userId}/tier`, { tier }),
    onSuccess: () => {
      toast({ title: "Success", description: "User membership tier has been updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users/by-role", "buyer"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users/by-role", "seller"] });
      setIsDialogOpen(false);
      setSelectedUser(null);
      setSelectedTier('');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update membership tier", variant: "destructive" });
    },
  });

  const changeAdminRoleMutation = useMutation({
    mutationFn: async ({ userId, adminRole }: { userId: string; adminRole: string }) =>
      apiRequest("PATCH", `/api/admin/users/${userId}/admin-role`, { adminRole }),
    onSuccess: () => {
      toast({ title: "Success", description: "Admin role has been updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users/by-role", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/permissions"] });
      setIsDialogOpen(false);
      setSelectedUser(null);
      setSelectedAdminRole('');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update admin role", variant: "destructive" });
    },
  });

  const openActionDialog = (user: User, action: ActionType) => {
    setSelectedUser(user);
    setActionType(action);
    if (action === 'role') {
      setSelectedRole(user.role);
    }
    if (action === 'tier') {
      setSelectedTier(user.membershipTier);
    }
    if (action === 'admin-role') {
      setSelectedAdminRole((user as any).adminRole || 'content_admin');
    }
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedUser) return;
    
    switch (actionType) {
      case 'logout':
        forceLogoutMutation.mutate(selectedUser.id);
        break;
      case 'delete':
        deleteUserMutation.mutate(selectedUser.id);
        break;
      case 'role':
        if (selectedRole) {
          changeRoleMutation.mutate({ userId: selectedUser.id, role: selectedRole });
        }
        break;
      case 'tier':
        if (selectedTier) {
          changeTierMutation.mutate({ userId: selectedUser.id, tier: selectedTier });
        }
        break;
      case 'admin-role':
        if (selectedAdminRole) {
          changeAdminRoleMutation.mutate({ userId: selectedUser.id, adminRole: selectedAdminRole });
        }
        break;
    }
  };

  const getDialogContent = () => {
    switch (actionType) {
      case 'logout':
        return {
          title: 'Force User Logout',
          description: `This will immediately terminate all active sessions for ${selectedUser?.firstName} ${selectedUser?.lastName}. They will need to log in again to access the platform.`,
          icon: <LogOut className="h-5 w-5 text-destructive" />,
        };
      case 'delete':
        return {
          title: 'Delete User',
          description: `Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone and will remove all user data.`,
          icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
        };
      case 'role':
        return {
          title: 'Change User Role',
          description: `Update the role for ${selectedUser?.firstName} ${selectedUser?.lastName}. This will affect their permissions and access level.`,
          icon: <UserCog className="h-5 w-5" />,
        };
      case 'tier':
        return {
          title: 'Change Membership Tier',
          description: `Update the membership tier for ${selectedUser?.firstName} ${selectedUser?.lastName}. This will affect their feature access and limits.`,
          icon: <Award className="h-5 w-5" />,
        };
      case 'admin-role':
        return {
          title: 'Assign Admin Role',
          description: `Assign a specific admin role to ${selectedUser?.firstName} ${selectedUser?.lastName}. This will determine their administrative permissions.`,
          icon: <Shield className="h-5 w-5" />,
        };
      default:
        return {
          title: 'Action',
          description: 'Select an action',
          icon: <UserCog className="h-5 w-5" />,
        };
    }
  };

  const getRoleBadgeVariant = (role: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (role) {
      case 'super_admin': return 'destructive';
      case 'verification_admin': return 'default';
      case 'content_admin': return 'secondary';
      case 'support_admin': return 'outline';
      case 'analytics_admin': return 'outline';
      default: return 'outline';
    }
  };

  const formatRoleLabel = (role: string | undefined): string => {
    if (!role) return 'Unassigned';
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const dialogContent = getDialogContent();
  const isPending = forceLogoutMutation.isPending || deleteUserMutation.isPending || 
                    changeRoleMutation.isPending || changeTierMutation.isPending ||
                    changeAdminRoleMutation.isPending;

  return (
    <div className="grid gap-6">
      {/* Admin Role Definitions Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <CardTitle>Admin Role Types & Capabilities</CardTitle>
          </div>
          <CardDescription>
            Five specialized admin roles with different permissions and responsibilities
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
                <div className="border rounded-md hover-elevate">
                  <CollapsibleTrigger className="w-full" data-testid={`collapsible-${roledef.role}`}>
                    <div className="flex flex-row flex-wrap items-center justify-between gap-2 p-4">
                      <div className="flex items-center gap-3">
                        <RoleIcon className={`h-5 w-5 ${roledef.color}`} />
                        <div className="text-left">
                          <h4 className="text-sm font-semibold">{roledef.label}</h4>
                          <p className="text-sm text-muted-foreground">{roledef.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {roledef.permissions.map((perm, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Badge variant={perm.value ? "default" : "outline"} className="text-xs">
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

      {/* User Management Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>User Management</CardTitle>
          </div>
          <CardDescription>Manage platform users by role category</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userRoleTab} onValueChange={(v) => setUserRoleTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="buyer" data-testid="tab-buyers">Buyers</TabsTrigger>
              <TabsTrigger value="seller" data-testid="tab-sellers">Sellers</TabsTrigger>
              <TabsTrigger value="admin" data-testid="tab-admins">Admins</TabsTrigger>
            </TabsList>

            <TabsContent value="buyer">
              {buyers && buyers.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buyers.slice(0, 20).map((user) => (
                        <TableRow key={user.id} data-testid={`row-buyer-${user.id}`}>
                          <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">{user.membershipTier}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" onClick={() => openActionDialog(user, 'tier')} data-testid={`button-tier-${user.id}`}>
                                <Award className="h-3 w-3 mr-1" />Tier
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => openActionDialog(user, 'logout')} data-testid={`button-logout-${user.id}`}>
                                <LogOut className="h-3 w-3 mr-1" />Logout
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No buyers found</p>
              )}
            </TabsContent>

            <TabsContent value="seller">
              {sellers && sellers.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellers.slice(0, 20).map((user) => (
                        <TableRow key={user.id} data-testid={`row-seller-${user.id}`}>
                          <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">{user.membershipTier}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" onClick={() => openActionDialog(user, 'tier')} data-testid={`button-tier-${user.id}`}>
                                <Award className="h-3 w-3 mr-1" />Tier
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => openActionDialog(user, 'logout')} data-testid={`button-logout-${user.id}`}>
                                <LogOut className="h-3 w-3 mr-1" />Logout
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sellers found</p>
              )}
            </TabsContent>

            <TabsContent value="admin">
              {admins && admins.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Admin Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admins.slice(0, 20).map((user) => (
                        <TableRow key={user.id} data-testid={`row-admin-${user.id}`}>
                          <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeVariant(user.adminRole || '')} className="capitalize">
                              {formatRoleLabel(user.adminRole)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" onClick={() => openActionDialog(user, 'admin-role')} data-testid={`button-admin-role-${user.id}`}>
                                <Shield className="h-3 w-3 mr-1" />Role
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => openActionDialog(user, 'logout')} data-testid={`button-logout-${user.id}`}>
                                <LogOut className="h-3 w-3 mr-1" />Logout
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No admins found</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-user-action">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {dialogContent.icon}
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription>
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          
          {actionType === 'role' && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="role-select">Select New Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger id="role-select" data-testid="select-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin" data-testid="option-admin">Admin</SelectItem>
                    <SelectItem value="buyer" data-testid="option-buyer">Buyer</SelectItem>
                    <SelectItem value="seller" data-testid="option-seller">Seller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {actionType === 'tier' && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tier-select">Select New Membership Tier</Label>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger id="tier-select" data-testid="select-tier">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic" data-testid="option-basic">Basic</SelectItem>
                    <SelectItem value="standard" data-testid="option-standard">Standard</SelectItem>
                    <SelectItem value="premium" data-testid="option-premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {actionType === 'admin-role' && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="admin-role-select">Select Admin Role Type</Label>
                <Select value={selectedAdminRole} onValueChange={setSelectedAdminRole}>
                  <SelectTrigger id="admin-role-select" data-testid="select-admin-role">
                    <SelectValue placeholder="Select admin role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin" data-testid="option-super-admin">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4" />
                        <span>Super Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="verification_admin" data-testid="option-verification-admin">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Verification Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="content_admin" data-testid="option-content-admin">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Content Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="support_admin" data-testid="option-support-admin">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Support Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="analytics_admin" data-testid="option-analytics-admin">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics Admin</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {selectedAdminRole && (
                  <p className="text-sm text-muted-foreground">
                    {adminRoleDefinitions.find(r => r.role === selectedAdminRole)?.description}
                  </p>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button
              variant={actionType === 'delete' || actionType === 'logout' ? "destructive" : "default"}
              onClick={confirmAction}
              disabled={isPending || (actionType === 'role' && !selectedRole) || (actionType === 'tier' && !selectedTier) || (actionType === 'admin-role' && !selectedAdminRole)}
              data-testid="button-confirm-action"
            >
              {isPending ? "Processing..." : 
               actionType === 'logout' ? "Force Logout" :
               actionType === 'delete' ? "Delete User" :
               actionType === 'role' ? "Update Role" :
               actionType === 'tier' ? "Update Tier" :
               "Assign Admin Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
