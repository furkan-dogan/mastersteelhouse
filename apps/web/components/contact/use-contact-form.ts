'use client'

import { useRef, useState } from 'react'
import type { ContactFormState, FormErrors, SubmitPopup } from '@/components/contact/types'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgwzedw'
const MIN_SUBMIT_MS = 3000

const initialState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  kvkk: false,
  company: '',
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validate(formData: ContactFormState): FormErrors {
  const nextErrors: FormErrors = {}

  if (!formData.name.trim()) nextErrors.name = 'Ad Soyad zorunludur.'
  if (!formData.phone.trim()) nextErrors.phone = 'Telefon zorunludur.'
  if (!formData.subject.trim()) nextErrors.subject = 'Konu zorunludur.'
  if (!formData.message.trim()) nextErrors.message = 'Mesaj zorunludur.'
  if (formData.email.trim() && !isValidEmail(formData.email.trim())) {
    nextErrors.email = 'E-posta formatı geçersiz.'
  }
  if (!formData.kvkk) nextErrors.kvkk = 'Onay vermeden gönderim yapılamaz.'

  return nextErrors
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultPopup, setResultPopup] = useState<SubmitPopup>(null)
  const mountAtRef = useRef<number>(Date.now())

  const handleChange = (name: keyof ContactFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleKvkkChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, kvkk: checked }))
    if (checked) setErrors((prev) => ({ ...prev, kvkk: undefined }))
  }

  const submit = async () => {
    const nextErrors = validate(formData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    if (formData.company.trim()) {
      setResultPopup({ type: 'success', text: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' })
      return
    }

    if (Date.now() - mountAtRef.current < MIN_SUBMIT_MS) {
      setResultPopup({ type: 'error', text: 'Gönderim çok hızlı algılandı. Lütfen birkaç saniye sonra tekrar deneyin.' })
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        kvkkAccepted: formData.kvkk ? 'Evet' : 'Hayır',
        page: typeof window !== 'undefined' ? window.location.href : '/iletisim',
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Form gönderimi başarısız')

      setFormData(initialState)
      setErrors({})
      setResultPopup({ type: 'success', text: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' })
    } catch {
      setResultPopup({ type: 'error', text: 'Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    resultPopup,
    setResultPopup,
    handleChange,
    handleKvkkChange,
    submit,
  }
}
