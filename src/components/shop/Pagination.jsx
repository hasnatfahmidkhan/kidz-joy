import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, searchParams }) => {
  if (totalPages <= 1) return null;

  const buildHref = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    return `/shop?${params.toString()}`;
  };

  // ── Build page number array with ellipsis ──
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-base-300 hover:border-primary hover:text-primary transition-all duration-150"
        >
          <FiChevronLeft size={16} />
        </Link>
      ) : (
        <span className="w-9 h-9 flex items-center justify-center rounded-xl border border-base-200 text-neutral/20 cursor-not-allowed">
          <FiChevronLeft size={16} />
        </span>
      )}

      {/* Pages */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-neutral/30 font-bold"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-150
              ${
                page === currentPage
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "border border-base-300 text-neutral hover:border-primary hover:text-primary"
              }`}
          >
            {page}
          </Link>
        ),
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-base-300 hover:border-primary hover:text-primary transition-all duration-150"
        >
          <FiChevronRight size={16} />
        </Link>
      ) : (
        <span className="w-9 h-9 flex items-center justify-center rounded-xl border border-base-200 text-neutral/20 cursor-not-allowed">
          <FiChevronRight size={16} />
        </span>
      )}
    </div>
  );
};

export default Pagination;
