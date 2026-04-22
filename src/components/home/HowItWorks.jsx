import { FiSearch, FiShoppingCart, FiSmile } from "react-icons/fi";
import SectionHeader from "@/components/shared/SectionHeader";

const steps = [
  {
    id: 1,
    icon: FiSearch,
    title: "Browse & Discover",
    description:
      "Explore hundreds of safe, age-appropriate toys across fun categories.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 2,
    icon: FiShoppingCart,
    title: "Add & Order",
    description:
      "Add your favourites to the cart and checkout in just a few easy steps.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    id: 3,
    icon: FiSmile,
    title: "Play & Enjoy",
    description:
      "Your order arrives fast at your door — unbox the joy and let the fun begin!",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <SectionHeader
        subtitle="Simple as 1, 2, 3"
        title="How It Works"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative flex flex-col items-center sm:items-start text-center sm:text-left gap-4 p-6 rounded-2xl bg-base-100 border border-base-200">

              {/* Step number */}
              <span className="absolute top-4 right-4 text-5xl font-black text-base-200 select-none">
                {step.id}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.bg} shrink-0`}>
                <Icon size={28} className={step.color} />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-extrabold text-neutral text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-neutral/55 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow — between cards on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-base-100 border border-base-200 rounded-full items-center justify-center">
                  <FiSearch
                    size={14}
                    className="text-primary rotate-[-45deg] hidden"
                  />
                  <span className="text-primary font-black text-base">›</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;