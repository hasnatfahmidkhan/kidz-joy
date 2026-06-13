"use client";

import { useState } from "react";
import Image from "next/image";
import { FiUser, FiMail, FiLock, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

const ProfileForm = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ── TODO: wire up to server action later ──
    await new Promise((r) => setTimeout(r, 800)); // simulate
    toast.success("Profile updated!");
    setIsLoading(false);
  };

  return (
    <div className="space-y-5">
      {/* ── Avatar Card ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-5 flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary/10 shrink-0 border-2 border-primary/20">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-primary font-black text-2xl">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="font-black text-neutral">{user?.name}</p>
          <p className="text-sm text-neutral/50">{user?.email}</p>
          <p className="text-xs text-primary/60 mt-0.5 capitalize">
            {user?.role || "user"} account
          </p>
        </div>
      </div>

      {/* ── Update Name ── */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-200 rounded-2xl p-5 space-y-4"
      >
        <h2 className="font-black text-neutral text-base">
          Personal Information
        </h2>

        {/* Name */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Full Name
            </span>
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
            <input
              type="text"
              name="name"
              defaultValue={user?.name || ""}
              placeholder="Your full name"
              className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Email — read only */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Email
            </span>
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full pl-11 rounded-2xl bg-base-200 cursor-not-allowed text-neutral/50"
            />
          </div>
          <label className="label pt-1">
            <span className="label-text-alt text-neutral/40">
              Email cannot be changed
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary rounded-2xl gap-2"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <FiSave size={16} />
          )}
          Save Changes
        </button>
      </form>

      {/* ── Change Password (credentials only) ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-5 space-y-4">
        <h2 className="font-black text-neutral text-base flex items-center gap-2">
          <FiLock size={16} className="text-primary" />
          Change Password
        </h2>

        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Current Password
            </span>
          </label>
          <input
            type="password"
            name="currentPassword"
            placeholder="••••••••"
            className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>

        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              New Password
            </span>
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="••••••••"
            className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>

        <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white rounded-2xl gap-2">
          <FiLock size={16} />
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
