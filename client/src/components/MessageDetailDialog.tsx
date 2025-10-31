import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, generateIdempotencyKey } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Building2, User, Reply } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";

interface MessageDetailDialogProps {
  messageId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageDetailDialog({ messageId, open, onOpenChange }: MessageDetailDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [replyContent, setReplyContent] = useState("");
  const sendingRef = useRef(false);

  const { data: messageDetails, isLoading } = useQuery({
    queryKey: ['/api/messages', messageId, 'details'],
    queryFn: async () => {
      if (!messageId) return null;
      const response = await fetch(`/api/messages/${messageId}/details`, {
        credentials: 'include',
      });
      if (!response.ok) {
        const error = new Error('Failed to fetch message details');
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return response.json();
    },
    enabled: !!messageId && open
  });

  // If this message is related to a listing, fetch that listing so we can show the
  // actual listing seller (even when an admin posted on behalf of the seller).
  const listingId = messageDetails?.message?.relatedListingId;
  const { data: listingData } = useQuery({
    queryKey: ['/api/marketplace/listings', listingId],
    queryFn: async () => {
      if (!listingId) return null;
      const resp = await fetch(`/api/marketplace/listings/${listingId}`, { credentials: 'include' });
      if (!resp.ok) throw new Error('Failed to fetch listing');
      return resp.json();
    },
    enabled: !!listingId,
  });

  const replyMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!messageDetails?.sender?.id) return;
      const idKey = generateIdempotencyKey();
      return await apiRequest(
        "POST",
        "/api/messages",
        {
          receiverId: messageDetails.sender.id,
          subject: `Re: ${messageDetails.message.subject || 'Your message'}`,
          content,
          relatedProjectId: messageDetails.message.relatedProjectId,
          relatedListingId: messageDetails.message.relatedListingId,
        },
        { "Idempotency-Key": idKey }
      );
    },
    onSuccess: () => {
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully",
      });
      setReplyContent("");
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      // Refresh the message details to show the new reply
      queryClient.invalidateQueries({ queryKey: ['/api/messages', messageId, 'details'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    },
  });

  const closeMutation = useMutation({
    mutationFn: async () => {
      if (!messageId) return;
      return await apiRequest('PATCH', `/api/messages/${messageId}/close`);
    },
    onSuccess: () => {
      toast({ title: 'Conversation closed', description: 'This conversation has been closed.' });
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/messages', messageId, 'details'] });
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to close conversation', variant: 'destructive' });
    },
  });

  const handleReply = async () => {
    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive",
      });
      return;
    }

    if (sendingRef.current || replyMutation.isPending) return;
    sendingRef.current = true;
    try {
      await replyMutation.mutateAsync(replyContent);
    } catch (err) {
      // mutation already shows toast on error
    } finally {
      sendingRef.current = false;
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading message details...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!messageDetails) {
    return null;
  }

  const { message, sender, senderProfile } = messageDetails;
  // Prefer the listing's seller name when available (admin may post on behalf of seller)
  const sellerDisplayName = listingData?.sellerName;
  const sortedConversation = (messageDetails.conversation || []).slice().sort((a: any, b: any) => {
    return new Date(a.message.createdAt).getTime() - new Date(b.message.createdAt).getTime();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">
                  {sellerDisplayName ? sellerDisplayName : `${sender?.firstName || ''} ${sender?.lastName || ''}`.trim() || sender?.email || 'User'}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {message.subject || 'No subject'}
                </p>

                {/* Sender quick details shown in the header */}
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  {sender?.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span className="truncate max-w-[220px]">{sender.email}</span>
                    </div>
                  )}

                  {senderProfile?.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{senderProfile.phoneNumber}</span>
                    </div>
                  )}

                  {senderProfile?.companyName && (
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span className="truncate max-w-[160px]">{senderProfile.companyName}</span>
                    </div>
                  )}

                  {senderProfile?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{senderProfile.location}</span>
                    </div>
                  )}

                  {sender?.role && (
                    <div className="ml-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                        {sender.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Conversation Chain */}
          <div className="space-y-3 px-4">
            {sortedConversation?.map((msg: any) => {
              const currentUserId = user?.id || (user as any)?.claims?.sub;
              const isSentByMe = msg.message.senderId === currentUserId;

              // Normalize display content: if messages were auto-wrapped with an "Inquiry about...\n\nMessage:\n" prefix,
              // strip that header so the bubble only shows the actual message body. Keep the subject in the header.
              const raw = msg.message.content || '';
              const inquiryMatch = raw.match(/Message:\s*([\s\S]*)$/i);
              const displayContent = inquiryMatch ? inquiryMatch[1].trim() : raw;

              return (
                <div
                  key={msg.message.id}
                  className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} gap-3 items-end`}
                >
                  {!isSentByMe && (
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {msg.sender?.firstName || msg.sender?.email || msg.sender?.id}
                      </p>
                    </div>
                  )}

                  <div className={`max-w-[70%] space-y-1 ${isSentByMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-xl p-3 ${
                        isSentByMe 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{displayContent}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-1">
                      {format(new Date(msg.message.createdAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator />

          {/* Sender Information - only visible to admins */}
          {user?.role === 'admin' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Sender Information
              </h3>

              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">
                      {sender?.firstName} {sender?.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{sender?.email || 'N/A'}</p>
                  </div>
                </div>

                {senderProfile?.companyName && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-muted-foreground">Company</Label>
                      <p className="font-medium">{senderProfile.companyName}</p>
                    </div>
                  </div>
                )}

                {senderProfile?.phoneNumber && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-muted-foreground">Phone</Label>
                      <p className="font-medium">{senderProfile.phoneNumber}</p>
                    </div>
                  </div>
                )}

                {senderProfile?.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <Label className="text-muted-foreground">Location</Label>
                      <p className="font-medium">{senderProfile.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${
                      sender?.role === 'admin' ? 'bg-purple-500' :
                      sender?.role === 'seller' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Role</Label>
                    <p className="font-medium capitalize">{sender?.role || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>

          {/* Reply Input Section */}
        <div className="border-t p-4 mt-auto">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[60px] flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (replyContent.trim()) {
                    handleReply();
                  }
                }
              }}
              data-testid="input-reply-content"
            />
            <div className="flex items-center gap-2">
              <Button
                variant={message?.closed ? 'outline' : 'destructive'}
                onClick={() => closeMutation.mutate()}
                disabled={closeMutation.isPending || message?.closed}
                data-testid="button-deal-closed"
              >
                {closeMutation.isPending ? 'Closing...' : (message?.closed ? 'Closed' : 'Deal Closed')}
              </Button>

              <Button
                size="icon"
                onClick={handleReply}
                disabled={replyMutation.isPending || !replyContent.trim()}
                className="h-[60px] px-6"
                data-testid="button-send-reply"
              >
                {replyMutation.isPending ? (
                  <span className="h-4 w-4 animate-spin" />
                ) : (
                  <Reply className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
