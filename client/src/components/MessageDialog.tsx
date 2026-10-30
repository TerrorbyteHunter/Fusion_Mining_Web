// Message dialog for contacting sellers and buyers
import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import type { MessageThread } from "@shared/schema";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientId: string;
  recipientName?: string;
  recipientEmail?: string;
  defaultSubject?: string;
  listingTitle?: string;
  listingId?: string;
  projectId?: string;
  projectTitle?: string;
  supportThread?: boolean;
  contactSubmissionId?: string;
  contactContext?: string;
  onSent?: (thread: MessageThread) => void;
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
  projectId,
  projectTitle,
  supportThread = false,
  contactSubmissionId,
  contactContext,
  onSent,
}: MessageDialogProps) {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
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
      if (supportThread) {
        const endpoint = contactSubmissionId
          ? `/api/contact/submissions/${contactSubmissionId}/start-thread`
          : "/api/admin/support/threads";
        const response = await apiRequest("POST", endpoint, {
          recipientId,
          title: subject.trim(),
          content,
        });
        return { kind: "support" as const, thread: await response.json() as MessageThread };
      }

      // If listingId is provided, create or reuse a thread for that listing
      if (listingId) {
        if (user?.role === "admin") {
          const threadResponse = await apiRequest("POST", "/api/messages/contact-seller", {
            listingId,
            sellerId: recipientId,
          });
          const { thread } = await threadResponse.json() as { thread: MessageThread };
          await apiRequest("POST", `/api/threads/${thread.id}/messages`, {
            subject: subject || thread.title,
            content,
          });
          return { kind: "sent" as const };
        }

        // Create thread tied to listing (server will set seller/buyer appropriately)
        const threadResp = await apiRequest("POST", "/api/threads", { listingId, title: subject || `Inquiry about: ${listingTitle || ''}` });
        const thread = await threadResp.json();

        // Post the message to the thread (server infers receiver)
        await apiRequest("POST", `/api/threads/${thread.id}/messages`, { subject: subject || thread.title, content });
        return { kind: "sent" as const };
      }

      // If projectId is provided, create or reuse a thread for that project
      if (projectId) {
        if (user?.role === "admin") {
          const threadResponse = await apiRequest("POST", "/api/messages/contact-seller", {
            projectId,
            sellerId: recipientId,
          });
          const { thread } = await threadResponse.json() as { thread: MessageThread };
          await apiRequest("POST", `/api/threads/${thread.id}/messages`, {
            subject: subject || thread.title,
            content,
          });
          return { kind: "sent" as const };
        }

        // Create thread tied to project
        const threadResp = await apiRequest("POST", "/api/threads", { projectId, title: subject || `Inquiry about: ${projectTitle || ''}` });
        const thread = await threadResp.json();

        // Post the message to the thread
        await apiRequest("POST", `/api/threads/${thread.id}/messages`, { subject: subject || thread.title, content });
        return { kind: "sent" as const };
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

      await apiRequest(
        "POST",
        "/api/messages",
        messagePayload,
        { "Idempotency-Key": idKey }
      );
      return { kind: "sent" as const };
    },
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ["/api/threads"] });
      void queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully!",
      });
      if (result.kind === "support") onSent?.(result.thread);
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
    if (supportThread && !subject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter a subject for this support conversation.",
        variant: "destructive",
      });
      return;
    }

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
          <DialogTitle>{supportThread ? `Start a conversation with ${_recipientName || "user"}` : "Send Message"}</DialogTitle>
          <DialogDescription>
            {supportThread
              ? "This will create a support thread the user can reply to from their inbox."
              : "Send a message to continue the conversation."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {contactContext && (
            <div className="space-y-1 rounded-lg border bg-muted/30 p-3">
              <p className="text-xs font-medium text-muted-foreground">Original contact form message</p>
              <p className="whitespace-pre-wrap text-sm">{contactContext}</p>
            </div>
          )}
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
            disabled={sendMessageMutation.isPending || (supportThread && !subject.trim()) || !content.trim()}
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
