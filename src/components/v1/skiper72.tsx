'use client'

import { useRef } from 'react'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkiperTextRevealHProps {
  children: string
  className?: string
}

interface RevealLineProps {
  line: string
  index: number
  total: number
  progress: MotionValue<number>
}

function RevealLine({ line, index, total, progress }: RevealLineProps) {
  const animationEnd = 0.7
  const duration = 0.3 
  
  const start = index * ((animationEnd - duration) / Math.max(total - 1, 1))
  const end = start + duration

  // Explicitly mapping the full 0 to 1 scroll range to absolutely guarantee 
  // the text stays fully solid white (1) until the very end of the scroll.
  // Removed blur filter to prevent Safari/hardware-acceleration gray-out bugs.
  const opacity = useTransform(
    progress,
    [0, start, start + duration * 0.5, 1],
    [0, 0, 1, 1]
  )
  const x = useTransform(
    progress,
    [0, start, end, 1],
    ['30vw', '30vw', '0vw', '0vw']
  )

  return (
    <motion.span
      style={{ opacity, x }}
      className="block whitespace-pre-wrap text-pink-700"
    >
      {line}
    </motion.span>
  )
}

export function SkiperTextRevealH({ children, className }: SkiperTextRevealHProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Split content into discrete lines
  const lines = children
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-neutral-50">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden px-8 md:px-24">
        <p
          className={cn(
            'w-full max-w-6xl text-left font-medium leading-[1.2] tracking-tight text-pink-700 text-[clamp(1.5rem,4vw,3.5rem)]',
            className
          )}
        >
          {lines.map((line, index) => (
            <RevealLine
              key={`${line}-${index}`}
              line={line}
              index={index}
              total={lines.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </div>
  )
}
