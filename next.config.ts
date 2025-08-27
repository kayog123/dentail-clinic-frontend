import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: "anonymous",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://aecec2929917a4a1792f13b25766bfa6-1524793708.ap-southeast-1.elb.amazonaws.com/:path*",
      },
    ];
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `images.unsplash.com`,
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
