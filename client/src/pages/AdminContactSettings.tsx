import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { updateContactSettingsSchema, type InsertContactSettings } from "@shared/schema";
import { Loader2, Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function AdminContactSettings() {
  const { toast } = useToast();
  const { isAdmin, isAuthenticated, isLoading: authLoading } = useAuth();

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
    if (!authLoading && isAuthenticated && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      window.location.href = "/dashboard";
      return;
    }
  }, [isAuthenticated, authLoading, isAdmin, toast]);

  // Get current contact settings
  const { data: settings, isLoading } = useQuery<any>({
    queryKey: ['/api/contact-settings'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    enabled: isAdmin,
  });

  const form = useForm<InsertContactSettings>({
    resolver: zodResolver(updateContactSettingsSchema),
    defaultValues: {
      officeAddress: '',
      phone: '',
      email: '',
      supportEmail: '',
      mondayFriday: '',
      saturday: '',
      sunday: '',
    },
    values: settings, // Update form when settings load
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<InsertContactSettings>) => {
      await apiRequest("POST", "/api/contact-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact-settings'] });
      toast({
        title: "Settings Updated",
        description: "Contact settings have been saved successfully.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: error.message || "Failed to update contact settings.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: InsertContactSettings) {
    mutation.mutate(data);
  }

  if (authLoading || !isAuthenticated || !isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="py-8 border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-display mb-4">Contact Settings</h1>
          <p className="text-muted-foreground">
            Update company contact information displayed on the website
          </p>
        </div>
      </section>

      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Edit Contact Information</CardTitle>
            <CardDescription>
              These settings are displayed in the footer and contact page
            </CardDescription>
          </CardHeader>
          <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="officeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Address</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter your office address"
                      />
                    </FormControl>
                    <FormDescription>
                      Use line breaks (\n) to format multiple lines
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        value={field.value ?? ""}
                        placeholder="+260 XXX XXX XXX"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          value={field.value ?? ""}
                          type="email"
                          placeholder="primary@fusionmining.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supportEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Email (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          value={field.value ?? ""}
                          type="email"
                          placeholder="support@fusionmining.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="mondayFriday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monday - Friday Hours</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          value={field.value ?? ""}
                          placeholder="8:00 AM - 5:00 PM"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="saturday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saturday Hours</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          value={field.value ?? ""}
                          placeholder="9:00 AM - 1:00 PM"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sunday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sunday Hours</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Closed"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}