import { FiStar } from "react-icons/fi";
import SectionHeader from "@/components/shared/SectionHeader";

// 🔁 Replace with DB data later
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Mom of 2",
    avatar: "SM",
    avatarBg: "bg-pink-100",
    avatarColor: "text-pink-500",
    rating: 5,
    review:
      "My kids absolutely love everything from KidzJoy! The toys are sturdy, safe, and keep them entertained for hours.",
  },
  {
    id: 2,
    name: "James T.",
    role: "Dad of 3",
    avatar: "JT",
    avatarBg: "bg-blue-100",
    avatarColor: "text-blue-500",
    rating: 5,
    review:
      "Super fast delivery and great packaging. The puzzle sets are fantastic for family game nights. Highly recommend!",
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Mom of 1",
    avatar: "ER",
    avatarBg: "bg-purple-100",
    avatarColor: "text-purple-500",
    rating: 4,
    review:
      "Amazing quality for the price. My daughter hasn't put down her stuffed bear since it arrived. Will order again!",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={14}
        className={
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-base-300 fill-base-300"
        }
      />
    ))}
  </div>
);

const Testimonials = ({ testimonials: data = testimonials }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <SectionHeader subtitle="What parents say" title="Happy Families 💛" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-4 p-6 rounded-2xl bg-base-100 border border-base-200 hover:shadow-md transition-all duration-200"
          >
            {/* Rating */}
            <StarRating rating={t.rating} />

            {/* Review */}
            <p className="text-neutral/65 text-sm leading-relaxed flex-1">
              &ldquo;{t.review}&rdquo;
            </p>

            {/* Reviewer */}
            <div className="flex items-center gap-3 pt-2 border-t border-base-200">
              <div
                className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-sm ${t.avatarColor} shrink-0`}
              >
                {t.avatar}
              </div>
              <div>
                <p className="font-bold text-neutral text-sm">{t.name}</p>
                <p className="text-neutral/45 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
