"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

// MỚI: Import CommentSection
import CommentSection from "./CommentSection";

// ================= VALIDATION SCHEMA =================
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

type FormData = z.infer<typeof schema>;

// ================= COMPONENT =================
export default function TaskModal({ isOpen, onClose, onSubmit, task }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate || "",
      });
    } else {
      reset({ title: "", description: "", dueDate: "" });
    }
  }, [task, reset]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={task ? "Edit Task" : "Create New Task"}
    >
      {/* FORM CHÍNH: Dùng để Update hoặc Create Task */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* TITLE */}
        <Input
          label="Task Title"
          placeholder="Enter task title..."
          {...register("title")}
          error={errors.title?.message}
        />

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Describe the task in detail..."
            {...register("description")}
            rows={3}
            className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-shadow ${
              errors.description
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {errors.description && (
            <span className="text-sm text-red-500">{errors.description.message}</span>
          )}
        </div>

        {/* DUE DATE */}
        <Input
          type="date"
          label="Due Date"
          {...register("dueDate")}
          error={errors.dueDate?.message}
        />

        {/* NÚT ACTION CỦA TASK */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {task ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>

      {/* MỚI: KHU VỰC COMMENT REAL-TIME */}
      {/* Chỉ hiển thị khu vực này nếu đang Edit Task (tức là biến `task` có tồn tại) */}
      {task && (
        <CommentSection taskId={task.id} />
      )}
      
    </Modal>
  );
}