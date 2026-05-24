import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Calendar, ArrowUpRight } from 'lucide-react'
import { postService } from '@/services/content'
import { SEOHead } from '@/components/seo/SEOHead'
import type { BlogCategory } from '@/types'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

const CATS: (BlogCategory | 'Tümü')[] = ['Tümü', 'SEO', 'GEO', 'Technical SEO', 'Content Strategy', 'AI Visibility', 'Case Notes', 'Tools']

export function BlogList() {
  const [cat, setCat] = useState<BlogCategory | 'Tümü'>('Tümü')
  const allPosts = postService.getPublished()
  const posts = useMemo(() =>
    cat === 'Tümü' ? allPosts : allPosts.filter(p => p.category === cat),
    [cat, allPosts]
  )

  return (
    <>
      <SEOHead
        title="Blog — SEO, GEO & AI Görünürlüğü"
        description="Teknik SEO, GEO, içerik stratejisi ve AI görünürlüğü üzerine bilgi üretimi."
        canonical="/blog"
        breadcrumbs={[{ name: 'Ana Sayfa', url: '/' }, { name: 'Blog', url: '/blog' }]}
      />
      <main id="main-content" className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--acid)' }}>// Blog</p>
          <h1 className="font-display font-black text-4xl mb-4">Knowledge Hub</h1>
          <p className="text-[var(--text-300)] max-w-xl">SEO, GEO, Teknik SEO ve AI görünürlüğü üzerine içerik ve kaynaklar.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10" role="tablist">
          {CATS.map(c => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={cn('font-mono text-[11px] px-3 py-1.5 rounded border transition-all uppercase tracking-wider',
                cat === c
                  ? 'border-[var(--acid-border)] bg-[var(--acid-dim)]'
                  : 'border-[var(--color-border)] text-[var(--text-400)] hover:border-[var(--color-border-interactive)]'
              )}
              style={cat === c ? { color: 'var(--acid)' } : {}}
            >{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/blog/${post.slug}`}
                className="group block bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--acid-border)] hover:-translate-y-0.5 transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--acid)' }}>
                    {post.category}
                  </span>
                  {post.featured && <span style={{ color: 'var(--acid)' }}>★</span>}
                </div>
                <h2 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-[var(--acid)] transition-colors line-clamp-2">{post.title}</h2>
                {post.answer_first && (
                  <p className="font-mono text-[10px] text-[var(--text-400)] border-l-2 pl-2 mb-3 line-clamp-2 leading-relaxed"
                    style={{ borderColor: 'var(--acid-border)' }}>{post.answer_first}</p>
                )}
                <p className="text-xs text-[var(--text-400)] leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 font-mono text-[10px] text-[var(--text-500)]">
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.read_time} dk</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {format(new Date(post.updated_at), 'MMM yyyy', { locale: tr })}
                  </span>
                  <ArrowUpRight size={10} className="ml-auto group-hover:text-[var(--acid)] transition-colors" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center py-20 text-[var(--text-400)] font-mono text-sm">Bu kategoride henüz yazı bulunmuyor.</p>
        )}
      </main>
    </>
  )
}
