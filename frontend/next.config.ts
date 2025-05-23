import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // it should be changed when backend is going on server
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;