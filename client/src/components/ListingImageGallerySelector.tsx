import { useRef, useState } from "react";
import { ImagePlus, Loader2, Star, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageDisplay } from "@/components/ImageDisplay";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const MAX_IMAGES = 6;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/gif", "image/webp"]);

interface ListingImageGallerySelectorProps {
  value: string[];
  onChange: (imageUrls: string[]) => void;
  testId?: string;
}

export function ListingImageGallerySelector({
  value,
  onChange,
  testId = "input-listing-gallery",
}: ListingImageGallerySelectorProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    const availableSlots = Math.max(MAX_IMAGES - value.length, 0);
    if (files.length > availableSlots) {
      toast({
        title: "Too many photos",
        description: `You can add up to ${MAX_IMAGES} photos per listing. ${availableSlots} slot(s) remain.`,
        variant: "destructive",
      });
    }

    const selectedFiles = files.slice(0, Math.max(availableSlots, 0));
    const validFiles = selectedFiles.filter((file) => {
      if (!ALLOWED_TYPES.has(file.type)) {
        toast({
          title: "Unsupported photo format",
          description: `${file.name} must be a PNG, JPEG, GIF, or WebP image.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Photo is too large",
          description: `${file.name} must be smaller than 5MB.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;
    setUploading(true);
    const uploadedUrls: string[] = [];
    const uploadErrors: string[] = [];

    try {
      for (const file of validFiles) {
        try {
          const formData = new FormData();
          formData.append("image", file);
          const response = await apiRequest("POST", "/api/uploads/listings", formData);
          const result = await response.json() as { url?: string };
          if (!result.url) throw new Error(`Upload response did not include a URL for ${file.name}.`);
          uploadedUrls.push(result.url);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown upload error";
          uploadErrors.push(`${file.name}: ${message}`);
        }
      }

      if (uploadedUrls.length) {
        onChange([...value, ...uploadedUrls]);
      }
      if (uploadErrors.length) {
        console.error("One or more listing photos could not be uploaded:", uploadErrors);
        toast({
          title: uploadedUrls.length ? "Some photos were not uploaded" : "Photo upload failed",
          description: uploadErrors.join(" "),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Photos uploaded",
          description: `${uploadedUrls.length} photo${uploadedUrls.length === 1 ? "" : "s"} added to the listing.`,
        });
      }
    } finally {
      setUploading(false);
    }
  };

  const addImageUrl = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    if (value.length >= MAX_IMAGES) {
      toast({ title: "Photo limit reached", description: `A listing can have up to ${MAX_IMAGES} photos.`, variant: "destructive" });
      return;
    }
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("Invalid image URL");
    } catch {
      toast({ title: "Invalid image URL", description: "Enter a valid HTTP or HTTPS image URL.", variant: "destructive" });
      return;
    }
    if (value.includes(url)) {
      toast({ title: "Photo already added", description: "That image is already in this listing." });
      return;
    }
    onChange([...value, url]);
    setImageUrlInput("");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-0 flex-1 space-y-1.5">
          <Label htmlFor={`${testId}-url`}>Add photo by URL</Label>
          <Input
            id={`${testId}-url`}
            value={imageUrlInput}
            onChange={(event) => setImageUrlInput(event.target.value)}
            placeholder="https://example.com/photo.jpg"
            disabled={uploading || value.length >= MAX_IMAGES}
          />
        </div>
        <Button type="button" variant="outline" onClick={addImageUrl} disabled={uploading || !imageUrlInput.trim() || value.length >= MAX_IMAGES}>
          <ImagePlus className="mr-2 h-4 w-4" />Add URL
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          multiple
          onChange={uploadImages}
          disabled={uploading || value.length >= MAX_IMAGES}
          className="hidden"
          data-testid={testId}
        />
        <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading || value.length >= MAX_IMAGES}>
          {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {uploading ? "Uploading..." : "Upload photos"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Add up to {MAX_IMAGES} photos. PNG, JPEG, GIF, or WebP; maximum 5MB per upload. The first photo is the cover image.
      </p>

      {value.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="group relative overflow-hidden rounded-lg border border-border/70 bg-muted">
              <ImageDisplay
                imageUrl={url}
                alt={`Listing photo ${index + 1}`}
                className="aspect-[4/3] w-full overflow-hidden bg-muted"
                iconClassName="h-10 w-10"
              />
              {index === 0 ? (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-900 shadow dark:bg-amber-950 dark:text-amber-200">
                  <Star className="h-3 w-3 fill-current" />Cover
                </span>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute left-2 top-2 h-7 px-2 text-[10px] opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                  onClick={() => onChange([url, ...value.filter((_, itemIndex) => itemIndex !== index)])}
                  disabled={uploading}
                  aria-label={`Set photo ${index + 1} as cover`}
                >
                  <Star className="mr-1 h-3 w-3" />Set cover
                </Button>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
                disabled={uploading}
                aria-label={`Remove photo ${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No photos added yet.
        </div>
      )}
    </div>
  );
}
