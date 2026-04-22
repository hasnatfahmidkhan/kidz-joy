"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";

const NewArrivalsSlider = ({ data }) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative">
      {/* ── Custom Nav Buttons — bottom right ── */}
      <div className="flex items-center gap-2 absolute -bottom-12 right-0 z-10">
        <button
          onClick={handlePrev}
          ref={prevRef}
          className="w-9 h-9 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-200 group cursor-pointer"
          aria-label="Previous"
        >
          <FiChevronLeft size={18} strokeWidth={2.5} />
        </button>
        <button
          onClick={handleNext}
          ref={nextRef}
          className="w-9 h-9 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-200 cursor-pointer"
          aria-label="Next"
        >
          <FiChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Swiper ── */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={16}
        slidesPerView={1.3}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        loop
      >
        {data.map((product) => (
          <SwiperSlide key={product.id} className="h-auto!">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ── Product Card ──
const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col bg-base-100 rounded-2xl border border-base-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block bg-base-200 aspect-square overflow-hidden shrink-0"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5 group-hover:scale-110 transition-transform duration-500"
        />

        {/* New badge */}
        <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
          New
        </span>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
          {product.category}
        </span>

        <Link
          href={`/products/${product.slug}`}
          className="font-bold text-neutral text-sm leading-snug hover:text-primary transition-colors duration-150 line-clamp-2 flex-1"
        >
          {product.name}
        </Link>

        {/* Price + cart */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-base-200">
          <span className="font-black text-primary text-base">
            ${product.price}
          </span>
          <button className="btn btn-primary btn-sm btn-circle shadow-sm hover:scale-110 transition-transform duration-150">
            <FiShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsSlider;
