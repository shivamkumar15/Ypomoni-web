'use client'

import { useEffect, useRef, useState } from 'react'
import { setAnimeStyles } from '@/lib/anime'
import { MapPinned, MessageCircleWarning, Siren } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  title: string
  copy: string
  detail: string
}

const steps: Step[] = [
  {
    icon: Siren,
    title: 'Hold the SOS button',
    copy: 'Press and hold for 3 seconds to confirm you need help. The deliberate action prevents accidental alerts.',
    detail: 'A progress ring fills as you hold — release too early and nothing fires. Hold to the end and help is on its way.',
  },
  {
    icon: MessageCircleWarning,
    title: 'Contacts receive the alert',
    copy: 'Your trusted emergency contacts are instantly notified with your active safety status and live position.',
    detail: 'Notifications are designed to be direct, readable, and impossible to miss when every second matters.',
  },
  {
    icon: MapPinned,
    title: 'Live Map takes over',
    copy: 'The app switches to a route-focused map with distance, ETA, alternative routes, and a Google Maps handoff.',
    detail: 'Contacts follow your movement in real time. Evidence capture begins silently in the background.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const travel = Math.max(el.offsetHeight - window.innerHeight, 1)
      const p = Math.min(Math.max(-rect.top / travel, 0), 1)
      setAnimeStyles(progressRef.current, { transform: `scaleY(${p})` })
      const idx = Math.min(Math.floor(p * steps.length), steps.length - 1)
      setActive(idx)
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
    <section ref={sectionRef} id="how-it-works" className="relative h-[320vh] w-full bg-ink">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/4 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#be185d]/8 blur-[140px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/30 to-transparent" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
          {/* Left sticky intro */}
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ff3f68]">SOS sequence</p>
            <h2 className="mt-5 font-display text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl">
              Three steps from panic to action.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/50">
              The entire experience is designed for clarity, speed, and trust in the moment the user needs support.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="relative h-2 w-40 overflow-hidden rounded-full bg-white/8">
                <div ref={progressRef} className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-[#be185d] to-[#ff3f68] shadow-[0_0_12px_rgba(255,63,104,0.5)]" />
              </div>
              <span className="font-display text-sm font-bold tabular-nums text-white/50">{String(active + 1).padStart(2, '0')} / 0{steps.length}</span>
            </div>
          </div>

          {/* Right steps */}
          <div className="relative grid gap-5">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = i === active
              const isPast = i < active
              return (
                <div
                  key={step.title}
                  className={`relative overflow-hidden rounded-3xl border p-7 transition-all duration-700 ${
                    isActive
                      ? 'border-[#ff3f68]/30 bg-[#ff3f68]/[0.05] scale-100 opacity-100 shadow-[0_8px_40px_-12px_rgba(255,63,104,0.2)]'
                      : isPast
                      ? 'border-white/5 bg-white/[0.015] opacity-35'
                      : 'border-white/5 bg-white/[0.015] opacity-30'
                  }`}
                >
                  {isActive && (
                    <>
                      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#ff3f68]/12 blur-[60px]" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/50 to-transparent" />
                    </>
                  )}
                  <div className="relative flex items-start gap-5">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${isActive ? 'bg-[#ff3f68] text-black shadow-[0_0_30px_-6px_rgba(255,63,104,0.7)]' : 'bg-white/[0.05] text-white/40'}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`font-display text-sm font-bold tabular-nums transition-colors duration-500 ${isActive ? 'text-[#ff3f68]' : 'text-white/30'}`}>0{i + 1}</span>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-white">{step.title}</h3>
                      </div>
                      <p className="mt-3 leading-7 text-white/55">{step.copy}</p>
                      <div className={`grid transition-all duration-500 ${isActive ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="rounded-2xl border border-white/8 bg-black/30 p-4 text-sm leading-6 text-white/45">
                            {step.detail}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
