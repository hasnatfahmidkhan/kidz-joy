"use client";

import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../modal/modal";

const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const getCallbackUrl = () => {
    return params.get("callbackUrl") || "/";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = e.target;

      const result = await signIn("credentials", {
        email: form.email.value,
        password: form.password.value,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(getCallbackUrl());
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="card-body p-6 sm:p-8 gap-5">
        {/* Error */}
        {error && (
          <div className="alert alert-error text-sm">
            <span>{error}</span>
          </div>
        )}

        {/* Email */}
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-bold text-neutral/70">Email</span>
          </div>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full px-10 rounded-2xl focus:outline-none focus:border-primary"
              required
            />
          </div>
        </label>

        {/* Password */}
        <label className="form-control w-full">
          <div className="label pb-1 flex items-center justify-between">
            <span className="label-text font-bold text-neutral/70">
              Password
            </span>

            <button
              type="button"
              onClick={() => setForgotPasswordOpen(true)}
              className="text-xs font-bold text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input input-bordered w-full px-10 rounded-2xl focus:outline-none focus:border-primary"
              required
            />

            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 cursor-pointer"
                size={20}
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 cursor-pointer"
                size={20}
              />
            )}
          </div>
        </label>

        {/* Remember Me */}
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="text-sm text-neutral/70 font-semibold">
            Remember me
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary rounded-2xl h-12 font-bold"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>

        {/* Divider */}
        <div className="divider text-xs text-neutral/40 font-bold">OR</div>

        {/* Social Login */}
        <SocialLogin />

        {/* Register link */}
        <p className="text-center text-sm text-neutral/60">
          Don&apos;t have an account?{" "}
          <Link
            href={`/register?callbackUrl=${params.get("callbackUrl") || "/"}`}
            className="text-primary font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Forget Password"
      >
        <div className="space-y-3 text-sm text-neutral/70">
          <p>🚧 This feature is coming soon.</p>
          <p>
            You will be able to reset your password using email verification in
            a future update.
          </p>

          <button
            onClick={() => setForgotPasswordOpen(false)}
            className="btn btn-primary w-full mt-3"
          >
            Got it
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LoginForm;
