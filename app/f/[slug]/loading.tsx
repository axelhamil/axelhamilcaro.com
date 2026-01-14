export default function FormLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-pulse">
          <div className="w-24 h-6 bg-white/20 rounded-full mb-6" />
          <div className="w-3/4 h-8 bg-white/20 rounded mb-4" />
          <div className="w-full h-4 bg-white/20 rounded mb-8" />
          <div className="space-y-4">
            <div className="h-12 bg-white/20 rounded-lg" />
            <div className="h-12 bg-white/20 rounded-lg" />
            <div className="h-12 bg-white/20 rounded-lg" />
          </div>
          <div className="h-12 bg-white/20 rounded-lg mt-6" />
        </div>
      </div>
    </div>
  );
}
