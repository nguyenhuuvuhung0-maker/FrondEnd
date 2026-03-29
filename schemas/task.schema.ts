import { z } from "zod";

// Dịch 3 luật của bạn thành code Zod
export const taskSchema = z.object({
  
  // 1. task title required: Bắt buộc nhập, không được để trống (min 1)
  title: z.string().min(1, { message: "Vui lòng nhập tên công việc!" }),

  // 2. description min length: Bắt buộc nhập ít nhất 10 ký tự
  description: z.string().min(10, { message: "Mô tả công việc phải có ít nhất 10 ký tự!" }),

  // 3. due date valid: Phải nhập ngày và không được nằm trong quá khứ
  dueDate: z.string().min(1, { message: "Vui lòng chọn ngày đến hạn!" }).refine((dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đưa giờ của hôm nay về 00:00:00 để so sánh chuẩn xác
    
    return selectedDate >= today; // Trả về true nếu ngày chọn >= hôm nay
  }, { message: "Ngày đến hạn không được nằm trong quá khứ!" }),

});

// Xuất ra một kiểu dữ liệu (Type) để dùng cho TypeScript
export type TaskFormValues = z.infer<typeof taskSchema>;