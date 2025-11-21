import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type VerificationStatus = 'not_requested' | 'pending' | 'approved' | 'rejected';
type BadgeColor = 'bronze' | 'silver' | 'gold';

interface VerificationBadgeProps {
  verificationStatus?: VerificationStatus | null;
  badgeColor?: BadgeColor | null;
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function VerificationBadge({
  verificationStatus,
  badgeColor,
  size = "default",
  showIcon = true,
  className,
}: VerificationBadgeProps) {
  // Only show badge if verification is approved
  if (verificationStatus !== 'approved' || !badgeColor) {
    return null;
  }

  const badgeConfig = {
    bronze: {
      label: "Bronze Verified",
      className: "bg-amber-700 hover:bg-amber-700 text-white border-amber-600",
    },
    silver: {
      label: "Silver Verified",
      className: "bg-gray-400 hover:bg-gray-400 text-gray-900 border-gray-300",
    },
    gold: {
      label: "Gold Verified",
      className: "bg-yellow-500 hover:bg-yellow-500 text-yellow-950 border-yellow-400",
    },
  };

  const config = badgeConfig[badgeColor];

  const sizeConfig = {
    sm: {
      badge: "text-xs px-2 py-0.5",
      icon: "h-2.5 w-2.5",
    },
    default: {
      badge: "text-xs px-2.5 py-1",
      icon: "h-3 w-3",
    },
    lg: {
      badge: "text-sm px-3 py-1.5",
      icon: "h-3.5 w-3.5",
    },
  };

  const sizes = sizeConfig[size];

  return (
    <Badge
      className={cn(
        "font-semibold flex items-center gap-1.5 no-default-hover-elevate no-default-active-elevate",
        config.className,
        sizes.badge,
        className
      )}
      data-testid={`badge-verified-${badgeColor}`}
    >
      {showIcon && <Shield className={sizes.icon} />}
      <span>{config.label}</span>
    </Badge>
  );
}
