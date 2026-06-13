import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import ProfileForm from "@/components/user/ProfileForm";

export const metadata = {
  title: "Profile Settings",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-6">
        <p className="text-primary font-semibold text-sm mb-1">Account</p>
        <h1 className="text-2xl font-black text-neutral">Profile Settings</h1>
      </div>

      <ProfileForm user={session.user} />
    </div>
  );
}
