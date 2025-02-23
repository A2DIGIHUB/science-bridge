import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];
type Author = Database['public']['Tables']['authors']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

export interface PostWithRelations extends Post {
  author: Author | null;
  category: Category | null;
  tags: Tag[];
}

export const blogService = {
  async getPosts(params: {
    page: number;
    limit: number;
    category?: string;
    tag?: string;
    search?: string;
    authorId?: string;
  }): Promise<{ data: PostWithRelations[]; count: number }> {
    const { page, limit, category, tag, search, authorId } = params;
    
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:authors(*),
        category:categories(*),
        tags:posts_tags(tags(*))
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (category) {
      query = query.eq('categories.slug', category);
    }

    if (authorId) {
      query = query.eq('author_id', authorId);
    }

    if (search) {
      query = query.textSearch('search_vector', search);
    }

    if (tag) {
      query = query.contains('tags', [{ name: tag }]);
    }

    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;
    return { 
      data: data as PostWithRelations[],
      count: count || 0
    };
  },

  async getPostBySlug(slug: string): Promise<PostWithRelations | null> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:authors(*),
        category:categories(*),
        tags:posts_tags(tags(*))
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as PostWithRelations;
  },

  async createPost(post: PostInsert) {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePost(id: string, post: Partial<PostInsert>) {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async getTags() {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  }
};
