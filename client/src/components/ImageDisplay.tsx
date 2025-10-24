import {
  Mountain,
  Gem,
  Pickaxe,
  Factory,
  Coins,
  TrendingUp,
  Hammer,
  Landmark,
  CircleDot,
  Hexagon,
  Sparkles,
  Trophy,
  Target,
  Database,
  Layers,
  Package
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Mountain,
  Gem,
  Pickaxe,
  Factory,
  Coins,
  TrendingUp,
  Hammer,
  Landmark,
  CircleDot,
  Hexagon,
  Sparkles,
  Trophy,
  Target,
  Database,
  Layers,
  Package
};

const ICON_COLORS: Record<string, string> = {
  Mountain: "text-blue-600",
  Gem: "text-purple-600",
  Pickaxe: "text-orange-600",
  Factory: "text-gray-600",
  Coins: "text-yellow-600",
  TrendingUp: "text-green-600",
  Hammer: "text-red-600",
  Landmark: "text-indigo-600",
  CircleDot: "text-cyan-600",
  Hexagon: "text-pink-600",
  Sparkles: "text-amber-600",
  Trophy: "text-yellow-500",
  Target: "text-red-500",
  Database: "text-blue-500",
  Layers: "text-violet-600",
  Package: "text-brown-600"
};

interface ImageDisplayProps {
  imageUrl?: string | null;
  alt?: string;
  className?: string;
  iconClassName?: string;
  fallbackIcon?: React.ComponentType<{ className?: string }>;
}

export function ImageDisplay({ 
  imageUrl, 
  alt = "Image",
  className = "aspect-video bg-muted flex items-center justify-center",
  iconClassName = "h-16 w-16",
  fallbackIcon: FallbackIcon = Gem
}: ImageDisplayProps) {
  // Handle icon: prefix
  if (imageUrl && imageUrl.startsWith("icon:")) {
    const iconName = imageUrl.replace("icon:", "");
    const Icon = ICON_MAP[iconName] || FallbackIcon;
    const colorClass = ICON_COLORS[iconName] || "text-muted-foreground";
    
    return (
      <div className={className}>
        <Icon className={`${iconClassName} ${colorClass}`} />
      </div>
    );
  }

  // Handle URL image
  if (imageUrl && !imageUrl.startsWith("icon:")) {
    return (
      <div className={className}>
        <img 
          src={imageUrl} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to icon if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '';
              const iconDiv = document.createElement('div');
              iconDiv.className = 'flex items-center justify-center w-full h-full';
              parent.appendChild(iconDiv);
            }
          }}
        />
      </div>
    );
  }

  // Fallback to default icon
  return (
    <div className={className}>
      <FallbackIcon className={`${iconClassName} text-muted-foreground`} />
    </div>
  );
}
