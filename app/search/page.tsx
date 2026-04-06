import { Header } from "@/components/layout/Header";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks } from "@/lib/news";

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const [categories, locations, trendingTopics, navActions, headerTopLinks] = await Promise.all([
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
  ]);

  const query = searchParams.q || "";

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
        <div className="mb-12">
          <h1 className="text-3xl font-black text-gray-900 font-news mb-4">
            '{query}' के लिए खोज परिणाम
          </h1>
          <div className="w-20 h-1.5 bg-primary"></div>
        </div>

        <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200">
           <p className="text-gray-500 font-hindi">यहाँ आपकी खोज से संबंधित खबरें दिखाई जाएँगी।</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
