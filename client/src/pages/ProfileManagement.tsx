import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import { User, Save, Trash2, AlertTriangle, ArrowLeft, Mail, Phone, MapPin, Building2, Briefcase, Camera, Loader2, Upload, BadgeCheck } from "lucide-react";
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
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiRequest("POST", "/api/users/profile-image", formData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast({ title: "Profile image updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to upload image", variant: "destructive" });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const currentTier = user?.membershipTier || 'basic';
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500';
      case 'standard': return 'bg-slate-500 hover:bg-slate-600 text-white border-slate-500';
      default: return 'bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      {/* Premium Header */}
      <section className="py-8 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground" data-testid="text-page-title">
                Manage Profile
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">
                Update your account details and public profile
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 flex-1">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column: Avatar & Basic Info */}
            <motion.div variants={item} className="lg:col-span-1 space-y-6">
              <Card className="border-muted/60 shadow-lg shadow-muted/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10" />
                <CardContent className="pt-20 px-6 pb-6 flex flex-col items-center text-center relative pointer-events-none">
                  <div className="relative group pointer-events-auto">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl ring-1 ring-border/20">
                      <AvatarImage src={user?.profileImageUrl || ""} alt={user?.firstName || "User"} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-muted/50">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadImageMutation.isPending}
                      className="absolute bottom-1 right-1 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 scale-90 group-hover:scale-100"
                      title="Change Profile Picture"
                    >
                      {uploadImageMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="mt-4 pointer-events-auto w-full">
                    <h2 className="text-2xl font-bold font-display">{user?.firstName} {user?.lastName}</h2>
                    <p className="text-muted-foreground flex items-center justify-center gap-1.5 mt-1 text-sm truncate">
                      <Mail className="h-3.5 w-3.5 shrink-0" /> {user?.email}
                    </p>
                    <div className="flex gap-2 justify-center mt-4">
                      <Badge variant="outline" className="capitalize bg-background/50 backdrop-blur-sm border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-400">
                        {user?.role}
                      </Badge>
                      <Badge className={`capitalize ${getTierColor(currentTier)}`}>
                        {currentTier} Member
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status / Danger Zone */}
              <Card className="border-red-200 dark:border-red-900/30 bg-red-50/5 dark:bg-red-950/10 shadow-sm overflow-hidden">
                <CardHeader className="bg-red-50/30 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/30 py-4">
                  <CardTitle className="text-destructive flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Once processed, all your data will be permanently removed.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="w-full shadow-sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
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
            </motion.div>

            {/* Right Column: Edit Profile Form */}
            <motion.div variants={item} className="lg:col-span-2">
              <Card className="border-muted/60 shadow-lg shadow-muted/10 h-full flex flex-col">
                <CardHeader className="bg-muted/5 border-b border-border/50 pb-6">
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>
                    Manage your personal and company information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 space-y-6 flex-1">
                  {profileLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="profileType" className="text-base font-semibold">Profile Type</Label>
                          <Select
                            value={profileForm.profileType}
                            onValueChange={(value: "individual" | "company") =>
                              setProfileForm({ ...profileForm, profileType: value })
                            }
                          >
                            <SelectTrigger id="profileType" data-testid="select-profile-type" className="h-11">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="company">Company</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="text-base font-semibold">Company Name</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="companyName"
                              value={profileForm.companyName}
                              onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                              placeholder={profileForm.profileType === 'company' ? "Enter company name" : "N/A"}
                              className="pl-9 h-11"
                              disabled={profileForm.profileType !== 'company'}
                              data-testid="input-company-name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber" className="text-base font-semibold">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phoneNumber"
                              value={profileForm.phoneNumber}
                              onChange={(e) => setProfileForm({ ...profileForm, phoneNumber: e.target.value })}
                              placeholder="+260 97x xxx xxx"
                              className="pl-9 h-11"
                              data-testid="input-phone"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-base font-semibold">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="location"
                              value={profileForm.location}
                              onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                              placeholder="City, Country"
                              className="pl-9 h-11"
                              data-testid="input-location"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-base font-semibold">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          placeholder="Tell us about yourself..."
                          rows={4}
                          className="resize-none text-base"
                          data-testid="textarea-bio"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interests" className="text-base font-semibold">Interests</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="interests"
                            value={profileForm.interests.join(", ")}
                            onChange={(e) =>
                              setProfileForm({
                                ...profileForm,
                                interests: e.target.value.split(",").map((i) => i.trim()).filter(Boolean),
                              })
                            }
                            placeholder="Mining, Equipment, Logistics..."
                            className="pl-9 h-11"
                            data-testid="input-interests"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Separate interests with commas</p>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/5 border-t border-border/50 p-6 md:p-8 flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={saveMutation.isPending || profileLoading}
                    className="w-full sm:w-auto h-11 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all font-semibold"
                    data-testid="button-save-profile"
                  >
                    {saveMutation.isPending ? (
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
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
