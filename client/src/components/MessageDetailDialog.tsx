import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Building2, User, Reply } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MessageDetailDialogProps {
  messageId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageDetailDialog({ messageId, open, onOpenChange }: MessageDetailDialogProps) {
  const { toast } = useToast();
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const { data: messageDetails, isLoading } = useQuery({
    queryKey: ['/api/messages', messageId, 'details'],
    queryFn: async () => {
      if (!messageId) return null;
      const response = await fetch(`/api/messages/${messageId}/details`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch message details');
      return response.json();
    },
    enabled: !!messageId && open,
  });

  const replyMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!messageDetails?.sender?.id) return;
      return await apiRequest("POST", "/api/messages", {
        receiverId: messageDetails.sender.id,
        subject: `Re: ${messageDetails.message.subject || 'Your message'}`,
        content,
        relatedProjectId: messageDetails.message.relatedProjectId,
        relatedListingId: messageDetails.message.relatedListingId,
      });
    },
    onSuccess: () => {
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully",
      });
      setReplyContent("");
      setShowReplyForm(false);
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    },
  });

  const handleReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive",
      });
      return;
    }
    replyMutation.mutate(replyContent);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Message Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Message Content */}
          <div className="space-y-3">
            <div>
              <Label className="text-muted-foreground">Subject</Label>
              <p className="text-lg font-semibold">{message.subject || 'No subject'}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Message</Label>
              <div className="bg-muted/50 p-4 rounded-md mt-2">
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Sent on {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>

          <Separator />

          {/* Sender Information */}
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

          <Separator />

          {/* Reply Section */}
          {!showReplyForm ? (
            <Button
              onClick={() => setShowReplyForm(true)}
              className="w-full"
              data-testid="button-show-reply"
            >
              <Reply className="h-4 w-4 mr-2" />
              Reply to Message
            </Button>
          ) : (
            <div className="space-y-3">
              <Label htmlFor="reply-content">Your Reply</Label>
              <Textarea
                id="reply-content"
                placeholder="Type your reply here..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                data-testid="input-reply-content"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleReply}
                  disabled={replyMutation.isPending}
                  data-testid="button-send-reply"
                >
                  {replyMutation.isPending ? "Sending..." : "Send Reply"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyContent("");
                  }}
                  data-testid="button-cancel-reply"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
