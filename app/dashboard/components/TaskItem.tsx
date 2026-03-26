"use client";

import { memo } from "react";
import Button from "@/components/ui/button";
import { Task } from "../page"; // Thêm dòng này

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// 2. Chuyển đổi từ export default function thành const component
const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  // Thêm một dòng console.log nhỏ để bạn có thể test xem nó có bị re-render thừa không
  // console.log(`Render TaskItem: ${task.title}`);
console.log(`Đang render lại Task: ${task.title}`);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
      
      {/* Thông tin Task */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {task.description || "Không có mô tả"}
        </p>
        
        {/* Badges thông tin phụ */}
        <div className="flex gap-3 mt-3 text-xs font-medium">
          <span className={`px-2 py-1 rounded-md ${
            task.status === 'DONE' ? 'bg-green-100 text-green-700' :
            task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {task.status || "TODO"}
          </span>
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
            Hạn: {task.dueDate || "Trống"}
          </span>
        </div>
      </div>

      {/* Hành động */}
      <div className="flex flex-col sm:flex-row gap-2 ml-4">
        <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
          Delete
        </Button>
      </div>

    </div>
  );
};

// 3. Export component đã được bọc qua React.memo
export default memo(TaskItem);