import { useState } from "react";
import { useQuery, useMutation } from "@tantml:query/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Users, LogOut, AlertTriangle } from "lucide-react";
import type { User, AdminPermissions } from "@shared/schema";

export function AdminControls() {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

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
      setIsLogoutDialogOpen(false);
      setSelectedUser(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to log out user", variant: "destructive" });
    },
  });

  const handleForceLogout = (user: User) => {
    setSelectedUser(user);
    setIsLogoutDialogOpen(true);
  };

  const confirmForceLogout = () => {
    if (selectedUser) {
      forceLogoutMutation.mutate(selectedUser.id);
    }
  };

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
                  <TableHead>Manage Content</TableHead>
                  <TableHead>Manage Settings</TableHead>
                  <TableHead>View Audit Logs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((perm) => (
                  <TableRow key={perm.id}>
                    <TableCell className="font-medium">{perm.userId}</TableCell>
                    <TableCell>
                      <Badge variant={perm.canManageUsers ? "default" : "outline"}>
                        {perm.canManageUsers ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={perm.canManageContent ? "default" : "outline"}>
                        {perm.canManageContent ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={perm.canManageSettings ? "default" : "outline"}>
                        {perm.canManageSettings ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={perm.canViewAuditLogs ? "default" : "outline"}>
                        {perm.canViewAuditLogs ? "Yes" : "No"}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleForceLogout(user)}
                        data-testid={`button-logout-${user.id}`}
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        Force Logout
                      </Button>
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

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Force User Logout
            </DialogTitle>
            <DialogDescription>
              This will immediately terminate all active sessions for {selectedUser?.firstName} {selectedUser?.lastName}.
              They will need to log in again to access the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmForceLogout}
              disabled={forceLogoutMutation.isPending}
              data-testid="button-confirm-logout"
            >
              {forceLogoutMutation.isPending ? "Logging out..." : "Force Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
