import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export function MainLayout() {
  const { pathname } = useLocation()

  // Focus management for accessibility after route change
  useEffect(() => {
    const main = document.getElementById('main-content') || document.querySelector('h1')
    main?.focus()
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] bg-[var(--acid)] text-[var(--navy-900)] px-4 py-2 rounded font-bold text-sm"
      >
        Ana içeriğe geç
      </a>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
