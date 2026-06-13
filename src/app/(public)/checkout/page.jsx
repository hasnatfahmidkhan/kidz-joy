import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { FiLock } from "react-icons/fi";

export const metadata = {
  title: "Checkout",
  description: "Complete your order at Kidz Joy.",
};

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  // ── Not logged in → redirect to login ──
  if (!session) {
    redirect("/login?callbackUrl=/checkout");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Header ── */}
      <div className="mb-8">
        <p className="text-primary font-semibold text-sm mb-1">Almost there!</p>
        <h1 className="text-3xl font-black text-neutral flex items-center gap-3">
          Checkout
          <span className="badge badge-success text-white badge-md gap-1 font-bold border-none">
            <FiLock size={12} />
            Secure
          </span>
        </h1>
      </div>

      <CheckoutClient />
    </div>
  );
}
