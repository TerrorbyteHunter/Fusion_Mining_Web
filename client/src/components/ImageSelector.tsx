import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const ICON_OPTIONS = [
  { name: "Mountain", Icon: Mountain, color: "text-blue-600" },
  { name: "Gem", Icon: Gem, color: "text-purple-600" },
  { name: "Pickaxe", Icon: Pickaxe, color: "text-orange-600" },
  { name: "Factory", Icon: Factory, color: "text-gray-600" },
  { name: "Coins", Icon: Coins, color: "text-yellow-600" },
  { name: "TrendingUp", Icon: TrendingUp, color: "text-green-600" },
  { name: "Hammer", Icon: Hammer, color: "text-red-600" },
  { name: "Landmark", Icon: Landmark, color: "text-indigo-600" },
  { name: "CircleDot", Icon: CircleDot, color: "text-cyan-600" },
  { name: "Hexagon", Icon: Hexagon, color: "text-pink-600" },
  { name: "Sparkles", Icon: Sparkles, color: "text-amber-600" },
  { name: "Trophy", Icon: Trophy, color: "text-yellow-500" },
  { name: "Target", Icon: Target, color: "text-red-500" },
  { name: "Database", Icon: Database, color: "text-blue-500" },
  { name: "Layers", Icon: Layers, color: "text-violet-600" },
  { name: "Package", Icon: Package, color: "text-brown-600" }
];

interface ImageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  testId?: string;
}

export function ImageSelector({ 
  value, 
  onChange, 
  label = "Image",
  placeholder = "https://example.com/image.jpg",
  testId = "input-image"
}: ImageSelectorProps) {
  const [activeTab, setActiveTab] = useState<string>(
    value.startsWith("icon:") ? "icons" : "url"
  );

  const handleIconSelect = (iconName: string) => {
    onChange(`icon:${iconName}`);
  };

  const isIconSelected = (iconName: string) => {
    return value === `icon:${iconName}`;
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url" data-testid="tab-url">
            Image URL
          </TabsTrigger>
          <TabsTrigger value="icons" data-testid="tab-icons">
            Select Icon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-2">
          <Input
            value={value.startsWith("icon:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            data-testid={testId}
          />
          <p className="text-xs text-muted-foreground">
            Enter a direct image URL (e.g., from Unsplash, Imgur, or your own hosting)
          </p>
        </TabsContent>

        <TabsContent value="icons" className="space-y-2">
          <div className="grid grid-cols-4 gap-2 p-2 border rounded-md max-h-64 overflow-y-auto">
            {ICON_OPTIONS.map(({ name, Icon, color }) => (
              <Button
                key={name}
                type="button"
                variant={isIconSelected(name) ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center gap-1"
                onClick={() => handleIconSelect(name)}
                data-testid={`icon-option-${name.toLowerCase()}`}
              >
                <Icon className={`h-8 w-8 ${isIconSelected(name) ? "text-white" : color}`} />
                <span className="text-xs">{name}</span>
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Choose a mining-related icon to represent your project or listing
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
