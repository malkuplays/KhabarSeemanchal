"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { hi } from "date-fns/locale";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  post: any;
  variant?: 'featured' | 'list' | 'sidebar' | 'grid';
  className?: string;
  priority?: boolean;
}

export function NewsCard({ post, variant = 'grid', className, priority = false }: NewsCardProps) {
  const { title, slug, excerpt, featured_image, published_at, category, location, author } = post;
  
  const date = published_at ? new Date(published_at) : new Date();
  const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: hi });

  // 1. Featured Variant (Main Story - Center Column)
  if (variant === 'featured') {
    return (
      <Link href={`/p/${slug}`} className={cn("group flex flex-col space-y-4", className)}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          {featured_image && (
            <Image 
              src={featured_image} 
              alt={title} 
              fill 
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          )}
          <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest z-10 font-news">
            {category?.name || 'Top News'}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-[1.15] font-news">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed font-news line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo}</span>
            {location && <span className="flex items-center gap-1 text-primary"><MapPin className="w-3 h-3" /> {location.name}</span>}
          </div>
        </div>
      </Link>
    );
  }

  // 2. List Variant (Latest News - Left Column)
  if (variant === 'list') {
    return (
      <Link href={`/p/${slug}`} className={cn("group flex items-start py-4 border-b border-gray-100 last:border-0", className)}>
        <div className="flex-1 pr-4 space-y-1.5">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight font-news line-clamp-3">
            {title}
          </h3>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight flex items-center gap-2">
             <span className="text-primary">{category?.name}</span>
             <span>•</span>
             <span>{timeAgo}</span>
          </div>
        </div>
        <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden bg-gray-50">
          {featured_image && (
            <Image src={featured_image} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          )}
        </div>
      </Link>
    );
  }

  // 3. Sidebar Variant (Trending - Right Column)
  if (variant === 'sidebar') {
    return (
      <Link href={`/p/${slug}`} className={cn("group flex gap-3 py-3 items-center border-b border-gray-50 last:border-0", className)}>
        <div className="text-2xl font-black text-gray-200 group-hover:text-primary/20 transition-colors tabular-nums min-w-[1.5rem]">
          {post.index || '•'}
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight font-news line-clamp-2">
            {title}
          </h4>
          <span className="text-[10px] text-muted-foreground font-bold">{category?.name}</span>
        </div>
      </Link>
    );
  }

  // 4. Default Grid/Medium Variant
  return (
    <Link href={`/p/${slug}`} className={cn("group flex flex-col space-y-3", className)}>
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {featured_image && (
          <Image src={featured_image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors leading-snug font-news line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase">
          <span className="text-primary font-black uppercase tracking-widest">{category?.name}</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}
