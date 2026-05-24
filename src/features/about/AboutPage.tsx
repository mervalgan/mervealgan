import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Download } from 'lucide-react'
import { SEOHead } from '@/components/seo/SEOHead'

const SKILLS = [
  { group: 'SEO & Organik Büyüme', items: ['Keyword research & mapping', 'Content cluster yapısı', 'SERP analizi', 'SEO raporlama', 'SEO proje yönetimi'] },
  { group: 'GEO & AI Görünürlüğü', items: ['LLM trafik takibi', 'Answer-first içerik', 'AI citation analizi', 'Structured data / GEO', 'Perplexity & ChatGPT monitoring'] },
  { group: 'Technical SEO / SearchOps', items: ['Crawlability & indexation', 'Core Web Vitals', 'Schema markup / JSON-LD', 'Hreflang & canonicalization', 'Screaming Frog audit'] },
  { group: 'İçerik & Sayfa Stratejisi', items: ['Landing page optimizasyonu', 'SEO brief hazırlama', 'Internal linking mimarisi', 'Cluster & pillar yapısı', 'On-page optimizasyon'] },
  { group: 'Analiz & Raporlama', items: ['GA4 & Google Search Console', 'Looker Studio dashboard', 'Ahrefs & Semrush', 'Veri yorumlama', 'Performans izleme'] },
  { group: 'Liderlik & Operasyon', items: ['Ekip koordinasyonu', 'Yazılım ekibiyle iş birliği', 'İçerik ekibi yönetimi', 'Proje takibi', 'Çok markalı yönetim'] },
]

const TOOLS = ['Google Search Console', 'GA4', 'Ahrefs', 'Screaming Frog', 'Looker Studio', 'WordPress', 'Schema markup / JSON-LD', 'Notion', 'Figma (okuma)', 'ChatGPT / Perplexity']

const EXPERIENCE = [
  {
    role: 'SEO & GEO Manager',
    company: 'Prismind Media',
    period: '2023 — Günümüz',
    desc: 'Çok markalı SEO/GEO yönetimi. Teknik SEO, içerik mimarisi, AI görünürlüğü ve organik büyüme stratejileri. Vepara, HeyPilot, FreudAI, LayeredMindAI projelerinde liderlik.',
  },
  {
    role: 'SEO Specialist',
    company: 'Serbest Danışmanlık',
    period: '2021 — 2023',
    desc: 'E-ticaret ve SaaS markaları için teknik SEO audit, içerik stratejisi ve landing page optimizasyonu.',
  },
  {
    role: 'Digital Marketing Specialist',
    company: 'Çeşitli Ajanslar',
    period: '2020 — 2021',
    desc: 'SEO, içerik pazarlaması ve dijital strateji alanlarında pratik deneyim kazanımı.',
  },
]

const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Merve Algan',
    jobTitle: 'SEO & GEO Manager',
    url: 'https://mervealgan.com/hakkimda',
    description: 'Teknik SEO, içerik mimarisi ve AI görünürlüğü odaklı organik büyüme çalışmaları yürüten SEO & GEO Manager.',
    knowsAbout: ['SEO', 'GEO', 'Technical SEO', 'Content Architecture', 'AI Visibility'],
    address: { '@type': 'PostalAddress', addressLocality: 'İzmir', addressCountry: 'TR' },
    sameAs: ['https://linkedin.com/in/mervealgan'],
  },
}

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="Hakkımda — SEO & GEO Manager"
        description="Merve Algan: Teknik SEO, içerik mimarisi, GEO ve AI görünürlüğü üzerine 5+ yıl deneyimli SEO & GEO Manager. İzmir merkezli."
        canonical="/hakkimda"
        schema={personSchema}
        breadcrumbs={[{ name: 'Ana Sayfa', url: '/' }, { name: 'Hakkımda', url: '/hakkimda' }]}
      />
      <main id="main-content" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fade} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Hakkımda</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl mb-6">
            SEO &amp; GEO<br /><span style={{ color: 'var(--acid)' }}>Manager</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            <p className="text-[var(--text-300)] leading-relaxed">
              AI görünürlüğü ve SEO çalışmaları, kullanıcı niyetini anlamayı ve içerik sistemlerini daha stratejik kurmayı zorunlu hale getiren yeni bir dönemin parçası. Teknik SEO, içerik mimarisi, GEO ve organik büyüme çalışmalarını birlikte ele alıyorum.
            </p>
            <p className="text-[var(--text-400)] leading-relaxed text-sm">
              5+ yıldır dijital pazarlama ve SEO alanında çalışıyorum. Çok markalı yapılarda SEO/GEO süreçlerini yönetmek, yazılım ve içerik ekipleriyle koordineli çalışmak ve ölçülebilir organik büyüme sistemleri kurmak temel odağım.
            </p>
          </div>
          <div className="flex gap-3 mt-8">
            <a href="https://linkedin.com/in/mervealgan" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[var(--color-border)] text-[var(--text-300)] px-4 py-2 rounded text-sm font-medium hover:border-[var(--acid-border)] hover:text-[var(--acid)] transition-all">
              <ExternalLink size={14} /> LinkedIn
            </a>
            <a href="#"
              className="flex items-center gap-2 bg-[var(--acid)] text-[var(--navy-900)] px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition-all">
              <Download size={14} /> CV İndir
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div {...fade} transition={{ delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)] mb-16">
          {[['5+', 'Yıl Deneyim'], ['40+', 'Web Sitesi'], ['100+', 'Landing Page'], ['3', 'Aktif Marka']].map(([n, l]) => (
            <div key={l} className="bg-[var(--navy-800)] p-6 text-center">
              <div className="font-display font-black text-3xl mb-1" style={{ color: 'var(--acid)' }}>{n}</div>
              <div className="font-mono text-[10px] text-[var(--text-500)] uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* Yaklaşım */}
        <motion.div {...fade} transition={{ delay: 0.1 }} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Yaklaşım</p>
          <h2 className="font-display font-bold text-2xl mb-8">SEO &amp; GEO'ya Nasıl Bakıyorum?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
            {[
              { t: 'Sistem olarak SEO', d: 'SEO\'yu tek tek sayfaları optimize etmek değil, içerik sistemi ve site mimarisini birlikte tasarlamak olarak görüyorum. Her kararın teknik, içerik ve görünürlük boyutları var.' },
              { t: 'GEO yeni bir katman', d: 'AI arama motorları yeni bir görünürlük katmanı oluşturdu. Bu katmanda varlık göstermek; answer-first içerik, güçlü schema ve E-E-A-T sinyallerini birlikte gerektiriyor.' },
              { t: 'Veri önce, sezgi sonra', d: 'Strateji kararlarını GSC verileri, crawl raporları ve kullanıcı davranış analizleriyle destekliyorum. Ama sayıların arkasındaki kullanıcı niyetini anlamak her zaman ön planda.' },
            ].map(({ t, d }) => (
              <div key={t} className="bg-[var(--navy-900)] p-6 hover:bg-[var(--navy-800)] transition-colors">
                <h3 className="font-display font-bold text-sm mb-3" style={{ color: 'var(--acid)' }}>{t}</h3>
                <p className="text-xs text-[var(--text-400)] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deneyim */}
        <motion.div {...fade} transition={{ delay: 0.15 }} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Deneyim</p>
          <h2 className="font-display font-bold text-2xl mb-8">İş Deneyimi</h2>
          <div className="flex flex-col gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
            {EXPERIENCE.map((e, i) => (
              <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }}
                className="bg-[var(--navy-900)] p-6 hover:bg-[var(--navy-800)] transition-colors flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="sm:w-48 shrink-0">
                  <div className="font-mono text-[10px] text-[var(--text-500)] tracking-wider">{e.period}</div>
                </div>
                <div>
                  <div className="font-display font-bold text-base mb-0.5">{e.role}</div>
                  <div className="font-mono text-[11px] mb-3" style={{ color: 'var(--acid)' }}>{e.company}</div>
                  <p className="text-sm text-[var(--text-400)] leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Yetkinlikler */}
        <motion.div {...fade} transition={{ delay: 0.15 }} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Yetkinlikler</p>
          <h2 className="font-display font-bold text-2xl mb-8">Temel Yetkinlikler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((s) => (
              <div key={s.group} className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--acid-border)] transition-colors">
                <h3 className="font-mono text-[10px] uppercase tracking-widest mb-4 font-semibold" style={{ color: 'var(--acid)' }}>{s.group}</h3>
                <ul className="flex flex-col gap-2">
                  {s.items.map(item => (
                    <li key={item} className="flex items-start gap-2 font-mono text-[11px] text-[var(--text-400)]">
                      <span style={{ color: 'var(--acid)' }}>›</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Araçlar */}
        <motion.div {...fade} transition={{ delay: 0.2 }} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Stack</p>
          <h2 className="font-display font-bold text-2xl mb-6">Araçlar &amp; Teknolojiler</h2>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map(tool => (
              <span key={tool} className="font-mono text-xs border border-[var(--color-border)] text-[var(--text-300)] px-3 py-1.5 rounded hover:border-[var(--acid-border)] hover:text-[var(--acid)] transition-all cursor-default">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fade} transition={{ delay: 0.2 }}
          className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-8 text-center">
          <h2 className="font-display font-bold text-2xl mb-3">Birlikte Çalışalım</h2>
          <p className="text-[var(--text-400)] mb-6 text-sm max-w-md mx-auto">SEO audit, GEO strateji veya içerik mimarisi konularında danışmanlık için iletişime geçebilirsiniz.</p>
          <Link to="/iletisim"
            className="inline-flex items-center gap-2 bg-[var(--acid)] text-[var(--navy-900)] px-6 py-3 rounded font-bold text-sm hover:opacity-90 transition-all">
            İletişime Geç
          </Link>
        </motion.div>
      </main>
    </>
  )
}
