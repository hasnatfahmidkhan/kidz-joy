export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* ── LEFT: Image Skeleton ── */}
        <div className="flex-1">
          <div className="sticky top-24">
            {/* Main image box */}
            <div className="aspect-square rounded-3xl bg-base-300 w-full" />
          </div>
        </div>

        {/* ── RIGHT: Info Skeleton ── */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2">
            <div className="h-3 w-10 bg-base-300 rounded-full" />
            <div className="h-3 w-2 bg-base-300 rounded-full" />
            <div className="h-3 w-10 bg-base-300 rounded-full" />
            <div className="h-3 w-2 bg-base-300 rounded-full" />
            <div className="h-3 w-24 bg-base-300 rounded-full" />
          </div>

          {/* Title */}
          <div className="space-y-2.5">
            <div className="h-7 w-full bg-base-300 rounded-full" />
            <div className="h-7 w-4/5 bg-base-300 rounded-full" />
          </div>

          {/* Bangla title */}
          <div className="h-5 w-3/5 bg-base-300 rounded-full" />

          {/* Ratings row */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-5 h-5 bg-base-300 rounded" />
              ))}
            </div>
            <div className="h-3 w-px bg-base-300" />
            <div className="h-4 w-20 bg-base-300 rounded-full" />
            <div className="h-3 w-px bg-base-300" />
            <div className="h-4 w-16 bg-base-300 rounded-full" />
          </div>

          {/* Pricing block */}
          <div className="bg-base-200/50 p-6 rounded-2xl space-y-3">
            <div className="flex items-baseline gap-4">
              <div className="h-10 w-28 bg-base-300 rounded-full" />
              <div className="h-6 w-20 bg-base-300 rounded-full" />
            </div>
            <div className="h-3 w-36 bg-base-300 rounded-full" />
          </div>

          {/* Info bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-base-300 shrink-0" />
                <div className="h-3.5 bg-base-300 rounded-full flex-1" />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-14 flex-1 bg-base-300 rounded-2xl" />
            <div className="h-14 flex-1 bg-base-300 rounded-2xl" />
            <div className="h-14 w-14 bg-base-300 rounded-2xl shrink-0" />
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 border-t border-base-200 pt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-7 h-7 bg-base-300 rounded-full" />
                <div className="h-2.5 w-16 bg-base-300 rounded-full" />
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-14 w-full bg-base-300 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
