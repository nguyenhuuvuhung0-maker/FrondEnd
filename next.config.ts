import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Gắn khiên bảo vệ cho toàn bộ đường link bắt đầu bằng /api/
        source: "/api/:path*",
        headers: [
          // 1. Cấu hình CORS (Chỉ cho phép tên miền của bạn gọi API)
          { key: "Access-Control-Allow-Origin", value: "https://app.3.106.183.131.nip.io" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },

          // 2. Cấu hình Helmet (Các lớp giáp bảo mật chống hacker)
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;