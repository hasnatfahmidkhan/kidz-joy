import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import WishlistPageClient from "@/components/wishlist/WishlistPageClient";

export const metadata = {
  title: "My Wishlist",
  description: "Save your favorite toys and shop them later.",
};

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);

  // ── Not logged in → redirect to login ──
  if (!session) {
    redirect("/login?callbackUrl=/wishlist");
  }

  return <WishlistPageClient />;
}
