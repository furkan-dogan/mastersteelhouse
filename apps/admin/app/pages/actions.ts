"use server"

import { readWebPage, writeWebPage } from "@/lib/web-pages"
import { DEFAULT_WEB_PAGES, type WebPageContent } from "../../../../content/web-pages"

export async function getWebPageContent(slug: string) {
  return readWebPage(slug)
}

export async function saveWebPageContent(formData: FormData) {
  const payload = formData.get("payload")
  if (typeof payload !== "string") {
    throw new Error("Eksik içerik payload")
  }

  let data: WebPageContent
  try {
    data = JSON.parse(payload) as WebPageContent
  } catch {
    throw new Error("İçerik JSON formatı geçersiz")
  }

  await writeWebPage(data)
  return { ok: true }
}

export async function syncWebPageDefaults() {
  for (const content of DEFAULT_WEB_PAGES) {
    await writeWebPage(content)
  }
  return { ok: true }
}
