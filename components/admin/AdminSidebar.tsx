"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Layers, 
  MapPin, 
  Bell, 
  TrendingUp, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { name: "डैशबोर्ड", icon: LayoutDashboard, href: "/admin/dashboard", description: "Overview" },
  { name: "सभी खबरें", icon: FileText, href: "/admin/posts", description: "Manage Posts" },
  { name: "नई खबर जोड़ें", icon: PlusCircle, href: "/admin/posts/new", description: "Create Post" },
  { name: "श्रेणियां", icon: Layers, href: "/admin/categories", description: "Categories" },
  { name: "क्षेत्र/स्थान", icon: MapPin, href: "/admin/locations", description: "Locations" },
  { name: "ब्रेकिंग न्यूज़", icon: Bell, href: "/admin/ticker", description: "Breaking News" },
  { name: "ट्रेंडिंग टॉपिक्स", icon: TrendingUp, href: "/admin/trending", description: "Focal Bar" },
  { name: "साइट सेटिंग्स", icon: Settings, href: "/admin/settings", description: "Logo & Branding" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div 
      className={cn(
        "bg-white border-r border-gray-100 flex flex-col h-screen transition-all duration-300 relative",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Sidebar Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 text-gray-400 hover:text-brand"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Header / Logo */}
      <div className="p-6">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#da251d] to-[#b00000] rounded-lg rotate-3 flex-shrink-0 flex items-center justify-center shadow-md">
            <span className="text-white font-black text-xl">K</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col -gap-1">
              <span className="text-lg font-black text-gray-900 leading-none">CMS</span>
              <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-gray-400">ADMIN PANEL</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-[#da251d]/5 text-[#da251d]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-[#da251d]" : "text-gray-400 group-hover:text-gray-900"
              )} />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold font-hindi leading-none">{item.name}</span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight mt-0.5">{item.description}</span>
                </div>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#da251d]" />
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                 <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-xl">
                    {item.name}
                 </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all group",
            "text-gray-500 hover:bg-red-50 hover:text-red-600"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-bold font-hindi">लॉग आउट</span>}
        </button>
      </div>
    </div>
  );
}
