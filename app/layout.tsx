import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management System",
  description: "Manage your tasks efficiently with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-50 text-gray-900`}
      >
        {/* Toaster hoạt động độc lập, không cần bọc trong AuthProvider */}
        <Toaster position="top-right" />

        <AuthProvider>
          <Navbar />

          <main className="flex-1 container mx-auto p-4 my-8">
            {children}
          </main>

          <footer className="bg-gray-800 text-white text-center p-4 mt-auto text-sm">
            <p>&copy; {new Date().getFullYear()} Task Management System</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}