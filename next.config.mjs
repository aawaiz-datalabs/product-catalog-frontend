// next.config.mjs

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
};

export default nextConfig;
