'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ContactRound, LocateFixed, Siren } from 'lucide-react'

const scenes = [
  {
    icon: Siren,
    eyebrow: 'Step 01',
    title: 'Hold SOS for 3 seconds',
    copy: 'The 3D button locks into focus as the user confirms the alert, reducing accidental taps while keeping the emergency action fast.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: LocateFixed,
    eyebrow: 'Step 02',
    title: 'Live location starts moving',
    copy: 'The app opens a live tracking view so trusted contacts can see the user’s movement in real time.',
    color: 'from-fuchsia-500 to-pink-600',
  },
  {
    icon: ContactRound,
    eyebrow: 'Step 03',
    title: 'Emergency contacts are notified',
    copy: 'Selected contacts receive the SOS signal and can follow the live location from their mobile app.',
    color: 'from-rose-500 to-red-500',
  },
]

export function ScrollShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-22, 0, 22])
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -120])
  const mapLine = useTransform(scrollYProgress, [0.1, 0.75], ['18%', '88%'])
  const sosScale = useTransform(scrollYProgress, [0.05, 0.35, 0.65], [0.92, 1.08, 0.96])

  return (
    <section ref={ref} className="relative overflow-hidden bg-neutral-950 px-6 py-28 text-white md:px-10 lg:px-12">
      <motion.div style={{ y: orbY }} className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink-300">Interactive scroll</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            The page moves like the product is coming alive.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
            Scroll through the SOS journey and the interface rotates, pulses, and reveals depth like a premium app launch website.
          </p>
        </div>

        <div className="relative min-h-[620px] [perspective:1500px]">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="absolute left-1/2 top-1/2 h-[520px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_40px_110px_rgba(0,0,0,0.45)] backdrop-blur-xl md:w-[390px]"
          >
            <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-[#100914] p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(236,72,153,0.36),transparent_34%)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-200">SOS mode</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">Emergency active</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">Live</span>
                </div>

                <div className="relative mt-8 h-56 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.06]">
                  <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(125deg,transparent_0_24%,rgba(255,255,255,0.14)_24%_25%,transparent_25%_58%,rgba(255,255,255,0.12)_58%_59%,transparent_59%),linear-gradient(42deg,transparent_0_39%,rgba(255,255,255,0.11)_39%_40%,transparent_40%)]" />
                  <div className="absolute left-8 top-9 h-24 w-24 rounded-full border border-pink-300/20" />
                  <motion.div style={{ width: mapLine }} className="absolute left-8 top-1/2 h-1 rounded-full bg-pink-400 shadow-[0_0_24px_rgba(244,114,182,0.65)]" />
                  <motion.div style={{ x: mapLine }} className="absolute left-2 top-[calc(50%-18px)] flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.7)]">
                    <LocateFixed className="h-4 w-4" />
                  </motion.div>
                </div>

                <motion.div style={{ scale: sosScale }} className="relative mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full bg-pink-600 text-3xl font-black tracking-[0.22em] shadow-[0_0_80px_rgba(219,39,119,0.55)] ring-[18px] ring-pink-500/10">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-pink-500/20" />
                  <span className="relative">SOS</span>
                </motion.div>

                <div className="mt-auto grid grid-cols-3 gap-2">
                  {['Hold', 'Alert', 'Track'].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/[0.08] px-3 py-3 text-center text-xs font-semibold text-white/70 ring-1 ring-white/10">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {scenes.map((scene, index) => {
            const Icon = scene.icon
            const y = index === 0 ? '-translate-y-6' : index === 1 ? 'translate-y-44' : 'translate-y-[25rem]'
            const side = index === 1 ? 'right-0 md:right-8' : 'left-0 md:left-8'

            return (
              <motion.article
                key={scene.title}
                initial={{ opacity: 0, y: 30, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, amount: 0.45 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className={`absolute ${side} top-12 ${y} z-10 w-64 rounded-[1.7rem] border border-white/10 bg-white/[0.09] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl`}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${scene.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200">{scene.eyebrow}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{scene.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{scene.copy}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
