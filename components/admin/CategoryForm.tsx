"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, PlusCircle, CheckCircle2 } from "lucide-react";

export function CategoryForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (name) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'));
    }
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('categories')
        .insert({ name, slug });

      if (insertError) throw insertError;

      setName("");
      setSlug("");
      setSuccess(true);
      router.refresh();
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Could not add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-news">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold font-hindi border border-red-100">
           {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 text-green-600 rounded-xl text-xs font-bold font-hindi border border-green-100 flex items-center gap-2">
           <CheckCircle2 size={16} /> श्रेणी सफलतापूर्वक जोड़ दी गई!
        </div>
      )}

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
           Name / श्रेणी का नाम
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="जैसे: राजनीति, मनोरंजन..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-brand font-hindi transition-all"
        />
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
           Slug / URL उपनाम
        </label>
        <input
          type="text"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-400 focus:outline-none focus:border-brand font-sans transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand/90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-100"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : <PlusCircle size={16} />}
        सहेजें (Save)
      </button>
    </form>
  );
}
