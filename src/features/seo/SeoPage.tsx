import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { postService } from '@/services/content'
import { SEOHead } from '@/components/seo/SEOHead'

const f = { initial:{ opacity:0, y:16 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true } }

export function SeoPage() {
  const posts = postService.getByCategory('SEO')
    .concat(postService.getByCategory('Technical SEO'))
    .concat(postService.getByCategory('Content Strategy'))
    .slice(0, 6)

  return (
    <>
      <SEOHead title="SEO — Teknik SEO, İçerik Stratejisi ve Organik Büyüme"
        description="SEO stratejisi, teknik SEO, içerik mimarisi ve organik büyüme hakkında yazılar ve kaynaklar."
        canonical="/seo"
        breadcrumbs={[{name:'Ana Sayfa',url:'/'},{name:'SEO',url:'/seo'}]}/>
      <main id="main-content" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...f} className="mb-14">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{color:'var(--acid)'}}>// SEO</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">SEO Kaynakları</h1>
          <p className="text-[var(--text-300)] max-w-xl text-sm leading-relaxed">Teknik SEO, içerik mimarisi, organik büyüme ve SEO proje yönetimi üzerine içerikler.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)] mb-12">
          {[['Technical SEO','/blog?cat=Technical SEO'],['Content Strategy','/blog?cat=Content Strategy'],['SEO Araçları','/araclar'],['Case Notes','/blog?cat=Case Notes']].map(([l,h])=>(
            <Link key={l} to={h} className="group bg-[var(--navy-900)] p-5 hover:bg-[var(--navy-800)] transition-colors text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-1 group-hover:text-[var(--acid)] transition-colors" style={{color:'var(--text-500)'}}>{l}</div>
            </Link>
          ))}
        </div>
        {posts.length > 0 && (
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display font-bold text-2xl">Son Yazılar</h2>
              <Link to="/blog" className="font-mono text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">Tümü →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((p,i)=>(
                <motion.div key={p.id} {...f} transition={{delay:i*0.05}}>
                  <Link to={`/blog/${p.slug}`} className="group block bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--acid-border)] transition-all h-full">
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-2 font-semibold" style={{color:'var(--acid)'}}>{p.category}</div>
                    <h3 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-[var(--acid)] transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-[var(--text-400)] line-clamp-2 mb-3">{p.excerpt}</p>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-500)]">
                      {p.read_time} dk <ArrowUpRight size={10} className="ml-auto group-hover:text-[var(--acid)] transition-colors"/>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
