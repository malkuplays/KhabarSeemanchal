import { createClient } from "@/lib/supabase/server";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const supabase = createClient();

  // Fetch the post data, categories and locations
  const [
    { data: post },
    { data: categories },
    { data: locations }
  ] = await Promise.all([
    supabase.from('posts').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*').order('name'),
    supabase.from('locations').select('*').order('name'),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 font-hindi tracking-tight">खबर संपादित करें</h1>
          <p className="text-gray-500 font-hindi text-sm mt-2">लेख में आवश्यक बदलाव करें और अपडेट करें।</p>
        </div>
        
        <PostForm 
          categories={categories || []} 
          locations={locations || []} 
          initialData={post}
        />
      </div>
    </AdminLayout>
  );
}
