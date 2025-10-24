import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { Message } from "@shared/schema";
import { MessageSquare, Mail, MailOpen } from "lucide-react";
import { format } from "date-fns";

export default function Messages() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    enabled: isAuthenticated,
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
          <div className="space-y-8">
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
              ) : receivedMessages.length > 0 ? (
                <div className="space-y-4">
                  {receivedMessages.map((message) => (
                    <Card key={message.id} data-testid={`card-message-${message.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {message.read ? (
                                <MailOpen className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Mail className="h-4 w-4 text-primary" />
                              )}
                              {message.subject || "No Subject"}
                            </CardTitle>
                            <CardDescription>
                              From: Sender • {format(new Date(message.createdAt), "MMM d, yyyy HH:mm")}
                            </CardDescription>
                          </div>
                          {!message.read && <Badge>New</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{message.content}</p>
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

            <div>
              <h2 className="text-2xl font-bold mb-4">Sent Messages</h2>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : sentMessages.length > 0 ? (
                <div className="space-y-4">
                  {sentMessages.map((message) => (
                    <Card key={message.id} data-testid={`card-sent-message-${message.id}`}>
                      <CardHeader>
                        <CardTitle>{message.subject || "No Subject"}</CardTitle>
                        <CardDescription>
                          To: Recipient • {format(new Date(message.createdAt), "MMM d, yyyy HH:mm")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{message.content}</p>
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
          </div>
        </div>
      </section>
    </div>
  );
}
