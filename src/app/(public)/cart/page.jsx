import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import CartPageClient from "@/components/cart/CartPageClient";

export const metadata = {
  title: "Your Cart",
  description: "Review your selected toys before checkout.",
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  // ── Not logged in → redirect to login ──
  if (!session) {
    redirect("/login?callbackUrl=/cart");
  }

  return <CartPageClient />;
}
