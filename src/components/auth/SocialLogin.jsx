import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Google Button */}
      <button
        type="button"
        className="btn rounded-2xl py-6.5 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm cursor-pointer"
      >
        <FcGoogle size={22} />
        <span className="font-semibold text-gray-700">
          Continue with Google
        </span>
      </button>

      {/* GitHub Button */}
      <button
        type="button"
        className="btn py-6.5 rounded-2xl bg-black hover:bg-gray-900 text-white transition-all duration-200 shadow-md cursor-pointer"
      >
        <FaGithub size={20} />
        <span className="font-semibold">Continue with GitHub</span>
      </button>
    </div>
  );
};

export default SocialLogin;
