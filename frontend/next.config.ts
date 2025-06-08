import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {   
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "nodejs-nextjs-fullstack-app.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
