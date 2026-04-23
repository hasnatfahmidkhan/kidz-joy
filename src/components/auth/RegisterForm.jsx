"use client";

import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
  return (
    <form className="card-body p-6 sm:p-8 gap-5">
      {/* Name */}
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-bold text-neutral/70">
            Full Name
          </span>
        </div>
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full px-4 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </label>

      {/* Email */}
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-bold text-neutral/70">Email</span>
        </div>
        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
          <input
            type="email"
            placeholder="you@example.com"
            className="input input-bordered w-full px-4 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </label>

      {/* Password */}
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-bold text-neutral/70">Password</span>
        </div>
        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered w-full px-4 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </label>

      {/* Confirm Password */}
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-bold text-neutral/70">
            Confirm Password
          </span>
        </div>
        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered w-full px-4 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </label>

      {/* Submit */}
      <button className="btn btn-primary rounded-2xl h-12 font-black mt-2">
        Create Account
      </button>

      {/* Divider */}
      <div className="divider text-neutral/40 text-xs font-bold">OR</div>

      {/* Social Logins */}
      <SocialLogin />

      {/* Footer link */}
      <p className="text-center text-sm text-neutral/60 mt-1">
        Already have an account?{" "}
        <Link href="/login" className="font-black text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
