import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { hi } from "date-fns/locale";
import { Calendar, User, MapPin, Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { BreakingNewsTicker } from "@/components/layout/BreakingNewsTicker";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { NewsCard } from "@/components/ui/NewsCard";
import { getPostBySlug, getLatestPosts, getBreakingNews, getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks } from "@/lib/news";
import { cn } from "@/lib/utils";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const [post, breakingNews, latestPosts, categories, locations, trendingTopics, navActions, headerTopLinks] = await Promise.all([
    getPostBySlug(params.slug),
    getBreakingNews(),
    getLatestPosts(5),
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
  ]);

  if (!post) {
    notFound();
  }

  const publishedAt = post.published_at ? new Date(post.published_at) : new Date(post.created_at);
  const formattedDate = format(publishedAt, "EEEE, d MMMM yyyy", { locale: hi });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header topLinks={headerTopLinks} />
      <MegaNav 
        categories={categories} 
        locations={locations} 
        navActions={navActions} 
        trendingTopics={trendingTopics} 
      />
      <BreakingNewsTicker headlines={breakingNews} />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 overflow-hidden whitespace-nowrap">
              <Link href="/" className="hover:text-brand transition-colors">होम</Link>
              <span>/</span>
              <Link href={`/category/${post.category?.slug}`} className="hover:text-brand transition-colors text-brand">
                {post.category?.name}
              </Link>
              <span>/</span>
              <span className="truncate">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.2] font-hindi">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-gray-100 py-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">
                    {post.author?.full_name?.[0] || 'A'}
                  </div>
                  <span className="font-bold text-gray-900">{post.author?.full_name || 'Admin'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                {post.location && (
                  <div className="flex items-center gap-2 text-brand">
                    <MapPin className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider">{post.location.name}</span>
                  </div>
                )}
              </div>

              {/* Social Share (Desktop) */}
              <div className="hidden md:flex items-center gap-4 mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">शेयर करें:</span>
                <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-2xl">
                <Image 
                  src={post.featured_image} 
                  alt={post.title} 
                  fill 
                  className="object-cover" 
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div 
              className={cn(
                "prose prose-lg max-w-none prose-brand font-hindi",
                "prose-headings:font-black prose-headings:text-gray-900 prose-headings:leading-tight",
                "prose-p:text-gray-700 prose-p:leading-[2] prose-p:mb-8",
                "prose-a:text-brand prose-a:no-underline hover:prose-a:underline",
                "prose-img:rounded-2xl prose-img:shadow-lg"
              )}
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Tags/Keywords could go here */}

            {/* Author Bio Section */}
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center text-brand font-black text-2xl relative overflow-hidden">
                {post.author?.avatar_url ? (
                  <Image src={post.author.avatar_url} alt={post.author.full_name} fill className="object-cover" />
                ) : (
                  post.author?.full_name?.[0] || 'A'
                )}
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-xl font-black text-gray-900 font-hindi">{post.author?.full_name || 'Admin'}</h4>
                <p className="text-gray-500 text-sm font-hindi leading-relaxed">
                  खबर सीमांचल के लिए वरिष्ठ संवाददाता। क्षेत्र की सच्ची खबरों को आप तक पहुँचाना ही हमारा लक्ष्य है।
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                  <Link href="#" className="text-gray-400 hover:text-brand transition-colors"><Twitter className="w-4 h-4" /></Link>
                  <Link href="#" className="text-gray-400 hover:text-brand transition-colors"><Facebook className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Trending */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-6 bg-brand rounded-full"></div>
                <h3 className="font-black text-xl text-gray-900 font-hindi tracking-tight">ताज़ा और लोकप्रिय</h3>
              </div>
              <div className="space-y-8">
                {latestPosts.map((otherPost) => (
                  <NewsCard key={otherPost.id} post={otherPost} variant="sidebar" />
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="w-full aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-8 text-center sticky top-24">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">विज्ञापन</span>
                <div className="h-0.5 bg-gray-100 w-12 mx-auto"></div>
                <p className="text-xs text-gray-400 italic">यहां विज्ञापन के लिए स्थान उपलब्ध है। संपर्क करें।</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
