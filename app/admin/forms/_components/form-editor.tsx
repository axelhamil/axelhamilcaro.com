"use client";

import type { Form, FormTemplate } from "@/app/_lib/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormEditorProps {
  form?: Form;
  templates?: FormTemplate[];
}

type BackgroundType = "color" | "gradient" | "image";

interface FormData {
  slug: string;
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage: string;
  cardImage: string;
  badgeText: string;
  title: string;
  description: string;
  buttonText: string;
  emailSubject: string;
  emailBody: string;
  emailTo: string;
  isActive: boolean;
}

const defaultFormData: FormData = {
  slug: "",
  backgroundType: "color",
  backgroundColor: "#fafafa",
  backgroundGradient: "linear-gradient(135deg, #ff4d00 0%, #ff6b35 100%)",
  backgroundImage: "",
  cardImage: "",
  badgeText: "",
  title: "",
  description: "",
  buttonText: "Envoyer",
  emailSubject: "Nouveau lead: {{firstName}}",
  emailBody: `<h1>Nouveau lead !</h1>
<p><strong>Prénom:</strong> {{firstName}}</p>
<p><strong>Email:</strong> {{email}}</p>`,
  emailTo: "",
  isActive: true,
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function FormEditor({ form, templates = [] }: FormEditorProps) {
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
        title: form.title,
        description: form.description || "",
        buttonText: form.buttonText,
        emailSubject: form.emailSubject,
        emailBody: form.emailBody,
        emailTo: form.emailTo,
        isActive: form.isActive ?? true,
      };
    }
    return defaultFormData;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      if (field === "title" && !isEditing && !prev.slug) {
        newData.slug = generateSlug(value as string);
      }

      return newData;
    });
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
        setTemplateName("");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to save template:", error);
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = isEditing ? `/api/forms/${form.id}` : "/api/forms";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/forms");
        router.refresh();
      }
    } catch (error) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Modifier le formulaire" : "Nouveau formulaire"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Modifie les paramètres de ton formulaire"
              : "Crée un nouveau formulaire de capture"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Actif</Label>
          </div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      {templates.length > 0 && !isEditing && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Charger un template</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={loadTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionne un template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="background">Fond</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/f/</span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    placeholder="mon-formulaire"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardImage">Image de la carte (URL)</Label>
                <Input
                  id="cardImage"
                  value={formData.cardImage}
                  onChange={(e) => handleChange("cardImage", e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="badgeText">Badge</Label>
                <Input
                  id="badgeText"
                  value={formData.badgeText}
                  onChange={(e) => handleChange("badgeText", e.target.value)}
                  placeholder="Offre limitée"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Inscris-toi maintenant"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Reçois les dernières actualités..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonText">Texte du bouton</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => handleChange("buttonText", e.target.value)}
                  placeholder="Envoyer"
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="background" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Type de fond</Label>
                <Select
                  value={formData.backgroundType}
                  onValueChange={(value: BackgroundType) =>
                    handleChange("backgroundType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="color">Couleur unie</SelectItem>
                    <SelectItem value="gradient">Dégradé</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.backgroundType === "color" && (
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Couleur</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="backgroundColor"
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        handleChange("backgroundColor", e.target.value)
                      }
                      className="h-10 w-20 cursor-pointer p-1"
                    />
                    <Input
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        handleChange("backgroundColor", e.target.value)
                      }
                      placeholder="#fafafa"
                    />
                  </div>
                </div>
              )}

              {formData.backgroundType === "gradient" && (
                <div className="space-y-2">
                  <Label htmlFor="backgroundGradient">CSS Gradient</Label>
                  <Textarea
                    id="backgroundGradient"
                    value={formData.backgroundGradient}
                    onChange={(e) =>
                      handleChange("backgroundGradient", e.target.value)
                    }
                    placeholder="linear-gradient(135deg, #ff4d00 0%, #ff6b35 100%)"
                    rows={2}
                  />
                </div>
              )}

              {formData.backgroundType === "image" && (
                <div className="space-y-2">
                  <Label htmlFor="backgroundImage">URL de l'image</Label>
                  <Input
                    id="backgroundImage"
                    value={formData.backgroundImage}
                    onChange={(e) =>
                      handleChange("backgroundImage", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="email" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="emailTo">Email destinataire</Label>
                <Input
                  id="emailTo"
                  type="email"
                  value={formData.emailTo}
                  onChange={(e) => handleChange("emailTo", e.target.value)}
                  placeholder="ton@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailSubject">Sujet de l'email</Label>
                <Input
                  id="emailSubject"
                  value={formData.emailSubject}
                  onChange={(e) => handleChange("emailSubject", e.target.value)}
                  placeholder="Nouveau lead: {{firstName}}"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Variables : {"{{firstName}}"}, {"{{email}}"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailBody">Corps de l'email (HTML)</Label>
                <Textarea
                  id="emailBody"
                  value={formData.emailBody}
                  onChange={(e) => handleChange("emailBody", e.target.value)}
                  placeholder="<h1>Nouveau lead</h1>..."
                  rows={8}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Variables : {"{{firstName}}"}, {"{{email}}"}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sauvegarder comme template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Nom du template"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveTemplate}
                  disabled={!templateName.trim() || isSavingTemplate}
                >
                  {isSavingTemplate ? "..." : "Sauvegarder"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Aperçu</h2>
          <div
            className="flex min-h-[500px] items-center justify-center rounded-lg border p-4"
            style={getBackgroundStyle()}
          >
            <Card className="w-full max-w-lg">
              <CardContent className="flex gap-6 p-6">
                {formData.cardImage && (
                  <div className="hidden w-32 shrink-0 md:block">
                    <img
                      src={formData.cardImage}
                      alt=""
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  {formData.badgeText && (
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {formData.badgeText}
                    </span>
                  )}
                  {formData.title && (
                    <h1 className="text-2xl font-bold">{formData.title}</h1>
                  )}
                  {formData.description && (
                    <p className="text-sm text-muted-foreground">
                      {formData.description}
                    </p>
                  )}
                  <div className="space-y-3">
                    <Input placeholder="Prénom" disabled />
                    <Input placeholder="Email" disabled />
                    <Button className="w-full" disabled>
                      {formData.buttonText || "Envoyer"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
