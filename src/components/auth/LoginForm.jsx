"use client";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  return (
    <form className="card-body p-6 sm:p-8 gap-5">
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
        <div className="label pb-1 flex items-center justify-between">
          <span className="label-text font-bold text-neutral/70">Password</span>
          <Link
            href="/forgot-password"
            className="text-xs font-bold text-primary hover:underline"
          >
            Forgot password?
          </Link>
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

      {/* Remember me */}
      <div className="flex items-center justify-between">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="label-text text-sm text-neutral/70 font-semibold">
            Remember me
          </span>
        </label>
      </div>

      {/* Submit */}
      <button className="btn btn-primary rounded-2xl h-12 font-black">
        Login
      </button>

      {/* Divider */}
      <div className="divider text-neutral/40 text-xs font-bold">OR</div>

      {/* Social login buttons (UI only for now) */}
      <SocialLogin />

      {/* Footer link */}
      <p className="text-center text-sm text-neutral/60 mt-1">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-black text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
