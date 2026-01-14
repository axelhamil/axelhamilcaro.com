"use client";

import { ImagePlus, Loader2, Trash2, X } from "lucide-react";
import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  id?: string;
}

export function ImageUpload({
  value,
  onChange,
  className,
  id,
}: ImageUploadProps) {
  const generatedId = useId();
  const inputId = id || `image-upload-${generatedId}`;
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          onChange(data.url);
        } else {
          setError(data.error || "Erreur lors de l'upload");
        }
      } catch {
        setError("Erreur lors de l'upload");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        handleUpload(file);
      }
    },
    [handleUpload],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  if (value) {
    return (
      <div className={cn("relative group", className)}>
        <img
          src={value}
          alt=""
          className="w-full h-40 object-cover rounded-lg border border-[var(--admin-border)]"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragging
            ? "border-[var(--admin-accent)] bg-[var(--admin-accent)]/5"
            : "border-[var(--admin-border)] hover:border-[var(--admin-accent)] hover:bg-[var(--admin-bg-elevated)]",
          isUploading && "pointer-events-none opacity-50",
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 mb-2 text-[var(--admin-accent)] animate-spin" />
              <p className="text-sm text-[var(--admin-text-muted)]">
                Upload en cours...
              </p>
            </>
          ) : (
            <>
              <ImagePlus className="w-8 h-8 mb-2 text-[var(--admin-text-muted)]" />
              <p className="text-sm text-[var(--admin-text-muted)]">
                <span className="font-medium text-[var(--admin-accent)]">
                  Clique
                </span>{" "}
                ou glisse une image
              </p>
              <p className="text-xs text-[var(--admin-text-subtle)] mt-1">
                PNG, JPG, WebP, GIF
              </p>
            </>
          )}
        </div>
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
