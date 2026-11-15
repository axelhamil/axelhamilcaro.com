import { cn } from "@/lib/utils";

interface TerminalBlockProps {
  lines: { prefix?: string; text: string; delay?: number }[];
  className?: string;
}

export function TerminalBlock({ lines, className }: TerminalBlockProps) {
  return (
    <div className={cn("terminal overflow-hidden", className)}>
      <div className="terminal-barre px-4 py-2">terminal</div>
      <div className="p-4 space-y-1">
        {lines.map((line) => (
          <div
            key={`${line.prefix ?? ""}${line.text}`}
            className="terminal-ligne flex items-center gap-2"
          >
            {line.prefix && (
              <span className="terminal-prefixe">{line.prefix}</span>
            )}
            <span>{line.text}</span>
          </div>
        ))}
        <div className="terminal-ligne flex items-center gap-2">
          <span className="terminal-prefixe">$</span>
          <span className="terminal-curseur" />
        </div>
      </div>
    </div>
  );
}
