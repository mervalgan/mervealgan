import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const CASES = [
  {
    num: 'CASE_001',
    sector: 'Fintech',
    title: 'Vepara',
    desc: 'Sanal POS görünürlüğü, landing page optimizasyonu, schema planlaması, internal linking ve AI visibility raporlaması.',
    tags: ['techSEO', 'schema', 'GEO', 'landing'],
    href: '/calismalar/vepara',
  },
  {
    num: 'CASE_002',
    sector: 'Ajans / Medya',
    title: 'Prismind Media',
    desc: 'Ajans markası için SEO/GEO içerik mimarisi, hizmet sayfaları optimizasyonu ve çok kanallı görünürlük stratejisi.',
    tags: ['contentArch', 'aiVis', 'branding'],
    href: '/calismalar/prismind-media',
  },
  {
    num: 'CASE_003',
    sector: 'AI Product',
    title: 'HeyPilot',
    desc: 'AI ürün konumlandırması, pazar içgörüsü, sosyal medya görünürlüğü ve içerik stratejisi çalışmaları.',
    tags: ['productSEO', 'strategy', 'social'],
    href: '/calismalar/heypilot',
  },
]

export function CasesSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="cases-heading">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-2">// Projeler</p>
          <h2 id="cases-heading" className="font-display font-bold text-2xl text-[var(--color-text)]">Seçili Case Studies</h2>
        </div>
        <Link
          to="/calismalar"
          className="font-mono text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors flex items-center gap-1"
        >
          Tümü <ArrowUpRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
        {CASES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={c.href}
              className="group block bg-[var(--navy-900)] p-7 hover:bg-[var(--navy-700)] transition-all duration-300 relative overflow-hidden h-full"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--acid)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="font-mono text-[10px] text-[var(--text-500)] mb-4 tracking-wider">{c.num}</div>
              <div
                className="inline-block font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded mb-3 border"
                style={{
                  background: 'var(--acid-dim)',
                  borderColor: 'var(--acid-border)',
                  color: 'var(--acid)',
                }}
              >
                {c.sector}
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-[var(--color-text)] group-hover:text-[var(--acid)] transition-colors">
                {c.title}
              </h3>
              <p className="font-sans text-xs text-[var(--text-400)] leading-relaxed mb-5">{c.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] border border-[var(--navy-300)] text-[var(--text-500)] px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowUpRight
                size={16}
                className="absolute top-6 right-6 text-[var(--text-500)] group-hover:text-[var(--acid)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
