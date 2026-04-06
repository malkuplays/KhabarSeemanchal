import { Header } from "@/components/layout/Header";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks, getLatestPosts } from "@/lib/news";
import Link from "next/link";
import { NewsCard } from "@/components/ui/NewsCard";
import { MapPin, ChevronRight } from "lucide-react";

export default async function CitiesPage() {
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
      <MegaNav 
        categories={categories} 
        locations={locations} 
        navActions={navActions} 
        trendingTopics={trendingTopics} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12 border-b-4 border-black pb-4 flex items-center justify-between">
          <h1 className="text-4xl font-black text-gray-900 font-news flex items-center gap-3">
            <MapPin className="w-8 h-8 text-primary" />
            शहर चुनें
          </h1>
          <p className="text-gray-500 font-hindi text-lg">अपने शहर की ताज़ा खबरें यहाँ पाएं</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {locations.map((loc) => (
             <CitySection key={loc.id} location={loc} />
           ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

async function CitySection({ location }: { location: any }) {
  const posts = await getLatestPosts(3, undefined, location.id);
  
  if (posts.length === 0) return null;

  return (
    <section className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-black font-news group-hover:text-primary transition-colors">{location.name}</h2>
        <Link 
          href={`/location/${location.slug}`}
          className="text-xs font-black text-primary uppercase tracking-tighter flex items-center gap-1"
        >
          सब देखें <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} variant="list" className="py-2 border-b border-gray-50 last:border-0" />
        ))}
      </div>
    </section>
  );
}
