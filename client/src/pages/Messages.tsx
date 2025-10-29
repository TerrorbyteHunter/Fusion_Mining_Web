import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Message } from "@shared/schema";
import { MessageSquare, Mail, MailOpen, Reply } from "lucide-react";
import { format } from "date-fns";
import { MessageDetailDialog } from "@/components/MessageDetailDialog";
import { MessageDialog } from "@/components/MessageDialog";

export default function Messages() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [messageDetailOpen, setMessageDetailOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: string;
    name?: string;
    subject?: string;
    context?: string;
  } | null>(null);

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    enabled: isAuthenticated,
  });

  // Admin-only: list of users for Buyers tab
  const { data: usersList } = useQuery<any[]>({
    queryKey: ['/api/admin/users'],
    queryFn: async () => {
      const res = await fetch('/api/admin/users', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
    enabled: !!user && user.role === 'admin',
  });

  const [activeTab, setActiveTab] = useState<'inbox'|'outbox'|'buyers'>('inbox');
  const [selectedBuyer, setSelectedBuyer] = useState<any | null>(null);
  const { data: selectedBuyerListings, refetch: refetchBuyerListings } = useQuery({
    queryKey: selectedBuyer ? ['/api/admin/users', selectedBuyer.id, 'listings'] : null,
    queryFn: async () => {
      if (!selectedBuyer) return [];
      const res = await fetch(`/api/admin/users/${selectedBuyer.id}/listings`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch buyer listings');
      return res.json();
    },
    enabled: !!selectedBuyer && !!user && user.role === 'admin',
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
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const receivedMessages = messages?.filter(m => m.receiverId === user?.id) || [];
  const sentMessages = messages?.filter(m => m.senderId === user?.id) || [];

  // Group messages into threads by deal/project and participant
  const groupMessages = (msgs: any[], isSent: boolean) => {
    const map: Record<string, any> = {};
    for (const msg of msgs) {
      // Group by listing/project and participant
      const participantId = isSent ? msg.receiverId : msg.senderId;
      // Include both listing and project in key if they exist
      const dealKey = msg.relatedListingId 
        ? `listing:${msg.relatedListingId}`
        : msg.relatedProjectId 
          ? `project:${msg.relatedProjectId}`
          : 'general';
      const key = `${dealKey}::${participantId}`;
      const existing = map[key];

      const participantName = isSent 
        ? msg.receiverName || msg.receiverId
        : msg.senderName || msg.senderId;

      const threadTitle = msg.relatedListingId
        ? `Listing: ${msg.listing?.title || msg.subject || 'Untitled Listing'}`
        : msg.relatedProjectId
          ? `Project: ${msg.project?.title || msg.subject || 'Untitled Project'}`
          : msg.subject || 'General Inquiry';

      if (!existing) {
        map[key] = {
          id: key,
          subject: threadTitle,
          participantId,
          participantName,
          relatedListingId: msg.relatedListingId,
          relatedProjectId: msg.relatedProjectId,
          dealType: msg.relatedListingId ? 'listing' : msg.relatedProjectId ? 'project' : 'general',
          lastMessage: msg,
          firstMessage: msg,
          unreadCount: !isSent && !msg.read ? 1 : 0,
          count: 1,
        };
      } else {
        if (!isSent && !msg.read) existing.unreadCount += 1;
        if (msg.createdAt > existing.lastMessage.createdAt) {
          existing.lastMessage = msg;
        }
        if (msg.createdAt < existing.firstMessage.createdAt) {
          existing.firstMessage = msg;
        }
        existing.count += 1;
      }
    }
    return Object.values(map).sort((a: any, b: any) => 
      b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt)
    );
  };

  const sentThreads = (() => {
    return groupMessages(sentMessages, true);
  })();

  const receivedThreads = (() => {
    return groupMessages(receivedMessages, false);
  })();

  return (
    <div className="flex flex-col">
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Messages
            </h1>
          </div>
          <p className="text-muted-foreground">
            View and manage your conversations
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button className={`px-4 py-2 rounded ${activeTab === 'inbox' ? 'bg-primary text-white' : 'bg-muted/20'}`} onClick={() => setActiveTab('inbox')}>Inbox</button>
            <button className={`px-4 py-2 rounded ${activeTab === 'outbox' ? 'bg-primary text-white' : 'bg-muted/20'}`} onClick={() => setActiveTab('outbox')}>Outbox</button>
            {user?.role === 'admin' && (
              <button className={`px-4 py-2 rounded ${activeTab === 'buyers' ? 'bg-primary text-white' : 'bg-muted/20'}`} onClick={() => setActiveTab('buyers')}>Buyers</button>
            )}
          </div>
          
          <div className="space-y-8">
            {activeTab === 'inbox' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Received Messages</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-1/2" />
                          <Skeleton className="h-4 w-full" />
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : receivedThreads.length > 0 ? (
                <div className="space-y-4">
                  {receivedThreads.map((thread) => (
                    <Card key={thread.id} data-testid={`card-thread-${thread.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                                                          <CardTitle className="flex items-center gap-2">
                              {thread.unreadCount > 0 ? (
                                <Mail className="h-4 w-4 text-primary" />
                              ) : (
                                <MailOpen className="h-4 w-4 text-muted-foreground" />
                              )}
                              {thread.subject}
                            </CardTitle>
                            <CardDescription className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span>From: {thread.participantName || "Unknown"}</span>
                                {thread.dealType === 'listing' && (
                                  <Badge variant="secondary">Listing Inquiry</Badge>
                                )}
                                {thread.dealType === 'project' && (
                                  <Badge variant="secondary">Project Discussion</Badge>
                                )}
                              </div>
                              <div className="flex flex-col text-xs text-muted-foreground">
                                <span>Started: {format(new Date(thread.firstMessage.createdAt), "MMM d, yyyy")}</span>
                                <span>Last activity: {format(new Date(thread.lastMessage.createdAt), "MMM d, yyyy HH:mm")}</span>
                              </div>
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {thread.unreadCount > 0 && (
                              <Badge>{thread.unreadCount} New</Badge>
                            )}
                            {thread.count > 1 && (
                              <span className="text-xs text-muted-foreground">{thread.count} messages</span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm">{thread.lastMessage.content}</p>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMessageId(thread.lastMessage.id);
                                setMessageDetailOpen(true);
                              }}
                              data-testid={`button-view-thread-${thread.id}`}
                            >
                              View Details
                            </Button>
                            {(thread.lastMessage.relatedListingId || thread.lastMessage.relatedProjectId) && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  try {
                                    // Prefer listing (mineral) seller
                                    if (thread.lastMessage.relatedListingId) {
                                      let sellerId = thread.lastMessage.listing?.sellerId;
                                      let sellerName = thread.lastMessage.listing?.sellerName;
                                      if (!sellerId) {
                                        const res = await fetch(`/api/marketplace/listings/${thread.lastMessage.relatedListingId}`, { credentials: 'include' });
                                        if (res.ok) {
                                          const listing = await res.json();
                                          sellerId = listing.sellerId;
                                          sellerName = listing.sellerName || undefined;
                                        }
                                      }

                                      if (!sellerId) {
                                        toast({ title: 'Seller not found', description: 'Unable to locate the seller for this listing', variant: 'destructive' });
                                        return;
                                      }

                                      setSelectedRecipient({
                                        id: sellerId,
                                        name: sellerName,
                                        subject: `Inquiry about: ${thread.lastMessage.listing?.title || thread.lastMessage.subject || 'Listing'}`,
                                      });
                                      setMessageDialogOpen(true);
                                      return;
                                    }

                                    // If it's a project-related message, try to fetch project details
                                    if (thread.lastMessage.relatedProjectId) {
                                      const res = await fetch(`/api/projects/${thread.lastMessage.relatedProjectId}`, { credentials: 'include' });
                                      if (!res.ok) {
                                        toast({ title: 'Project not found', description: 'Unable to locate the project for this message', variant: 'destructive' });
                                        return;
                                      }
                                      await res.json();
                                      // Projects don't have a seller by default; fallback to replying to the original sender
                                      toast({ title: 'Project message', description: 'No direct seller for projects — replying to the sender instead.' });
                                      setSelectedRecipient({
                                        id: thread.lastMessage.senderId,
                                        subject: `Re: ${thread.lastMessage.subject || 'Project Inquiry'}`,
                                      });
                                      setMessageDialogOpen(true);
                                    }
                                  } catch (err) {
                                    toast({ title: 'Error', description: 'Failed to contact seller', variant: 'destructive' });
                                  }
                                }}
                                data-testid={`button-contact-seller-${thread.id}`}
                              >
                                Contact Seller
                              </Button>
                            )}
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRecipient({
                                  id: thread.participantId,
                                  name: thread.participantName,
                                  subject: `Re: ${thread.lastMessage.subject || 'Your message'}`,
                                });
                                setMessageDialogOpen(true);
                              }}
                              data-testid={`button-reply-thread-${thread.id}`}
                            >
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
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
                    <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Messages</h3>
                    <p className="text-muted-foreground">
                      You haven't received any messages yet
                    </p>
                  </CardContent>
                </Card>
                )}
              </div>
            )}

            {activeTab === 'outbox' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Sent Messages</h2>
                {isLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : sentThreads.length > 0 ? (
                  <div className="space-y-4">
                    {sentThreads.map((thread: any) => (
                      <Card key={thread.id} data-testid={`card-sent-thread-${thread.id}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{thread.subject}</CardTitle>
                              <CardDescription className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span>To: {thread.participantName || thread.participantId}</span>
                                  {thread.dealType === 'listing' && (
                                    <Badge variant="secondary">Listing Inquiry</Badge>
                                  )}
                                  {thread.dealType === 'project' && (
                                    <Badge variant="secondary">Project Discussion</Badge>
                                  )}
                                </div>
                                <div className="flex flex-col text-xs text-muted-foreground">
                                  <span>Started: {format(new Date(thread.firstMessage.createdAt), "MMM d, yyyy")}</span>
                                  <span>Last activity: {format(new Date(thread.lastMessage.createdAt), "MMM d, yyyy HH:mm")}</span>
                                </div>
                              </CardDescription>
                            </div>
                            {thread.count > 1 && (
                              <span className="text-xs text-muted-foreground">{thread.count} messages</span>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm">{thread.lastMessage.content}</p>
                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMessageId(thread.lastMessage.id);
                                  setMessageDetailOpen(true);
                                }}
                                data-testid={`button-view-sent-thread-${thread.id}`}
                              >
                                View Details
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
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No Sent Messages</h3>
                      <p className="text-muted-foreground">
                        You haven't sent any messages yet
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'buyers' && user?.role === 'admin' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold">Buyers</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {usersList?.map((u: any) => (
                      <Card key={u.id}>
                        <CardHeader>
                          <CardTitle>{u.firstName} {u.lastName} {u.role ? `(${u.role})` : ''}</CardTitle>
                          <CardDescription>{u.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-muted-foreground">Projects / Listings:</p>
                              <div className="mt-2">
                                {/* If this user is selected, show their listings */}
                                {selectedBuyer?.id === u.id ? (
                                  <div className="space-y-2">
                                    {selectedBuyerListings?.length ? (
                                      selectedBuyerListings.map((l: any) => (
                                        <div key={l.id} className="p-2 border rounded">
                                          <div className="font-medium">{l.title}</div>
                                          <div className="text-sm text-muted-foreground">{l.location} • {l.quantity}</div>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-sm text-muted-foreground">No listings</div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground">Select to view</div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                  setSelectedBuyer(selectedBuyer?.id === u.id ? null : u);
                                  if (selectedBuyer?.id !== u.id) {
                                    setTimeout(() => refetchBuyerListings && refetchBuyerListings(), 10);
                                  }
                                }}
                              >
                                {selectedBuyer?.id === u.id ? 'Hide' : 'View'}
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  // Start chat with this user
                                  setSelectedRecipient({ id: u.id, name: `${u.firstName || ''} ${u.lastName || ''}`.trim(), subject: `Hello ${u.firstName || ''}` });
                                  setMessageDialogOpen(true);
                                }}
                              >
                                Start Chat
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Message Detail Dialog */}
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

      {/* Reply Dialog */}
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
        />
      )}
    </div>
  );
}
