import { SplineSceneBasic } from '@/components/demo'
import { Logo } from '@/components/logo'
import { SkiperTextRevealH } from '@/components/v1/skiper72'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-clip">
      <header className="absolute left-6 top-6 z-20 md:left-12 md:top-10">
        <Logo />
      </header>
      
      <section className="h-screen w-full">
        <SplineSceneBasic />
      </section>

      <section className="w-full bg-black">
        <SkiperTextRevealH>
          {`Ypomoni is a smart personal safety app
that enables instant SOS alerts, live location
sharing, and real-time audio and video
streaming during emergencies. Designed
to provide rapid assistance and reliable
evidence collection, Ypomoni helps users
stay connected and protected when every
second counts.`}
        </SkiperTextRevealH>
      </section>
    </main>
  )
}
