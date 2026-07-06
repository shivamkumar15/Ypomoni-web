'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Contacts', href: '#contacts' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 lg:px-12">
        <a
          href="#top"
          className={cn(
            'flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-500',
            scrolled ? 'glass' : ''
          )}
        >
          <Image src="/logo.svg" alt="Ypomoni" width={36} height={36} priority className="h-8 w-8 object-contain" />
          <span className="font-display text-base font-semibold tracking-tight text-white">YPOMONI</span>
        </a>

        <nav
          className={cn(
            'hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 md:flex',
            scrolled ? 'glass' : 'border border-white/5 bg-white/[0.02] backdrop-blur-md'
          )}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#download"
          className="group hidden items-center gap-2 rounded-full bg-[#ff3f68] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_-6px_rgba(255,63,104,0.6)] transition hover:scale-[1.03] hover:bg-[#ff5a7f] sm:inline-flex"
        >
          Get the app
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="glass flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={cn('h-0.5 w-5 bg-white transition-all', open && 'translate-y-2 rotate-45')} />
            <span className={cn('h-0.5 w-5 bg-white transition-all', open && 'opacity-0')} />
            <span className={cn('h-0.5 w-5 bg-white transition-all', open && '-translate-y-2 -rotate-45')} />
          </div>
        </button>
      </div>

      {open && (
        <div className="mx-6 mt-2 grid gap-1 rounded-2xl glass p-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="mt-1 rounded-xl bg-[#ff3f68] px-4 py-3 text-center text-sm font-semibold text-black">
            Get the app
          </a>
        </div>
      )}
    </header>
  )
}
