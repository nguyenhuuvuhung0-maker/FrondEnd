"use client";

import { useState } from 'react';
import toast from 'react-hot-toast'; // ✅ Import thêm toast
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Có thể thêm loading toast cho mượt
    const loadingToast = toast.loading('Đang kiểm tra thông tin...');

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email === 'admin@gmail.com' && password === '123456') {
        const fakeToken = 'fake-jwt-token-12345abcde';
        const fakeUser = { id: 1, email: 'admin@gmail.com', name: 'Admin User' };
        
        // Cập nhật context & chuyển hướng
        login(fakeToken, fakeUser); 
        
        toast.success('Đăng nhập thành công! 👋', { id: loadingToast });
      } else {
        const errMsg = 'Sai thông tin! Vui lòng thử email: admin@gmail.com và pass: 123456';
        setError(errMsg);
        toast.error('Đăng nhập thất bại', { id: loadingToast });
      }
    } catch (err) {
      const errMsg = 'Đã xảy ra lỗi không xác định.';
      setError(errMsg);
      toast.error(errMsg, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Đổi mt-20 thành min-h-[80vh] để form luôn căn giữa màn hình theo chiều dọc
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900">Đăng Nhập</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Quản lý công việc hiệu quả hơn</p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm border border-red-100 rounded-md text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input 
            label="Email" 
            type="email" 
            placeholder="admin@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading} // Khóa input khi đang loading
          />
          
          <Input 
            label="Mật khẩu" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading} // Khóa input khi đang loading
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full mt-4"
            disabled={isLoading} 
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập ngay'}
          </Button>
        </form>
      </div>
    </div>
  );
}