import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // ── Must be logged in ──
  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  // ── Must be admin ──
  if (session.user.role !== "admin") {
    redirect("/?msg=Access Denied");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ── Sidebar ── */}
        <div className="w-full lg:w-60 shrink-0">
          <AdminSidebar />
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
