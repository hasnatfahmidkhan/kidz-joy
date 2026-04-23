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
    setLoading("google"); // Show loading only on Google button

    try {
      await signIn("google", {
        callbackUrl: callbackUrl,
      });
      // No need to setLoading(false) on success because redirect happens
    } catch (error) {
      console.error("Google login error:", error);
      setLoading(false);
      toast.error("Failed to login with Google");
    }
  };

  const handleGithubLogin = async () => {
    setLoading("github"); // Show loading only on GitHub button

    try {
      await signIn("github", {
        callbackUrl: callbackUrl,
      });
      // No need to setLoading(false) on success because redirect happens
    } catch (error) {
      console.error("GitHub login error:", error);
      setLoading(false);
      toast.error("Failed to login with GitHub");
    }
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
        <span className="font-semibold flex items-center gap-2">
          {loading === "google" ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Loading...
            </>
          ) : (
            "Continue with Google"
          )}
        </span>
      </button>

      {/* GitHub Button */}
      <button
        onClick={handleGithubLogin}
        type="button"
        className="btn py-6.5 rounded-2xl bg-black hover:bg-gray-900 text-white transition-all duration-200 shadow-md cursor-pointer"
      >
        <FaGithub size={20} />
        <span className="font-semibold flex items-center gap-2">
          {loading === "github" ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Loading...
            </>
          ) : (
            "Continue with GitHub"
          )}
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
