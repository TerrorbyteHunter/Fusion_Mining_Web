// Comprehensive Admin Dashboard with full management capabilities
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
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
import { AdminSidebar, AdminMobileMenuTrigger } from "@/components/AdminSidebar";
import type { MarketplaceListing, User, Message, Project, BuyerRequest, BuyerRequestWithBuyer } from "@shared/schema";
import {
  ShieldCheck, Users, Package, MessageSquare, Activity,
  Edit, Trash, Trash2, Plus, Search, CheckCircle, XCircle,
  MapPin, Award, RefreshCw, TrendingUp, UserX
} from "lucide-react";
import Messages from "./Messages";
import { format } from "date-fns";
import {
  BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";

export default function Admin() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading, isAdmin } = useAuth();
  const [location, navigate] = useLocation();

  // Derive initial tab from ?tab= query parameter so sidebar links like
  // /admin?tab=users can deep-link directly to a specific section.
  const getInitialTab = () => {
    try {
      const [, search = ""] = location.split("?");
      const params = new URLSearchParams(search);
      const tab = params.get("tab");
      if (tab) return tab;
    } catch {
      // ignore and fall back to overview
    }
    return "overview";
  };

  const [activeTab, setActiveTabState] = useState<string>(getInitialTab);

  // Keep URL in sync when the active tab changes inside the Admin dashboard
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    try {
      const [path, search = ""] = location.split("?");
      const params = new URLSearchParams(search);
      params.set("tab", tab);
      navigate(`${path}?${params.toString()}`);
    } catch {
      // If URL parsing fails for any reason, still update state
    }
  };
  // Initialize with minimal permissions - only add what the backend returns
  const [adminPermissions, setAdminPermissions] = useState<any>({
    canManageUsers: false,
    canManageListings: false,
    canManageProjects: false,
    canManageBlog: false,
    canManageCMS: false,
    canViewAnalytics: false,
    canManageMessages: false,
    canManageVerification: false,
    canManageSettings: false,
    canManageAdmins: false,
    canAccessAuditLogs: false,
    canManageDocuments: false,
    canResetPasswords: false,
    canForceLogout: false,
  });
  const [userRoleTab, setUserRoleTab] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  const [listingTypeTab, setListingTypeTab] = useState<'all' | 'mineral' | 'partnership' | 'project' | 'rfqs'>('all');
  const [verificationQueueTab, setVerificationQueueTab] = useState<'all' | 'mineral' | 'partnership' | 'project' | 'rfqs'>('all');

  // Mobile sidebar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [editingTier, setEditingTier] = useState(false);
  const [tierUser, setTierUser] = useState<User | null>(null);
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<string>("");
  const [editingVerification, setEditingVerification] = useState(false);
  const [userInfoForm, setUserInfoForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phoneNumber: "",
    companyName: ""
  });
  const [userSearch, setUserSearch] = useState("");
  const [listingSearch, setListingSearch] = useState("");
  const [listingStatusFilter, setListingStatusFilter] = useState<string>("all");
  const [rfqSearch, setRfqSearch] = useState("");
  const [rfqStatusFilter, setRfqStatusFilter] = useState<string>("all");
  const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createListingOpen, setCreateListingOpen] = useState(false);
  const [showPerms, setShowPerms] = useState(false);
  const [createListingForm, setCreateListingForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "mineral" as "mineral" | "partnership" | "project",
    quantity: "",
    location: "",
    specifications: "",
    sellerId: "", // Optional: if empty, defaults to admin
    imageUrl: ""
  });
  const [newUserForm, setNewUserForm] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    role: "buyer" as "admin" | "seller" | "buyer"
  });
  const [adminRole, setAdminRole] = useState<'super_admin' | 'verification_admin' | 'content_admin' | 'support_admin' | 'analytics_admin'>('super_admin');

  const adminRoleOptions = [
    { value: 'super_admin', label: 'Super Admin', description: 'Full platform control with all permissions' },
    { value: 'verification_admin', label: 'Verification Admin', description: 'Handle compliance, KYC/AML, and listing approvals' },
    { value: 'content_admin', label: 'Content Admin', description: 'Manage platform content, branding, and CMS' },
    { value: 'support_admin', label: 'Support Admin', description: 'Handle user communication and issue resolution' },
    { value: 'analytics_admin', label: 'Analytics Admin', description: 'Monitor platform performance and fraud detection' },
  ];

  // Load current admin's permissions and role on mount
  const [currentAdminRole, setCurrentAdminRole] = useState<'super_admin' | 'verification_admin' | 'content_admin' | 'support_admin' | 'analytics_admin' | undefined>(undefined);

  useEffect(() => {
    async function loadCurrentAdminPerms() {
      if (isAdmin && user) {
        try {
          console.log('[Admin] Fetching admin permissions for user:', user.id);
          const res = await apiRequest('GET', '/api/auth/user');
          const data = await res.json();
          console.log('[Admin] Received user data:', data);
          console.log('[Admin] Admin permissions from API:', data?.adminPermissions);

          // If backend returns valid permissions, use them
          if (data?.adminPermissions) {
            console.log('[Admin] Setting admin permissions:', data.adminPermissions);
            setAdminPermissions(data.adminPermissions);
            if (data.adminPermissions.adminRole) {
              setCurrentAdminRole(data.adminPermissions.adminRole);
            }
          } else {
            // If no permissions returned, default to super_admin with all permissions
            console.warn('[Admin] No adminPermissions in response, defaulting to super_admin permissions');
            const superAdminPermissions = {
              canManageUsers: true,
              canManageListings: true,
              canManageProjects: true,
              canManageBlog: true,
              canManageCMS: true,
              canViewAnalytics: true,
              canManageMessages: true,
              canManageVerification: true,
              canManageSettings: true,
              canManageAdmins: true,
              canAccessAuditLogs: true,
              canManageDocuments: true,
              canResetPasswords: true,
              canForceLogout: true,
              adminRole: 'super_admin'
            };
            setAdminPermissions(superAdminPermissions);
            setCurrentAdminRole('super_admin');
          }
        } catch (error) {
          console.error('[Admin] Error loading admin permissions:', error);
          // On error, also default to super_admin permissions
          console.log('[Admin] Defaulting to super_admin permissions due to error');
          const superAdminPermissions = {
            canManageUsers: true,
            canManageListings: true,
            canManageProjects: true,
            canManageBlog: true,
            canManageCMS: true,
            canViewAnalytics: true,
            canManageMessages: true,
            canManageVerification: true,
            canManageSettings: true,
            canManageAdmins: true,
            canAccessAuditLogs: true,
            canManageDocuments: true,
            canResetPasswords: true,
            canForceLogout: true,
            adminRole: 'super_admin'
          };
          setAdminPermissions(superAdminPermissions);
          setCurrentAdminRole('super_admin');
        }
      }
    }
    loadCurrentAdminPerms();
  }, [isAdmin, user]);

  // Removed problematic redirect useEffect that was causing navigation bugs
  // The permission checking is now handled by:
  // 1. Default super_admin permissions when loading fails
  // 2. AdminSidebar filtering menu items based on permissions
  // 3. Granting all access when permissions are null

  useEffect(() => {
    async function loadPerms() {
      if (editingUser && editingUser.role === 'admin') {
        try {
          const res = await apiRequest('GET', `/api/admin/users/${editingUser.id}/permissions`);
          const data = await res.json();
          if (data && data.adminRole) {
            setAdminRole(data.adminRole);
          } else {
            setAdminRole('super_admin');
          }
        } catch { }
      }
    }
    loadPerms();
  }, [editingUser]);

  // Populate user info form when editing
  useEffect(() => {
    if (editingUser) {
      setUserInfoForm({
        firstName: editingUser.firstName || "",
        lastName: editingUser.lastName || "",
        email: editingUser.email || "",
        username: (editingUser as any).username || "",
        phoneNumber: (editingUser as any).phoneNumber || "",
        companyName: (editingUser as any).companyName || ""
      });
      setSelectedRole(editingUser.role);
    }
  }, [editingUser]);

  const saveAdminPermsMutation = useMutation({
    mutationFn: async () => {
      if (!editingUser) return;
      return await apiRequest('PATCH', `/api/admin/users/${editingUser.id}/permissions`, { adminRole });
    },
    onSuccess: () => {
      toast({ title: 'Admin role updated' });
      setShowPerms(false);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update admin role', variant: 'destructive' });
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

  // Fetch verification queue (listings)
  const { data: verificationQueue, isLoading: loadingQueue } = useQuery<MarketplaceListing[]>({
    queryKey: ["/api/admin/verification-queue"],
    enabled: !!isAdmin && (activeTab === "verification" || activeTab === "overview"),
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/verification-queue");
      return (await res.json()) as MarketplaceListing[];
    },
  });

  // Fetch RFQ verification queue
  const { data: rfqVerificationQueue, isLoading: loadingRFQQueue } = useQuery<BuyerRequestWithBuyer[]>({
    queryKey: ["/api/admin/rfq-verification-queue"],
    enabled: !!isAdmin && (activeTab === "verification" || activeTab === "overview"),
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/rfq-verification-queue");
      return (await res.json()) as BuyerRequestWithBuyer[];
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

  // Fetch messages (used for overview/analytics stats)
  const { data: messages } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/messages");
      return (await res.json()) as Message[];
    },
  });

  // Fetch activity logs (all user activities)
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const [activitySearchQuery, setActivitySearchQuery] = useState<string>("");

  const { data: activityLogs, isLoading: loadingActivity, refetch: refetchActivityLogs } = useQuery<any[]>({
    queryKey: ["/api/admin/activity-logs", activityFilter],
    enabled: !!isAdmin && activeTab === "activity",
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("limit", "500");
      if (activityFilter !== "all") {
        params.append("activityType", activityFilter);
      }
      const res = await apiRequest("GET", `/api/admin/activity-logs?${params.toString()}`);
      return (await res.json()) as any[];
    },
  });

  // Date filter state for Admin Activities
  const [adminActivitiesDateFrom, setAdminActivitiesDateFrom] = useState<string>("");
  const [adminActivitiesDateTo, setAdminActivitiesDateTo] = useState<string>("");
  const [adminActivitiesActionFilter, setAdminActivitiesActionFilter] = useState<string>("all");

  // Fetch admin audit logs (admin-specific actions)
  const { data: adminAuditLogs, isLoading: loadingAdminActivities, refetch: refetchAdminActivities } = useQuery<any[]>({
    queryKey: ["/api/admin/audit-logs", adminActivitiesDateFrom, adminActivitiesDateTo, adminActivitiesActionFilter],
    enabled: !!isAdmin && activeTab === "admin-activities",
    queryFn: async () => {
      const params = new URLSearchParams();
      if (adminActivitiesDateFrom) params.append("from", adminActivitiesDateFrom);
      if (adminActivitiesDateTo) params.append("to", adminActivitiesDateTo);
      if (adminActivitiesActionFilter !== "all") params.append("action", adminActivitiesActionFilter);
      const res = await apiRequest("GET", `/api/admin/audit-logs?${params.toString()}`);
      return (await res.json()) as any[];
    },
  });

  // Helper function to log admin actions - used when performing admin operations
  // Prefixed with underscore to indicate it's available for future use
  const _logAdminAction = async (action: string, targetType: string, targetId?: string, changes?: any) => {
    try {
      await apiRequest("POST", "/api/admin/audit-log", {
        action,
        targetType,
        targetId: targetId || null,
        changes: changes || null,
      });
      // Refresh audit logs
      queryClient.invalidateQueries({ queryKey: ["/api/admin/audit-logs"] });
    } catch (error) {
      console.error("Failed to log admin action:", error);
    }
  };
  void _logAdminAction; // Suppress unused variable warning

  // Fetch projects
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: !!isAdmin && activeTab === "overview",
  });

  // Fetch buyer requests
  const { data: buyerRequests, isLoading: loadingRFQs } = useQuery<BuyerRequestWithBuyer[]>({
    queryKey: ["/api/marketplace/buyer-requests"],
    enabled: !!isAdmin && (activeTab === "overview" || activeTab === "listings"),
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/marketplace/buyer-requests");
      return (await res.json()) as BuyerRequestWithBuyer[];
    },
  });

  // Fetch consolidated admin stats (server-side counts) to avoid relying on multiple conditional queries
  const { data: adminStats } = useQuery<any>({
    queryKey: ['/api/admin/stats'],
    enabled: !!isAdmin && activeTab === 'overview',
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/stats');
      return await res.json();
    }
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

  const [rejectionDialog, setRejectionDialog] = useState<{ open: boolean, listingId: string | null }>({ open: false, listingId: null });
  const [rfqRejectionDialog, setRfqRejectionDialog] = useState<{ open: boolean, rfqId: string | null }>({ open: false, rfqId: null });
  const [rfqRejectionReason, setRfqRejectionReason] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  // Reject listing mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ listingId, reason }: { listingId: string, reason: string }) => {
      // Use the dedicated reject endpoint which we will ensure exists
      return await apiRequest("POST", `/api/admin/reject/${listingId}`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/verification-queue"] });
      // Also invalidate all listings as status changes
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/listings"] });
      setRejectionDialog({ open: false, listingId: null });
      setRejectionReason("");
      toast({ title: "Listing Rejected", description: "The listing has been rejected." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to reject listing", variant: "destructive" });
    },
  });

  // Approve RFQ mutation
  const approveRFQMutation = useMutation({
    mutationFn: async (rfqId: string) => {
      return await apiRequest("POST", `/api/admin/rfqs/${rfqId}/verify`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rfq-verification-queue"] });
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/buyer-requests"] });
      toast({ title: "RFQ Approved", description: "The RFQ has been verified and is now live." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to approve RFQ", variant: "destructive" });
    },
  });

  // Reject RFQ mutation
  const rejectRFQMutation = useMutation({
    mutationFn: async ({ rfqId, reason }: { rfqId: string, reason: string }) => {
      return await apiRequest("POST", `/api/admin/rfqs/${rfqId}/reject`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rfq-verification-queue"] });
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/buyer-requests"] });
      setRfqRejectionDialog({ open: false, rfqId: null });
      setRfqRejectionReason("");
      toast({ title: "RFQ Rejected", description: "The RFQ has been rejected." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to reject RFQ", variant: "destructive" });
    },
  });

  // Update user info mutation
  const updateUserInfoMutation = useMutation({
    mutationFn: async () => {
      if (!editingUser) return;
      return await apiRequest("PATCH", `/api/admin/users/${editingUser.id}/info`, userInfoForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setEditingUser(null);
      toast({ title: "User information updated", description: "The user's information has been updated successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user information", variant: "destructive" });
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
      setTierUser(null);
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
      setNewUserForm({ email: "", password: "", username: "", firstName: "", lastName: "", role: "buyer" });
      toast({ title: "User created", description: "New user has been created successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create user. Note: POST /api/admin/users endpoint may need to be added.", variant: "destructive" });
    },
  });

  // Create admin listing mutation
  const createAdminListingMutation = useMutation({
    mutationFn: async (listingData: typeof createListingForm) => {
      // Convert price to number
      const payload = {
        ...listingData,
        price: parseFloat(listingData.price) || 0,
      };

      // Remove empty optional fields to avoid validation errors if backend expects valid values
      if (!payload.sellerId) delete (payload as any).sellerId;
      if (!payload.imageUrl) delete (payload as any).imageUrl;
      if (!payload.specifications) delete (payload as any).specifications; // This might need to be an object if schema requires it, but schema says json/string?

      return await apiRequest("POST", "/api/admin/listings/create", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/verification-queue"] });
      setCreateListingOpen(false);
      setCreateListingForm({
        title: "",
        description: "",
        price: "",
        type: "mineral",
        quantity: "",
        location: "",
        specifications: "",
        sellerId: "",
        imageUrl: ""
      });
      toast({ title: "Listing created", description: "New listing has been created successfully." });
    },
    onError: (error: any) => {
      console.error("Failed to create listing:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create listing.",
        variant: "destructive"
      });
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

  // Account Deletion Requests query
  const { data: accountDeletionRequests, isLoading: loadingDeletionRequests } = useQuery<any[]>({
    queryKey: ["/api/admin/account-deletion-requests"],
    enabled: !!isAdmin && activeTab === "account-deletions",
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/account-deletion-requests");
      return (await res.json()) as any[];
    },
  });

  // Process (approve) account deletion mutation
  const processAccountDeletionMutation = useMutation({
    mutationFn: async (requestId: string) => {
      return await apiRequest("POST", `/api/admin/account-deletion-requests/${requestId}/process`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/account-deletion-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Account deleted", description: "The user account has been deleted successfully." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to delete account", variant: "destructive" });
    },
  });

  // Cancel account deletion mutation
  const cancelAccountDeletionMutation = useMutation({
    mutationFn: async (requestId: string) => {
      return await apiRequest("POST", `/api/admin/account-deletion-requests/${requestId}/cancel`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/account-deletion-requests"] });
      toast({ title: "Request cancelled", description: "The deletion request has been cancelled." });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to cancel request", variant: "destructive" });
    },
  });

  // Deduplicate listings to prevent duplicate key warnings - defined before early return to satisfy hook rules
  const deduplicatedListings = useMemo(() => {
    if (!allListings) return [];
    const seen = new Set<string>();
    return allListings.filter((listing) => {
      if (seen.has(listing.id)) {
        console.warn(`Duplicate listing found with ID: ${listing.id}`);
        return false;
      }
      seen.add(listing.id);
      return true;
    });
  }, [allListings]);

  if (authLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  const pendingListings = verificationQueue?.filter((l) => l.status === "pending") || [];
  const approvedListings = allListings?.filter((l) => l.status === "approved") || [];

  const stats = adminStats || {
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


  const filteredListings = deduplicatedListings.filter((l) => {
    if (listingStatusFilter !== "all" && l.status !== listingStatusFilter) return false;
    if (!listingSearch) return true;
    const search = listingSearch.toLowerCase();
    return (
      l.title?.toLowerCase().includes(search) ||
      l.description?.toLowerCase().includes(search) ||
      l.location?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        permissions={adminPermissions}
        adminRole={currentAdminRole}
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <section className="py-4 md:py-6 border-b bg-gradient-to-r from-destructive/10 to-primary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3">
                {/* Mobile menu trigger - placed in header for better UX */}
                <AdminMobileMenuTrigger onOpen={() => setMobileMenuOpen(true)} />
                <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-destructive flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-xl md:text-3xl font-bold font-display truncate" data-testid="text-page-title">
                    Admin Dashboard
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base truncate hidden sm:block">Complete platform control and management</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-blue-900 uppercase tracking-wider">Total Users</CardTitle>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-blue-950">{stats.totalUsers}</div>
                    <p className="text-[10px] font-medium text-blue-600 mt-1 uppercase tracking-tight">
                      {stats.admins} Admins • {stats.sellers} Sellers • {stats.buyers} Buyers
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500 bg-gradient-to-br from-white to-amber-50/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-amber-900 uppercase tracking-wider">Total Listings</CardTitle>
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Package className="h-4 w-4 text-amber-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-amber-950">{stats.totalListings}</div>
                    <p className="text-[10px] font-medium text-amber-600 mt-1 uppercase tracking-tight">
                      {stats.approvedListings} Approved • {stats.pendingVerifications} Pending
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 bg-gradient-to-br from-white to-purple-50/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-purple-900 uppercase tracking-wider">Total RFQs</CardTitle>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-purple-950">{stats.totalRFQs}</div>
                    <p className="text-[10px] font-medium text-purple-600 mt-1 uppercase tracking-tight">
                      Active Buyer Requests
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500 bg-gradient-to-br from-white to-emerald-50/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-emerald-900 uppercase tracking-wider">Projects</CardTitle>
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-emerald-950">{stats.totalProjects}</div>
                    <p className="text-[10px] font-medium text-emerald-600 mt-1 uppercase tracking-tight">
                      {stats.activeProjects} Active Projects
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-rose-500 bg-gradient-to-br from-white to-rose-50/30">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-rose-900 uppercase tracking-wider">Messages</CardTitle>
                    <div className="p-2 bg-rose-100 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-rose-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-rose-950">{stats.totalMessages}</div>
                    <p className="text-[10px] font-medium text-rose-600 mt-1 uppercase tracking-tight">
                      {stats.unreadMessages} Unread Messages
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Simplified Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* User Role Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">User Distribution</CardTitle>
                    <CardDescription>By role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Buyers", value: stats.buyers },
                            { name: "Sellers", value: stats.sellers },
                            { name: "Admins", value: stats.admins },
                          ]}
                          cx="45%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#10b981" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Listing Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Listing Status</CardTitle>
                    <CardDescription>Current distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { name: "Approved", Listings: stats.approvedListings },
                          { name: "Pending", Listings: stats.pendingVerifications },
                          { name: "Total", Listings: stats.totalListings },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Listings" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button onClick={() => setActiveTab("verification")} className="w-full justify-start bg-amber-600 hover:bg-amber-700">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Review Pending ({stats.pendingVerifications})
                    </Button>
                    <Button onClick={() => setActiveTab("users")} variant="outline" className="w-full justify-start border-blue-200 hover:bg-blue-50 text-blue-700">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button onClick={() => setActiveTab("listings")} variant="outline" className="w-full justify-start border-amber-200 hover:bg-amber-50 text-amber-700">
                      <Package className="mr-2 h-4 w-4" />
                      Manage Listings
                    </Button>
                    <Button onClick={() => { setActiveTab("listings"); setListingTypeTab("rfqs"); }} variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50 text-purple-700">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Manage RFQs
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
          {activeTab === "users" && adminPermissions?.canManageUsers && (
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
                    userRole="buyer"
                    users={filteredUsers.filter(u => u.role === 'buyer')}
                    onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }}
                    onEditTier={(u) => {
                      setTierUser(u);
                      setSelectedTier(u.membershipTier);
                      setEditingTier(true);
                    }}
                    onEditVerification={(u) => { setSelectedVerificationStatus(u.verificationStatus || 'not_requested'); setEditingVerification(true); }}
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
                    userRole="seller"
                    users={filteredUsers.filter(u => u.role === 'seller')}
                    onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }}
                    onEditTier={(u) => {
                      setTierUser(u);
                      setSelectedTier(u.membershipTier);
                      setEditingTier(true);
                    }}
                    onEditVerification={(u) => { setSelectedVerificationStatus(u.verificationStatus || 'not_requested'); setEditingVerification(true); }}
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
                    userRole="admin"
                    users={filteredUsers.filter(u => u.role === 'admin')}
                    onEdit={(u) => { setEditingUser(u); setSelectedRole(u.role); }}
                    onEditTier={(u) => {
                      setTierUser(u);
                      setSelectedTier(u.membershipTier);
                      setEditingTier(true);
                    }}
                    onEditVerification={(u) => { setSelectedVerificationStatus(u.verificationStatus || 'not_requested'); setEditingVerification(true); }}
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
          {activeTab === "listings" && adminPermissions?.canManageListings && (
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
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="all" data-testid="tab-all-listings">All Listings</TabsTrigger>
                  <TabsTrigger value="mineral" data-testid="tab-mineral-listings">Minerals</TabsTrigger>
                  <TabsTrigger value="partnership" data-testid="tab-partnership-listings">Partnerships</TabsTrigger>
                  <TabsTrigger value="project" data-testid="tab-project-listings">Projects</TabsTrigger>
                  <TabsTrigger value="rfqs" data-testid="tab-rfq-listings" className="text-purple-600 font-bold border-purple-100 hover:bg-purple-50">Buyer RFQs</TabsTrigger>
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
                    onReject={(id) => setRejectionDialog({ open: true, listingId: id })}
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
                    onReject={(id) => setRejectionDialog({ open: true, listingId: id })}
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
                    onReject={(id) => setRejectionDialog({ open: true, listingId: id })}
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
                    onReject={(id) => setRejectionDialog({ open: true, listingId: id })}
                    loading={loadingListings}
                  />
                </TabsContent>

                <TabsContent value="rfqs">
                  <div className="space-y-6">
                    {/* RFQ Specific Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search RFQs by title, category, or description..."
                          value={rfqSearch}
                          onChange={(e) => setRfqSearch(e.target.value)}
                          className="pl-10 border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                        />
                      </div>
                      <Select value={rfqStatusFilter} onValueChange={setRfqStatusFilter}>
                        <SelectTrigger className="w-full md:w-[200px] border-slate-200">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {loadingRFQs ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                          <Card key={i} className="animate-pulse">
                            <CardHeader className="h-32 bg-slate-100 rounded-t-lg" />
                            <CardContent className="space-y-2 pt-4">
                              <div className="h-4 bg-slate-100 rounded w-3/4" />
                              <div className="h-3 bg-slate-100 rounded w-1/2" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {buyerRequests
                          ?.filter((rfq) => {
                            if (rfqStatusFilter !== "all" && rfq.status !== rfqStatusFilter) return false;
                            if (!rfqSearch) return true;
                            const search = rfqSearch.toLowerCase();
                            return (
                              rfq.title.toLowerCase().includes(search) ||
                              rfq.description.toLowerCase().includes(search) ||
                              rfq.mainCategory?.toLowerCase().includes(search) ||
                              rfq.specificType?.toLowerCase().includes(search)
                            );
                          })
                          .map((rfq) => (
                            <Card key={rfq.id} className="hover:shadow-md transition-all duration-200 border-slate-200 group">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-3">
                                    <Badge variant={rfq.status === 'active' ? 'default' : 'secondary'} className={cn(
                                      "h-5 text-[10px] font-bold px-2",
                                      rfq.status === 'active' ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-200 text-slate-700"
                                    )}>
                                      {rfq.status.toUpperCase()}
                                    </Badge>

                                    {rfq.buyer && (
                                      <div className="flex items-center gap-2 text-[11px] text-slate-500 border-l pl-3 border-slate-200 min-w-0">
                                        <Users className="h-3 w-3 text-purple-500 flex-shrink-0" />
                                        <span className="font-bold text-slate-900 truncate max-w-[120px]">
                                          {`${rfq.buyer.firstName || ''} ${rfq.buyer.lastName || ''}`.trim() || 'Anonymous'}
                                        </span>
                                        <span className="text-slate-400 hidden sm:inline truncate max-w-[180px]">
                                          {rfq.buyer.email}
                                        </span>
                                        {rfq.buyer.verified && (
                                          <ShieldCheck className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {rfq.verified && (
                                    <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 h-5 text-[10px]">
                                      <ShieldCheck className="h-3 w-3 mr-1" />
                                      Verified RFQ
                                    </Badge>
                                  )}
                                </div>
                                <CardTitle className="text-lg font-bold group-hover:text-purple-600 transition-colors line-clamp-1">{rfq.title}</CardTitle>
                                <CardDescription className="line-clamp-2 min-h-[40px]">{rfq.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-3 pt-0">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-slate-100">
                                  <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Category</p>
                                    <p className="text-xs font-semibold text-slate-700 capitalize truncate">
                                      {rfq.mainCategory?.replace(/_/g, ' ') || 'General'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Budget</p>
                                    <p className="text-xs font-semibold text-purple-600 truncate">
                                      {rfq.budget || 'Open'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Quantity</p>
                                    <p className="text-xs font-semibold text-slate-700 truncate">
                                      {rfq.quantity || 'N/A'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
                                    <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                                      {rfq.location || 'Anywhere'}
                                    </p>
                                  </div>
                                </div>
                                <div className="pt-2 flex items-center justify-between border-t border-slate-50">
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    Created: {format(new Date(rfq.createdAt), "MMM d, yyyy")}
                                  </span>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                      onClick={() => navigate(`/marketplace?tab=requests&search=${encodeURIComponent(rfq.title)}`)}
                                    >
                                      View
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 text-xs text-rose-600 border-rose-100 hover:bg-rose-50 hover:text-rose-700">
                                      Close
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    )}

                    {buyerRequests && buyerRequests.length === 0 && !loadingRFQs && (
                      <div className="py-20 text-center">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                          <TrendingUp className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">No RFQs found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">There are currently no buyer requests matching your criteria.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Verification Queue Tab */}
          {activeTab === "verification" && adminPermissions?.canManageVerification && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Verification Queue</h2>
                <p className="text-muted-foreground">{(pendingListings.length + (rfqVerificationQueue?.length || 0))} items pending approval</p>
              </div>

              {/* Verification Queue Type Tabs */}
              <Tabs value={verificationQueueTab} onValueChange={(v) => setVerificationQueueTab(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="all" data-testid="tab-all-verification">All Pending</TabsTrigger>
                  <TabsTrigger value="mineral" data-testid="tab-mineral-verification">Minerals</TabsTrigger>
                  <TabsTrigger value="partnership" data-testid="tab-partnership-verification">Partnerships</TabsTrigger>
                  <TabsTrigger value="project" data-testid="tab-project-verification">Projects</TabsTrigger>
                  <TabsTrigger value="rfqs" data-testid="tab-rfq-verification">RFQs</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  {loadingQueue || loadingRFQQueue ? (
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
                  ) : (pendingListings.length === 0 && (!rfqVerificationQueue || rfqVerificationQueue.length === 0)) ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold">No pending items</p>
                        <p className="text-muted-foreground">All items have been reviewed</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {/* Pending Listings */}
                      {pendingListings.map((l) => (
                        <VerificationCard
                          key={l.id}
                          listing={l}
                          onApprove={() => approveMutation.mutate(l.id)}
                          onReject={() => setRejectionDialog({ open: true, listingId: l.id })}
                          loading={approveMutation.isPending || rejectMutation.isPending}
                        />
                      ))}

                      {/* Pending RFQs */}
                      {rfqVerificationQueue && rfqVerificationQueue.map((rfq) => (
                        <Card key={rfq.id}>
                          <CardHeader className="pb-3 px-6 pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <CardTitle className="text-lg">{rfq.title}</CardTitle>
                                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">RFQ</Badge>
                                </div>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                  {rfq.buyer ? (
                                    <div className="flex items-center gap-2 bg-purple-50 px-2 py-0.5 rounded text-[11px] border border-purple-100">
                                      <Users className="h-3 w-3 text-purple-600" />
                                      <span className="font-semibold text-purple-700">
                                        {rfq.buyer.firstName} {rfq.buyer.lastName}
                                      </span>
                                      <span className="text-purple-400">({rfq.buyer.email})</span>
                                      {rfq.buyer.verified && <ShieldCheck className="h-3 w-3 text-emerald-500" />}
                                    </div>
                                  ) : (
                                    <span>Submitted by User ID: {rfq.buyerId}</span>
                                  )}
                                </CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => approveRFQMutation.mutate(rfq.id)}
                                  disabled={approveRFQMutation.isPending}
                                  data-testid={`button-approve-rfq-${rfq.id}`}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => setRfqRejectionDialog({ open: true, rfqId: rfq.id })}
                                  disabled={rejectRFQMutation.isPending}
                                  data-testid={`button-reject-rfq-${rfq.id}`}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 border-t pt-4">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Description:</p>
                                <p className="text-sm">{rfq.description}</p>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t">
                                {rfq.mainCategory && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Category</p>
                                    <p className="text-sm font-semibold capitalize">{rfq.mainCategory.replace(/_/g, ' ')}</p>
                                  </div>
                                )}
                                {rfq.specificType && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Type</p>
                                    <p className="text-sm font-semibold">{rfq.specificType}</p>
                                  </div>
                                )}
                                {rfq.mineralType && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Mineral</p>
                                    <p className="text-sm font-semibold">{rfq.mineralType}</p>
                                  </div>
                                )}
                                {rfq.quantity && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Quantity</p>
                                    <p className="text-sm font-semibold">{rfq.quantity}</p>
                                  </div>
                                )}
                                {rfq.budget && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Budget</p>
                                    <p className="text-sm font-semibold">{rfq.budget}</p>
                                  </div>
                                )}
                                {rfq.location && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-sm font-semibold">{rfq.location}</p>
                                  </div>
                                )}
                                {rfq.country && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Country</p>
                                    <p className="text-sm font-semibold">{rfq.country}</p>
                                  </div>
                                )}
                                {rfq.createdAt && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Submitted</p>
                                    <p className="text-sm font-semibold">{format(new Date(rfq.createdAt), "MMM d, yyyy")}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="mineral">
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
                  ) : pendingListings.filter(l => l.type === 'mineral').length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold">No pending minerals</p>
                        <p className="text-muted-foreground">All mineral listings have been reviewed</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {pendingListings.filter(l => l.type === 'mineral').map((l) => (
                        <VerificationCard
                          key={l.id}
                          listing={l}
                          onApprove={() => approveMutation.mutate(l.id)}
                          onReject={() => setRejectionDialog({ open: true, listingId: l.id })}
                          loading={approveMutation.isPending || rejectMutation.isPending}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="partnership">
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
                  ) : pendingListings.filter(l => l.type === 'partnership').length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold">No pending partnerships</p>
                        <p className="text-muted-foreground">All partnership listings have been reviewed</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {pendingListings.filter(l => l.type === 'partnership').map((l) => (
                        <VerificationCard
                          key={l.id}
                          listing={l}
                          onApprove={() => approveMutation.mutate(l.id)}
                          onReject={() => setRejectionDialog({ open: true, listingId: l.id })}
                          loading={approveMutation.isPending || rejectMutation.isPending}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="project">
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
                  ) : pendingListings.filter(l => l.type === 'project').length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold">No pending projects</p>
                        <p className="text-muted-foreground">All project listings have been reviewed</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {pendingListings.filter(l => l.type === 'project').map((l) => (
                        <VerificationCard
                          key={l.id}
                          listing={l}
                          onApprove={() => approveMutation.mutate(l.id)}
                          onReject={() => setRejectionDialog({ open: true, listingId: l.id })}
                          loading={approveMutation.isPending || rejectMutation.isPending}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="rfqs">
                  {loadingRFQQueue ? (
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
                  ) : !rfqVerificationQueue || rfqVerificationQueue.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold">No pending RFQs</p>
                        <p className="text-muted-foreground">All RFQ requests have been reviewed</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {rfqVerificationQueue.map((rfq) => (
                        <Card key={rfq.id}>
                          <CardHeader className="pb-3 px-6 pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <CardTitle className="text-lg">{rfq.title}</CardTitle>
                                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">RFQ</Badge>
                                </div>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                  {rfq.buyer ? (
                                    <div className="flex items-center gap-2 bg-purple-50 px-2 py-0.5 rounded text-[11px] border border-purple-100">
                                      <Users className="h-3 w-3 text-purple-600" />
                                      <span className="font-semibold text-purple-700">
                                        {rfq.buyer.firstName} {rfq.buyer.lastName}
                                      </span>
                                      <span className="text-purple-400">({rfq.buyer.email})</span>
                                      {rfq.buyer.verified && <ShieldCheck className="h-3 w-3 text-emerald-500" />}
                                    </div>
                                  ) : (
                                    <span>Submitted by User ID: {rfq.buyerId}</span>
                                  )}
                                </CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => approveRFQMutation.mutate(rfq.id)}
                                  disabled={approveRFQMutation.isPending}
                                  data-testid={`button-approve-rfq-${rfq.id}`}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => setRfqRejectionDialog({ open: true, rfqId: rfq.id })}
                                  disabled={rejectRFQMutation.isPending}
                                  data-testid={`button-reject-rfq-${rfq.id}`}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 border-t pt-4">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Description:</p>
                                <p className="text-sm">{rfq.description}</p>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t">
                                {rfq.mainCategory && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Category</p>
                                    <p className="text-sm font-semibold capitalize">{rfq.mainCategory.replace(/_/g, ' ')}</p>
                                  </div>
                                )}
                                {rfq.specificType && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Type</p>
                                    <p className="text-sm font-semibold">{rfq.specificType}</p>
                                  </div>
                                )}
                                {rfq.mineralType && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Mineral</p>
                                    <p className="text-sm font-semibold">{rfq.mineralType}</p>
                                  </div>
                                )}
                                {rfq.quantity && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Quantity</p>
                                    <p className="text-sm font-semibold">{rfq.quantity}</p>
                                  </div>
                                )}
                                {rfq.budget && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Budget</p>
                                    <p className="text-sm font-semibold">{rfq.budget}</p>
                                  </div>
                                )}
                                {rfq.location && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-sm font-semibold">{rfq.location}</p>
                                  </div>
                                )}
                                {rfq.country && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Country</p>
                                    <p className="text-sm font-semibold">{rfq.country}</p>
                                  </div>
                                )}
                                {rfq.createdAt && (
                                  <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Submitted</p>
                                    <p className="text-sm font-semibold">{format(new Date(rfq.createdAt), "MMM d, yyyy")}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && adminPermissions?.canManageMessages && (
            <div className="p-6">
              <Messages />
            </div>
          )}

          {/* Edit User Tier Dialog */}
          <Dialog open={editingTier} onOpenChange={(open) => {
            if (!open) {
              setEditingTier(false);
              setTierUser(null);
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
                  Change the membership tier for {tierUser?.firstName} {tierUser?.lastName} ({tierUser?.email})
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
                    Current tier: <Badge variant="outline" className="capitalize">{tierUser?.membershipTier || 'basic'}</Badge>
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingTier(false);
                    setTierUser(null);
                    setSelectedTier("");
                  }}
                  data-testid="button-cancel-tier"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (tierUser && selectedTier) {
                      updateUserTierMutation.mutate({ userId: tierUser.id, tier: selectedTier });
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
          {activeTab === "analytics" && adminPermissions?.canViewAnalytics && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Platform Analytics</h2>
                <p className="text-muted-foreground">Comprehensive platform statistics and insights</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">Active members</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalListings}</div>
                    <p className="text-xs text-muted-foreground">{stats.approvedListings} approved</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.activeProjects}</div>
                    <p className="text-xs text-muted-foreground">{stats.totalProjects} total</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Platform Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalMessages}</div>
                    <p className="text-xs text-muted-foreground">{stats.unreadMessages} unread</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Role Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>User Role Distribution</CardTitle>
                    <CardDescription>Breakdown of users by role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Buyers", value: stats.buyers },
                            { name: "Sellers", value: stats.sellers },
                            { name: "Admins", value: stats.admins },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#10b981" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Listing Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Listing Status</CardTitle>
                    <CardDescription>Distribution of listings by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { status: "Approved", count: stats.approvedListings },
                          { status: "Pending", count: stats.pendingVerifications },
                          { status: "Total", count: stats.totalListings },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity Overview</CardTitle>
                  <CardDescription>Key metrics summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={[
                        { name: "Week 1", users: Math.floor(stats.totalUsers * 0.4), listings: Math.floor(stats.totalListings * 0.3), messages: Math.floor(stats.totalMessages * 0.25) },
                        { name: "Week 2", users: Math.floor(stats.totalUsers * 0.55), listings: Math.floor(stats.totalListings * 0.5), messages: Math.floor(stats.totalMessages * 0.4) },
                        { name: "Week 3", users: Math.floor(stats.totalUsers * 0.7), listings: Math.floor(stats.totalListings * 0.7), messages: Math.floor(stats.totalMessages * 0.6) },
                        { name: "Week 4", users: stats.totalUsers, listings: stats.totalListings, messages: stats.totalMessages },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="users" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Users" />
                      <Area type="monotone" dataKey="listings" stackId="1" stroke="#10b981" fill="#10b981" name="Listings" />
                      <Area type="monotone" dataKey="messages" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Messages" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Verification Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-bold text-yellow-600">{stats.pendingVerifications}</div>
                        <p className="text-xs text-muted-foreground mt-1">Pending verification</p>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-yellow-600 h-full"
                          style={{ width: `${stats.totalListings > 0 ? (stats.pendingVerifications / stats.totalListings * 100) : 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {stats.totalListings > 0 ? `${Math.round(stats.pendingVerifications / stats.totalListings * 100)}%` : "0%"} of total listings
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-bold text-green-600">
                          {stats.totalListings > 0 ? Math.round(stats.approvedListings / stats.totalListings * 100) : 0}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Approval rate</p>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-green-600 h-full"
                          style={{ width: `${stats.totalListings > 0 ? (stats.approvedListings / stats.totalListings * 100) : 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {stats.approvedListings} out of {stats.totalListings} listings
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Buyer Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-bold">{stats.totalRFQs}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total RFQs</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average per buyer</span>
                        <span className="text-lg font-bold">
                          {stats.buyers > 0 ? Math.round(stats.totalRFQs / stats.buyers * 10) / 10 : 0}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Engagement metric
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Activity Logs Tab */}
          {activeTab === "activity" && adminPermissions?.canAccessAuditLogs && (
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Activity Logs</h2>
                <p className="text-muted-foreground text-sm md:text-base">Monitor buyer and seller activities including logins, listings, messages, and more</p>
              </div>

              {/* Filters and Search */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex-1 w-full md:w-auto">
                      <Input
                        placeholder="Search activities..."
                        value={activitySearchQuery}
                        onChange={(e) => setActivitySearchQuery(e.target.value)}
                        className="max-w-md"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={activityFilter} onValueChange={setActivityFilter}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activities</SelectItem>
                          <SelectItem value="login">Logins</SelectItem>
                          <SelectItem value="logout">Logouts</SelectItem>
                          <SelectItem value="listing_created">Listings Created</SelectItem>
                          <SelectItem value="listing_approved">Listings Approved</SelectItem>
                          <SelectItem value="listing_rejected">Listings Rejected</SelectItem>
                          <SelectItem value="message_sent">Messages Sent</SelectItem>
                          <SelectItem value="interest_expressed">Interest Expressed</SelectItem>
                          <SelectItem value="profile_updated">Profile Updates</SelectItem>
                          <SelectItem value="blog_post_created">Blog Posts</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" onClick={() => refetchActivityLogs()}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

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
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Activity Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Date & Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activityLogs
                          .filter((log: any) => {
                            if (activitySearchQuery) {
                              const searchLower = activitySearchQuery.toLowerCase();
                              return (
                                log.description?.toLowerCase().includes(searchLower) ||
                                log.user?.email?.toLowerCase().includes(searchLower) ||
                                log.user?.firstName?.toLowerCase().includes(searchLower) ||
                                log.user?.lastName?.toLowerCase().includes(searchLower) ||
                                log.activityType?.toLowerCase().includes(searchLower)
                              );
                            }
                            return true;
                          })
                          .map((log: any) => {
                            const userName = log.user
                              ? `${log.user.firstName || ''} ${log.user.lastName || ''}`.trim() || log.user.email || log.user.username || 'Unknown User'
                              : 'Guest/System';
                            const userRole = log.user?.role || 'N/A';
                            const activityTypeLabel = log.activityType.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

                            return (
                              <TableRow key={log.id} data-testid={`activity-log-${log.id}`}>
                                <TableCell>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{userName}</span>
                                    <span className="text-xs text-muted-foreground">{userRole}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={
                                    log.activityType === 'login' ? 'default' :
                                      log.activityType === 'logout' ? 'secondary' :
                                        log.activityType === 'listing_approved' ? 'default' :
                                          log.activityType === 'listing_rejected' ? 'destructive' :
                                            'outline'
                                  }>
                                    {activityTypeLabel}
                                  </Badge>
                                </TableCell>
                                <TableCell className="max-w-md">
                                  <div className="text-sm">{log.description}</div>
                                  {log.metadata && (
                                    <details className="mt-1">
                                      <summary className="text-xs text-muted-foreground cursor-pointer">View details</summary>
                                      <pre className="text-xs mt-1 p-2 bg-muted rounded overflow-auto max-h-32">
                                        {JSON.stringify(log.metadata, null, 2)}
                                      </pre>
                                    </details>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-1">
                                    <span className="text-xs font-mono text-foreground font-semibold">
                                      {log.ipAddress === '::1' || log.ipAddress === '127.0.0.1' || log.ipAddress === '::ffff:127.0.0.1'
                                        ? 'localhost (::1)'
                                        : log.ipAddress || 'N/A'}
                                    </span>
                                    {log.userAgent && (
                                      <span className="text-xs text-muted-foreground truncate max-w-xs" title={log.userAgent}>
                                        {log.userAgent.length > 40 ? `${log.userAgent.substring(0, 40)}...` : log.userAgent}
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-xs">
                                  {format(new Date(log.createdAt), "MMM d, yyyy HH:mm:ss")}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                  {activityLogs.length >= 500 && (
                    <CardFooter className="text-sm text-muted-foreground">
                      Showing latest 500 activities. Use filters to narrow down results.
                    </CardFooter>
                  )}
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold">No activities recorded yet</p>
                    <p className="text-muted-foreground">Platform activities will appear here as users interact with the system</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Admin Activities Tab */}
          {activeTab === "admin-activities" && adminPermissions?.canAccessAuditLogs && (
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Admin Activities</h2>
                <p className="text-muted-foreground text-sm md:text-base">Monitor all administrative actions and changes made by admins</p>
              </div>

              {/* Filters and Search */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Audit Trail</CardTitle>
                  <CardDescription>Track all admin actions including user management, listing approvals, and system changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date-from">From Date</Label>
                          <Input
                            id="date-from"
                            type="date"
                            value={adminActivitiesDateFrom}
                            onChange={(e) => setAdminActivitiesDateFrom(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-to">To Date</Label>
                          <Input
                            id="date-to"
                            type="date"
                            value={adminActivitiesDateTo}
                            onChange={(e) => setAdminActivitiesDateTo(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="action-filter">Action Type</Label>
                          <Select value={adminActivitiesActionFilter} onValueChange={setAdminActivitiesActionFilter}>
                            <SelectTrigger id="action-filter" className="w-full">
                              <SelectValue placeholder="All Actions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Actions</SelectItem>
                              <SelectItem value="user_created">User Created</SelectItem>
                              <SelectItem value="user_updated">User Updated</SelectItem>
                              <SelectItem value="user_deleted">User Deleted</SelectItem>
                              <SelectItem value="user_role_changed">User Role Changed</SelectItem>
                              <SelectItem value="listing_approved">Listing Approved</SelectItem>
                              <SelectItem value="listing_rejected">Listing Rejected</SelectItem>
                              <SelectItem value="project_created">Project Created</SelectItem>
                              <SelectItem value="project_updated">Project Updated</SelectItem>
                              <SelectItem value="blog_post_created">Blog Post Created</SelectItem>
                              <SelectItem value="blog_post_updated">Blog Post Updated</SelectItem>
                              <SelectItem value="blog_post_deleted">Blog Post Deleted</SelectItem>
                              <SelectItem value="settings_updated">Settings Updated</SelectItem>
                              <SelectItem value="permissions_updated">Permissions Updated</SelectItem>
                              <SelectItem value="verification_approved">Verification Approved</SelectItem>
                              <SelectItem value="verification_rejected">Verification Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {(adminActivitiesDateFrom || adminActivitiesDateTo || adminActivitiesActionFilter !== "all") && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setAdminActivitiesDateFrom("");
                              setAdminActivitiesDateTo("");
                              setAdminActivitiesActionFilter("all");
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                        <Button variant="outline" size="icon" onClick={() => refetchAdminActivities()}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {loadingAdminActivities ? (
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
              ) : adminAuditLogs && adminAuditLogs.length > 0 ? (
                <Card>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Admin</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Target</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Date & Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {adminAuditLogs.map((log: any) => {
                          const adminName = log.admin
                            ? `${log.admin.firstName || ''} ${log.admin.lastName || ''}`.trim() || log.admin.email || 'Unknown Admin'
                            : log.adminId || 'Unknown Admin';
                          const actionLabel = log.action.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
                          const targetLabel = log.targetType?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'N/A';

                          return (
                            <TableRow key={log.id} data-testid={`admin-audit-log-${log.id}`}>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium">{adminName}</span>
                                  {log.admin?.email && (
                                    <span className="text-xs text-muted-foreground">{log.admin.email}</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={
                                  log.action.includes('delete') || log.action.includes('reject') ? 'destructive' :
                                    log.action.includes('approve') || log.action.includes('create') ? 'default' :
                                      'outline'
                                }>
                                  {actionLabel}
                                </Badge>
                              </TableCell>
                              <TableCell>{targetLabel}</TableCell>
                              <TableCell className="max-w-md">
                                <div className="text-sm">
                                  {log.targetId ? (
                                    <span className="font-mono text-xs">{log.targetId.slice(0, 8)}...</span>
                                  ) : '—'}
                                </div>
                                {log.changes && (
                                  <details className="mt-1">
                                    <summary className="text-xs text-muted-foreground cursor-pointer">View changes</summary>
                                    <pre className="text-xs mt-1 p-2 bg-muted rounded overflow-auto max-h-32">
                                      {JSON.stringify(log.changes, null, 2)}
                                    </pre>
                                  </details>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs font-mono text-foreground font-semibold">
                                    {log.ipAddress === '::1' || log.ipAddress === '127.0.0.1' || log.ipAddress === '::ffff:127.0.0.1'
                                      ? 'localhost (::1)'
                                      : log.ipAddress || 'N/A'}
                                  </span>
                                  {log.userAgent && (
                                    <span className="text-xs text-muted-foreground truncate max-w-xs" title={log.userAgent}>
                                      {log.userAgent.length > 40 ? `${log.userAgent.substring(0, 40)}...` : log.userAgent}
                                    </span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs">
                                {format(new Date(log.createdAt), "MMM d, yyyy HH:mm:ss")}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ShieldCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold">No admin activities recorded yet</p>
                    <p className="text-muted-foreground">Admin actions will appear here as you manage the platform</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "settings" && adminPermissions?.canManageSettings && (
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

        {/* Account Deletions Tab */}
        {activeTab === "account-deletions" && adminPermissions?.canManageUsers && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Account Deletion Requests</h2>
              <p className="text-muted-foreground">Review and process user account deletion requests</p>
            </div>

            {loadingDeletionRequests ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading deletion requests...</p>
                </div>
              </div>
            ) : !accountDeletionRequests || accountDeletionRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <UserX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No account deletion requests found</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountDeletionRequests.map((request: any) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="font-medium">
                            {request.user?.firstName || request.user?.lastName
                              ? `${request.user.firstName || ''} ${request.user.lastName || ''}`.trim()
                              : 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>{request.user?.email || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant={request.user?.role === 'admin' ? 'destructive' : 'default'}>
                            {request.user?.role || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {request.user?.membershipTier || 'basic'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate text-sm text-muted-foreground">
                            {request.reason || 'No reason provided'}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(request.createdAt), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === 'pending'
                                ? 'default'
                                : request.status === 'processed'
                                  ? 'secondary'
                                  : 'outline'
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === 'pending' && (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete the account for ${request.user?.email}? This action cannot be undone.`)) {
                                    processAccountDeletionMutation.mutate(request.id);
                                  }
                                }}
                                disabled={processAccountDeletionMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete Account
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (confirm(`Cancel deletion request for ${request.user?.email}?`)) {
                                    cancelAccountDeletionMutation.mutate(request.id);
                                  }
                                }}
                                disabled={cancelAccountDeletionMutation.isPending}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          )}
                          {request.status !== 'pending' && (
                            <span className="text-sm text-muted-foreground">
                              {request.status === 'processed' ? 'Deleted' : 'Cancelled'}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        )}

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
                  data-testid="input-create-email"
                />
              </div>
              <div>
                <Label htmlFor="username">Username (for test login)</Label>
                <Input
                  id="username"
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                  placeholder="e.g., john_doe"
                  data-testid="input-create-username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password (for test login)</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  placeholder="Enter password"
                  data-testid="input-create-password"
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
                    data-testid="input-create-first-name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newUserForm.lastName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, lastName: e.target.value })}
                    placeholder="Doe"
                    data-testid="input-create-last-name"
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

        {/* Edit User Dialog - Comprehensive */}
        <Dialog open={!!editingUser} onOpenChange={() => { setEditingUser(null); setShowPerms(false); }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information and role for {editingUser?.email}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* User Information Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">User Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      value={userInfoForm.firstName}
                      onChange={(e) => setUserInfoForm({ ...userInfoForm, firstName: e.target.value })}
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      value={userInfoForm.lastName}
                      onChange={(e) => setUserInfoForm({ ...userInfoForm, lastName: e.target.value })}
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={userInfoForm.email}
                    onChange={(e) => setUserInfoForm({ ...userInfoForm, email: e.target.value })}
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username (for test login)</Label>
                  <Input
                    id="username"
                    placeholder="Username for test login"
                    value={userInfoForm.username}
                    onChange={(e) => setUserInfoForm({ ...userInfoForm, username: e.target.value })}
                    data-testid="input-username"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="Phone number"
                      value={userInfoForm.phoneNumber}
                      onChange={(e) => setUserInfoForm({ ...userInfoForm, phoneNumber: e.target.value })}
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Company name"
                      value={userInfoForm.companyName}
                      onChange={(e) => setUserInfoForm({ ...userInfoForm, companyName: e.target.value })}
                      data-testid="input-company"
                    />
                  </div>
                </div>
              </div>

              {/* Role Section */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm">Role & Permissions</h3>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger id="role" data-testid="select-user-role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => { setEditingUser(null); setShowPerms(false); }} data-testid="button-cancel-edit-user">Cancel</Button>
              {(editingUser?.role === 'admin' || selectedRole === 'admin') && (
                <Button variant="secondary" onClick={() => setShowPerms(true)} data-testid="button-manage-perms">Manage Permissions</Button>
              )}
              <Button onClick={() => { if (editingUser) { updateUserInfoMutation.mutate(); } }} disabled={updateUserInfoMutation.isPending} data-testid="button-save-user-info">
                {updateUserInfoMutation.isPending ? "Saving..." : "Save User Info"}
              </Button>
              <Button onClick={() => { if (editingUser) { updateUserRoleMutation.mutate({ id: editingUser.id, role: selectedRole }); } }} disabled={updateUserRoleMutation.isPending} data-testid="button-save-user-role">
                {updateUserRoleMutation.isPending ? "Saving..." : "Save Role"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Admin Permissions Dialog */}
        <Dialog open={showPerms && !!editingUser && (editingUser.role === 'admin' || selectedRole === 'admin')} onOpenChange={(open) => { if (!open) setShowPerms(false); }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Admin Role & Permissions</DialogTitle>
              <DialogDescription>Select an admin role to assign permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Select Admin Role</Label>
              <div className="grid gap-3">
                {adminRoleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAdminRole(option.value as any)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${adminRole === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    data-testid={`button-admin-role-${option.value}`}
                  >
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPerms(false)}>Close</Button>
              <Button onClick={() => saveAdminPermsMutation.mutate()} disabled={saveAdminPermsMutation.isPending}>Save Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rejection Reason Dialog */}
        <Dialog open={rejectionDialog.open} onOpenChange={(open) => !open && setRejectionDialog({ open: false, listingId: null })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Listing</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this listing. This will be visible to the seller.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="rejection-reason" className="mb-2 block">Reason for Rejection</Label>
              <Textarea
                id="rejection-reason"
                placeholder="e.g. Missing required documentation, invalid price..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectionDialog({ open: false, listingId: null })}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (rejectionDialog.listingId) {
                    rejectMutation.mutate({ listingId: rejectionDialog.listingId, reason: rejectionReason });
                  }
                }}
                disabled={rejectMutation.isPending || !rejectionReason.trim()}
              >
                {rejectMutation.isPending ? "Rejecting..." : "Reject Listing"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* RFQ Rejection Reason Dialog */}
        <Dialog open={rfqRejectionDialog.open} onOpenChange={(open) => !open && setRfqRejectionDialog({ open: false, rfqId: null })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject RFQ</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this RFQ. This will be visible to the buyer.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="rfq-rejection-reason" className="mb-2 block">Reason for Rejection</Label>
              <Textarea
                id="rfq-rejection-reason"
                placeholder="e.g. Invalid requirements, spam, duplicate..."
                value={rfqRejectionReason}
                onChange={(e) => setRfqRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRfqRejectionDialog({ open: false, rfqId: null })}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (rfqRejectionDialog.rfqId) {
                    rejectRFQMutation.mutate({ rfqId: rfqRejectionDialog.rfqId, reason: rfqRejectionReason });
                  }
                }}
                disabled={rejectRFQMutation.isPending || !rfqRejectionReason.trim()}
              >
                {rejectRFQMutation.isPending ? "Rejecting..." : "Reject RFQ"}
              </Button>
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
            <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto px-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listing-title">Title</Label>
                  <Input
                    id="listing-title"
                    placeholder="Listing title"
                    value={createListingForm.title}
                    onChange={(e) => setCreateListingForm({ ...createListingForm, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listing-type">Type</Label>
                  <Select
                    value={createListingForm.type}
                    onValueChange={(value: any) => setCreateListingForm({ ...createListingForm, type: value })}
                  >
                    <SelectTrigger id="listing-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mineral">Mineral</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="listing-description">Description</Label>
                <Textarea
                  id="listing-description"
                  placeholder="Detailed description of the listing"
                  className="min-h-[100px]"
                  value={createListingForm.description}
                  onChange={(e) => setCreateListingForm({ ...createListingForm, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listing-price">Price ($)</Label>
                  <Input
                    id="listing-price"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={createListingForm.price}
                    onChange={(e) => setCreateListingForm({ ...createListingForm, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listing-quantity">Quantity (with units)</Label>
                  <Input
                    id="listing-quantity"
                    placeholder="e.g. 500 tons"
                    value={createListingForm.quantity}
                    onChange={(e) => setCreateListingForm({ ...createListingForm, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listing-location">Location</Label>
                  <Input
                    id="listing-location"
                    placeholder="City, Country"
                    value={createListingForm.location}
                    onChange={(e) => setCreateListingForm({ ...createListingForm, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listing-seller">Seller ID (Optional)</Label>
                  <Input
                    id="listing-seller"
                    placeholder="Defaults to your admin ID if empty"
                    value={createListingForm.sellerId}
                    onChange={(e) => setCreateListingForm({ ...createListingForm, sellerId: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="listing-specs">Specifications</Label>
                <Textarea
                  id="listing-specs"
                  placeholder="Technical specifications (purity, grade, etc.)"
                  value={createListingForm.specifications}
                  onChange={(e) => setCreateListingForm({ ...createListingForm, specifications: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateListingOpen(false)}>Cancel</Button>
              <Button
                onClick={() => createAdminListingMutation.mutate(createListingForm)}
                disabled={createAdminListingMutation.isPending || !createListingForm.title || !createListingForm.price}
              >
                {createAdminListingMutation.isPending ? "Creating..." : "Create Listing"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Legacy status-only edit dialog removed in favor of full edit dialog below */}
      </div>
    </div >
  );
}

// User Management Section Component
function UserManagementSection({
  userRole,
  users,
  onEdit,
  onEditTier,
  onEditVerification,
  onDelete,
  loading
}: {
  userRole: 'buyer' | 'seller' | 'admin';
  users: User[];
  onEdit: (u: User) => void;
  onEditTier: (u: User) => void;
  onEditVerification: (u: User) => void;
  onDelete: (u: User) => void;
  loading?: boolean;
}) {
  // Suppress unused variable warning - delete functionality can be enabled per user action requirements
  void onDelete;

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

  // Define table structure based on role
  const getTableHeaders = () => {
    if (userRole === 'buyer') {
      return ['Name', 'Email', 'Phone', 'Company', 'Tier', 'Joined', 'Actions'];
    } else if (userRole === 'seller') {
      return ['Name', 'Email', 'Phone', 'Company', 'V Status', 'Joined', 'Actions'];
    } else {
      return ['Name', 'Email', 'Phone', 'Company', 'Role', 'Joined', 'Actions'];
    }
  };

  const getAdminRoleLabel = (adminRole?: string): string => {
    const roleMap: Record<string, string> = {
      'super_admin': 'Super Admin',
      'verification_admin': 'Verification Admin',
      'content_admin': 'Content Admin',
      'support_admin': 'Support Admin',
      'analytics_admin': 'Analytics Admin',
    };
    return roleMap[adminRole || 'content_admin'] || 'Admin';
  };

  const renderTableCell = (u: User, headerIndex: number) => {
    if (userRole === 'buyer') {
      switch (headerIndex) {
        case 0: return u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : '-';
        case 1: return u.email;
        case 2: return (u as any).phoneNumber || '-';
        case 3: return (u as any).companyName || '-';
        case 4: return (
          <Badge
            variant={
              u.membershipTier === 'premium' ? 'default' :
                u.membershipTier === 'standard' ? 'secondary' :
                  'outline'
            }
            className="capitalize"
            data-testid={`text-tier-${u.id}`}
          >
            {u.membershipTier || 'basic'}
          </Badge>
        );
        case 5: return u.createdAt ? format(new Date(u.createdAt), "MMM d, yyyy") : '-';
        default: return null;
      }
    } else if (userRole === 'seller') {
      switch (headerIndex) {
        case 0: return u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : '-';
        case 1: return u.email;
        case 2: return (u as any).phoneNumber || '-';
        case 3: return (u as any).companyName || '-';
        case 4: return getVerificationBadge(u.verificationStatus || 'not_requested');
        case 5: return u.createdAt ? format(new Date(u.createdAt), "MMM d, yyyy") : '-';
        default: return null;
      }
    } else {
      // admin role
      switch (headerIndex) {
        case 0: return u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : '-';
        case 1: return u.email;
        case 2: return (u as any).phoneNumber || '-';
        case 3: return (u as any).companyName || '-';
        case 4: return (
          <Badge variant={u.role === 'admin' ? 'destructive' : 'secondary'} data-testid={`text-role-${u.id}`}>
            {getAdminRoleLabel((u as any).adminRole)}
          </Badge>
        );
        case 5: return u.createdAt ? format(new Date(u.createdAt), "MMM d, yyyy") : '-';
        default: return null;
      }
    }
  };

  const headers = getTableHeaders();

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header}
                className={header === 'Actions' ? 'text-right' : ''}
                data-testid={`header-${header.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center py-8 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <TableRow key={u.id} data-testid={`row-user-${u.id}`}>
                {headers.map((header, idx) => {
                  if (header === 'Actions') {
                    return (
                      <TableCell key="actions" className="text-right">
                        <div className="flex gap-2 justify-end flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(u)}
                            data-testid={`button-edit-user-${u.id}`}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (userRole === 'buyer') onEditTier(u);
                              else if (userRole === 'seller') onEditVerification(u);
                              else onEdit(u);
                            }}
                            data-testid={`button-status-user-${u.id}`}
                          >
                            <ShieldCheck className="h-4 w-4 mr-1" />
                            Status
                          </Button>
                        </div>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={header} className={header === 'Name' ? 'font-medium' : ''}>
                      {renderTableCell(u, idx)}
                    </TableCell>
                  );
                })}
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

