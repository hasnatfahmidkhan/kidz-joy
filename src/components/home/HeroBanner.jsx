import Link from "next/link";
import Image from "next/image";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

const HeroBanner = () => {
  return (
    <section className="w-full bg-linear-to-br from-primary via-primary to-secondary px-6 sm:px-10 lg:px-16 py-12 my-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 place-items-center justify-between">
        {/* ── LEFT: Text Content ── */}
        <div className="flex-1 text-center lg:text-left ">
          {/* Badge */}
          <span className="inline-block bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            🎉 New Arrivals Just Dropped
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight mb-4">
            Where Every Play <br />
            <span className="text-accent">Tells a Story!</span>
          </h1>

          {/* Description */}
          <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
            Discover safe, imaginative, and screen-free toys crafted to spark
            creativity and joy in every child aged 3–12.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <Link
              href="/shop"
              className="btn bg-white text-primary hover:bg-white/90 border-none font-bold rounded-xl px-8 gap-2 shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
            >
              <FiShoppingBag size={18} />
              Shop Now
            </Link>

            <Link
              href="/categories"
              className="btn btn-ghost border border-white/30 text-white hover:bg-white/15 rounded-xl px-8 gap-2 transition-all duration-200 w-full sm:w-auto"
            >
              Browse Categories
              <FiArrowRight size={18} />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-8">
            {[
              { emoji: "🚚", text: "Free Shipping Over $50" },
              { emoji: "🔒", text: "Safety Certified" },
              { emoji: "↩️", text: "Easy Returns" },
            ].map((item) => (
              <span
                key={item.text}
                className="flex items-center gap-1.5 text-white/70 text-xs font-medium"
              >
                <span>{item.emoji}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Hero Image ── */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square">
            <Image
              src="/assets/hero.png"
              alt="Happy kids playing with toys"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
