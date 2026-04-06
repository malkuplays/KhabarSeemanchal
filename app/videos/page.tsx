import { Header } from "@/components/layout/Header";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks, getLatestPosts } from "@/lib/news";
import { Play, Share2, MessageCircle, ThumbsUp, ChevronRight, Eye, Calendar, User, TrendingUp, Video } from "lucide-react";
import Link from "next/link";

export default async function VideosPage() {
  const [categories, locations, trendingTopics, navActions, headerTopLinks, latestPosts] = await Promise.all([
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
    getLatestPosts(10),
  ]);

  const featuredVideo = latestPosts[0];
  const sidebarVideos = latestPosts.slice(1, 6);
  const bottomVideos = latestPosts.slice(6, 10);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] text-white font-news">
      <Header topLinks={headerTopLinks} />
      <MegaNav 
        categories={categories} 
        locations={locations} 
        navActions={navActions} 
        trendingTopics={trendingTopics} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Video Section (Left) */}
          <div className="lg:col-span-8 space-y-8">
             {/* Player Area */}
             <div className="aspect-video bg-black rounded-3xl overflow-hidden relative group border border-white/5 shadow-2xl">
                <img src={featuredVideo?.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-80" alt="Video Player" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <button className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 transition-all transform animate-pulse hover:animate-none">
                      <Play className="w-10 h-10 fill-white ml-2" />
                   </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                   <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded uppercase tracking-widest mb-4 inline-block">लाईव</span>
                   <h1 className="text-3xl font-black leading-tight max-w-4xl">{featuredVideo?.title}</h1>
                </div>
             </div>

             {/* Video Info Area */}
             <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl font-black">K</div>
                      <div>
                         <h3 className="font-black text-lg">खबर सीमांचल न्यूज़</h3>
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">102K सबस्क्राइबर्स</span>
                      </div>
                      <button className="ml-6 px-6 py-2.5 bg-white text-black font-black text-sm rounded-full hover:bg-gray-200 transition-all uppercase tracking-tight">सब्सक्राइब</button>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="flex bg-white/10 rounded-full overflow-hidden">
                         <button className="flex items-center gap-2 px-6 py-2.5 hover:bg-white/10 transition-colors border-r border-white/10 text-sm font-bold"><ThumbsUp className="w-4 h-4" /> 12K</button>
                         <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 transition-colors opacity-60"><ThumbsUp className="w-4 h-4 rotate-180" /></button>
                      </div>
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-bold"><Share2 className="w-4 h-4" /> शेयर</button>
                   </div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 text-sm text-gray-300 font-bold leading-relaxed border border-white/5 backdrop-blur-sm">
                   <div className="flex gap-4 mb-4 text-white uppercase tracking-widest text-[11px] font-black">
                      <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> 245K व्यूज</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredVideo && new Date(featuredVideo.created_at).toLocaleDateString('hi-IN')}</span>
                   </div>
                   <p className="line-clamp-3 hover:line-clamp-none cursor-pointer transition-all">{featuredVideo?.summary}</p>
                </div>
             </div>
          </div>

          {/* Sidebar Feed (Right) */}
          <div className="lg:col-span-4 space-y-8">
             <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-black font-news flex items-center gap-2 tracking-tight">
                   <TrendingUp className="w-5 h-5 text-primary" />
                   अगली खबरें
                </h2>
             </div>
             <div className="flex flex-col gap-6 overflow-y-auto max-h-[1000px] scrollbar-hide pr-2">
                {sidebarVideos.map((video) => (
                  <Link key={video.id} href={`/p/${video.slug}`} className="group flex gap-4 h-28 hover:bg-white/5 p-2 rounded-2xl transition-all border border-transparent hover:border-white/5">
                     <div className="w-48 h-full bg-gray-800 rounded-xl overflow-hidden relative shrink-0">
                        <img src={video.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 opacity-90" alt={video.title} />
                        <div className="absolute right-2 bottom-2 px-1.5 py-0.5 bg-black/80 rounded text-[10px] font-bold">12:34</div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Play className="w-6 h-6 fill-white" />
                        </div>
                     </div>
                     <div className="flex-1 py-1 space-y-2">
                        <h4 className="text-sm font-black font-news leading-tight line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h4>
                        <div className="text-[10px] text-gray-500 font-bold flex flex-col gap-0.5 uppercase tracking-widest leading-none">
                           <span>खबर सीमांचल न्यूज़</span>
                           <span className="flex items-center gap-2">45K व्यूज • 2 दिन पहले</span>
                        </div>
                     </div>
                  </Link>
                ))}
             </div>
          </div>
        </div>

        {/* Categories / Explore Section (Bottom) */}
        <section className="mt-20 pt-16 border-t border-white/5">
           <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-black font-news flex items-center gap-4 tracking-tighter">
                 <Video className="w-10 h-10 text-primary" />
                 तड़का वीडियो
              </h2>
              <button className="px-8 py-3 bg-white/5 text-white text-xs font-black rounded-full hover:bg-primary transition-all uppercase tracking-widest border border-white/10">सभी वीडियो देखें</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bottomVideos.map((video) => (
                <Link key={video.id} href={`/p/${video.slug}`} className="group space-y-4">
                   <div className="aspect-video bg-gray-800 rounded-3xl overflow-hidden relative border border-white/5 shadow-lg flex items-center justify-center shadow-black/40">
                      <img src={video.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-90" alt="Video" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                      <div className="absolute w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all transform border border-white/10">
                         <Play className="w-5 h-5 fill-white" />
                      </div>
                   </div>
                   <div className="space-y-2 px-2">
                      <h4 className="text-lg font-black font-news leading-tight line-clamp-2 group-hover:text-primary transition-all">{video.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-widest">
                         <span>32K व्यूज</span>
                         <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                         <span>5 घंटे पहले</span>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
