'use client'

import { useEffect, useRef } from 'react'
import { setAnimeStyles } from '@/lib/anime'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setAnimeStyles(barRef.current, { transform: `scaleX(${p})` })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#be185d] via-[#ff3f68] to-[#ec1380]"
        style={{ boxShadow: '0 0 12px rgba(255,63,104,0.7)' }}
      />
    </div>
  )
}
