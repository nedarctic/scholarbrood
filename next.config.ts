import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  cacheComponents: true,
  trailingSlash: true,
};

export default nextConfig;
