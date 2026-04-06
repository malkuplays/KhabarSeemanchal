"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreakingNews {
  id: string;
  text: string;
  url?: string;
  priority?: string;
}

interface BreakingNewsTickerProps {
  headlines: BreakingNews[];
}

export function BreakingNewsTicker({ headlines }: BreakingNewsTickerProps) {
  if (!headlines || headlines.length === 0) return null;

  const isFlash = headlines[0]?.priority === 'flash';
  const isHigh = headlines[0]?.priority === 'high';

  return (
    <div className="w-full bg-white border-b border-gray-100 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-9 rounded-full border border-gray-200 overflow-hidden shadow-sm bg-white">
          
          {/* Label Badge */}
          <div className={cn(
            "h-full px-4 flex items-center gap-2 font-black text-[11px] relative z-30 whitespace-nowrap shrink-0 rounded-l-full",
            isFlash ? "bg-[#da251d] animate-pulse" :
            isHigh  ? "bg-[#b00000]" : "bg-[#da251d]"
          )}>
            {/* Live dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span className="font-news tracking-tight text-white uppercase text-[10px]">ताज़ा खबर</span>
            {/* Slanted divider */}
            <div className="absolute -right-3 top-0 h-full w-6 skew-x-[-15deg] z-10 bg-[#da251d]"></div>
          </div>

          {/* Scrolling Text Container */}
          <div className="flex-1 relative overflow-hidden h-full z-20 bg-white">
            {/* Fade overlay left */}
            <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            {/* Fade overlay right */}
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="absolute flex items-center h-full animate-ticker whitespace-nowrap pl-8">
              {[...headlines, ...headlines].map((item, idx) => (
                <Link
                  key={`${item.id}-${idx}`}
                  href={item.url || "#"}
                  className="text-gray-800 text-[13px] font-bold hover:text-[#da251d] transition-colors cursor-pointer flex items-center gap-3 font-news pr-10"
                >
                  <span className="text-[#da251d] text-[8px]">◆</span>
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Right action — pause hint */}
          <div className="h-full px-3 flex items-center shrink-0 border-l border-gray-100 bg-gray-50 rounded-r-full">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
