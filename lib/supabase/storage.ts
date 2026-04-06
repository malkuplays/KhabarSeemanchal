import { createClient } from "./client";

export async function uploadImage(file: File) {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `news/${fileName}`;

  const { data, error } = await supabase.storage
    .from('news-images')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('news-images')
    .getPublicUrl(filePath);

  return publicUrl;
}
