"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface FormFilterProps {
  forms: { id: string; title: string }[];
  currentFormId?: string;
}

export function FormFilter({ forms, currentFormId }: FormFilterProps) {
  const router = useRouter();

  const handleChange = (value: string) => {
    if (value === "all") {
      router.push("/admin/leads");
    } else {
      router.push(`/admin/leads?formId=${value}`);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">Filtrer par formulaire:</span>
      <Select value={currentFormId || "all"} onValueChange={handleChange}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Tous les formulaires" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les formulaires</SelectItem>
          {forms.map((form) => (
            <SelectItem key={form.id} value={form.id}>
              {form.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
