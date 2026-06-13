import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  GiPuzzle,
  GiCardboardBox,
  GiRocketFlight,
  GiBearFace,
} from "react-icons/gi";
import { MdOutlineSchool } from "react-icons/md";
import SectionHeader from "@/components/shared/SectionHeader";
import { getCategoryCounts } from "@/lib/db/getCategoryCounts";

const categories = [
  {
    id: 1,
    label: "Educational",
    slug: "educational",
    icon: MdOutlineSchool,
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    border: "border-blue-100",
    hover: "hover:border-blue-300",
  },
  {
    id: 2,
    label: "Flashcards",
    slug: "flashcards",
    icon: GiCardboardBox,
    bg: "bg-pink-50",
    iconColor: "text-pink-500",
    border: "border-pink-100",
    hover: "hover:border-pink-300",
  },
  {
    id: 3,
    label: "Puzzles",
    slug: "puzzles",
    icon: GiPuzzle,
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
    border: "border-purple-100",
    hover: "hover:border-purple-300",
  },
  {
    id: 4,
    label: "Costumes",
    slug: "costumes",
    icon: GiBearFace,
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    border: "border-yellow-100",
    hover: "hover:border-yellow-300",
  },
  {
    id: 5,
    label: "STEM Toys",
    slug: "stem-toys",
    icon: GiRocketFlight,
    bg: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-green-100",
    hover: "hover:border-green-300",
  },
];

const CategorySection = async () => {
  // ── Fetch real counts from DB ──
  const counts = await getCategoryCounts();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <SectionHeader
        subtitle="What are you looking for?"
        title="Shop by Category"
        viewAllHref="/categories"
      />

      {/* ── Category Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const count = counts[cat.slug] || 0;

          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 ${cat.bg} ${cat.border} ${cat.hover} hover:shadow-md transition-all duration-200`}
            >
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Icon size={32} className={cat.iconColor} />
              </div>

              {/* Label + Count */}
              <div className="text-center">
                <p className="font-bold text-neutral text-sm leading-tight">
                  {cat.label}
                </p>
                <p className="text-neutral/50 text-xs mt-0.5">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── View All — mobile only ── */}
      <div className="flex justify-center mt-6 sm:hidden">
        <Link
          href="/categories"
          className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-8 btn-sm gap-2"
        >
          View All Categories
          <FiArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
