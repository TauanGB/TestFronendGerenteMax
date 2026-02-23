import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Ensure Turbopack resolves the project root correctly
    root: './',
  },
};

export default nextConfig;
