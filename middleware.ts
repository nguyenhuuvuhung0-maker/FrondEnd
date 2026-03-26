import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Lấy token từ Cookies (Middleware chạy trên server nên không đọc được localStorage)
  const token = request.cookies.get('token')?.value;

  // 2. Logic: if not logged in → redirect /login
  if (!token) {
    // Chuyển hướng người dùng về trang login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã có token thì cho phép đi tiếp vào trang
  return NextResponse.next();
}

// 3. Cấu hình các Routes cần bảo vệ
export const config = {
  matcher: [
    '/dashboard/:path*',   // Bảo vệ /dashboard và các trang con của nó
    '/tasks/:path*',       // Bảo vệ /tasks và các trang con
    '/submissions/:path*'  // Bảo vệ /submissions và các trang con
  ],
};