// Run: npx ts-node src/utils/generateSitemap.ts
// Or call from build script
const SITE_URL = 'https://mervealgan.com'

const STATIC_ROUTES = [
  { url: '/',                changefreq: 'weekly',  priority: '1.0' },
  { url: '/hakkimda',       changefreq: 'monthly', priority: '0.9' },
  { url: '/seo',            changefreq: 'weekly',  priority: '0.8' },
  { url: '/geo-calismalari',changefreq: 'weekly',  priority: '0.9' },
  { url: '/calismalar',     changefreq: 'monthly', priority: '0.8' },
  { url: '/blog',           changefreq: 'daily',   priority: '0.8' },
  { url: '/araclar',        changefreq: 'monthly', priority: '0.7' },
  { url: '/iletisim',       changefreq: 'yearly',  priority: '0.6' },
  { url: '/calismalar/vepara',      changefreq: 'monthly', priority: '0.8' },
  { url: '/calismalar/prismind-media', changefreq: 'monthly', priority: '0.8' },
  { url: '/calismalar/heypilot',    changefreq: 'monthly', priority: '0.7' },
]

export function buildSitemap(blogSlugs: string[] = []): string {
  const now = new Date().toISOString().split('T')[0]
  const blogRoutes = blogSlugs.map(slug => ({
    url: `/blog/${slug}`, changefreq: 'monthly', priority: '0.7'
  }))
  const all = [...STATIC_ROUTES, ...blogRoutes]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(r => `  <url>
    <loc>${SITE_URL}${r.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}
