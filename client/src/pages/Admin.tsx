// Comprehensive Admin Dashboard with full management capabilities
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { StatusBadge } from "@/components/StatusBadge";
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
  DialogDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSidebar } from "@/components/AdminSidebar";
import type { MarketplaceListing, User, Message, ActivityLog, Project, BuyerRequest } from "@shared/schema";
import { 
  ShieldCheck, Users, Package, MessageSquare, Activity, 
  Edit, Trash, Plus, Search, CheckCircle, XCircle,
  TrendingUp, MapPin, Award
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export default function Admin() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRoleTab, setUserRoleTab] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  const [listingTypeTab, setListingTypeTab] = useState<'all' | 'mineral' | 'partnership' | 'project'>('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [editingTier, setEditingTier] = useState(false);
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<string>("");
  const [editingVerification, setEditingVerification] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [listingSearch, setListingSearch] = useState("");
  const [listingStatusFilter, setListingStatusFilter] = useState<string>("all");
  const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createListingOpen, setCreateListingOpen] = useState(false);
  const [showPerms, setShowPerms] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "buyer" as "admin" | "seller" | "buyer"
  });
  const [adminPermsForm, setAdminPermsForm] = useState({
    canManageUsers: true,
    canManageListings: true,
    canManageProjects: true,
    canManageBlog: true,
    canViewAnalytics: true,
    canManageMessages: true,
  });

  useEffect(() => {
    async function loadPerms() {
      if (editingUser && editingUser.role === 'admin') {
        try {
          const res = await apiRequest('GET', `/api/admin/users/${editingUser.id}/permissions`);
          const data = await res.json();
          if (data) {
            setAdminPermsForm({
              canManageUsers: !!data.canManageUsers,
              canManageListings: !!data.canManageListings,
              canManageProjects: !!data.canManageProjects,
              canManageBlog: !!data.canManageBlog,
              canViewAnalytics: !!data.canViewAnalytics,
              canManageMessages: !!data.canManageMessages,
            });
          } else {
            setAdminPermsForm({
              canManageUsers: true,
              canManageListings: true,
              canManageProjects: true,
              canManageBlog: true,
              canViewAnalytics: true,
              canManageMessages: true,
            });
          }
        } catch {}
      }
    }
    loadPerms();
  }, [editingUser]);

  const saveAdminPermsMutation = useMutation({
    mutationFn: async () => {
      if (!editingUser) return;
      return await apiRequest('PATCH', `/api/admin/users/${editingUser.id}/permissions`, adminPermsForm);
    },
    onSuccess: () => {
      toast({ title: 'Permissions updated' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update permissions', variant: 'destructive' });
    }
  });

  const [listingForm, setListingForm] = useState<Partial<MarketplaceListing>>({});

  useEffect(() => {
    if (editingListing) {
      setListingForm({
        id: editingListing.id,
        title: editingListing.title,
        description: editingListing.description,
        type: editingListing.type,
        mainCategory: editingListing.mainCategory,
        mineralSubcategory: editingListing.mineralSubcategory,
        toolSubcategory: editingListing.toolSubcategory,
        serviceSubcategory: editingListing.serviceSubcategory,
        ppeSubcategory: editingListing.ppeSubcategory,
        specificType: editingListing.specificType,
        mineralType: editingListing.mineralType,
        grade: editingListing.grade,
        location: editingListing.location,
        quantity: editingListing.quantity,
        price: editingListing.price,
        imageUrl: editingListing.imageUrl,
        status: editingListing.status,
      });
    }
  }, [editingListing]);

  const updateListingMutation = useMutation({
    mutationFn: async () => {
      if (!listingForm.id) return;
      const payload = { ...listingForm } as any;
      delete payload.id;
      return await apiRequest("PATCH", `/api/marketplace/listings/${listingForm.id}`, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/marketplace/listings"] });
      toast({ title: "Listing updated" });
      setEditingListing(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update listing", variant: "destructive" });
    },
  });

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
      window.location.href = "/login";
    }
  }, [isAuthenticated, authLoading, isAdmin, toast]);

  // Fetch verification queue
  const { data: verificationQueue, isLoading: loadingQueue } = useQuery<MarketplaceListing[]>({
    queryKey: ["/api/admin/verification-queue"],
    enabled: !!isAdmin && (activeTab === "verification" || activeTab === "overview"),
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/verification-queue");
      return (await res.json()) as MarketplaceListing[];
    },
  });

  // Fetch all users
  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/users");
      return (await res.json()) as User[];
    },
  });

  // Fetch all listings (admin can see all)
  const { data: allListings, isLoading: loadingListings } = useQuery<MarketplaceListing[]>({
    queryKey: ["/api/marketplace/listings"],
    enabled: !!isAdmin && (activeTab === "listings" || activeTab === "overview"),
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/marketplace/listings");
      return (await res.json()) as MarketplaceListing[];
    },
  });

  // Fetch messages
  const { data: messages, isLoading: loadingMessages } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    enabled: !!isAdmin && activeTab === "messages",
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/messages");
      return (await res.json()) as Message[];
    },
  });
  // Categorized threads for improved admin messaging
  const [messagesCategory, setMessagesCategory] = useState<'all'|'project'|'marketplace'|'seller'|'buyer'>('all');
  const { data: categorizedThreads } = useQuery<any>({
    queryKey: ["/api/admin/threads/categorized"],
    enabled: !!isAdmin && activeTab === 'messages',
    refetchInterval: 5000,
  });
  const [viewMessage, setViewMessage] = useState<Message | null>(null);
  const [startConvOpen, setStartConvOpen] = useState(false);
  const [startConvForm, setStartConvForm] = useState({ userId: '', subject: '', content: '', listingId: '', projectId: '' });
  // Threads and chat state
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const { data: threadMessages } = useQuery<Message[]>({
    queryKey: ["/api/threads", selectedThreadId, "messages"],
    enabled: !!isAdmin && activeTab === 'messages' && !!selectedThreadId,
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/threads/${selectedThreadId}/messages`);
      return (await res.json()) as Message[];
    },
    refetchInterval: 3000,
  });
  const { data: threadDetails } = useQuery<any>({
    queryKey: ["/api/threads", selectedThreadId, "details"],
    enabled: !!isAdmin && activeTab === 'messages' && !!selectedThreadId,
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/threads/${selectedThreadId}/details`);
      return await res.json();
    },
    refetchInterval: 10000,
  });
  const sendChatMessageMutation = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      if (!selectedThreadId) return;
      return await apiRequest('POST', `/api/threads/${selectedThreadId}/messages`, { content });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/threads", selectedThreadId, "messages"] });
    }
  });
  const [chatInput, setChatInput] = useState('');
  const startConversationMutation = useMutation({
    mutationFn: async () => {
      // Choose endpoint based on context
      if (startConvForm.listingId || startConvForm.projectId) {
        return await apiRequest('POST', '/api/admin/threads/start', {
          receiverId: startConvForm.userId,
          subject: startConvForm.subject,
          content: startConvForm.content,
          listingId: startConvForm.listingId || undefined,
          projectId: startConvForm.projectId || undefined,
        });
      }
      return await apiRequest('POST', '/api/admin/messages/start', {
        receiverId: startConvForm.userId,
        subject: startConvForm.subject,
        content: startConvForm.content,
      });
    },
    onSuccess: () => {
      setStartConvOpen(false);
      setStartConvForm({ userId: '', subject: '', content: '', listingId: '', projectId: '' });
      toast({ title: 'Conversation started' });
    },
    onError: () => toast({ title: 'Error', description: 'Failed to start conversation', variant: 'destructive' })
  });

  // Fetch activity logs
  const { data: activityLogs, isLoading: loadingActivity } = useQuery<ActivityLog[]>({
    queryKey: ["/api/admin/activity-logs"],
    enabled: !!isAdmin && activeTab === "activity",
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/activity-logs");
      return (await res.json()) as ActivityLog[];
    },
  });

  // Fetch projects
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: !!isAdmin && activeTab === "overview",
  });

  // Fetch buyer requests
  const { data: buyerRequests } = useQuery<BuyerRequest[]>({
    queryKey: ["/api/marketplace/buyer-requests"],
    enabled: !!isAdmin && activeTab === "overview",
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

  // Update user tier mutation
  const updateUserTierMutation = useMutation({
    mutationFn: async ({ userId, tier }: { userId: string; tier: string }) => {
      return await apiRequest("POST", `/api/admin/users/${userId}/tier`, { tier });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Tier updated", description: "User membership tier has been updated successfully." });
      setEditingUser(null);
      setSelectedTier("");
      setEditingTier(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update membership tier", variant: "destructive" });
    },
  });

  // Update user verification status mutation
  const updateUserVerificationMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: string }) => {
      return await apiRequest("POST", `/api/admin/users/${userId}/verification-status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Verification status updated", description: "Seller verification status has been updated successfully." });
      setEditingUser(null);
      setSelectedVerificationStatus("");
      setEditingVerification(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update verification status", variant: "destructive" });
    },
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: typeof newUserForm) => {
      // Note: You'll need to add POST /api/admin/users endpoint
      return await apiRequest("POST", "/api/admin/users", userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setCreateUserOpen(false);
      setNewUserForm({ email: "", password: "", firstName: "", lastName: "", role: "buyer" });
      toast({ title: "User created", description: "New user has been created successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create user. Note: POST /api/admin/users endpoint may need to be added.", variant: "destructive" });
    },
  });

  // Delete listing mutation
  const deleteListingMutation = useMutation({
    mutationFn: async (listingId: string) => {
      return await apiRequest("DELETE", `/api/marketplace/listings/${listingId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/verification-queue"] });
      toast({ title: "Listing deleted", description: "Listing has been deleted successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete listing.", variant: "destructive" });
    },
  });

  if (authLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  const pendingListings = verificationQueue?.filter((l) => l.status === "pending") || [];
  const approvedListings = allListings?.filter((l) => l.status === "approved") || [];
  
  const stats = {
    totalUsers: users?.length || 0,
    admins: users?.filter((u) => u.role === "admin").length || 0,
    sellers: users?.filter((u) => u.role === "seller").length || 0,
    buyers: users?.filter((u) => u.role === "buyer").length || 0,
    pendingVerifications: pendingListings.length,
    totalListings: allListings?.length || 0,
    approvedListings: approvedListings.length,
    totalProjects: projects?.length || 0,
    activeProjects: projects?.filter((p) => p.status === "active").length || 0,
    totalMessages: messages?.length || 0,
    unreadMessages: messages?.filter((m) => !m.read).length || 0,
    totalRFQs: buyerRequests?.length || 0,
  };

  // Filtered data
  const filteredUsers = users?.filter((u) => {
    if (!userSearch) return true;
    const search = userSearch.toLowerCase();
    return (
      u.email?.toLowerCase().includes(search) ||
      u.firstName?.toLowerCase().includes(search) ||
      u.lastName?.toLowerCase().includes(search)
    );
  }) || [];

  const filteredListings = allListings?.filter((l) => {
    if (listingStatusFilter !== "all" && l.status !== listingStatusFilter) return false;
    if (!listingSearch) return true;
    const search = listingSearch.toLowerCase();
    return (
      l.title?.toLowerCase().includes(search) ||
      l.description?.toLowerCase().includes(search) ||
      l.location?.toLowerCase().includes(search)
    );
  }) || [];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
      {/* Header */}
        <section className="py-6 border-b bg-gradient-to-r from-destructive/10 to-primary/10">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-destructive" />
                <div>
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
                    Admin Dashboard
            </h1>
                  <p className="text-muted-foreground">Complete platform control and management</p>
                </div>
              </div>
            </div>
        </div>
      </section>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="p-6 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.admins} admins, {stats.sellers} sellers, {stats.buyers} buyers
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalListings}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.approvedListings} approved, {stats.pendingVerifications} pending
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalProjects}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.activeProjects} active
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalMessages}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.unreadMessages} unread
                    </p>
                  </CardContent>
                </Card>
              </div>

      {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common admin tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => setActiveTab("verification")} className="w-full justify-start">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Review Pending ({stats.pendingVerifications})
                    </Button>
                    <Button onClick={() => setActiveTab("users")} variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button onClick={() => setActiveTab("listings")} variant="outline" className="w-full justify-start">
                      <Package className="mr-2 h-4 w-4" />
                      Manage Listings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Verifications */}
              {pendingListings.length > 0 && (
                <Card>
              <CardHeader>
                    <CardTitle>Pending Verifications</CardTitle>
                    <CardDescription>{pendingListings.length} listings waiting for approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {pendingListings.slice(0, 5).map((l) => (
                        <div key={l.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{l.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(l.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => approveMutation.mutate(l.id)}>
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate(l.id)}>
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                      {pendingListings.length > 5 && (
                        <Button onClick={() => setActiveTab("verification")} variant="outline" className="w-full">
                          View All ({pendingListings.length})
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <p className="text-muted-foreground">Manage all platform users by role</p>
                </div>
                <Button onClick={() => setCreateUserOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create User
                </Button>
              </div>

              {/* Search */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by email or name..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Role-based Tabs */}
              <Tabs value={userRoleTab} onValueChange={(v) => setUserRoleTab(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="buyer" data-testid="tab-buyers">Buyers</TabsTrigger>
                  <TabsTrigger value="seller" data-testid="tab-sellers">Sellers</TabsTrigger>
                  <TabsTrigger value="admin" data-testid="tab-admins">Admins</TabsTrigger>
                </TabsList>

                <TabsContent value="buyer">
                  <UserManagementSection
                    users={filteredUsers.filter(u => u.role === 'buyer')}
                    onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }}
                    onEditTier={(u) => { setEditingUser(u); setSelectedTier(u.membershipTier); setEditingTier(true); }}
                    onEditVerification={(u) => { setEditingUser(u); setSelectedVerificationStatus(u.verificationStatus || 'not_requested'); setEditingVerification(true); }}
                    onDelete={(u) => {
                      if (u.id === user?.id) {
                        toast({ title: "Cannot delete yourself", description: "You cannot delete your own account.", variant: "destructive" });
                        return;
                      }
                      if (confirm(`Are you sure you want to delete user ${u.email}?`)) {
                        deleteUserMutation.mutate(u.id);
                      }
                    }}
                    loading={loadingUsers}
                  />
                </TabsContent>

                <TabsContent value="seller">
                  <UserManagementSection
                    users={filteredUsers.filter(u => u.role === 'seller')}
                    onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }}
                    onEditTier={(u) => { setEditingUser(u); setSelectedTier(u.membershipTier); setEditingTier(true); }}
                    onEditVerification={(u) => { setEditingUser(u); setSelectedVerificationStatus(u.verificationStatus || 'not_requested'); setEditingVerification(true); }}
                    onDelete={(u) => {
                      if (u.id === user?.id) {
                        toast({ title: "Cannot delete yourself", description: "You cannot delete your own account.", variant: "destructive" });
                        return;
                      }
                      if (confirm(`Are you sure you want to delete user ${u.email}?`)) {
                        deleteUserMutation.mutate(u.id);
                      }
                    }}
                    loading={loadingUsers}
                  />
                </TabsContent>

                <TabsContent value="admin">
                  <UserManagementSection
                    users={filteredUsers.filter(u => u.role === 'admin')}
                    onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }}
                    onEditTier={(u) => { setEditingUser(u); setSelectedTier(u.membershipTier); setEditingTier(true); }}
                    onEditVerification={(u) => { setEditingUser(u); setSelectedVerificationStatus(u.verificationStatus || 'not_requested'); setEditingVerification(true); }}
                    onDelete={(u) => {
                      if (u.id === user?.id) {
                        toast({ title: "Cannot delete yourself", description: "You cannot delete your own account.", variant: "destructive" });
                        return;
                      }
                      if (confirm(`Are you sure you want to delete user ${u.email}?`)) {
                        deleteUserMutation.mutate(u.id);
                      }
                    }}
                    loading={loadingUsers}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === "listings" && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Listing Management</h2>
                  <p className="text-muted-foreground">View, edit, and manage all marketplace listings by type</p>
                </div>
                <Button onClick={() => setCreateListingOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Listing
                </Button>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search listings..."
                    value={listingSearch}
                    onChange={(e) => setListingSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={listingStatusFilter} onValueChange={setListingStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Listing Type Tabs */}
              <Tabs value={listingTypeTab} onValueChange={(v) => setListingTypeTab(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all" data-testid="tab-all-listings">All Listings</TabsTrigger>
                  <TabsTrigger value="mineral" data-testid="tab-mineral-listings">Minerals</TabsTrigger>
                  <TabsTrigger value="partnership" data-testid="tab-partnership-listings">Partnerships</TabsTrigger>
                  <TabsTrigger value="project" data-testid="tab-project-listings">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <ListingManagementSection
                    listings={filteredListings}
                    onEdit={setEditingListing}
                    onDelete={(id) => {
                      if (confirm("Are you sure you want to delete this listing?")) {
                        deleteListingMutation.mutate(id);
                      }
                    }}
                    onApprove={(id) => approveMutation.mutate(id)}
                    onReject={(id) => rejectMutation.mutate(id)}
                    loading={loadingListings}
                  />
                </TabsContent>

                <TabsContent value="mineral">
                  <ListingManagementSection
                    listings={filteredListings.filter(l => l.type === 'mineral')}
                    onEdit={setEditingListing}
                    onDelete={(id) => {
                      if (confirm("Are you sure you want to delete this listing?")) {
                        deleteListingMutation.mutate(id);
                      }
                    }}
                    onApprove={(id) => approveMutation.mutate(id)}
                    onReject={(id) => rejectMutation.mutate(id)}
                    loading={loadingListings}
                  />
                </TabsContent>

                <TabsContent value="partnership">
                  <ListingManagementSection
                    listings={filteredListings.filter(l => l.type === 'partnership')}
                    onEdit={setEditingListing}
                    onDelete={(id) => {
                      if (confirm("Are you sure you want to delete this listing?")) {
                        deleteListingMutation.mutate(id);
                      }
                    }}
                    onApprove={(id) => approveMutation.mutate(id)}
                    onReject={(id) => rejectMutation.mutate(id)}
                    loading={loadingListings}
                  />
                </TabsContent>

                <TabsContent value="project">
                  <ListingManagementSection
                    listings={filteredListings.filter(l => l.type === 'project')}
                    onEdit={setEditingListing}
                    onDelete={(id) => {
                      if (confirm("Are you sure you want to delete this listing?")) {
                        deleteListingMutation.mutate(id);
                      }
                    }}
                    onApprove={(id) => approveMutation.mutate(id)}
                    onReject={(id) => rejectMutation.mutate(id)}
                    loading={loadingListings}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Verification Queue Tab */}
          {activeTab === "verification" && (
            <div className="p-6 space-y-6">
                  <div>
                <h2 className="text-2xl font-bold">Verification Queue</h2>
                <p className="text-muted-foreground">{pendingListings.length} listings pending approval</p>
              </div>

              {loadingQueue ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                      </CardHeader>
                    </Card>
                  ))}
                  </div>
              ) : pendingListings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold">No pending listings</p>
                    <p className="text-muted-foreground">All listings have been reviewed</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingListings.map((l) => (
                    <VerificationCard
                      key={l.id}
                      listing={l}
                      onApprove={() => approveMutation.mutate(l.id)}
                      onReject={() => rejectMutation.mutate(l.id)}
                      loading={approveMutation.isPending || rejectMutation.isPending}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Messages & Support</h2>
                <p className="text-muted-foreground">Manage all platform messages</p>
                  </div>
                  <Button onClick={() => setStartConvOpen(true)}>Start Conversation</Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant={messagesCategory==='all'?'default':'outline'} onClick={() => setMessagesCategory('all')}>All</Button>
                <Button variant={messagesCategory==='project'?'default':'outline'} onClick={() => setMessagesCategory('project')}>Project Inquiries</Button>
                <Button variant={messagesCategory==='marketplace'?'default':'outline'} onClick={() => setMessagesCategory('marketplace')}>Marketplace Inquiries</Button>
                <Button variant={messagesCategory==='seller'?'default':'outline'} onClick={() => setMessagesCategory('seller')}>Admin ↔ Seller</Button>
                <Button variant={messagesCategory==='buyer'?'default':'outline'} onClick={() => setMessagesCategory('buyer')}>Admin ↔ Buyer</Button>
              </div>

              {loadingMessages ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Threads list */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Threads</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-[70vh] overflow-auto">
                      {/* Project Inquiries */}
                      <div>
                        <div className="text-xs uppercase text-muted-foreground mb-2">Project Inquiries</div>
                        <div className="space-y-1">
                          {(categorizedThreads?.projectInquiries || []).map((t: any) => (
                            <Button key={t.id} variant={selectedThreadId===t.id? 'secondary':'ghost'} className="w-full justify-start" onClick={() => setSelectedThreadId(t.id)}>
                              {t.title || 'Conversation'}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {/* Marketplace Inquiries */}
                      <div>
                        <div className="text-xs uppercase text-muted-foreground mb-2">Marketplace Inquiries</div>
                        <div className="space-y-1">
                          {(categorizedThreads?.marketplaceInquiries || []).map((t: any) => (
                            <Button key={t.id} variant={selectedThreadId===t.id? 'secondary':'ghost'} className="w-full justify-start" onClick={() => setSelectedThreadId(t.id)}>
                              {t.title || 'Conversation'}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {/* Admin ↔ Seller */}
                      <div>
                        <div className="text-xs uppercase text-muted-foreground mb-2">Admin ↔ Seller</div>
                        <div className="space-y-1">
                          {(categorizedThreads?.sellerCommunication || []).map((t: any) => (
                            <Button key={t.id} variant={selectedThreadId===t.id? 'secondary':'ghost'} className="w-full justify-start" onClick={() => setSelectedThreadId(t.id)}>
                              {t.title || 'Conversation'}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {/* Admin ↔ Buyer */}
                      <div>
                        <div className="text-xs uppercase text-muted-foreground mb-2">Admin ↔ Buyer</div>
                        <div className="space-y-1">
                          {(categorizedThreads?.adminToBuyer || []).map((t: any) => (
                            <Button key={t.id} variant={selectedThreadId===t.id? 'secondary':'ghost'} className="w-full justify-start" onClick={() => setSelectedThreadId(t.id)}>
                              {t.title || 'Conversation'}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Chat panel */}
                  <Card className="lg:col-span-2 flex flex-col h-[70vh]">
                    <CardHeader>
                      <CardTitle>
                        {threadDetails ? (
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={undefined} alt={threadDetails?.buyer?.firstName || threadDetails?.seller?.firstName || 'User'} />
                              <AvatarFallback>
                                {(threadDetails?.buyer?.firstName?.[0] || threadDetails?.seller?.firstName?.[0] || 'U')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">
                                {threadDetails?.buyer?.email || threadDetails?.seller?.email || 'Conversation'}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {threadDetails?.project?.name || threadDetails?.listing?.title || ''}
                              </div>
                            </div>
                          </div>
                        ) : 'Conversation'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto space-y-2">
                      {(threadMessages || []).map((m) => (
                        <div key={m.id} className={`flex ${m.senderId===user?.id? 'justify-end':'justify-start'}`}>
                          <div className={`${m.senderId===user?.id? 'bg-primary text-primary-foreground':'bg-muted'} rounded-2xl px-3 py-2 max-w-[70%] whitespace-pre-wrap`}>
                            <div className="text-sm">{m.content}</div>
                            <div className="text-[10px] opacity-70 mt-1">{format(new Date(m.createdAt), 'MMM d, h:mm a')}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <div className="p-4 border-t flex gap-2">
                      <Input placeholder="Type a message" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key==='Enter' && chatInput.trim()) { sendChatMessageMutation.mutate({ content: chatInput }); setChatInput(''); } }} />
                      <Button onClick={() => { if (chatInput.trim()) { sendChatMessageMutation.mutate({ content: chatInput }); setChatInput(''); } }}>Send</Button>
                    </div>
                  </Card>
                </div>
              )}

              <Dialog open={!!viewMessage} onOpenChange={(open) => !open && setViewMessage(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{viewMessage?.subject || 'Message'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">From: {viewMessage?.senderId}</div>
                    <div className="text-sm whitespace-pre-wrap">{viewMessage?.content}</div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setViewMessage(null)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={startConvOpen} onOpenChange={setStartConvOpen}>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Start Conversation</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <Label>User</Label>
                      <Select value={startConvForm.userId} onValueChange={(v) => setStartConvForm({ ...startConvForm, userId: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                          {(users || []).map(u => (
                            <SelectItem key={u.id} value={u.id}>{u.email}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Listing (optional)</Label>
                        <Select value={startConvForm.listingId} onValueChange={(v) => setStartConvForm({ ...startConvForm, listingId: v, projectId: '' })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select listing" />
                          </SelectTrigger>
                          <SelectContent>
                            {(allListings || []).slice(0, 100).map(l => (
                              <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Project (optional)</Label>
                        <Select value={startConvForm.projectId} onValueChange={(v) => setStartConvForm({ ...startConvForm, projectId: v, listingId: '' })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                          <SelectContent>
                            {(projects || []).slice(0, 100).map(p => (
                              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Subject</Label>
                      <Input value={startConvForm.subject} onChange={(e) => setStartConvForm({ ...startConvForm, subject: e.target.value })} />
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Input value={startConvForm.content} onChange={(e) => setStartConvForm({ ...startConvForm, content: e.target.value })} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setStartConvOpen(false)}>Cancel</Button>
                    <Button onClick={() => startConversationMutation.mutate()} disabled={startConversationMutation.isPending || !startConvForm.userId || !startConvForm.content}>Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Admin Permissions Dialog (when editing an admin user) */}
          <Dialog open={!!editingUser && editingUser.role === 'admin'} onOpenChange={(open) => !open && setEditingUser(null)}>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Admin Permissions</DialogTitle>
                <DialogDescription>Control what this admin can manage.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <label className="flex items-center justify-between py-2">
                  <span>Manage Users</span>
                  <input type="checkbox" checked={adminPermsForm.canManageUsers} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageUsers: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Listings</span>
                  <input type="checkbox" checked={adminPermsForm.canManageListings} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageListings: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Projects</span>
                  <input type="checkbox" checked={adminPermsForm.canManageProjects} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageProjects: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Blog</span>
                  <input type="checkbox" checked={adminPermsForm.canManageBlog} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageBlog: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>View Analytics</span>
                  <input type="checkbox" checked={adminPermsForm.canViewAnalytics} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canViewAnalytics: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Messages</span>
                  <input type="checkbox" checked={adminPermsForm.canManageMessages} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageMessages: e.target.checked })} />
                </label>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingUser(null)}>Close</Button>
                <Button onClick={() => saveAdminPermsMutation.mutate()} disabled={saveAdminPermsMutation.isPending}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit User Tier Dialog */}
          <Dialog open={editingTier} onOpenChange={(open) => {
            if (!open) {
              setEditingTier(false);
              setEditingUser(null);
              setSelectedTier("");
            }
          }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Update Membership Tier
                </DialogTitle>
                <DialogDescription>
                  Change the membership tier for {editingUser?.firstName} {editingUser?.lastName} ({editingUser?.email})
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tier-select">Select New Membership Tier</Label>
                  <Select value={selectedTier} onValueChange={setSelectedTier}>
                    <SelectTrigger id="tier-select" data-testid="select-tier">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic" data-testid="option-basic">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">Basic</Badge>
                          <span className="text-xs text-muted-foreground">- Free tier</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="standard" data-testid="option-standard">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="capitalize">Standard</Badge>
                          <span className="text-xs text-muted-foreground">- More features</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="premium" data-testid="option-premium">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="capitalize">Premium</Badge>
                          <span className="text-xs text-muted-foreground">- All features</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Current tier: <Badge variant="outline" className="capitalize">{editingUser?.membershipTier || 'basic'}</Badge>
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingTier(false);
                    setEditingUser(null);
                    setSelectedTier("");
                  }}
                  data-testid="button-cancel-tier"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (editingUser && selectedTier) {
                      updateUserTierMutation.mutate({ userId: editingUser.id, tier: selectedTier });
                    }
                  }}
                  disabled={!selectedTier || updateUserTierMutation.isPending}
                  data-testid="button-confirm-tier"
                >
                  {updateUserTierMutation.isPending ? "Updating..." : "Update Tier"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Verification Status Dialog */}
          <Dialog open={editingVerification} onOpenChange={(open) => {
            if (!open) {
              setEditingVerification(false);
              setEditingUser(null);
              setSelectedVerificationStatus("");
            }
          }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Update Verification Status
                </DialogTitle>
                <DialogDescription>
                  Change the verification status for {editingUser?.firstName} {editingUser?.lastName} ({editingUser?.email})
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="verification-select">Select New Verification Status</Label>
                  <Select value={selectedVerificationStatus} onValueChange={setSelectedVerificationStatus}>
                    <SelectTrigger id="verification-select" data-testid="select-verification-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_requested" data-testid="option-not-requested">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Not Requested</Badge>
                          <span className="text-xs text-muted-foreground">- No verification submitted</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="pending" data-testid="option-pending">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-600">Pending</Badge>
                          <span className="text-xs text-muted-foreground">- Under review</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="approved" data-testid="option-approved">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">Verified</Badge>
                          <span className="text-xs text-muted-foreground">- Approved seller</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected" data-testid="option-rejected">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">Rejected</Badge>
                          <span className="text-xs text-muted-foreground">- Verification denied</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Current status: {editingUser?.verificationStatus ? (
                      editingUser.verificationStatus === 'approved' ? <Badge className="bg-green-600">Verified</Badge> :
                      editingUser.verificationStatus === 'pending' ? <Badge className="bg-yellow-600">Pending</Badge> :
                      editingUser.verificationStatus === 'rejected' ? <Badge variant="destructive">Rejected</Badge> :
                      <Badge variant="secondary">Not Requested</Badge>
                    ) : <Badge variant="secondary">Not Requested</Badge>}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingVerification(false);
                    setEditingUser(null);
                    setSelectedVerificationStatus("");
                  }}
                  data-testid="button-cancel-verification"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (editingUser && selectedVerificationStatus) {
                      updateUserVerificationMutation.mutate({ userId: editingUser.id, status: selectedVerificationStatus });
                    }
                  }}
                  disabled={!selectedVerificationStatus || updateUserVerificationMutation.isPending}
                  data-testid="button-confirm-verification"
                >
                  {updateUserVerificationMutation.isPending ? "Updating..." : "Update Status"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Listing Dialog */}
          <Dialog open={!!editingListing} onOpenChange={(open) => !open && setEditingListing(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit Listing</DialogTitle>
                <DialogDescription>Update listing details and save changes.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Title</Label>
                  <Input value={listingForm.title || ''} onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Input value={listingForm.description || ''} onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })} />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={listingForm.type || ''} onValueChange={(v) => setListingForm({ ...listingForm, type: v as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mineral">Mineral</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={listingForm.status || ''} onValueChange={(v) => setListingForm({ ...listingForm, status: v as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Main Category</Label>
                  <Select value={listingForm.mainCategory || ''} onValueChange={(v) => setListingForm({ ...listingForm, mainCategory: v as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minerals">Minerals</SelectItem>
                      <SelectItem value="mining_tools">Mining Tools</SelectItem>
                      <SelectItem value="mining_services">Mining Services</SelectItem>
                      <SelectItem value="mining_ppe">Mining PPE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Specific Type</Label>
                  <Input value={listingForm.specificType || ''} onChange={(e) => setListingForm({ ...listingForm, specificType: e.target.value })} />
                </div>
                <div>
                  <Label>Mineral Type</Label>
                  <Input value={listingForm.mineralType || ''} onChange={(e) => setListingForm({ ...listingForm, mineralType: e.target.value })} />
                </div>
                <div>
                  <Label>Grade</Label>
                  <Input value={listingForm.grade || ''} onChange={(e) => setListingForm({ ...listingForm, grade: e.target.value })} />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input value={listingForm.quantity || ''} onChange={(e) => setListingForm({ ...listingForm, quantity: e.target.value })} />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input value={listingForm.price || ''} onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Location</Label>
                  <Input value={listingForm.location || ''} onChange={(e) => setListingForm({ ...listingForm, location: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Image URL</Label>
                  <Input value={listingForm.imageUrl || ''} onChange={(e) => setListingForm({ ...listingForm, imageUrl: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingListing(null)}>Cancel</Button>
                <Button onClick={() => updateListingMutation.mutate()} disabled={updateListingMutation.isPending}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Platform Analytics</h2>
                <p className="text-muted-foreground">Platform statistics and insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground mt-2">Total registered users</p>
                    <div className="mt-4 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Active platform</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Listing Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalListings}</div>
                    <p className="text-xs text-muted-foreground mt-2">Total listings</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Approved</span>
                        <span className="font-medium text-green-600">{stats.approvedListings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending</span>
                        <span className="font-medium text-yellow-600">{stats.pendingVerifications}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Platform Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold">{stats.totalProjects}</div>
                        <p className="text-xs text-muted-foreground">Total Projects</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stats.totalMessages}</div>
                        <p className="text-xs text-muted-foreground">Total Messages</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stats.totalRFQs}</div>
                        <p className="text-xs text-muted-foreground">Buyer Requests</p>
                      </div>
                    </div>
                  </CardContent>
            </Card>
          </div>
        </div>
          )}

          {/* Activity Logs Tab */}
          {activeTab === "activity" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Activity Logs</h2>
                <p className="text-muted-foreground">Platform activity and user actions</p>
              </div>

              {loadingActivity ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full mt-2" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : activityLogs && activityLogs.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLogs.slice(0, 50).map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">User {log.userId?.slice(0, 8) || "Unknown"}</TableCell>
                          <TableCell>{log.activityType || "Unknown"}</TableCell>
                          <TableCell className="font-mono text-xs">{log.ipAddress || "N/A"}</TableCell>
                          <TableCell>{format(new Date(log.createdAt), "MMM d, yyyy HH:mm")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold">No activity logs</p>
                    <p className="text-muted-foreground">No activity has been recorded yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Platform Settings</h2>
                <p className="text-muted-foreground">Configure platform settings and preferences</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Platform configuration options</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Settings panel coming soon. This will include:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>Email templates</li>
                    <li>Notification preferences</li>
                    <li>Feature flags</li>
                    <li>Maintenance mode</li>
                    <li>Platform branding</li>
                  </ul>
                </CardContent>
              </Card>
          </div>
          )}
        </div>

        {/* Dialogs */}
        {/* Create User Dialog */}
        <Dialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Create a new user account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newUserForm.firstName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newUserForm.lastName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUserForm.role} onValueChange={(val: "admin" | "seller" | "buyer") => setNewUserForm({ ...newUserForm, role: val })}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateUserOpen(false)}>Cancel</Button>
              <Button onClick={() => createUserMutation.mutate(newUserForm)} disabled={createUserMutation.isPending}>
                {createUserMutation.isPending ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Role Dialog */}
            <Dialog open={!!editingUser} onOpenChange={() => { setEditingUser(null); setShowPerms(false); }}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User Role</DialogTitle>
              <DialogDescription>Change the role for {editingUser?.email}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
              <Label className="block mb-2 font-medium">Role</Label>
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
                  <Button variant="outline" onClick={() => { setEditingUser(null); setShowPerms(false); }} data-testid="button-cancel-edit-user">Cancel</Button>
                  {(editingUser?.role === 'admin' || selectedRole === 'admin') && (
                    <Button variant="secondary" onClick={() => setShowPerms(true)}>Manage Permissions</Button>
                  )}
              <Button onClick={() => { if (editingUser) { updateUserRoleMutation.mutate({ id: editingUser.id, role: selectedRole }); } }} disabled={updateUserRoleMutation.isPending} data-testid="button-save-user-role">
                {updateUserRoleMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          {/* Admin Permissions Dialog */}
          <Dialog open={showPerms && !!editingUser && (editingUser.role === 'admin' || selectedRole === 'admin')} onOpenChange={(open) => { if (!open) setShowPerms(false); }}>
            <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>Admin Permissions</DialogTitle>
                <DialogDescription>Control what this admin can manage.</DialogDescription>
            </DialogHeader>
              <div className="space-y-3">
                <label className="flex items-center justify-between py-2">
                  <span>Manage Users</span>
                  <input type="checkbox" checked={adminPermsForm.canManageUsers} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageUsers: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Listings</span>
                  <input type="checkbox" checked={adminPermsForm.canManageListings} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageListings: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Projects</span>
                  <input type="checkbox" checked={adminPermsForm.canManageProjects} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageProjects: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Blog</span>
                  <input type="checkbox" checked={adminPermsForm.canManageBlog} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageBlog: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>View Analytics</span>
                  <input type="checkbox" checked={adminPermsForm.canViewAnalytics} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canViewAnalytics: e.target.checked })} />
                </label>
                <label className="flex items-center justify-between py-2">
                  <span>Manage Messages</span>
                  <input type="checkbox" checked={adminPermsForm.canManageMessages} onChange={(e) => setAdminPermsForm({ ...adminPermsForm, canManageMessages: e.target.checked })} />
                </label>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setShowPerms(false)}>Close</Button>
                <Button onClick={() => saveAdminPermsMutation.mutate()} disabled={saveAdminPermsMutation.isPending}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Listing Dialog */}
        <Dialog open={createListingOpen} onOpenChange={setCreateListingOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Listing</DialogTitle>
              <DialogDescription>Create a new marketplace listing on behalf of a seller</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">Listing creation form coming soon. For now, sellers can create listings through their dashboard.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateListingOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Legacy status-only edit dialog removed in favor of full edit dialog below */}
        </div>
    </div>
  );
}

// User Management Section Component
function UserManagementSection({ 
  users, 
  onEdit, 
  onEditTier,
  onEditVerification,
  onDelete, 
  loading
}: { 
  users: User[]; 
  onEdit: (u: User) => void;
  onEditTier: (u: User) => void;
  onEditVerification: (u: User) => void;
  onDelete: (u: User) => void;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Not Requested</Badge>;
    }
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tier / Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
            <TableRow key={u.id} data-testid={`row-user-${u.id}`}>
              <TableCell className="font-medium">{u.email}</TableCell>
              <TableCell>{u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : '-'}</TableCell>
                <TableCell>
                  <Badge variant={u.role === 'admin' ? 'destructive' : u.role === 'seller' ? 'default' : 'secondary'}>
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {u.role === 'seller' ? (
                    getVerificationBadge(u.verificationStatus || 'not_requested')
                  ) : (
                    <Badge 
                      variant={
                        u.membershipTier === 'premium' ? 'default' : 
                        u.membershipTier === 'standard' ? 'secondary' : 
                        'outline'
                      } 
                      className="capitalize"
                    >
                      {u.membershipTier || 'basic'}
                    </Badge>
                  )}
                </TableCell>
              <TableCell>{u.createdAt ? format(new Date(u.createdAt), "MMM d, yyyy") : '-'}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => onEdit(u)} data-testid={`button-edit-user-${u.id}`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Role
                    </Button>
                    {u.role === 'seller' ? (
                      <Button variant="outline" size="sm" onClick={() => onEditVerification(u)} data-testid={`button-edit-verification-${u.id}`}>
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        Status
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => onEditTier(u)} data-testid={`button-edit-tier-${u.id}`}>
                        <Award className="h-4 w-4 mr-1" />
                        Tier
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => onDelete(u)} data-testid={`button-delete-user-${u.id}`}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

// Listing Management Section Component
function ListingManagementSection({
  listings,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  loading
}: {
  listings: MarketplaceListing[];
  onEdit: (l: MarketplaceListing) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
                </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Posted By</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No listings found
              </TableCell>
            </TableRow>
          ) : (
            listings.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {l.sellerId || 'Unknown Seller'}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{l.type}</Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={l.status} />
                </TableCell>
                <TableCell>{l.location}</TableCell>
                <TableCell>{format(new Date(l.createdAt), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => onEdit(l)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    {l.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => onApprove(l.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onReject(l.id)}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => onDelete(l.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

// Verification Card Component
function VerificationCard({
  listing,
  onApprove,
  onReject,
  loading
}: {
  listing: MarketplaceListing;
  onApprove: () => void;
  onReject: () => void;
  loading?: boolean;
}) {
  return (
    <Card data-testid={`card-verification-${listing.id}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{listing.title}</CardTitle>
              <Badge variant={listing.type === 'mineral' ? 'default' : 'secondary'}>
                {listing.type}
              </Badge>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              Submitted {format(new Date(listing.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={onApprove} 
              disabled={loading}
              data-testid={`button-approve-${listing.id}`}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button 
              variant="destructive" 
              onClick={onReject}
              disabled={loading}
              data-testid={`button-reject-${listing.id}`}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Description:</p>
            <p className="text-sm">{listing.description}</p>
          </div>
          
          {listing.type === 'mineral' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
              {listing.mineralType && (
                <div>
                  <p className="text-xs text-muted-foreground">Mineral</p>
                  <p className="text-sm font-medium">{listing.mineralType}</p>
                </div>
              )}
              {listing.grade && (
                <div>
                  <p className="text-xs text-muted-foreground">Grade</p>
                  <p className="text-sm font-medium">{listing.grade}</p>
                </div>
              )}
              {listing.quantity && (
                <div>
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="text-sm font-medium">{listing.quantity}</p>
                </div>
              )}
              {listing.price && (
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-sm font-medium">{listing.price}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-medium">{listing.location}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Seller ID</p>
              <p className="text-sm font-mono text-xs">{listing.sellerId}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

