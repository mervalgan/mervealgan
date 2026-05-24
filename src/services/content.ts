// localStorage-based content store — no backend needed
// Admin panelden yazılan veriler burada saklanır
// Production'da Supabase veya Netlify CMS ile swap edilebilir

import type { Post, Project } from '@/types'

const KEY_POSTS = 'ma_posts'
const KEY_PROJECTS = 'ma_projects'
const KEY_SETTINGS = 'ma_settings'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch { return fallback }
}

function write<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* quota */ }
}

// ── Posts ────────────────────────────────────────────
export const postService = {
  getAll(): Post[] {
    return read<Post[]>(KEY_POSTS, SEED_POSTS)
  },
  getPublished(): Post[] {
    return this.getAll().filter(p => p.published).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  },
  getBySlug(slug: string): Post | undefined {
    return this.getAll().find(p => p.slug === slug)
  },
  getByCategory(cat: string): Post[] {
    return this.getPublished().filter(p => p.category === cat)
  },
  save(post: Omit<Post, 'id' | 'created_at' | 'updated_at'> & { id?: string }): void {
    const all = this.getAll()
    const now = new Date().toISOString()
    if (post.id) {
      write(KEY_POSTS, all.map(p => p.id === post.id ? { ...p, ...post, updated_at: now } : p))
    } else {
      const newPost: Post = { ...post as Post, id: crypto.randomUUID(), created_at: now, updated_at: now }
      write(KEY_POSTS, [newPost, ...all])
    }
  },
  delete(id: string): void {
    write(KEY_POSTS, this.getAll().filter(p => p.id !== id))
  },
  togglePublish(id: string): void {
    const all = this.getAll()
    write(KEY_POSTS, all.map(p => p.id === id ? { ...p, published: !p.published, updated_at: new Date().toISOString() } : p))
  },
}

// ── Projects ─────────────────────────────────────────
export const projectService = {
  getAll(): Project[] { return read<Project[]>(KEY_PROJECTS, SEED_PROJECTS) },
  getPublished(): Project[] {
    return this.getAll().filter(p => p.published).sort((a, b) => a.order_index - b.order_index)
  },
  getBySlug(slug: string): Project | undefined {
    return this.getAll().find(p => p.slug === slug)
  },
  save(project: Partial<Project> & { id?: string }): void {
    const all = this.getAll()
    const now = new Date().toISOString()
    if (project.id) {
      write(KEY_PROJECTS, all.map(p => p.id === project.id ? { ...p, ...project, updated_at: now } : p))
    } else {
      write(KEY_PROJECTS, [...all, { ...project, id: crypto.randomUUID(), created_at: now, updated_at: now } as Project])
    }
  },
  delete(id: string): void {
    write(KEY_PROJECTS, this.getAll().filter(p => p.id !== id))
  },
}

// ── Settings ─────────────────────────────────────────
export const settingsService = {
  get() { return read(KEY_SETTINGS, DEFAULT_SETTINGS) },
  set(settings: typeof DEFAULT_SETTINGS) { write(KEY_SETTINGS, settings) },
}

// ── Seed data (shown before admin adds real content) ──

export const DEFAULT_SETTINGS = {
  accent_color: '#d4fe08',
  site_title: 'Merve Algan — SEO & GEO Manager',
  site_description: 'Teknik SEO, içerik mimarisi ve AI görünürlüğü odaklı organik büyüme çalışmaları yürüten SEO & GEO Manager.',
  linkedin_url: 'https://linkedin.com/in/mervealgan',
  cv_url: '',
  email: 'merve@mervealgan.com',
  chatbot_provider: 'none' as 'none' | 'anthropic' | 'openai' | 'gemini',
  chatbot_api_key: '',
}

const SEED_POSTS: Post[] = [
  {
    id: 'seed-1',
    slug: 'geo-nedir',
    title: 'GEO Nedir? Generative Engine Optimization Rehberi',
    excerpt: 'GEO, içeriklerinizin ChatGPT, Perplexity ve Google AI Overview gibi yapay zeka motorlarında görünür olmasını sağlayan optimizasyon stratejisidir.',
    content: `## GEO Nedir?\n\nGEO (Generative Engine Optimization), içeriklerinizin yapay zeka tarafından desteklenen arama motorları ve sohbet botlarında görünür, alıntılanabilir ve önerilen içerik haline gelmesini sağlayan optimizasyon yaklaşımıdır.\n\n## Neden GEO Önemli?\n\n2024 sonrasında Google SGE, ChatGPT, Perplexity ve Bing Copilot gibi yapay zeka destekli araçlar arama trafiğinin önemli bir bölümünü oluşturmaya başladı.\n\n## GEO Stratejisinin Temel Bileşenleri\n\n### 1. Answer-First İçerik Yapısı\n\nİçeriklerinizin ilk paragrafında soruya doğrudan yanıt vermeniz gerekir.\n\n### 2. Structured Data ve Schema\n\nFAQPage, HowTo ve Article schema türleri GEO için kritiktir.\n\n### 3. LLM Trafik Takibi\n\nGA4 içinde ChatGPT ve Perplexity kaynaklı trafiği izlemek için özel filtreler oluşturulmalıdır.`,
    category: 'GEO',
    tags: ['geo', 'ai-visibility', 'llm', 'schema'],
    author_name: 'Merve Algan',
    author_role: 'SEO & GEO Manager',
    read_time: 8,
    published: true,
    featured: true,
    created_at: '2025-05-01T10:00:00Z',
    updated_at: '2025-05-15T10:00:00Z',
    schema_type: 'BlogPosting',
    answer_first: 'GEO, içeriklerinizin ChatGPT ve Perplexity gibi yapay zeka motorlarında görünür ve alıntılanabilir hale gelmesini sağlayan optimizasyon stratejisidir.',
    seo_title: 'GEO Nedir? Kapsamlı Generative Engine Optimization Rehberi',
    seo_description: 'GEO (Generative Engine Optimization) nedir, nasıl uygulanır? Yapay zeka arama motorlarında görünür olmanın yolları.',
  },
  {
    id: 'seed-2',
    slug: 'teknik-seo-nedir',
    title: 'Teknik SEO Nedir? 2025 Kapsamlı Rehber',
    excerpt: 'Teknik SEO, arama motorlarının sitenizi daha iyi taramasını, anlamasını ve indekslemesini sağlamak için yapılan optimizasyon çalışmalarının tümüdür.',
    content: `## Teknik SEO Nedir?\n\nTeknik SEO; crawlability, indexation, site hızı, schema markup ve Core Web Vitals gibi teknik faktörleri optimize etme sürecidir.\n\n## Temel Alanlar\n\n### Core Web Vitals\n\n- **LCP** < 2.5s\n- **INP** < 200ms\n- **CLS** < 0.1\n\n### Schema Markup\n\nStructured data, içeriğin anlamını arama motorlarına net şekilde iletir.`,
    category: 'Technical SEO',
    tags: ['teknik-seo', 'core-web-vitals', 'schema'],
    author_name: 'Merve Algan',
    author_role: 'SEO & GEO Manager',
    read_time: 6,
    published: true,
    featured: false,
    created_at: '2025-04-10T10:00:00Z',
    updated_at: '2025-04-20T10:00:00Z',
    schema_type: 'BlogPosting',
    answer_first: 'Teknik SEO, arama motorlarının sitenizi daha iyi taramasını ve indekslemesini sağlayan tüm optimizasyon çalışmalarının bütünüdür.',
    seo_title: 'Teknik SEO Nedir? 2025 Rehberi — Merve Algan',
    seo_description: 'Teknik SEO nedir, nasıl yapılır? Core Web Vitals, schema markup, crawlability ve daha fazlası.',
  },
  {
    id: 'seed-3',
    slug: 'ai-alintilabilir-icerik',
    title: 'AI Tarafından Alıntılanabilir İçerik Nasıl Oluşturulur?',
    excerpt: 'Answer-first yapılar, schema sinyalleri ve LLM citation pattern analizi ile GEO odaklı içerik üretimi.',
    content: `## AI Alıntılanabilir İçerik\n\nYapay zeka motorlarının bir içeriği alıntılaması için belirli yapısal özelliklerin sağlanması gerekir.\n\n## Temel Prensipler\n\n1. **Açık ve doğrudan yanıtlar** — İlk 1-2 cümlede soruyu yanıtla\n2. **FAQPage schema** — Soru-cevap yapısını işaretle\n3. **Otorite sinyalleri** — Author schema, E-E-A-T\n4. **Kaynak kalitesi** — Veriye dayalı, atıf içeren içerik`,
    category: 'GEO',
    tags: ['geo', 'citation', 'answer-first', 'schema'],
    author_name: 'Merve Algan',
    author_role: 'SEO & GEO Manager',
    read_time: 7,
    published: true,
    featured: false,
    created_at: '2025-03-20T10:00:00Z',
    updated_at: '2025-03-25T10:00:00Z',
    schema_type: 'BlogPosting',
    answer_first: 'AI tarafından alıntılanabilir içerik; answer-first yapısı, FAQPage schema ve güçlü E-E-A-T sinyalleri üzerine inşa edilir.',
  },
]

const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-1', slug: 'vepara', title: 'Vepara', sector: 'Fintech',
    role: 'SEO & GEO Manager',
    description: 'Sanal POS görünürlüğü, landing page optimizasyonu, schema planlaması, internal linking ve AI visibility raporlaması.',
    challenge: 'Fintech alanında yoğun rekabet, sanal POS aramalarında düşük görünürlük.',
    approach: 'Intent-first içerik mimarisi, kapsamlı schema implementasyonu, GEO çalışmaları.',
    results: 'AI kaynaklı trafik +34% MoM, schema coverage %97, citation rate 4/10 sorgu.',
    tools: ['GSC', 'Ahrefs', 'Screaming Frog', 'GA4', 'Looker Studio'],
    tags: ['Technical SEO', 'GEO', 'Schema', 'Fintech'],
    featured: true, published: true, order_index: 1,
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'proj-2', slug: 'prismind-media', title: 'Prismind Media', sector: 'Ajans',
    role: 'SEO & GEO Lead',
    description: 'Ajans markası için SEO/GEO içerik mimarisi, hizmet sayfaları ve çok kanallı görünürlük stratejisi.',
    challenge: 'Yeni ajans markası için organik görünürlük sıfırdan inşa etme.',
    approach: 'İçerik cluster mimarisi, hizmet sayfaları optimizasyonu, GEO-ready içerik.',
    results: 'Organik trafik 6 ayda 3x büyüme, 12 anahtar kelimede ilk sayfa.',
    tools: ['Ahrefs', 'GSC', 'WordPress', 'Schema.org'],
    tags: ['Content Architecture', 'AI Visibility', 'Agency SEO'],
    featured: true, published: true, order_index: 2,
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'proj-3', slug: 'heypilot', title: 'HeyPilot', sector: 'AI Product',
    role: 'SEO & Content Strategist',
    description: 'AI ürün konumlandırması, pazar içgörüsü, sosyal medya görünürlüğü ve içerik stratejisi.',
    challenge: 'Yeni AI ürününü kalabalık pazarda konumlandırma ve organik büyüme.',
    approach: 'Product SEO, AI araç kategorilerinde görünürlük, sosyal kanallarda içerik.',
    results: 'Ürün sayfaları AI araç listelerinde yer aldı, sosyal erişim 5x arttı.',
    tools: ['GSC', 'GA4', 'Ahrefs', 'Perplexity monitoring'],
    tags: ['Product SEO', 'AI Visibility', 'Content Strategy'],
    featured: true, published: true, order_index: 3,
    created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z',
  },
]
