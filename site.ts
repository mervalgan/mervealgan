export const SITE_CONFIG = {
  name: 'Merve Algan',
  title: 'Merve Algan — SEO & GEO Manager',
  description: 'Teknik SEO, içerik mimarisi ve AI görünürlüğü odaklı organik büyüme çalışmaları yürüten SEO & GEO Manager.',
  url: 'https://mervealgan.com',
  locale: 'tr_TR',
  author: {
    name: 'Merve Algan',
    role: 'SEO & GEO Manager',
    location: 'İzmir, Türkiye',
    email: 'merve@mervealgan.com',
    linkedin: 'https://linkedin.com/in/mervealgan',
  },
  nav: [
    { label: 'Hakkımda', href: '/hakkimda' },
    { label: 'SEO', href: '/seo' },
    { label: 'GEO', href: '/geo-calismalari' },
    { label: 'Çalışmalar', href: '/calismalar' },
    { label: 'Blog', href: '/blog' },
    { label: 'Araçlar', href: '/araclar' },
  ],
  navCta: { label: 'İletişim', href: '/iletisim' },
  schema: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Merve Algan',
      jobTitle: 'SEO & GEO Manager',
      url: 'https://mervealgan.com',
      sameAs: ['https://linkedin.com/in/mervealgan'],
      knowsAbout: ['SEO', 'GEO', 'Technical SEO', 'Content Architecture', 'AI Visibility'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'İzmir',
        addressCountry: 'TR',
      },
    },
  },
} as const
schema: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Merve Algan',
      jobTitle: 'SEO & GEO Manager',
      url: 'https://mervealgan.com',
    },
  },
