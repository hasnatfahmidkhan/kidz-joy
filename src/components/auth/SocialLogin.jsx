"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState("");
  const callbackUrl = params.get("callbackUrl") || "/";

  const handleGoogleLogin = async () => {
    // OAuth flow should redirect to Google
    setLoading("google");
    await signIn("google", { callbackUrl });
  };

  const handleGithubLogin = async () => {
    setLoading("github");
    await signIn("github", { callbackUrl });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Google Button */}
      <button
        type="button"
        className="btn rounded-2xl py-6.5 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm cursor-pointer"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <FcGoogle size={22} />
        <span className="font-semibold">
          {loading === "google" ? "Loading..." : "Continue with Google"}
        </span>
      </button>

      {/* GitHub Button */}
      <button
        onClick={handleGithubLogin}
        type="button"
        className="btn py-6.5 rounded-2xl bg-black hover:bg-gray-900 text-white transition-all duration-200 shadow-md cursor-pointer"
      >
        <FaGithub size={20} />
        <span className="font-semibold">
          {loading === "github" ? "Loading..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
