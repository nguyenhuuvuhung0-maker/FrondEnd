import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// XỬ LÝ CẬP NHẬT TASK (PUT)
export async function PUT(
  req: Request,
  // Cú pháp mới của Next 15: params là một Promise
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const body = await req.json();
    
    // Phải AWAIT params trước khi lấy id
    const { id } = await context.params;

    const taskIndex = db.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Không tìm thấy Task" }, { status: 404 });
    }

    db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...body };
    return NextResponse.json(db.tasks[taskIndex], { status: 200 });
    
  } catch (error) {
    console.log("Lỗi PUT:", error);
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
}

// XỬ LÝ XÓA TASK (DELETE)
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Phải AWAIT params
    const { id } = await context.params;
    const taskIndex = db.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Không tìm thấy Task" }, { status: 404 });
    }

    db.tasks.splice(taskIndex, 1);
    return NextResponse.json({ message: "Xóa thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}