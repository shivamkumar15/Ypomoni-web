'use client'

import { useRef } from 'react'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkiperTextRevealHProps {
  children: string
  className?: string
}

interface RevealWordProps {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
}

function RevealWord({ word, index, total, progress }: RevealWordProps) {
  const animationEnd = 0.8
  const duration = 0.2 
  
  const start = index * ((animationEnd - duration) / Math.max(total - 1, 1))
  const end = start + duration

  const opacity = useTransform(
    progress,
    [0, start, start + duration * 0.5, 1],
    [0, 0, 1, 1]
  )
  const y = useTransform(
    progress,
    [0, start, end, 1],
    ['15px', '15px', '0px', '0px']
  )

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] text-pink-700"
    >
      {word}
    </motion.span>
  )
}

export function SkiperTextRevealH({ children, className }: SkiperTextRevealHProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Split content into discrete words for fluid wrapping
  const words = children
    .replace(/\n/g, ' ')
    .split(' ')
    .filter(Boolean)

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-neutral-50">
      <div className="sticky top-0 flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-24">
        <p
          className={cn(
            'w-full max-w-5xl text-center md:text-left font-medium leading-[1.4] tracking-tight text-pink-700 text-[clamp(1.2rem,4vw,3.5rem)]',
            className
          )}
        >
          {words.map((word, index) => (
            <RevealWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </div>
  )
}
