import { getProductById } from "@/action/server/getProductById";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FiShoppingCart,
  FiHeart,
  FiShield,
  FiTruck,
  FiRotateCcw,
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  // product not found — let notFound() handle the page
  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist or has been removed.",
    };
  }

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  // clean description — strip newlines for meta tag
  const metaDescription = product.description
    ? product.description.replace(/\n/g, " ").slice(0, 160)
    : `Buy ${product.title} at Kidz Joy. Safe and fun toys for kids.`;

  return {
    title: product.title,
    description: metaDescription,
    keywords: [
      product.title,
      product.category,
      "kids toy",
      "educational toy",
      "safe toy",
      "buy toy online",
      "kidz joy",
      product.bangla,
    ].filter(Boolean),

    openGraph: {
      title: product.title,
      description: metaDescription,
      url: `https://kidz-joy.vercel.app/products/${id}`,
      siteName: "Kidz Joy",
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: metaDescription,
      images: [product.image],
    },

    alternates: {
      canonical: `https://kidz-joy.vercel.app/products/${id}`,
    },

    // ── Product structured data ──
    other: {
      "product:price:amount": discountedPrice,
      "product:price:currency": "BDT",
    },
  };
};

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* ── LEFT: IMAGE SECTION (Sticky) ── */}
        <div className="flex-1">
          <div className="sticky top-24">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-base-200 border border-base-300">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
              {hasDiscount && (
                <div className="absolute top-5 left-5 badge badge-error text-white font-bold p-4">
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: INFO SECTION ── */}
        <div className="flex-1 flex flex-col">
          {/* Breadcrumbs */}
          <div className="text-sm breadcrumbs text-neutral/50 mb-4">
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/shop"}>Shop</Link>
              </li>
              <li>Product Details</li>
            </ul>
          </div>

          {/* Titles */}
          <h1 className="text-3xl font-black text-neutral mb-2 leading-tight">
            {product.title}
          </h1>
          <h2 className="text-xl font-semibold text-primary/80 mb-4 font-bengali">
            {product.bangla}
          </h2>

          {/* Ratings & Sold */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400 gap-1">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
              <span className="ml-2 text-neutral font-bold">
                {product.ratings}
              </span>
            </div>
            <div className="divider divider-horizontal m-0"></div>
            <span className="text-neutral/60 text-sm">
              {product.reviews} Reviews
            </span>
            <div className="divider divider-horizontal m-0"></div>
            <span className="text-neutral/60 text-sm font-medium">
              {product.sold} Sold
            </span>
          </div>

          {/* Pricing */}
          <div className="bg-base-200/50 p-6 rounded-2xl mb-8">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">
                ৳{discountedPrice}
              </span>
              {hasDiscount && (
                <span className="text-xl text-neutral/40 line-through font-bold">
                  ৳{product.price}
                </span>
              )}
            </div>
            <p className="text-xs text-success font-bold mt-2">
              In Stock - Ready to Ship
            </p>
          </div>

          {/* Key Info Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {product.info.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-neutral/70"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                {item}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button className="btn btn-primary btn-lg flex-1 rounded-2xl gap-3 shadow-lg shadow-primary/20">
              <FiShoppingCart size={20} /> Add to Cart
            </button>
            <button className="btn btn-outline btn-lg border-2 rounded-2xl">
              Buy Now
            </button>
            <button className="btn btn-ghost btn-lg btn-square rounded-2xl border border-base-300">
              <FiHeart size={20} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 border-t border-base-200 pt-8 mb-10">
            <div className="flex flex-col items-center text-center gap-2">
              <FiTruck className="text-primary" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Fast Delivery
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <FiShield className="text-primary" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Child Safe
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <FiRotateCcw className="text-primary" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                7 Days Return
              </span>
            </div>
          </div>

          {/* Description & QnA (Tabs/Accordions) */}
          <div className="space-y-4">
            {/* Description */}
            <div className="collapse collapse-plus bg-base-100 border border-base-200 rounded-2xl">
              <input type="radio" name="product-accordion" defaultChecked />
              <div className="collapse-title text-lg font-bold">
                Product Description
              </div>
              <div className="collapse-content text-neutral/70 whitespace-pre-line text-sm leading-relaxed">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Q&A */}
            <div className="collapse collapse-plus bg-base-100 border border-base-200 rounded-2xl">
              <input type="radio" name="product-accordion" />
              <div className="collapse-title text-lg font-bold">
                Questions & Answers
              </div>
              <div className="collapse-content space-y-4">
                {product.qna.map((item, idx) => (
                  <div key={idx} className="bg-base-200/50 p-4 rounded-xl">
                    <p className="font-bold text-sm mb-1 text-primary">
                      Q: {item.question}
                    </p>
                    <p className="text-sm text-neutral/70 italic">
                      A: {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
