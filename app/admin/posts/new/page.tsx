import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const supabase = createClient();

  // Fetch categories and locations for the form
  const [
    { data: categories },
    { data: locations }
  ] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('locations').select('*').order('name'),
  ]);

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 font-hindi tracking-tight">नई खबर लिखें</h1>
          <p className="text-gray-500 font-hindi text-sm mt-2">अपनी खबर को विस्तार से लिखें और उसे प्रकाशित करें।</p>
        </div>
        
        <PostForm 
          categories={categories || []} 
          locations={locations || []} 
        />
      </div>
    </AdminLayout>
  );
}
