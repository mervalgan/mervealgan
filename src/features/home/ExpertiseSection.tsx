import { motion } from 'framer-motion'

const CARDS = [
  {
    tag: '[01] Technical',
    title: 'Technical SEO',
    items: ['Crawlability & indexation', 'Core Web Vitals', 'Schema markup / JSON-LD', 'Site architecture', 'Screaming Frog audit'],
    accent: false,
  },
  {
    tag: '[02] Content',
    title: 'Content Architecture',
    items: ['Topic cluster yapıları', 'Intent analysis', 'Landing page SEO', 'Internal linking', 'SEO brief yazımı'],
    accent: false,
  },
  {
    tag: '[03] GEO ★',
    title: 'GEO & AI Visibility',
    items: ['LLM trafik takibi', 'Answer-first content', 'AI citation analizi', 'Structured data GEO', 'Perplexity / ChatGPT'],
    accent: true,
  },
  {
    tag: '[04] Analytics',
    title: 'Organic Growth',
    items: ['GA4 + GSC setup', 'Looker Studio dashboards', 'Ahrefs reporting', 'Ekip koordinasyonu', 'SEO proje yönetimi'],
    accent: false,
  },
]

export function ExpertiseSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="expertise-heading">
      <div className="mb-10">
        <p className="font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-2">// Uzmanlık</p>
        <h2 id="expertise-heading" className="font-display font-bold text-2xl text-[var(--color-text)]">Core Competencies</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-[var(--navy-900)] p-6 group hover:bg-[var(--navy-800)] transition-colors border-b-2 border-transparent hover:border-b-[var(--acid)] relative overflow-hidden"
          >
            {card.accent && (
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'var(--acid)', opacity: 0.6 }}
              />
            )}
            <div
              className="font-mono text-[10px] tracking-widest uppercase mb-3 font-medium"
              style={{ color: card.accent ? 'var(--acid)' : 'var(--text-500)' }}
            >
              {card.tag}
            </div>
            <h3
              className="font-display font-bold text-sm mb-4"
              style={{ color: card.accent ? 'var(--acid)' : 'var(--color-text)' }}
            >
              {card.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {card.items.map((item) => (
                <li key={item} className="font-mono text-[11px] text-[var(--text-400)] flex items-start gap-2">
                  <span className="text-[var(--text-500)] mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
