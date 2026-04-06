"use client";

import { AdminSidebar } from "./AdminSidebar";
import { User, Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden font-news selection:bg-[#da251d]/10 selection:text-[#da251d]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[100] lg:hidden animate-in fade-in duration-300 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-[110] lg:hidden transition-transform duration-300",
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 lg:hidden hover:bg-gray-50 rounded-xl text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-sm font-black text-gray-900 tracking-tight leading-none uppercase tracking-[0.1em]">
                खबर सीमांचल CMS
              </h2>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Khabar Seemanchal Administration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Toggle (Optional) */}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all group">
              <Search size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold font-hindi">खोजें (Posts, Tags)</span>
              <kbd className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded ml-2 font-sans font-medium">⌘K</kbd>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2.5 text-gray-400 hover:text-brand hover:bg-red-50 rounded-xl transition-all relative group">
                <Bell size={20} className="group-hover:animate-pulse" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#da251d] rounded-full border-2 border-white"></span>
              </button>
            </div>

            <div className="h-8 w-px bg-gray-100 mx-2 hidden sm:block"></div>

            {/* User Profile */}
            <button className="flex items-center gap-3 p-1 pr-3 hover:bg-gray-50 rounded-xl transition-all group border border-transparent hover:border-gray-100">
               <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white font-black text-sm relative overflow-hidden">
                  <User size={18} />
               </div>
               <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-black text-gray-900 leading-none group-hover:text-brand transition-colors uppercase tracking-tight">Admin User</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Super Admin</span>
               </div>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto w-full p-4 md:p-8 scroll-smooth scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
