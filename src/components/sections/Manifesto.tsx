'use client'

import { useEffect, useRef } from 'react'
import { setAnimeStyles } from '@/lib/anime'

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])

  const text = 'Ypomoni turns the worst moment of your life into three clear actions: hold, alert, and let the app do the rest — sharing your location, notifying your circle, and quietly collecting evidence while you stay focused on staying safe.'

  const words = text.split(' ')

  useEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const travel = Math.max(rect.height - window.innerHeight, 1)
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1)
      const end = 0.82
      const duration = 0.16

      wordRefs.current.forEach((word, index) => {
        const start = index * ((end - duration) / Math.max(words.length - 1, 1))
        const local = Math.min(Math.max((progress - start) / duration, 0), 1)
        const eased = 1 - Math.pow(1 - local, 4)
        setAnimeStyles(word, {
          opacity: 0.15 + eased * 0.85,
          transform: `translateY(${18 - eased * 18}px)`,
          color: eased > 0.85 ? '#ff3f68' : '#ffffff',
        })
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [words.length])

  return (
    <section className="relative w-full bg-ink">
      <div ref={containerRef} className="relative h-[240vh] w-full">
        <div className="sticky top-0 flex min-h-screen items-center justify-center px-6 md:px-16">
          <p className="max-w-5xl text-center font-display text-[clamp(1.8rem,4.8vw,4.5rem)] font-semibold leading-[1.15] tracking-[-0.04em]">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                ref={(node) => {
                  if (node) wordRefs.current[index] = node
                }}
                className="mr-[0.28em] inline-block"
                style={{ opacity: 0.15, transform: 'translateY(18px)', color: '#ffffff' }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
