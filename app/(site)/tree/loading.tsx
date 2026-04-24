export default function TreeLoading() {
  return (
    <main className="relative h-full flex flex-col items-center justify-start px-4 pt-20 sm:pt-0 overflow-hidden">
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-4 sm:gap-6 animate-pulse">
        <div className="w-24 h-24 rounded-full bg-primary/10" />
        <div className="w-48 h-6 bg-primary/10 rounded" />
        <div className="w-32 h-4 bg-primary/10 rounded" />
        <div className="w-full space-y-3 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              key={i}
              className="h-14 bg-primary/10 rounded-xl"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
