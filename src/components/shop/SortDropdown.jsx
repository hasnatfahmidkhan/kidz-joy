"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

const SortDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSort = searchParams.get("sort") || "popular";

  const handleSort = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // match the value with active sort value then return the label of that
  const activeLabel =
    sortOptions.find((o) => o.value === activeSort)?.label || "Most Popular";

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm btn-outline border-base-300 text-neutral font-semibold rounded-xl gap-2 min-w-44"
      >
        {activeLabel}
        <FiChevronDown size={15} />
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 border border-base-200 rounded-2xl z-50 mt-2 w-52 p-2 shadow-xl"
      >
        {sortOptions.map((option) => (
          <li key={option.value}>
            <button
              onClick={() => handleSort(option.value)}
              className={`text-sm font-semibold rounded-xl
                ${activeSort === option.value ? "bg-primary text-white" : ""}
              `}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortDropdown;
