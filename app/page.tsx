import Link from 'next/link';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input'; // Có thể import thêm Input để test luôn

export default function HomePage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      
      {/* 1. Phần Giới thiệu (Hero Section) */}
      <section className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Chào mừng đến với <span className="text-blue-600">Task Management</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl text-lg">
          Hệ thống quản lý công việc tối ưu. Theo dõi tiến độ, phân công nhiệm vụ và nâng cao hiệu suất làm việc của bạn ngay hôm nay.
        </p>
        <Link href="/login">
          <Button variant="primary" size="lg">Đăng nhập để bắt đầu</Button>
        </Link>
      </section>

      {/* 2. Khu vực Showcase Design System (Tương đương code test của bạn) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-100 text-gray-800">
          🎨 Design System Showcase
        </h2>
        
        <div className="space-y-8">
          {/* Test Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Button Component</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="sm">Primary Small</Button>
                <Button variant="primary" size="md">Primary Medium</Button>
                <Button variant="primary" size="lg">Primary Large</Button>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="secondary" size="sm">Secondary Small</Button>
                <Button variant="secondary" size="md">Secondary Medium</Button>
                <Button variant="secondary" size="lg">Secondary Large</Button>
              </div>
            </div>
          </div>

          {/* Test Input (Bonus thêm để bạn thấy UI đồng bộ) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-t border-gray-100 pt-6">
              Input Component
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <Input label="Trạng thái bình thường" placeholder="Nhập text vào đây..." />
              <Input 
                label="Trạng thái lỗi" 
                placeholder="Nhập email..." 
                error="Email không đúng định dạng" 
              />
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}