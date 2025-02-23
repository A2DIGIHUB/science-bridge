export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string
          name: string
          credentials: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          credentials?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          credentials?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: Json
          author_id: string | null
          category_id: string | null
          status: "draft" | "published"
          published_at: string | null
          created_at: string
          updated_at: string
          cover_image: string | null
          search_vector: unknown | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: Json
          author_id?: string | null
          category_id?: string | null
          status?: "draft" | "published"
          published_at?: string | null
          created_at?: string
          updated_at?: string
          cover_image?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: Json
          author_id?: string | null
          category_id?: string | null
          status?: "draft" | "published"
          published_at?: string | null
          created_at?: string
          updated_at?: string
          cover_image?: string | null
        }
      }
      posts_tags: {
        Row: {
          post_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          post_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          post_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Custom types for our components
export interface Post extends Tables<'posts'> {
  author?: Tables<'authors'>
  category?: Tables<'categories'>
  tags?: Array<{
    tag: Tables<'tags'>
  }>
  content?: {
    body: string
    excerpt: string
  }
}
