'use client'

import { useEffect } from 'react'
import { pushDataLayerEvent } from '@/lib/tracking'

function getAnchor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null
  return target.closest('a[href]')
}

function normalizePhoneFromHref(href: string) {
  return href.replace(/^tel:/i, '').replace(/[^\d+]/g, '')
}

export function ContactTrackingListener() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = getAnchor(event.target)
      if (!anchor) return

      const href = (anchor.getAttribute('href') ?? '').trim()
      if (!href) return

      const contactLocation =
        (anchor.getAttribute('data-contact-location') ?? '').trim() || window.location.pathname
      const contactLabel =
        (anchor.getAttribute('data-contact-label') ?? '').trim() ||
        (anchor.textContent ?? '').trim() ||
        href

      if (href.startsWith('tel:')) {
        const phone = normalizePhoneFromHref(href)
        pushDataLayerEvent('Phone_Call_Website', {
          contact_channel: 'phone',
          contact_phone: phone,
          contact_location: contactLocation,
          contact_label: contactLabel,
        })
        pushDataLayerEvent('contact_phone_click', {
          contact_channel: 'phone',
          contact_phone: phone,
          contact_location: contactLocation,
          contact_label: contactLabel,
        })
        return
      }

      if (href.startsWith('mailto:')) {
        const email = href.replace(/^mailto:/i, '')
        pushDataLayerEvent('contact_email_click', {
          contact_channel: 'email',
          contact_email: email,
          contact_location: contactLocation,
          contact_label: contactLabel,
        })
        return
      }

      if (href.includes('whatsapp.com') || href.includes('wa.me')) {
        pushDataLayerEvent('WhatsappClick', {
          contact_channel: 'whatsapp',
          contact_location: contactLocation,
          contact_label: contactLabel,
        })
        pushDataLayerEvent('contact_whatsapp_click', {
          contact_channel: 'whatsapp',
          contact_location: contactLocation,
          contact_label: contactLabel,
        })
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
