"use client";

import React, { useState } from "react";
import { Search, User, X, Menu } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUI } from "@/context/SearchContext";

interface HeaderTopLink {
  id: string;
  label: string;
  url: string;
}

interface HeaderProps {
  topLinks?: HeaderTopLink[];
  logoUrl?: string | null;
  siteName?: string;
  siteTagline?: string;
}

export function Header({ topLinks = [], logoUrl, siteName = 'जागरण', siteTagline = 'Khabar Seemanchal' }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { isSearchOpen, setIsSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useUI();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Format date in Hindi: मंगलवार, 07 अप्रैल 2026 | अपडेटेड 01:23 PM IST
  const now = new Date();
  const dayNames = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
  const monthNames = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  
  const dateStr = `${dayNames[now.getDay()]}, ${String(now.getDate()).padStart(2, '0')} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return (
    <header className="flex flex-col w-full font-news sticky top-0 z-50">
      {/* Top Bar - Black Background */}
      <div className="bg-[#000000] text-white py-0.5 border-b border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center text-[9px] font-black uppercase tracking-tight">
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#da251d]">
            LANGUAGE <span className="text-[7px] ml-0.5">▼</span>
          </div>
          
          <div className="flex-1 text-center font-bold tracking-normal opacity-90 text-[7px] md:text-[9px]">
            {dateStr} | अपडेटेड {timeStr} IST
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            {topLinks.map((link) => (
              <Link 
                key={link.id} 
                href={link.url} 
                className="hover:text-[#da251d] transition-colors hover:bg-white/5 px-1 py-0.5 rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 flex items-center h-14 md:h-20 shadow-sm md:shadow-none">
        <div className="container mx-auto px-4 flex items-center justify-between h-full gap-2">
          {/* Logo (Left-aligned) */}
          <Link href="/" className="flex items-center gap-1.5 md:gap-2.5 group shrink-0 h-full py-1.5 md:py-3">
            {logoUrl ? (
              <div className="h-full py-1 md:py-1.5">
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={160}
                  height={56}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            ) : (
              <>
                <div className="h-full w-auto aspect-square relative flex items-center justify-center scale-[0.65] md:scale-100 -ml-2 md:ml-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#da251d] to-[#b00000] rounded-lg rotate-3 group-hover:rotate-6 transition-transform shadow-lg shadow-red-500/10"></div>
                  <div className="relative text-white font-black text-sm md:text-xl">K</div>
                </div>
                <div className="flex flex-col -gap-0.5 md:-gap-1 -ml-1 md:ml-0">
                  <span className="text-[#212121] font-black text-sm md:text-2xl font-news tracking-tighter leading-none group-hover:text-[#da251d] transition-colors">
                    {siteName}
                  </span>
                  <span className="text-[5px] md:text-[9px] uppercase font-bold tracking-[0.05em] md:tracking-[0.2em] text-gray-500 group-hover:text-[#da251d] transition-colors pl-0.5">
                    {siteTagline}
                  </span>
                </div>
              </>
            )}
          </Link>
          
          {/* Search Bar - Center (Desktop Only) */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-lg mx-8 relative h-9 group">
            <input 
              type="text" 
              placeholder="खबरें खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full bg-[#f6f6f6] border border-transparent focus:border-[#da251d] focus:bg-white px-4 rounded-[4px] text-[14px] font-news transition-all outline-none"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-[#CC0000] hover:bg-[#B00000] text-white rounded-r-[4px] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
          
          {/* Action Area - Mobile Right Aligned, Desktop Right Pinned */}
          <div className="flex items-center gap-1 md:gap-2.5">
            {/* Desktop Search Trigger (Hidden on mobile Row 1, moved to Row 2) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1 px-1.5 md:p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-all hidden lg:flex"
            >
              <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-700" />
            </button>

            {/* Subscribe Pill */}
            <Button 
              onClick={() => router.push('/subscribe')}
              className="bg-[#da251d] hover:bg-[#B00000] text-white font-black text-[8px] md:text-[13px] px-2 md:px-4 h-6 md:h-9 rounded-full shadow-md transition-all transform active:scale-95 flex items-center justify-center"
            >
              सब्सक्राइब
            </Button>
            
            {/* Search Trigger (Mobile Only - Replaces Profile) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex lg:hidden items-center justify-center w-6 h-6 bg-[#f5f3f3] rounded-full hover:bg-gray-200 transition-colors shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-gray-700" />
            </button>

            {/* Profile Circle (Desktop Only) */}
            <Link href="/profile" className="hidden lg:flex items-center justify-center w-9 h-9 bg-[#f5f3f3] rounded-full hover:bg-gray-200 transition-colors shadow-sm">
              <User className="w-5 h-5 text-gray-700" />
            </Link>

            {/* Mobile Menu Trigger (Far Right) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-gray-700 lg:hidden hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Search Popup Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-start pt-32 px-4 animate-in fade-in duration-300">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
            >
              <Icons.X className="w-10 h-10" />
            </button>
            
            <div className="w-full max-w-3xl space-y-6 md:space-y-8 animate-in slide-in-from-top-4 duration-500">
              <h2 className="text-white text-2xl md:text-4xl font-black font-news text-center mb-6 md:mb-12">खबरें खोजें</h2>
              <form onSubmit={(e) => {
                handleSearch(e);
                setIsSearchOpen(false);
              }} className="relative group">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="यहाँ टाइप करें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 md:border-b-4 border-white/20 focus:border-primary px-4 py-4 md:py-6 text-xl md:text-4xl font-bold text-white outline-none transition-all placeholder:text-white/20"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">
                  <Search className="w-6 h-6 md:w-10 md:h-10" />
                </button>
              </form>
              
              <div className="flex flex-wrap justify-center gap-3 pt-8">
                <span className="text-white/40 text-sm font-bold w-full text-center mb-2 uppercase tracking-widest">ट्रेंडिंग कीवर्ड्स</span>
                {["बिहार चुनाव", "मानसून", "आईपीएल", "कोरोना", "महंगाई"].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      router.push(`/search?q=${tag}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white/80 rounded-full border border-white/10 text-sm font-bold transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
