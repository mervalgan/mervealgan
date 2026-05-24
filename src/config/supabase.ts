import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          content: string
          category: string
          tags: string[]
          author_name: string
          author_role: string
          read_time: number
          published: boolean
          featured: boolean
          created_at: string
          updated_at: string
          seo_title: string | null
          seo_description: string | null
          og_image: string | null
          schema_type: string
          answer_first: string | null
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          sector: string
          role: string
          description: string
          challenge: string
          approach: string
          results: string
          tools: string[]
          tags: string[]
          featured: boolean
          published: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }
    }
  }
}
