import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const PromoBanner = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-accent to-primary overflow-hidden px-8 sm:px-14 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* BG decoration */}
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />

        {/* Text */}
        <div className="relative z-10 text-center sm:text-left">
          <p className="text-white/80 font-semibold text-sm mb-1">
            Limited Time Offer 🎁
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
            Get 20% Off <br className="sm:hidden" />
            Your First Order!
          </h2>
          <p className="text-white/75 text-sm">
            Use code{" "}
            <span className="bg-white/20 text-white font-black px-2 py-0.5 rounded-md tracking-widest">
              KIDZ20
            </span>{" "}
            at checkout.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/shop"
          className="relative z-10 btn bg-white text-primary hover:bg-white/90 border-none font-bold rounded-xl px-8 gap-2 shadow-md shrink-0"
        >
          Shop Now
          <FiArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;
