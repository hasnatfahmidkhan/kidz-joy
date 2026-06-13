import { collections, dbConnect } from "@/lib/db/dbConnect";
import { FiUsers } from "react-icons/fi";

export const metadata = {
  title: "Manage Users",
};

export default async function AdminUsersPage() {
  const db = await dbConnect(collections.USERS);
  const users = await db
    .find()
    .sort({ createdAt: -1 })
    .project({
      _id: 1,
      name: 1,
      email: 1,
      role: 1,
      provider: 1,
      image: 1,
      createdAt: 1,
    })
    .toArray();

  const serialized = users.map((u) => ({
    ...u,
    _id: u._id.toString(),
  }));

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-6">
        <p className="text-primary font-semibold text-sm mb-1">
          All registered users
        </p>
        <h1 className="text-2xl font-black text-neutral">Manage Users</h1>
      </div>

      <p className="text-sm text-neutral/50 font-semibold mb-4">
        {serialized.length} users total
      </p>

      {/* ── Table ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
        {serialized.length === 0 ? (
          <div className="p-12 text-center text-neutral/50">
            <FiUsers size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">No users yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-base-200/50 text-neutral/60 text-xs uppercase tracking-wider">
                  <th className="text-left p-4 font-bold">User</th>
                  <th className="text-left p-4 font-bold">Provider</th>
                  <th className="text-center p-4 font-bold">Role</th>
                  <th className="text-right p-4 font-bold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {serialized.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-base-200 hover:bg-base-200/30"
                  >
                    {/* User */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-black text-primary text-sm">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-bold text-neutral text-xs">
                            {user.name || "—"}
                          </p>
                          <p className="text-neutral/50 text-[11px]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Provider */}
                    <td className="p-4">
                      <span className="badge badge-ghost badge-sm capitalize font-bold">
                        {user.provider || "credentials"}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="p-4 text-center">
                      <span
                        className={`badge badge-sm font-bold border-none text-white
                          ${
                            user.role === "admin"
                              ? "badge-primary"
                              : "badge-ghost text-neutral"
                          }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="p-4 text-right text-xs text-neutral/50">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-BD", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
