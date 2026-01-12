"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
        <Label className="text-sm font-medium text-[var(--admin-text)]">
          Type de fond
        </Label>
        <Select
          value={formData.backgroundType}
          onValueChange={(value: BackgroundType) =>
            onChange("backgroundType", value)
          }
        >
          <SelectTrigger className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]">
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
          <div className="flex gap-2">
            <Input
              type="color"
              id="backgroundColor"
              value={formData.backgroundColor}
              onChange={(e) => onChange("backgroundColor", e.target.value)}
              className="h-10 w-20 cursor-pointer border-[var(--admin-border)] bg-[var(--admin-bg)] p-1"
            />
            <Input
              value={formData.backgroundColor}
              onChange={(e) => onChange("backgroundColor", e.target.value)}
              placeholder="#fafafa"
              className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)]"
            />
          </div>
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
                  <Label className="text-sm font-medium text-[var(--admin-text)]">
                    Couleur 1
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={gradientConfig.color1}
                      onChange={(e) =>
                        onGradientConfigChange("color1", e.target.value)
                      }
                      className="h-10 w-14 cursor-pointer border-[var(--admin-border)] bg-[var(--admin-bg)] p-1"
                    />
                    <Input
                      value={gradientConfig.color1}
                      onChange={(e) =>
                        onGradientConfigChange("color1", e.target.value)
                      }
                      className="flex-1 border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[var(--admin-text)]">
                    Couleur 2
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={gradientConfig.color2}
                      onChange={(e) =>
                        onGradientConfigChange("color2", e.target.value)
                      }
                      className="h-10 w-14 cursor-pointer border-[var(--admin-border)] bg-[var(--admin-bg)] p-1"
                    />
                    <Input
                      value={gradientConfig.color2}
                      onChange={(e) =>
                        onGradientConfigChange("color2", e.target.value)
                      }
                      className="flex-1 border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[var(--admin-text)]">
                  Direction
                </Label>
                <Select
                  value={gradientConfig.direction}
                  onValueChange={(value) =>
                    onGradientConfigChange("direction", value)
                  }
                >
                  <SelectTrigger className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]">
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
            URL de l'image
          </Label>
          <Input
            id="backgroundImage"
            value={formData.backgroundImage}
            onChange={(e) => onChange("backgroundImage", e.target.value)}
            placeholder="https://..."
            className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)]"
          />
        </div>
      )}
    </div>
  );
}
