import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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
  Package,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  Link2
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
  placeholder = "Upload an image or select an icon",
  testId = "input-image"
}: ImageSelectorProps) {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (value && value.startsWith("icon:")) return "icons";
    if (value && (value.startsWith("http://") || value.startsWith("https://"))) return "url";
    return "upload";
  });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    value && !value.startsWith("icon:") ? value : null
  );

  useEffect(() => {
    if (value && !value.startsWith("icon:")) {
      setPreview(value);
    } else if (!value) {
      setPreview(null);
    }
  }, [value]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleIconSelect = (iconName: string) => {
    onChange(`icon:${iconName}`);
    setPreview(null);
  };

  const isIconSelected = (iconName: string) => {
    return value === `icon:${iconName}`;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG, JPEG, GIF, or WebP image",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiRequest('POST', '/api/uploads/listings', formData);
      const data = await response.json();

      if (response.ok && data.url) {
        onChange(data.url);
        setPreview(data.url);
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully",
        });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" data-testid="tab-upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" data-testid="tab-url">
            <Link2 className="h-4 w-4 mr-2" />
            Image URL
          </TabsTrigger>
          <TabsTrigger value="icons" data-testid="tab-icons">
            <Sparkles className="h-4 w-4 mr-2" />
            Icon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-3">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            {preview ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 rounded-lg shadow-md mx-auto"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Image uploaded successfully</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="p-4 bg-muted rounded-full">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className="hidden"
                    id="image-upload-input"
                    data-testid={testId}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  PNG, JPEG, GIF, or WebP (max 5MB)
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="url" className="space-y-3">
          <div className="space-y-3 p-4 border rounded-lg bg-card">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Direct Image Link</Label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={value && !value.startsWith("icon:") ? value : ""}
                  onChange={(e) => {
                    const url = e.target.value;
                    onChange(url);
                    setPreview(url || null);
                  }}
                  data-testid={`${testId}-url`}
                  className="flex-1"
                />
                {value && !value.startsWith("icon:") && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleRemoveImage}
                    title="Clear URL"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Paste a web link to any image (JPEG, PNG, WebP, etc.)
              </p>
            </div>

            {preview && !value.startsWith("icon:") && (
              <div className="p-3 border rounded-lg text-center bg-muted/20">
                <p className="text-xs text-muted-foreground mb-2">Live Preview:</p>
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Image Preview"
                    className="max-h-44 rounded-lg shadow-sm mx-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    onLoad={(e) => {
                      (e.target as HTMLElement).style.display = 'block';
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-7 w-7 rounded-full p-0"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
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
            Choose a mining-related icon to represent your listing
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
