import { Header } from "@/components/layout/Header";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks } from "@/lib/news";

export default async function SubscribePage() {
  const [categories, locations, trendingTopics, navActions, headerTopLinks] = await Promise.all([
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header topLinks={headerTopLinks} />
      <MegaNav categories={categories} locations={locations} navActions={navActions} trendingTopics={trendingTopics} />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 font-news mb-4">खबर सीमांचल सब्सक्राइब करें</h1>
          <p className="text-xl text-gray-600 font-hindi tracking-tight">सच्ची और बेबाक पत्रकारिता को अपना सहयोग दें।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "मासिक", price: "₹29", features: ["सभी खबरें", "विज्ञापन मुक्त", "दैनिक न्यूज़लेटर"] },
             { name: "वार्षिक", price: "₹299", features: ["सभी खबरें", "विज्ञापन मुक्त", "दैनिक न्यूज़लेटर", "विशेष ई-पेपर"], popular: true },
             { name: "आजीवन", price: "₹1999", features: ["असीमित एक्सेस", "विज्ञापन मुक्त", "सभी प्रीमियम सुविधाएं", "विशेष कार्यक्रम निमंत्रण"] }
           ].map((plan) => (
             <div key={plan.name} className={cn(
               "bg-white border-2 p-8 flex flex-col h-full rounded-2xl relative transition-all hover:shadow-2xl",
               plan.popular ? "border-primary scale-105 shadow-xl" : "border-gray-100"
             )}>
                {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">SABSE LOKPRIYA</span>}
                <h3 className="text-2xl font-black text-gray-900 font-news mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-primary mb-6">{plan.price}</div>
                <ul className="space-y-4 mb-8 flex-1">
                   {plan.features.map(f => (
                     <li key={f} className="text-sm text-gray-600 font-bold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> {f}
                     </li>
                   ))}
                </ul>
                <button className={cn(
                  "w-full py-4 font-black transition-all rounded-xl",
                  plan.popular ? "bg-primary text-white hover:bg-black shadow-lg" : "bg-gray-900 text-white hover:bg-primary"
                )}>अभी खरीदें</button>
             </div>
           ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { cn } from "@/lib/utils";
