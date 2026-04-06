import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { Settings, Globe, Image } from "lucide-react";

export default async function SiteSettingsPage() {
  const supabase = createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "default")
    .single();

  const initialSettings = settings || {
    site_name: "खबर सीमांचल",
    site_tagline: "Khabar Seemanchal",
    header_logo_url: null,
    footer_logo_url: null,
  };

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-hindi uppercase">
              साइट सेटिंग्स
            </h1>
            <p className="text-gray-500 font-hindi text-sm">
              हेडर और फुटर में दिखने वाला लोगो और साइट का नाम बदलें।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7">
            <SiteSettingsForm initialSettings={initialSettings} />
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 sticky top-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <Settings size={20} />
                </div>
                <h2 className="text-lg font-black text-gray-900 font-hindi tracking-tight uppercase">
                  जानकारी
                </h2>
              </div>

              <div className="space-y-5 text-sm text-gray-600 font-hindi">
                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <Globe className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-gray-800 mb-1">हेडर लोगो</p>
                    <p>वेबसाइट के ऊपरी भाग में दिखेगा। सफेद या पारदर्शी बैकग्राउंड वाला PNG/SVG सबसे अच्छा रहेगा।</p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <Image className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-gray-800 mb-1">फुटर लोगो</p>
                    <p>गहरे रंग के फुटर में दिखेगा। सफेद या हल्के रंग का लोगो बेहतर दिखता है। अपलोड के बाद स्वचालित रूप से सफेद हो जाएगा।</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800">
                  <p className="font-black mb-1">💡 सुझाव</p>
                  <p>यदि लोगो नहीं अपलोड करते, तो साइट नाम टेक्स्ट के रूप में दिखेगा। अनुशंसित आकार: <strong>300×80px</strong>, PNG/SVG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
