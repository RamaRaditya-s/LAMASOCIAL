/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    //ppr: "incremental",
  },
  images: {
    domains: ["images.pexels.com"],
  },
};

export default nextConfig;


