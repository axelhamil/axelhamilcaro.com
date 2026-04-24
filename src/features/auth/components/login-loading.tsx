export function LoginLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-background animate-pulse mb-6" />
        <div className="h-10 bg-secondary-background rounded-lg w-48 mx-auto animate-pulse" />
        <div className="h-5 bg-secondary-background rounded w-64 mx-auto mt-3 animate-pulse" />
      </div>
      <div className="bg-primary-background border border-border rounded-2xl p-8">
        <div className="h-14 bg-secondary-background rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
