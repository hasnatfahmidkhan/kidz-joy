"use client";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [ischecked, setIschecked] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;

    const payload = {
      email: form.email.value,
      password: form.password.value,
      remember: form.remember.checked, // ✅ correct
      redirect: false,
    };

    const result = await signIn("credentials", {
      ...payload,
    });

    if (result?.error) {
      // NextAuth commonly returns "CredentialsSignin" here
      setError("Invalid email or password.");
      return;
    }
    // ✅ success

    router.push(params.get("callbackUrl") || "/");
  };

  return (
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
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="input input-bordered w-full px-4 rounded-2xl focus:outline-none focus:border-primary"
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

      {/* Remember me */}
      <label className="label cursor-pointer justify-start gap-2">
        <input
          onChange={() => setIschecked(!ischecked)}
          checked={ischecked}
          name="remember"
          type="checkbox"
          className="checkbox checkbox-primary checkbox-sm"
        />
        <span className="label-text text-sm text-neutral/70 font-semibold">
          Remember me
        </span>
      </label>

      <button
        type="submit"
        className="btn btn-primary rounded-2xl h-12 font-black"
      >
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
