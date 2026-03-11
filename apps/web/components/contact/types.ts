export type ContactFormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  kvkk: boolean
  company: string
}

export type FormErrors = Partial<Record<'name' | 'email' | 'phone' | 'subject' | 'message' | 'kvkk', string>>

export type SubmitPopup = { type: 'success' | 'error'; text: string } | null
