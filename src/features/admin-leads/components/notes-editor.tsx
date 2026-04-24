"use client";

import { Check, Loader2, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NotesEditorProps {
  leadId: string;
  currentNotes: string | null;
  onUpdate: (id: string, updates: { notes: string }) => Promise<void>;
}

export function NotesEditor({
  leadId,
  currentNotes,
  onUpdate,
}: NotesEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(currentNotes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (notes === (currentNotes || "")) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await onUpdate(leadId, { notes });
      toast.success("Notes mises à jour");
      setIsEditing(false);
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    const inputId = `notes-${leadId}`;
    return (
      <div className="flex items-center gap-2">
        <label htmlFor={inputId} className="sr-only">
          Note pour ce lead
        </label>
        <input
          id={inputId}
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className="w-32 rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-2 py-1 text-xs"
          placeholder="Ajouter une note..."
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded p-1 text-[var(--admin-accent)] hover:bg-[var(--admin-accent-muted)]"
        >
          {isSaving ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setNotes(currentNotes || "");
            setIsEditing(false);
          }}
          className="rounded p-1 text-[var(--admin-text-muted)] hover:bg-[var(--admin-bg-elevated)]"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="flex items-center gap-1 text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
    >
      <MessageSquare className="h-3 w-3" />
      {currentNotes ? (
        <span className="max-w-[100px] truncate">{currentNotes}</span>
      ) : (
        <span className="italic">Ajouter</span>
      )}
    </button>
  );
}
