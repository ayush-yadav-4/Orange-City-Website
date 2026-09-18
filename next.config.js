/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["tailwind-merge"],
  experimental: {
    optimizePackageImports: ["lucide-react", "tailwind-merge"],
  },
  compress: true,
};

module.exports = nextConfig;
