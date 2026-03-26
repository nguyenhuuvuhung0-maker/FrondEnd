// app/submission/page.tsx
"use client";

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";

export default function SubmissionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dùng ref để reset thẻ input file sau khi submit thành công
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form tự động reload trang

    if (!file) {
      toast.error("Vui lòng chọn một file để nộp!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("note", note);

    try {
      // Dùng đường dẫn tương đối để deploy không bị lỗi
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log("Server response:", data);

      toast.success("Nộp bài thành công 🎉");
      
      // Reset form
      setFile(null);
      setNote("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi: Nộp bài thất bại ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
          Nộp bài Assignment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FILE INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File đính kèm <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 transition-colors cursor-pointer"
            />
          </div>

          {/* NOTE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú (Tùy chọn)
            </label>
            <textarea
              placeholder="Nhập ghi chú hoặc lời nhắn cho người chấm..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý upload..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}