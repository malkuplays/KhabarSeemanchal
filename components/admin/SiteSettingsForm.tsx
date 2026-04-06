"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Upload, Loader2, CheckCircle2, ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";

interface SiteSettingsFormProps {
  initialSettings: {
    site_name: string;
    site_tagline: string;
    header_logo_url: string | null;
    footer_logo_url: string | null;
  };
}

export function SiteSettingsForm({ initialSettings }: SiteSettingsFormProps) {
  const [siteName, setSiteName] = useState(initialSettings.site_name || "");
  const [siteTagline, setSiteTagline] = useState(initialSettings.site_tagline || "");
  const [headerLogoUrl, setHeaderLogoUrl] = useState<string | null>(initialSettings.header_logo_url);
  const [footerLogoUrl, setFooterLogoUrl] = useState<string | null>(initialSettings.footer_logo_url);
  const [uploadingHeader, setUploadingHeader] = useState(false);
  const [uploadingFooter, setUploadingFooter] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headerInputRef = useRef<HTMLInputElement>(null);
  const footerInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const uploadLogo = async (file: File, type: "header" | "footer") => {
    const setter = type === "header" ? setUploadingHeader : setUploadingFooter;
    setter(true);
    setError(null);

    try {
      const ext = file.name.split(".").pop();
      const fileName = `${type}-logo-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("logos").getPublicUrl(fileName);

      if (type === "header") setHeaderLogoUrl(data.publicUrl);
      else setFooterLogoUrl(data.publicUrl);
    } catch (e: any) {
      setError(`लोगो अपलोड करने में त्रुटि: ${e.message}`);
    } finally {
      setter(false);
    }
  };

  const removeLogo = (type: "header" | "footer") => {
    if (type === "header") setHeaderLogoUrl(null);
    else setFooterLogoUrl(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: updateError } = await supabase
        .from("site_settings")
        .update({
          site_name: siteName,
          site_tagline: siteTagline,
          header_logo_url: headerLogoUrl,
          footer_logo_url: footerLogoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", "default");

      if (updateError) throw updateError;

      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setError(`सेव करने में त्रुटि: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const LogoUploader = ({
    label,
    hint,
    currentUrl,
    uploading,
    inputRef,
    type,
  }: {
    label: string;
    hint: string;
    currentUrl: string | null;
    uploading: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    type: "header" | "footer";
  }) => (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-black text-gray-700 uppercase tracking-widest">{label}</label>
        <p className="text-xs text-gray-400 mt-1">{hint}</p>
      </div>

      {currentUrl ? (
        <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-4">
          <div className={`flex items-center justify-center rounded-lg ${type === "footer" ? "bg-gray-800" : "bg-white"} p-4 h-24`}>
            <Image
              src={currentUrl}
              alt={label}
              width={200}
              height={80}
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 px-3 py-2 text-xs font-black text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              बदलें
            </button>
            <button
              type="button"
              onClick={() => removeLogo(type)}
              className="px-3 py-2 text-xs font-black text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-red-300 hover:bg-red-50/30 transition-all group"
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <Upload className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm font-black text-gray-600 group-hover:text-red-600 transition-colors">
              {uploading ? "अपलोड हो रहा है..." : "लोगो अपलोड करें"}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP, SVG • Max 2MB</p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadLogo(file, type);
        }}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Site Name & Tagline */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">
          साइट का नाम
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-black text-gray-700">साइट नाम</label>
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-hindi focus:border-red-400 focus:ring-2 focus:ring-red-50 outline-none transition-all"
            placeholder="खबर सीमांचल"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-gray-700">टैगलाइन (English)</label>
          <input
            value={siteTagline}
            onChange={(e) => setSiteTagline(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-red-400 focus:ring-2 focus:ring-red-50 outline-none transition-all"
            placeholder="Khabar Seemanchal"
          />
        </div>
      </div>

      {/* Logo Uploaders */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-8">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">
          लोगो अपलोड करें
        </h3>

        <LogoUploader
          label="हेडर लोगो"
          hint="वेबसाइट के शीर्ष पर दिखाई देगा। सफेद/हल्के बैकग्राउंड के लिए उपयुक्त।"
          currentUrl={headerLogoUrl}
          uploading={uploadingHeader}
          inputRef={headerInputRef as React.RefObject<HTMLInputElement>}
          type="header"
        />

        <div className="border-t border-gray-100 pt-8">
          <LogoUploader
            label="फुटर लोगो"
            hint="वेबसाइट के नीचे दिखेगा। गहरे बैकग्राउंड पर सफेद/हल्के रंग का लोगो अच्छा लगता है।"
            currentUrl={footerLogoUrl}
            uploading={uploadingFooter}
            inputRef={footerInputRef as React.RefObject<HTMLInputElement>}
            type="footer"
          />
        </div>
      </div>

      {/* Error & Save */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-hindi">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3.5 bg-[#da251d] hover:bg-[#b00000] text-white font-black rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : success ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : null}
        {saving ? "सेव हो रहा है..." : success ? "सफलतापूर्वक सेव हुआ!" : "परिवर्तन सहेजें"}
      </button>
    </div>
  );
}
