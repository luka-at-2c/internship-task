import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  distDir: "dist",
  images: { unoptimized: true },
  output: "export",
};

export default nextConfig;
