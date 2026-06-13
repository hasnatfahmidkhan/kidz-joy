/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["sslcommerz-lts", "node-fetch", "form-data"],

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "www.toynix.pk",
      },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
