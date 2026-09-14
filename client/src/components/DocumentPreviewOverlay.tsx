import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PreviewableDocument {
  id: string;
  fileName: string;
  filePath: string;
  mimeType?: string | null;
}

function fileKind(doc: PreviewableDocument): "image" | "pdf" | "other" {
  const mime = (doc.mimeType || "").toLowerCase();
  const name = `${doc.fileName} ${doc.filePath}`.toLowerCase();

  if (mime.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name)) {
    return "image";
  }
  if (mime === "application/pdf" || name.endsWith(".pdf") || name.includes(".pdf?")) {
    return "pdf";
  }
  return "other";
}

function mimeForKind(kind: "image" | "pdf" | "other", fallback?: string | null) {
  if (kind === "pdf") return "application/pdf";
  if (kind === "image") {
    if (fallback && fallback.startsWith("image/")) return fallback;
    return "image/jpeg";
  }
  return fallback || "application/octet-stream";
}

async function fetchDocumentBlob(doc: PreviewableDocument) {
  const response = await fetch(doc.filePath);
  if (!response.ok) {
    throw new Error("Failed to load document");
  }
  const raw = await response.blob();
  const kind = fileKind(doc);
  return new Blob([raw], { type: mimeForKind(kind, doc.mimeType || raw.type) });
}

export async function downloadDocument(doc: PreviewableDocument) {
  const blob = await fetchDocumentBlob(doc);
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = doc.fileName || "document";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

interface DocumentPreviewOverlayProps {
  file: PreviewableDocument | null;
  onClose: () => void;
  onDownload: (doc: PreviewableDocument) => void;
}

export function DocumentPreviewOverlay({
  file,
  onClose,
  onDownload,
}: DocumentPreviewOverlayProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!file) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [file, onClose]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      setPreviewError(null);
      setIsLoading(false);
      return;
    }

    const kind = fileKind(file);
    if (kind === "other") {
      setPreviewUrl(null);
      setPreviewError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    let objectUrl: string | null = null;
    setIsLoading(true);
    setPreviewError(null);
    setPreviewUrl(null);

    fetchDocumentBlob(file)
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) {
          setPreviewError("Could not load a preview for this document.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!file) return null;

  const kind = fileKind(file);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-preview-title"
      onClick={onClose}
      data-testid="document-preview-overlay"
    >
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col rounded-lg border bg-background shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="min-w-0">
            <h2 id="document-preview-title" className="truncate text-sm font-semibold">
              {file.fileName}
            </h2>
            <p className="text-xs text-muted-foreground">Document preview</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(file)}
              data-testid="button-preview-download"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close preview"
              data-testid="button-preview-close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="min-h-[50vh] flex-1 bg-muted/40">
          {isLoading && (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-sm">Loading preview…</p>
            </div>
          )}

          {!isLoading && previewError && (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm font-medium">{previewError}</p>
              <Button onClick={() => onDownload(file)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          )}

          {!isLoading && !previewError && kind === "image" && previewUrl && (
            <div className="flex h-full max-h-[80vh] items-center justify-center overflow-auto p-4">
              <img
                src={previewUrl}
                alt={file.fileName}
                className="max-h-[76vh] max-w-full object-contain"
              />
            </div>
          )}

          {!isLoading && !previewError && kind === "pdf" && previewUrl && (
            <object
              data={`${previewUrl}#toolbar=1&navpanes=0`}
              type="application/pdf"
              title={file.fileName}
              className="h-[80vh] w-full"
            >
              <embed
                src={`${previewUrl}#toolbar=1&navpanes=0`}
                type="application/pdf"
                className="h-[80vh] w-full"
              />
            </object>
          )}

          {!isLoading && kind === "other" && (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm font-medium">Preview is not available for this file type</p>
              <p className="text-xs text-muted-foreground">
                Download the file to open it on your device.
              </p>
              <Button onClick={() => onDownload(file)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
