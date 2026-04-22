import SectionHeader from "@/components/shared/SectionHeader";
import NewArrivalsSlider from "./NewArrivalsSlider";

// 🔁 Replace with DB data later
const newArrivals = [
  {
    id: 1,
    name: "Dino Dig Kit",
    slug: "dino-dig-kit",
    price: 27.99,
    image: "/images/products/dino-dig.png",
    category: "Science",
  },
  {
    id: 2,
    name: "Rainbow Stacker",
    slug: "rainbow-stacker",
    price: 17.99,
    image: "/images/products/rainbow-stacker.png",
    category: "Building",
  },
  {
    id: 3,
    name: "Mini Kitchen Set",
    slug: "mini-kitchen-set",
    price: 39.99,
    image: "/images/products/mini-kitchen.png",
    category: "Pretend Play",
  },
  {
    id: 4,
    name: "Glow Drawing Board",
    slug: "glow-drawing-board",
    price: 22.99,
    image: "/images/products/glow-board.png",
    category: "Arts & Crafts",
  },
  {
    id: 5,
    name: "Foam Rocket Launcher",
    slug: "foam-rocket-launcher",
    price: 31.99,
    image: "/images/products/foam-rocket.png",
    category: "Outdoor",
  },
  {
    id: 6,
    name: "Magnetic Drawing Board",
    slug: "magnetic-drawing-board",
    price: 18.99,
    image: "/images/products/magnetic-board.png",
    category: "Arts & Crafts",
  },
  {
    id: 7,
    name: "Wooden Train Set",
    slug: "wooden-train-set",
    price: 44.99,
    image: "/images/products/train-set.png",
    category: "Building",
  },
];

const NewArrivals = ({ products: data = newArrivals }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <SectionHeader
        subtitle="Fresh off the shelf"
        title="New Arrivals"
        viewAllHref="/new-arrivals"
      />
      <NewArrivalsSlider data={data} />
    </section>
  );
};

export default NewArrivals;
