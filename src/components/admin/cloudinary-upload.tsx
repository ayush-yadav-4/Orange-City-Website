"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle, ExternalLink } from "lucide-react";

interface CloudinaryUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  helperText?: string;
  required?: boolean;
}

export function CloudinaryUpload({
  label = "Product Image",
  value,
  onChange,
  folder = "products",
  helperText,
  required,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "orange_city_products";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "orange_city_products";

  async function handleFile(file: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      if (folder) {
        formData.append("folder", folder);
      }

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.error?.message || "Failed to upload image to Cloudinary";
        throw new Error(msg);
      }

      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        throw new Error("No URL returned from Cloudinary");
      }
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      setUploadError(err.message || "Upload failed. Please check your upload preset or try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline"
          >
            View Original <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* Preview if image exists */}
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-2">
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <img
                src={value}
                alt="Uploaded preview"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle size={14} /> Image Attached
              </div>
              <p className="mt-1 truncate text-xs text-[hsl(var(--muted-foreground))]" title={value}>
                {value}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2.5 py-1 text-xs font-medium transition hover:border-brand-400 hover:text-brand-600"
                >
                  Replace Image
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Upload Area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
            dragActive
              ? "border-brand-500 bg-brand-50/50 dark:bg-brand-950/20"
              : "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-brand-400 hover:bg-[hsl(var(--muted))]/30"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">Uploading to Cloudinary...</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Please wait while the image is being processed</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 transition group-hover:scale-110">
                <Upload size={22} />
              </div>
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                PNG, JPG, WEBP, SVG up to 10MB (Automatically hosted on Cloudinary)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Manual URL input toggle / fallback */}
      <div className="flex items-center gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL directly..."
          className="input-field text-xs"
        />
      </div>

      {uploadError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          <strong>Upload Notice:</strong> {uploadError}
          <div className="mt-1 text-[11px] opacity-80">
            Make sure your Cloudinary unsigned upload preset is named <code>{uploadPreset}</code>.
          </div>
        </div>
      )}

      {helperText && <p className="text-xs text-[hsl(var(--muted-foreground))]">{helperText}</p>}
    </div>
  );
}
