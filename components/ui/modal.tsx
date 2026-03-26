"use client"; 

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // ✅ KHÓA CUỘN TRANG KHI MỞ MODAL
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // ✅ MỞ KHÓA CUỘN TRANG KHI ĐÓNG MODAL
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  
  if (!isOpen) return null;

  return (
    <div 
      // Thêm role="dialog" và aria-modal để tốt cho Accessibility (Người khiếm thị dùng máy đọc màn hình)
      role="dialog" 
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto" // Thêm max-h và overflow-y để Modal tự có thanh cuộn nếu nội dung quá dài
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 focus:outline-none"
        >
          ✕
        </button>
        {title && <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>}
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}