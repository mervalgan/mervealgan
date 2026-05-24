import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { projectService } from '@/services/content'
import { SEOHead } from '@/components/seo/SEOHead'

const f = { initial:{ opacity:0, y:16 }, animate:{ opacity:1, y:0 } }

export function ProjectDetail() {
  const { slug } = useParams<{slug:string}>()
  const project = useMemo(()=>projectService.getBySlug(slug??''),[slug])

  if (!project) return (
    <div className="pt-24 max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-[var(--text-400)] font-mono mb-4">Proje bulunamadı.</p>
      <Link to="/calismalar" className="font-mono text-sm hover:underline" style={{color:'var(--acid)'}}>← Çalışmalara Dön</Link>
    </div>
  )

  const schema = {
    '@context':'https://schema.org','@type':'CreativeWork',
    name:project.title, description:project.description,
    author:{'@type':'Person',name:'Merve Algan'},
    url:`https://mervealgan.com/calismalar/${project.slug}`,
  }

  return (
    <>
      <SEOHead title={`${project.title} — Case Study`} description={project.description}
        canonical={`/calismalar/${project.slug}`} schema={schema}
        breadcrumbs={[{name:'Ana Sayfa',url:'/'},{name:'Çalışmalar',url:'/calismalar'},{name:project.title,url:`/calismalar/${project.slug}`}]}/>
      <main id="main-content" className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-500)] mb-8">
            <Link to="/" className="hover:text-[var(--acid)] transition-colors">Ana Sayfa</Link>
            <ChevronRight size={10}/>
            <Link to="/calismalar" className="hover:text-[var(--acid)] transition-colors">Çalışmalar</Link>
            <ChevronRight size={10}/>
            <span className="text-[var(--text-400)]">{project.title}</span>
          </nav>

          <motion.div {...f} className="mb-10">
            <div className="inline-block font-mono text-[9px] font-bold uppercase px-2 py-1 rounded border mb-4"
              style={{background:'var(--acid-dim)',borderColor:'var(--acid-border)',color:'var(--acid)'}}>{project.sector}</div>
            <h1 className="font-display font-black text-4xl mb-3">{project.title}</h1>
            <div className="font-mono text-[11px] text-[var(--text-500)] mb-6">{project.role}</div>
            <div className="bg-[var(--navy-800)] border-l-2 pl-5 py-3 rounded-r-lg mb-8" style={{borderColor:'var(--acid)'}}>
              <div className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{color:'var(--acid)'}}>Özet</div>
              <p className="text-sm text-[var(--text-200)] leading-relaxed">{project.description}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 mb-10">
            {[
              {label:'Problem / Bağlam', content:project.challenge},
              {label:'Yaklaşım', content:project.approach},
              {label:'Sonuçlar', content:project.results},
            ].map(({label,content})=>(
              <div key={label} className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-6">
                <h2 className="font-mono text-[10px] uppercase tracking-widest mb-4 font-semibold" style={{color:'var(--acid)'}}>{label}</h2>
                <p className="text-sm text-[var(--text-300)] leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-6 mb-10">
            <h2 className="font-mono text-[10px] uppercase tracking-widest mb-4 font-semibold" style={{color:'var(--acid)'}}>Kullanılan Araçlar</h2>
            <div className="flex flex-wrap gap-2">
              {project.tools.map(t=>(
                <span key={t} className="font-mono text-xs border border-[var(--color-border)] text-[var(--text-300)] px-3 py-1.5 rounded">{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-[var(--navy-700)] border border-[var(--color-border)] rounded-xl p-5 mb-10">
            <p className="font-mono text-[10px] text-[var(--text-500)] leading-relaxed">
              <span style={{color:'var(--acid)'}}>Gizlilik Notu:</span> Bu çalışma gerçek proje deneyiminden derlenmiştir. Gizlilik nedeniyle bazı metrikler, ekran görüntüleri veya marka detayları özetlenmiştir.
            </p>
          </div>

          <Link to="/calismalar" className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">
            <ArrowLeft size={12}/> Tüm Çalışmalar
          </Link>
        </div>
      </main>
    </>
  )
}
