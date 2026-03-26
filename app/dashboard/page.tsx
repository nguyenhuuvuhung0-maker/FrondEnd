"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import TaskModal from "./components/TaskModal";
import TaskItem from "./components/TaskItem";
import Button from "@/components/ui/button";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  assignee: string;
  optimistic?: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // ================= TỐI ƯU HIỆU NĂNG (useMemo) =================
  // Chỉ tính toán lại khi mảng `tasks` thực sự thay đổi
  const completedStats = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "DONE").length;
    return { completed, total: tasks.length };
  }, [tasks]);

  // ================= FETCH =================
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Fetch tasks failed");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      toast.error("Không thể tải danh sách công việc");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= CREATE (OPTIMISTIC) =================
  const createTask = async (data: any) => {
    const tempId = Date.now().toString();
    const tempTask: Task = {
      id: tempId,
      ...data,
      status: "TODO",
      assignee: "Hưng",
      optimistic: true,
    };

    setTasks((prev) => [tempTask, ...prev]);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Create task failed");

      const realTask = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === tempId ? realTask : t))
      );
      toast.success("Đã tạo công việc mới!");
    } catch (error) {
      console.error("Create failed:", error);
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      toast.error("Lỗi: Không thể tạo công việc");
    }
  };

  // ================= UPDATE (OPTIMISTIC & useCallback) =================
  // Dùng useCallback để hàm này không bị tạo lại sau mỗi lần render trang
  const updateTask = useCallback(async (id: string, data: any) => {
    setTasks((prevTasks) => {
      // Lưu lại mảng cũ để phòng trường hợp cần rollback
      const oldTasks = [...prevTasks];
      
      // Update UI ngay lập tức
      const newTasks = prevTasks.map((t) => (t.id === id ? { ...t, ...data, optimistic: true } : t));
      
      // Gọi API ngầm
      fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      .then(async (res) => {
         if (!res.ok) throw new Error("Update failed");
         const updatedTask = await res.json();
         // Cập nhật lại với dữ liệu thật từ server, xóa cờ optimistic
         setTasks(currentTasks => currentTasks.map(t => t.id === id ? updatedTask : t));
         toast.success("Cập nhật thành công!");
      })
      .catch((error) => {
         console.error(error);
         // Rollback nếu lỗi
         setTasks(oldTasks);
         toast.error("Lỗi: Không thể cập nhật công việc");
      });

      return newTasks;
    });
  }, []);

  // ================= DELETE (OPTIMISTIC & useCallback) =================
  const deleteTask = useCallback(async (id: string) => {
    setTasks((prevTasks) => {
      const oldTasks = [...prevTasks];
      const newTasks = prevTasks.filter((t) => t.id !== id);

      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        toast.success("Đã xóa công việc!");
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        setTasks(oldTasks);
        toast.error("Lỗi: Không thể xóa công việc");
      });

      return newTasks;
    });
  }, []);

  // Hàm handleEdit được bọc useCallback để truyền xuống TaskItem an toàn
  const handleEdit = useCallback((task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          {/* Hiển thị thống kê từ useMemo */}
          <p className="text-sm text-gray-500 mt-1">
            Tiến độ: <span className="font-semibold text-blue-600">{completedStats.completed}</span> / {completedStats.total} hoàn thành
          </p>
        </div>
        
        <Button
          onClick={() => {
            setSelectedTask(null);
            setOpen(true);
          }}
        >
          + Add Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-200 border-dashed">
          Chưa có công việc nào. Hãy tạo mới!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="relative">
              <div className={task.optimistic ? "opacity-50 pointer-events-none" : ""}>
                <TaskItem
                  task={task}
                  onEdit={handleEdit}
                  onDelete={deleteTask}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render Modal */}
      <TaskModal
        isOpen={open}
        task={selectedTask}
        onClose={() => setOpen(false)}
        onSubmit={(data: any) => {
          if (selectedTask) {
            updateTask(selectedTask.id, data);
          } else {
            createTask(data);
          }
          setOpen(false);
        }}
      />
    </div>
  );
}