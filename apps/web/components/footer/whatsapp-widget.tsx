'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const FloatingWhatsApp = dynamic(
  () => import('react-floating-whatsapp').then((module) => module.FloatingWhatsApp),
  { ssr: false },
)

export function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <FloatingWhatsApp
      accountName="Master Steel House"
      phoneNumber="+905334981540"
      statusMessage="Genellikle 1 saat içinde yanıt verir"
      chatMessage="Merhabalar! Nasıl yardımcı olabiliriz? 🤝"
      placeholder="Bir mesaj yazın..."
      avatar="/images/avatar.webp"
    />
  )
}
