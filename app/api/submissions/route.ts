import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises"; // ✅ Import thêm mkdir
import { join } from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const note = formData.get("note") as string | null;

    // 1. Kiểm tra xem người dùng có gửi file không
    if (!file) {
      return NextResponse.json(
        { error: "Không tìm thấy file nào được đính kèm." },
        { status: 400 }
      );
    }

    // 2. Chuyển đổi File (Blob) thành Buffer để Node.js có thể ghi vào đĩa
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Xác định đường dẫn lưu file
    const uploadDir = join(process.cwd(), "public", "uploads");
    
    // ✅ FIX TẠI ĐÂY: Lệnh này sẽ tự động tạo thư mục public/uploads nếu nó chưa tồn tại
    await mkdir(uploadDir, { recursive: true });

    // Đổi tên file: Thêm timestamp để tránh trùng lặp
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_"); 
    const uniqueFileName = `${Date.now()}-${safeFileName}`;
    const filePath = join(uploadDir, uniqueFileName);

    // 4. Lưu file thật vào hệ thống
    await writeFile(filePath, buffer);

    console.log("✅ File saved to:", filePath);
    console.log("📝 Note:", note);

    // 5. Trả về phản hồi thành công
    return NextResponse.json(
      {
        message: "Upload file thành công",
        fileName: file.name,
        savedAs: uniqueFileName,
        url: `/uploads/${uniqueFileName}`, 
        note,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Lỗi xử lý upload file:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi hệ thống khi lưu file." },
      { status: 500 }
    );
  }
}