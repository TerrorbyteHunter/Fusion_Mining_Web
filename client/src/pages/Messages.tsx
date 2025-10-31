import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, Send, X, Users, Briefcase, UserCircle, ShieldCheck, Mail, Phone, MapPin, Building2, Copy, Eye, MessageCircle } from "lucide-react";
import { MessageDialog } from "@/components/MessageDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format } from "date-fns";
import type { MessageThread, Message, User } from "@shared/schema";

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [messageContent, setMessageContent] = useState("");
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

  // Fetch all messages for the user (used to compute unread per-thread)
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

  // Fetch selected thread details (buyer/seller profiles) so we can show header quick info
  const { data: threadDetails } = useQuery<any>({
    queryKey: selectedThread ? ["/api/threads", selectedThread.id, "details"] : ["/api/threads", "none", "details"],
    queryFn: async () => {
      if (!selectedThread) return null;
      const resp = await apiRequest("GET", `/api/threads/${selectedThread.id}/details`);
      return resp.json();
    },
    enabled: !!selectedThread,
  });

  // derive the other participant (the sender from current user's perspective)
  const otherParticipant = (() => {
    if (!threadDetails || !selectedThread) return null;
    const meId = user?.id || (user as any)?.claims?.sub;
    if (!meId) return null;
    // if I'm the buyer, show seller info; otherwise show buyer info
    if (selectedThread.buyerId === meId) {
      return { user: threadDetails.seller, profile: threadDetails.sellerProfile };
    }
    return { user: threadDetails.buyer, profile: threadDetails.buyerProfile };
  })();

  // Send message mutation
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

  // Mutation to mark messages as read
  const markAsReadMutation = useMutation({
    mutationFn: async (messageIds: string[]) => {
      const resp = await apiRequest("POST", "/api/messages/mark-read", { messageIds });
      try {
        return await resp.json();
      } catch {
        return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      refetchThreads();
      if (selectedThread) {
        queryClient.invalidateQueries({ queryKey: ["/api/threads", selectedThread.id, "messages"] });
      }
    },
  });

  // When threadMessages load, mark unread messages in that thread as read
  useEffect(() => {
    if (!threadMessages || !isAuthenticated || !user) return;
    const unreadInThread = threadMessages.filter(m => !m.read && m.receiverId === (user?.id || (user as any)?.claims?.sub));
    if (unreadInThread.length > 0) {
      markAsReadMutation.mutate(unreadInThread.map(m => m.id));
    }
  }, [threadMessages, isAuthenticated, user]);

  // If the current user is a buyer, ensure the Sellers tab is not active
  useEffect(() => {
    if (user?.role === 'buyer' && activeTab === 'sellers') {
      setActiveTab('inbox');
    }
  }, [user?.role, activeTab]);

  // Compute unread count per thread and total
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

  // Filter functions
  const filteredThreads = () => {
    if (!processedThreads) return [] as any[];
    const currentUserId = user?.id || (user as any)?.claims?.sub;
    const isAdmin = user?.role === 'admin';

    switch (activeTab) {
      case "inbox":
        // Only show marketplace/listing related threads (marketplace context)
        return processedThreads.filter(t => 
          (t as any).context === 'marketplace' || (!!t.listingId && !t.projectId)
        ).sort((a, b) => 
          new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );

      case "projects":
        // Show all project interest related threads (project_interest context)
        return processedThreads.filter(t => 
          (t as any).context === 'project_interest' || !!t.projectId
        ).sort((a, b) => 
          new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );

      case "sellers":
        // Admin sees all threads with sellers
        // Sellers see threads where they are the seller
        // Buyers see threads where they are talking to a seller
        return processedThreads.filter(t => {
          if (isAdmin) return !!t.sellerId;
          // If current user is the seller, show their threads
          if (t.sellerId === currentUserId) return true;
          // If current user is a buyer talking to a seller, show the thread
          if (t.buyerId === currentUserId && !!t.sellerId) return true;
          return false;
        }).sort((a, b) => 
          new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );

      default:
        return processedThreads;
    }
  };

  const filteredUsers = () => {
    if (!allUsers) return [] as User[];
    if (usersSubTab === "sellers") return allUsers.filter(u => u.role === "seller");
    if (usersSubTab === "buyers") return allUsers.filter(u => u.role === "buyer");
    return allUsers.filter(u => u.role === "admin");
  };

  // Fetch users list (for admin)
  const { data: allUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/users");
      return res.json();
    },
    enabled: user?.role === "admin",
  });

  // Fetch selected user profile for details modal
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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Please log in to view messages</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">Messages</h1>
            <div className="ml-4 text-sm text-muted-foreground">{totalUnread} unread</div>
          </div>
          <p className="text-muted-foreground mt-2">Manage your conversations about projects and listings</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-16rem)]">
            {/* Sidebar - Threads List */}
            <div className="lg:col-span-4 space-y-4 overflow-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="flex w-full items-center gap-1" data-testid="tabs-messages">
                  <TabsTrigger value="inbox" data-testid="tab-inbox">Inbox</TabsTrigger>
                  <TabsTrigger value="projects" data-testid="tab-projects">Projects Interest</TabsTrigger>
                  {user?.role !== "buyer" && (
                    <TabsTrigger value="sellers" data-testid="tab-sellers">Sellers</TabsTrigger>
                  )}
                  {user?.role === "admin" && (<TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>)}
                </TabsList>

                {user?.role !== "buyer" && (
                  <TabsContent value="sellers" className="space-y-2">
                    {threadsLoading ? (
                      Array(3).fill(0).map((_, i) => (<Skeleton key={i} className="h-24 w-full rounded-lg" />))
                    ) : filteredThreads().length > 0 ? (
                      filteredThreads().map((thread: MessageThread & { unreadCount?: number }) => (
                        <Card key={thread.id} className={`cursor-pointer transition-all hover:shadow-md ${selectedThread?.id === thread.id ? "ring-2 ring-primary" : ""} ${(thread.unreadCount || 0) > 0 ? "bg-primary/5" : ""}`} onClick={() => setSelectedThread(thread)} data-testid={`thread-${thread.id}`}>
                          <CardHeader className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-sm truncate">{thread.title}</h3>
                                  {(thread.unreadCount || 0) > 0 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">{thread.unreadCount || 0}</span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{format(new Date(thread.lastMessageAt), "MMM d, yyyy HH:mm")}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {thread.projectId && (<Badge variant="secondary" className="ml-2">Project Interest</Badge>)}
                                {thread.listingId && (<Badge variant="outline" className="ml-2">Listing Inquiry</Badge>)}
                                {/* Show user type (either buyer/seller/admin) if available */}
                                <Badge variant={`${selectedThread?.id === thread.id ? "default" : "secondary"}`} className="ml-2">
                                  {thread.sellerId === user?.id ? "Buyer" : "Seller"}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))
                    ) : (
                      <Card className="text-center py-8">
                        <CardContent>
                          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No seller conversations yet</p>
                          <p className="text-sm text-muted-foreground mt-2">Conversations where you are the seller will appear here.</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                )}

                <TabsContent value="inbox" className="mt-4 space-y-2">
                  {threadsLoading ? (
                    Array(3).fill(0).map((_, i) => (<Skeleton key={i} className="h-24 w-full rounded-lg" />))
                  ) : filteredThreads().length > 0 ? (
                    filteredThreads().map((thread: any) => (
                      <Card key={thread.id} className={`cursor-pointer transition-all hover:shadow-md ${selectedThread?.id === thread.id ? "ring-2 ring-primary" : ""} ${(thread.unreadCount || 0) > 0 ? "bg-primary/5" : ""}`} onClick={() => setSelectedThread(thread)} data-testid={`thread-${thread.id}`}>
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-sm truncate">{thread.title}</h3>
                                {(thread.unreadCount || 0) > 0 && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">{thread.unreadCount || 0}</span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{format(new Date(thread.lastMessageAt), "MMM d, yyyy HH:mm")}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {thread.projectId && (<Badge variant="secondary" className="ml-2">Project</Badge>)}
                              {thread.listingId && (<Badge variant="outline" className="ml-2">Listing</Badge>)}
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-8"><CardContent><MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" /><p className="text-muted-foreground">No messages yet</p></CardContent></Card>
                  )}
                </TabsContent>

                <TabsContent value="projects" className="mt-4 space-y-2">
                  {threadsLoading ? (
                    Array(3).fill(0).map((_, i) => (<Skeleton key={i} className="h-24 w-full rounded-lg" />))
                  ) : processedThreads.filter((t: any) => t.projectId).length ? (
                    processedThreads.filter((t: any) => t.projectId).map((thread: any) => (
                      <Card key={thread.id} className={`cursor-pointer transition-all hover:shadow-md ${selectedThread?.id === thread.id ? "ring-2 ring-primary" : ""}`} onClick={() => setSelectedThread(thread)} data-testid={`thread-${thread.id}`}>
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate">{thread.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{format(new Date(thread.lastMessageAt), "MMM d, yyyy HH:mm")}</p>
                            </div>
                            <Badge variant="secondary" className="ml-2">Project</Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-8"><CardContent><Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-2" /><p className="text-muted-foreground">No project inquiries yet</p></CardContent></Card>
                  )}
                </TabsContent>

                {user?.role === "admin" && (
                  <TabsContent value="users">
                    <Tabs value={usersSubTab} onValueChange={setUsersSubTab} className="w-full">
                      <TabsList className="flex w-full items-center gap-1 mb-2">
                        <TabsTrigger value="sellers" data-testid="tab-sellers">Sellers</TabsTrigger>
                        <TabsTrigger value="buyers" data-testid="tab-buyers">Buyers</TabsTrigger>
                        <TabsTrigger value="admins" data-testid="tab-admins">Admins</TabsTrigger>
                      </TabsList>

                      <TabsContent value={usersSubTab} className="space-y-2">
                        {filteredUsers().map((usr) => (
                          <Card key={usr.id} className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50" data-testid={`user-${usr.id}`} onClick={() => handleViewUserDetails(usr)}>
                            <CardHeader className="py-3 px-4">
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0">
                                    {usr.role === "seller" && <Users className="h-4 w-4 text-blue-500" />}
                                    {usr.role === "buyer" && <UserCircle className="h-4 w-4 text-green-500" />}
                                    {usr.role === "admin" && <ShieldCheck className="h-4 w-4 text-purple-500" />}
                                  </div>
                                  <div className="min-w-0">
                                    <span className="font-medium text-sm truncate block">{usr.firstName} {usr.lastName}</span>
                                    {usr.email && (
                                      <p className="text-xs text-muted-foreground truncate">{usr.email}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="capitalize flex-shrink-0">{usr.role}</Badge>
                                  {user?.role !== 'buyer' && (
                                    <Eye className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                        {filteredUsers().length === 0 && (
                          <Card className="text-center py-12">
                            <CardContent>
                              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                              <p className="text-muted-foreground">No {usersSubTab} found</p>
                              <p className="text-sm text-muted-foreground/70 mt-1">Users with {usersSubTab} role will appear here</p>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                )}
              </Tabs>
            </div>

            {/* Main Panel - Thread Messages */}
            <div className="lg:col-span-8">
              {selectedThread ? (
                <Card className="h-full flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            {otherParticipant?.profile?.profileImageUrl || otherParticipant?.user?.profileImageUrl ? (
                              <AvatarImage src={otherParticipant?.profile?.profileImageUrl || otherParticipant?.user?.profileImageUrl} alt={otherParticipant?.user?.firstName || 'User'} />
                            ) : (
                              <AvatarFallback>{(otherParticipant?.user?.firstName || otherParticipant?.user?.email || 'U').charAt(0)}</AvatarFallback>
                            )}
                          </Avatar>

                          <div className="min-w-0">
                            <div className="flex items-center mb-4">
                              <CardTitle className="text-lg truncate flex-1">{selectedThread.title}</CardTitle>
                              <div className="flex justify-end ml-8">
                                {otherParticipant?.user && user?.role !== 'buyer' && (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => {
                                      setMessageDialogOpen(true);
                                      setSelectedRecipient({
                                        id: otherParticipant.user.id,
                                        name: `${otherParticipant.user.firstName || ''} ${otherParticipant.user.lastName || ''}`.trim(),
                                        subject: selectedThread?.title,
                                        context: selectedThread?.listingId ? 'Listing Inquiry' : 'Project Interest'
                                      });
                                    }}
                                  >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Contact Seller
                                  </Button>
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 truncate">{selectedThread.status === "open" ? "Active conversation" : "Closed"}</p>

                            {/* Quick sender details (email / phone / company / location / role) */}
                            {otherParticipant && otherParticipant.user && (
                              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                {otherParticipant.user.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 flex-shrink-0" />
                                    <a className="truncate hover:underline" href={`mailto:${otherParticipant.user.email}`}>{otherParticipant.user.email}</a>
                                  </div>
                                )}

                                {otherParticipant.profile?.phoneNumber && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                    <span>{otherParticipant.profile.phoneNumber}</span>
                                  </div>
                                )}

                                {otherParticipant.profile?.companyName && (
                                  <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{otherParticipant.profile.companyName}</span>
                                  </div>
                                )}

                                {otherParticipant.profile?.location && (
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 flex-shrink-0" />
                                    <span>{otherParticipant.profile.location}</span>
                                  </div>
                                )}

                                {otherParticipant.user?.role && (
                                  <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                                      {otherParticipant.user.role}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                      <div className="flex items-center gap-2">
                        {/* Action buttons: mailto, copy email, view profile */}
                        {otherParticipant?.user?.email && (
                          <a href={`mailto:${otherParticipant.user.email}`}>
                            <Button size="icon" variant="ghost" aria-label="Email">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </a>
                        )}

                        {otherParticipant?.user?.email && (
                          <Button size="icon" variant="ghost" onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(otherParticipant.user.email);
                              toast({ title: 'Copied', description: 'Email copied to clipboard' });
                            } catch (err) {
                              toast({ title: 'Error', description: 'Failed to copy email', variant: 'destructive' });
                            }
                          }} aria-label="Copy email">
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}

                        {otherParticipant?.user?.id && (
                          <Button size="icon" variant="ghost" onClick={() => window.open(`/profile/${otherParticipant.user.id}`, '_blank')} aria-label="View profile">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}

                        <Button variant="ghost" size="sm" onClick={() => setSelectedThread(null)} data-testid="button-close-thread"><X className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-auto p-6 space-y-4">
                    {messagesLoading ? (
                      Array(3).fill(0).map((_, i) => (<Skeleton key={i} className="h-20 w-full" />))
                    ) : threadMessages && threadMessages.length > 0 ? (
                      threadMessages.map((msg: Message) => {
                        const isFromMe = msg.senderId === user?.id;
                        return (
                          <div key={msg.id} className={`flex ${isFromMe ? "justify-end" : "justify-start"}`} data-testid={`message-${msg.id}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${isFromMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              <p className={`text-xs mt-2 ${isFromMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{format(new Date(msg.createdAt), "MMM d, HH:mm")}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No messages in this thread</p>
                      </div>
                    )}
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea placeholder="Type your message..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }} className="flex-1 resize-none" rows={3} data-testid="input-message" />
                      <Button onClick={handleSendMessage} disabled={!messageContent.trim() || sendMessageMutation.isPending} data-testid="button-send-message"><Send className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center"><CardContent className="text-center py-12"><MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" /><h3 className="text-lg font-semibold mb-2">No thread selected</h3><p className="text-muted-foreground">Select a conversation from the list to view messages</p></CardContent></Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Message Dialog */}
      {selectedRecipient && (
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={(open) => {
            setMessageDialogOpen(open);
            if (!open) setSelectedRecipient(null);
          }}
          recipientId={selectedRecipient.id}
          recipientName={selectedRecipient.name}
          defaultSubject={selectedRecipient.subject}
          listingTitle={selectedRecipient.context}
        />
      )}

      {/* User Details Dialog */}
      <Dialog open={userDetailsDialogOpen} onOpenChange={setUserDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View detailed information about this user
            </DialogDescription>
          </DialogHeader>
          
          {selectedUserDetails && (
            <div className="space-y-6">
              {/* User Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {selectedUserDetails.profileImageUrl ? (
                    <AvatarImage src={selectedUserDetails.profileImageUrl} alt={selectedUserDetails.firstName || 'User'} />
                  ) : (
                    <AvatarFallback className="text-2xl">{(selectedUserDetails.firstName || selectedUserDetails.email || 'U').charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUserDetails.firstName} {selectedUserDetails.lastName}</h3>
                  <Badge variant="outline" className="capitalize mt-1">{selectedUserDetails.role}</Badge>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedUserDetails.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <a href={`mailto:${selectedUserDetails.email}`} className="text-sm hover:underline truncate">{selectedUserDetails.email}</a>
                    </div>
                  )}
                  {selectedUserProfile?.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{selectedUserProfile.phoneNumber}</span>
                    </div>
                  )}
                  {selectedUserProfile?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{selectedUserProfile.location}</span>
                    </div>
                  )}
                  {selectedUserProfile?.companyName && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{selectedUserProfile.companyName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Information */}
              {selectedUserProfile && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Profile Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Profile Type:</span>
                      <p className="font-medium capitalize">{selectedUserProfile.profileType || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Verified:</span>
                      <p className="font-medium">{selectedUserProfile.verified ? 'Yes' : 'No'}</p>
                    </div>
                    {selectedUserProfile.interests && selectedUserProfile.interests.length > 0 && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Interests:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedUserProfile.interests.map((interest: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{interest}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedUserProfile.bio && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Bio:</span>
                        <p className="mt-1 text-sm">{selectedUserProfile.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1" onClick={() => {
                  setMessageDialogOpen(true);
                  setSelectedRecipient({
                    id: selectedUserDetails.id,
                    name: `${selectedUserDetails.firstName || ''} ${selectedUserDetails.lastName || ''}`.trim(),
                  });
                  setUserDetailsDialogOpen(false);
                }} data-testid="button-message-user">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                {selectedUserDetails.email && (
                  <Button variant="outline" onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(selectedUserDetails.email!);
                      toast({ title: 'Copied', description: 'Email copied to clipboard' });
                    } catch (err) {
                      toast({ title: 'Error', description: 'Failed to copy email', variant: 'destructive' });
                    }
                  }} data-testid="button-copy-email">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Email
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
