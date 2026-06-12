'use client'

import { useEffect, useState, ComponentType } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [SplineComponent, setSplineComponent] = useState<ComponentType<any> | null>(null)

  useEffect(() => {
    import('@splinetool/react-spline')
      .then((mod) => {
        setSplineComponent(() => mod.default)
      })
      .catch((err) => {
        console.error('Failed to load Spline component:', err)
      })
  }, [])

  if (!SplineComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <SplineComponent
      scene={scene}
      className={className}
    />
  )
}
