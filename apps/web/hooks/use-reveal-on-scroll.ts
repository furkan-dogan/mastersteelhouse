'use client'

import { useEffect, useRef, useState } from 'react'

type UseRevealOnScrollOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useRevealOnScroll<T extends HTMLElement = HTMLElement>(options?: UseRevealOnScrollOptions) {
  const { threshold = 0.1, rootMargin, once = true } = options ?? {}
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
