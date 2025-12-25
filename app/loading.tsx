export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="h-16 bg-white/10 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-96 mx-auto mb-8 animate-pulse"></div>
          <div className="h-12 bg-white/10 rounded-full w-full max-w-2xl mx-auto mb-8 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Current Weather Skeleton */}
          <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-pulse">
            <div className="h-64"></div>
          </div>

          {/* Chart Skeleton */}
          <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-pulse">
            <div className="h-80"></div>
          </div>

          {/* Forecast Skeleton */}
          <div className="w-full">
            <div className="h-8 bg-white/10 rounded-lg w-48 mb-6 animate-pulse"></div>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 animate-pulse"
                >
                  <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
                  <div className="h-16 bg-white/20 rounded mb-3"></div>
                  <div className="h-3 bg-white/20 rounded w-full mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-white/20 rounded w-12"></div>
                    <div className="h-6 bg-white/20 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

