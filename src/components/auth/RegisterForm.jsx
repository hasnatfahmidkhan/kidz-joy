"use client";

import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postUser } from "@/action/server/auth";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCallbackUrl = () => {
    return params.get("callbackUrl") || "/";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;

      const result = await postUser({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      });

      if (result.ok) {
        toast.success(result.message);
        router.push(getCallbackUrl());
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // ✅ Always reset
    }
  };

  return (
    <form onSubmit={handleRegister} className="card-body p-6 sm:p-8 gap-5">
      {/* Name */}
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-bold text-neutral/70">
            Full Name
          </span>
        </div>
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 z-10" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </label>

      {/* Email */}
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-bold text-neutral/70">Email</span>
        </div>
        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 z-10" />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </label>

      {/* Password */}
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-bold text-neutral/70">Password</span>
        </div>
        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 z-10" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
          />
          {showPassword ? (
            <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 z-10 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 z-10 cursor-pointer"
            />
          )}
        </div>
      </label>

      {/* Confirm Password */}
      {/* <label className="form-control w-full">
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
            className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>
      </label> */}

      {/* Submit */}
      <button
        disabled={!!loading}
        className="btn btn-primary rounded-2xl h-12 font-black mt-2"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Divider */}
      <div className="divider text-neutral/40 text-xs font-bold">OR</div>

      {/* Social Logins */}
      <SocialLogin />

      {/* Footer link */}
      <p className="text-center text-sm text-neutral/60 mt-1">
        Already have an account?{" "}
        <Link
          href={`/login?callbackUrl=${params.get("callbackUrl") || "/"}`}
          className="font-black text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
