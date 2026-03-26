// server.js
const { Server } = require("socket.io");

// Khởi tạo Socket server chạy ở port 3001 (Next.js chạy ở 3000)
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000", // Cho phép Next.js kết nối
  },
});

console.log("🚀 Socket.IO Server đang chạy ở cổng 3001...");

io.on("connection", (socket) => {
  console.log("🟢 Có người vừa kết nối:", socket.id);

  // Lắng nghe sự kiện "send_comment" từ Frontend gởi lên
  socket.on("send_comment", (data) => {
    console.log("💬 Có comment mới:", data);
    
    // Broadcast (Phát) comment đó cho TẤT CẢ mọi người đang online
    io.emit("receive_comment", data); 
  });

  socket.on("disconnect", () => {
    console.log("🔴 Đã ngắt kết nối:", socket.id);
  });
});