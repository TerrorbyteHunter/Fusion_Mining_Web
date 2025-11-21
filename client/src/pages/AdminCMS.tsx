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
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { BlogPost, Video } from "@shared/schema";
import { 
  Newspaper, 
  MapPin,
  Edit,
  Trash,
  Plus,
  CheckCircle,
  Clock,
  Video as VideoIcon,
  Settings,
} from "lucide-react";
import { format } from "date-fns";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useLocation } from "wouter";

export default function AdminCMS() {
  const { toast } = useToast();
  const { isAdmin, isAuthenticated, isLoading: authLoading, permissions } = useAuth();
  const [, setLocation] = useLocation();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [isCreateVideoOpen, setIsCreateVideoOpen] = useState(false);
  const [isCreateSustainabilityOpen, setIsCreateSustainabilityOpen] = useState(false);
  const [isEditSustainabilityOpen, setIsEditSustainabilityOpen] = useState(false);
  const [editingSustainability, setEditingSustainability] = useState<any | null>(null);
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
  const [sustainabilityForm, setSustainabilityForm] = useState({
    title: "",
    section: "",
    content: "",
    imageUrl: "",
    order: 0,
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
      setLocation("/dashboard");
    }
  }, [isAuthenticated, authLoading, isAdmin, toast, setLocation]);

  // Gate by CMS permission
  useEffect(() => {
    if (!authLoading && isAuthenticated && isAdmin) {
      if (permissions && permissions.canManageCMS === false) {
        toast({ title: "Access Denied", description: "You don't have CMS access.", variant: "destructive" });
        setLocation('/admin');
      }
    }
  }, [authLoading, isAuthenticated, isAdmin, permissions, setLocation, toast]);

  if (authLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  const { data: blogPosts, isLoading: loadingPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/admin/all"],
  });

  const { data: videos, isLoading: loadingVideos} = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const { data: sustainabilityContent, isLoading: loadingSustainability } = useQuery<any[]>({
    queryKey: ["/api/sustainability"],
  });


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

  const createSustainabilityMutation = useMutation({
    mutationFn: async (data: typeof sustainabilityForm) => {
      return await apiRequest("POST", "/api/sustainability", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sustainability"] });
      setIsCreateSustainabilityOpen(false);
      setSustainabilityForm({ title: "", section: "", content: "", imageUrl: "", order: 0 });
      toast({ title: "Sustainability content created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create sustainability content", variant: "destructive" });
    },
  });

  const updateSustainabilityMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof sustainabilityForm }) => {
      return await apiRequest("PATCH", `/api/sustainability/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sustainability"] });
      setIsEditSustainabilityOpen(false);
      setEditingSustainability(null);
      setSustainabilityForm({ title: "", section: "", content: "", imageUrl: "", order: 0 });
      toast({ title: "Sustainability content updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update sustainability content", variant: "destructive" });
    },
  });

  const deleteSustainabilityMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/sustainability/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sustainability"] });
      toast({ title: "Sustainability content deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete sustainability content", variant: "destructive" });
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

  const handleEditSustainability = (item: any) => {
    setEditingSustainability(item);
    setSustainabilityForm({
      title: item.title,
      section: item.section,
      content: item.content,
      imageUrl: item.imageUrl || "",
      order: item.order || 0,
    });
    setIsEditSustainabilityOpen(true);
  };

  const handleCreateSustainability = () => {
    if (!sustainabilityForm.title || !sustainabilityForm.section || !sustainabilityForm.content) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    createSustainabilityMutation.mutate(sustainabilityForm);
  };

  const handleUpdateSustainability = () => {
    if (!sustainabilityForm.title || !sustainabilityForm.section || !sustainabilityForm.content || !editingSustainability) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    updateSustainabilityMutation.mutate({ id: editingSustainability.id, data: sustainabilityForm });
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab="cms" onTabChange={() => {}} />
      <div className="flex-1 flex flex-col">
      <section className="py-8 border-b bg-gradient-to-r from-primary/10 to-chart-2/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Content Management System
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage blog posts, videos, news & insights, and sustainability content
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="blog" data-testid="tab-blog">
                <Newspaper className="mr-2 h-4 w-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="videos" data-testid="tab-videos">
                <VideoIcon className="mr-2 h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="news-insights" data-testid="tab-news-insights">
                <Newspaper className="mr-2 h-4 w-4" />
                News & Insights
              </TabsTrigger>
              <TabsTrigger value="sustainability" data-testid="tab-sustainability">
                <MapPin className="mr-2 h-4 w-4" />
                Sustainability
              </TabsTrigger>
              <TabsTrigger value="contact-settings" data-testid="tab-contact-settings">
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

            <TabsContent value="news-insights" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">News & Insights</h2>
                <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-create-news-post">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Article
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create News Article</DialogTitle>
                      <DialogDescription>
                        Create a new news or insights article for the News & Insights section
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          data-testid="input-news-title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                          id="slug"
                          value={postForm.slug}
                          onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                          data-testid="input-news-slug"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                          placeholder="e.g., Market Updates, Industry Trends"
                          data-testid="input-news-category"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                          id="excerpt"
                          value={postForm.excerpt}
                          onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                          rows={2}
                          data-testid="textarea-news-excerpt"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          rows={8}
                          data-testid="textarea-news-content"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          value={postForm.imageUrl}
                          onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                          data-testid="input-news-image"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleCreatePost}
                        disabled={createPostMutation.isPending}
                        data-testid="button-submit-news-post"
                      >
                        Create Article
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {loadingPosts ? (
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
              ) : blogPosts && blogPosts.length > 0 ? (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <Card key={post.id} data-testid={`card-news-article-${post.id}`}>
                      <CardHeader className="flex flex-row items-start justify-between space-y-0">
                        <div className="flex-1">
                          <CardTitle>{post.title}</CardTitle>
                          <CardDescription>{post.category}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPost(post)}
                            data-testid={`button-edit-news-${post.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this article?")) {
                                deletePostMutation.mutate(post.id);
                              }
                            }}
                            data-testid={`button-delete-news-${post.id}`}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Newspaper className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
                    <p className="text-muted-foreground">Create your first news or insights article</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="sustainability" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Sustainability Content</h2>
                <Dialog open={isCreateSustainabilityOpen} onOpenChange={setIsCreateSustainabilityOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-create-sustainability">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Content
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Sustainability Content</DialogTitle>
                      <DialogDescription>
                        Add new sustainability content to the page
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="sust-title">Title *</Label>
                        <Input
                          id="sust-title"
                          value={sustainabilityForm.title}
                          onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, title: e.target.value })}
                          data-testid="input-sustainability-title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sust-section">Section *</Label>
                        <Input
                          id="sust-section"
                          value={sustainabilityForm.section}
                          onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, section: e.target.value })}
                          placeholder="e.g., Environmental, Community, Social"
                          data-testid="input-sustainability-section"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sust-content">Content *</Label>
                        <Textarea
                          id="sust-content"
                          value={sustainabilityForm.content}
                          onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, content: e.target.value })}
                          rows={6}
                          data-testid="textarea-sustainability-content"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sust-image">Image URL</Label>
                        <Input
                          id="sust-image"
                          value={sustainabilityForm.imageUrl}
                          onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, imageUrl: e.target.value })}
                          data-testid="input-sustainability-image"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sust-order">Display Order</Label>
                        <Input
                          id="sust-order"
                          type="number"
                          value={sustainabilityForm.order}
                          onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, order: parseInt(e.target.value) || 0 })}
                          data-testid="input-sustainability-order"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleCreateSustainability}
                        disabled={createSustainabilityMutation.isPending}
                        data-testid="button-submit-sustainability"
                      >
                        Add Content
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Dialog open={isEditSustainabilityOpen} onOpenChange={setIsEditSustainabilityOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Sustainability Content</DialogTitle>
                    <DialogDescription>
                      Update the sustainability content
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-sust-title">Title *</Label>
                      <Input
                        id="edit-sust-title"
                        value={sustainabilityForm.title}
                        onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, title: e.target.value })}
                        data-testid="input-edit-sustainability-title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-sust-section">Section *</Label>
                      <Input
                        id="edit-sust-section"
                        value={sustainabilityForm.section}
                        onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, section: e.target.value })}
                        data-testid="input-edit-sustainability-section"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-sust-content">Content *</Label>
                      <Textarea
                        id="edit-sust-content"
                        value={sustainabilityForm.content}
                        onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, content: e.target.value })}
                        rows={6}
                        data-testid="textarea-edit-sustainability-content"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-sust-image">Image URL</Label>
                      <Input
                        id="edit-sust-image"
                        value={sustainabilityForm.imageUrl}
                        onChange={(e) => setSustainabilityForm({ ...sustainabilityForm, imageUrl: e.target.value })}
                        data-testid="input-edit-sustainability-image"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleUpdateSustainability}
                      disabled={updateSustainabilityMutation.isPending}
                      data-testid="button-update-sustainability"
                    >
                      Update Content
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {loadingSustainability ? (
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
              ) : sustainabilityContent && sustainabilityContent.length > 0 ? (
                <div className="space-y-4">
                  {sustainabilityContent.map((item: any) => (
                    <Card key={item.id} data-testid={`card-sustainability-${item.id}`}>
                      <CardHeader className="flex flex-row items-start justify-between space-y-0">
                        <div className="flex-1">
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.section}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditSustainability(item)}
                            data-testid={`button-edit-sustainability-${item.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this content?")) {
                                deleteSustainabilityMutation.mutate(item.id);
                              }
                            }}
                            data-testid={`button-delete-sustainability-${item.id}`}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Sustainability Content</h3>
                    <p className="text-muted-foreground">Create your first sustainability content</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="contact-settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information Settings</CardTitle>
                  <CardDescription>
                    Manage your platform's contact information displayed to users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Email Address</p>
                      <p className="font-medium">contact@fusionminingzambia.com</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Phone Number</p>
                      <p className="font-medium">+260 211 123456</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Office Address</p>
                      <p className="font-medium">Lusaka, Zambia</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Business Hours</p>
                      <p className="font-medium">Monday - Friday: 8:00 AM - 5:00 PM (CAT)</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Contact form submissions are automatically logged and can be reviewed in the system.</p>
                    <Button variant="outline" onClick={() => setLocation('/admin/contact-submissions')} data-testid="button-view-submissions">
                      View Contact Submissions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      </div>
    </div>
  );
}
