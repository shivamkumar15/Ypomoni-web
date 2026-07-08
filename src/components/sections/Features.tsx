'use client'

import { Reveal } from '@/components/Reveal'
import { BellRing, Camera, Clock3, Eye, LocateFixed, Lock, MessageCircleWarning, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Tile {
  icon: LucideIcon
  title: string
  desc: string
  span: string
  accent: boolean
}

const tiles: Tile[] = [
  {
    icon: Clock3,
    title: '3-second SOS hold',
    desc: 'A deliberate press-and-hold prevents accidental alerts while staying fast when every second counts.',
    span: 'md:col-span-2 md:row-span-2',
    accent: true,
  },
  {
    icon: LocateFixed,
    title: 'Live location sharing',
    desc: 'Your trusted contacts see your real-time position, route, and ETA the moment SOS fires.',
    span: '',
    accent: false,
  },
  {
    icon: BellRing,
    title: 'Instant contact alerts',
    desc: 'Direct, readable, impossible-to-miss notifications reach your safety circle immediately.',
    span: '',
    accent: false,
  },
  {
    icon: Camera,
    title: 'Silent evidence capture',
    desc: 'Photos, audio, and video are quietly recorded and stored the moment emergency mode begins.',
    span: 'md:col-span-2',
    accent: false,
  },
  {
    icon: Lock,
    title: 'Privacy-first',
    desc: 'Your data stays yours. Location is only shared with the contacts you choose.',
    span: '',
    accent: false,
  },
  {
    icon: Eye,
    title: 'Background monitoring',
    desc: 'Ypomoni keeps watching even when your phone is locked — protection that never sleeps.',
    span: '',
    accent: false,
  },
]

export function Features() {
  return (
    <section id="features" className="relative w-full overflow-hidden bg-ink-soft py-28 md:py-36">
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#ff3f68]/40 to-transparent" />
      <div className="section-glow" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ff3f68]">Built for emergencies</p>
          <h2 className="mt-5 font-display text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl">
            A safety app people can understand under pressure.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/50">
            Every feature exists for one reason: to turn a moment of panic into a clear, fast, trustworthy response.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
          {tiles.map((tile, i) => {
            const Icon = tile.icon
            return (
              <Reveal
                key={tile.title}
                delay={i * 70}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:border-[#ff3f68]/30 hover:bg-white/[0.05] ${tile.span}`}
              >
                {tile.accent && (
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ff3f68]/12 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" />
                )}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 ${tile.accent ? 'bg-[#ff3f68] text-black shadow-[0_0_24px_-4px_rgba(255,63,104,0.5)]' : 'bg-white/[0.06] text-[#ff3f68] ring-1 ring-white/5'} group-hover:scale-110 group-hover:ring-[#ff3f68]/20`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="relative mt-auto pt-6">
                  <h3 className={`font-display font-bold tracking-tight text-white ${tile.accent ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{tile.title}</h3>
                  <p className="mt-3 leading-7 text-white/50">{tile.desc}</p>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-4">
          {[
            { icon: ShieldCheck, label: 'Trusted by early users' },
            { icon: MessageCircleWarning, label: 'Tested in real scenarios' },
            { icon: Eye, label: 'Always-on protection' },
          ].map((b) => {
            const Icon = b.icon
            return (
              <div key={b.label} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm text-white/65 transition-colors hover:text-white/85">
                <Icon className="h-4 w-4 text-[#ff3f68]" />
                {b.label}
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
