'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const HeroScene = dynamic(() => import('@/components/three/HeroScene').then((m) => m.HeroScene), { ssr: false })

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const travel = Math.max(el.offsetHeight - window.innerHeight, 1)
      const p = Math.min(Math.max(-rect.top / travel, 0), 1)
      scrollRef.current = p

      if (contentRef.current) {
        const fade = 1 - Math.min(p / 0.55, 1)
        const lift = p * 80
        contentRef.current.style.opacity = String(fade)
        contentRef.current.style.transform = `translateY(${-lift}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(1 - p * 3, 0))
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section ref={sectionRef} id="top" className="relative h-[125vh] w-full overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff3f68]/8 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      <HeroScene scrollRef={scrollRef} />

      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div ref={contentRef} className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center will-change-transform">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-sm font-medium text-white/80">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3f68] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3f68] shadow-[0_0_8px_rgba(255,63,104,0.8)]" />
            </span>
            Personal safety, reimagined
          </div>

          <h1 className="font-display text-balance text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Hold SOS.
            <br />
            <span className="text-gradient-flare">Send help instantly.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/60 md:text-xl md:leading-9">
            Ypomoni alerts your trusted contacts, shares your live location, and quietly collects evidence — all from one deliberate 3-second hold. Built for the moments that matter most.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#how-it-works"
              className="btn-primary group inline-flex items-center justify-center gap-2 rounded-full bg-[#ff3f68] px-7 py-4 text-sm font-semibold text-black shadow-[0_0_40px_-8px_rgba(255,63,104,0.7)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#ff5a7f] hover:shadow-[0_0_50px_-6px_rgba(255,63,104,0.9)]"
            >
              See how it works
              <ChevronDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-full glass px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
            >
              Get the app
            </a>
          </div>

          <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-3">
            {[
              ['3s', 'Hold to confirm'],
              ['Live', 'Location shared'],
              ['24/7', 'Always ready'],
            ].map(([metric, label]) => (
              <div key={metric} className="group relative overflow-hidden rounded-2xl glass px-4 py-5 text-center transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="font-display text-3xl font-bold tracking-tight text-white">{metric}</p>
                <p className="mt-1 text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em]">Scroll</span>
          <div className="relative h-9 w-5 rounded-full border border-white/15">
            <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ff3f68]" style={{ animation: 'scroll-hint 1.8s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
