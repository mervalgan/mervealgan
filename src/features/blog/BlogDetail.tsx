import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { Clock, Calendar, ChevronRight, ArrowLeft, Share2 } from 'lucide-react'
import { postService } from '@/services/content'
import { SEOHead } from '@/components/seo/SEOHead'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = useMemo(() => postService.getBySlug(slug ?? ''), [slug])
  const related = useMemo(() =>
    post ? postService.getByCategory(post.category).filter(p => p.slug !== slug).slice(0, 3) : [],
    [post, slug]
  )

  if (!post) return (
    <div className="pt-24 max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-[var(--text-400)] font-mono mb-4">Yazı bulunamadı.</p>
      <Link to="/blog" className="font-mono text-sm hover:underline" style={{ color: 'var(--acid)' }}>← Blog'a Dön</Link>
    </div>
  )

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{ '@type': 'Question', name: post.title,
      acceptedAnswer: { '@type': 'Answer', text: post.answer_first || post.excerpt } }],
  }

  return (
    <>
      <SEOHead
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={post.og_image}
        type="article"
        article={{ published: post.created_at, modified: post.updated_at, author: post.author_name, category: post.category }}
        schema={faqSchema}
        breadcrumbs={[{ name: 'Ana Sayfa', url: '/' }, { name: 'Blog', url: '/blog' }, { name: post.title, url: `/blog/${post.slug}` }]}
      />
      <main id="main-content" className="pt-24 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-500)] mb-8">
            {[['/', 'Ana Sayfa'], ['/blog', 'Blog']].map(([href, label]) => (
              <><Link key={href} to={href} className="hover:text-[var(--acid)] transition-colors">{label}</Link><ChevronRight size={10} /></>
            ))}
            <span className="text-[var(--text-400)] truncate">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-[11px] text-[var(--text-500)]">
            <span className="uppercase tracking-wider font-semibold" style={{ color: 'var(--acid)' }}>{post.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {post.read_time} dk okuma</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar size={10} /> {format(new Date(post.updated_at), 'd MMMM yyyy', { locale: tr })}</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="font-display font-black text-3xl sm:text-4xl leading-tight mb-6">{post.title}</motion.h1>

          {post.answer_first && (
            <div className="border-l-2 pl-4 py-2 mb-8 text-sm text-[var(--text-200)] leading-relaxed" style={{ borderColor: 'var(--acid)' }}>
              <div className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--acid)' }}>Kısa Yanıt</div>
              {post.answer_first}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map(tag => (
              <span key={tag} className="font-mono text-[10px] border border-[var(--color-border)] text-[var(--text-400)] px-2 py-0.5 rounded">#{tag}</span>
            ))}
          </div>

          <div className="prose prose-invert prose-sm max-w-none
            prose-headings:font-display prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-[var(--text-300)] prose-p:leading-relaxed
            prose-a:no-underline hover:prose-a:underline
            prose-code:font-mono prose-code:bg-[var(--navy-800)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-pre:bg-[var(--navy-800)] prose-pre:border prose-pre:border-[var(--color-border)] prose-pre:rounded-lg
            prose-blockquote:text-[var(--text-400)]
            prose-strong:text-[var(--color-text)]
            prose-li:text-[var(--text-300)]"
            style={{ '--tw-prose-links': 'var(--acid)', '--tw-prose-code': 'var(--acid)', '--tw-prose-blockquote-border': 'var(--acid)' } as React.CSSProperties}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          <div className="flex items-center gap-3 mt-12 pt-6 border-t border-[var(--color-border)]">
            <button onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
              className="flex items-center gap-2 font-mono text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors border border-[var(--color-border)] px-3 py-2 rounded hover:border-[var(--acid-border)]">
              <Share2 size={12} /> Paylaş
            </button>
            <Link to="/blog" className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors ml-auto">
              <ArrowLeft size={12} /> Tüm Yazılar
            </Link>
          </div>

          {/* Author box */}
          <div className="mt-10 bg-[var(--navy-800)] border border-[var(--color-border)] rounded-xl p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-base shrink-0"
              style={{ background: 'var(--acid)', color: 'var(--navy-900)' }}>M</div>
            <div>
              <div className="font-display font-bold text-sm mb-0.5">{post.author_name}</div>
              <div className="font-mono text-[10px] text-[var(--text-500)] mb-2 uppercase tracking-wider">{post.author_role}</div>
              <p className="text-xs text-[var(--text-400)] leading-relaxed">Teknik SEO, içerik mimarisi, AI görünürlüğü ve organik büyüme stratejileri üzerine çalışır.</p>
              <div className="flex gap-3 mt-2">
                <Link to="/hakkimda" className="font-mono text-[11px] hover:underline" style={{ color: 'var(--acid)' }}>Hakkımda</Link>
                <Link to="/calismalar" className="font-mono text-[11px] text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">Çalışmalar</Link>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16">
            <h2 className="font-display font-bold text-lg mb-5">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`}
                  className="bg-[var(--navy-800)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--acid-border)] transition-all group">
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--acid)' }}>{r.category}</div>
                  <div className="font-display font-bold text-sm leading-snug group-hover:text-[var(--acid)] transition-colors">{r.title}</div>
                  <div className="font-mono text-[10px] text-[var(--text-500)] mt-2">{r.read_time} dk</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
