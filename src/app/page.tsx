import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { PhoneDemo } from '@/components/sections/PhoneDemo'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Evidence } from '@/components/sections/Evidence'
import { Manifesto } from '@/components/sections/Manifesto'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-ink text-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <PhoneDemo />
      <Features />
      <HowItWorks />
      <Evidence />
      <Manifesto />
      <CTA />
    </main>
  )
}
