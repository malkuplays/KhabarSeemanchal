"use client";

import { Facebook, Twitter, Youtube, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export function TopBar() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setDateStr(now.toLocaleDateString('hi-IN', options));
  }, []);

  return (
    <div className="bg-brand text-white h-9 flex items-center justify-between px-4 text-xs font-medium sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <span>{dateStr}</span>
        <span className="hidden md:inline-block border-l border-white/20 pl-4">पूर्णिया: 28°C</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-white/80 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
          <a href="#" className="hover:text-white/80 transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
          <a href="#" className="hover:text-white/80 transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
        </div>
        <a href="#" className="hidden sm:flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded transition-colors">
          <Smartphone className="w-3.5 h-3.5" />
          <span>ऐप डाउनलोड करें</span>
        </a>
      </div>
    </div>
  );
}
