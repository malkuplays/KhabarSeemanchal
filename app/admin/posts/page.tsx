import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { hi } from "date-fns/locale";

export default async function PostsListPage() {
  const supabase = createClient();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id, 
      title, 
      slug, 
      status, 
      created_at, 
      published_at,
      featured_image,
      categories (name),
      locations (name)
    `)
    .order('created_at', { ascending: false });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-hindi uppercase">सभी खबरें</h1>
            <p className="text-gray-500 font-hindi text-sm">पोर्टल पर मौजूद सभी लेखों को यहाँ से प्रबंधित करें।</p>
          </div>
          <Link 
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#da251d] to-[#b00000] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 shadow-red-200"
          >
            <Plus size={18} />
            नई खबर जोड़ें
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={18} />
              <input 
                 type="text" 
                 placeholder="खबरों को खोजें..." 
                 className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl font-hindi text-sm focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand shadow-sm transition-all"
              />
           </div>
           <div className="flex gap-2">
              <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-100 rounded-xl text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                 <Filter size={16} /> फ़िल्टर
              </button>
           </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Post Details / जानकारी</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category / क्षेत्र</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status / स्थिति</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date / तारीख</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {posts?.map((post) => (
                       <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-5">
                             <div className="flex items-center gap-4">
                                <div className="w-16 h-12 rounded-lg bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-100">
                                   {post.featured_image ? (
                                      <Image src={post.featured_image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                   ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-300"><FileText size={20} /></div>
                                   )}
                                </div>
                                <div className="flex flex-col min-w-0 pr-4">
                                   <h3 className="font-bold text-gray-900 font-hindi truncate max-w-md group-hover:text-brand transition-colors leading-tight mb-1">
                                      {post.title}
                                   </h3>
                                   <div className="flex items-center gap-2">
                                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">ID: {post.id.slice(0, 8)}</span>
                                      <span className="text-[9px] font-bold text-gray-300">/</span>
                                      <span className="text-[9px] font-bold text-gray-400 truncate">{post.slug}</span>
                                   </div>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold font-hindi text-gray-700">{(post.categories as any)?.name || 'Uncategorized'}</span>
                                <span className="text-[10px] font-medium font-hindi text-gray-400">{(post.locations as any)?.name || 'No Region'}</span>
                             </div>
                          </td>
                          <td className="px-6 py-5">
                             <span className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                post.status === 'published' ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                             )}>
                                {post.status === 'published' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                {post.status === 'published' ? 'Published' : 'Draft'}
                             </span>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold text-gray-900">{format(new Date(post.created_at), "d MMM, yyyy")}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{format(new Date(post.created_at), "HH:mm")}</span>
                             </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <Link 
                                  href={`/news/${post.slug}`} 
                                  target="_blank"
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                  title="View Public"
                                >
                                   <ExternalLink size={18} />
                                </Link>
                                <Link 
                                  href={`/admin/posts/${post.id}`}
                                  className="p-2 text-gray-400 hover:text-brand hover:bg-red-50 rounded-lg transition-all"
                                  title="Edit Post"
                                >
                                   <Edit2 size={18} />
                                </Link>
                                <button 
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                  title="Delete"
                                >
                                   <Trash2 size={18} />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           {/* Pagination Placeholder */}
           <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">कुल {posts?.length || 0} खबरें</span>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-400 disabled:opacity-50" disabled>Previous</button>
                 <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm">Next</button>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function cn(...inputs: any[]) {
   return inputs.filter(Boolean).join(' ');
}
