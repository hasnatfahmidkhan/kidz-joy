import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const SectionHeader = ({
  subtitle,
  title,
  viewAllHref,
  viewAllLabel = "View All",
}) => {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {subtitle && (
          <p className="text-primary font-semibold text-sm mb-1">{subtitle}</p>
        )}
        <h2 className="text-2xl sm:text-3xl font-black text-neutral">
          {title}
        </h2>
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
        >
          {viewAllLabel}
          <FiArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
