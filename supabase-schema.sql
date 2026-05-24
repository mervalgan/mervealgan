-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'SEO',
  tags TEXT[] NOT NULL DEFAULT '{}',
  author_name TEXT NOT NULL DEFAULT 'Merve Algan',
  author_role TEXT NOT NULL DEFAULT 'SEO & GEO Manager',
  read_time INTEGER NOT NULL DEFAULT 5,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  schema_type TEXT NOT NULL DEFAULT 'BlogPosting',
  answer_first TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  sector TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  challenge TEXT NOT NULL DEFAULT '',
  approach TEXT NOT NULL DEFAULT '',
  results TEXT NOT NULL DEFAULT '',
  tools TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_category_idx ON posts(category);
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts(published);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS policies (enable after setting up auth)
-- ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read published" ON posts FOR SELECT USING (published = true);
-- CREATE POLICY "Admin all" ON posts USING (auth.role() = 'authenticated');

-- Sample data
INSERT INTO posts (slug, title, excerpt, content, category, tags, read_time, published, featured, answer_first, seo_title, seo_description)
VALUES 
('geo-nedir', 'GEO Nedir? Generative Engine Optimization Rehberi', 
 'GEO, içeriklerinizin ChatGPT, Perplexity ve Google AI Overview gibi yapay zeka motorlarında görünür olmasını sağlayan optimizasyon stratejisidir.',
 '## GEO Nedir?

GEO (Generative Engine Optimization), içeriklerinizin yapay zeka tarafından desteklenen arama motorları ve sohbet botlarında görünür, alıntılanabilir ve önerilen içerik haline gelmesini sağlayan optimizasyon yaklaşımıdır.

## Neden GEO Önemli?

2024 sonrasında Google SGE, ChatGPT, Perplexity ve Bing Copilot gibi yapay zeka destekli araçlar arama trafiğinin önemli bir bölümünü oluşturmaya başladı.

## GEO Stratejisinin Temel Bileşenleri

### 1. Answer-First İçerik Yapısı

İçeriklerinizin ilk paragrafında soruya doğrudan yanıt vermeniz gerekir...

### 2. Structured Data ve Schema

FAQPage, HowTo ve Article schema türleri GEO için kritiktir...

### 3. LLM Trafik Takibi

GA4 içinde ChatGPT ve Perplexity kaynaklı trafiği izlemek için...', 
 'GEO',
 ARRAY['geo', 'ai-visibility', 'llm', 'schema'],
 8, true, true,
 'GEO, içeriklerinizin ChatGPT, Perplexity ve Google AI Overview gibi yapay zeka motorlarında görünür ve alıntılanabilir hale gelmesini sağlayan optimizasyon stratejisidir.',
 'GEO Nedir? Kapsamlı Generative Engine Optimization Rehberi',
 'GEO (Generative Engine Optimization) nedir, nasıl uygulanır? Yapay zeka arama motorlarında görünür olmanın yolları.'
),
('teknik-seo-nedir', 'Teknik SEO Nedir? 2025 Kapsamlı Rehber',
 'Teknik SEO, arama motorlarının sitenizi daha iyi taramasını, anlamasını ve indekslemesini sağlamak için yapılan optimizasyon çalışmalarının tümüdür.',
 '## Teknik SEO Nedir?

Teknik SEO; crawlability, indexation, site hızı, schema markup ve Core Web Vitals gibi teknik faktörleri optimize etme sürecidir.

## Temel Teknik SEO Alanları

### Core Web Vitals

- LCP (Largest Contentful Paint): < 2.5s hedefi
- INP (Interaction to Next Paint): < 200ms hedefi  
- CLS (Cumulative Layout Shift): < 0.1 hedefi

### Schema Markup

Structured data, içeriğinizin anlamını arama motorlarına net şekilde iletir...',
 'Technical SEO',
 ARRAY['teknik-seo', 'core-web-vitals', 'schema', 'crawlability'],
 6, true, false,
 'Teknik SEO, arama motorlarının sitenizi daha iyi taramasını ve indekslemesini sağlayan optimizasyon çalışmalarının bütünüdür.',
 'Teknik SEO Nedir? 2025 Rehberi — Merve Algan',
 'Teknik SEO nedir, nasıl yapılır? Core Web Vitals, schema markup, crawlability ve daha fazlası.'
);
