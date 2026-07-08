'use client'

import { Reveal } from '@/components/Reveal'
import SocialFlipButton from '@/components/SocialFlipButton'
import { ShieldCheck, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export function CTA() {
  return (
    <section id="download" className="relative w-full overflow-hidden bg-ink py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff3f68]/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-[#ff3f68]/15 bg-gradient-to-br from-[#1a0a12] via-ink-card to-ink p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-15" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3f68]/40 to-transparent" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ff3f68] text-black shadow-[0_0_50px_-8px_rgba(255,63,104,0.7)]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="font-display text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl">
              Your safety deserves
              <br />
              <span className="text-gradient-flare">more than a panic button.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/55">
              Download Ypomoni and set up your trusted contacts in under two minutes. Hope you never need it — but if you do, it&apos;s ready.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#" className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.3)] sm:w-auto">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
                  <path d="M17.05 12.04c-.03-2.62 2.14-3.87 2.24-3.93-1.22-1.79-3.13-2.04-3.81-2.07-1.62-.16-3.17.95-3.99.95-.83 0-2.09-.93-3.44-.9-1.77.03-3.41 1.03-4.32 2.62-1.85 3.2-.47 7.92 1.32 10.52.88 1.27 1.93 2.69 3.3 2.64 1.33-.05 1.83-.86 3.44-.86 1.6 0 2.06.86 3.46.83 1.43-.02 2.34-1.29 3.21-2.57 1.01-1.47 1.43-2.9 1.45-2.97-.03-.01-2.78-1.07-2.81-4.25zM14.5 4.4c.73-.89 1.22-2.12 1.09-3.34-1.05.04-2.32.7-3.07 1.58-.68.78-1.27 2.03-1.11 3.23 1.17.09 2.37-.6 3.09-1.47z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-50">Download on the</p>
                  <p className="-mt-0.5 font-display text-lg font-bold">App Store</p>
                </div>
              </a>
              <a href="#" className="group flex w-full items-center justify-center gap-3 rounded-2xl glass px-6 py-4 text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white/8 sm:w-auto">
                <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                  <path fill="#34A853" d="M3.6 22l9.9-9.9-9.9-9.9c-.3.3-.5.7-.5 1.2v17.4c0 .5.2.9.5 1.2z"/>
                  <path fill="#FBBC04" d="M17.3 14.3l-2.8-2.8 2.8-2.8 3.4 1.9c.7.4.7 1.4 0 1.8l-3.4 1.9z"/>
                  <path fill="#EA4335" d="M13.5 12.1L3.6 2.2c.3-.3.7-.4 1.2-.2l12.5 7.1-3.8 3z"/>
                  <path fill="#4285F4" d="M13.5 11.9l3.8 3-12.5 7.1c-.5.3-.9.1-1.2-.2l9.9-9.9z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Get it on</p>
                  <p className="-mt-0.5 font-display text-lg font-bold">Google Play</p>
                </div>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/40">
              <span>Free to download</span>
              <span className="hidden sm:inline">·</span>
              <span>No ads, ever</span>
              <span className="hidden sm:inline">·</span>
              <span>End-to-end encrypted</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <footer id="contacts" className="mx-auto mt-24 max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="grid gap-10 border-t border-white/8 pt-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Ypomoni" width={36} height={36} className="h-9 w-9 object-contain" />
              <span className="font-display text-lg font-semibold tracking-tight text-white">YPOMONI</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/40">
              Personal safety, reimagined. Hold SOS, alert your circle, share your location, and capture evidence — automatically.
            </p>
          </div>

          {[
            { title: 'Product', links: ['Features', 'How it works', 'Evidence', 'Live Map'] },
            { title: 'Company', links: ['About', 'Privacy', 'Security', 'Contact'] },
            { title: 'Legal', links: ['Terms', 'Privacy Policy', 'Cookie Policy'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-white/70">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="group inline-flex items-center gap-1 text-sm text-white/40 transition hover:text-white/80">
                      {link}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 py-8 sm:flex-row">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Ypomoni. All rights reserved.</p>
          <SocialFlipButton />
          <p className="text-xs text-white/30">Designed for the moments that matter.</p>
        </div>
      </footer>
    </section>
  )
}
