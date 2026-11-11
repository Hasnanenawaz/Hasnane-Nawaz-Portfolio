import { supabaseAdmin as supabase, type Blog } from '@/lib/supabase'

export type BlogCard = Pick<Blog, 'id' | 'title' | 'slug' | 'excerpt' | 'cover_image' | 'created_at'>

export async function getBlogs(): Promise<BlogCard[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, cover_image, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (error) return []
    return data ?? []
  } catch {
    return []
  }
}
