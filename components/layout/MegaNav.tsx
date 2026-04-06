"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Menu, X, Search, MapPin, FileText, Gamepad2, Play, 
  Video, ChevronDown, Flame, Diamond 
} from "lucide-react";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { useUI } from "@/context/SearchContext";

interface NavItem {
  id: string;
  name: string;
  slug: string;
  type?: string;
}

interface NavAction {
  id: string;
  label: string;
  icon_name: string;
  url: string;
}

interface TrendingTopic {
  id: string;
  label: string;
  url: string;
  badge_text?: string;
  is_highlight?: boolean;
}

interface MegaNavProps {
  categories: NavItem[];
  locations: NavItem[];
  navActions: NavAction[];
  trendingTopics: TrendingTopic[];
}

export function MegaNav({ categories, locations, navActions, trendingTopics }: MegaNavProps) {
  const { isSearchOpen, setIsSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useUI();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Icon component helper
  const IconComponent = ({ name, className }: { name: string, className?: string }) => {
    const LucideIcon = (Icons as any)[name];
    if (!LucideIcon) return <div className={className} />;
    return <LucideIcon className={className} />;
  };

  const mainNav = [
    { name: "होम", slug: "", type: "special" },
    ...categories.map(c => ({ ...c, type: 'category' }))
  ];

  return (
    <div className={cn(
      "w-full z-[60] transition-all duration-300 font-news",
      isScrolled ? "lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:shadow-xl relative" : "relative"
    )}>
      {/* Primary Navigation Bar (Categories) */}
      <div className="bg-white border-b border-gray-100 h-11 md:h-14">
        {/* Desktop Container */}
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          {/* Menu Button - Desktop Only in this row */}
          <button 
            onClick={() => setIsMoreMenuOpen(true)}
            className="hidden lg:flex items-center gap-2 px-4 h-full border-r border-gray-100 hover:bg-gray-50 transition-all group"
          >
            <Menu className="w-5 h-5 text-gray-900 group-hover:text-primary" />
            <span className="text-sm font-black text-gray-900 group-hover:text-primary">मेनू</span>
          </button>

          {/* Main Menu Items - Scrollable on mobile */}
          <div className="flex-1 flex items-center h-full overflow-x-auto scrollbar-hide whitespace-nowrap gap-0 px-2 lg:overflow-hidden lg:pl-0">
            {/* Prime Badge */}
            <Link href="/prime" className="flex items-center gap-1.5 px-3 md:px-4 h-full border-b-2 border-transparent hover:border-[#da251d] transition-all group shrink-0">
              <div className="w-4 h-4 md:w-5 md:h-5 relative flex items-center justify-center">
                <Diamond className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#da141b] fill-[#da141b]" />
                <div className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5 md:h-2 md:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-red-500"></span>
                </div>
              </div>
              <span className="text-[#da141b] font-black text-[10px] md:text-xs tracking-tighter uppercase">PRIME</span>
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-2.5 md:px-3 h-full flex items-center text-gray-900 font-bold text-[13px] md:text-[15px] border-b-2 border-transparent hover:text-[#da251d] hover:border-[#da251d] transition-all whitespace-nowrap shrink-0"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Other Dropdown - Pinned to the right on desktop, hidden on scroll-heavy mobile */}
          <div className="relative h-full group shrink-0 min-w-fit hidden lg:block">
            <button className="px-3 h-full flex items-center text-gray-900 font-bold text-[15px] border-b-2 border-transparent group-hover:text-[#da251d] group-hover:border-[#da251d] transition-all gap-1">
              अन्य : <ChevronDown className="w-3 h-3 mt-1 group-hover:rotate-180 transition-transform" />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 w-48 bg-white shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {locations.slice(0, 5).map(loc => (
                <Link 
                  key={loc.id} 
                  href={`/location/${loc.slug}`}
                  className="block px-4 py-2 text-[15px] font-bold text-gray-700 hover:bg-red-50 hover:text-[#da251d] transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav Actions - Desktop Only Area */}
          <div className="hidden lg:flex h-full bg-[#fff4f4] border-l border-red-50 pr-4">
            {navActions.map((action, idx) => {
              // Map dynamic actions to our new functional routes based on label keywords
              let href = action.url;
              if (action.label.includes('शहर') || action.label.includes('सिटी')) href = '/cities';
              if (action.label.includes('पेपर')) href = '/epaper';
              if (action.label.includes('प्ले')) href = '/play';
              if (action.label.includes('वीडियो')) href = '/videos';

              if (action.label.includes('खोजे') || action.label.includes('Search') || action.icon_name.includes('Search')) {
                return (
                  <button
                    key={action.id}
                    onClick={() => setIsSearchOpen(true)}
                    className={cn(
                      "flex flex-col items-center justify-center px-4 h-full border-b-2 border-transparent hover:border-[#da251d] transition-all group",
                      idx === navActions.length - 1 && "relative"
                    )}
                  >
                    <IconComponent 
                      name={action.icon_name} 
                      className="w-[18px] h-[18px] text-gray-600 group-hover:text-[#da251d] transition-colors" 
                    />
                    <span className="text-[11px] font-bold text-gray-500 group-hover:text-[#da251d] mt-1 tracking-tight leading-none text-center">
                      {action.label}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={action.id}
                  href={href}
                  className={cn(
                    "flex flex-col items-center justify-center px-4 h-full border-b-2 border-transparent hover:border-[#da251d] transition-all group",
                    idx === navActions.length - 1 && "relative"
                  )}
                >
                  <IconComponent 
                    name={action.icon_name} 
                    className="w-[18px] h-[18px] text-gray-600 group-hover:text-[#da251d] transition-colors" 
                  />
                  <span className="text-[11px] font-bold text-gray-500 group-hover:text-[#da251d] mt-1 tracking-tight leading-none text-center">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Focus / Trending Bar */}
      <div className="bg-[#f8f8f8] md:bg-white border-b border-gray-100 py-0.5 lg:pt-5 lg:pb-2.5 mt-0">
        <div className="container mx-auto px-4 flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-gray-900 font-black text-[10px] md:text-[13px] tracking-tight uppercase">फोकस</span>
            <div className="w-0 h-0 border-t-[2px] md:border-t-[2.5px] border-t-transparent border-b-[2px] md:border-b-[2.5px] border-b-transparent border-l-[3px] md:border-l-[4px] border-l-black mt-0.5"></div>
          </div>
          
          <div className="flex-1 flex items-center gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide pt-2 md:pt-3 pb-1">
            {trendingTopics.map((topic) => (
              <Link
                key={topic.id}
                href={topic.url}
                className={cn(
                  "px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-[11px] md:text-[13px] font-bold whitespace-nowrap transition-all relative group/topic",
                  topic.is_highlight 
                    ? "bg-[#CC0000] text-white hover:opacity-90 shadow-sm" 
                    : "bg-white md:bg-[#f5f3f3] text-gray-900 border border-gray-100 md:border-transparent hover:bg-black hover:text-white"
                )}
              >
                {topic.label}
                {topic.badge_text && (
                  <span className={cn(
                    "absolute -top-1.5 md:-top-2 -right-1 md:-right-1.5 px-1.5 md:px-2 py-0.5 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-tighter leading-none shadow-md z-10",
                    "bg-[#CC0000] text-white animate-pulse"
                  )}>
                    {topic.badge_text}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Redundant Mobile Top Bar Removed */}

      {/* More Menu Drawer (Side Drawer) */}
      {(isMoreMenuOpen || isMobileMenuOpen) && (
        <div className="fixed inset-0 bg-black/60 z-[100] animate-in fade-in duration-300">
          <div className={cn(
            "fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-500",
            !isMoreMenuOpen && !isMobileMenuOpen && "hidden"
          )}>
            {/* Drawer Header */}
            <div className="p-6 bg-[#004B87] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white rounded-lg rotate-3 flex items-center justify-center shadow-lg">
                    <span className="text-[#004B87] font-black text-xl">K</span>
                 </div>
                 <div className="flex flex-col -gap-1">
                   <span className="text-xl font-black font-news tracking-tighter">जागरण</span>
                   <span className="text-[9px] uppercase font-bold tracking-widest opacity-70">Seemanchal</span>
                 </div>
              </div>
              <button 
                onClick={() => { setIsMoreMenuOpen(false); setIsMobileMenuOpen(false); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {/* Search in Drawer (Mobile focus) */}
              <div className="lg:hidden">
                 <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">खबरें खोजें</h3>
                 <form onSubmit={(e) => {
                    e.preventDefault();
                    const q = new FormData(e.currentTarget).get('q');
                    if (q) {
                      window.location.href = `/search?q=${q}`;
                      setIsMobileMenuOpen(false);
                    }
                 }} className="relative group">
                    <input 
                      type="text" 
                      name="q" 
                      placeholder="यहाँ टाइप करें..." 
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:border-[#004B87] focus:bg-white outline-none transition-all" 
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004B87] transition-colors">
                       <Search className="w-5 h-5" />
                    </button>
                 </form>
              </div>

              {/* Navigation Sections */}
              <div className="grid grid-cols-1 gap-8">
                {/* Main Links */}
                <div>
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#004B87] rounded-full"></div>
                    मुख्य श्रेणियाँ
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <Link 
                        key={`drawer-${cat.id}`}
                        href={`/category/${cat.slug}`}
                        onClick={() => { setIsMoreMenuOpen(false); setIsMobileMenuOpen(false); }}
                        className="px-4 py-3 bg-gray-50 hover:bg-[#004B87]/5 hover:text-[#004B87] rounded-lg text-sm font-bold transition-all border border-transparent hover:border-[#004B87]/10"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    शहर चुनें
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {locations.map(loc => (
                      <Link 
                        key={`drawer-loc-${loc.id}`}
                        href={`/location/${loc.slug}`}
                        onClick={() => { setIsMoreMenuOpen(false); setIsMobileMenuOpen(false); }}
                        className="px-3 py-2.5 border border-gray-100 hover:border-red-200 hover:text-red-600 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {loc.name}
                      </Link>
                    ))}
                    <Link 
                      href="/cities"
                      onClick={() => { setIsMoreMenuOpen(false); setIsMobileMenuOpen(false); }}
                      className="px-4 py-3 bg-gray-900 text-white rounded-lg text-sm font-black text-center col-span-2 hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                      सभी शहर देखें <ChevronDown className="w-4 h-4 -rotate-90" />
                    </Link>
                  </div>
                </div>

                {/* Other Actions */}
                <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                  {[
                    { label: 'ई-पेपर', icon: FileText, href: '/epaper' },
                    { label: 'वीडियो', icon: Video, href: '/videos' },
                    { label: 'प्ले', icon: Gamepad2, href: '/play' },
                    { label: 'सब्सक्राइब', icon: Diamond, href: '/subscribe', primary: true }
                  ].map(item => (
                    <Link 
                      key={item.label}
                      href={item.href}
                      onClick={() => { setIsMoreMenuOpen(false); setIsMobileMenuOpen(false); }}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-xl transition-all border",
                        item.primary 
                          ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-100" 
                          : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      <item.icon className="w-6 h-6 mb-2" />
                      <span className="text-xs font-black uppercase tracking-tighter">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
               <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 Khabar Seemanchal</span>
                    <div className="flex gap-3">
                       <Link href="#" className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-all">
                          <Icons.Facebook className="w-4 h-4" />
                       </Link>
                       <Link href="#" className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-all">
                          <Icons.Twitter className="w-4 h-4" />
                       </Link>
                       <Link href="#" className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF0000] hover:border-[#FF0000] transition-all">
                          <Icons.Youtube className="w-4 h-4" />
                       </Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <Link href="/about" className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-tight">हमारे बारे में</Link>
                    <Link href="/contact" className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-tight">संपर्क करें</Link>
                    <Link href="/privacy" className="text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-tight">गोपनीयता नीति</Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
