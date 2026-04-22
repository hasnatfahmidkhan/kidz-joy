import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  GiRocketFlight,
  GiPuzzle,
  GiBearHead,
  GiRobotGolem,
  GiPaintBrush,
  GiSoccerBall,
  GiBrickWall,
  GiCardboardBox,
} from "react-icons/gi";
import SectionHeader from "../shared/SectionHeader";

const categories = [
  {
    id: 1,
    label: "Action Figures",
    slug: "action-figures",
    icon: GiRobotGolem,
    bg: "bg-orange-50",
    iconColor: "text-orange-400",
    border: "border-orange-100",
    hoverBorder: "hover:border-orange-300",
    count: 42,
  },
  {
    id: 2,
    label: "Puzzles",
    slug: "puzzles",
    icon: GiPuzzle,
    bg: "bg-purple-50",
    iconColor: "text-purple-400",
    border: "border-purple-100",
    hoverBorder: "hover:border-purple-300",
    count: 35,
  },
  {
    id: 3,
    label: "Stuffed Toys",
    slug: "stuffed-toys",
    icon: GiBearHead,
    bg: "bg-pink-50",
    iconColor: "text-pink-400",
    border: "border-pink-100",
    hoverBorder: "hover:border-pink-300",
    count: 58,
  },
  {
    id: 4,
    label: "Building Blocks",
    slug: "building-blocks",
    icon: GiBrickWall,
    bg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    border: "border-yellow-100",
    hoverBorder: "hover:border-yellow-300",
    count: 27,
  },
  {
    id: 5,
    label: "Space & Science",
    slug: "space-science",
    icon: GiRocketFlight,
    bg: "bg-blue-50",
    iconColor: "text-blue-400",
    border: "border-blue-100",
    hoverBorder: "hover:border-blue-300",
    count: 19,
  },
  {
    id: 6,
    label: "Outdoor Toys",
    slug: "outdoor",
    icon: GiSoccerBall,
    bg: "bg-green-50",
    iconColor: "text-green-500",
    border: "border-green-100",
    hoverBorder: "hover:border-green-300",
    count: 31,
  },
  {
    id: 7,
    label: "Arts & Crafts",
    slug: "arts-crafts",
    icon: GiPaintBrush,
    bg: "bg-rose-50",
    iconColor: "text-rose-400",
    border: "border-rose-100",
    hoverBorder: "hover:border-rose-300",
    count: 44,
  },
  {
    id: 8,
    label: "Mystery Box",
    slug: "mystery-box",
    icon: GiCardboardBox,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    border: "border-amber-100",
    hoverBorder: "hover:border-amber-300",
    count: 12,
  },
];

const CategorySection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* ── Section Header ── */}
      <SectionHeader
        subtitle="What are you looking for?"
        title="Shop by Category"
        viewAllHref="/categories"
      />
      
      {/* ── Category Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 ${cat.bg} ${cat.border} ${cat.hoverBorder} hover:shadow-md transition-all duration-200`}
            >
              {/* Icon Box */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={32} className={cat.iconColor} />
              </div>

              {/* Label & Count */}
              <div className="text-center">
                <p className="font-bold text-neutral text-sm leading-tight">
                  {cat.label}
                </p>
                <p className="text-neutral/50 text-xs mt-0.5">
                  {cat.count} items
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All — mobile */}
      <div className="flex justify-center mt-6 sm:hidden">
        <Link
          href="/categories"
          className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white hover:border-primary rounded-xl px-8 btn-sm"
        >
          View All Categories
          <FiArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
