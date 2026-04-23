import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import NewsletterSection from "@/components/home/NewsletterSection";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "Kidz Joy — Safe & Fun Toys for Kids",
  description:
    "Discover a world of safe, imaginative, and educational toys for children aged 3–12. Shop action figures, puzzles, costumes, STEM toys and more at Kidz Joy.",
  keywords: [
    "kids toys",
    "educational toys",
    "toys for children",
    "safe toys",
    "puzzles",
    "STEM toys",
    "costumes for kids",
    "kidz joy",
    "buy toys online",
    "children gifts",
  ],
  openGraph: {
    title: "Kidz Joy — Safe & Fun Toys for Kids",
    description:
      "Discover a world of safe, imaginative, and educational toys for children aged 3–12.",
    url: "https://kidz-joy.vercel.app",
    siteName: "Kidz Joy",
    images: [
      {
        url: "https://kidz-joy.vercel.app/og-home.png",
        width: 1200,
        height: 630,
        alt: "Kidz Joy — Safe & Fun Toys for Kids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kidz Joy — Safe & Fun Toys for Kids",
    description:
      "Discover safe, imaginative, and educational toys for children aged 3–12.",
    images: ["https://kidz-joy.vercel.app/og-home.png"],
  },
  alternates: {
    canonical: "https://kidz-joy.vercel.app",
  },
};

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
