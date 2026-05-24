import { useState } from 'react'
import { motion } from 'framer-motion'
import { SEOHead } from '@/components/seo/SEOHead'
import { cn } from '@/utils/cn'

// ── SERP Snippet Tool ────────────────────────────────────
function SerpTool() {
  const [title, setTitle] = useState('Sanal POS Nedir? Vepara ile Hızlı Kurulum')
  const [desc, setDesc] = useState('Sanal POS başvurusu, komisyon oranları ve online ödeme sistemleri hakkında her şey.')
  const [url, setUrl] = useState('mervealgan.com › blog › serp-snippet')
  const tl = title.length, dl = desc.length
  return (
    <div className="flex flex-col gap-4">
      {[
        { label: 'Title Tag', val: title, set: setTitle, max: 60, ph: 'Sayfa başlığı…' },
        { label: 'Meta Description', val: desc, set: setDesc, max: 160, ph: 'Meta açıklama…' },
        { label: 'URL', val: url, set: setUrl, max: 100, ph: 'site.com › kategori › slug' },
      ].map(({ label, val, set, max, ph }) => (
        <div key={label}>
          <label className="font-mono text-[10px] text-[var(--text-400)] uppercase tracking-wider block mb-1.5">{label}</label>
          <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
            className="w-full bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-200)] outline-none focus:border-[var(--acid-border)] transition-colors" />
          <div className={cn('font-mono text-[10px] mt-1', val.length > max ? 'text-[var(--color-error)]' : 'text-[var(--text-500)]')}>
            {val.length}/{max}
          </div>
        </div>
      ))}
      <div className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-4 mt-2">
        <div className="font-mono text-[10px] text-[var(--text-500)] mb-3 uppercase tracking-wider">SERP Önizleme</div>
        <div className="font-mono text-[11px] text-[var(--color-info)] mb-1 truncate">{url || 'site.com › slug'}</div>
        <div className="font-bold text-sm mb-1 leading-snug truncate" style={{ color: 'var(--acid)' }}>{title || 'Başlık…'}</div>
        <div className="text-xs text-[var(--text-300)] leading-relaxed line-clamp-2">{desc || 'Meta açıklama…'}</div>
      </div>
    </div>
  )
}

// ── Meta Checker ─────────────────────────────────────────
function MetaChecker() {
  const [h1, setH1] = useState('')
  const [mTitle, setMTitle] = useState('')
  const [mDesc, setMDesc] = useState('')
  const [canon, setCanon] = useState('')
  const checks = [
    { label: 'H1 doldu', ok: h1.trim().length > 0 },
    { label: 'Title 10–60 karakter', ok: mTitle.length >= 10 && mTitle.length <= 60 },
    { label: 'Description 50–160 karakter', ok: mDesc.length >= 50 && mDesc.length <= 160 },
    { label: 'Canonical tanımlı', ok: canon.startsWith('http') },
    { label: 'Title keyword içeriyor', ok: mTitle.length > 0 && h1.length > 0 && mTitle.toLowerCase().includes(h1.split(' ')[0]?.toLowerCase() ?? '') },
  ]
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: 'H1 Metni', val: h1, set: setH1, ph: 'Sayfanın H1 başlığı' },
        { label: 'Title Tag', val: mTitle, set: setMTitle, ph: 'Meta title' },
        { label: 'Meta Description', val: mDesc, set: setMDesc, ph: 'Meta description' },
        { label: 'Canonical URL', val: canon, set: setCanon, ph: 'https://site.com/sayfa/' },
      ].map(({ label, val, set, ph }) => (
        <div key={label}>
          <label className="font-mono text-[10px] text-[var(--text-400)] uppercase tracking-wider block mb-1">{label}</label>
          <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
            className="w-full bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-200)] outline-none focus:border-[var(--acid-border)] transition-colors" />
        </div>
      ))}
      <div className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-4 mt-1">
        <div className="font-mono text-[10px] text-[var(--text-500)] mb-3 uppercase tracking-wider">Kontrol Sonuçları</div>
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-2 py-1.5 border-b border-[var(--color-border)] last:border-0">
            <span className="font-mono text-[11px]" style={{ color: c.ok ? 'var(--color-success)' : 'var(--color-error)' }}>{c.ok ? '✓' : '✗'}</span>
            <span className={cn('font-mono text-[11px]', c.ok ? 'text-[var(--text-300)]' : 'text-[var(--text-500)]')}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── FAQ Schema Generator ─────────────────────────────────
function FaqSchema() {
  const [faqs, setFaqs] = useState([{ q: '', a: '' }])
  const add = () => setFaqs(f => [...f, { q: '', a: '' }])
  const upd = (i: number, k: 'q' | 'a', v: string) => setFaqs(f => f.map((x, idx) => idx === i ? { ...x, [k]: v } : x))
  const del = (i: number) => setFaqs(f => f.filter((_, idx) => idx !== i))
  const schema = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.filter(f => f.q && f.a).map(f => ({
      '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }, null, 2)
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--text-500)]">SSS #{i + 1}</span>
            {faqs.length > 1 && <button onClick={() => del(i)} className="font-mono text-[10px] text-[var(--color-error)] hover:opacity-80">Sil</button>}
          </div>
          <input value={faq.q} onChange={e => upd(i, 'q', e.target.value)} placeholder="Soru"
            className="w-full bg-[var(--navy-800)] border border-[var(--color-border)] rounded px-3 py-2 font-mono text-xs text-[var(--text-200)] outline-none focus:border-[var(--acid-border)]" />
          <textarea value={faq.a} onChange={e => upd(i, 'a', e.target.value)} placeholder="Cevap" rows={2}
            className="w-full bg-[var(--navy-800)] border border-[var(--color-border)] rounded px-3 py-2 font-mono text-xs text-[var(--text-200)] outline-none focus:border-[var(--acid-border)] resize-none" />
        </div>
      ))}
      <button onClick={add} className="font-mono text-[11px] border border-[var(--color-border)] text-[var(--text-400)] px-3 py-2 rounded hover:border-[var(--acid-border)] hover:text-[var(--acid)] transition-all">
        + SSS Ekle
      </button>
      <div className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-wider">JSON-LD Çıktı</span>
          <button onClick={() => navigator.clipboard.writeText(schema)}
            className="font-mono text-[10px] text-[var(--text-400)] hover:text-[var(--acid)] transition-colors border border-[var(--color-border)] px-2 py-0.5 rounded">
            Kopyala
          </button>
        </div>
        <pre className="font-mono text-[10px] text-[var(--text-400)] overflow-auto max-h-40 leading-relaxed">{schema}</pre>
      </div>
    </div>
  )
}

// ── GEO Checklist ─────────────────────────────────────────
function GeoChecklist() {
  const items = [
    { cat: 'İçerik Yapısı', checks: ['İlk paragrafta soruya doğrudan yanıt veriliyor', 'H2/H3 başlıkları soru formatında', 'Answer-first giriş mevcut', '300 kelimeden uzun, kapsamlı içerik'] },
    { cat: 'Schema', checks: ['FAQPage schema eklendi', 'Article veya BlogPosting schema var', 'Author bilgisi schema\'da tanımlı', 'DatePublished ve DateModified var'] },
    { cat: 'E-E-A-T', checks: ['Yazar biyografisi mevcut', 'Kaynak atıfları var', 'Güncel tarih gösteriliyor', 'About sayfası Person schema içeriyor'] },
    { cat: 'Teknik', checks: ['Sayfa hızı LCP < 2.5s', 'Mobile responsive', 'Canonical URL tanımlı', 'Semantic HTML kullanılmış'] },
  ]
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const toggle = (k: string) => setChecked(p => ({ ...p, [k]: !p[k] }))
  const total = items.flatMap(i => i.checks).length
  const done = Object.values(checked).filter(Boolean).length
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3">
        <div className="font-mono text-[10px] text-[var(--text-500)]">İlerleme</div>
        <div className="flex-1 h-1.5 bg-[var(--navy-700)] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(done/total)*100}%`, background: 'var(--acid)' }} />
        </div>
        <div className="font-mono text-[11px] font-semibold" style={{ color: 'var(--acid)' }}>{done}/{total}</div>
      </div>
      {items.map(({ cat, checks }) => (
        <div key={cat}>
          <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--acid)' }}>{cat}</div>
          {checks.map(c => (
            <label key={c} className="flex items-start gap-2.5 py-2 cursor-pointer group">
              <div className={cn('w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all',
                checked[c] ? 'border-[var(--acid)]' : 'border-[var(--color-border)] group-hover:border-[var(--acid-border)]')}
                style={checked[c] ? { background: 'var(--acid)' } : {}}>
                {checked[c] && <span className="text-[var(--navy-900)] text-[10px] font-bold">✓</span>}
              </div>
              <input type="checkbox" checked={!!checked[c]} onChange={() => toggle(c)} className="sr-only" />
              <span className={cn('font-mono text-[11px] leading-relaxed', checked[c] ? 'line-through text-[var(--text-500)]' : 'text-[var(--text-300)]')}>{c}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Intent Mapper ─────────────────────────────────────────
function IntentMapper() {
  const [kw, setKw] = useState('')
  const intents = [
    { type: 'Informational', signal: ['nedir', 'nasıl', 'ne demek', 'neden', 'what is', 'how to', 'guide', 'learn'], color: 'var(--color-info)' },
    { type: 'Commercial', signal: ['en iyi', 'karşılaştırma', 'vs', 'review', 'best', 'top', 'comparison'], color: 'var(--acid)' },
    { type: 'Transactional', signal: ['satın al', 'fiyat', 'indir', 'ücretsiz', 'buy', 'price', 'download', 'free'], color: 'var(--color-success)' },
    { type: 'Navigational', signal: ['giriş', 'login', 'resmi site', 'official', 'sign in'], color: 'var(--color-warning)' },
  ]
  const lower = kw.toLowerCase()
  const detected = intents.find(i => i.signal.some(s => lower.includes(s)))
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="font-mono text-[10px] text-[var(--text-400)] uppercase tracking-wider block mb-1.5">Anahtar Kelime</label>
        <input value={kw} onChange={e => setKw(e.target.value)} placeholder="teknik seo nedir"
          className="w-full bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg px-3 py-2 font-mono text-sm text-[var(--text-200)] outline-none focus:border-[var(--acid-border)] transition-colors" />
      </div>
      {kw && (
        <div className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-4">
          <div className="font-mono text-[10px] text-[var(--text-500)] mb-3 uppercase tracking-wider">Tespit Edilen Intent</div>
          {detected ? (
            <div>
              <div className="font-display font-bold text-lg mb-1" style={{ color: detected.color }}>{detected.type}</div>
              <div className="font-mono text-xs text-[var(--text-400)]">Sinyal: {detected.signal.filter(s => lower.includes(s)).join(', ')}</div>
            </div>
          ) : (
            <div className="font-mono text-xs text-[var(--text-500)]">Belirgin sinyal bulunamadı — manuel analiz gerekli</div>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {intents.map(i => (
          <div key={i.type} className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3">
            <div className="font-mono text-[10px] font-semibold mb-2" style={{ color: i.color }}>{i.type}</div>
            <div className="flex flex-wrap gap-1">
              {i.signal.slice(0, 4).map(s => <span key={s} className="font-mono text-[9px] text-[var(--text-500)] border border-[var(--color-border)] px-1.5 py-0.5 rounded">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Heading Checker ───────────────────────────────────────
function HeadingChecker() {
  const [html, setHtml] = useState('')
  const headings = html.match(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi) || []
  const parsed = headings.map(h => {
    const level = parseInt(h.match(/<h([1-6])/i)?.[1] ?? '1')
    const text = h.replace(/<[^>]+>/g, '').trim()
    return { level, text }
  })
  const h1Count = parsed.filter(h => h.level === 1).length
  const checks = [
    { label: 'Tek H1 var', ok: h1Count === 1 },
    { label: 'H1 ile başlıyor', ok: parsed[0]?.level === 1 },
    { label: 'H2\'ler H1\'den sonra geliyor', ok: !parsed.find((h, i) => h.level === 2 && i === 0) },
    { label: 'Heading seviyeleri atlanmıyor', ok: parsed.every((h, i) => i === 0 || h.level - (parsed[i-1]?.level ?? 0) <= 1) },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-mono text-[10px] text-[var(--text-400)] uppercase tracking-wider block mb-1.5">HTML Yapıştır</label>
        <textarea value={html} onChange={e => setHtml(e.target.value)} rows={5} placeholder="<h1>Başlık</h1><h2>Alt Başlık</h2>…"
          className="w-full bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3 font-mono text-xs text-[var(--text-200)] outline-none focus:border-[var(--acid-border)] resize-y" />
      </div>
      {parsed.length > 0 && (
        <>
          <div className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3">
            <div className="font-mono text-[10px] text-[var(--text-500)] mb-2 uppercase tracking-wider">Heading Yapısı</div>
            {parsed.map((h, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-[var(--color-border)] last:border-0">
                <span className="font-mono text-[10px] font-bold shrink-0 w-6" style={{ color: 'var(--acid)', marginLeft: `${(h.level - 1) * 12}px` }}>H{h.level}</span>
                <span className="font-mono text-[11px] text-[var(--text-300)] line-clamp-1">{h.text}</span>
              </div>
            ))}
          </div>
          <div className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3">
            {checks.map(c => (
              <div key={c.label} className="flex items-center gap-2 py-1.5 border-b border-[var(--color-border)] last:border-0">
                <span className="font-mono text-[11px]" style={{ color: c.ok ? 'var(--color-success)' : 'var(--color-error)' }}>{c.ok ? '✓' : '✗'}</span>
                <span className="font-mono text-[11px] text-[var(--text-400)]">{c.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────
const TOOLS = [
  { id: 'serp', label: 'SERP Snippet', sub: 'Önizleyici', component: <SerpTool /> },
  { id: 'meta', label: 'Meta Kontrol', sub: 'Checker', component: <MetaChecker /> },
  { id: 'faq', label: 'FAQ Schema', sub: 'Generator', component: <FaqSchema /> },
  { id: 'geo', label: 'GEO Checklist', sub: 'AI Görünürlüğü', component: <GeoChecklist /> },
  { id: 'intent', label: 'Intent Mapper', sub: 'Anahtar Kelime', component: <IntentMapper /> },
  { id: 'heading', label: 'Heading Checker', sub: 'Yapı Kontrolü', component: <HeadingChecker /> },
]

const toolsSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'SEO Araçları — Merve Algan',
  description: 'SERP önizleyici, Meta checker, FAQ Schema generator, GEO checklist ve daha fazla ücretsiz SEO aracı.',
  url: 'https://mervealgan.com/araclar',
}

export function ToolsPage() {
  const [active, setActive] = useState('serp')
  const current = TOOLS.find(t => t.id === active)!

  return (
    <>
      <SEOHead title="SEO Araçları — Ücretsiz SEO & GEO Tools"
        description="SERP önizleyici, meta checker, FAQ schema generator, GEO checklist, intent mapper ve heading checker."
        canonical="/araclar" schema={toolsSchema}
        breadcrumbs={[{ name: 'Ana Sayfa', url: '/' }, { name: 'SEO Araçları', url: '/araclar' }]} />
      <main id="main-content" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Araçlar</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">SEO Araçları</h1>
          <p className="text-[var(--text-300)] max-w-xl text-sm leading-relaxed">API gerektirmeyen, tamamen tarayıcıda çalışan SEO &amp; GEO araçları. Ücretsiz, anında kullanılabilir.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {/* Sidebar */}
          <div className="bg-[var(--navy-900)] p-0">
            <div className="font-mono text-[10px] text-[var(--text-500)] uppercase tracking-wider px-4 py-3 border-b border-[var(--color-border)]">
              Araçlar
            </div>
            {TOOLS.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={cn('w-full text-left px-4 py-3.5 border-b border-[var(--color-border)] transition-all flex items-center gap-2.5 group',
                  active === t.id ? 'bg-[var(--acid-dim)] border-l-2' : 'hover:bg-[var(--navy-800)]')}
                style={active === t.id ? { borderLeftColor: 'var(--acid)' } : {}}>
                <div className={cn('w-1.5 h-1.5 rounded-full transition-colors', active === t.id ? '' : 'bg-[var(--text-500)] group-hover:bg-[var(--text-400)]')}
                  style={active === t.id ? { background: 'var(--acid)' } : {}} />
                <div>
                  <div className={cn('font-mono text-xs font-semibold transition-colors', active === t.id ? '' : 'text-[var(--text-400)]')}
                    style={active === t.id ? { color: 'var(--acid)' } : {}}>{t.label}</div>
                  <div className="font-mono text-[9px] text-[var(--text-500)]">{t.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="lg:col-span-3 bg-[var(--navy-900)] p-6">
            <div className="mb-5">
              <div className="font-mono text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--acid)' }}>{current.label}</div>
              <div className="font-mono text-[11px] text-[var(--text-500)]">{current.sub}</div>
            </div>
            {current.component}
          </div>
        </div>
      </main>
    </>
  )
}
