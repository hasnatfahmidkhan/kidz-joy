const ProductCardSkeleton = () => (
  <div className="bg-base-100 rounded-2xl border border-base-200 overflow-hidden flex flex-col animate-pulse">
    {/* Image */}
    <div className="aspect-square bg-base-300 w-full" />

    {/* Info */}
    <div className="p-4 flex flex-col gap-3 flex-1">
      {/* Category */}
      <div className="h-2.5 w-16 bg-base-300 rounded-full" />
      {/* Title */}
      <div className="space-y-2">
        <div className="h-3.5 w-full bg-base-300 rounded-full" />
        <div className="h-3.5 w-3/4 bg-base-300 rounded-full" />
      </div>
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 bg-base-300 rounded-full" />
        <div className="h-3 w-8 bg-base-300 rounded-full" />
        <div className="h-3 w-12 bg-base-300 rounded-full" />
      </div>
      {/* Price + Cart */}
      <div className="flex items-center justify-between pt-3 mt-auto border-t border-base-200">
        <div className="space-y-1.5">
          <div className="h-4 w-16 bg-base-300 rounded-full" />
          <div className="h-3 w-12 bg-base-300 rounded-full" />
        </div>
        <div className="w-9 h-9 bg-base-300 rounded-full" />
      </div>
    </div>
  </div>
);

// Sidebar Skeleton
const SidebarSkeleton = () => (
  <div className="bg-base-100 border border-base-200 rounded-2xl p-5 animate-pulse">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="h-5 w-16 bg-base-300 rounded-full" />
    </div>

    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-3">
        <div className="h-3 w-20 bg-base-300 rounded-full" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-full bg-base-300 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="divider my-0" />

      {/* Price Range */}
      <div className="space-y-3">
        <div className="h-3 w-24 bg-base-300 rounded-full" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-full bg-base-300 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="divider my-0" />

      {/* Rating */}
      <div className="space-y-3">
        <div className="h-3 w-14 bg-base-300 rounded-full" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-9 w-full bg-base-300 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="divider my-0" />

      {/* Toggle */}
      <div className="flex items-center justify-between px-1">
        <div className="h-4 w-24 bg-base-300 rounded-full" />
        <div className="h-6 w-11 bg-base-300 rounded-full" />
      </div>
    </div>
  </div>
);

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Page Header ── */}
      <div className="mb-8 space-y-2 animate-pulse">
        <div className="h-3.5 w-24 bg-base-300 rounded-full" />
        <div className="h-8 w-20 bg-base-300 rounded-full" />
      </div>

      {/* ── Search Bar ── */}
      <div className="mb-6 animate-pulse">
        <div className="h-12 w-full bg-base-300 rounded-2xl" />
      </div>

      {/* ── Mobile: Filter + Sort row ── */}
      <div className="flex items-center gap-3 mb-5 lg:hidden animate-pulse">
        <div className="h-9 w-24 bg-base-300 rounded-xl" />
        <div className="h-9 w-36 bg-base-300 rounded-xl" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sidebar skeleton — desktop only ── */}
        <div className="hidden lg:block w-60 shrink-0">
          <SidebarSkeleton />
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0">
          {/* Sort row */}
          <div className="hidden lg:flex items-center justify-between mb-4 animate-pulse">
            <div className="h-4 w-48 bg-base-300 rounded-full" />
            <div className="h-9 w-44 bg-base-300 rounded-xl" />
          </div>

          {/* Count */}
          <div className="h-3.5 w-44 bg-base-300 rounded-full mb-4 animate-pulse" />

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-9 h-9 bg-base-300 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
