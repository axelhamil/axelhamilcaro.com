"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "./color-picker";
import { ImageUpload } from "./image-upload";
import type {
  BackgroundType,
  FormData,
  GradientConfig,
  GradientMode,
} from "./types";
import { gradientDirections } from "./types";

interface BackgroundTabProps {
  formData: FormData;
  gradientMode: GradientMode;
  gradientConfig: GradientConfig;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  onGradientModeChange: (mode: GradientMode) => void;
  onGradientConfigChange: (field: keyof GradientConfig, value: string) => void;
  onGradientCssChange: (value: string) => void;
}

export function BackgroundTab({
  formData,
  gradientMode,
  gradientConfig,
  onChange,
  onGradientModeChange,
  onGradientConfigChange,
  onGradientCssChange,
}: BackgroundTabProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="backgroundType"
          className="text-sm font-medium text-[var(--admin-text)]"
        >
          Type de fond
        </Label>
        <Select
          value={formData.backgroundType}
          onValueChange={(value: BackgroundType) =>
            onChange("backgroundType", value)
          }
        >
          <SelectTrigger
            id="backgroundType"
            className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-[var(--admin-border)] bg-[var(--admin-bg-subtle)]">
            <SelectItem value="color">Couleur unie</SelectItem>
            <SelectItem value="gradient">Dégradé</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.backgroundType === "color" && (
        <div className="space-y-2">
          <Label
            htmlFor="backgroundColor"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Couleur
          </Label>
          <ColorPicker
            id="backgroundColor"
            value={formData.backgroundColor}
            onChange={(value) => onChange("backgroundColor", value)}
          />
        </div>
      )}

      {formData.backgroundType === "gradient" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onGradientModeChange("visual")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                gradientMode === "visual"
                  ? "bg-[var(--admin-accent)] text-white"
                  : "border border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              }`}
            >
              Visuel
            </button>
            <button
              type="button"
              onClick={() => onGradientModeChange("css")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                gradientMode === "css"
                  ? "bg-[var(--admin-accent)] text-white"
                  : "border border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              }`}
            >
              CSS
            </button>
          </div>

          {gradientMode === "visual" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="gradientColor1"
                    className="text-sm font-medium text-[var(--admin-text)]"
                  >
                    Couleur 1
                  </Label>
                  <ColorPicker
                    id="gradientColor1"
                    value={gradientConfig.color1}
                    onChange={(value) =>
                      onGradientConfigChange("color1", value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="gradientColor2"
                    className="text-sm font-medium text-[var(--admin-text)]"
                  >
                    Couleur 2
                  </Label>
                  <ColorPicker
                    id="gradientColor2"
                    value={gradientConfig.color2}
                    onChange={(value) =>
                      onGradientConfigChange("color2", value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="gradientDirection"
                  className="text-sm font-medium text-[var(--admin-text)]"
                >
                  Direction
                </Label>
                <Select
                  value={gradientConfig.direction}
                  onValueChange={(value) =>
                    onGradientConfigChange("direction", value)
                  }
                >
                  <SelectTrigger
                    id="gradientDirection"
                    className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-[var(--admin-border)] bg-[var(--admin-bg-subtle)]">
                    {gradientDirections.map((dir) => (
                      <SelectItem key={dir.value} value={dir.value}>
                        {dir.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div
                className="h-12 rounded-lg border border-[var(--admin-border)]"
                style={{ background: formData.backgroundGradient }}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label
                htmlFor="backgroundGradient"
                className="text-sm font-medium text-[var(--admin-text)]"
              >
                CSS Gradient
              </Label>
              <Textarea
                id="backgroundGradient"
                value={formData.backgroundGradient}
                onChange={(e) => onGradientCssChange(e.target.value)}
                placeholder="linear-gradient(135deg, #ff4d00 0%, #ff6b35 100%)"
                rows={2}
                className="font-mono text-sm border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)]"
              />
            </div>
          )}
        </div>
      )}

      {formData.backgroundType === "image" && (
        <div className="space-y-2">
          <Label
            htmlFor="backgroundImage"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Image de fond
          </Label>
          <ImageUpload
            id="backgroundImage"
            value={formData.backgroundImage}
            onChange={(url) => onChange("backgroundImage", url)}
          />
        </div>
      )}
    </div>
  );
}
