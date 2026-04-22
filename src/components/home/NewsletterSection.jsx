import { FiSend } from "react-icons/fi";

const NewsletterSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div className="w-full rounded-3xl bg-base-200 border border-base-300 px-8 sm:px-14 py-12 flex flex-col items-center text-center gap-6">
        {/* Text */}
        <div>
          <p className="text-primary font-semibold text-sm mb-2">
            📬 Stay in the loop
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral mb-3">
            Get Toy Deals Before Anyone Else!
          </h2>
          <p className="text-neutral/55 text-sm max-w-md mx-auto">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive discounts, and fun giveaways.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="input flex-1 bg-base-100 border border-base-300 focus:border-primary focus:outline-none rounded-xl text-sm"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-xl px-6 gap-2 shrink-0"
          >
            Subscribe
            <FiSend size={16} />
          </button>
        </form>

        <p className="text-neutral/40 text-xs">
          No spam ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
