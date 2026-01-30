import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { UserProfile } from "@shared/schema";
import { User, Save, Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfileManagement() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [profileForm, setProfileForm] = useState({
    profileType: "individual" as "individual" | "company",
    companyName: "",
    phoneNumber: "",
    location: "",
    bio: "",
    interests: [] as string[],
  });
  const [deletionReason, setDeletionReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile>({
    queryKey: ["/api/profile"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        profileType: profile.profileType,
        companyName: profile.companyName || "",
        phoneNumber: profile.phoneNumber || "",
        location: profile.location || "",
        bio: profile.bio || "",
        interests: profile.interests || [],
      });
    }
  }, [profile]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof profileForm) => {
      if (profile) {
        return await apiRequest("PATCH", "/api/profile", data);
      } else {
        return await apiRequest("POST", "/api/profile", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({ title: "Profile saved successfully" });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Unauthorized", variant: "destructive" });
        setTimeout(() => window.location.href = "/api/login", 500);
        return;
      }
      toast({ title: "Error", description: "Failed to save profile", variant: "destructive" });
    },
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
    }
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const handleSave = () => {
    saveMutation.mutate(profileForm);
  };

  return (
    <div className="flex flex-col">
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-display" data-testid="text-page-title">
              Manage Profile
            </h1>
          </div>
          <p className="text-muted-foreground">
            Update your account details and preferences
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {profileLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Tell us about yourself or your company
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    data-testid="input-email"
                  />
                  <p className="text-sm text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileType">Profile Type</Label>
                  <Select
                    value={profileForm.profileType}
                    onValueChange={(value: "individual" | "company") =>
                      setProfileForm({ ...profileForm, profileType: value })
                    }
                  >
                    <SelectTrigger id="profileType" data-testid="select-profile-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {profileForm.profileType === "company" && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={profileForm.companyName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, companyName: e.target.value })
                      }
                      placeholder="Enter your company name"
                      data-testid="input-company-name"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={profileForm.phoneNumber}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phoneNumber: e.target.value })
                    }
                    placeholder="+260 978 838 939"
                    data-testid="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, location: e.target.value })
                    }
                    placeholder="e.g., Lusaka, Zambia"
                    data-testid="input-location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileForm.bio}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself or your company"
                    rows={4}
                    data-testid="textarea-bio"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input
                    id="interests"
                    value={profileForm.interests.join(", ")}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        interests: e.target.value.split(",").map((i) => i.trim()).filter(Boolean),
                      })
                    }
                    placeholder="e.g., Copper, Gold, Emerald"
                    data-testid="input-interests"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                  className="w-full"
                  data-testid="button-save-profile"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Danger Zone */}
          {!profileLoading && (
            <Card className="mt-12 border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Actions here are permanent and require administrative approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Requesting an account deletion will send a formal request to our administrators.
                  Once processed, all your data, listings, and projects will be permanently removed.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Request Account Deletion
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Request Account Deletion?</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-4">
                        <p>
                          Please provide a reason for your request. An administrator will review this and delete your account within 30 days.
                        </p>
                        <Textarea
                          placeholder="Reason for deletion (optional)"
                          value={deletionReason}
                          onChange={(e) => setDeletionReason(e.target.value)}
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          setIsDeleting(true);
                          try {
                            await apiRequest("POST", "/api/account-deletion-request", { reason: deletionReason });
                            toast({ title: "Request Submitted", description: "An admin will review your deletion request." });
                            setDeletionReason("");
                          } catch (err) {
                            toast({ title: "Error", description: "Failed to submit request", variant: "destructive" });
                          } finally {
                            setIsDeleting(false);
                          }
                        }}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {isDeleting ? "Submitting..." : "Submit Request"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
