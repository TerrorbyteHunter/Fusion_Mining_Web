import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

export default function AdminContactSubmissions() {
  const { isAdmin, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({ title: "Unauthorized", description: "You are logged out.", variant: "destructive" });
      setTimeout(() => (window.location.href = "/api/login"), 400);
      return;
    }
    if (!authLoading && isAuthenticated && !isAdmin) {
      toast({ title: "Access Denied", description: "You don't have permission to access this page.", variant: "destructive" });
      window.location.href = "/dashboard";
      return;
    }
  }, [authLoading, isAuthenticated, isAdmin, toast]);

  const { data: submissions, isLoading } = useQuery<any[]>({
    queryKey: ['/api/contact/submissions'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    enabled: isAdmin,
  });

  // If an `id` query param is present, scroll to that submission when loaded
  useEffect(() => {
    if (!submissions || submissions.length === 0) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (!id) return;
      const el = document.getElementById(`contact-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-primary', 'rounded-lg');
        setTimeout(() => el.classList.remove('ring-2', 'ring-primary', 'rounded-lg'), 4000);
      }
    } catch (err) {
      // ignore
    }
  }, [submissions]);

  const patchStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest('PATCH', `/api/contact/submissions/${id}`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact/submissions'] });
    },
    onError: (err: any) => {
      toast({ title: 'Error', description: err?.message || 'Failed to update status', variant: 'destructive' });
    },
  });

  if (authLoading || !isAuthenticated || !isAdmin) return null;

  return (
    <div className="container py-8">
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-display mb-2">Contact Submissions</h1>
          <p className="text-muted-foreground">Recent messages submitted through the public contact form.</p>
        </div>
      </section>

      <div className="py-8">
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[160px]">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (!submissions || submissions.length === 0) ? (
              <div className="p-6 text-center text-muted-foreground">No contact submissions found.</div>
            ) : (
              <div className="space-y-4">
                {submissions.map((s: any) => (
                  <div id={`contact-${s.id}`} key={s.id} className="border p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                                <div className="font-semibold">{s.name} <span className="text-sm text-muted-foreground">({s.email})</span></div>
                                <div className="text-sm text-muted-foreground">{new Date(s.createdAt).toLocaleString()}</div>
                                <div className="mt-2 flex flex-col text-sm">
                                  <div><strong>Phone:</strong> {s.phone ? (<a href={`tel:${s.phone}`} className="text-primary hover:underline">{s.phone}</a>) : <span className="text-muted-foreground">N/A</span>}</div>
                                  <div className="mt-1"><strong>Subject:</strong> {s.subject}</div>
                                </div>
                                <div className="mt-2 whitespace-pre-line">{s.message}</div>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <div className="text-sm text-muted-foreground">Status: <span className="font-medium">{s.status}</span></div>
                        <Button size="sm" onClick={() => patchStatus.mutate({ id: s.id, status: 'contacted' })} disabled={s.status === 'contacted' || patchStatus.isLoading}>
                          Mark Contacted
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => patchStatus.mutate({ id: s.id, status: 'resolved' })} disabled={s.status === 'resolved' || patchStatus.isLoading}>
                          Mark Resolved
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
