import Link from "next/link";
import { MdToys } from "react-icons/md";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 shrink-0">
        <MdToys size={22} className="text-white" />
      </div>
      <span className="text-xl font-extrabold text-white tracking-wide leading-none">
        Kidz
        <span className="text-accent">Joy</span>
      </span>
    </Link>
  );
};

export default Logo;
