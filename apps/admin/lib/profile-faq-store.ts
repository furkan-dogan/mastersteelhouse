import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

export type ProfileFaqItem = {
  id: string
  question: string
  answer: string
}

export type ProfileFaqStore = {
  items: ProfileFaqItem[]
}

function getStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'profile-faq-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'profile-faq-cms.json'),
    path.join(process.cwd(), '..', 'content', 'profile-faq-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('profile-faq-cms.json not found')
  }

  return found
}

export async function readProfileFaqStore(): Promise<ProfileFaqStore> {
  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as ProfileFaqStore
}

export async function writeProfileFaqStore(store: ProfileFaqStore) {
  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
