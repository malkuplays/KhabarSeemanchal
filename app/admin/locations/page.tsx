import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Plus, 
  MapPin, 
  Trash2, 
  MoreVertical
} from "lucide-react";
import { LocationForm } from "@/components/admin/LocationForm";

export default async function LocationsPage() {
  const supabase = createClient();
  
  const { data: locations, error } = await supabase
    .from('locations')
    .select('*')
    .order('name');

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-hindi uppercase">क्षेत्र / स्थान</h1>
            <p className="text-gray-500 font-hindi text-sm">क्षेत्रीय खबरों के लिए फिल्टरिंग और श्रेणियों का प्रबंधन करें।</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-8">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-red-50 rounded-xl text-brand">
                      <Plus size={20} />
                   </div>
                   <h2 className="text-lg font-black text-gray-900 font-hindi tracking-tight uppercase">नया क्षेत्र जोड़ें</h2>
                </div>
                <LocationForm />
             </div>
          </div>

          <div className="lg:col-span-8">
             <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                   <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">सभी मौजूद क्षेत्र</h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">कुल {locations?.length || 0}</span>
                </div>
                
                <div className="divide-y divide-gray-100">
                   {locations?.map((loc) => (
                      <div key={loc.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors border border-gray-100">
                               <MapPin size={20} />
                            </div>
                            <div className="flex flex-col">
                               <span className="font-black text-gray-900 font-hindi text-lg group-hover:text-brand transition-colors">{loc.name}</span>
                               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{loc.slug}</span>
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

                {(!locations || locations.length === 0) && (
                   <div className="p-20 text-center flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                         <MapPin size={32} />
                      </div>
                      <p className="text-sm font-hindi text-gray-400">वर्तमान में कोई क्षेत्र उपलब्ध नहीं है।</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
