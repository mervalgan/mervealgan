import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Folder, Settings, LogOut, Plus, Edit, Trash2, Eye, EyeOff, Save, X, Tag, Palette } from 'lucide-react'
import { postService, projectService, settingsService, DEFAULT_SETTINGS } from '@/services/content'
import type { Post, BlogCategory } from '@/types'
import { cn } from '@/utils/cn'

type Tab = 'posts' | 'projects' | 'categories' | 'appearance' | 'settings'
const CATS: BlogCategory[] = ['SEO', 'GEO', 'Technical SEO', 'Content Strategy', 'AI Visibility', 'Case Notes', 'Tools', 'Career']

// ── Reusable primitives ──────────────────────────────────
const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-mono text-[10px] text-[var(--text-400)] uppercase tracking-wider">{label}</label>
    {children}
  </div>
)

const Inp = ({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-200)] placeholder-[var(--text-500)] outline-none focus:border-[var(--acid-border)] transition-colors" />
)

const Sel = ({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg px-3 py-2 font-mono text-xs text-[var(--text-200)] outline-none focus:border-[var(--acid-border)]">
    {children}
  </select>
)

const TA = ({ value, onChange, rows = 6 }: { value: string; onChange: (v: string) => void; rows?: number }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
    className="w-full bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-3 font-mono text-xs text-[var(--text-200)] placeholder-[var(--text-500)] outline-none focus:border-[var(--acid-border)] resize-y leading-relaxed" />
)

// ── Post editor ──────────────────────────────────────────
type PostForm = Omit<Post, 'id' | 'created_at' | 'updated_at'>
const EMPTY_POST: PostForm = {
  slug: '', title: '', excerpt: '', content: '', category: 'SEO', tags: [],
  author_name: 'Merve Algan', author_role: 'SEO & GEO Manager',
  read_time: 5, published: false, featured: false, schema_type: 'BlogPosting',
}

function PostEditor({ post, onSave, onClose }: { post: Post | null; onSave: (p: PostForm, id?: string) => void; onClose: () => void }) {
  const [form, setForm] = useState<PostForm>(post ? { ...post } : EMPTY_POST)
  const [edTab, setEdTab] = useState<'content' | 'seo' | 'schema'>('content')
  const [tagInp, setTagInp] = useState('')
  const s = <K extends keyof PostForm>(k: K, v: PostForm[K]) => setForm(p => ({ ...p, [k]: v }))

  const tLen = (form.seo_title ?? '').length
  const dLen = (form.seo_description ?? '').length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/75 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl w-full max-w-3xl my-4">
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <h2 className="font-display font-bold text-sm">{post ? 'Yazı Düzenle' : 'Yeni Yazı'}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => s('published', !form.published)}
              className={cn('flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1.5 rounded border transition-all',
                form.published ? 'border-[var(--color-success)] text-[var(--color-success)]' : 'border-[var(--color-border)] text-[var(--text-400)]')}>
              {form.published ? <Eye size={11} /> : <EyeOff size={11} />}
              {form.published ? 'Yayında' : 'Taslak'}
            </button>
            <button onClick={() => onSave(form, post?.id)}
              className="flex items-center gap-1.5 bg-[var(--acid)] text-[var(--navy-900)] px-3 py-1.5 rounded font-bold text-xs">
              <Save size={11} /> Kaydet
            </button>
            <button onClick={onClose} className="text-[var(--text-400)] hover:text-[var(--color-text)] p-1"><X size={16} /></button>
          </div>
        </div>

        <div className="flex border-b border-[var(--color-border)]">
          {(['content', 'seo', 'schema'] as const).map(t => (
            <button key={t} onClick={() => setEdTab(t)}
              className={cn('px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors',
                edTab === t ? 'border-b-2 border-[var(--acid)]' : 'text-[var(--text-400)] hover:text-[var(--color-text)]')}
              style={edTab === t ? { color: 'var(--acid)' } : {}}>
              {t === 'content' ? 'İçerik' : t === 'seo' ? 'SEO' : 'Schema'}
            </button>
          ))}
        </div>

        <div className="p-5 flex flex-col gap-4">
          {edTab === 'content' && <>
            <div className="grid grid-cols-2 gap-4">
              <F label="Başlık"><Inp value={form.title} onChange={v => s('title', v)} placeholder="Blog başlığı" /></F>
              <F label="Slug"><Inp value={form.slug} onChange={v => s('slug', v.toLowerCase().replace(/\s+/g, '-'))} placeholder="url-slug" /></F>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <F label="Kategori">
                <Sel value={form.category} onChange={v => s('category', v as BlogCategory)}>
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </Sel>
              </F>
              <F label="Okuma Süresi (dk)"><Inp value={String(form.read_time)} onChange={v => s('read_time', parseInt(v) || 5)} type="number" /></F>
            </div>
            <F label="Answer-First Giriş"><TA value={form.answer_first ?? ''} onChange={v => s('answer_first', v)} rows={2} /></F>
            <F label="Özet"><TA value={form.excerpt} onChange={v => s('excerpt', v)} rows={3} /></F>
            <F label="İçerik (Markdown)"><TA value={form.content} onChange={v => s('content', v)} rows={14} /></F>
            <F label="Etiketler">
              <div className="flex gap-2">
                <Inp value={tagInp} onChange={setTagInp} placeholder="Etiket gir + Enter" />
                <button onClick={() => { if (tagInp.trim()) { s('tags', [...form.tags, tagInp.trim()]); setTagInp('') } }}
                  className="bg-[var(--navy-600)] border border-[var(--color-border)] px-3 rounded text-xs text-[var(--text-300)] hover:border-[var(--acid-border)] hover:text-[var(--acid)] transition-all shrink-0">
                  <Plus size={12} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {form.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 font-mono text-[10px] bg-[var(--navy-700)] border border-[var(--color-border)] px-2 py-0.5 rounded text-[var(--text-300)]">
                    {tag}
                    <button onClick={() => s('tags', form.tags.filter(t => t !== tag))} className="text-[var(--text-500)] hover:text-[var(--color-error)]"><X size={9} /></button>
                  </span>
                ))}
              </div>
            </F>
          </>}

          {edTab === 'seo' && <>
            <F label={`SEO Title (${tLen}/60)`}>
              <Inp value={form.seo_title ?? ''} onChange={v => s('seo_title', v)} placeholder="Boş bırakılırsa başlık kullanılır" />
              <div className={cn('font-mono text-[10px]', tLen > 60 ? 'text-[var(--color-error)]' : 'text-[var(--text-500)]')}>{tLen}/60</div>
            </F>
            <F label={`Meta Description (${dLen}/160)`}>
              <TA value={form.seo_description ?? ''} onChange={v => s('seo_description', v)} rows={3} />
              <div className={cn('font-mono text-[10px]', dLen > 160 ? 'text-[var(--color-error)]' : 'text-[var(--text-500)]')}>{dLen}/160</div>
            </F>
            <div className="bg-[var(--navy-700)] border border-[var(--color-border)] rounded-lg p-4">
              <div className="font-mono text-[10px] text-[var(--text-500)] mb-3 uppercase tracking-wider">SERP Önizleme</div>
              <div className="font-mono text-[11px] text-[var(--color-info)] mb-1">mervealgan.com › blog › {form.slug || 'slug'}</div>
              <div className="font-bold text-sm mb-1 leading-snug" style={{ color: 'var(--acid)' }}>{form.seo_title || form.title || 'Başlık…'}</div>
              <div className="text-xs text-[var(--text-300)] leading-relaxed">{form.seo_description || form.excerpt || 'Meta açıklama…'}</div>
            </div>
          </>}

          {edTab === 'schema' && <>
            <F label="Schema Tipi">
              <Sel value={form.schema_type} onChange={v => s('schema_type', v)}>
                {['BlogPosting','Article','HowTo','FAQPage'].map(t => <option key={t} value={t}>{t}</option>)}
              </Sel>
            </F>
            <div className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg p-4">
              <div className="font-mono text-[10px] mb-2" style={{ color: 'var(--acid)' }}>JSON-LD Önizleme</div>
              <pre className="font-mono text-[10px] text-[var(--text-400)] overflow-auto leading-relaxed">{
                JSON.stringify({ '@context': 'https://schema.org', '@type': form.schema_type,
                  headline: form.seo_title || form.title, description: form.seo_description || form.excerpt,
                  author: { '@type': 'Person', name: form.author_name },
                  datePublished: new Date().toISOString().split('T')[0] }, null, 2)
              }</pre>
            </div>
          </>}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Panel ───────────────────────────────────────────
export function AdminPanel() {
  const PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [tab, setTab] = useState<Tab>('posts')
  const [posts, setPosts] = useState(() => postService.getAll())
  const [editing, setEditing] = useState<Post | null | false>(false)
  const [settings, setSettings] = useState(() => settingsService.get())
  const [saved, setSaved] = useState(false)

  const refresh = useCallback(() => setPosts(postService.getAll()), [])

  const savePost = (form: PostForm, id?: string) => {
    postService.save({ ...form, ...(id ? { id } : {}) })
    setEditing(false)
    refresh()
  }

  const saveSettings = () => {
    settingsService.set(settings)
    document.documentElement.style.setProperty('--acid', settings.accent_color)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--navy-900)]">
      <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-8 w-full max-w-sm">
        <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Admin Panel</div>
        <h1 className="font-display font-bold text-xl mb-6">Giriş</h1>
        <div className="flex flex-col gap-3">
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && pw === PASS && setAuthed(true)}
            placeholder="Admin şifresi"
            className="bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg px-4 py-3 font-mono text-sm text-[var(--text-200)] outline-none focus:border-[var(--acid-border)]" />
          <button onClick={() => pw === PASS ? setAuthed(true) : alert('Yanlış şifre')}
            className="py-3 rounded-lg font-bold text-sm tracking-wide transition-colors"
            style={{ background: 'var(--acid)', color: 'var(--navy-900)' }}>
            Giriş
          </button>
        </div>
      </div>
    </div>
  )

  const TABS = [
    { id: 'posts' as Tab, label: 'Blog Yazıları', icon: <FileText size={14} /> },
    { id: 'projects' as Tab, label: 'Projeler', icon: <Folder size={14} /> },
    { id: 'categories' as Tab, label: 'Kategoriler', icon: <Tag size={14} /> },
    { id: 'appearance' as Tab, label: 'Görünüm', icon: <Palette size={14} /> },
    { id: 'settings' as Tab, label: 'Ayarlar', icon: <Settings size={14} /> },
  ]

  return (
    <div className="min-h-screen flex bg-[var(--navy-900)]">
      {/* Sidebar */}
      <aside className="w-52 bg-[var(--navy-800)] border-r border-[var(--color-border)] flex flex-col shrink-0">
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--acid)' }}>// Admin</div>
          <div className="font-display font-bold text-sm">Merve Algan</div>
        </div>
        <nav className="flex-1 p-3">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={cn('w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all mb-1',
                tab === t.id ? 'bg-[var(--acid-dim)] border border-[var(--acid-border)]' : 'text-[var(--text-400)] hover:bg-[var(--navy-700)] hover:text-[var(--color-text)]')}
              style={tab === t.id ? { color: 'var(--acid)' } : {}}>
              {t.icon}{t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-[var(--color-border)]">
          <button onClick={() => setAuthed(false)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--text-400)] hover:text-[var(--color-error)] transition-all">
            <LogOut size={13} /> Çıkış
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {/* ── POSTS ── */}
        {tab === 'posts' && <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display font-bold text-xl">Blog Yazıları</h1>
            <button onClick={() => setEditing(null)}
              className="flex items-center gap-2 bg-[var(--acid)] text-[var(--navy-900)] px-4 py-2 rounded-lg font-bold text-sm">
              <Plus size={14} /> Yeni Yazı
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {posts.map(post => (
              <div key={post.id} className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-lg p-4 flex items-center gap-4 hover:border-[var(--color-border-interactive)] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--acid)' }}>{post.category}</span>
                    <span className={cn('font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider',
                      post.published ? 'bg-green-950/50 text-[var(--color-success)]' : 'bg-[var(--navy-700)] text-[var(--text-500)]')}>
                      {post.published ? 'Yayında' : 'Taslak'}
                    </span>
                    {post.featured && <span className="font-mono text-[9px]" style={{ color: 'var(--acid)' }}>★ Öne Çıkan</span>}
                  </div>
                  <div className="font-display font-semibold text-sm truncate">{post.title}</div>
                  <div className="font-mono text-[10px] text-[var(--text-500)] mt-0.5">/blog/{post.slug} · {post.read_time} dk</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { postService.togglePublish(post.id); refresh() }} className="p-1.5 text-[var(--text-400)] hover:text-[var(--color-text)] transition-colors" title="Yayın durumunu değiştir">
                    {post.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => setEditing(post)} className="p-1.5 text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => { postService.delete(post.id); refresh() }} className="p-1.5 text-[var(--text-400)] hover:text-[var(--color-error)] transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {posts.length === 0 && <p className="text-center py-16 text-[var(--text-500)] font-mono text-sm">İlk yazınızı oluşturun.</p>}
          </div>
        </>}

        {/* ── CATEGORIES ── */}
        {tab === 'categories' && <>
          <h1 className="font-display font-bold text-xl mb-6">Kategoriler</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATS.map(cat => {
              const count = posts.filter(p => p.category === cat).length
              return (
                <div key={cat} className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--acid-border)] transition-colors">
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--acid)' }}>{cat}</div>
                  <div className="font-display font-bold text-2xl">{count}</div>
                  <div className="font-mono text-[10px] text-[var(--text-500)]">yazı</div>
                </div>
              )
            })}
          </div>
        </>}

        {/* ── APPEARANCE ── */}
        {tab === 'appearance' && <>
          <h1 className="font-display font-bold text-xl mb-6">Görünüm</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5">
              <h2 className="font-display font-semibold text-sm mb-4">Accent Rengi</h2>
              <div className="flex items-center gap-3">
                <input type="color" value={settings.accent_color}
                  onChange={e => { setSettings(s => ({ ...s, accent_color: e.target.value })); document.documentElement.style.setProperty('--acid', e.target.value) }}
                  className="w-12 h-10 rounded border border-[var(--color-border)] cursor-pointer bg-transparent" />
                <input value={settings.accent_color}
                  onChange={e => { setSettings(s => ({ ...s, accent_color: e.target.value })); if (/^#[0-9A-F]{6}$/i.test(e.target.value)) document.documentElement.style.setProperty('--acid', e.target.value) }}
                  className="font-mono text-sm bg-[var(--navy-900)] border border-[var(--color-border)] px-3 py-2 rounded flex-1 text-[var(--text-200)] outline-none focus:border-[var(--acid-border)]" />
              </div>
              <p className="font-mono text-[10px] text-[var(--text-500)] mt-2">Varsayılan: #d4fe08</p>
            </div>
            <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5">
              <h2 className="font-display font-semibold text-sm mb-4">Chatbot Entegrasyonu</h2>
              <F label="Provider">
                <Sel value={settings.chatbot_provider} onChange={v => setSettings(s => ({ ...s, chatbot_provider: v as typeof DEFAULT_SETTINGS.chatbot_provider }))}>
                  <option value="none">Placeholder (Aktif)</option>
                  <option value="anthropic">Anthropic Claude</option>
                  <option value="openai">OpenAI GPT</option>
                  <option value="gemini">Google Gemini</option>
                </Sel>
              </F>
              {settings.chatbot_provider !== 'none' && (
                <div className="mt-3">
                  <F label="API Key">
                    <Inp value={settings.chatbot_api_key} onChange={v => setSettings(s => ({ ...s, chatbot_api_key: v }))} type="password" placeholder="sk-..." />
                  </F>
                </div>
              )}
            </div>
          </div>
          <button onClick={saveSettings} className="mt-5 flex items-center gap-2 bg-[var(--acid)] text-[var(--navy-900)] px-4 py-2 rounded-lg font-bold text-sm">
            <Save size={13} /> {saved ? 'Kaydedildi ✓' : 'Kaydet'}
          </button>
        </>}

        {/* ── SETTINGS ── */}
        {tab === 'settings' && <>
          <h1 className="font-display font-bold text-xl mb-6">Site Ayarları</h1>
          <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-4 max-w-xl">
            <F label="Site Başlığı"><Inp value={settings.site_title} onChange={v => setSettings(s => ({ ...s, site_title: v }))} /></F>
            <F label="Meta Description"><TA value={settings.site_description} onChange={v => setSettings(s => ({ ...s, site_description: v }))} rows={3} /></F>
            <F label="LinkedIn URL"><Inp value={settings.linkedin_url} onChange={v => setSettings(s => ({ ...s, linkedin_url: v }))} /></F>
            <F label="CV URL"><Inp value={settings.cv_url} onChange={v => setSettings(s => ({ ...s, cv_url: v }))} placeholder="https://..." /></F>
            <F label="E-posta"><Inp value={settings.email} onChange={v => setSettings(s => ({ ...s, email: v }))} type="email" /></F>
            <button onClick={saveSettings} className="self-start flex items-center gap-2 bg-[var(--acid)] text-[var(--navy-900)] px-4 py-2 rounded-lg font-bold text-sm">
              <Save size={13} /> {saved ? 'Kaydedildi ✓' : 'Kaydet'}
            </button>
          </div>
        </>}

        {tab === 'projects' && <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display font-bold text-xl">Projeler</h1>
          </div>
          <div className="flex flex-col gap-2">
            {projectService.getAll().map(p => (
              <div key={p.id} className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-lg p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--acid)' }}>{p.sector}</div>
                  <div className="font-display font-semibold text-sm">{p.title}</div>
                </div>
                <span className={cn('font-mono text-[9px] px-1.5 py-0.5 rounded uppercase', p.published ? 'bg-green-950/50 text-[var(--color-success)]' : 'bg-[var(--navy-700)] text-[var(--text-500)]')}>
                  {p.published ? 'Yayında' : 'Taslak'}
                </span>
              </div>
            ))}
          </div>
        </>}
      </main>

      <AnimatePresence>
        {editing !== false && <PostEditor post={editing} onSave={savePost} onClose={() => setEditing(false)} />}
      </AnimatePresence>
    </div>
  )
}
