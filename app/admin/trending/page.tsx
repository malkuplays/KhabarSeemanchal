import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Plus, 
  TrendingUp, 
  Trash2, 
  ExternalLink,
  GripVertical
} from "lucide-react";
import { TrendingForm } from "@/components/admin/TrendingForm";

export default async function TrendingPage() {
  const supabase = createClient();
  
  const { data: topics, error } = await supabase
    .from('trending_topics')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-hindi uppercase">ट्रेंडिंग टॉपिक्स (Trending)</h1>
            <p className="text-gray-500 font-hindi text-sm">वेबसाइट के 'फोकल बार' में दिखने वाले महत्वपूर्ण विषयों को प्रबंधित करें।</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-8">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-red-50 rounded-xl text-brand">
                      <TrendingUp size={20} />
                   </div>
                   <h2 className="text-lg font-black text-gray-900 font-hindi tracking-tight uppercase">नया टॉपिक जोड़ें</h2>
                </div>
                <TrendingForm />
             </div>
          </div>

          <div className="lg:col-span-8">
             <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                   <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">सक्रिय टॉपिक्स</h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">कुल {topics?.length || 0}</span>
                </div>
                
                <div className="divide-y divide-gray-100">
                   {topics?.map((topic) => (
                      <div key={topic.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                         <div className="flex items-center gap-4">
                            <div className="cursor-grab text-gray-300 hover:text-gray-500">
                               <GripVertical size={20} />
                            </div>
                            <div className="flex flex-col">
                               <span className="font-bold text-gray-900 font-hindi text-base group-hover:text-brand transition-colors">{topic.label}</span>
                               <div className="flex items-center gap-2 mt-0.5">
                                  <ExternalLink size={10} className="text-gray-400" />
                                  <span className="text-[10px] font-medium text-gray-400 truncate max-w-xs">{topic.url}</span>
                               </div>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-2">
                            <div className={cn(
                               "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                               topic.is_active ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                            )}>
                               {topic.is_active ? "ACTIVE" : "HIDDEN"}
                            </div>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                               <Trash2 size={16} />
                            </button>
                         </div>
                      </div>
                   ))}
                </div>

                {(!topics || topics.length === 0) && (
                   <div className="p-20 text-center flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                         <TrendingUp size={32} />
                      </div>
                      <p className="text-sm font-hindi text-gray-400">कोई ट्रेंडिंग टॉपिक सेट नहीं है।</p>
                   </div>
                )}
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
