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
  Search, ArrowLeft
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
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline break-all font-medium hover:text-primary/80"
          data-testid="attachment-link"
        >
          <span className="flex items-center gap-1">
            <Paperclip className="w-3 h-3" />
            {filename || 'Attachment'}
          </span>
        </a>
      );
    }
    return <span className="whitespace-pre-wrap break-words">{content}</span>;
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
                            <p className="font-medium text-sm truncate">{usr.firstName} {usr.lastName}</p>
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
                      className={`p-3 rounded-lg cursor-pointer border transition-all ${selectedThread?.id === thread.id ? 'bg-primary/5 border-primary/50 shadow-sm' : 'hover:bg-muted/50 border-transparent hover:border-border'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-medium truncate flex-1 ${selectedThread?.id === thread.id ? 'text-primary' : ''}`}>
                          {thread.title}
                        </h4>
                        {(thread.unreadCount || 0) > 0 && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-1.5" />
                        )}
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{format(new Date(thread.lastMessageAt), 'MMM d, HH:mm')}</span>
                        {(thread as any).ticketStatus && (
                          <Badge variant="outline" className="text-[10px] h-4 px-1">{(thread as any).ticketStatus}</Badge>
                        )}
                      </div>
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
                        <h3 className="font-semibold text-sm">
                          {otherParticipant?.user?.firstName || 'User'} {otherParticipant?.user?.lastName || ''}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-md">
                          {selectedThread.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Admin Controls */}
                      {user?.role === 'admin' && (
                        <Select
                          value={(selectedThread as any).ticketStatus || 'open'}
                          onValueChange={(val) => updateTicketStatusMutation.mutate({ threadId: selectedThread.id, status: val })}
                        >
                          <SelectTrigger className="h-8 w-[100px] text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/10">
                    {messagesLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-2/3 rounded-lg" />
                        <Skeleton className="h-12 w-1/2 ml-auto rounded-lg" />
                        <Skeleton className="h-20 w-3/4 rounded-lg" />
                      </div>
                    ) : (
                      threadMessages?.map((msg, i) => {
                        const isMe = msg.senderId === user?.id || (user as any)?.claims?.sub === msg.senderId;
                        return (
                          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] lg:max-w-[70%] rounded-2xl p-3 shadow-sm ${isMe
                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                : 'bg-white dark:bg-card border rounded-bl-none'
                              }`}>
                              <p className="text-sm leading-relaxed">
                                {renderMessageContent(msg.content)}
                              </p>
                              <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                {format(new Date(msg.createdAt), "HH:mm")}
                              </p>
                            </div>
                          </div>
                        );
                      })
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
                  <div className="p-4 rounded-full bg-muted/30 mb-4">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">Select a conversation</h3>
                  <p className="text-center max-w-sm mt-2">
                    Choose a thread from the list to view messages or start a new conversation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dialogs */}
      <MessageDialog
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
    </div>
  );
}
