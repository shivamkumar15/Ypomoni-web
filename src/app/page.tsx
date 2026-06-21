import { SplineSceneBasic } from '@/components/demo'
import { Logo } from '@/components/logo'
import { ScrollShowcase } from '@/components/scroll-showcase'
import { SkiperTextRevealH } from '@/components/v1/skiper72'
import { BellRing, Clock3, ContactRound, LocateFixed, MapPinned, MessageCircleWarning, ShieldCheck, Siren } from 'lucide-react'

const features = [
  {
    icon: Clock3,
    title: '3-second SOS hold',
    description: 'A deliberate press-and-hold action helps prevent accidental alerts while staying fast in a real emergency.',
  },
  {
    icon: LocateFixed,
    title: 'Live location inside the app',
    description: 'Contacts see where the user is moving in real time, not just where the alert started.',
  },
  {
    icon: ContactRound,
    title: 'Emergency contact setup',
    description: 'Users can add trusted people who receive SOS alerts, location updates, and important context.',
  },
  {
    icon: BellRing,
    title: 'Instant alert signal',
    description: 'The SOS notification is designed to be direct, readable, and hard to miss when every second matters.',
  },
]

const steps = [
  {
    icon: Siren,
    title: 'Hold the SOS button',
    copy: 'The user presses and holds SOS for 3 seconds to confirm they need help.',
  },
  {
    icon: MessageCircleWarning,
    title: 'Contacts receive the alert',
    copy: 'Trusted emergency contacts are notified with the user’s active safety status.',
  },
  {
    icon: MapPinned,
    title: 'Live location opens',
    copy: 'The mobile app shows the user’s live location so help can follow movement in real time.',
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-clip bg-white text-neutral-950">
      <header className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between md:left-10 md:right-10 lg:left-12 lg:right-12">
        <Logo />
        <nav className="hidden items-center gap-2 rounded-full border border-neutral-200 bg-white/85 p-1 shadow-sm backdrop-blur md:flex">
          <a href="#features" className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950">
            Features
          </a>
          <a href="#how-it-works" className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950">
            How it works
          </a>
          <a href="#contacts" className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800">
            Contacts
          </a>
        </nav>
      </header>

      <section className="min-h-screen w-full">
        <SplineSceneBasic />
      </section>

      <ScrollShowcase />

      <section id="features" className="border-y border-neutral-200 bg-white px-6 py-24 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-700">Built for emergencies</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-neutral-950 md:text-6xl">
                A safety app people can understand under pressure.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-600 lg:ml-auto">
              Ypomoni keeps the emergency flow simple: confirm the SOS, notify the right people, and make the user’s location visible in the mobile app immediately.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article key={feature.title} className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-950/5">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-700 transition group-hover:bg-pink-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-neutral-950">{feature.title}</h3>
                  <p className="mt-4 leading-7 text-neutral-600">{feature.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-neutral-950 px-6 py-24 text-white md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-300">SOS sequence</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Three steps from panic to action.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/65">
                The entire experience is designed for clarity, speed, and trust in the moment the user needs support.
              </p>
            </div>

            <div className="grid gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon

                return (
                  <article key={step.title} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-lg shadow-pink-950/30">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 text-sm font-semibold text-pink-200">0{index + 1}</div>
                        <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
                        <p className="mt-3 max-w-2xl leading-7 text-white/65">{step.copy}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="bg-[#fff8fb] px-6 py-24 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-700">Emergency contacts</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-neutral-950 md:text-6xl">
              Trusted people are ready before anything happens.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              The app includes a dedicated contact section where users can add family, friends, roommates, or guardians. When SOS is activated, those contacts receive the emergency signal and can view the live location from the mobile app.
            </p>
          </div>

          <div className="rounded-[2.2rem] border border-pink-100 bg-white p-5 shadow-2xl shadow-pink-950/10">
            <div className="rounded-[1.7rem] bg-neutral-950 p-5 text-white">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-200">Contact center</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">Your safety circle</p>
                </div>
                <ShieldCheck className="h-7 w-7 text-pink-300" />
              </div>
              {['Add trusted contact', 'Choose alert permissions', 'Share SOS and live location'].map((item, index) => (
                <div key={item} className="mb-3 flex items-center gap-4 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 last:mb-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-sm font-bold">{index + 1}</div>
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <SkiperTextRevealH>
          {`Ypomoni turns emergency response into a clear mobile flow: hold SOS for 3 seconds, send an urgent signal, share live location, and keep trusted contacts connected when fast action matters most.`}
        </SkiperTextRevealH>
      </section>

      <section className="border-t border-neutral-200 bg-white px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] bg-neutral-950 p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-300">Ypomoni</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Advertise a safety app that feels immediate, trustworthy, and simple to use.
            </h2>
          </div>
          <a
            href="mailto:hello@ypomoni.app"
            className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-pink-50 hover:text-pink-700"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}
