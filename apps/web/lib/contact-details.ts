export const CONTACT_ADDRESS = 'Saray mahallesi, Gökkuşağı caddesi 16/B Kahramankazan/Ankara'

export const CONTACT_PHONES = ['+90 533 498 15 40', '+90 532 603 34 66'] as const

export const CONTACT_EMAIL = 'info@mastersteelhouse.com'

export const CONTACT_WORKING_HOURS = ['Haftaiçi: 9:00-18:00', 'Cumartesi: 9:30-14:00'] as const

export const CONTACT_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.602759652033!2d32.62475387732155!3d40.03964767150261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d345b12ce21b31%3A0xb6dc4bd1748db29a!2sMaster%20Steel%20House%20Hafif%20%C3%87elik%20Sistemleri!5e0!3m2!1str!2str!4v1708372694868!5m2!1str!2str'

export function toTelHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`
}
