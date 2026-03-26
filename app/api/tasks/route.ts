import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Thay "@your-org/db" bằng tên thật của package // if you have path alias/package// Đổi @/ thành ../../../
export async function GET() {
  return NextResponse.json(db.tasks);
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    
    const newTask = {
      id: Date.now().toString(), 
      title: body.title,
      description: body.description || "",
      status: body.status || "TODO",
      dueDate: body.dueDate || "",
      assignee: body.assignee || "Hưng", 
    };
    
    db.tasks.push(newTask);
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
}