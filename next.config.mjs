/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    proxyClientMaxBodySize: "1100mb",
  },
  async rewrites() {
    const api = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
    const origin = new URL(api).origin;
    return [
      { source: "/api/public/:path*", destination: `${api}/:path*` },
      { source: "/backend-assets/:path*", destination: `${origin}/storage/:path*` },
    ];
  },
};

export default nextConfig;
