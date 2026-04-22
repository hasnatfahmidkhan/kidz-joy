import SectionHeader from "@/components/shared/SectionHeader";
import NewArrivalsSlider from "./NewArrivalsSlider";
import { getNewArrivals } from "@/action/server/getProducts";

const NewArrivals = async () => {
  const limit = 6;
  const products = await getNewArrivals(limit);
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <SectionHeader
        subtitle="Fresh off the shelf"
        title="New Arrivals"
        viewAllHref="/new-arrivals"
      />
      <NewArrivalsSlider data={products} />
    </section>
  );
};

export default NewArrivals;
