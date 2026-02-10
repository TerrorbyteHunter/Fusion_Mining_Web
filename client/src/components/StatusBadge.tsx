// Status badge component with semantic colors
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'secondary' | 'outline';
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  // Listing statuses
  pending: {
    label: "Pending Verification",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-chart-5 text-white border-chart-5"
  },
  approved: {
    label: "Verified Ad",
    icon: <CheckCircle className="w-3 h-3" />,
    className: "bg-emerald-600 text-white border-emerald-500"
  },
  rejected: {
    label: "Rejected",
    icon: <XCircle className="w-3 h-3" />,
    className: "bg-destructive text-destructive-foreground border-destructive"
  },
  inactive: {
    label: "Inactive",
    icon: <AlertCircle className="w-3 h-3" />,
    className: "bg-muted text-muted-foreground border-muted"
  },
  // Project statuses
  active: {
    label: "Active",
    icon: <CheckCircle className="w-3 h-3" />,
    className: "bg-chart-3 text-white border-chart-3"
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle className="w-3 h-3" />,
    className: "bg-primary text-primary-foreground border-primary"
  },
  suspended: {
    label: "Suspended",
    icon: <AlertCircle className="w-3 h-3" />,
    className: "bg-chart-5 text-white border-chart-5"
  },
  // Request statuses
  new: {
    label: "New",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-chart-4 text-white border-chart-4"
  },
  contacted: {
    label: "Contacted",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-chart-5 text-white border-chart-5"
  },
  resolved: {
    label: "Resolved",
    icon: <CheckCircle className="w-3 h-3" />,
    className: "bg-chart-3 text-white border-chart-3"
  },
  closed: {
    label: "Closed",
    icon: <CheckCircle className="w-3 h-3" />,
    className: "bg-muted text-muted-foreground border-muted"
  },
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] || {
    label: status,
    icon: null,
    className: "bg-secondary text-secondary-foreground border-secondary"
  };

  return (
    <Badge
      variant={variant || "outline"}
      className={`gap-1 ${config.className}`}
      data-testid={`badge-status-${status.toLowerCase()}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  );
}
