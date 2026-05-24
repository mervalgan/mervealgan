import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/config/site'
import { useUIStore } from '@/store'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { setCommandPaletteOpen } = useUIStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#060910]/90 backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14"
        aria-label="Ana navigasyon"
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-sm font-medium text-[var(--color-text)] hover:text-[var(--acid)] transition-colors flex items-center gap-1.5"
          aria-label="Merve Algan - Ana Sayfa"
        >
          <span className="text-[var(--acid)]">~/</span>
          <span>mervealgan</span>
          <span className="cursor-blink inline-block w-1.5 h-3.5 bg-[var(--acid)] ml-0.5" aria-hidden="true" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-0 font-mono text-xs" role="list">
          {SITE_CONFIG.nav.map((item, i) => (
            <li key={item.href}>
              {i > 0 && <span className="text-[var(--text-500)] select-none px-1">/</span>}
              <Link
                to={item.href}
                className={cn(
                  'px-3 py-1.5 transition-colors tracking-wide uppercase',
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'text-[var(--acid)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-1.5 font-mono text-xs text-[var(--text-500)] border border-[var(--color-border)] px-2 py-1 rounded hover:border-[var(--acid)] hover:text-[var(--acid)] transition-all"
            aria-label="Komut paletini aç (Ctrl+K)"
          >
            <Terminal size={11} />
            <span>⌘K</span>
          </button>

          <Link
            to="/iletisim"
            className="hidden md:flex items-center gap-1.5 bg-[var(--acid)] text-[var(--navy-900)] px-3 py-1.5 rounded font-bold text-xs tracking-wide uppercase hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            <Mail size={11} />
            İletişim
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[var(--navy-800)] border-t border-[var(--color-border)] overflow-hidden"
          >
            <ul className="px-4 py-4 flex flex-col gap-1" role="list">
              {SITE_CONFIG.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      'block font-mono text-sm px-3 py-2 rounded transition-colors tracking-wide',
                      pathname === item.href
                        ? 'text-[var(--acid)] bg-[var(--acid-dim)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--navy-700)]'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-[var(--color-border)]">
                <Link
                  to="/iletisim"
                  className="block text-center bg-[var(--acid)] text-[var(--navy-900)] px-3 py-2 rounded font-bold text-sm tracking-wide"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
