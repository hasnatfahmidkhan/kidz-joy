import LoginForm from "@/components/auth/LoginForm";
import PreLoader from "@/components/Loader/PreLoader";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Login",
  description: "Login to your Kidz Joy account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-base-100">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-neutral">Welcome back</h1>
          <p className="text-neutral/60 text-sm mt-1">
            Login to continue shopping at{" "}
            <span className="font-bold text-primary">Kidz Joy</span>
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 border border-base-200 shadow-xl rounded-3xl">
          <Suspense fallback={<PreLoader />}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Small note */}
        <p className="text-center text-xs text-neutral/40 mt-5">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="font-semibold hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
