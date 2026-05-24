import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '@/config/site'

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  schema?: Record<string, unknown> | Record<string, unknown>[]
  breadcrumbs?: Array<{ name: string; url: string }>
  type?: 'website' | 'article'
  article?: { published: string; modified: string; author: string; category: string }
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  schema,
  breadcrumbs,
  type = 'website',
  article,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.title
  const desc = description || SITE_CONFIG.description
  const url = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url
  const image = ogImage || `${SITE_CONFIG.url}/og-default.jpg`

  const schemas: Record<string, unknown>[] = [
    SITE_CONFIG.schema.person as Record<string, unknown>,
  ]

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_CONFIG.url}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
  schemas.push(websiteSchema)

  if (breadcrumbs) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((bc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: bc.name,
        item: `${SITE_CONFIG.url}${bc.url}`,
      })),
    })
  }

  if (schema) {
    const schemaArr = Array.isArray(schema) ? schema : [schema]
    schemas.push(...schemaArr)
  }

  if (type === 'article' && article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: fullTitle,
      description: desc,
      url,
      image,
      datePublished: article.published,
      dateModified: article.modified,
      author: {
        '@type': 'Person',
        name: article.author,
        url: `${SITE_CONFIG.url}/hakkimda`,
      },
      publisher: {
        '@type': 'Person',
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.url,
      },
    })
  }

  return (
    <Helmet>
      <html lang="tr" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* Article specific */}
      {type === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.published} />
          <meta property="article:modified_time" content={article.modified} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.category} />
        </>
      )}

      {/* Schema.org JSON-LD */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}
