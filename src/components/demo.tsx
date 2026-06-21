'use client'

import { Card } from '@/components/ui/card'
import { Check, ChevronRight, Clock3, MapPin, Phone, Plus, ShieldCheck, Siren, UsersRound } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const contacts = [
  { name: 'Maya', role: 'Sister', status: 'Alerted' },
  { name: 'Sam', role: 'Roommate', status: 'Tracking' },
  { name: 'Dad', role: 'Family', status: 'Ready' },
]

export function SplineSceneBasic() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const phoneRotateX = useTransform(scrollYProgress, [0, 1], [9, -7])
  const phoneRotateY = useTransform(scrollYProgress, [0, 1], [-13, 11])
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const rearPhoneY = useTransform(scrollYProgress, [0, 1], [40, -70])
  const rearPhoneRotate = useTransform(scrollYProgress, [0, 1], [8, -4])
  const cardLeftY = useTransform(scrollYProgress, [0, 1], [20, -90])
  const cardRightY = useTransform(scrollYProgress, [0, 1], [80, -130])
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
          <motion.div style={{ y: cardLeftY, rotateY: -18, rotateX: 8 }} className="absolute left-2 top-12 hidden w-56 rounded-3xl border border-pink-100 bg-white/85 p-4 shadow-xl shadow-pink-950/10 backdrop-blur lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-700">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-950">Hold detected</p>
                <p className="text-xs text-neutral-500">SOS sends after 3 sec</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: cardRightY, rotateY: 18, rotateX: 7 }} className="absolute bottom-16 right-0 hidden w-64 rounded-3xl border border-neutral-200 bg-white/90 p-4 shadow-xl shadow-neutral-950/10 backdrop-blur lg:block">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-950">Emergency contacts</p>
              <UsersRound className="h-4 w-4 text-pink-700" />
            </div>
            <div className="space-y-2">
              {contacts.slice(0, 2).map((contact) => (
                <div key={contact.name} className="flex items-center justify-between rounded-2xl bg-neutral-50 px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{contact.name}</p>
                    <p className="text-xs text-neutral-500">{contact.role}</p>
                  </div>
                  <Check className="h-4 w-4 text-emerald-600" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ rotateX: phoneRotateX, rotateY: phoneRotateY, y: phoneY, transformStyle: 'preserve-3d' }}
            className="relative h-[630px] w-[314px] rounded-[3.4rem] border-[10px] border-neutral-950 bg-neutral-950 shadow-[0_35px_90px_rgba(17,24,39,0.28)] md:h-[690px] md:w-[342px]"
          >
            <div className="absolute inset-x-0 top-0 z-30 flex justify-center">
              <div className="h-7 w-36 rounded-b-3xl bg-neutral-950" />
            </div>

            <div className="relative h-full overflow-hidden rounded-[2.7rem] bg-neutral-950">
              <div className="absolute inset-0 bg-[#120b16]" />
              <div className="relative flex h-full flex-col px-5 pt-12 pb-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-200">Ypomoni</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">Safety ready</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <ShieldCheck className="h-5 w-5 text-pink-200" />
                  </div>
                </div>

                <div className="mt-7 rounded-[2rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-black/20 backdrop-blur">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/55">Current location</p>
                      <p className="mt-1 text-sm font-semibold">Live map active</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-200">Sharing</span>
                  </div>
                  <div className="relative h-44 overflow-hidden rounded-[1.4rem] bg-[#18181b]">
                    <div className="absolute left-5 top-8 h-1 w-40 rotate-12 rounded-full bg-white/10" />
                    <div className="absolute right-4 top-20 h-1 w-36 -rotate-12 rounded-full bg-white/10" />
                    <div className="absolute bottom-10 left-8 h-1 w-32 rotate-6 rounded-full bg-white/10" />
                    <div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-pink-300/25" />
                    <div className="absolute bottom-6 right-5 h-28 w-28 rounded-full border border-white/10" />
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                      <motion.span animate={{ scale: [1, 1.55, 1], opacity: [0.7, 0, 0.7] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} className="absolute h-24 w-24 rounded-full bg-pink-400/20" />
                      <span className="absolute h-16 w-16 rounded-full bg-pink-400/15" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 shadow-[0_0_36px_rgba(236,72,153,0.55)]">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((second) => (
                    <div key={second} className="rounded-2xl bg-white/[0.08] p-3 text-center ring-1 ring-white/10">
                      <p className="text-lg font-semibold">{second}</p>
                      <p className="text-[10px] uppercase tracking-wide text-white/45">sec</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="mb-4 rounded-[1.7rem] bg-white p-3 text-neutral-950 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-700">
                        <Siren className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">SOS signal sent</p>
                        <p className="truncate text-xs text-neutral-500">Live location shared with 3 contacts</p>
                      </div>
                    </div>
                  </div>

                  <button className="flex h-24 w-full items-center justify-center rounded-[2rem] bg-pink-600 text-2xl font-black tracking-[0.28em] text-white shadow-[0_18px_50px_rgba(219,39,119,0.45)] ring-8 ring-pink-500/15 transition hover:bg-pink-500" type="button">
                    SOS
                  </button>
                  <p className="mt-3 text-center text-xs font-medium text-white/55">Press and hold for 3 seconds</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: rearPhoneY, rotate: rearPhoneRotate, rotateY: 24, transformStyle: 'preserve-3d' }} className="absolute -right-2 top-24 hidden h-[520px] w-[252px] rounded-[3rem] border-[8px] border-neutral-900 bg-white shadow-2xl shadow-neutral-950/20 md:block">
            <div className="h-full overflow-hidden rounded-[2.35rem] bg-white px-4 pt-9 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-pink-700">Contacts</p>
                  <p className="text-lg font-semibold tracking-tight text-neutral-950">Emergency list</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-600 text-white">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.name} className="rounded-3xl border border-neutral-200 bg-neutral-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                        {contact.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">{contact.name}</p>
                        <p className="text-xs text-neutral-500">{contact.role}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-neutral-600">
                      <span>{contact.status}</span>
                      <Phone className="h-3.5 w-3.5 text-pink-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}
