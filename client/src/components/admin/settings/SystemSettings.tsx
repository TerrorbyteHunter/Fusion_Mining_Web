import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
    Database,
    Activity,
    Key,
    Lock,
    Download,
    RefreshCw,
    AlertTriangle,
    Server,
    Terminal,
    Cpu
} from "lucide-react";

export function SystemSettings() {
    const { toast } = useToast();
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Use a query to check platform connectivity
    const { isSettingsLoading, isSettingsError } = useQuery<any>({
        queryKey: ["/api/admin/settings/platform"],
        queryFn: async () => {
            const res = await apiRequest("GET", "/api/admin/settings/platform");
            return res.json();
        }
    }) as any;

    // Determine overall status based on settings query
    const overallStatus = isSettingsLoading
        ? "Checking..."
        : isSettingsError
            ? "Offline"
            : "Operational";

    const overallStatusVariant = isSettingsLoading
        ? "secondary"
        : isSettingsError
            ? "destructive"
            : "default";

    // Mock system health data
    const systemHealth = {
        status: overallStatus,
        uptime: "14 days, 6 hours",
        cpuUsage: "12%",
        memoryUsage: "480MB / 1GB",
        dbStatus: isSettingsError ? "Disconnected" : "Connected",
        dbSize: "24.5 MB"
    };

    const handleExportData = async () => {
        setIsExporting(true);
        try {
            const res = await apiRequest("GET", "/api/admin/system/export");
            const data = await res.json();

            // Create a blob and trigger download
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `platform-export-${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            toast({
                title: "Export Successful",
                description: "Platform data has been exported to a JSON file.",
            });
        } catch (error: any) {
            toast({
                title: "Export Failed",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-emerald-500" />
                            <CardTitle>System Health</CardTitle>
                        </div>
                        <CardDescription>Real-time platform performance monitoring</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm text-muted-foreground">Overall Status</span>
                            <Badge variant={overallStatusVariant} className={overallStatusVariant === "default" ? "bg-emerald-500" : ""}>
                                {overallStatus}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-slate-400">CPU Usage</p>
                                <div className="flex items-center gap-2">
                                    <Cpu className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-semibold">{systemHealth.cpuUsage}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-slate-400">Memory</p>
                                <div className="flex items-center gap-2">
                                    <Server className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-semibold">{systemHealth.memoryUsage}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-slate-400">Database</p>
                                <div className="flex items-center gap-2">
                                    <Database className="h-4 w-4 text-slate-400" />
                                    <span className={`text-sm font-semibold ${isSettingsError ? "text-rose-600" : "text-emerald-600"}`}>
                                        {systemHealth.dbStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-slate-400">Uptime</p>
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-semibold">{systemHealth.uptime}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-rose-500" />
                            <CardTitle>Security & Access</CardTitle>
                        </div>
                        <CardDescription>Control core platform access</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="font-medium text-sm">Maintenance Mode</p>
                                <p className="text-xs text-muted-foreground italic">Restricts access to staff only</p>
                            </div>
                            <Switch
                                checked={maintenanceMode}
                                onCheckedChange={(val) => {
                                    setMaintenanceMode(val);
                                    toast({
                                        title: val ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
                                        variant: val ? "destructive" : "default"
                                    });
                                }}
                            />
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-medium">API Access</span>
                                </div>
                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px]">Restricted</Badge>
                            </div>
                            <Button variant="outline" size="sm" className="w-full text-xs" disabled>
                                Manage API Keys
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-purple-500" />
                        <CardTitle>Data Management</CardTitle>
                    </div>
                    <CardDescription>Control platform data and backups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-4">
                        <div className="bg-purple-100 p-2 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-900">Platform Data Export</h4>
                            <p className="text-xs text-slate-500 mt-1">
                                Generates a complete backup of all marketplace listings, users, and platform settings.
                                This process may take several minutes for large datasets.
                            </p>
                            <div className="mt-4 flex gap-3">
                                <Button
                                    size="sm"
                                    className="bg-purple-600 hover:bg-purple-700"
                                    onClick={handleExportData}
                                    disabled={isExporting}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    {isExporting ? "Generating..." : "Generate Full Export"}
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs">
                                    <RefreshCw className="h-3 w-3 mr-2" />
                                    Sync Database
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-blue-500" />
                        <CardTitle>Integration Webhooks</CardTitle>
                    </div>
                    <CardDescription>Incoming and outgoing platform events</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="px-4 py-2 text-left font-bold text-slate-600">Event</th>
                                    <th className="px-4 py-2 text-left font-bold text-slate-600">Status</th>
                                    <th className="px-4 py-2 text-left font-bold text-slate-600">Last Active</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr>
                                    <td className="px-4 py-3 font-mono text-xs">listing.created</td>
                                    <td className="px-4 py-3"><Badge className="bg-emerald-500 h-5 text-[10px]">Active</Badge></td>
                                    <td className="px-4 py-3 text-slate-400 text-xs">2 hours ago</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-mono text-xs">payment.succeeded</td>
                                    <td className="px-4 py-3"><Badge className="bg-emerald-500 h-5 text-[10px]">Active</Badge></td>
                                    <td className="px-4 py-3 text-slate-400 text-xs">5 days ago</td>
                                </tr>
                                <tr className="bg-slate-50/50">
                                    <td className="px-4 py-3 font-mono text-xs text-slate-400 italic">No custom webhooks configured</td>
                                    <td colSpan={2} className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 font-bold hover:bg-transparent">Add Hook</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
