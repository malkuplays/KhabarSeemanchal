import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Plus, 
  Bell, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { TickerForm } from "@/components/admin/TickerForm";
import { format } from "date-fns";
import { hi } from "date-fns/locale";

export default async function TickerPage() {
  const supabase = createClient();
  
  const { data: tickerItems, error } = await supabase
    .from('breaking_news')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-hindi uppercase">ब्रेकिंग न्यूज़ (Ticker)</h1>
            <p className="text-gray-500 font-hindi text-sm">वेबसाइट के शीर्ष पर चलने वाली ताज़ा खबरों को प्रबंधित करें।</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-8">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-red-50 rounded-xl text-brand">
                      <Bell size={20} />
                   </div>
                   <h2 className="text-lg font-black text-gray-900 font-hindi tracking-tight uppercase">नया टिकट जोड़ें</h2>
                </div>
                <TickerForm />
             </div>
          </div>

          <div className="lg:col-span-8">
             <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                   <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">सभी टिकट खबरें</h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">कुल {tickerItems?.length || 0}</span>
                </div>
                
                <div className="divide-y divide-gray-100">
                   {tickerItems?.map((item) => (
                      <div key={item.id} className="p-6 flex items-start justify-between hover:bg-gray-50/50 transition-colors group">
                         <div className="flex gap-4">
                            <div className={cn(
                               "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1",
                               item.is_active ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                            )}>
                               <Bell size={18} />
                            </div>
                            <div className="flex flex-col gap-2">
                               <p className="font-hindi text-gray-900 leading-relaxed max-w-xl">{item.text}</p>
                               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                   <div className="flex items-center gap-1.5">
                                      <Clock size={12} />
                                      {format(new Date(item.created_at), "d MMM, HH:mm", { locale: hi })}
                                   </div>
                                   {item.is_active ? (
                                      <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={12} /> LIVE</span>
                                   ) : (
                                      <span className="text-gray-400 flex items-center gap-1"><XCircle size={12} /> INACTIVE</span>
                                   )}
                               </div>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-2">
                            <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                               <Trash2 size={18} />
                            </button>
                         </div>
                      </div>
                   ))}
                </div>

                {(!tickerItems || tickerItems.length === 0) && (
                   <div className="p-20 text-center flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                         <Bell size={32} />
                      </div>
                      <p className="text-sm font-hindi text-gray-400">वर्तमान में कोई ब्रेकिंग न्यूज़ उपलब्ध नहीं है।</p>
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
