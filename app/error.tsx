"use client"; // File bắt lỗi bắt buộc phải là Client Component

import { useEffect } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // Thêm digest chuẩn theo type của Next.js
  reset: () => void;
}) {
  useEffect(() => {
    // Log lỗi ra console để dev dễ debug
    console.error("Global error caught by Next.js:", error);

    // Hiển thị Toast thông báo lỗi ngay lập tức
    toast.error(error.message || "Đã xảy ra lỗi hệ thống không mong muốn!");
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          Ôi không! Đã xảy ra lỗi ❌
        </h2>
        
        <p className="text-gray-600 mb-6 text-sm">
          {error.message || "Hệ thống gặp sự cố trong quá trình xử lý. Vui lòng thử lại sau."}
        </p>
        
        <div className="flex justify-center gap-4">
          <Button onClick={() => reset()} variant="primary">
            Thử lại (Try again)
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="secondary"
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}