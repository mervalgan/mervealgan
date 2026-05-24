import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, ExternalLink } from 'lucide-react'
import { SEOHead } from '@/components/seo/SEOHead'

const contactSchema = {
  '@context':'https://schema.org','@type':'ContactPage',
  name:'İletişim — Merve Algan',
  url:'https://mervealgan.com/iletisim',
}

export function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'', honeypot:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const set = (k: keyof typeof form, v: string) => setForm(p=>({...p,[k]:v}))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return // bot trap
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      // Netlify Forms submission
      await fetch('/', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          'form-name':'contact',
          ...Object.fromEntries(Object.entries(form).filter(([k])=>k!=='honeypot'))
        }).toString()
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inp = "w-full bg-[var(--navy-900)] border border-[var(--color-border)] rounded-lg px-4 py-3 font-mono text-sm text-[var(--text-200)] placeholder-[var(--text-500)] outline-none focus:border-[var(--acid-border)] transition-colors"
  const lbl = "font-mono text-[10px] text-[var(--text-400)] uppercase tracking-wider mb-1.5 block"

  return (
    <>
      <SEOHead title="İletişim" description="SEO audit, GEO strateji veya içerik mimarisi konularında danışmanlık için iletişime geçin."
        canonical="/iletisim" schema={contactSchema}
        breadcrumbs={[{name:'Ana Sayfa',url:'/'},{name:'İletişim',url:'/iletisim'}]}/>
      <main id="main-content" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="mb-14">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{color:'var(--acid)'}}>// İletişim</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">Birlikte<br/><span style={{color:'var(--acid)'}}>Çalışalım</span></h1>
          <p className="text-[var(--text-300)] max-w-lg text-sm leading-relaxed">SEO audit, GEO strateji, içerik mimarisi veya organik büyüme danışmanlığı için mesaj bırakabilirsiniz.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="lg:col-span-3">
            {status === 'sent' ? (
              <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-10 text-center">
                <CheckCircle size={40} className="mx-auto mb-4" style={{color:'var(--acid)'}}/>
                <h2 className="font-display font-bold text-xl mb-2">Mesajınız İletildi</h2>
                <p className="text-[var(--text-400)] text-sm">En kısa sürede geri dönüş yapacağım.</p>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}
                className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-4">
                <input type="hidden" name="form-name" value="contact"/>
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input name="honeypot" value={form.honeypot} onChange={e=>set('honeypot',e.target.value)} tabIndex={-1} autoComplete="off"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={lbl}>Ad Soyad *</label>
                    <input id="name" name="name" required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Adınız" className={inp}/>
                  </div>
                  <div>
                    <label htmlFor="email" className={lbl}>E-posta *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={e=>set('email',e.target.value)} placeholder="ornek@mail.com" className={inp}/>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={lbl}>Konu</label>
                  <select id="subject" name="subject" value={form.subject} onChange={e=>set('subject',e.target.value)} className={inp}>
                    <option value="">Konu seçin</option>
                    {['SEO Audit','GEO Strateji','İçerik Mimarisi','Teknik SEO','Genel Danışmanlık','Diğer'].map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={lbl}>Mesaj *</label>
                  <textarea id="message" name="message" required rows={5} value={form.message} onChange={e=>set('message',e.target.value)}
                    placeholder="Projeniz veya sorunuz hakkında bilgi verin…" className={`${inp} resize-y`}/>
                </div>
                <button type="submit" disabled={status==='sending'}
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-sm tracking-wide transition-all disabled:opacity-60"
                  style={{background:'var(--acid)',color:'var(--navy-900)'}}>
                  <Send size={14}/> {status==='sending' ? 'Gönderiliyor…' : 'Gönder'}
                </button>
                {status==='error' && <p className="font-mono text-xs text-[var(--color-error)] text-center">Bir hata oluştu. Lütfen e-posta ile ulaşın.</p>}
              </form>
            )}
          </motion.div>

          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.15}} className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5">
              <h2 className="font-display font-bold text-sm mb-4">Doğrudan İletişim</h2>
              {[
                {label:'E-posta', val:'merve@mervealgan.com', href:'mailto:merve@mervealgan.com'},
                {label:'LinkedIn', val:'linkedin.com/in/mervealgan', href:'https://linkedin.com/in/mervealgan'},
              ].map(({label,val,href})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0 hover:text-[var(--acid)] transition-colors group">
                  <div>
                    <div className="font-mono text-[10px] text-[var(--text-500)] uppercase tracking-wider">{label}</div>
                    <div className="text-sm font-medium mt-0.5">{val}</div>
                  </div>
                  <ExternalLink size={13} className="text-[var(--text-500)] group-hover:text-[var(--acid)] transition-colors"/>
                </a>
              ))}
            </div>
            <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5">
              <h2 className="font-display font-bold text-sm mb-3">Çalışma Alanları</h2>
              {['SEO Audit & Strateji','GEO & AI Görünürlüğü','Teknik SEO','İçerik Mimarisi','Organik Büyüme Danışmanlığı'].map(s=>(
                <div key={s} className="flex items-center gap-2 py-2 border-b border-[var(--color-border)] last:border-0 font-mono text-xs text-[var(--text-400)]">
                  <span style={{color:'var(--acid)'}}>›</span>{s}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
