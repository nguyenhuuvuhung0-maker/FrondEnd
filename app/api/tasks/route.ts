import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import rateLimit from "@/src/utils/rateLimit";
import { logger } from "@/src/utils/logger"; 

export async function GET(req: Request) {
  // Lấy IP của người gọi
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  
  // Hỏi anh bảo vệ xem có cho qua không
  if (!rateLimit(ip)) {
    logger.warn(`Chặn spam GET từ IP: ${ip}`);
    return NextResponse.json({ error: "Quá nhiều request, vui lòng thử lại sau!" }, { status: 429 });
  }

  logger.info(`Có người vừa gọi API: [GET] /api/tasks`);
  return NextResponse.json(db.tasks);
}

export async function POST(req: Request) {
  // Lấy IP của người gọi
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  
  // Hỏi anh bảo vệ xem có cho qua không
  if (!rateLimit(ip)) {
    logger.warn(`Chặn spam POST từ IP: ${ip}`);
    return NextResponse.json({ error: "Quá nhiều request, vui lòng thử lại sau!" }, { status: 429 });
  }

  logger.info(`Có người vừa gọi API: [POST] /api/tasks`);
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