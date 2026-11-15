const SQUELETTES = ["un", "deux", "trois", "quatre", "cinq"] as const;

export default function TreeLoading() {
  return (
    <div className="trame pleine-largeur min-h-[calc(100svh-var(--nav-h))]">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-10">
        <div className="flex items-center gap-5">
          <div className="squelette w-20 h-20 sm:w-24 sm:h-24 shrink-0" />
          <div className="flex flex-col gap-3 flex-1">
            <div className="squelette h-8 w-48 max-w-full" />
            <div className="squelette h-4 w-32" />
          </div>
        </div>
        <div className="flex flex-col gap-4 pr-2">
          {SQUELETTES.map((cle) => (
            <div key={cle} className="squelette h-16" />
          ))}
        </div>
      </div>
    </div>
  );
}
