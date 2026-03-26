"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 1. Định nghĩa kiểu dữ liệu (TypeScript)
interface User {
  id?: string | number;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
}

// 2. Tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hàm phụ trợ để lấy Cookie bằng Javascript (Tránh lỗi trên Server)
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// 3. Tạo Provider để bao bọc ứng dụng
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Khôi phục trạng thái khi F5 tải lại trang
  useEffect(() => {
    // Đọc token từ Cookie thay vì localStorage để đồng bộ với Middleware
    const storedToken = getCookie('token'); 
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Hàm xử lý Đăng nhập thành công
  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    
    // LƯU Ý QUAN TRỌNG: Lưu token vào Cookie để Middleware (Next.js Server) có thể đọc được
    document.cookie = `token=${newToken}; path=/; max-age=86400`; // Sống trong 1 ngày (86400 giây)
    
    // Thông tin user không cần bảo mật gắt gao thì lưu ở localStorage cho nhẹ
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Chuyển hướng sang trang Dashboard
    router.push('/dashboard');
  };

  // Hàm xử lý Đăng xuất
  const logout = () => {
    setToken(null);
    setUser(null);
    
    // Xóa Cookie bằng cách set ngày hết hạn về quá khứ
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('user');
    
    // Đẩy người dùng về trang đăng nhập
    router.push('/login');
  };

  // Hàm lấy thông tin user hiện tại từ Backend (Sẽ dùng sau này)
  const getCurrentUser = async () => {
    if (!token) return;
    try {
      console.log('Đang lấy thông tin user mới nhất từ Backend...');
    } catch (error) {
      console.error('Lỗi khi lấy thông tin user', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom Hook để sử dụng ở các component khác
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
}