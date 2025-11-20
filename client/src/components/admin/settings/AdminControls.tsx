import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Shield, Users, LogOut, AlertTriangle, Trash2, UserCog, Award } from "lucide-react";
import type { User, AdminPermissions } from "@shared/schema";

type ActionType = 'logout' | 'delete' | 'role' | 'tier';

export function AdminControls() {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('logout');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');

  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: permissions } = useQuery<AdminPermissions[]>({
    queryKey: ["/api/admin/permissions"],
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
      setIsDialogOpen(false);
      setSelectedUser(null);
      setSelectedTier('');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update membership tier", variant: "destructive" });
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
    }
  };

  const dialogContent = getDialogContent();
  const isPending = forceLogoutMutation.isPending || deleteUserMutation.isPending || 
                    changeRoleMutation.isPending || changeTierMutation.isPending;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Admin Permissions</CardTitle>
          </div>
          <CardDescription>Manage administrative roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {permissions && permissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin User</TableHead>
                  <TableHead>Manage Users</TableHead>
                  <TableHead>Manage CMS</TableHead>
                  <TableHead>Manage Listings</TableHead>
                  <TableHead>View Analytics</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((perm) => (
                  <TableRow key={perm.id}>
                    <TableCell className="font-medium">{perm.adminUserId}</TableCell>
                    <TableCell>
                      <Badge variant={perm.canManageUsers ? "default" : "outline"}>
                        {perm.canManageUsers ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={perm.canManageCMS ? "default" : "outline"}>
                        {perm.canManageCMS ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={perm.canManageListings ? "default" : "outline"}>
                        {perm.canManageListings ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={perm.canViewAnalytics ? "default" : "outline"}>
                        {perm.canViewAnalytics ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No admin permissions configured</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>User Management</CardTitle>
          </div>
          <CardDescription>Manage platform users and their access</CardDescription>
        </CardHeader>
        <CardContent>
          {users && users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 20).map((user) => (
                  <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "outline"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {user.membershipTier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openActionDialog(user, 'role')}
                          data-testid={`button-role-${user.id}`}
                        >
                          <UserCog className="h-3 w-3 mr-1" />
                          Role
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openActionDialog(user, 'tier')}
                          data-testid={`button-tier-${user.id}`}
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Tier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openActionDialog(user, 'logout')}
                          data-testid={`button-logout-${user.id}`}
                        >
                          <LogOut className="h-3 w-3 mr-1" />
                          Logout
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openActionDialog(user, 'delete')}
                          data-testid={`button-delete-${user.id}`}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No users found</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
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
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'delete' || actionType === 'logout' ? "destructive" : "default"}
              onClick={confirmAction}
              disabled={isPending || (actionType === 'role' && !selectedRole) || (actionType === 'tier' && !selectedTier)}
              data-testid="button-confirm-action"
            >
              {isPending ? "Processing..." : 
               actionType === 'logout' ? "Force Logout" :
               actionType === 'delete' ? "Delete User" :
               actionType === 'role' ? "Update Role" :
               "Update Tier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
