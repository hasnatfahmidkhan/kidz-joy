import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import NewsletterSection from "@/components/home/NewsletterSection";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <NewArrivals />
      <PromoBanner />
      <HowItWorks />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
