import { animate } from 'animejs'

type AnimeTarget = Element | null | undefined

type AnimeValue = string | number | Array<string | number>

type AnimeOptions = {
  targets: AnimeTarget | AnimeTarget[]
  duration?: number
  delay?: number
  easing?: string
  loop?: boolean
  direction?: PlaybackDirection
  complete?: () => void
  [key: string]: AnimeValue | AnimeTarget | AnimeTarget[] | number | string | boolean | PlaybackDirection | (() => void) | undefined
}

type AnimeValueOptions = {
  from: number
  to: number
  duration?: number
  easing?: string
  update: (value: number) => void
  complete?: () => void
}

const transformProps = new Set(['translateX', 'translateY', 'scale', 'rotate'])
const controlProps = new Set(['targets', 'duration', 'delay', 'easing', 'loop', 'direction', 'complete'])

function toTargets(targets: AnimeOptions['targets']) {
  return (Array.isArray(targets) ? targets : [targets]).filter(Boolean) as Element[]
}

function toAnimeEase(easing = 'easeOutExpo') {
  if (easing === 'easeOutExpo') return 'outExpo'
  if (easing === 'easeInOutSine') return 'inOutSine'
  if (easing === 'easeOutBack') return 'outBack'
  return easing
}

export function anime(options: AnimeOptions) {
  const targets = toTargets(options.targets)
  if (!targets.length) return { cancel: () => {} }

  const params: Record<string, unknown> = {
    duration: options.duration ?? 600,
    delay: options.delay ?? 0,
    ease: toAnimeEase(options.easing),
    loop: options.loop ?? false,
    alternate: options.direction === 'alternate',
    onComplete: options.complete,
  }

  Object.entries(options).forEach(([prop, rawValue]) => {
    if (controlProps.has(prop) || rawValue === undefined || typeof rawValue === 'boolean' || typeof rawValue === 'function') return
    params[prop] = transformProps.has(prop) && Array.isArray(rawValue)
      ? rawValue.map((value) => {
        if (typeof value !== 'number' || prop === 'scale') return value
        return prop === 'rotate' ? `${value}deg` : `${value}px`
      })
      : rawValue
  })

  const animation = animate(targets, params)
  return {
    cancel: () => animation.cancel(),
  }
}

export function animeValue({ from, to, duration = 600, easing = 'easeOutExpo', update, complete }: AnimeValueOptions) {
  const state = { value: from }
  update(from)
  const animation = animate(state, {
    value: to,
    duration,
    ease: toAnimeEase(easing),
    onUpdate: () => update(state.value),
    onComplete: complete,
  })

  return {
    cancel: () => animation.cancel(),
  }
}

export function setAnimeStyles(target: HTMLElement | SVGElement | null, styles: Record<string, string | number>) {
  if (!target) return
  Object.entries(styles).forEach(([prop, value]) => {
    const cssProp = prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
    target.style.setProperty(cssProp, String(value))
  })
}
