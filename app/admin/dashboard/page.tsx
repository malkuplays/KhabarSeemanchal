import { AdminLayout } from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/server";
import { 
  FileText, 
  Users, 
  Eye, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { hi } from "date-fns/locale";

export default async function DashboardPage() {
  const supabase = createClient();
  
  // Fetch some basic stats
  const [
    { count: postsCount },
    { count: categoriesCount },
    { data: recentPosts },
    { data: breakingNews }
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('id, title, status, published_at, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('breaking_news').select('*').eq('is_active', true).limit(3)
  ]);

  const stats = [
    { name: "कुल खबरें", value: postsCount || 0, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "श्रेणियां", value: categoriesCount || 0, icon: TrendingUp, color: "text-[#da251d]", bg: "bg-red-50" },
    { name: "कुल व्यूज", value: "1.2k", icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "सक्रिय लेखक", value: "3", icon: Users, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-10 pb-12">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-hindi">नमस्ते, एडमिन! 👋</h1>
            <p className="text-gray-500 font-hindi text-sm">आज की ताज़ा खबरों और पोर्टल के प्रदर्शन का अवलोकन करें।</p>
          </div>
          <Link 
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#da251d] to-[#b00000] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} />
            नई खबर जोड़ें
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center gap-4 relative z-10">
                <div className={cn("p-3.5 rounded-xl group-hover:scale-110 transition-transform", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="flex flex-col">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.name}</p>
                   <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <stat.icon className={cn("w-24 h-24", stat.color)} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-6 bg-brand rounded-full"></div>
                 <h2 className="text-xl font-black text-gray-900 font-hindi uppercase tracking-tight">हालिया खबरें</h2>
              </div>
              <Link href="/admin/posts" className="text-xs font-black text-brand uppercase tracking-widest hover:underline flex items-center gap-1 group">
                सभी देखें <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-6">
              {recentPosts?.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                  <div className="flex flex-col gap-2 min-w-0 pr-4">
                    <h3 className="font-bold text-gray-900 font-hindi leading-tight truncate group-hover:text-brand transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                       <div className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {format(new Date(post.created_at), "d MMM, yyyy", { locale: hi })}
                       </div>
                       <div className="flex items-center gap-1.5">
                          {post.status === 'published' ? (
                            <>
                              <CheckCircle2 size={12} className="text-green-500" />
                              <span className="text-green-600">प्रकाशित</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle size={12} className="text-yellow-500" />
                              <span className="text-yellow-600">ड्राफ्ट</span>
                            </>
                          )}
                       </div>
                    </div>
                  </div>
                  <Link 
                    href={`/admin/posts/${post.id}`}
                    className="p-2.5 text-gray-400 hover:text-brand hover:bg-red-50 rounded-lg transition-all"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Area 2: Breaking News Status */}
          <div className="lg:col-span-4 bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
             <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                   <div className="w-2 h-6 bg-brand rounded-full animate-pulse"></div>
                   <h2 className="text-xl font-black font-hindi uppercase tracking-tight">ब्रेकिंग न्यूज़</h2>
                </div>

                <div className="space-y-6 flex-1">
                   {breakingNews?.map((news) => (
                      <div key={news.id} className="p-4 bg-white/10 rounded-xl border border-white/5 hover:bg-white/20 transition-all cursor-default">
                         <p className="text-sm font-hindi leading-relaxed text-gray-100">{news.text}</p>
                         <div className="mt-3 flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand">सक्रिय</span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">{format(new Date(news.created_at), "HH:mm")}</span>
                         </div>
                      </div>
                   ))}
                </div>

                <Link 
                  href="/admin/ticker"
                  className="mt-10 flex items-center justify-center gap-2 py-4 bg-white text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-brand transition-all active:scale-95"
                >
                   संपादित करें
                </Link>
             </div>
             
             {/* Decorative Background Element */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Support for CN in server component
function cn(...inputs: any[]) {
   return inputs.filter(Boolean).join(' ');
}
