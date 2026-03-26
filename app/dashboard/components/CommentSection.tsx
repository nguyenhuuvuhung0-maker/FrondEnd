"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

// Kết nối tới Socket Server mình vừa tạo ở Bước 2
const socket = io("http://localhost:3001");

interface Comment {
  id: string;
  taskId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export default function CommentSection({ taskId }: { taskId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Lắng nghe sự kiện nhận comment từ Server
    socket.on("receive_comment", (newComment: Comment) => {
      // Chỉ nhận comment của đúng cái Task này
      if (newComment.taskId === taskId) {
        setComments((prev) => [...prev, newComment]);
      }
    });

    // Dọn dẹp khi tắt component
    return () => {
      socket.off("receive_comment");
    };
  }, [taskId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      taskId,
      senderName: user?.name || "Intern", // Lấy tên từ Auth, nếu không có thì để Intern
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    // Bắn dữ liệu lên Server
    socket.emit("send_comment", newComment);
    
    // Xóa ô input
    setText("");
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <h4 className="text-lg font-bold text-gray-800 mb-4">Trao đổi (Real-time)</h4>
      
      {/* Khu vực hiển thị Comment */}
      <div className="flex flex-col gap-3 mb-4 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-lg border border-gray-100">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">Chưa có bình luận nào.</p>
        ) : (
          comments.map((cmt) => (
            <div 
              key={cmt.id} 
              className={`flex flex-col max-w-[80%] ${cmt.senderName === user?.name ? "self-end items-end" : "self-start items-start"}`}
            >
              <span className="text-xs text-gray-500 font-medium mb-1">
                {cmt.senderName} • {cmt.timestamp}
              </span>
              <div className={`px-4 py-2 rounded-2xl text-sm ${cmt.senderName === user?.name ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"}`}>
                {cmt.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form nhập Comment */}
      <form onSubmit={handleSend} className="flex gap-2 items-end">
        <div className="flex-1">
          <Input 
            placeholder="Nhập bình luận của bạn..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary" className="mb-0.5">Gửi</Button>
      </form>
    </div>
  );
}