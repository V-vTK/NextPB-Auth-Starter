import type { NextConfig } from "next";

const domains = [
  "127.0.0.1",
  process.env.NEXT_BACKEND_API_URL
  ].filter((domain): domain is string => typeof domain === "string" && domain.length > 0);

const nextConfig: NextConfig = {
  compiler: {
      styledComponents: true,
  },
  images: {
      domains: domains
  },
};

export default nextConfig;
