import { Header } from "@/components/layout/Header";
import { BreakingNewsTicker } from "@/components/layout/BreakingNewsTicker";
import { MegaNav } from "@/components/layout/MegaNav";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { NewsCard } from "@/components/ui/NewsCard";
import { getLatestPosts, getBreakingNews, getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks, getSiteSettings } from "@/lib/news";
import { ChevronRight, TrendingUp, MapPin, Newspaper } from "lucide-react";

// ISR: Cache this page for 60 seconds, then revalidate in the background
export const revalidate = 60;

export default async function Home() {
  const [breakingNews, latestPosts, categories, locations, trendingTopics, navActions, headerTopLinks, siteSettings] = await Promise.all([
    getBreakingNews(),
    getLatestPosts(20),
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
    getSiteSettings(),
  ]);

  const latestColumnPosts = latestPosts.slice(0, 8);
  const featuredPost = latestPosts[8] || latestPosts[0];
  const subFeaturedPosts = latestPosts.slice(9, 13);
  const trendingPosts = latestPosts.slice(13, 18);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        topLinks={headerTopLinks} 
        logoUrl={siteSettings?.header_logo_url}
        siteName={siteSettings?.site_name}
        siteTagline={siteSettings?.site_tagline}
      />
      <MegaNav 
        categories={categories} 
        locations={locations} 
        navActions={navActions} 
        trendingTopics={trendingTopics} 
      />
      <BreakingNewsTicker headlines={breakingNews} />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Newspaper Style 3-Column Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* COLUMN 1: Latest News (Narrow - Left) */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <div className="border-b-4 border-black pb-2 mb-4">
              <h3 className="text-xl font-black font-news flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-primary" />
                ताज़ा खबरें
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {latestColumnPosts.map((post) => (
                <NewsCard key={post.id} post={post} variant="list" />
              ))}
            </div>
            <Link href="/latest" className="block text-center py-3 bg-gray-50 hover:bg-gray-100 text-sm font-bold font-news text-gray-600 transition-all border border-gray-200">
              सभी ताज़ा खबरें देखें →
            </Link>
          </div>

          {/* COLUMN 2: Featured Story (Wide - Center) */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            {featuredPost && (
              <div className="border-b border-gray-100 pb-8">
                <NewsCard post={featuredPost} variant="featured" priority={true} />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subFeaturedPosts.map((post) => (
                <NewsCard key={post.id} post={post} variant="grid" />
              ))}
            </div>
          </div>

          {/* COLUMN 3: Sidebar (Narrow - Right) */}
          <div className="lg:col-span-3 space-y-8 order-3">
            {/* Trending Section */}
            <section className="bg-gray-50 border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-black font-news">ट्रेंडिंग</h3>
              </div>
              <div className="space-y-1">
                {trendingPosts.map((post, i) => (
                  <NewsCard key={post.id} post={{ ...post, index: i + 1 }} variant="sidebar" />
                ))}
              </div>
            </section>

            {/* District Selector Widget */}
            <section className="border border-gray-200 p-5 bg-white">
              <h3 className="text-lg font-black font-news mb-4 flex items-center gap-2 border-b pb-2">
                <MapPin className="w-5 h-5 text-primary" />
                अपना जिला चुनें
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {locations.map((loc) => (
                  <Link 
                    key={loc.id} 
                    href={`/location/${loc.slug}`}
                    className="px-3 py-2 bg-gray-50 hover:bg-primary hover:text-white text-xs font-bold font-news transition-all text-center border border-gray-100"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Newsletter - Ads */}
            <div className="bg-primary/5 border border-primary/10 p-6 text-center space-y-4">
              <h4 className="font-black font-news text-primary">खबर सीमांचल न्यूज़लेटर</h4>
              <p className="text-xs text-gray-600 font-news">सीधे अपने इनबॉक्स में ताज़ा खबरें पाएं।</p>
              <div className="flex flex-col gap-2">
                <input type="email" placeholder="ईमेल पता" className="px-3 py-2 text-xs border border-gray-200" />
                <button className="bg-primary text-white py-2 text-xs font-black font-news">जुड़ें</button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Sections */}
        <div className="space-y-16 mt-12 bg-gray-50/50 -mx-4 px-4 py-12 md:-mx-8 md:px-8">
          <div className="container mx-auto">
            {categories.slice(0, 3).map((cat) => (
              <HomeCategorySection key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </main>

      <Footer 
        logoUrl={siteSettings?.footer_logo_url}
        siteName={siteSettings?.site_name}
      />
    </div>
  );
}

async function HomeCategorySection({ category }: { category: any }) {
  const posts = await getLatestPosts(6, category.id);
  const mainPost = posts[0];
  const subPosts = posts.slice(1, 4);
  const listPosts = posts.slice(4, 6);

  if (posts.length === 0) return null;

  return (
    <section className="mb-16 last:mb-0">
      <div className="flex items-center justify-between border-b-2 border-black mb-8 pb-1">
        <h2 className="text-2xl font-black font-news relative">
          {category.name}
          <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-primary"></span>
        </h2>
        <Link href={`/category/${category.slug}`} className="text-xs font-black font-news text-primary hover:underline flex items-center gap-1 uppercase tracking-tighter">
          और देखें <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Category Feature */}
        <div className="lg:col-span-5">
          {mainPost && (
            <NewsCard post={mainPost} variant="grid" className="space-y-4" />
          )}
        </div>
        
        {/* Category Grid */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-6">
           {subPosts.map((post) => (
             <NewsCard key={post.id} post={post} variant="list" className="py-2" />
           ))}
        </div>

        {/* Category List */}
        <div className="lg:col-span-3 space-y-4">
           {listPosts.map((post) => (
             <Link key={post.id} href={`/p/${post.slug}`} className="block p-4 bg-white border border-gray-100 hover:border-primary/20 transition-all group">
                <h4 className="text-sm font-bold font-news group-hover:text-primary transition-all line-clamp-2">{post.title}</h4>
                <span className="text-[10px] text-gray-400 mt-2 block uppercase font-bold tracking-widest">{category.name}</span>
             </Link>
           ))}
        </div>
      </div>
    </section>
  );
}
