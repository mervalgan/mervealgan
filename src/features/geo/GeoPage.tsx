import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEOHead } from '@/components/seo/SEOHead'
import { postService } from '@/services/content'
import { ArrowUpRight } from 'lucide-react'

const f = { initial:{ opacity:0, y:16 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true } }

const GEO_STEPS = [
  { step:'01', title:'Kullanıcı niyeti analizi', desc:'Arama davranışını ve AI sorgularını analiz ederim.' },
  { step:'02', title:'Answer-first içerik yapısı', desc:'Her içerik soruya doğrudan yanıt verecek şekilde kurgulanır.' },
  { step:'03', title:'Schema & structured data', desc:'FAQPage, HowTo, Article — AI motorlarının anlayacağı sinyaller.' },
  { step:'04', title:'LLM trafik takibi', desc:'ChatGPT, Perplexity ve Bing AI kaynaklı trafiği GA4 + GSC ile izlerim.' },
  { step:'05', title:'Citation analizi & optimizasyon', desc:'AI alıntılarını ölçer, zayıf noktaları güçlendiririm.' },
]

const geoSchema = {
  '@context':'https://schema.org','@type':'WebPage',
  name:'GEO Çalışmaları — Merve Algan',
  description:'Generative Engine Optimization (GEO) yaklaşımı, AI görünürlüğü stratejileri ve LLM trafik takibi.',
  url:'https://mervealgan.com/geo-calismalari',
  author:{'@type':'Person',name:'Merve Algan'},
}

export function GeoPage() {
  const geoPosts = postService.getByCategory('GEO').concat(postService.getByCategory('AI Visibility')).slice(0,3)

  return (
    <>
      <SEOHead title="GEO Çalışmaları — AI Görünürlüğü & Generative Engine Optimization"
        description="GEO (Generative Engine Optimization) yaklaşımı: LLM trafik takibi, answer-first içerik, schema ve AI citation analizi."
        canonical="/geo-calismalari" schema={geoSchema}
        breadcrumbs={[{name:'Ana Sayfa',url:'/'},{name:'GEO Çalışmaları',url:'/geo-calismalari'}]}/>
      <main id="main-content" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div {...f} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{color:'var(--acid)'}}>// GEO</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl mb-6">
            Generative Engine<br/><span style={{color:'var(--acid)'}}>Optimization</span>
          </h1>
          <div className="max-w-2xl">
            <div className="border-l-2 pl-4 py-2 mb-6 text-sm text-[var(--text-200)] leading-relaxed" style={{borderColor:'var(--acid)'}}>
              <div className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{color:'var(--acid)'}}>GEO Nedir?</div>
              GEO, içeriklerinizin ChatGPT, Perplexity, Google AI Overview ve benzeri yapay zeka motorlarında görünür, alıntılanabilir ve önerilen içerik haline gelmesini sağlayan optimizasyon yaklaşımıdır.
            </div>
            <p className="text-[var(--text-400)] leading-relaxed text-sm">
              Klasik SEO, sayfanın arama sonuçlarında görünmesini hedefler. GEO ise yapay zekanın o sayfayı okuyup yanıtına dahil etmesini hedefler. İkisi birbirini destekler ama gereksinimleri farklıdır.
            </p>
          </div>
        </motion.div>

        <motion.div {...f} transition={{delay:0.1}} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{color:'var(--acid)'}}>// Süreç</p>
          <h2 className="font-display font-bold text-2xl mb-8">GEO Çalışma Sistemi</h2>
          <div className="flex flex-col gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
            {GEO_STEPS.map((s,i) => (
              <motion.div key={s.step} {...f} transition={{delay:i*0.07}}
                className="bg-[var(--navy-900)] p-5 flex gap-5 items-start hover:bg-[var(--navy-800)] transition-colors group">
                <div className="font-mono text-xs font-semibold shrink-0 w-8 pt-0.5 group-hover:text-[var(--acid)] transition-colors" style={{color:'var(--text-500)'}}>{s.step}</div>
                <div>
                  <div className="font-display font-bold text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-[var(--text-400)]">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...f} transition={{delay:0.15}} className="mb-16">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{color:'var(--acid)'}}>// Metrikler</p>
          <h2 className="font-display font-bold text-2xl mb-6">GEO Performans Göstergeleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {label:'AI Citation Rate', val:'4/10', sub:'Vepara · sorgu başına'},
              {label:'LLM Traffic Growth', val:'+34%', sub:'MoM artış'},
              {label:'Schema Coverage', val:'97%', sub:'Audit sonucu'},
            ].map(m=>(
              <div key={m.label} className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5 text-center hover:border-[var(--acid-border)] transition-colors">
                <div className="font-display font-black text-3xl mb-1" style={{color:'var(--acid)'}}>{m.val}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-400)] mb-1">{m.label}</div>
                <div className="font-mono text-[9px] text-[var(--text-500)]">{m.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {geoPosts.length > 0 && (
          <motion.div {...f} transition={{delay:0.2}} className="mb-16">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display font-bold text-2xl">GEO İçerikleri</h2>
              <Link to="/blog" className="font-mono text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">Tümü →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {geoPosts.map(p=>(
                <Link key={p.id} to={`/blog/${p.slug}`}
                  className="group bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--acid-border)] transition-all">
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{color:'var(--acid)'}}>{p.category}</div>
                  <div className="font-display font-bold text-sm leading-snug group-hover:text-[var(--acid)] transition-colors line-clamp-2">{p.title}</div>
                  <div className="flex items-center gap-1 mt-3 font-mono text-[10px] text-[var(--text-500)]">
                    {p.read_time} dk <ArrowUpRight size={10} className="ml-auto group-hover:text-[var(--acid)] transition-colors"/>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div {...f} transition={{delay:0.2}} className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-8">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{color:'var(--acid)'}}>// GEO Danışmanlığı</div>
          <h2 className="font-display font-bold text-xl mb-3">Sitenizin AI görünürlüğünü analiz edelim</h2>
          <p className="text-sm text-[var(--text-400)] mb-6 max-w-lg">Schema audit, LLM trafik takibi kurulumu ve answer-first içerik stratejisi için iletişime geçin.</p>
          <Link to="/iletisim" className="inline-flex items-center gap-2 bg-[var(--acid)] text-[var(--navy-900)] px-5 py-2.5 rounded font-bold text-sm hover:opacity-90 transition-all">
            İletişime Geç
          </Link>
        </motion.div>
      </main>
    </>
  )
}
