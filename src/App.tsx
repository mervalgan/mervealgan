import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'
import { MainLayout } from '@/layouts/MainLayout'

const HomePage     = lazy(() => import('@/features/home').then(m => ({ default: m.HomePage })))
const AboutPage    = lazy(() => import('@/features/about/AboutPage').then(m => ({ default: m.AboutPage })))
const SeoPage      = lazy(() => import('@/features/seo/SeoPage').then(m => ({ default: m.SeoPage })))
const GeoPage      = lazy(() => import('@/features/geo/GeoPage').then(m => ({ default: m.GeoPage })))
const ProjectsPage = lazy(() => import('@/features/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const ProjectDetail= lazy(() => import('@/features/projects/ProjectDetail').then(m => ({ default: m.ProjectDetail })))
const BlogList     = lazy(() => import('@/features/blog/BlogList').then(m => ({ default: m.BlogList })))
const BlogDetail   = lazy(() => import('@/features/blog/BlogDetail').then(m => ({ default: m.BlogDetail })))
const ToolsPage    = lazy(() => import('@/features/tools/ToolsPage').then(m => ({ default: m.ToolsPage })))
const ContactPage  = lazy(() => import('@/features/contact/ContactPage').then(m => ({ default: m.ContactPage })))
const AdminPanel   = lazy(() => import('@/features/admin/AdminPanel').then(m => ({ default: m.AdminPanel })))

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--navy-900)]">
      <div className="font-mono text-xs text-[var(--text-500)] flex items-center gap-2">
        <span className="cursor-blink inline-block w-2 h-3.5" style={{ background: 'var(--acid)' }} />
        Yükleniyor…
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--acid)' }}>// 404</div>
        <h1 className="font-display font-black text-6xl mb-4">NOT <span style={{ color: 'var(--acid)' }}>FOUND</span></h1>
        <p className="text-[var(--text-400)] mb-8 text-sm">Bu sayfa bulunamadı.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          {[['/', 'Ana Sayfa'], ['/blog', 'Blog'], ['/calismalar', 'Çalışmalar'], ['/iletisim', 'İletişim'], ['/araclar', 'Araçlar']].map(([href, label]) => (
            <a key={href} href={href} className="font-mono text-xs border border-[var(--color-border)] text-[var(--text-400)] px-3 py-2 rounded hover:border-[var(--acid-border)] hover:text-[var(--acid)] transition-all">{label}</a>
          ))}
        </div>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route element={<MainLayout />}>
              <Route path="/"                      element={<HomePage />} />
              <Route path="/hakkimda"              element={<AboutPage />} />
              <Route path="/seo"                   element={<SeoPage />} />
              <Route path="/geo-calismalari"       element={<GeoPage />} />
              <Route path="/calismalar"            element={<ProjectsPage />} />
              <Route path="/calismalar/:slug"      element={<ProjectDetail />} />
              <Route path="/blog"                  element={<BlogList />} />
              <Route path="/blog/:slug"            element={<BlogDetail />} />
              <Route path="/araclar"               element={<ToolsPage />} />
              <Route path="/iletisim"              element={<ContactPage />} />
              <Route path="*"                      element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
