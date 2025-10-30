import { useState } from "react";
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
import { MessageSquare, Send, X, Users, Briefcase, UserCircle, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import type { MessageThread, Message, User } from "@shared/schema";

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [activeTab, setActiveTab] = useState("inbox");
  const [usersSubTab, setUsersSubTab] = useState("sellers");

  // Fetch threads
  const { data: threads, isLoading: threadsLoading, refetch: refetchThreads } = useQuery<MessageThread[]>({
    queryKey: ["/api/threads"],
    enabled: isAuthenticated,
  });

  // Fetch messages for selected thread
  const { data: threadMessages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/threads", selectedThread?.id || "", "messages"],
    enabled: !!selectedThread,
  });

  // Fetch users list (for admin)
  const { data: allUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: user?.role === "admin",
  });

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

  // Filter threads based on active tab
  const filteredThreads = () => {
    if (!threads) return [];
    
    if (activeTab === "inbox") {
      return threads;
    } else if (activeTab === "projects") {
      return threads.filter((t) => t.projectId);
    }
    return [];
  };

  // Filter users by role for Users tab
  const filteredUsers = () => {
    if (!allUsers) return [];
    
    if (usersSubTab === "sellers") {
      return allUsers.filter((u) => u.role === "seller");
    } else if (usersSubTab === "buyers") {
      return allUsers.filter((u) => u.role === "buyer");
    } else if (usersSubTab === "admins") {
      return allUsers.filter((u) => u.role === "admin");
    }
    return [];
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
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Messages
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Manage your conversations about projects and listings
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-16rem)]">
            {/* Sidebar - Threads List */}
            <div className="lg:col-span-4 space-y-4 overflow-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3" data-testid="tabs-messages">
                  <TabsTrigger value="inbox" data-testid="tab-inbox">
                    Inbox
                  </TabsTrigger>
                  <TabsTrigger value="projects" data-testid="tab-projects">
                    Projects Interest
                  </TabsTrigger>
                  {user?.role === "admin" && (
                    <TabsTrigger value="users" data-testid="tab-users">
                      Users
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="inbox" className="mt-4 space-y-2">
                  {threadsLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))
                  ) : filteredThreads().length > 0 ? (
                    filteredThreads().map((thread) => (
                      <Card
                        key={thread.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedThread?.id === thread.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedThread(thread)}
                        data-testid={`thread-${thread.id}`}
                      >
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate">{thread.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(new Date(thread.lastMessageAt), "MMM d, yyyy HH:mm")}
                              </p>
                            </div>
                            {thread.projectId && (
                              <Badge variant="secondary" className="ml-2">
                                Project
                              </Badge>
                            )}
                            {thread.listingId && (
                              <Badge variant="outline" className="ml-2">
                                Listing
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-8">
                      <CardContent>
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No messages yet</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="projects" className="mt-4 space-y-2">
                  {threadsLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))
                  ) : threads?.filter((t) => t.projectId).length ? (
                    threads.filter((t) => t.projectId).map((thread) => (
                      <Card
                        key={thread.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedThread?.id === thread.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedThread(thread)}
                        data-testid={`thread-${thread.id}`}
                      >
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate">{thread.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(new Date(thread.lastMessageAt), "MMM d, yyyy HH:mm")}
                              </p>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              Project
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-8">
                      <CardContent>
                        <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No project inquiries yet</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {user?.role === "admin" && (
                  <TabsContent value="users" className="mt-4 space-y-4">
                    <Tabs value={usersSubTab} onValueChange={setUsersSubTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="sellers" data-testid="tab-sellers">
                          Sellers
                        </TabsTrigger>
                        <TabsTrigger value="buyers" data-testid="tab-buyers">
                          Buyers
                        </TabsTrigger>
                        <TabsTrigger value="admins" data-testid="tab-admins">
                          Admins
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value={usersSubTab} className="mt-4 space-y-2">
                        {filteredUsers().map((usr) => (
                          <Card key={usr.id} className="hover:shadow-md transition-all" data-testid={`user-${usr.id}`}>
                            <CardHeader className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {usr.role === "seller" && <Users className="h-4 w-4 text-blue-500" />}
                                  {usr.role === "buyer" && <UserCircle className="h-4 w-4 text-green-500" />}
                                  {usr.role === "admin" && <ShieldCheck className="h-4 w-4 text-purple-500" />}
                                  <span className="font-medium text-sm">
                                    {usr.firstName} {usr.lastName}
                                  </span>
                                </div>
                                <Badge variant="outline">{usr.role}</Badge>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                        {filteredUsers().length === 0 && (
                          <Card className="text-center py-8">
                            <CardContent>
                              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">No {usersSubTab} found</p>
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
                        <CardTitle className="text-lg">{selectedThread.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedThread.status === "open" ? "Active conversation" : "Closed"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedThread(null)}
                        data-testid="button-close-thread"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-auto p-6 space-y-4">
                    {messagesLoading ? (
                      Array(3).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))
                    ) : threadMessages && threadMessages.length > 0 ? (
                      threadMessages.map((msg: Message) => {
                        const isFromMe = msg.senderId === user?.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}
                            data-testid={`message-${msg.id}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-4 ${
                                isFromMe
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              <p className={`text-xs mt-2 ${isFromMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {format(new Date(msg.createdAt), "MMM d, HH:mm")}
                              </p>
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
                      <Textarea
                        placeholder="Type your message..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1 resize-none"
                        rows={3}
                        data-testid="input-message"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageContent.trim() || sendMessageMutation.isPending}
                        data-testid="button-send-message"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No thread selected</h3>
                    <p className="text-muted-foreground">
                      Select a conversation from the list to view messages
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
