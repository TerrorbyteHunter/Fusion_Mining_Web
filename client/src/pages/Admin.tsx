// Admin panel for listing verification and user management
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MarketplaceListing, User } from "@shared/schema";
import { ShieldCheck, Users, Newspaper, Activity, Edit, Trash } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Admin() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading, isAdmin } = useAuth();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [userMgmtTab, setUserMgmtTab] = useState("sellers");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
    if (!authLoading && isAuthenticated && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, authLoading, isAdmin, toast]);

  // Fetch verification queue
  const { data: verificationQueue } = useQuery<MarketplaceListing[]>({
    queryKey: ["/api/admin/verification-queue"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/verification-queue");
      return (await res.json()) as MarketplaceListing[];
    },
  });

  // Fetch all users
  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/users");
      return (await res.json()) as User[];
    },
  });

  // Approve listing mutation
  const approveMutation = useMutation({
    mutationFn: async (listingId: string) => {
      return await apiRequest("POST", `/api/admin/verify/${listingId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/verification-queue"] });
      toast({ title: "Listing Approved", description: "The listing has been verified and is now live." });
    },
  });

  // Reject listing mutation
  const rejectMutation = useMutation({
    mutationFn: async (listingId: string) => {
      return await apiRequest("POST", `/api/admin/reject/${listingId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/verification-queue"] });
      toast({ title: "Listing Rejected", description: "The listing has been rejected." });
    },
  });

  // Update user role mutation
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      return await apiRequest("PATCH", `/api/admin/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setEditingUser(null);
      toast({ title: "User role updated", description: "The user's role has been updated successfully." });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await apiRequest("DELETE", `/api/admin/users/${userId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User deleted", description: "The user has been deleted successfully." });
    },
  });

  if (authLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  const pendingListings = verificationQueue?.filter((l) => l.status === "pending") || [];
  const stats = {
    totalUsers: users?.length || 0,
    admins: users?.filter((u) => u.role === "admin").length || 0,
    sellers: users?.filter((u) => u.role === "seller").length || 0,
    buyers: users?.filter((u) => u.role === "buyer").length || 0,
    pendingVerifications: pendingListings.length,
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-8 border-b bg-gradient-to-r from-destructive/10 to-chart-5/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="h-8 w-8 text-destructive" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Admin Panel
            </h1>
          </div>
          <p className="text-muted-foreground">Manage users, verify listings, and oversee platform operations</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/cms">
              <Card className="hover-elevate cursor-pointer transition-all" data-testid="card-cms">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Newspaper className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Content Management</CardTitle>
                      <CardDescription>Manage blog posts, contacts, projects, and activity logs</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Activity className="h-8 w-8 text-chart-3" />
                  <div>
                    <CardTitle>Platform Analytics</CardTitle>
                    <CardDescription>View detailed analytics and user activity</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <button onClick={() => setUserMgmtOpen(true)} className="w-full text-left">
              <Card className="hover:shadow-lg cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
            </button>
          </div>
        </div>

        {/* User Management Modal */}
        <Dialog open={userMgmtOpen} onOpenChange={setUserMgmtOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>User Management</DialogTitle>
              <div className="text-sm text-muted-foreground">View, filter, and edit users by role</div>
            </DialogHeader>
            <Tabs value={userMgmtTab} onValueChange={setUserMgmtTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="sellers">Sellers</TabsTrigger>
                <TabsTrigger value="buyers">Buyers</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>
              <TabsContent value="sellers">
                <UserTable users={users?.filter((u) => u.role === "seller") || []} onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }} onDelete={(u) => { if (u.id === user?.id) { toast({ title: "Cannot delete yourself", description: "You cannot delete your own account.", variant: "destructive" }); return; } if (confirm(`Are you sure you want to delete user ${u.email}?`)) { deleteUserMutation.mutate(u.id); } }} />
              </TabsContent>
              <TabsContent value="buyers">
                <UserTable users={users?.filter((u) => u.role === "buyer") || []} onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }} onDelete={(u) => { if (u.id === user?.id) { toast({ title: "Cannot delete yourself", description: "You cannot delete your own account.", variant: "destructive" }); return; } if (confirm(`Are you sure you want to delete user ${u.email}?`)) { deleteUserMutation.mutate(u.id); } }} />
              </TabsContent>
              <TabsContent value="admins">
                <UserTable users={users?.filter((u) => u.role === "admin") || []} onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }} onDelete={(u) => { if (u.id === user?.id) { toast({ title: "Cannot delete yourself", description: "You cannot delete your own account.", variant: "destructive" }); return; } if (confirm(`Are you sure you want to delete user ${u.email}?`)) { deleteUserMutation.mutate(u.id); } }} />
              </TabsContent>
            </Tabs>

            {/* Edit User Role Dialog (reused) */}
            <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User Role</DialogTitle>
                  <div className="text-sm text-muted-foreground">Change the role for {editingUser?.email}</div>
                </DialogHeader>
                <div className="py-4">
                  <label className="block mb-2 font-medium">Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger data-testid="select-user-role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingUser(null)} data-testid="button-cancel-edit-user">Cancel</Button>
                  <Button onClick={() => { if (editingUser) { updateUserRoleMutation.mutate({ id: editingUser.id, role: selectedRole }); } }} disabled={updateUserRoleMutation.isPending} data-testid="button-save-user-role">{updateUserRoleMutation.isPending ? "Saving..." : "Save Changes"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </section>
      {/* Verification Queue */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Verification Queue ({stats.pendingVerifications})</h2>
          {pendingListings.length === 0 ? (
            <div className="text-sm text-muted-foreground">No pending listings</div>
          ) : (
            <div className="grid gap-4">
              {pendingListings.map((l) => (
                <Card key={l.id} data-testid={`card-verification-${l.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{l.title}</CardTitle>
                          <Badge variant={l.type === 'mineral' ? 'default' : 'secondary'}>
                            {l.type}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-muted-foreground">
                          Submitted {format(new Date(l.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => approveMutation.mutate(l.id)} 
                          disabled={approveMutation.isPending}
                          data-testid={`button-approve-${l.id}`}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => rejectMutation.mutate(l.id)}
                          disabled={rejectMutation.isPending}
                          data-testid={`button-reject-${l.id}`}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Description:</p>
                        <p className="text-sm">{l.description}</p>
                      </div>
                      
                      {l.type === 'mineral' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
                          {l.mineralType && (
                            <div>
                              <p className="text-xs text-muted-foreground">Mineral</p>
                              <p className="text-sm font-medium">{l.mineralType}</p>
                            </div>
                          )}
                          {l.grade && (
                            <div>
                              <p className="text-xs text-muted-foreground">Grade</p>
                              <p className="text-sm font-medium">{l.grade}</p>
                            </div>
                          )}
                          {l.quantity && (
                            <div>
                              <p className="text-xs text-muted-foreground">Quantity</p>
                              <p className="text-sm font-medium">{l.quantity}</p>
                            </div>
                          )}
                          {l.price && (
                            <div>
                              <p className="text-xs text-muted-foreground">Price</p>
                              <p className="text-sm font-medium">{l.price}</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-sm font-medium">{l.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Seller ID</p>
                          <p className="text-sm font-mono text-xs">{l.sellerId}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function UserTable({ users, onEdit, onDelete }: { users: User[]; onEdit: (u: User) => void; onDelete: (u: User) => void; }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} data-testid={`row-user-${u.id}`}>
              <TableCell className="font-medium">{u.email}</TableCell>
              <TableCell>{u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : '-'}</TableCell>
              <TableCell><Badge variant={u.role === 'admin' ? 'destructive' : 'secondary'}>{u.role}</Badge></TableCell>
              <TableCell>{u.createdAt ? format(new Date(u.createdAt), "MMM d, yyyy") : '-'}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => onEdit(u)} data-testid={`button-edit-user-${u.id}`}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(u)} data-testid={`button-delete-user-${u.id}`}><Trash className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

