import { Header } from "@/components/layout/Header";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks } from "@/lib/news";
import { FileText, Download, Eye, Calendar } from "lucide-react";

export default async function EPaperPage() {
  const [categories, locations, trendingTopics, navActions, headerTopLinks] = await Promise.all([
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
  ]);

  // Mock data for epapers
  const epapers = [
    { id: "1", date: "07 अप्रैल 2026", thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop", edition: "पूर्णिया" },
    { id: "2", date: "06 अप्रैल 2026", thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop", edition: "पूर्णिया" },
    { id: "3", date: "05 अप्रैल 2026", thumbnail: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=2070&auto=format&fit=crop", edition: "कटिहार" },
    { id: "4", date: "04 अप्रैल 2026", thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop", edition: "अररिया" },
    { id: "5", date: "03 अप्रैल 2026", thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop", edition: "किशनगंज" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header topLinks={headerTopLinks} />
      <MegaNav 
        categories={categories} 
        locations={locations} 
        navActions={navActions} 
        trendingTopics={trendingTopics} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-black text-gray-900 font-news flex items-center justify-center gap-4">
              <FileText className="w-12 h-12 text-primary" />
              ई-पेपर
            </h1>
            <p className="text-xl text-gray-500 font-hindi">खबर सीमांचल का दैनिक डिजिटल संस्करण</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             {epapers.map((paper) => (
               <div key={paper.id} className="bg-white group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                     <img src={paper.thumbnail} alt={paper.date} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all transform lg:scale-125">
                           <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all transform lg:scale-125">
                           <Download className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-3 flex-1">
                     <div className="flex items-center gap-2 text-primary">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">{paper.date}</span>
                     </div>
                     <h3 className="text-xl font-black font-news text-gray-900">{paper.edition} संस्करण</h3>
                     <div className="pt-4 flex gap-2">
                        <button className="flex-1 py-3 bg-primary text-white text-xs font-black rounded-lg hover:bg-black transition-colors uppercase tracking-widest">पढ़ें</button>
                        <button className="px-3 border border-gray-200 rounded-lg text-gray-400 hover:text-primary hover:border-primary/20 transition-all">
                           <Download className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
