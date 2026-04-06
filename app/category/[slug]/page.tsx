import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { BreakingNewsTicker } from "@/components/layout/BreakingNewsTicker";
import { MegaNav } from "@/components/layout/MegaNav";
import { Footer } from "@/components/layout/Footer";
import { NewsCard } from "@/components/ui/NewsCard";
import { getCategoryBySlug, getLatestPosts, getBreakingNews, getCategories, getLocations, getTrendingTopics, getNavActions, getHeaderTopLinks } from "@/lib/news";
import { cn } from "@/lib/utils";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, breakingNews, categories, locations, trendingTopics, navActions, headerTopLinks] = await Promise.all([
    getCategoryBySlug(params.slug),
    getBreakingNews(),
    getCategories(),
    getLocations(),
    getTrendingTopics(),
    getNavActions(),
    getHeaderTopLinks(),
  ]);

  if (!category) {
    notFound();
  }

  const posts = await getLatestPosts(20, category.id);
  const latestPosts = await getLatestPosts(5); // For sidebar

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header topLinks={headerTopLinks} />
      <MegaNav 
        categories={categories} 
        locations={locations} 
        navActions={navActions} 
        trendingTopics={trendingTopics} 
      />
      <BreakingNewsTicker headlines={breakingNews} />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        {/* Category Header */}
        <header className="mb-12">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            <Link href="/" className="hover:text-brand transition-colors">होम</Link>
            <span>/</span>
            <span className="text-brand">{category.name}</span>
          </nav>
          
          <div className="flex items-end gap-6 border-b-4 border-brand pb-6">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-hindi">
              {category.name}
            </h1>
            <span className="text-sm font-bold text-gray-400 mb-2 whitespace-nowrap">
              ({posts.length} खबरें)
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Grid */}
          <div className="lg:col-span-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <NewsCard key={post.id} post={post} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-gray-900 font-hindi mb-2">इस श्रेणी में कोई खबर नहीं है</h3>
                <p className="text-gray-500 font-hindi">हम जल्द ही यहाँ नई खबरें जोड़ेंगे।</p>
                <Link href="/" className="inline-block mt-8 bg-brand text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-xl transition-all">
                  वापस होम पर जाएँ
                </Link>
              </div>
            )}

            {/* Pagination could go here */}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Trending */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-6 bg-brand rounded-full"></div>
                <h3 className="font-black text-xl text-gray-900 font-hindi tracking-tight text-[18px]">अन्य ताज़ा खबरें</h3>
              </div>
              <div className="space-y-8">
                {latestPosts.map((otherPost) => (
                  <NewsCard key={otherPost.id} post={otherPost} variant="sidebar" />
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center p-8 text-center sticky top-24">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">विज्ञापन</span>
                <p className="text-xs text-gray-400 italic">यहां विज्ञापन के लिए स्थान उपलब्ध है।</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
