// next.config.mjs

import { resolve } from "path";

export const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "", // Optional: leave empty if not required
        pathname: "/img/**", // Adjust this based on the image path pattern
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      jotai: resolve("node_modules/jotai"),
    };
    return config;
  },
};

export default nextConfig;
