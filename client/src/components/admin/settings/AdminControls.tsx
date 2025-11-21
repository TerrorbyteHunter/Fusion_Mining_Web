import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, FileText, MessageSquare, BarChart3, Crown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface AdminRoleDefinition {
  role: 'super_admin' | 'verification_admin' | 'content_admin' | 'support_admin' | 'analytics_admin';
  label: string;
  description: string;
  icon: any;
  color: string;
  permissions: {
    label: string;
    value: boolean;
  }[];
}

const adminRoleDefinitions: AdminRoleDefinition[] = [
  {
    role: 'super_admin',
    label: 'Super Admin',
    description: 'Full platform control with all permissions (founder-level access)',
    icon: Crown,
    color: 'text-yellow-600 dark:text-yellow-500',
    permissions: [
      { label: 'Manage Users', value: true },
      { label: 'Manage Admins', value: true },
      { label: 'Manage Listings', value: true },
      { label: 'Manage Projects', value: true },
      { label: 'Manage Verification', value: true },
      { label: 'Manage CMS & Blog', value: true },
      { label: 'Manage Messages', value: true },
      { label: 'View Analytics', value: true },
      { label: 'Manage Settings', value: true },
      { label: 'Access Audit Logs', value: true },
      { label: 'Manage Documents', value: true },
      { label: 'Reset Passwords', value: true },
      { label: 'Force Logout Users', value: true },
    ],
  },
  {
    role: 'verification_admin',
    label: 'Verification Admin',
    description: 'Handle compliance, KYC/AML, and listing approvals',
    icon: ShieldCheck,
    color: 'text-blue-600 dark:text-blue-500',
    permissions: [
      { label: 'Manage Verification', value: true },
      { label: 'Manage Listings', value: true },
      { label: 'Manage Documents', value: true },
      { label: 'View Analytics', value: true },
      { label: 'Access Audit Logs', value: true },
    ],
  },
  {
    role: 'content_admin',
    label: 'Content Admin',
    description: 'Manage platform content, branding, and CMS',
    icon: FileText,
    color: 'text-purple-600 dark:text-purple-500',
    permissions: [
      { label: 'Manage CMS & Blog', value: true },
      { label: 'Manage Projects', value: true },
      { label: 'Manage Documents', value: true },
      { label: 'View Analytics', value: true },
    ],
  },
  {
    role: 'support_admin',
    label: 'Support Admin',
    description: 'Handle user communication and issue resolution',
    icon: MessageSquare,
    color: 'text-green-600 dark:text-green-500',
    permissions: [
      { label: 'Manage Messages', value: true },
      { label: 'Reset Passwords', value: true },
      { label: 'Force Logout Users', value: true },
      { label: 'View Analytics', value: true },
      { label: 'Access Audit Logs', value: true },
    ],
  },
  {
    role: 'analytics_admin',
    label: 'Analytics Admin',
    description: 'Monitor platform performance and fraud detection',
    icon: BarChart3,
    color: 'text-orange-600 dark:text-orange-500',
    permissions: [
      { label: 'View Analytics', value: true },
      { label: 'Access Audit Logs', value: true },
      { label: 'Manage Listings', value: true },
      { label: 'Manage Projects', value: true },
    ],
  },
];

export function AdminControls() {
  const [roleInfoExpanded, setRoleInfoExpanded] = useState<string | null>(null);

  return (
    <div className="grid gap-6">
      {/* Admin Role Definitions Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <CardTitle>Admin Role Types & Capabilities</CardTitle>
          </div>
          <CardDescription>
            Five specialized admin roles with different permissions and responsibilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {adminRoleDefinitions.map((roledef) => {
            const RoleIcon = roledef.icon;
            const isExpanded = roleInfoExpanded === roledef.role;
            
            return (
              <Collapsible
                key={roledef.role}
                open={isExpanded}
                onOpenChange={() => setRoleInfoExpanded(isExpanded ? null : roledef.role)}
              >
                <div className="border rounded-md hover-elevate">
                  <CollapsibleTrigger className="w-full" data-testid={`collapsible-${roledef.role}`}>
                    <div className="flex flex-row flex-wrap items-center justify-between gap-2 p-4">
                      <div className="flex items-center gap-3">
                        <RoleIcon className={`h-5 w-5 ${roledef.color}`} />
                        <div className="text-left">
                          <h4 className="text-sm font-semibold">{roledef.label}</h4>
                          <p className="text-sm text-muted-foreground">{roledef.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {roledef.permissions.map((perm, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Badge variant={perm.value ? "default" : "outline"} className="text-xs">
                              {perm.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
