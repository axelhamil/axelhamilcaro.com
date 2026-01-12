"use client";

import type { Form, FormTemplate } from "@/app/_lib/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  type BackgroundType,
  type FormData,
  type GradientConfig,
  type GradientMode,
  defaultFormData,
} from "../types";

function parseGradient(gradient: string): GradientConfig {
  const match = gradient.match(
    /linear-gradient\(([^,]+),\s*([^\s]+)\s+\d+%,\s*([^\s]+)\s+\d+%\)/
  );
  if (match) {
    return {
      direction: match[1],
      color1: match[2],
      color2: match[3],
    };
  }
  return { direction: "135deg", color1: "#ff4d00", color2: "#ff6b35" };
}

function buildGradient(config: GradientConfig): string {
  return `linear-gradient(${config.direction}, ${config.color1} 0%, ${config.color2} 100%)`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .replace(/-+/g, "-");
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 2;
}

export function useFormEditor(form?: Form, templates: FormTemplate[] = []) {
  const router = useRouter();
  const isEditing = !!form;

  const [formData, setFormData] = useState<FormData>(() => {
    if (form) {
      return {
        slug: form.slug,
        backgroundType: (form.backgroundType as BackgroundType) || "color",
        backgroundColor: form.backgroundColor || "#fafafa",
        backgroundGradient:
          form.backgroundGradient ||
          "linear-gradient(135deg, #ff4d00 0%, #ff6b35 100%)",
        backgroundImage: form.backgroundImage || "",
        cardImage: form.cardImage || "",
        badgeText: form.badgeText || "",
        badgeColor: form.badgeColor || "#ff4d00",
        title: form.title,
        description: form.description || "",
        buttonText: form.buttonText,
        isActive: form.isActive ?? true,
      };
    }
    return defaultFormData;
  });

  const [gradientMode, setGradientMode] = useState<GradientMode>("visual");
  const [gradientConfig, setGradientConfig] = useState<GradientConfig>(() =>
    parseGradient(formData.backgroundGradient)
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      if (field === "title" && !isEditing && !prev.slug) {
        newData.slug = slugify(value as string);
      }

      if (field === "slug") {
        newData.slug = slugify(value as string);
      }

      return newData;
    });
  };

  const slugError = formData.slug && !isValidSlug(formData.slug)
    ? "Le slug doit contenir au moins 2 caractères (lettres, chiffres, tirets)"
    : null;

  const handleGradientConfigChange = (
    field: keyof GradientConfig,
    value: string
  ) => {
    const newConfig = { ...gradientConfig, [field]: value };
    setGradientConfig(newConfig);
    handleChange("backgroundGradient", buildGradient(newConfig));
  };

  const handleGradientCssChange = (value: string) => {
    handleChange("backgroundGradient", value);
    setGradientConfig(parseGradient(value));
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template && template.config) {
      const config = template.config as Partial<FormData>;
      setFormData((prev) => ({
        ...prev,
        ...config,
        slug: prev.slug,
      }));
      if (config.backgroundGradient) {
        setGradientConfig(parseGradient(config.backgroundGradient));
      }
      toast.success("Template chargé");
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) return;

    setIsSavingTemplate(true);
    try {
      const { slug, isActive, ...config } = formData;

      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: templateName,
          config,
        }),
      });

      if (response.ok) {
        toast.success("Template sauvegardé");
        setTemplateName("");
        router.refresh();
      } else {
        toast.error("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error("Failed to save template:", error);
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidSlug(formData.slug)) {
      toast.error("Le slug n'est pas valide");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setIsSaving(true);

    try {
      const url = isEditing ? `/api/forms/${form.id}` : "/api/forms";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isEditing ? "Formulaire mis à jour" : "Formulaire créé");
        router.push("/admin/forms");
        router.refresh();
      } else {
        toast.error(data.error || "Erreur lors de la sauvegarde");
      }
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
      console.error("Failed to save form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getBackgroundStyle = () => {
    switch (formData.backgroundType) {
      case "image":
        return {
          backgroundImage: `url(${formData.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      case "gradient":
        return { background: formData.backgroundGradient };
      default:
        return { backgroundColor: formData.backgroundColor };
    }
  };

  return {
    formData,
    isEditing,
    isSaving,
    isSavingTemplate,
    templateName,
    gradientMode,
    gradientConfig,
    slugError,
    templates,
    setTemplateName,
    setGradientMode,
    handleChange,
    handleGradientConfigChange,
    handleGradientCssChange,
    loadTemplate,
    handleSaveTemplate,
    handleSubmit,
    getBackgroundStyle,
  };
}
