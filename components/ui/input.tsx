import React, { useId, forwardRef } from 'react';

// Định nghĩa Props: Kế thừa tất cả thuộc tính mặc định của thẻ <input>
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// BỌC BẰNG forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    
    // Tạo ID tự động
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref} // BẮT BUỘC: Nhận ref từ react-hook-form
          className={`
            px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors
            ${error 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
            }
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          `}
          {...props} 
        />
        
        {error && (
          <span className="text-sm text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

// Thêm dòng này để React DevTools dễ debug hơn
Input.displayName = 'Input';

export default Input;