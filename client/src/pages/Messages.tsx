import { useState, useEffect, useMemo, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/VerificationBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MessageSquare, Send, X, Users, Briefcase, UserCircle, ShieldCheck, Mail, Phone,
  MapPin, Building2, Copy, Eye, MessageCircle, CheckCircle, Paperclip, MoreVertical,
  Search, ArrowLeft, BadgeCheck, Package
} from "lucide-react";
import { MessageDialog } from "@/components/MessageDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import type { MessageThread, Message, User } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [threadSearchQuery, setThreadSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("inbox");
  const [usersSubTab, setUsersSubTab] = useState("sellers");
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: string;
    name?: string;
    subject?: string;
    context?: string;
  } | null>(null);
  const [userDetailsDialogOpen, setUserDetailsDialogOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState<User | null>(null);
  const [openContactAdminDialog, setOpenContactAdminDialog] = useState(false);
  const [contactAdminSubject, setContactAdminSubject] = useState("");
  const [contactAdminMessage, setContactAdminMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedThread, messageContent]); // Also scroll when thread changes

  const renderMessageContent = (content: string) => {
    const attachmentMatch = content.match(/Attachment:\s*(.+?)\s*-\s*(https?:\/\/\S+|\S+)/i);
    if (attachmentMatch) {
      const [, filename, url] = attachmentMatch;
      const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(url) || url.includes('/attached_assets/files/uploads/');

      return (
        <div className="space-y-2 max-w-sm">
          {isImage ? (
            <div className="rounded-lg overflow-hidden border border-border shadow-sm bg-muted/20">
              <img
                src={url}
                alt={filename}
                className="max-h-64 h-auto w-full object-contain cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => window.open(url, '_blank')}
              />
              <div className="p-2 bg-background/80 flex items-center justify-between gap-2 border-t">
                <span className="text-[10px] text-muted-foreground truncate flex-1">{filename}</span>
                <a href={url} target="_blank" rel="noreferrer" className="text-primary p-1 hover:bg-muted rounded transition-colors">
                  <Eye className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 bg-muted/40 hover:bg-muted/60 border border-border rounded-xl transition-all group"
              data-testid="attachment-link"
            >
              <div className="p-2 bg-background rounded-lg border border-border group-hover:border-primary/30 transition-colors">
                <Paperclip className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate text-foreground leading-tight">{filename || 'Attachment'}</p>
                <p className="text-[10px] text-muted-foreground">Click to download</p>
              </div>
            </a>
          )}
        </div>
      );
    }
    return <span className="whitespace-pre-wrap break-words leading-relaxed">{content}</span>;
  };

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [date: string]: Message[] } = {};
    messages.forEach(msg => {
      const date = format(new Date(msg.createdAt), 'yyyy-MM-dd');
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (format(new Date(), 'yyyy-MM-dd') === dateStr) return 'Today';
    if (format(new Date(Date.now() - 86400000), 'yyyy-MM-dd') === dateStr) return 'Yesterday';
    return format(date, 'MMMM do, yyyy');
  };

  // Fetch threads
  const { data: threads, isLoading: threadsLoading, refetch: refetchThreads } = useQuery<MessageThread[]>({
    queryKey: ["/api/threads", user?.role === "admin" ? "all" : "user"],
    queryFn: async () => {
      const response = await apiRequest(
        "GET",
        user?.role === "admin" ? "/api/threads/all" : "/api/threads"
      );
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // Fetch users list (for admin)
  const { data: allUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/users");
      return res.json();
    },
    enabled: user?.role === "admin",
  });

  // If threadId query param is present, auto-open that thread once threads load
  useEffect(() => {
    if (!threads || threads.length === 0) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const tid = params.get('threadId');
      if (!tid) return;
      const found = threads.find(t => t.id === tid);
      if (found) {
        setSelectedThread(found as any);
        setActiveTab(found.projectId ? 'projects' : 'inbox');
      }
    } catch (err) { }
  }, [threads]);

  // Handle new message from query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rid = params.get('recipientId');
    const isNew = params.get('new') === 'true';
    if (rid && isNew && allUsers) {
      const target = allUsers.find((u: User) => u.id === rid);
      if (target) {
        setSelectedRecipient({
          id: target.id,
          name: `${target.firstName || ''} ${target.lastName || ''}`.trim(),
          subject: params.get('subject') || "Direct Message"
        });
        setMessageDialogOpen(true);
      }
    }
  }, [allUsers]);

  // Fetch all messages for the user
  const { data: allMessages } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/messages");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // Fetch messages for selected thread
  const { data: threadMessages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/threads", selectedThread?.id || "", "messages"],
    queryFn: async () => {
      if (!selectedThread) return [];
      const response = await apiRequest("GET", `/api/threads/${selectedThread.id}/messages`);
      return response.json();
    },
    enabled: !!selectedThread,
  });

  useEffect(() => {
    if (threadMessages) {
      setTimeout(scrollToBottom, 100);
    }
  }, [threadMessages]);


  // Fetch selected thread details
  const { data: threadDetails } = useQuery<any>({
    queryKey: selectedThread ? ["/api/threads", selectedThread.id, "details"] : ["/api/threads", "none", "details"],
    queryFn: async () => {
      if (!selectedThread) return null;
      const resp = await apiRequest("GET", `/api/threads/${selectedThread.id}/details`);
      return resp.json();
    },
    enabled: !!selectedThread,
  });

  // derive the other participant
  const otherParticipant = (() => {
    if (!threadDetails || !selectedThread) return null;
    const meId = user?.id || (user as any)?.claims?.sub;
    if (!meId) return null;
    if (selectedThread.buyerId === meId) {
      return { user: threadDetails.seller, profile: threadDetails.sellerProfile };
    }
    return { user: threadDetails.buyer, profile: threadDetails.buyerProfile };
  })();

  const sendMessageMutation = useMutation({
    mutationFn: async ({ threadId, content }: { threadId: string; content: string }) => {
      return await apiRequest("POST", `/api/threads/${threadId}/messages`, { content });
    },
    onSuccess: (_data, variables) => {
      setMessageContent("");
      refetchThreads();
      queryClient.invalidateQueries({ queryKey: ["/api/threads", variables.threadId, "messages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!selectedThread || !messageContent.trim()) return;
    sendMessageMutation.mutate({ threadId: selectedThread.id, content: messageContent });
  };

  const uploadAttachmentMutation = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const resp = await fetch("/api/uploads/messages", { method: "POST", body: form });
      if (!resp.ok) throw new Error("Upload failed");
      return resp.json() as Promise<{ url: string; filename: string }>;
    },
    onSuccess: (payload) => {
      if (!selectedThread) return;
      const linkLine = `Attachment: ${payload.filename} - ${payload.url}`;
      sendMessageMutation.mutate({ threadId: selectedThread.id, content: linkLine });
      setAttachmentFile(null);
      toast({ title: "Attachment uploaded", description: "File link sent in chat." });
    },
    onError: () => {
      toast({ title: "Upload failed", description: "Could not upload file.", variant: "destructive" });
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (messageIds: string[]) => {
      const resp = await apiRequest("POST", "/api/messages/mark-read", { messageIds });
      try { return await resp.json(); } catch { return null; }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      refetchThreads();
      if (selectedThread) {
        queryClient.invalidateQueries({ queryKey: ["/api/threads", selectedThread.id, "messages"] });
      }
    },
  });

  // Ticket Mutations...
  const updateTicketStatusMutation = useMutation({
    mutationFn: async ({ threadId, status }: { threadId: string; status: string }) => {
      const resp = await apiRequest("PATCH", `/api/threads/${threadId}/ticket-status`, { status });
      return resp.json();
    },
    onSuccess: () => {
      refetchThreads();
      if (selectedThread) queryClient.invalidateQueries({ queryKey: ["/api/threads", selectedThread.id, "details"] });
      toast({ title: "Success", description: "Ticket status updated" });
    }
  });

  const updateTicketPriorityMutation = useMutation({
    mutationFn: async ({ threadId, priority }: { threadId: string; priority: string }) => {
      const resp = await apiRequest("PATCH", `/api/threads/${threadId}/ticket-priority`, { priority });
      return resp.json();
    },
    onSuccess: () => {
      refetchThreads();
      if (selectedThread) queryClient.invalidateQueries({ queryKey: ["/api/threads", selectedThread.id, "details"] });
      toast({ title: "Success", description: "Ticket priority updated" });
    }
  });

  const updateTicketAssigneeMutation = useMutation({
    mutationFn: async ({ threadId, assignedAdminId }: { threadId: string; assignedAdminId: string | null }) => {
      const resp = await apiRequest("PATCH", `/api/threads/${threadId}/ticket-assign`, { assignedAdminId });
      return resp.json();
    },
    onSuccess: () => {
      refetchThreads();
      if (selectedThread) queryClient.invalidateQueries({ queryKey: ["/api/threads", selectedThread.id, "details"] });
      toast({ title: "Success", description: "Ticket assignee updated" });
    }
  });

  const contactAdminMutation = useMutation({
    mutationFn: async (payload: any) => { return await apiRequest("POST", "/api/contact", payload); },
    onSuccess: () => {
      setOpenContactAdminDialog(false);
      setContactAdminSubject("");
      setContactAdminMessage("");
      toast({ title: "Message sent", description: "Administrators will respond soon." });
    },
    onError: () => { toast({ title: "Error", description: "Failed to send message.", variant: "destructive" }); },
  });

  const { data: contactSubmissions, isLoading: contactSubmissionsLoading, refetch: refetchContactSubmissions } = useQuery<any[]>({
    queryKey: ['/api/contact/submissions'],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/contact/submissions");
      return response.json();
    },
    enabled: user?.role === "admin" && isAuthenticated,
  });

  const updateSubmissionStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const resp = await apiRequest("PATCH", `/api/contact/submissions/${id}`, { status });
      return resp.json();
    },
    onSuccess: () => { refetchContactSubmissions(); toast({ title: "Success", description: "Submission status updated" }); }
  });

  // Mark Read Effect
  useEffect(() => {
    if (!threadMessages || !isAuthenticated || !user) return;
    const currentUserId = user?.id || (user as any)?.claims?.sub;
    const unreadInThread = threadMessages.filter(m => !m.read && m.receiverId === currentUserId);
    if (unreadInThread.length > 0) {
      markAsReadMutation.mutate(unreadInThread.map(m => m.id));
    }
  }, [threadMessages, isAuthenticated, user]);

  useEffect(() => {
    if (user?.role === 'buyer' && activeTab === 'sellers') setActiveTab('inbox');
  }, [user?.role, activeTab]);

  // Derived State
  const processedThreads = useMemo(() => {
    if (!threads) return [] as (MessageThread & { unreadCount?: number })[];
    const currentUserId = user?.id || (user as any)?.claims?.sub;
    return threads.map(t => {
      const unreadCount = (allMessages || []).filter(m => m.threadId === t.id && !m.read && m.receiverId === currentUserId).length;
      return { ...t, unreadCount };
    }).sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
  }, [threads, allMessages, user]);

  const totalUnread = useMemo(() => {
    return (allMessages || []).filter(m => !m.read && m.receiverId === (user?.id || (user as any)?.claims?.sub)).length;
  }, [allMessages, user]);

  // Filtering
  const filteredThreads = () => {
    if (!processedThreads) return [] as any[];
    const currentUserId = user?.id || (user as any)?.claims?.sub;
    const isAdmin = user?.role === 'admin';
    let base: (MessageThread & { unreadCount?: number })[] = [];

    if (isAdmin) {
      base = processedThreads.filter(t => (t as any).isAdminSupport === true);
    } else {
      switch (activeTab) {
        case "inbox":
          base = processedThreads.filter(t => (t as any).context === 'marketplace' || (!!t.listingId && !t.projectId)); break;
        case "projects":
          base = processedThreads.filter(t => (t as any).context === 'project_interest' || !!t.projectId); break;
        case "sellers":
          base = processedThreads.filter(t => {
            if (t.sellerId === currentUserId) return true;
            if (t.buyerId === currentUserId && !!t.sellerId) return true;
            return false;
          }); break;
        default: base = processedThreads;
      }
    }

    const q = threadSearchQuery.trim().toLowerCase();
    if (q.length > 0) {
      base = base.filter(t => {
        const title = (t.title || "").toLowerCase();
        const contextTags = [(t as any).context || "", t.projectId ? "project" : "", t.listingId ? "listing" : ""].join(" ").toLowerCase();
        return title.includes(q) || contextTags.includes(q);
      });
    }
    return base.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
  };

  const filteredUsers = () => {
    if (!allUsers) return [] as User[];
    let list = allUsers;
    if (usersSubTab === "sellers") list = list.filter(u => u.role === "seller");
    else if (usersSubTab === "buyers") list = list.filter(u => u.role === "buyer");
    else list = list.filter(u => u.role === "admin");
    const q = userSearchQuery.trim().toLowerCase();
    if (q.length > 0) {
      list = list.filter(u => {
        const name = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
        return name.includes(q) || (u.email || "").toLowerCase().includes(q);
      });
    }
    return list;
  };

  const { data: selectedUserProfile } = useQuery<any>({
    queryKey: ["/api/user-profiles", selectedUserDetails?.id],
    queryFn: async () => {
      if (!selectedUserDetails) return null;
      const res = await apiRequest("GET", `/api/user-profiles/${selectedUserDetails.id}`);
      return res.json();
    },
    enabled: !!selectedUserDetails,
  });

  const handleViewUserDetails = (user: User) => {
    setSelectedUserDetails(user);
    setUserDetailsDialogOpen(true);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Premium Header */}
      <section className="py-8 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden flex-none">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <MessageSquare className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
                    {user?.role === "admin" ? "Support Center" : "Messages"}
                  </h1>
                  {totalUnread > 0 && (
                    <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 h-6 px-2">
                      {totalUnread} new
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg mt-1">
                  {user?.role === "admin"
                    ? "Manage support tickets and user communications."
                    : "Manage your conversations and inquiries."}
                </p>
              </div>
            </div>
            {user?.role !== 'admin' && (
              <Button onClick={() => setOpenContactAdminDialog(true)} className="shadow-lg shadow-primary/20">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-6 flex min-h-0">
        <div className="container mx-auto px-6 flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[800px] lg:h-[calc(100vh-250px)] max-h-[1000px]">
            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col min-h-0 bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-muted/20">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="flex w-full overflow-x-auto pb-0.5 no-scrollbar justify-start gap-1">
                    {user?.role !== "admin" ? (
                      <>
                        <TabsTrigger value="inbox" className="flex-1">Inbox</TabsTrigger>
                        <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
                        <TabsTrigger value="sellers" className="flex-1">{user?.role === 'buyer' ? 'Sellers' : 'Buyers'}</TabsTrigger>
                      </>
                    ) : (
                      <>
                        <TabsTrigger value="sellers" className="flex-1">Tickets</TabsTrigger>
                        <TabsTrigger value="contact-submissions" className="flex-1">Forms</TabsTrigger>
                        <TabsTrigger value="users" className="flex-1">Users</TabsTrigger>
                      </>
                    )}
                  </TabsList>
                </Tabs>
                {activeTab !== "users" && activeTab !== "contact-submissions" && (
                  <div className="mt-4 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={threadSearchQuery}
                      onChange={(e) => setThreadSearchQuery(e.target.value)}
                      placeholder="Search conversations..."
                      className="pl-9 h-9"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {/* List Rendering Logic */}
                {user?.role === "admin" && activeTab === "users" ? (
                  <>
                    {/* User Search & List */}
                    <div className="px-2 pb-2">
                      <Tabs value={usersSubTab} onValueChange={setUsersSubTab} className="w-full">
                        <TabsList className="w-full grid grid-cols-3 h-8 mb-2">
                          <TabsTrigger value="sellers" className="text-xs">Sellers</TabsTrigger>
                          <TabsTrigger value="buyers" className="text-xs">Buyers</TabsTrigger>
                          <TabsTrigger value="admins" className="text-xs">Admins</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Input
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                        placeholder="Search users..."
                        className="h-8 text-sm"
                      />
                    </div>
                    {filteredUsers().map(usr => (
                      <div key={usr.id} onClick={() => handleViewUserDetails(usr)} className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer border border-transparent hover:border-border transition-all">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{(usr.firstName?.[0] || 'U')}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-medium text-sm truncate">{usr.firstName} {usr.lastName}</p>
                              {usr.verificationStatus === 'approved' && (
                                <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{usr.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : user?.role === "admin" && activeTab === "contact-submissions" ? (
                  // Contact Submissions
                  contactSubmissions?.map((s: any) => (
                    <div key={s.id} className="p-3 bg-card border rounded-lg space-y-2 hover:shadow-sm">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm">{s.name}</h4>
                        <Badge variant="outline" className="text-[10px] h-5">{s.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{s.subject}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => updateSubmissionStatusMutation.mutate({ id: s.id, status: 'resolved' })}>
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  // Message Threads
                  filteredThreads().map((thread: any) => (
                    <div
                      key={thread.id}
                      onClick={() => setSelectedThread(thread)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 group relative ${selectedThread?.id === thread.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm'
                        : 'hover:bg-muted/50 border-transparent hover:border-border'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border/50">
                          <AvatarFallback className={selectedThread?.id === thread.id ? 'bg-blue-200 text-blue-700' : 'bg-muted text-muted-foreground'}>
                            {thread.title?.[0] || 'T'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-0.5">
                            <h4 className={`text-sm font-semibold truncate ${selectedThread?.id === thread.id ? 'text-blue-700 dark:text-blue-400' : 'text-foreground'}`}>
                              {thread.title}
                            </h4>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2 mt-0.5">
                              {format(new Date(thread.lastMessageAt), 'MMM d')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-muted-foreground truncate leading-relaxed">
                              {thread.context === 'marketplace' ? 'Marketplace Inquiry' : thread.context === 'project_interest' ? 'Project Interest' : 'Direct Message'}
                            </p>
                            {(thread.unreadCount || 0) > 0 && (
                              <Badge className="h-4 min-w-[16px] px-1 bg-blue-600 text-[9px] flex items-center justify-center rounded-full animate-pulse">
                                {thread.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {selectedThread?.id === thread.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                      )}
                    </div>
                  ))
                )}
                {filteredThreads().length === 0 && user?.role !== 'admin' && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No messages found
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-8 flex flex-col min-h-0 bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden relative">
              {selectedThread ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex items-center justify-between bg-muted/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                        <AvatarImage src={otherParticipant?.profile?.profileImageUrl || otherParticipant?.user?.profileImageUrl} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {(otherParticipant?.user?.firstName?.[0] || 'U')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-sm">
                            {otherParticipant?.user?.firstName || 'User'} {otherParticipant?.user?.lastName || ''}
                          </h3>
                          {otherParticipant?.user?.verificationStatus === 'approved' && (
                            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-md">
                          {selectedThread.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Admin Controls */}
                      {user?.role === 'admin' && (
                        <div className="flex items-center gap-2 mr-2 border-r pr-2 border-border/50">
                          <Select
                            value={(selectedThread as any).ticketStatus || 'open'}
                            onValueChange={(val) => updateTicketStatusMutation.mutate({ threadId: selectedThread.id, status: val })}
                          >
                            <SelectTrigger className="h-8 w-[110px] text-[10px] font-bold uppercase tracking-wider bg-primary/5 border-primary/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/50 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Thread Info Banner (Optional/Contextual) */}
                  {(selectedThread.listingId || selectedThread.projectId) && (
                    <div className="px-4 py-2 bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100/50 dark:border-blue-800/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100/50 dark:bg-blue-800/30 rounded-md">
                          {selectedThread.projectId ? <Briefcase className="w-3 h-3 text-blue-600" /> : <Package className="w-3 h-3 text-blue-600" />}
                        </div>
                        <span className="text-[11px] font-medium text-blue-800 dark:text-blue-300 truncate max-w-[250px]">
                          {selectedThread.projectId ? "Inquiry for Project" : "Inquiry for Marketplace Listing"}
                        </span>
                      </div>
                      {selectedThread.listingId && (
                        <Button size="sm" variant="ghost" className="h-6 text-[10px] text-blue-700 hover:text-blue-800 hover:bg-blue-100/50 font-bold" onClick={() => window.location.href = `/marketplace?search=${encodeURIComponent(selectedThread.title)}`}>
                          View Item
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30 dark:bg-slate-900/10 scrollbar-thin scrollbar-thumb-border">
                    {messagesLoading ? (
                      <div className="space-y-6">
                        <Skeleton className="h-10 w-[40%] rounded-2xl" />
                        <Skeleton className="h-16 w-[60%] ml-auto rounded-2xl" />
                        <Skeleton className="h-12 w-[50%] rounded-2xl" />
                      </div>
                    ) : (
                      Object.entries(groupMessagesByDate(threadMessages || [])).map(([date, msgs]) => (
                        <div key={date} className="space-y-4">
                          <div className="flex justify-center my-6">
                            <span className="px-3 py-1 rounded-full bg-background border text-[10px] font-bold uppercase tracking-widest text-muted-foreground shadow-sm">
                              {getDayLabel(date)}
                            </span>
                          </div>
                          {msgs.map((msg, i) => {
                            const isMe = msg.senderId === user?.id || (user as any)?.claims?.sub === msg.senderId;
                            return (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`group relative max-w-[85%] lg:max-w-[75%] rounded-2xl px-4 py-3 transition-all duration-200 ${isMe
                                  ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-tr-sm shadow-md shadow-blue-500/10'
                                  : 'bg-white dark:bg-slate-800 border border-border shadow-sm rounded-tl-sm'
                                  }`}>
                                  <div className="text-[13px] leading-relaxed">
                                    {renderMessageContent(msg.content)}
                                  </div>
                                  <div className={`flex items-center justify-end gap-1.5 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity ${isMe ? 'text-blue-50' : 'text-muted-foreground'}`}>
                                    <span className="text-[9px] font-medium tracking-tighter">
                                      {format(new Date(msg.createdAt), "HH:mm")}
                                    </span>
                                    {isMe && (
                                      <div className="flex">
                                        <CheckCircle className={`w-2.5 h-2.5 ${msg.read ? 'text-blue-100 fill-blue-100/20' : 'text-blue-50'}`} />
                                      </div>
                                    )}
                                  </div>

                                  {/* Pointer accent for bubbles */}
                                  <div className={`absolute top-0 w-2 h-2 ${isMe ? '-right-1.5' : '-left-1.5'}`}>
                                    {/* Abstract corner indicator using SVG or CSS - keeping it simple with rounded corners above */}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
                    <div className="flex gap-3">
                      <Button
                        variant="outline" size="icon" className="h-10 w-10 shrink-0 rounded-full"
                        onClick={() => document.getElementById('message-attachment')?.click()}
                      >
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <input
                        type="file"
                        id="message-attachment"
                        className="hidden"
                        onChange={(e) => { e.target.files?.[0] && uploadAttachmentMutation.mutate(e.target.files[0]); }}
                      />
                      <Textarea
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="Type your message..."
                        className="min-h-[40px] max-h-[120px] py-2 resize-none rounded-2xl"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageContent.trim()}
                        className="h-10 w-10 shrink-0 rounded-full shadow-md"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 rounded-full bg-gradient-to-br from-muted/50 to-muted/10 mb-6 border border-border/40 shadow-inner"
                  >
                    <MessageSquare className="h-16 w-16 text-primary/20" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground">Select a conversation</h3>
                  <p className="text-center max-w-sm mt-3 text-muted-foreground leading-relaxed">
                    Select a thread from your inbox to view the history and continue your conversation.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <div className="p-4 rounded-xl border bg-muted/20 flex flex-col items-center gap-2 text-center">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                      <span className="text-xs font-semibold">Secure Encryption</span>
                    </div>
                    <div className="p-4 rounded-xl border bg-muted/20 flex flex-col items-center gap-2 text-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-xs font-semibold">Verified Users</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section >

      {/* Dialogs */}
      < MessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        recipient={selectedRecipient}
      />

      <Dialog open={openContactAdminDialog} onOpenChange={setOpenContactAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>Send a message to our support team.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input value={contactAdminSubject} onChange={(e) => setContactAdminSubject(e.target.value)} placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea value={contactAdminMessage} onChange={(e) => setContactAdminMessage(e.target.value)} placeholder="Describe your issue..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenContactAdminDialog(false)}>Cancel</Button>
            <Button onClick={() => contactAdminMutation.mutate({ subject: contactAdminSubject, message: contactAdminMessage, name: user?.firstName || 'User', email: user?.email })}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={userDetailsDialogOpen} onOpenChange={setUserDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUserProfile && (
            <div className="space-y-6 pt-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={selectedUserProfile.profileImageUrl} />
                  <AvatarFallback className="text-2xl">{selectedUserDetails?.firstName?.[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{selectedUserDetails?.firstName} {selectedUserDetails?.lastName}</h3>
                <Badge variant="secondary" className="mt-2 capitalize">{selectedUserDetails?.role}</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedUserDetails?.email}</span>
                </div>
                {selectedUserProfile.companyName && (
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedUserProfile.companyName}</span>
                  </div>
                )}
                {selectedUserProfile.phoneNumber && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedUserProfile.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div >
  );
}
