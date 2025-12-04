// Message dialog for contacting sellers and buyers
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { Send } from "lucide-react";
import Spinner from "@/components/Spinner";
import { generateIdempotencyKey } from "@/lib/queryClient";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientId: string;
  recipientName?: string;
  recipientEmail?: string;
  defaultSubject?: string;
  listingTitle?: string;
  listingId?: string;
}

export function MessageDialog({
  open,
  onOpenChange,
  recipientId,
  recipientName: _recipientName,
  recipientEmail: _recipientEmail,
  defaultSubject,
  listingTitle,
  listingId,
}: MessageDialogProps) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [subject, setSubject] = useState(defaultSubject || "");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (open) {
      setSubject(defaultSubject || "");
      setContent("");
    }
  }, [open, defaultSubject]);

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      // If listingId is provided, create or reuse a thread for that listing
      if (listingId) {
        // Create thread tied to listing (server will set seller/buyer appropriately)
        const threadResp = await apiRequest("POST", "/api/threads", { listingId, title: subject || `Inquiry about: ${listingTitle || ''}` });
        const thread = await threadResp.json();

        // Post the message to the thread (server infers receiver)
        const postResp = await apiRequest("POST", `/api/threads/${thread.id}/messages`, { subject: subject || thread.title, content });
        return postResp.json();
      }

      // Fallback: send regular direct message
      const messageContent = listingTitle
        ? `Inquiry about listing: ${listingTitle}\n\nMessage:\n${content}`
        : content;

      const idKey = generateIdempotencyKey();
      const messagePayload: any = {
        receiverId: recipientId,
        subject: subject || `Re: ${listingTitle || "Marketplace Inquiry"}`,
        content: messageContent,
      };

      // Include relatedListingId for authorization context if available
      if (listingId) {
        messagePayload.relatedListingId = listingId;
      }

      return await apiRequest(
        "POST",
        "/api/messages",
        messagePayload,
        { "Idempotency-Key": idKey }
      );
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully!",
      });
      setSubject("");
      setContent("");
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });
  const sendingRef = useRef(false);

  const handleSend = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to send messages",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    if (sendingRef.current || sendMessageMutation.isPending) return;
    sendingRef.current = true;
    try {
      await sendMessageMutation.mutateAsync();
    } catch (err) {
      // mutation displays toast on error
    } finally {
      sendingRef.current = false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
          <DialogDescription>Send Message</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={sendMessageMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={sendMessageMutation.isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={sendMessageMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={sendMessageMutation.isPending}
          >
            {sendMessageMutation.isPending ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
