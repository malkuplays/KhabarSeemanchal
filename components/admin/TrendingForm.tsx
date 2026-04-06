"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, PlusCircle, CheckCircle2 } from "lucide-react";

export function TrendingForm() {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [isHighlight, setIsHighlight] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('trending_topics')
        .insert({ 
           label, 
           url,
           is_active: isActive,
           badge_text: badgeText || null,
           is_highlight: isHighlight,
           sort_order: 0 // Default to top, can be refined with DND
        });

      if (insertError) throw insertError;

      setLabel("");
      setUrl("");
      setSuccess(true);
      router.refresh();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Could not add topic");
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
           <CheckCircle2 size={16} /> टॉपिक सफलतापूर्वक जोड़ दिया गया!
        </div>
      )}

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
           Topic Label / विषय का नाम
        </label>
        <input
          type="text"
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="जैसे: #PurniaElection, #Monsoon..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-brand font-hindi transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
             Link / लिंक (URL)
          </label>
          <input
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="जैसे: /category/politics..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-400 focus:outline-none focus:border-brand transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
             Badge / बैज (e.g. HOT, NEW) - Optional
          </label>
          <input
            type="text"
            value={badgeText}
            onChange={(e) => setBadgeText(e.target.value)}
            placeholder="जैसे: HOT"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-brand transition-all"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 py-2">
        <div className="flex items-center gap-2">
           <input 
              type="checkbox" 
              id="trending_active" 
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 text-brand focus:ring-brand border-gray-300 rounded cursor-pointer"
           />
           <label htmlFor="trending_active" className="text-xs font-black uppercase tracking-widest text-gray-500 cursor-pointer">
              Active / सक्रिय
           </label>
        </div>

        <div className="flex items-center gap-2">
           <input 
              type="checkbox" 
              id="is_highlight" 
              checked={isHighlight}
              onChange={(e) => setIsHighlight(e.target.checked)}
              className="w-4 h-4 text-[#da251d] focus:ring-[#da251d] border-gray-300 rounded cursor-pointer"
           />
           <label htmlFor="is_highlight" className="text-xs font-black uppercase tracking-widest text-red-600 cursor-pointer">
              Use Brand Highlight / हाईलाइट (Red)
           </label>
        </div>
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
