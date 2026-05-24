import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projectService } from '@/services/content'
import { SEOHead } from '@/components/seo/SEOHead'

const f = { initial:{ opacity:0, y:16 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true } }

export function ProjectsPage() {
  const projects = projectService.getPublished()
  return (
    <>
      <SEOHead title="Çalışmalar — Case Studies"
        description="Teknik SEO, GEO ve içerik mimarisi alanlarındaki proje deneyimleri."
        canonical="/calismalar"
        breadcrumbs={[{name:'Ana Sayfa',url:'/'},{name:'Çalışmalar',url:'/calismalar'}]}
        schema={{'@context':'https://schema.org','@type':'ItemList',
          itemListElement:projects.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.title,url:`https://mervealgan.com/calismalar/${p.slug}`}))}} />
      <main id="main-content" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...f} className="mb-14">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{color:'var(--acid)'}}>// Çalışmalar</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">Case Studies</h1>
          <p className="text-[var(--text-300)] max-w-xl text-sm leading-relaxed">Gerçek proje deneyimlerinden derlenen çalışmalar. Gizlilik nedeniyle bazı metrikler özetlenmiştir.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {projects.map((p,i) => (
            <motion.div key={p.id} {...f} transition={{delay:i*0.08}}>
              <Link to={`/calismalar/${p.slug}`}
                className="group block bg-[var(--navy-900)] p-7 hover:bg-[var(--navy-700)] transition-all relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--acid)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                <div className="font-mono text-[10px] text-[var(--text-500)] mb-4">CASE_{String(i+1).padStart(3,'0')}</div>
                <div className="inline-block font-mono text-[9px] font-bold uppercase px-2 py-1 rounded border mb-3"
                  style={{background:'var(--acid-dim)',borderColor:'var(--acid-border)',color:'var(--acid)'}}>{p.sector}</div>
                <h2 className="font-display font-bold text-xl mb-2 group-hover:text-[var(--acid)] transition-colors">{p.title}</h2>
                <p className="text-xs text-[var(--text-400)] leading-relaxed mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(tag=><span key={tag} className="font-mono text-[9px] border border-[var(--navy-300)] text-[var(--text-500)] px-2 py-0.5 rounded">{tag}</span>)}
                </div>
                <ArrowUpRight size={16} className="absolute top-6 right-6 text-[var(--text-500)] group-hover:text-[var(--acid)] transition-all"/>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  )
}
