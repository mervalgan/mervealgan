import { SEOHead } from '@/components/seo/SEOHead'
import { HeroSection } from './HeroSection'
import { MarqueeTicker } from './MarqueeTicker'
import { ExpertiseSection } from './ExpertiseSection'
import { CasesSection } from './CasesSection'

export function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Merve Algan — SEO & GEO Manager',
    url: 'https://mervealgan.com',
    mainEntity: {
      '@type': 'Person',
      name: 'Merve Algan',
      jobTitle: 'SEO & GEO Manager',
      url: 'https://mervealgan.com',
    },
  }

  return (
    <>
      <SEOHead
        description="Teknik SEO, içerik mimarisi ve AI görünürlüğü odaklı SEO & GEO Manager. İzmir merkezli, multi-brand SEO yönetimi."
        canonical="/"
        schema={schema}
      />
      <main id="main-content">
        <HeroSection />
        <MarqueeTicker />
        <ExpertiseSection />
        <CasesSection />
      </main>
    </>
  )
}
