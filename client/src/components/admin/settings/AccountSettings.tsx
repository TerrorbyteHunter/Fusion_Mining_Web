import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Lock, History, Shield } from "lucide-react";
import type { LoginHistory, TwoFactorAuth } from "@shared/schema";

export function AccountSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: loginHistory } = useQuery<LoginHistory[]>({
    queryKey: ["/api/account/login-history"],
  });

  const { data: twoFAStatus } = useQuery<TwoFactorAuth>({
    queryKey: ["/api/account/2fa-status"],
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) =>
      apiRequest("POST", "/api/account/password-change", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to change password", variant: "destructive" });
    },
  });

  const toggle2FAMutation = useMutation({
    mutationFn: async (enable: boolean) =>
      apiRequest(enable ? "POST" : "DELETE", "/api/account/2fa-toggle"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/account/2fa-status"] });
      toast({ title: "Success", description: "2FA settings updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update 2FA", variant: "destructive" });
    },
  });

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
      return;
    }
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Account Information</CardTitle>
          </div>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span>{user?.email}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Name</Label>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span>{user?.firstName} {user?.lastName}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <Badge>{user?.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Change Password</CardTitle>
          </div>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              data-testid="input-current-password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              data-testid="input-new-password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              data-testid="input-confirm-password"
            />
          </div>
          <Button
            onClick={handlePasswordChange}
            disabled={changePasswordMutation.isPending || !currentPassword || !newPassword}
            data-testid="button-change-password"
          >
            Change Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-muted-foreground">
                Require a verification code in addition to your password
              </p>
            </div>
            <Switch
              checked={twoFAStatus?.enabled || false}
              onCheckedChange={(checked) => toggle2FAMutation.mutate(checked)}
              data-testid="switch-2fa"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            <CardTitle>Login History</CardTitle>
          </div>
          <CardDescription>Recent account activity</CardDescription>
        </CardHeader>
        <CardContent>
          {loginHistory && loginHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.slice(0, 10).map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-sm">{entry.ipAddress}</TableCell>
                    <TableCell>
                      <Badge variant={entry.success ? "default" : "destructive"}>
                        {entry.success ? "Success" : "Failed"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No login history available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
