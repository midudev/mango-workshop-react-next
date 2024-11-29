import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
      }
    ]
  }
};

export default nextConfig;
