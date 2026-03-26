import React from 'react';

// === BẢNG CHÍNH ===
export function Table({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        {children}
      </table>
    </div>
  );
}

// === PHẦN TIÊU ĐỀ (THEAD) ===
export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold uppercase text-xs tracking-wider">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHead({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <th scope="col" className={`px-6 py-4 ${className}`}>
      {children}
    </th>
  );
}

// === PHẦN NỘI DUNG (TBODY) ===
export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <tr className={`hover:bg-gray-50 transition-colors ${className}`}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <td className={`px-6 py-4 text-gray-700 ${className}`}>
      {children}
    </td>
  );
}