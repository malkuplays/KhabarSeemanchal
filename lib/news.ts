import { createClient } from './supabase/server';

export async function getSiteSettings() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 'default')
    .single();
  
  if (error) {
    console.error('Error fetching site settings:', error);
    return {
      site_name: 'खबर सीमांचल',
      site_tagline: 'Khabar Seemanchal',
      header_logo_url: null,
      footer_logo_url: null,
    };
  }
  return data;
}

export async function getCategories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('show_in_nav', true)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}

export async function getHeaderTopLinks() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('header_top_links')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching top links:', error);
    return [];
  }
  return data;
}

export async function getTrendingTopics() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('trending_topics')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching trending topics:', error);
    return [];
  }
  return data;
}

export async function getNavActions() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('nav_actions')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching nav actions:', error);
    return [];
  }
  return data;
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
  return data;
}

export async function getLocations() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
  return data;
}

export async function getLatestPosts(limit = 10, categoryId?: string, locationId?: string) {
  const supabase = createClient();
  let query = supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug),
      location:locations(name, slug),
      author:profiles(full_name, avatar_url)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  if (locationId) {
    query = query.eq('location_id', locationId);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
  return data;
}

export async function getBreakingNews() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('breaking_news')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching breaking news:', error);
    return [];
  }
  return data;
}

export async function getPostBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug),
      location:locations(name, slug),
      author:profiles(full_name, avatar_url)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
  return data;
}
