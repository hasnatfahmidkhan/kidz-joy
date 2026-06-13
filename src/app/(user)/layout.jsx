import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import UserSidebar from "@/components/user/UserSidebar";

export default async function UserLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ── Sidebar ── */}
        <div className="w-full lg:w-64 shrink-0">
          <UserSidebar user={session.user} />
        </div>

        {/* ── Page content ── */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
