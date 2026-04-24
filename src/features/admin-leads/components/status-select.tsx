"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import type { LeadStatus } from "@/src/entities/lead/api";
import { statusConfig } from "@/src/features/admin-leads/components/lead-status-config";

interface StatusSelectProps {
  leadId: string;
  currentStatus: LeadStatus | null;
  onUpdate: (id: string, updates: { status: LeadStatus }) => Promise<void>;
}

export function StatusSelect({
  leadId,
  currentStatus,
  onUpdate,
}: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const status = currentStatus || "new";
  const config = statusConfig[status];

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  const handleSelect = async (newStatus: LeadStatus) => {
    setIsOpen(false);
    if (newStatus !== status) {
      try {
        await onUpdate(leadId, { status: newStatus });
        toast.success("Statut mis à jour");
      } catch {
        toast.error("Erreur lors de la mise à jour");
      }
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.color}`}
      >
        {config.label}
        <ChevronDown className="h-3 w-3" />
      </button>
      {isOpen &&
        createPortal(
          <>
            <button
              type="button"
              aria-label="Fermer"
              className="fixed inset-0 z-50 cursor-default"
              onClick={() => setIsOpen(false)}
            />
            <div
              style={{ top: position.top, left: position.left }}
              className="fixed z-50 w-32 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] py-1 shadow-lg"
            >
              {(Object.keys(statusConfig) as LeadStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSelect(s)}
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-xs hover:bg-[var(--admin-bg-elevated)] ${statusConfig[s].color}`}
                >
                  {statusConfig[s].label}
                  {s === status && <Check className="h-3 w-3" />}
                </button>
              ))}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
