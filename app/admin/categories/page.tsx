import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Plus, 
  Layers, 
  Trash2, 
  Tag, 
  ArrowRight,
  TrendingUp,
  Settings,
  MoreVertical
} from "lucide-react";
import { CategoryForm } from "@/components/admin/CategoryForm";
import Link from "next/link";

export default async function CategoriesPage() {
  const supabase = createClient();
  
  // Fetch categories and post counts (using a simple join or separate count if needed)
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, created_at')
    .order('name');

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-hindi uppercase">श्रेणियां</h1>
            <p className="text-gray-500 font-hindi text-sm">खबरों को वर्गीकृत करने के लिए श्रेणियों का प्रबंधन करें।</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Add New Category Box */}
          <div className="lg:col-span-4">
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-8">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-red-50 rounded-xl text-brand">
                      <Plus size={20} />
                   </div>
                   <h2 className="text-lg font-black text-gray-900 font-hindi tracking-tight uppercase">नई श्रेणी जोड़ें</h2>
                </div>
                <CategoryForm />
             </div>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-8">
             <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                   <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">सभी मौजूद श्रेणियां</h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">कुल {categories?.length || 0}</span>
                </div>
                
                <div className="divide-y divide-gray-100">
                   {categories?.map((cat) => (
                      <div key={cat.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors border border-gray-100">
                               <Layers size={20} />
                            </div>
                            <div className="flex flex-col">
                               <span className="font-black text-gray-900 font-hindi text-lg group-hover:text-brand transition-colors">{cat.name}</span>
                               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{cat.slug}</span>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-2">
                            <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                               <Trash2 size={18} />
                            </button>
                            <button className="p-2.5 text-gray-400 hover:text-brand hover:bg-red-50 rounded-xl transition-all">
                               <MoreVertical size={18} />
                            </button>
                         </div>
                      </div>
                   ))}
                </div>

                {(!categories || categories.length === 0) && (
                   <div className="p-20 text-center flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                         <Layers size={32} />
                      </div>
                      <p className="text-sm font-hindi text-gray-400">वर्तमान में कोई श्रेणी उपलब्ध नहीं है।</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
