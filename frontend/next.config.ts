import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
 
  //should be deleted when Backend API is ready
  images: {
    remotePatterns: [new URL("https://loremflickr.com/**")],
  },
};

export default nextConfig;
