'use client'

import { Card } from '@/components/ui/card'
import { BellRing, ChevronRight, CircleGauge, Home, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function SplineSceneBasic() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const phoneRotateX = useTransform(scrollYProgress, [0, 1], [9, -7])
  const phoneRotateY = useTransform(scrollYProgress, [0, 1], [-13, 11])
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.25, 1])
  const sosProgress = useTransform(scrollYProgress, [0, 0.65], ['18%', '100%'])

  return (
    <Card ref={sectionRef} className="relative min-h-[125vh] w-full overflow-hidden rounded-none border-0 bg-[#fff8fb] shadow-none">
      <div className="absolute inset-0 bg-[#fff8fb]" />
      <motion.div style={{ scale: glowScale }} className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-200/25 blur-3xl" />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[8%] top-[30%] hidden h-28 w-28 rounded-[2rem] border border-pink-200 bg-white/50 shadow-xl shadow-pink-950/5 backdrop-blur md:block"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 22, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[9%] top-[22%] hidden h-36 w-36 rounded-full border border-neutral-200 bg-white/45 shadow-xl shadow-neutral-950/5 backdrop-blur md:block"
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-14 px-6 pt-32 pb-28 md:grid-cols-[0.95fr_1.05fr] md:px-10 lg:px-12">
        <div className="z-10 flex max-w-2xl flex-col items-start text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-pink-800 shadow-sm shadow-pink-900/5 backdrop-blur">
            <span className="flex h-2.5 w-2.5 rounded-full bg-pink-600 shadow-[0_0_0_5px_rgba(219,39,119,0.12)]" />
            3-second SOS protection for real emergencies
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-7xl">
            Hold SOS. Send help. Share your live location instantly.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-neutral-600 md:text-xl md:leading-9">
            Ypomoni is an advertisement-ready personal safety app concept built around one simple promise: press and hold SOS for 3 seconds, notify emergency contacts, and show your live location inside the mobile app.
          </p>

          <div className="mt-7 w-full max-w-md rounded-2xl border border-pink-100 bg-white/75 p-2 shadow-sm backdrop-blur">
            <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              <span>Scroll to charge SOS</span>
              <span>3 sec</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <motion.div style={{ width: sosProgress }} className="h-full rounded-full bg-pink-600" />
            </div>
          </div>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#how-it-works"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-neutral-950/15 transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              See how SOS works
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contacts"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200 hover:text-pink-700"
            >
              Emergency contacts
            </a>
          </div>

          <div className="mt-11 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ['3 sec', 'hold to prevent false alarms'],
              ['Live', 'location shown in-app'],
              ['24/7', 'contacts stay ready'],
            ].map(([metric, label]) => (
              <div key={metric} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm shadow-pink-950/5 ring-1 ring-neutral-200/70 backdrop-blur">
                <p className="text-2xl font-semibold tracking-tight text-neutral-950">{metric}</p>
                <p className="mt-1 text-sm leading-5 text-neutral-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[720px] w-full items-center justify-center [perspective:1400px]">
          <motion.div
            style={{ rotateX: phoneRotateX, rotateY: phoneRotateY, y: phoneY, transformStyle: 'preserve-3d' }}
            className="relative h-[630px] w-[314px] rounded-[3.4rem] border-[10px] border-neutral-950 bg-neutral-950 shadow-[0_35px_90px_rgba(17,24,39,0.28)] md:h-[690px] md:w-[342px]"
          >
            <div className="absolute inset-x-0 top-0 z-30 flex justify-center">
              <div className="h-7 w-36 rounded-b-3xl bg-neutral-950" />
            </div>

            <div className="relative h-full overflow-hidden rounded-[2.7rem] bg-neutral-950">
              <div className="absolute inset-0 bg-black" />
              <div className="relative flex h-full flex-col px-5 pt-12 pb-4 text-white">
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                  <h2 className="text-3xl font-bold tracking-tight">Home</h2>
                  <BellRing className="h-7 w-7 text-white" />
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#141414] px-5 py-8 shadow-[0_28px_80px_rgba(219,39,119,0.16)]">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-950/50 text-pink-400">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="mt-7 text-center text-3xl font-bold tracking-tight">Emergency Alert</h3>
                  <p className="mx-auto mt-4 max-w-[15rem] text-center text-sm leading-6 text-white/55">
                    Press and hold to trigger an emergency alert instantly.
                  </p>

                  <div className="relative mx-auto mt-11 flex h-56 w-56 items-center justify-center rounded-full bg-pink-950/30 shadow-[0_0_70px_rgba(219,39,119,0.26)]">
                    <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="absolute h-48 w-48 rounded-full border border-pink-500/20" />
                    <motion.span animate={{ scale: [1, 1.16, 1], opacity: [0.8, 0.35, 0.8] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute h-40 w-40 rounded-full border border-pink-500/30" />
                    <button className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full bg-pink-600 text-white shadow-[0_22px_70px_rgba(219,39,119,0.5)]" type="button">
                      <BellRing className="h-11 w-11" />
                      <span className="mt-3 text-xl font-black tracking-[0.22em]">ALERT</span>
                    </button>
                  </div>

                  <p className="mt-8 text-center text-base font-bold text-white/65">Release before 2 seconds to cancel</p>
                </div>

                <div className="mt-auto rounded-[2rem] border border-white/10 bg-[#111111] px-6 py-4 shadow-[0_0_45px_rgba(219,39,119,0.18)]">
                  <div className="grid grid-cols-4 items-center text-white/55">
                    <div className="relative flex justify-center text-pink-500">
                      <span className="absolute -top-7 h-4 w-4 rounded-full bg-pink-500 shadow-[0_0_28px_rgba(236,72,153,0.9)]" />
                      <Home className="h-8 w-8 fill-current" />
                    </div>
                    <div className="flex justify-center">
                      <CircleGauge className="h-7 w-7" />
                    </div>
                    <div className="flex justify-center">
                      <div className="h-9 w-9 rounded-full border-2 border-white/60 bg-pink-200" />
                    </div>
                    <div className="flex justify-center">
                      <SlidersHorizontal className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}
