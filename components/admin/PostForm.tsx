"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/supabase/storage";
import { Editor } from "./Editor";
import { 
  Save, 
  Send, 
  Trash2, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle2, 
  X
} from "lucide-react";
import Image from "next/image";

interface PostFormProps {
  categories: any[];
  locations: any[];
  initialData?: any;
}

export function PostForm({ categories, locations, initialData }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [locationId, setLocationId] = useState(initialData?.location_id || "");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.featured_image || null);
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "published");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  // Auto-generate slug from title (only if not editing or if manually requested)
  useEffect(() => {
    if (title && !initialData) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u0900-\u097F\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
    }
  }, [title, initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = imagePreview;
      if (featuredImage) {
        imageUrl = await uploadImage(featuredImage);
      }

      const { data: { user } } = await supabase.auth.getUser();

      const postData = {
        title,
        slug,
        excerpt,
        content,
        featured_image: imageUrl,
        category_id: categoryId || null,
        location_id: locationId || null,
        status,
        author_id: user?.id,
        published_at: status === 'published' ? (initialData?.published_at || new Date().toISOString()) : null,
      };

      if (initialData?.id) {
        const { error: postError } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', initialData.id);
        if (postError) throw postError;
      } else {
        const { error: postError } = await supabase
          .from('posts')
          .insert(postData);
        if (postError) throw postError;
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong while saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-news pb-20 px-4 md:px-0">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center justify-between">
           <p className="text-red-700 font-hindi text-sm">{error}</p>
           <button onClick={() => setError(null)}><X size={16} className="text-red-400" /></button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editor & Main Info */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
                Headline / शीर्षक
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="पूरी खबर यहाँ लिखें..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xl font-black text-gray-900 focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand font-hindi transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
                Slug / URL की पहचान
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 focus:outline-none focus:border-brand transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
                Short Excerpt / संक्षिप्त जानकारी
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="खबर का छोटा सार यहाँ लिखें..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand font-hindi transition-all resize-none"
              />
            </div>
          </div>

          <div className="space-y-3">
             <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
                Main Story / पूरी खबर
             </label>
             <Editor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Right Column: Settings & Publishing */}
        <div className="lg:col-span-4 space-y-6 sticky top-8">
          {/* Action Box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
             <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Status</span>
                <span className={cn(
                   "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                   status === 'published' ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                )}>
                   {status === 'published' ? 'Ready' : 'Draft'}
                </span>
             </div>
             
             <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  onClick={() => setStatus("published")}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#da251d] to-[#b00000] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} className="group-hover:translate-x-1 transition-transform" /> प्रकाशित करें</>}
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  disabled={loading}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                >
                   <Save size={18} /> ड्राफ्ट में सहेजें
                </button>
             </div>
          </div>

          {/* Featured Image Box */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-4">
             <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Featured Image / मुख्य छवि
             </label>
             
             {imagePreview ? (
                <div className="relative group rounded-xl overflow-hidden aspect-video border border-gray-100">
                   <Image 
                     src={imagePreview} 
                     alt="Preview" 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-500" 
                   />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        type="button" 
                        onClick={() => {setFeaturedImage(null); setImagePreview(null);}}
                        className="p-2 bg-white rounded-lg text-red-600 hover:scale-110 transition-transform"
                      >
                         <Trash2 size={20} />
                      </button>
                   </div>
                </div>
             ) : (
                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-100 rounded-xl bg-gray-50 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group">
                   <ImageIcon className="w-10 h-10 text-gray-300 group-hover:text-brand/40 mb-3" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-brand/60">Upload Image</span>
                   <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
             )}
          </div>

          {/* Organization Box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
             <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                   Category / श्रेणी
                </label>
                <select 
                  value={categoryId} 
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black text-gray-900 focus:outline-none focus:border-brand font-hindi"
                >
                   <option value="">श्रेणी चुनें</option>
                   {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
             </div>

             <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                   Region / क्षेत्र
                </label>
                <select 
                   value={locationId}
                   onChange={(e) => setLocationId(e.target.value)}
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black text-gray-900 focus:outline-none focus:border-brand font-hindi"
                >
                   <option value="">क्षेत्र चुनें</option>
                   {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                </select>
             </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function cn(...inputs: any[]) {
   return inputs.filter(Boolean).join(' ');
}
