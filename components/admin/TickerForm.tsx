"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

export function TickerForm() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("normal");
  const [url, setUrl] = useState("");
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
        .from('breaking_news')
        .insert({ 
           text, 
           url: url || null,
           priority,
           is_active: isActive 
        });

      if (insertError) throw insertError;

      setText("");
      setSuccess(true);
      router.refresh();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Could not add breaking news");
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
           <CheckCircle2 size={16} /> खबर सफलतापूर्वक जोड़ दी गई!
        </div>
      )}

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
           Breaking News Text / खबर
        </label>
        <textarea
          required
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ताज़ा खबर यहाँ लिखें..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-brand font-hindi transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
             Action Link / लिंक (URL) - Optional
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="जैसे: /p/breaking-story"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-brand transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
             Priority / प्राथमिकता
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:border-brand transition-all appearance-none cursor-pointer"
          >
            <option value="normal">Normal / सामान्य</option>
            <option value="high">High (Red) / उच्च</option>
            <option value="flash">Flash (Pulse) / फ्लैश</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 py-2">
         <input 
            type="checkbox" 
            id="is_active" 
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-brand focus:ring-brand border-gray-300 rounded cursor-pointer"
         />
         <label htmlFor="is_active" className="text-xs font-black uppercase tracking-widest text-gray-500 cursor-pointer">
            Mark as Live / लाइव दिखाएँ
         </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand/90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-100"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
        प्रकाशित करें (Push Live)
      </button>
    </form>
  );
}
