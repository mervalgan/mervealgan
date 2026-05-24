import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Send, Zap, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

const TERMINAL_LINES = [
  { delay: 0,    type: 'cmd',     text: 'init geo_audit --site=vepara.com' },
  { delay: 700,  type: 'info',    text: 'Crawling 1,240 pages…' },
  { delay: 1500, type: 'success', text: 'Schema detected → FAQPage, Product, BreadcrumbList' },
  { delay: 2100, type: 'success', text: 'LLM traffic source → ChatGPT / Perplexity (+34%)' },
  { delay: 2700, type: 'error',   text: 'Missing → VideoObject schema on 18 pages' },
  { delay: 3400, type: 'cmd',     text: 'run content_cluster --intent=informational' },
  { delay: 4100, type: 'success', text: 'Cluster mapped → sanal-pos: 12 pillar pages' },
  { delay: 4700, type: 'cmd',     text: 'check ai_visibility --model=gpt4o' },
  { delay: 5400, type: 'success', text: 'Citation rate → 4/10 queries (+2 MoM)' },
]

// Placeholder responses — will be replaced by real AI after API key added
const PLACEHOLDER_RESPONSES: Record<string, string> = {
  default: 'Merhaba! Merve\'nin çalışmaları, SEO/GEO yaklaşımı veya teknik SEO konularında sorularınızı yanıtlıyorum. API entegrasyonu yakında aktif olacak.',
  geo: 'GEO çalışmalarımda LLM kaynaklı trafiği GSC + GA4 ile takip ediyorum, answer-first içerik yapısı ve FAQPage schema ile AI citation rate\'i artırıyorum. Vepara\'da bu approach ile %34 MoM büyüme sağladık.',
  teknik: 'Teknik SEO süreçlerimde Screaming Frog audit, schema markup implementasyonu ve Core Web Vitals optimizasyonu birlikte yürütülüyor. Site hızı ve crawlability her zaman ilk kontrol noktalarım.',
  hakkında: 'SEO & GEO Manager olarak 5+ yıldır çok markalı dijital büyüme projelerinde çalışıyorum. Vepara, Prismind Media, HeyPilot gibi projelerde teknik SEO, içerik mimarisi ve AI görünürlüğünü birlikte yönetiyorum.',
  araçlar: 'Temel araç setim: Google Search Console, GA4, Ahrefs, Screaming Frog, Looker Studio ve schema markup / JSON-LD implementasyonu. Raporlama için Looker Studio dashboard\'ları kuruyorum.',
  danışmanlık: 'Danışmanlık için iletişim formundan veya LinkedIn üzerinden ulaşabilirsiniz. SEO audit, GEO strateji ve içerik mimarisi konularında çalışıyorum.',
}

function getPlaceholderReply(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('geo') || lower.includes('yapay') || lower.includes('ai') || lower.includes('llm')) return PLACEHOLDER_RESPONSES.geo
  if (lower.includes('teknik') || lower.includes('schema') || lower.includes('hız') || lower.includes('vitals')) return PLACEHOLDER_RESPONSES.teknik
  if (lower.includes('hakkında') || lower.includes('kimsin') || lower.includes('deneyim')) return PLACEHOLDER_RESPONSES.hakkında
  if (lower.includes('araç') || lower.includes('tool') || lower.includes('kullan')) return PLACEHOLDER_RESPONSES.araçlar
  if (lower.includes('danışman') || lower.includes('iletişim') || lower.includes('fiyat')) return PLACEHOLDER_RESPONSES.danışmanlık
  return PLACEHOLDER_RESPONSES.default
}

const QUICK_QUESTIONS = [
  'GEO yaklaşımın nasıl?',
  'Hangi araçları kullanıyorsun?',
  'Teknik SEO sürecin nedir?',
  'Danışmanlık alabilir miyim?',
]

const METRICS = [
  { label: 'LLM Citation Rate', value: '+34%', sub: 'Vepara · MoM' },
  { label: 'Schema Coverage', value: '97%', sub: 'Audit sonucu' },
  { label: 'AI Traffic', value: '↑ 3.2×', sub: 'YoY büyüme' },
]

interface Msg { role: 'user' | 'assistant'; text: string }

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState<boolean[]>(Array(TERMINAL_LINES.length).fill(false))
  const [termDone, setTermDone] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => { const n = [...prev]; n[i] = true; return n })
        if (i === TERMINAL_LINES.length - 1) setTimeout(() => setTermDone(true), 500)
      }, line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.015)
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.015)
  }

  const send = (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || typing) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: getPlaceholderReply(msg) }])
      setTyping(false)
    }, 900 + Math.random() * 400)
  }

  const lineColors: Record<string, string> = {
    cmd: 'var(--acid)',
    info: 'var(--text-400)',
    success: 'var(--color-success)',
    error: 'var(--color-error)',
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden grid-pattern"
      aria-label="Hero bölümü"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ x: springX, y: springY, opacity: 0.07,
            background: 'radial-gradient(circle, var(--acid) 0%, transparent 70%)' }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full"
        />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 min-h-[calc(100vh-56px)]">

          {/* ── LEFT ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 font-mono text-[11px] text-[var(--text-300)] border border-[var(--color-border)] px-3 py-1.5 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              Aktif · SEO &amp; GEO çalışmaları devam ediyor
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-display font-black leading-none tracking-tight mb-3"
              style={{ fontSize: 'clamp(52px, 8vw, 88px)' }}
            >
              <span className="block">MERVE</span>
              <span className="block acid-text-glow" style={{ color: 'var(--acid)' }}>ALGAN</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="font-mono text-xs text-[var(--text-400)] tracking-widest uppercase mb-8 flex items-center gap-2"
            >
              <span style={{ color: 'var(--acid)' }}>//</span>
              SEO &amp; GEO Manager · İzmir
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-[var(--text-300)] text-base leading-relaxed max-w-lg mb-10"
            >
              AI görünürlüğü ve SEO çalışmaları, kullanıcı niyetini anlamayı ve içerik sistemlerini daha stratejik kurmayı zorunlu hale getiren yeni bir dönemin parçası.
            </motion.p>

            {/* Metric cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="grid grid-cols-3 gap-3 mb-10"
            >
              {METRICS.map((m) => (
                <div key={m.label} className="bg-[var(--navy-700)] border border-[var(--color-border)] rounded-lg p-3 group hover:border-[var(--acid-border)] transition-all relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--acid)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                  <div className="font-mono text-lg font-semibold" style={{ color: 'var(--acid)' }}>{m.value}</div>
                  <div className="font-mono text-[10px] text-[var(--text-400)] leading-tight mt-0.5">{m.label}</div>
                  <div className="font-mono text-[9px] text-[var(--text-500)]">{m.sub}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link to="/calismalar"
                className="flex items-center gap-2 bg-[var(--acid)] text-[var(--navy-900)] px-5 py-2.5 rounded font-bold text-sm tracking-wide hover:opacity-90 transition-all hover:-translate-y-px"
                style={{ boxShadow: '0 4px 20px rgba(212,254,8,0.18)' }}
              >
                Çalışmaları İncele <ChevronRight size={14} />
              </Link>
              <Link to="/blog"
                className="flex items-center gap-2 bg-[var(--navy-600)] border border-[var(--color-border)] text-[var(--text-200)] px-5 py-2.5 rounded font-semibold text-sm tracking-wide hover:border-[var(--color-border-interactive)] transition-all"
              >
                Blog &amp; Kaynaklar
              </Link>
              <Link to="/kaynaklar" className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">
                <Zap size={12} /> SEO Araçları
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Terminal + Chat ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {/* Terminal */}
            <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--navy-700)]">
                <div className="flex gap-1.5">
                  {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                </div>
                <span className="font-mono text-[10px] text-[var(--text-500)] ml-2 tracking-wide">merve · seo/geo · audit</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                  <span className="font-mono text-[9px] text-[var(--text-500)]">LIVE</span>
                </div>
              </div>
              <div className="p-4 h-44 overflow-y-auto space-y-0.5">
                {TERMINAL_LINES.map((line, i) => (
                  <AnimatePresence key={i}>
                    {visibleLines[i] && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                        className="flex gap-2 font-mono text-[11px] leading-6"
                      >
                        {line.type === 'cmd' ? (
                          <>
                            <span className="text-[var(--text-500)]">merve</span>
                            <span style={{ color: 'var(--acid)' }}>›</span>
                            <span className="text-[var(--text-200)]">{line.text}</span>
                          </>
                        ) : (
                          <>
                            <span className="w-4 text-center" style={{ color: lineColors[line.type] }}>
                              {line.type === 'success' ? '✓' : line.type === 'error' ? '⚠' : '·'}
                            </span>
                            <span style={{ color: lineColors[line.type] }}>{line.text}</span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
                {termDone && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 font-mono text-[11px] mt-1">
                    <span className="text-[var(--text-500)]">merve</span>
                    <span style={{ color: 'var(--acid)' }}>›</span>
                    <span className="cursor-blink inline-block w-2 h-3 align-middle" style={{ background: 'var(--acid)' }} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl overflow-hidden flex flex-col" style={{ height: 340 }}>
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--navy-700)] shrink-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm shrink-0"
                  style={{ background: 'var(--acid)', color: 'var(--navy-900)' }}>M</div>
                <div>
                  <div className="text-xs font-semibold">Merve Assistant</div>
                  <div className="font-mono text-[10px] text-[var(--text-500)]">SEO · GEO · Danışmanlık</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <Sparkles size={10} style={{ color: 'var(--acid)' }} />
                  <span className="font-mono text-[9px] text-[var(--text-500)]">Placeholder · API yakında</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
                {messages.length === 0 && (
                  <div className="bg-[var(--navy-700)] border border-[var(--color-border)] rounded-lg rounded-tl-none p-3 text-xs text-[var(--text-200)] leading-relaxed max-w-[90%]">
                    Merhaba. Merve'nin SEO/GEO yaklaşımı, çalışma örnekleri veya teknik SEO hakkında soru sorabilirsiniz.
                  </div>
                )}
                {messages.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className={cn('text-xs leading-relaxed max-w-[90%] px-3 py-2.5 rounded-lg',
                      m.role === 'user'
                        ? 'self-end rounded-br-none font-medium'
                        : 'self-start rounded-tl-none bg-[var(--navy-700)] border border-[var(--color-border)] text-[var(--text-200)]'
                    )}
                    style={m.role === 'user' ? { background: 'var(--acid)', color: 'var(--navy-900)' } : {}}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="self-start bg-[var(--navy-700)] border border-[var(--color-border)] rounded-lg rounded-tl-none px-3 py-2.5 flex gap-1"
                  >
                    {[0,1,2].map(i => (
                      <motion.span key={i} className="w-1 h-1 rounded-full" style={{ background: 'var(--acid)' }}
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick chips */}
              {messages.length === 0 && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                  {QUICK_QUESTIONS.map(q => (
                    <button key={q} onClick={() => send(q)}
                      className="font-mono text-[10px] border border-[var(--color-border)] text-[var(--text-400)] px-2 py-1 rounded hover:border-[var(--acid-border)] hover:text-[var(--acid)] transition-all bg-transparent">
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 shrink-0">
                <div className="flex gap-2 items-center bg-[var(--navy-700)] border border-[var(--color-border)] rounded-lg px-3 py-2 focus-within:border-[var(--acid-border)] transition-colors">
                  <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
                    placeholder="Bir şey sor…"
                    className="flex-1 bg-transparent font-mono text-[11px] text-[var(--text-200)] placeholder-[var(--text-500)] outline-none"
                    aria-label="Soru girin" />
                  <button onClick={() => send()} disabled={!input.trim() || typing}
                    className="w-6 h-6 rounded flex items-center justify-center transition-all disabled:opacity-40"
                    style={{ background: input.trim() && !typing ? 'var(--acid)' : 'var(--navy-600)' }}
                    aria-label="Gönder">
                    <Send size={10} style={{ color: input.trim() && !typing ? 'var(--navy-900)' : 'var(--text-500)' }} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" aria-hidden="true">
        <div className="font-mono text-[9px] text-[var(--text-500)] tracking-widest uppercase">scroll</div>
        <div className="w-px h-10 overflow-hidden">
          <motion.div className="w-full h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--acid), transparent)' }}
            animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
        </div>
      </motion.div>
    </section>
  )
}
