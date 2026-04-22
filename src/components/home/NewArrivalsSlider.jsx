"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";
import ProductCard from "../shared/ProductCard";

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

export default NewArrivalsSlider;
