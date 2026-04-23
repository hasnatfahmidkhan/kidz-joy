import FilterSidebar from "@/components/shop/FilterSidebar";
import MobileFilterDrawer from "@/components/shop/MobileFilterDrawer";
import SortDropdown from "@/components/shop/SortDropdown";
import ActiveFilterTags from "@/components/shop/ActiveFilterTags";
import ProductGrid from "@/components/shop/ProductGrid";
import Pagination from "@/components/shop/Pagination";
import ShopSearchBar from "@/components/shop/ShopSearchBar";
import { getShopProducts } from "@/action/server/getProducts";
import SectionHeader from "@/components/shared/SectionHeader";

const LIMIT = 12;

// ── Dynamic SEO based on active filters ──
export const generateMetadata = async ({ searchParams }) => {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const page = params.page;

  // build dynamic title
  let title = "Shop All Toys";
  if (search) title = `Search results for "${search}"`;
  else if (category)
    title = `${category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")} Toys`;

  const fullTitle = `${title} | Kidz Joy`;
  const pageStr = page ? ` — Page ${page}` : "";
  const canonicalParams = new URLSearchParams();
  if (category) canonicalParams.set("category", category);
  if (page) canonicalParams.set("page", page);
  const canonicalQuery = canonicalParams.toString();

  return {
    title: `${fullTitle}${pageStr}`,
    description: search
      ? `Find toys matching "${search}" at Kidz Joy. Safe, fun and educational toys for children aged 3–12.`
      : category
        ? `Browse our ${category.replace("-", " ")} collection at Kidz Joy. Safe, high quality and fun toys for kids.`
        : "Browse our full collection of safe, educational and fun toys for kids aged 3–12. Filter by category, price, rating and more.",
    keywords: [
      "buy kids toys online",
      "educational toys",
      "safe toys for children",
      category && `${category} toys`,
      search && search,
      "kidz joy shop",
      "toys Bangladesh",
    ].filter(Boolean),
    openGraph: {
      title: fullTitle,
      description:
        "Browse our full collection of safe, fun and educational toys for children.",
      url: `https://kidz-joy.vercel.app/shop${canonicalQuery ? `?${canonicalQuery}` : ""}`,
      siteName: "Kidz Joy",
      images: [
        {
          url: "https://kidz-joy.vercel.app/og-shop.png",
          width: 1200,
          height: 630,
          alt: "Kidz Joy Shop — Toys for Kids",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description:
        "Browse safe, fun and educational toys for kids at Kidz Joy.",
      images: ["https://kidz-joy.vercel.app/og-shop.png"],
    },
    alternates: {
      canonical: `https://kidz-joy.vercel.app/shop${canonicalQuery ? `?${canonicalQuery}` : ""}`,
    },
  };
};

const buildQuery = (searchParams) => {
  const query = {};
  if (searchParams.category) query.category = searchParams.category;
  if (searchParams.discount === "true") query.discount = { $gt: 0 };
  if (searchParams.rating)
    query.ratings = { $gte: Number(searchParams.rating) };
  if (searchParams.price_min || searchParams.price_max) {
    query.price = {};
    if (searchParams.price_min)
      query.price.$gte = Number(searchParams.price_min);
    if (searchParams.price_max)
      query.price.$lte = Number(searchParams.price_max);
  }
  if (searchParams.search)
    query.title = { $regex: searchParams.search, $options: "i" };
  return query;
};

const buildSort = (sortParam) => {
  switch (sortParam) {
    case "newest":
      return { createdAt: -1 };
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "rating":
      return { ratings: -1 };
    default:
      return { sold: -1 };
  }
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * LIMIT;
  const query = buildQuery(params);
  const sort = buildSort(params.sort);

  const { products, totalCount } = await getShopProducts({
    query,
    sort,
    limit: LIMIT,
    skip,
  });

  const totalPages = Math.ceil(totalCount / LIMIT);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Page Header ── */}
      <SectionHeader title={"Shop"} subtitle={"All Products"} />

      {/* ── Search Bar ── */}
      <div className="mb-6">
        <ShopSearchBar />
      </div>

      {/* ── Mobile: Filter + Sort row ── */}
      <div className="flex items-center gap-3 mb-5 lg:hidden">
        <MobileFilterDrawer />
        <SortDropdown />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sidebar — desktop only ── */}
        <div className="hidden lg:block w-60 shrink-0">
          <div className="bg-base-100 border border-base-200 rounded-2xl p-5 sticky top-0">
            <FilterSidebar />
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0">
          {/* Desktop: Sort + Active Tags */}
          <div className="hidden lg:flex items-start justify-between gap-4 mb-4">
            <ActiveFilterTags />
            <div className="shrink-0">
              <SortDropdown />
            </div>
          </div>

          {/* Mobile: Active Tags */}
          <div className="lg:hidden mb-4">
            <ActiveFilterTags />
          </div>

          {/* Products */}
          <ProductGrid
            products={products}
            totalCount={totalCount}
            currentPage={currentPage}
            limit={LIMIT}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={new URLSearchParams(
              Object.entries(params)
                .filter(([k]) => k !== "page")
                .map(([k, v]) => [k, String(v)]),
            ).toString()}
          />
        </div>
      </div>
    </div>
  );
}
