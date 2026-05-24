export function MarqueeTicker() {
  const items = [
    { label: 'Technical SEO', accent: true },
    { label: 'Schema Markup', accent: false },
    { label: 'GEO', accent: true },
    { label: 'AI Visibility', accent: false },
    { label: 'Content Architecture', accent: true },
    { label: 'Intent Mapping', accent: false },
    { label: 'Internal Linking', accent: true },
    { label: 'Crawl Optimization', accent: false },
    { label: 'GA4 + Looker Studio', accent: true },
    { label: 'LLM Traffic', accent: false },
    { label: 'Answer-First Content', accent: true },
    { label: 'Core Web Vitals', accent: false },
  ]
  const doubled = [...items, ...items]

  return (
    <div
      className="border-y border-[var(--color-border)] bg-[var(--navy-800)] py-3 overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex marquee-track whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-6 font-mono text-[11px] tracking-wider">
            <span
              className={item.accent ? '' : 'text-[var(--text-400)]'}
              style={item.accent ? { color: 'var(--acid)' } : {}}
            >
              {item.label}
            </span>
            <span className="text-[var(--text-500)]">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
