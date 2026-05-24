import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-[var(--navy-800)] border-t border-[var(--color-border)] mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-display font-black text-2xl mb-1">
              MERVE <span style={{ color: 'var(--acid)' }}>ALGAN</span>
            </div>
            <div className="font-mono text-[10px] text-[var(--text-500)] uppercase tracking-widest mb-3">SEO &amp; GEO Manager</div>
            <p className="text-xs text-[var(--text-400)] leading-relaxed max-w-xs">
              Teknik SEO, içerik mimarisi ve AI görünürlüğü odaklı organik büyüme çalışmaları yürütür.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[10px] text-[var(--text-500)] uppercase tracking-widest mb-4">Navigasyon</h3>
            <ul className="flex flex-col gap-2">
              {SITE_CONFIG.nav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[10px] text-[var(--text-500)] uppercase tracking-widest mb-4">Bağlantı</h3>
            <ul className="flex flex-col gap-2">
              <li><a href={SITE_CONFIG.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">LinkedIn</a></li>
              <li><a href={`mailto:${SITE_CONFIG.author.email}`} className="text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">E-posta</a></li>
              <li><Link to="/iletisim" className="text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">İletişim Formu</Link></li>
            </ul>
            <h3 className="font-mono text-[10px] text-[var(--text-500)] uppercase tracking-widest mb-4 mt-6">Projeler</h3>
            <ul className="flex flex-col gap-2">
              <li><Link to="/calismalar/vepara" className="text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">Vepara Case Study</Link></li>
              <li><Link to="/calismalar/prismind-media" className="text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">Prismind Media</Link></li>
              <li><Link to="/calismalar/heypilot" className="text-xs text-[var(--text-400)] hover:text-[var(--acid)] transition-colors">HeyPilot</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-[var(--text-500)]">© 2025 Merve Algan · mervealgan.com</span>
          <span className="font-mono text-[10px] text-[var(--text-500)]">SEO &amp; GEO Manager · İzmir, Türkiye</span>
        </div>
      </div>
    </footer>
  )
}
