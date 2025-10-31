import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { ImageSelector } from "@/components/ImageSelector";
import { isUnauthorizedError } from "@/lib/authUtils";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { BlogPost, ContactSubmission, ActivityLog, Project, Video, MarketplaceListing, User, Message } from "@shared/schema";
import { MessageDialog } from "@/components/MessageDialog";
import { MessageDetailDialog } from "@/components/MessageDetailDialog";
import { 
  Newspaper, 
  Mail, 
  Activity, 
  MapPin,
  Edit,
  Trash,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  Video as VideoIcon,
  Power,
  Store,
  Settings,
  Send
} from "lucide-react";
import { format } from "date-fns";
import { useLocation } from "wouter";

export default function AdminCMS() {
  const { toast } = useToast();
  const { isAdmin, isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [isCreateVideoOpen, setIsCreateVideoOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    imageUrl: "",
  });
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: "",
  });
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    licenseType: "exploration" as "exploration" | "mining" | "processing",
    minerals: [] as string[],
    location: "",
    latitude: "",
    longitude: "",
  status: "active" as "active" | "pending" | "completed" | "suspended" | "closed",
    imageUrl: "",
    area: "",
    estimatedValue: "",
  });
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isEditListingOpen, setIsEditListingOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null);
  const [listingForm, setListingForm] = useState({
    sellerId: "",
    type: "mineral" as "mineral" | "partnership",
    title: "",
    description: "",
    mineralType: "",
    grade: "",
    location: "",
    quantity: "",
    price: "",
    imageUrl: "",
    status: "approved" as "pending" | "approved" | "rejected" | "inactive",
  });
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: string;
    name?: string;
    subject?: string;
    context?: string;
  } | null>(null);
  const [messageDetailOpen, setMessageDetailOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  // Reference some variables that are currently unused to satisfy the
  // project's strict `noUnusedLocals` TypeScript setting. These are
  // intentionally referenced here as no-op usages and can be removed
  // or integrated properly when these features are implemented.
  void Eye;
  void Clock;
  void selectedPost;
  void setSelectedPost;
  void isCreateListingOpen;
  void setIsCreateListingOpen;
  void isEditListingOpen;
  void setIsEditListingOpen;
  void editingListing;
  void setEditingListing;
  void listingForm;
  void setListingForm;

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
      setLocation("/dashboard");
    }
  }, [isAuthenticated, authLoading, isAdmin, toast, setLocation]);

  if (authLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  const { data: blogPosts, isLoading: loadingPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/admin/all"],
  });

  const { data: contacts, isLoading: loadingContacts } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact/submissions"],
  });

  const { data: activityLogs, isLoading: loadingLogs } = useQuery<ActivityLog[]>({
    queryKey: ["/api/admin/activity-logs"],
  });

  const { data: projects, isLoading: loadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: videos, isLoading: loadingVideos} = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const { data: marketplaceListings, isLoading: loadingListings } = useQuery<MarketplaceListing[]>({
    queryKey: ["/api/marketplace/listings"],
  });

  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: adminMessages, isLoading: loadingMessages } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const handleViewMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    setMessageDetailOpen(true);
  };

  const handleMessageUser = (userId: string, userName: string, context?: string, subject?: string) => {
    setSelectedRecipient({
      id: userId,
      name: userName,
      subject: subject || "Admin Message",
      context: context,
    });
    setMessageDialogOpen(true);
  };

  const createPostMutation = useMutation({
    mutationFn: async (data: typeof postForm) => {
      return await apiRequest("POST", "/api/blog", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/admin/all"] });
      setIsCreatePostOpen(false);
      setPostForm({ title: "", slug: "", excerpt: "", content: "", category: "", imageUrl: "" });
      toast({ title: "Blog post created successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", variant: "destructive" });
        setTimeout(() => window.location.href = "/api/login", 500);
        return;
      }
      toast({ title: "Error", description: "Failed to create blog post", variant: "destructive" });
    },
  });

  const publishPostMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("PATCH", `/api/blog/${id}/publish`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/admin/all"] });
      toast({ title: "Blog post published successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to publish blog post", variant: "destructive" });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof postForm }) => {
      return await apiRequest("PATCH", `/api/blog/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/admin/all"] });
      setIsEditPostOpen(false);
      setEditingPost(null);
      setPostForm({ title: "", slug: "", excerpt: "", content: "", category: "", imageUrl: "" });
      toast({ title: "Blog post updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update blog post", variant: "destructive" });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/blog/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/admin/all"] });
      toast({ title: "Blog post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" });
    },
  });

  const updateContactStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/contact/submissions/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact/submissions"] });
      toast({ title: "Contact status updated" });
    },
  });

  const createVideoMutation = useMutation({
    mutationFn: async (data: typeof videoForm) => {
      return await apiRequest("POST", "/api/videos", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/videos/active"] });
      setIsCreateVideoOpen(false);
      setVideoForm({ title: "", description: "", videoUrl: "", thumbnailUrl: "", duration: "" });
      toast({ title: "Video uploaded successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", variant: "destructive" });
        setTimeout(() => window.location.href = "/api/login", 500);
        return;
      }
      toast({ title: "Error", description: "Failed to upload video", variant: "destructive" });
    },
  });

  const toggleVideoActiveMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("POST", `/api/videos/${id}/toggle-active`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/videos/active"] });
      toast({ title: "Video status updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to toggle video status", 
        variant: "destructive" 
      });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/videos/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/videos/active"] });
      toast({ title: "Video deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete video", variant: "destructive" });
    },
  });

  const updateProjectStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/projects/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project status updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update project status", variant: "destructive" });
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: typeof projectForm) => {
      return await apiRequest("POST", "/api/projects", {
        ...data,
        latitude: data.latitude ? data.latitude : null,
        longitude: data.longitude ? data.longitude : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsCreateProjectOpen(false);
      setProjectForm({
        name: "",
        description: "",
        licenseType: "exploration",
        minerals: [],
        location: "",
        latitude: "",
        longitude: "",
        status: "active",
        imageUrl: "",
        area: "",
        estimatedValue: "",
      });
      toast({ title: "Project created successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", variant: "destructive" });
        setTimeout(() => window.location.href = "/api/login", 500);
        return;
      }
      toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof projectForm }) => {
      return await apiRequest("PATCH", `/api/projects/${id}`, {
        ...data,
        latitude: data.latitude ? data.latitude : null,
        longitude: data.longitude ? data.longitude : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsEditProjectOpen(false);
      setEditingProject(null);
      setProjectForm({
        name: "",
        description: "",
        licenseType: "exploration",
        minerals: [],
        location: "",
        latitude: "",
        longitude: "",
        status: "active",
        imageUrl: "",
        area: "",
        estimatedValue: "",
      });
      toast({ title: "Project updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update project", variant: "destructive" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/projects/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
    },
  });

  const updateListingStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/marketplace/listings/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/listings"] });
      toast({ title: "Listing status updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update listing status", variant: "destructive" });
    },
  });

  const deleteListingMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/marketplace/listings/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/marketplace/listings"] });
      toast({ title: "Listing deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete listing", variant: "destructive" });
    },
  });

  const handleCreatePost = () => {
    if (!postForm.title || !postForm.slug || !postForm.content) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    createPostMutation.mutate(postForm);
  };

  const handleCreateVideo = () => {
    if (!videoForm.title || !videoForm.videoUrl) {
      toast({ title: "Error", description: "Please fill in title and video URL", variant: "destructive" });
      return;
    }
    createVideoMutation.mutate(videoForm);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category || "",
      imageUrl: post.imageUrl || "",
    });
    setIsEditPostOpen(true);
  };

  const handleUpdatePost = () => {
    if (!postForm.title || !postForm.slug || !postForm.content || !editingPost) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    updatePostMutation.mutate({ id: editingPost.id, data: postForm });
  };

  const handleCreateProject = () => {
    if (!projectForm.name || !projectForm.description || !projectForm.location || projectForm.minerals.length === 0) {
      toast({ title: "Error", description: "Please fill in all required fields (name, description, location, minerals)", variant: "destructive" });
      return;
    }
    createProjectMutation.mutate(projectForm);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      licenseType: project.licenseType,
      minerals: project.minerals,
      location: project.location,
      latitude: project.latitude || "",
      longitude: project.longitude || "",
      status: project.status,
      imageUrl: project.imageUrl || "",
      area: project.area || "",
      estimatedValue: project.estimatedValue || "",
    });
    setIsEditProjectOpen(true);
  };

  const handleUpdateProject = () => {
    if (!projectForm.name || !projectForm.description || !projectForm.location || projectForm.minerals.length === 0 || !editingProject) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    updateProjectMutation.mutate({ id: editingProject.id, data: projectForm });
  };

  return (
    <div className="flex flex-col">
      <section className="py-8 border-b bg-gradient-to-r from-primary/10 to-chart-2/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Content Management System
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage blog posts, videos, contact submissions, projects, and monitor activity
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="blog" data-testid="tab-blog">
                <Newspaper className="mr-2 h-4 w-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="videos" data-testid="tab-videos">
                <VideoIcon className="mr-2 h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="contacts" data-testid="tab-contacts">
                <Mail className="mr-2 h-4 w-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="projects" data-testid="tab-projects">
                <MapPin className="mr-2 h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="marketplace" data-testid="tab-marketplace">
                <Store className="mr-2 h-4 w-4" />
                Marketplace
              </TabsTrigger>
              <TabsTrigger value="messages" data-testid="tab-messages">
                <Send className="mr-2 h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="contact-settings" onClick={() => setLocation('/admin/contact-settings')} data-testid="tab-contact-settings">
                <Settings className="mr-2 h-4 w-4" />
                Contact Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-create-blog-post">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create Blog Post</DialogTitle>
                      <DialogDescription>
                        Create a new blog post for the news section
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          data-testid="input-blog-title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                          id="slug"
                          value={postForm.slug}
                          onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                          data-testid="input-blog-slug"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                          placeholder="e.g., Industry News, Market Analysis"
                          data-testid="input-blog-category"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                          id="excerpt"
                          value={postForm.excerpt}
                          onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                          rows={2}
                          data-testid="textarea-blog-excerpt"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          rows={8}
                          data-testid="textarea-blog-content"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          value={postForm.imageUrl}
                          onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                          data-testid="input-blog-image"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleCreatePost}
                        disabled={createPostMutation.isPending}
                        data-testid="button-submit-blog-post"
                      >
                        Create Post
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Edit Post Dialog */}
              <Dialog open={isEditPostOpen} onOpenChange={setIsEditPostOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Blog Post</DialogTitle>
                    <DialogDescription>
                      Update the blog post details
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-title">Title *</Label>
                      <Input
                        id="edit-title"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        data-testid="input-edit-blog-title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-slug">Slug *</Label>
                      <Input
                        id="edit-slug"
                        value={postForm.slug}
                        onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                        data-testid="input-edit-blog-slug"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Input
                        id="edit-category"
                        value={postForm.category}
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        placeholder="e.g., Industry News, Market Analysis"
                        data-testid="input-edit-blog-category"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-excerpt">Excerpt</Label>
                      <Textarea
                        id="edit-excerpt"
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                        rows={2}
                        data-testid="textarea-edit-blog-excerpt"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-content">Content *</Label>
                      <Textarea
                        id="edit-content"
                        value={postForm.content}
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                        rows={8}
                        data-testid="textarea-edit-blog-content"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-imageUrl">Image URL</Label>
                      <Input
                        id="edit-imageUrl"
                        value={postForm.imageUrl}
                        onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                        data-testid="input-edit-blog-image"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditPostOpen(false)} data-testid="button-cancel-edit-blog-post">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdatePost}
                      disabled={updatePostMutation.isPending}
                      data-testid="button-update-blog-post"
                    >
                      {updatePostMutation.isPending ? "Updating..." : "Update Post"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {loadingPosts ? (
                <Skeleton className="h-96 w-full" />
              ) : blogPosts && blogPosts.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogPosts.map((post) => (
                        <TableRow key={post.id} data-testid={`row-blog-${post.id}`}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.category || '-'}</TableCell>
                          <TableCell>
                            {post.published ? (
                              <Badge variant="default">Published</Badge>
                            ) : (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>{format(new Date(post.createdAt), "MMM d, yyyy")}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {!post.published && (
                                <Button
                                  size="sm"
                                  onClick={() => publishPostMutation.mutate(post.id)}
                                  disabled={publishPostMutation.isPending}
                                  data-testid={`button-publish-${post.id}`}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditPost(post)}
                                data-testid={`button-edit-post-${post.id}`}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deletePostMutation.mutate(post.id)}
                                disabled={deletePostMutation.isPending}
                                data-testid={`button-delete-${post.id}`}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Newspaper className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Blog Posts</h3>
                    <p className="text-muted-foreground mb-4">Create your first blog post</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Videos</h2>
                <Dialog open={isCreateVideoOpen} onOpenChange={setIsCreateVideoOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-upload-video">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Upload Video</DialogTitle>
                      <DialogDescription>
                        Add a video to display on the homepage. Up to 4 videos can be active at once.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="video-title">Title *</Label>
                        <Input
                          id="video-title"
                          value={videoForm.title}
                          onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                          placeholder="e.g., Fusion Mining Limited: Building Zambia's Future"
                          data-testid="input-video-title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="video-description">Description</Label>
                        <Textarea
                          id="video-description"
                          value={videoForm.description}
                          onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                          placeholder="Brief description of the video"
                          data-testid="textarea-video-description"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="video-url">Video URL (YouTube embed URL) *</Label>
                        <Input
                          id="video-url"
                          value={videoForm.videoUrl}
                          onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/embed/VIDEO_ID"
                          data-testid="input-video-url"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use the embed URL format, not the regular YouTube URL
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="video-duration">Duration</Label>
                        <Input
                          id="video-duration"
                          value={videoForm.duration}
                          onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                          placeholder="e.g., 3:45"
                          data-testid="input-video-duration"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleCreateVideo}
                        disabled={createVideoMutation.isPending}
                        data-testid="button-submit-video"
                      >
                        {createVideoMutation.isPending ? "Uploading..." : "Upload Video"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {loadingVideos ? (
                <Skeleton className="h-96 w-full" />
              ) : videos && videos.length > 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {videos.map((video) => (
                          <TableRow key={video.id}>
                            <TableCell className="font-medium">{video.title}</TableCell>
                            <TableCell className="max-w-md truncate">{video.description || "—"}</TableCell>
                            <TableCell>{video.duration || "—"}</TableCell>
                            <TableCell>
                              {video.active ? (
                                <Badge variant="default">Active</Badge>
                              ) : (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </TableCell>
                            <TableCell>{format(new Date(video.createdAt), "MMM d, yyyy")}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant={video.active ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => toggleVideoActiveMutation.mutate(video.id)}
                                  disabled={toggleVideoActiveMutation.isPending}
                                  data-testid={`button-toggle-video-${video.id}`}
                                  title={video.active ? "Set inactive" : "Set active"}
                                >
                                  <Power className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this video?")) {
                                      deleteVideoMutation.mutate(video.id);
                                    }
                                  }}
                                  disabled={deleteVideoMutation.isPending}
                                  data-testid={`button-delete-video-${video.id}`}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <VideoIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Videos Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload your first video to display on the homepage
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="contacts" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>
              {loadingContacts ? (
                <Skeleton className="h-96 w-full" />
              ) : contacts && contacts.length > 0 ? (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <Card key={contact.id} data-testid={`card-contact-${contact.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{contact.subject}</CardTitle>
                            <CardDescription>
                              From: {contact.name} ({contact.email})
                            </CardDescription>
                          </div>
                          <Badge variant={contact.status === 'new' ? 'default' : 'secondary'}>
                            {contact.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{contact.message}</p>
                        {contact.phone && (
                          <p className="text-sm text-muted-foreground mb-4">Phone: {contact.phone}</p>
                        )}
                        <p className="text-sm text-muted-foreground mb-4">
                          Submitted: {format(new Date(contact.createdAt), "MMM d, yyyy HH:mm")}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateContactStatusMutation.mutate({ id: contact.id, status: 'contacted' })}
                            data-testid={`button-mark-contacted-${contact.id}`}
                          >
                            Mark as Contacted
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateContactStatusMutation.mutate({ id: contact.id, status: 'resolved' })}
                            data-testid={`button-mark-resolved-${contact.id}`}
                          >
                            Mark as Resolved
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Contact Submissions</h3>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Mining Projects</h2>
                <Button onClick={() => setIsCreateProjectOpen(true)} data-testid="button-create-project">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </div>
              {loadingProjects ? (
                <Skeleton className="h-96 w-full" />
              ) : projects && projects.length > 0 ? (
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <Card key={project.id} data-testid={`card-project-${project.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{project.location}</CardDescription>
                          </div>
                          <StatusBadge status={project.status} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{project.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-muted-foreground">License Type</p>
                            <p className="font-medium capitalize">{project.licenseType}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Minerals</p>
                            <p className="font-medium">{project.minerals.join(', ')}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-4 border-t justify-between items-center">
                          <Select
                            value={project.status}
                            onValueChange={(status) => updateProjectStatusMutation.mutate({ id: project.id, status })}
                          >
                            <SelectTrigger className="w-40" data-testid={`select-project-status-${project.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProject(project)}
                              data-testid={`button-edit-project-${project.id}`}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this project?")) {
                                  deleteProjectMutation.mutate(project.id);
                                }
                              }}
                              disabled={deleteProjectMutation.isPending}
                              data-testid={`button-delete-project-${project.id}`}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Projects</h3>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="marketplace" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Marketplace Listings</h2>
              </div>
              {loadingListings ? (
                <Skeleton className="h-96 w-full" />
              ) : marketplaceListings && marketplaceListings.length > 0 ? (
                <div className="grid gap-4">
                  {marketplaceListings.map((listing) => (
                    <Card key={listing.id} data-testid={`card-listing-${listing.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{listing.title}</CardTitle>
                            <CardDescription>{listing.location}</CardDescription>
                          </div>
                          <StatusBadge status={listing.status} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{listing.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-medium capitalize">{listing.type}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Mineral</p>
                            <p className="font-medium">{listing.mineralType || '-'}</p>
                          </div>
                          {listing.price && (
                            <div>
                              <p className="text-muted-foreground">Price</p>
                              <p className="font-medium">{listing.price}</p>
                            </div>
                          )}
                          {listing.quantity && (
                            <div>
                              <p className="text-muted-foreground">Quantity</p>
                              <p className="font-medium">{listing.quantity}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 pt-4 border-t justify-between items-center">
                          <Select
                            value={listing.status}
                            onValueChange={(status) => updateListingStatusMutation.mutate({ id: listing.id, status })}
                          >
                            <SelectTrigger className="w-40" data-testid={`select-listing-status-${listing.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this listing?")) {
                                  deleteListingMutation.mutate(listing.id);
                                }
                              }}
                              disabled={deleteListingMutation.isPending}
                              data-testid={`button-delete-listing-${listing.id}`}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Marketplace Listings</h3>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              {loadingLogs ? (
                <Skeleton className="h-96 w-full" />
              ) : activityLogs && activityLogs.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLogs.slice(0, 50).map((log) => (
                        <TableRow key={log.id} data-testid={`row-activity-${log.id}`}>
                          <TableCell>
                            <Badge variant="outline">{log.activityType}</Badge>
                          </TableCell>
                          <TableCell>{log.description}</TableCell>
                          <TableCell className="font-mono text-sm">{log.ipAddress || '-'}</TableCell>
                          <TableCell>{format(new Date(log.createdAt), "MMM d, HH:mm:ss")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Activity className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Activity Logs</h3>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
              {/* Received Messages Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-2">Received Messages</h2>
                <p className="text-muted-foreground mb-6">
                  Click on any message to view full details and reply
                </p>
                {loadingMessages ? (
                  <Skeleton className="h-96 w-full" />
                ) : adminMessages && adminMessages.length > 0 ? (
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>Preview</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {adminMessages
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .slice(0, 50)
                          .map((message) => (
                          <TableRow 
                            key={message.id} 
                            data-testid={`row-message-${message.id}`}
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => handleViewMessage(message.id)}
                          >
                            <TableCell className="font-medium">
                              {message.subject || 'No subject'}
                            </TableCell>
                            <TableCell>
                              {message.senderId}
                            </TableCell>
                            <TableCell className="max-w-md truncate text-muted-foreground">
                              {message.content}
                            </TableCell>
                            <TableCell>
                              <Badge variant={message.read ? "outline" : "default"}>
                                {message.read ? "Read" : "Unread"}
                              </Badge>
                            </TableCell>
                            <TableCell>{format(new Date(message.createdAt), "MMM d, yyyy")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No Messages</h3>
                      <p className="text-muted-foreground">You haven't received any messages yet</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Send New Message Section */}
              <div>
                <h2 className="text-2xl font-bold mb-2">Send New Message</h2>
                <p className="text-muted-foreground mb-6">
                  Send messages to users about projects, listings, or general inquiries
                </p>
                {loadingUsers ? (
                  <Skeleton className="h-96 w-full" />
                ) : users && users.length > 0 ? (
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.filter(u => u.role !== 'admin').map((user) => (
                          <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                            <TableCell className="font-medium">
                              {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{user.role}</Badge>
                            </TableCell>
                            <TableCell>{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMessageUser(
                                  user.id,
                                  `${user.firstName} ${user.lastName}`,
                                  undefined,
                                  "Message from Admin"
                                )}
                                data-testid={`button-message-${user.id}`}
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No Users</h3>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Message Dialog for Admin */}
          {selectedRecipient && (
            <MessageDialog
              open={messageDialogOpen}
              onOpenChange={(open) => {
                setMessageDialogOpen(open);
                if (!open) {
                  setSelectedRecipient(null);
                }
              }}
              recipientId={selectedRecipient.id}
              recipientName={selectedRecipient.name}
              defaultSubject={selectedRecipient.subject}
              listingTitle={selectedRecipient.context}
            />
          )}

          {/* Message Detail Dialog for Admin */}
          <MessageDetailDialog
            messageId={selectedMessageId}
            open={messageDetailOpen}
            onOpenChange={(open) => {
              setMessageDetailOpen(open);
              if (!open) {
                setSelectedMessageId(null);
              }
            }}
          />

          {/* Create/Edit Project Dialog */}
          <Dialog open={isCreateProjectOpen || isEditProjectOpen} onOpenChange={(open) => {
            if (!open) {
              setIsCreateProjectOpen(false);
              setIsEditProjectOpen(false);
              setEditingProject(null);
              setProjectForm({
                name: "",
                description: "",
                licenseType: "exploration",
                minerals: [],
                location: "",
                latitude: "",
                longitude: "",
                status: "active",
                imageUrl: "",
                area: "",
                estimatedValue: "",
              });
            }
          }}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
                <DialogDescription>
                  {editingProject ? "Update project details" : "Add a new mining project to the platform"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input
                    id="project-name"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    placeholder="e.g., Konkola Copper Mine"
                    data-testid="input-project-name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description *</Label>
                  <Textarea
                    id="project-description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Detailed project description"
                    className="min-h-32"
                    data-testid="textarea-project-description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-license">License Type *</Label>
                    <Select
                      value={projectForm.licenseType}
                      onValueChange={(value: "exploration" | "mining" | "processing") => 
                        setProjectForm({ ...projectForm, licenseType: value })
                      }
                    >
                      <SelectTrigger data-testid="select-license-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exploration">Exploration</SelectItem>
                        <SelectItem value="mining">Mining</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-location">Location *</Label>
                    <Input
                      id="project-location"
                      value={projectForm.location}
                      onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                      placeholder="e.g., Copperbelt Province"
                      data-testid="input-project-location"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-minerals">Minerals * (comma-separated)</Label>
                  <Input
                    id="project-minerals"
                    value={projectForm.minerals.join(", ")}
                    onChange={(e) => setProjectForm({ 
                      ...projectForm, 
                      minerals: e.target.value.split(",").map(m => m.trim()).filter(m => m) 
                    })}
                    placeholder="e.g., Copper, Cobalt, Gold"
                    data-testid="input-project-minerals"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-area">Area</Label>
                    <Input
                      id="project-area"
                      value={projectForm.area}
                      onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                      placeholder="e.g., 500 hectares"
                      data-testid="input-project-area"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-value">Estimated Value</Label>
                    <Input
                      id="project-value"
                      value={projectForm.estimatedValue}
                      onChange={(e) => setProjectForm({ ...projectForm, estimatedValue: e.target.value })}
                      placeholder="e.g., $50M"
                      data-testid="input-project-value"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-lat">Latitude (optional)</Label>
                    <Input
                      id="project-lat"
                      value={projectForm.latitude}
                      onChange={(e) => setProjectForm({ ...projectForm, latitude: e.target.value })}
                      placeholder="e.g., -12.9843"
                      data-testid="input-project-latitude"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-lng">Longitude (optional)</Label>
                    <Input
                      id="project-lng"
                      value={projectForm.longitude}
                      onChange={(e) => setProjectForm({ ...projectForm, longitude: e.target.value })}
                      placeholder="e.g., 28.6366"
                      data-testid="input-project-longitude"
                    />
                  </div>
                </div>
                <ImageSelector
                  value={projectForm.imageUrl}
                  onChange={(value) => setProjectForm({ ...projectForm, imageUrl: value })}
                  label="Project Image"
                  placeholder="https://example.com/project-image.jpg"
                  testId="input-project-image"
                />
              </div>
              <DialogFooter>
                <Button 
                  onClick={editingProject ? handleUpdateProject : handleCreateProject}
                  disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                  data-testid="button-submit-project"
                >
                  {(createProjectMutation.isPending || updateProjectMutation.isPending) 
                    ? "Saving..." 
                    : (editingProject ? "Update Project" : "Create Project")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
