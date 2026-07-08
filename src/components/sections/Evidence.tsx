'use client'

import { useEffect, useRef } from 'react'
import { setAnimeStyles } from '@/lib/anime'
import { Reveal } from '@/components/Reveal'
import { AudioLines, Camera, Clock, FileLock2, Mic, ShieldCheck, Video } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface EvidenceItem {
  icon: LucideIcon
  label: string
  time: string
  tint: string
}

const items: EvidenceItem[] = [
  { icon: Camera, label: 'Photo captured', time: '00:00.4', tint: 'from-rose-500/30 to-pink-600/10' },
  { icon: Mic, label: 'Audio recording started', time: '00:01.2', tint: 'from-fuchsia-500/30 to-purple-600/10' },
  { icon: Video, label: 'Video fragment saved', time: '00:03.8', tint: 'from-pink-500/30 to-rose-600/10' },
  { icon: AudioLines, label: 'Ambient audio spike', time: '00:06.1', tint: 'from-red-500/30 to-pink-600/10' },
  { icon: Camera, label: 'Photo captured', time: '00:09.5', tint: 'from-rose-500/30 to-pink-600/10' },
]

const guarantees = [
  { icon: Clock, title: 'Timestamped', desc: 'Every capture is stamped to the millisecond for an indisputable timeline.' },
  { icon: FileLock2, title: 'Encrypted vault', desc: 'Evidence is encrypted at rest and only accessible to you and your contacts.' },
  { icon: ShieldCheck, title: 'Tamper-proof', desc: 'A cryptographic chain links each capture so nothing can be altered retroactively.' },
]

export function Evidence() {
  const recRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = recRef.current
      if (!el || !barRef.current) return
      const rect = el.getBoundingClientRect()
      const start = window.innerHeight * 0.85
      const end = window.innerHeight * 0.15
      const p = Math.min(Math.max((start - rect.top) / (start - end), 0), 1)
      setAnimeStyles(barRef.current, { width: `${8 + p * 92}%` })
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="evidence" className="relative w-full overflow-hidden bg-ink-soft py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-25" />
      <div className="section-glow" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ff3f68]">Silent evidence</p>
          <h2 className="mt-5 font-display text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl">
            It captures everything.
            <br />
            <span className="text-gradient-flare">So you don&apos;t have to remember.</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/50">
            The moment emergency mode begins, Ypomoni starts silently recording photos, audio, and video in the background — building a secure, timestamped record while you focus on staying safe.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Evidence vault mock */}
          <Reveal className="relative overflow-hidden rounded-3xl glass p-6 md:p-8" delay={80}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/30 to-transparent" />
            <div ref={recRef} className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-red-400">Recording</span>
              </div>
              <span className="font-display text-sm font-bold tabular-nums text-white/40">Emergency mode · 00:09.5</span>
            </div>

            <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div ref={barRef} className="h-full rounded-full bg-gradient-to-r from-[#be185d] to-[#ff3f68] shadow-[0_0_12px_rgba(255,63,104,0.4)]" style={{ width: '8%' }} />
            </div>

            <div className="grid gap-3">
              {items.map((item, i) => {
                const Icon = item.icon
                return (
                  <Reveal key={`${item.label}-${i}`} delay={i * 110} className={`flex items-center gap-4 rounded-2xl border border-white/8 bg-gradient-to-r ${item.tint} p-4 transition-all duration-300 hover:border-white/12`}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-[#ff3f68] ring-1 ring-white/5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-white/40">Captured automatically</p>
                    </div>
                    <span className="font-display text-sm font-bold tabular-nums text-white/55">{item.time}</span>
                  </Reveal>
                )
              })}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#ff3f68]/20 bg-[#ff3f68]/5 p-4">
              <div className="flex items-center gap-2.5">
                <FileLock2 className="h-5 w-5 text-[#ff3f68]" />
                <span className="text-sm font-semibold text-white">5 items · encrypted &amp; uploaded</span>
              </div>
              <span className="text-xs font-bold text-[#ff3f68]">Vault locked</span>
            </div>
          </Reveal>

          {/* Guarantees */}
          <div className="grid gap-4">
            {guarantees.map((g, i) => {
              const Icon = g.icon
              return (
                <Reveal key={g.title} delay={i * 100} className="group flex gap-5 rounded-3xl glass p-6 transition-all duration-500 hover:border-[#ff3f68]/25 hover:bg-white/[0.05]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-[#ff3f68] ring-1 ring-white/5 transition group-hover:scale-110 group-hover:ring-[#ff3f68]/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-white">{g.title}</h3>
                    <p className="mt-2 leading-7 text-white/50">{g.desc}</p>
                  </div>
                </Reveal>
              )
            })}

            <Reveal delay={300} className="relative overflow-hidden rounded-3xl border border-[#ff3f68]/25 bg-gradient-to-br from-[#ff3f68]/10 to-transparent p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/40 to-transparent" />
              <p className="font-display text-lg font-bold leading-7 text-white">
                Your record is your proof — built automatically, protected by design.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
