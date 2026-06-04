import React from 'react';
import { Home, BookOpen, FileCheck, CheckSquare, MessageSquare, Menu, X, BookMarked, Printer } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Giới thiệu & Tổng quan' },
    { id: 'projects', icon: BookOpen, label: 'Bài tập / Dự án' },
    { id: 'evidence', icon: FileCheck, label: 'Bảng Minh chứng' },
    { id: 'rubric', icon: CheckSquare, label: 'Rubric / Đánh giá' },
    { id: 'summary', icon: MessageSquare, label: 'Tổng kết cá nhân' },
    { id: 'print', icon: Printer, label: 'Bản in (PDF)' },
  ];

  return (
    <>
      {/* Mobile Header - Thêm print:hidden để ẩn khi in */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-2 font-bold text-lg">
          <BookMarked className="text-blue-400" />
          <span>My Portfolio</span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-1 bg-slate-800 rounded">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out z-40 flex flex-col shadow-2xl print:hidden`}>
          <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">L</div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">Vũ Hoàng Long</h2>
              <span className="text-xs text-blue-400 font-medium">Kỹ thuật máy tính - UET</span>
            </div>
          </div>
        </div>

        <div className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Điều hướng</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl font-medium transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : item.id === 'print' ? 'hover:bg-amber-600 hover:text-white text-amber-500' // Làm nổi bật nút In
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : (item.id === 'print' ? 'text-amber-500 group-hover:text-white' : 'text-slate-400 group-hover:text-blue-400')} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 border-t border-slate-800 text-xs text-slate-500">
          <p>Môn: Nhập môn CN Số & ƯD AI</p>
          <p className="mt-1">Năm học: 2025-2026</p>
        </div>
      </nav>
      
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}