"use server"

import { readProductCatalog, upsertCategory, deleteCategory, upsertProduct, deleteProduct, type ProductCategory, type ProductItem } from "@/lib/products"

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function parseHighlights(value: string | null) {
  if (!value) return []
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseSpecs(formData: FormData) {
  const labels = formData.getAll("specLabel").map((item) => String(item || "").trim())
  const values = formData.getAll("specValue").map((item) => String(item || "").trim())
  const length = Math.max(labels.length, values.length)
  const specs: { label: string; value: string }[] = []

  for (let index = 0; index < length; index += 1) {
    const label = labels[index] ?? ""
    const value = values[index] ?? ""
    if (label || value) {
      specs.push({ label, value })
    }
  }

  return specs
}

export async function getProductCatalog() {
  return readProductCatalog()
}

export async function saveCategory(formData: FormData) {
  const name = String(formData.get("name") || "").trim()
  const slugInput = String(formData.get("slug") || "").trim()
  const slug = slugInput || toSlug(name)
  const eyebrow = String(formData.get("eyebrow") || "").trim()
  const title = String(formData.get("title") || "").trim()
  const titleAccent = String(formData.get("titleAccent") || "").trim()
  const description = String(formData.get("description") || "").trim()

  if (!slug || !name) {
    throw new Error("Kategori adi ve slug bos olamaz.")
  }

  const payload: ProductCategory = {
    slug,
    name,
    eyebrow,
    title: title || name,
    titleAccent,
    description,
  }

  await upsertCategory(payload)
  return { ok: true }
}

export async function removeCategory(formData: FormData) {
  const slug = String(formData.get("slug") || "").trim()
  if (!slug) {
    throw new Error("Kategori slug bos olamaz.")
  }
  await deleteCategory(slug)
  return { ok: true }
}

export async function saveProduct(formData: FormData) {
  const categorySlug = String(formData.get("categorySlug") || "").trim()
  const name = String(formData.get("name") || "").trim()
  const slugInput = String(formData.get("slug") || "").trim()
  const slug = slugInput || toSlug(name)
  const size = String(formData.get("size") || "").trim()
  const image = String(formData.get("image") || "").trim()
  const rooms = String(formData.get("rooms") || "").trim()
  const bathrooms = String(formData.get("bathrooms") || "").trim()
  const capacity = String(formData.get("capacity") || "").trim()
  const usageType = String(formData.get("usageType") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const highlights = parseHighlights(String(formData.get("highlights") || ""))
  const specs = parseSpecs(formData)

  if (!categorySlug || !slug || !name) {
    throw new Error("Kategori, urun adi ve slug zorunludur.")
  }

  const payload: ProductItem = {
    categorySlug,
    slug,
    name,
    size,
    image,
    rooms,
    bathrooms,
    capacity,
    usageType,
    description,
    highlights,
    specs,
  }

  await upsertProduct(payload)
  return { ok: true }
}

export async function removeProduct(formData: FormData) {
  const categorySlug = String(formData.get("categorySlug") || "").trim()
  const slug = String(formData.get("slug") || "").trim()

  if (!categorySlug || !slug) {
    throw new Error("Kategori ve urun slug zorunludur.")
  }

  await deleteProduct(categorySlug, slug)
  return { ok: true }
}
