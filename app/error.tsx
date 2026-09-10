"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <p className="text-white text-lg font-medium">
          Something went wrong loading RWA data.
        </p>
        <p className="text-white/50 text-sm max-w-md">
          {error.message || "The data source may be temporarily unavailable."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500 text-blue-400 text-sm hover:bg-blue-500/30 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
