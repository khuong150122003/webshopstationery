import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'sdnlanlbvruqjuqcmdfa.supabase.co',
      }
    ],
  },
};

export default nextConfig;
