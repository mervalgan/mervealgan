export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  tags: string[]
  author_name: string
  author_role: string
  read_time: number
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
  seo_title?: string
  seo_description?: string
  og_image?: string
  schema_type: string
  answer_first?: string
}

export interface Project {
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

export type BlogCategory =
  | 'SEO' | 'GEO' | 'Technical SEO'
  | 'Content Strategy' | 'AI Visibility'
  | 'Case Notes' | 'Tools' | 'Career'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface SiteSettings {
  accent_color: string
  font_display: string
  font_mono: string
  site_title: string
  site_description: string
  linkedin_url: string
  cv_url: string
  email: string
}
