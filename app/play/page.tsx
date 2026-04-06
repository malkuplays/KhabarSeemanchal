import { Header } from "@/components/layout/Header";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks } from "@/lib/news";
import { Gamepad2, Trophy, Star, TrendingUp } from "lucide-react";

export default async function PlayPage() {
  const [categories, locations, trendingTopics, navActions, headerTopLinks] = await Promise.all([
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
  ]);

  const featuredGames = [
    { title: "क्रिकेट किंग", category: "स्पोर्ट्स", players: "1.2M", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop" },
    { title: "सुडोकू मास्टर", category: "पज़ल", players: "450K", img: "https://images.unsplash.com/photo-1580534204368-6d80295874e2?q=80&w=2070&auto=format&fit=crop" },
    { title: "शतरंज की चाल", category: "स्ट्रेटेजी", players: "300K", img: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=2070&auto=format&fit=crop" }
  ];

  const gameCategories = ["कार गेम्स", "पज़ल", "स्पोर्ट्स", "एक्शन", "एडवेंचर", "कार्ड्स"];

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white font-news">
      <Header topLinks={headerTopLinks} />
      <MegaNav 
        categories={categories} 
        locations={locations} 
        navActions={navActions} 
        trendingTopics={trendingTopics} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-12 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
             <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-60" alt="Hero Game" />
             <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="flex items-center gap-2 text-primary font-black mb-4">
                   <Flame className="w-5 h-5 fill-primary" />
                   <span className="text-sm uppercase tracking-widest">आज का टॉप गेम</span>
                </div>
                <h1 className="text-6xl font-black mb-6">बैटल रॉयल: सीमांचल</h1>
                <button className="px-10 py-4 bg-primary text-white font-black text-xl rounded-2xl hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-lg shadow-primary/30">अभी खेलें</button>
             </div>
          </section>

          {/* Game Categories Bar */}
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-4 border-y border-white/5">
            {gameCategories.map(cat => (
              <button key={cat} className="px-6 py-2 bg-white/5 hover:bg-primary rounded-full text-sm font-bold whitespace-nowrap transition-all border border-white/10">
                 {cat}
              </button>
            ))}
          </div>

          {/* Featured Games */}
          <section>
             <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
                <h2 className="text-3xl font-black flex items-center gap-3">
                   <Trophy className="w-8 h-8 text-yellow-500" />
                   प्रसिद्ध गेम्स
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                   <TrendingUp className="w-4 h-4" />
                   <span>10M+ लोग खेल रहे हैं</span>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredGames.map(game => (
                  <div key={game.title} className="bg-white/5 rounded-2xl overflow-hidden group hover:bg-white/10 transition-all border border-white/10 flex flex-col hover:-translate-y-2">
                     <div className="aspect-video relative overflow-hidden">
                        <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-lg text-yellow-500">
                           <Star className="w-4 h-4 fill-yellow-500" />
                        </div>
                     </div>
                     <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                              <span className="text-xs text-primary font-bold uppercase tracking-widest">{game.category}</span>
                           </div>
                           <span className="text-xs text-gray-400 font-bold">{game.players}</span>
                        </div>
                        <button className="w-full py-4 bg-white/10 text-white font-black rounded-xl hover:bg-primary transition-all">प्ले</button>
                     </div>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { Flame } from "lucide-react";
