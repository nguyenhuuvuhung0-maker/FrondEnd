"use client"; // Bắt buộc phải có vì chúng ta đang dùng hook useAuth

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';

export default function Navbar() {
  // Lấy thông tin user và hàm logout từ AuthContext
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="font-bold text-2xl text-blue-600 tracking-wider">
          <Link href="/">LOGO.</Link>
        </div>

        {/* Menu Links */}
        <ul className="flex items-center space-x-6 font-medium text-gray-600">
          
          {user ? (
            /* --- NẾU ĐÃ ĐĂNG NHẬP --- */
            <>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/submission" className="hover:text-blue-600 transition">
                  Nộp bài (Submit)
                </Link>
              </li>
              
              {/* Vạch ngăn cách và thông tin User */}
              <li className="flex items-center gap-4 pl-4 border-l border-gray-300">
                <span className="text-sm font-semibold text-gray-800 hidden sm:block">
                  Chào, {user.name || "User"}
                </span>
                
                {/* Nút Logout gọi hàm logout từ useAuth */}
                <button 
                  onClick={logout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md transition text-sm font-semibold"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            /* --- NẾU CHƯA ĐĂNG NHẬP --- */
            <li>
              <Link href="/login">
                <Button variant="primary" size="md">
                  Đăng nhập
                </Button>
              </Link>
            </li>
          )}

        </ul>
      </nav>
    </header>
  );
}