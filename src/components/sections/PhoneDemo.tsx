'use client'

import { useEffect, useRef, useState } from 'react'
import { anime, animeValue, setAnimeStyles } from '@/lib/anime'
import { Reveal } from '@/components/Reveal'
import { BellRing, Camera, ChevronRight, Circle, Compass, Footprints, Home, MapPin, Plus, ShieldCheck, SlidersHorizontal, UsersRound } from 'lucide-react'

type AppScreen = 'home' | 'map' | 'profile'
type SosMode = 'idle' | 'holding' | 'sent'

export function PhoneDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const homeScreenRef = useRef<HTMLDivElement>(null)
  const mapScreenRef = useRef<HTMLDivElement>(null)
  const profileScreenRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const routeFlowRef = useRef<SVGPathElement>(null)
  const routeDashRef = useRef<SVGPathElement>(null)
  const targetPulseRef = useRef<HTMLDivElement>(null)
  const holdTimerRef = useRef<number | null>(null)
  const holdAnimationRef = useRef<{ cancel: () => void } | null>(null)

  const [activeScreen, setActiveScreen] = useState<AppScreen>('home')
  const [sosMode, setSosMode] = useState<SosMode>('idle')
  const [hasContact, setHasContact] = useState(false)
  const [holdText, setHoldText] = useState('Hold to activate')

  const startSosHold = () => {
    if (sosMode === 'sent') return
    setSosMode('holding')
    holdAnimationRef.current?.cancel()
    setAnimeStyles(ringRef.current, { strokeDashoffset: 251 })
    holdAnimationRef.current = animeValue({
      from: 0,
      to: 2000,
      duration: 2000,
      easing: 'linear',
      update: (value) => {
        setAnimeStyles(ringRef.current, { strokeDashoffset: 251 - (value / 2000) * 251 })
        setHoldText(`${(value / 1000).toFixed(1)}s / 2.0s`)
      },
    })
    holdTimerRef.current = window.setTimeout(() => setSosMode('sent'), 2000)
  }

  const cancelSosHold = () => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    holdAnimationRef.current?.cancel()
    anime({ targets: ringRef.current, strokeDashoffset: [Number(ringRef.current?.style.strokeDashoffset) || 251, 251], duration: 220 })
    setHoldText('Hold to activate')
    setSosMode((m) => (m === 'holding' ? 'idle' : m))
  }

  const resetAlert = () => {
    cancelSosHold()
    setSosMode('idle')
  }

  useEffect(() => {
    const routeFlow = anime({ targets: routeFlowRef.current, strokeDashoffset: [60, 0], duration: 1500, easing: 'linear', loop: true })
    const routeDash = anime({ targets: routeDashRef.current, strokeDashoffset: [30, 0], duration: 1500, easing: 'linear', loop: true })
    const targetPulse = anime({ targets: targetPulseRef.current, scale: [0.86, 1.18], opacity: [0.8, 0.35], duration: 1250, easing: 'easeInOutSine', loop: true, direction: 'alternate' })
    return () => {
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current)
      holdAnimationRef.current?.cancel()
      routeFlow.cancel()
      routeDash.cancel()
      targetPulse.cancel()
    }
  }, [])

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el || !phoneRef.current) return
      const rect = el.getBoundingClientRect()
      const travel = Math.max(el.offsetHeight, 1)
      const p = Math.min(Math.max(-rect.top / travel, 0), 1)
      const inView = rect.top < window.innerHeight * 0.8
      if (inView) {
        const tilt = (p - 0.5) * 10
        setAnimeStyles(phoneRef.current, {
          transform: `rotateY(${tilt}deg) rotateX(${(0.5 - p) * 4}deg)`,
        })
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const screen = activeScreen === 'home' ? homeScreenRef.current : activeScreen === 'map' ? mapScreenRef.current : profileScreenRef.current
    anime({ targets: screen, opacity: [0, 1], translateX: activeScreen === 'home' ? [-22, 0] : [24, 0], scale: [0.98, 1], duration: 620, easing: 'easeOutExpo' })
  }, [activeScreen])

  return (
    <section ref={sectionRef} id="demo" className="relative w-full overflow-hidden bg-ink py-28 md:py-36">
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#be185d]/10 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-[1fr_0.85fr] lg:px-12">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ff3f68]">Try it yourself</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-white md:text-6xl">
              The whole safety flow,
              <br />
              <span className="text-gradient-flare">in your hand.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/60">
              Press and hold the SOS button to feel the deliberate 3-second confirmation. Switch between Home, Live Map, and Profile to explore every screen — it&apos;s fully interactive.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 grid gap-3">
              {[
                { n: '01', t: 'Hold SOS for 3 seconds', d: 'A deliberate press prevents false alarms while staying fast.' },
                { n: '02', t: 'Contacts get notified instantly', d: 'Your trusted circle receives the alert with your live status.' },
                { n: '03', t: 'Live Map takes over', d: 'Route, ETA, and Google Maps handoff for fast response.' },
              ].map((s) => (
                <div key={s.n} className="flex gap-4 rounded-2xl glass p-5">
                  <span className="font-display text-2xl font-bold text-[#ff3f68]/80">{s.n}</span>
                  <div>
                    <p className="font-semibold text-white">{s.t}</p>
                    <p className="mt-1 text-sm leading-6 text-white/55">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative flex items-start justify-center pt-4 [perspective:1600px]">
          <div
            ref={phoneRef}
            className="relative h-[660px] w-[320px] rounded-[3.4rem] border-[10px] border-neutral-950 bg-neutral-950 shadow-[0_40px_120px_rgba(0,0,0,0.6)] [transform-style:preserve-3d] will-change-transform md:h-[720px] md:w-[342px]"
          >
            <div className="absolute inset-x-0 top-0 z-30 flex justify-center">
              <div className="h-7 w-36 rounded-b-3xl bg-neutral-950" />
            </div>

            <div className="relative h-full overflow-hidden rounded-[2.7rem] bg-neutral-950">
              <div className="absolute inset-0 bg-black" />

              {/* HOME SCREEN */}
              <div ref={homeScreenRef} className={`${activeScreen === 'home' ? 'flex' : 'hidden'} absolute inset-0 flex-col px-5 pt-12 pb-4 text-white`}>
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                  <h3 className="font-display text-3xl font-bold tracking-tight">Home</h3>
                  <BellRing className="h-7 w-7 text-white" />
                </div>

                {sosMode === 'sent' ? (
                  <div className="rounded-[1.8rem] bg-[#ff3f68] px-4 py-4 text-white shadow-[0_28px_90px_rgba(244,63,94,0.28)]">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15">
                      <ShieldCheck className="h-6 w-6 fill-white" />
                    </div>
                    <h4 className="mt-3 text-center text-xl font-black tracking-tight">Emergency alert sent</h4>
                    <p className="mx-auto mt-2 max-w-[14rem] text-center text-xs leading-4 text-white/80">
                      Stay calm. Emergency mode is active and your SOS flow is running.
                    </p>
                    <div className="mt-4 rounded-[1.5rem] bg-white px-4 py-4 text-center text-neutral-700">
                      <p className="text-xs font-bold">Emergency mode is active</p>
                      <p className="mt-2 font-display text-3xl font-black tracking-widest text-[#ff3f68]">LIVE</p>
                      <p className="mt-1 text-[11px] font-bold text-neutral-500">help mode in progress</p>
                      <button onClick={resetAlert} className="mt-4 w-full rounded-xl border border-pink-200 py-2.5 text-sm font-black text-[#ff3f68]" type="button">
                        Cancel Alert
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[1.8rem] border border-white/10 bg-[#141414] px-4 py-4 shadow-[0_28px_80px_rgba(219,39,119,0.16)]">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#ff3f68]/10 text-[#ff3f68]">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h4 className="mt-3 text-center text-xl font-bold tracking-tight">Emergency Alert</h4>
                    <p className="mx-auto mt-2 max-w-[13rem] text-center text-xs leading-4 text-white/55">
                      Press and hold to trigger an emergency alert instantly.
                    </p>

                    <div className="relative mx-auto mt-6 flex h-48 w-48 items-center justify-center">
                      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#2a1018" strokeWidth="5" />
                        <circle ref={ringRef} cx="50" cy="50" r="40" fill="none" stroke="#ff3f68" strokeWidth="5" strokeLinecap="round" strokeDasharray="251" style={{ strokeDashoffset: 251 }} />
                      </svg>
                      <button
                        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); startSosHold() }}
                        onPointerUp={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); cancelSosHold() }}
                        onPointerCancel={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); cancelSosHold() }}
                        onContextMenu={(e) => e.preventDefault()}
                        className="relative flex h-32 w-32 select-none touch-none flex-col items-center justify-center rounded-full bg-[#ff3f68] text-white shadow-[0_0_40px_rgba(255,63,104,0.3)] transition-transform active:scale-95"
                        type="button"
                      >
                        <BellRing className="h-8 w-8 fill-white" />
                        <span className="mt-2 font-display text-base font-black tracking-widest">ALERT</span>
                      </button>
                    </div>
                    <p className="mt-3 text-center text-xs font-bold text-[#ff3f68]">{holdText}</p>
                  </div>
                )}

                {sosMode === 'sent' ? (
                  <button onClick={() => setActiveScreen('map')} className="mt-4 -mx-5 bg-red-500 px-5 py-4 text-left text-sm font-semibold leading-5 text-black" type="button">
                    Help is on the way. SOS sent to {hasContact ? '2' : '0'} contacts in-app. Tap to open Live Map.
                  </button>
                ) : null}

                <PhoneNav active={activeScreen} onNavigate={setActiveScreen} />
              </div>

              {/* MAP SCREEN */}
              <div ref={mapScreenRef} className={`${activeScreen === 'map' ? 'flex' : 'hidden'} absolute inset-0 flex-col px-5 pt-12 pb-4 text-white`}>
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                  <h3 className="font-display text-3xl font-bold tracking-tight">Live Map</h3>
                  <BellRing className="h-7 w-7 text-white" />
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-[#101010] p-3 shadow-[0_28px_80px_rgba(219,39,119,0.16)]">
                  <div className="mb-3 flex items-center gap-2 px-1">
                    <MapPin className="h-5 w-5 text-pink-500" />
                    <h4 className="font-display text-lg font-bold tracking-tight">Live map tracking</h4>
                  </div>
                  <div className="relative h-[400px] overflow-hidden rounded-[1.5rem] bg-[#ece9e1]">
                    <div className="absolute left-8 top-24 h-[3px] w-72 rotate-[30deg] bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.05)]" />
                    <div className="absolute -left-8 top-56 h-8 w-[28rem] rotate-[8deg] bg-[#eff5b9] shadow-[0_0_0_1px_rgba(0,0,0,0.07)]" />
                    <div className="absolute left-2 top-72 h-[3px] w-72 -rotate-[18deg] bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.05)]" />
                    <div className="absolute right-3 top-8 h-[3px] w-64 -rotate-[50deg] bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.05)]" />
                    <div className="absolute right-16 top-36 h-24 w-16 rounded-sm bg-green-200/90 text-[9px] font-bold leading-3 text-green-950/60">
                      <span className="absolute left-2 top-8">Gandhi<br />Maidan</span>
                    </div>
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 400" fill="none" aria-hidden="true">
                      <path d="M101 320 C128 260 135 190 148 110" stroke="#ff3f68" strokeWidth="12" strokeLinecap="round" opacity="0.2" />
                      <path d="M101 320 C128 260 135 190 148 110" stroke="#ff3f68" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
                      <path ref={routeFlowRef} d="M101 320 C128 260 135 190 148 110" stroke="#ff3f68" strokeWidth="6" strokeLinecap="round" strokeDasharray="20 40" />
                      <path ref={routeDashRef} d="M101 320 C128 260 135 190 148 110" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 26" />
                    </svg>
                    <div className="absolute left-[108px] top-[70px] flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-950/25">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="absolute left-[128px] top-[90px] h-10 w-10 -translate-x-1/2 -translate-y-1/2">
                      <div ref={targetPulseRef} className="h-full w-full rounded-full border-[4px] border-[#ff3f68] bg-[#ff3f68]/10 shadow-[0_0_0_8px_rgba(255,63,104,0.15)]" />
                    </div>
                    <div className="absolute left-[101px] top-[320px] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-white bg-[#ff3f68] shadow-lg" />
                    <div className="absolute bottom-3 right-3 z-10 rounded-xl bg-neutral-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                      Walk: 0.5 km &nbsp; ETA: 5 min
                    </div>
                    <div className="absolute left-3 top-3 z-10">
                      <div className="rounded-xl bg-neutral-900 px-3 py-2 text-left text-white shadow-lg ring-2 ring-[#ff3f68]">
                        <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#ff3f68]">Current Route</div>
                        <span className="mt-0.5 block font-display text-sm font-black leading-none text-[#ff3f68]">5 min</span>
                      </div>
                    </div>
                  </div>
                  {sosMode === 'sent' ? (
                    <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-black text-white animate-pulse" type="button">
                      <Footprints className="h-4 w-4" />
                      Contact Dispatcher
                    </button>
                  ) : (
                    <button onClick={() => setActiveScreen('profile')} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff3f68] px-4 py-2.5 text-xs font-black text-black transition-transform hover:scale-[0.98]" type="button">
                      <Footprints className="h-4 w-4" />
                      Show Route in Google Maps
                    </button>
                  )}
                  <div className="mt-4 flex flex-col items-center">
                    <div className="h-1.5 w-20 rounded-full bg-[#ff3f68]" />
                    <p className="mt-1.5 text-[10px] text-white/50">Downloading road network…</p>
                  </div>
                </div>
                <PhoneNav active={activeScreen} onNavigate={setActiveScreen} />
              </div>

              {/* PROFILE SCREEN */}
              <div ref={profileScreenRef} className={`${activeScreen === 'profile' ? 'flex' : 'hidden'} absolute inset-0 flex-col px-5 pt-12 pb-4 text-white`}>
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-display text-3xl font-bold tracking-tight">Profile</h3>
                  <BellRing className="h-7 w-7 text-white" />
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-[#151515] p-4 shadow-[0_28px_80px_rgba(219,39,119,0.14)]">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-pink-950/60 font-display text-3xl font-black text-pink-500">
                      BC
                      <span className="absolute -right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-pink-600 text-white">
                        <Camera className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-2xl font-black leading-tight tracking-tight">Burning CODM</h4>
                      <p className="mt-2 text-sm font-bold text-pink-500">@burningcodm</p>
                      <p className="mt-1 max-w-[10rem] truncate text-sm text-white/55">fbixpro15@gmail.com</p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-white/75">
                        <UsersRound className="h-4 w-4" />
                        {hasContact ? '2 contacts' : '0 contacts'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-[2rem] border border-white/10 bg-[#101010] p-4">
                  <h4 className="font-display text-xl font-bold tracking-tight">Your Contacts</h4>
                  <button onClick={() => setHasContact(true)} className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-pink-600 px-5 py-4 text-lg font-black text-black" type="button">
                    <Plus className="h-6 w-6" />
                    Add contact
                  </button>
                  {hasContact ? (
                    <div className="mt-4 space-y-2">
                      {['Mom', 'Brother'].map((name) => (
                        <div key={name} className="flex items-center justify-between rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-950/70 font-display text-sm font-black text-pink-400">{name[0]}</div>
                            <div>
                              <p className="text-sm font-bold">{name}</p>
                              <p className="text-xs text-white/45">SOS contact</p>
                            </div>
                          </div>
                          <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5 text-base text-white/55">No primary contacts saved yet.</p>
                  )}
                </div>
                <PhoneNav active={activeScreen} onNavigate={setActiveScreen} />
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-6 hidden flex-col gap-2 lg:flex">
            {[
              { k: 'home', label: 'Home' },
              { k: 'map', label: 'Map' },
              { k: 'profile', label: 'Profile' },
            ].map((s) => (
              <button
                key={s.k}
                onClick={() => setActiveScreen(s.k as AppScreen)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${activeScreen === s.k ? 'bg-[#ff3f68] text-black' : 'glass text-white/60 hover:text-white'}`}
                type="button"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneNav({ active, onNavigate }: { active: AppScreen; onNavigate: (screen: AppScreen) => void }) {
  return (
    <div className="relative mt-auto h-[5rem] -mx-1">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 300 70">
        <path
          d={
            active === 'home'
              ? 'M 0 35 C 0 20 10 15 20 15 L 25 15 C 38 15 45 32 60 32 C 75 32 82 15 95 15 L 280 15 C 290 15 300 20 300 35 L 300 70 L 0 70 Z'
              : active === 'map'
              ? 'M 0 35 C 0 20 10 15 20 15 L 100 15 C 113 15 120 32 135 32 C 150 32 157 15 170 15 L 280 15 C 290 15 300 20 300 35 L 300 70 L 0 70 Z'
              : 'M 0 35 C 0 20 10 15 20 15 L 175 15 C 188 15 195 32 210 32 C 225 32 232 15 245 15 L 280 15 C 290 15 300 20 300 35 L 300 70 L 0 70 Z'
          }
          fill="#111111"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="relative flex h-full items-end justify-around px-2 pb-4 text-white/55">
        <button type="button" onClick={() => onNavigate('home')} className={`relative flex w-16 justify-center transition-colors duration-300 ${active === 'home' ? 'text-[#ff3f68]' : 'hover:text-white'}`}>
          <Home className="h-7 w-7" />
          <NavDot visible={active === 'home'} />
        </button>
        <button type="button" onClick={() => onNavigate('map')} className={`relative flex w-16 justify-center transition-colors duration-300 ${active === 'map' ? 'text-[#ff3f68]' : 'hover:text-white'}`}>
          <Compass className="h-7 w-7" />
          <NavDot visible={active === 'map'} />
        </button>
        <button type="button" onClick={() => onNavigate('profile')} className={`relative flex w-16 justify-center transition-colors duration-300 ${active === 'profile' ? 'text-[#ff3f68]' : 'hover:text-white'}`}>
          <Circle className="h-7 w-7" />
          <NavDot visible={active === 'profile'} />
        </button>
        <button type="button" onClick={() => onNavigate('profile')} className="flex w-16 justify-center transition hover:text-white">
          <SlidersHorizontal className="h-7 w-7" />
        </button>
      </div>
    </div>
  )
}

function NavDot({ visible }: { visible: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    anime({
      targets: dotRef.current,
      opacity: visible ? [0, 1] : [1, 0],
      scale: visible ? [0.5, 1] : [1, 0.5],
      translateY: visible ? [10, 0] : [0, 10],
      duration: 360,
      easing: visible ? 'easeOutBack' : 'easeOutExpo',
    })
  }, [visible])
  return <div ref={dotRef} className="absolute -top-7 h-3.5 w-3.5 rounded-full bg-[#ff3f68] opacity-0 shadow-[0_0_15px_rgba(255,63,104,0.8)]" />
}
