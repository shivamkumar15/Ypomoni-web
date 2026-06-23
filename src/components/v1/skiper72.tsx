'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { setAnimeStyles } from '@/lib/anime'

interface SkiperTextRevealHProps {
  children: string
  className?: string
}

export function SkiperTextRevealH({ children, className }: SkiperTextRevealHProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])

  // Split content into discrete words for fluid wrapping
  const words = children
    .replace(/\n/g, ' ')
    .split(' ')
    .filter(Boolean)

  useEffect(() => {
    const updateReveal = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const travel = Math.max(rect.height - window.innerHeight, 1)
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1)
      const animationEnd = 0.82
      const duration = 0.18

      wordRefs.current.forEach((word, index) => {
        const start = index * ((animationEnd - duration) / Math.max(words.length - 1, 1))
        const local = Math.min(Math.max((progress - start) / duration, 0), 1)
        const eased = 1 - Math.pow(1 - local, 4)

        setAnimeStyles(word, {
          opacity: eased,
          transform: `translateY(${15 - eased * 15}px)`,
        })
      })
    }

    updateReveal()
    window.addEventListener('scroll', updateReveal, { passive: true })
    window.addEventListener('resize', updateReveal)

    return () => {
      window.removeEventListener('scroll', updateReveal)
      window.removeEventListener('resize', updateReveal)
    }
  }, [words.length])

  return (
    <div ref={containerRef} className="relative h-[220vh] w-full bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[#fff8fb]" />
      <div className="sticky top-0 flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-24">
        <p
          className={cn(
            'w-full max-w-6xl text-center font-semibold leading-[1.18] tracking-[-0.055em] text-neutral-950 md:text-left text-[clamp(2rem,5.4vw,5.6rem)]',
            className
          )}
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              ref={(node) => {
                if (node) wordRefs.current[index] = node
              }}
              className="mr-[0.25em] inline-block translate-y-[15px] text-neutral-950 opacity-0"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
