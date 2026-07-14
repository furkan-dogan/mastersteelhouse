'use client'

import { useCallback, useEffect, useState } from 'react'
import { Package, BookOpenText, Image as ImageIcon, BarChart3, Search, RefreshCw, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AdminLayout } from './admin-layout'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { DataTable, TableRowAction } from './ui/table'

type Kpi = {
  label: string
  value: number | string
  icon: React.ReactNode
  href?: string
  unavailable?: boolean
}

type RecentItem = {
  id: string
  title: string
  type: string
  date?: string
  timestamp: number | null
  href: string
}

type StatisticItem = {
  label: string
  value: number | null
  href: string
  color: string
}

type ProductsPayload = { products?: { slug: string; name: string; categorySlug: string }[] }
type BlogPayload = { posts?: { slug: string; title: string; date?: string }[] }
type MediaPayload = { items?: { id: string; name: string; createdAt: string }[] }

const TURKISH_MONTHS: Record<string, number> = {
  ocak: 0,
  şubat: 1,
  mart: 2,
  nisan: 3,
  mayıs: 4,
  haziran: 5,
  temmuz: 6,
  ağustos: 7,
  eylül: 8,
  ekim: 9,
  kasım: 10,
  aralık: 11,
}

function parseContentDate(value?: string) {
  if (!value) return null
  const nativeTimestamp = Date.parse(value)
  if (Number.isFinite(nativeTimestamp)) return nativeTimestamp

  const match = value.trim().toLocaleLowerCase('tr-TR').match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/)
  if (!match) return null
  const month = TURKISH_MONTHS[match[2]]
  if (month === undefined) return null
  return new Date(Number(match[3]), month, Number(match[1])).getTime()
}

function formatContentDate(timestamp: number | null, fallback?: string) {
  if (timestamp === null) return fallback || 'Tarih bilgisi yok'
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(timestamp)
}

async function fetchDashboardResource<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`.trim())
  return response.json() as Promise<T>
}

type DashboardProps = {
  endpointBase?: string
  hrefBase?: string
}

export function Dashboard({ endpointBase = '/api', hrefBase = '' }: DashboardProps) {
  const router = useRouter()
  const [kpis, setKpis] = useState<Kpi[]>([])
  const [statistics, setStatistics] = useState<StatisticItem[]>([])
  const [recent, setRecent] = useState<RecentItem[]>([])
  const [dataErrors, setDataErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const isProfileCms = hrefBase === '/profil-cms'
  const productsHref = isProfileCms ? '/profil-cms' : '/products'

  const load = useCallback(async () => {
    setLoading(true)

    try {
      const [productsResult, blogResult, mediaResult] = await Promise.allSettled([
        fetchDashboardResource<ProductsPayload>(`${endpointBase}/products`),
        fetchDashboardResource<BlogPayload>(`${endpointBase}/blog`),
        fetchDashboardResource<MediaPayload>(`${endpointBase}/media`),
      ])

      const products = productsResult.status === 'fulfilled' ? productsResult.value : null
      const blog = blogResult.status === 'fulfilled' ? blogResult.value : null
      const media = mediaResult.status === 'fulfilled' ? mediaResult.value : null
      const productCount = products ? (products.products?.length ?? 0) : null
      const blogCount = blog ? (blog.posts?.length ?? 0) : null
      const mediaCount = media ? (media.items?.length ?? 0) : null
      const nextErrors = [
        productsResult.status === 'rejected' ? 'Ürün verisi' : null,
        blogResult.status === 'rejected' ? 'Blog verisi' : null,
        mediaResult.status === 'rejected' ? 'Medya verisi' : null,
      ].filter((item): item is string => item !== null)

      const nextKpis: Kpi[] = [
        {
          label: 'Toplam Ürün',
          value: productCount ?? '—',
          icon: <Package className="h-5 w-5" />,
          href: productsHref,
          unavailable: productCount === null,
        },
        {
          label: 'Blog Yazıları',
          value: blogCount ?? '—',
          icon: <BookOpenText className="h-5 w-5" />,
          href: `${hrefBase}/blog`,
          unavailable: blogCount === null,
        },
      ]

      nextKpis.push({
        label: 'Medya Dosyası',
        value: mediaCount ?? '—',
        icon: <ImageIcon className="h-5 w-5" />,
        href: `${hrefBase}/media`,
        unavailable: mediaCount === null,
      })

      setKpis(nextKpis)
      setDataErrors(nextErrors)
      setStatistics([
        { label: 'Ürünler', value: productCount, href: productsHref, color: '#0872c9' },
        { label: 'Blog yazıları', value: blogCount, href: `${hrefBase}/blog`, color: '#8b5cf6' },
        { label: 'Medya dosyaları', value: mediaCount, href: `${hrefBase}/media`, color: '#10b981' },
      ])

      const items: RecentItem[] = [
        ...(products?.products?.slice(0, 3).map((product) => ({
          id: `product-${product.categorySlug}-${product.slug}`,
          title: product.name,
          type: 'Ürün',
          date: undefined,
          timestamp: null,
          href: `${productsHref}?category=${encodeURIComponent(product.categorySlug)}`,
        })) ?? []),
        ...(blog?.posts?.slice(0, 3).map((post) => {
          const timestamp = parseContentDate(post.date)
          return {
            id: `blog-${post.slug}`,
            title: post.title,
            type: 'Blog',
            date: formatContentDate(timestamp, post.date),
            timestamp,
            href: `${hrefBase}/blog`,
          }
        }) ?? []),
        ...(media?.items?.slice(0, 3).map((mediaItem) => {
          const timestamp = parseContentDate(mediaItem.createdAt)
          return {
            id: `media-${mediaItem.id}`,
            title: mediaItem.name,
            type: 'Medya',
            date: formatContentDate(timestamp),
            timestamp,
            href: `${hrefBase}/media`,
          }
        }) ?? []),
      ]

      items.sort((a, b) => {
        if (a.timestamp === null && b.timestamp === null) return 0
        if (a.timestamp === null) return 1
        if (b.timestamp === null) return -1
        return b.timestamp - a.timestamp
      })
      setRecent(items)
    } catch {
      const fallback: Kpi[] = [
        { label: 'Ürünler', value: '-', icon: <Package className="h-5 w-5" />, href: productsHref },
        { label: 'Blog', value: '-', icon: <BookOpenText className="h-5 w-5" />, href: `${hrefBase}/blog` },
      ]

      fallback.push({ label: 'Medya', value: '-', icon: <ImageIcon className="h-5 w-5" />, href: `${hrefBase}/media` })
      setKpis(fallback)
      setStatistics([])
      setRecent([])
      setDataErrors(['Dashboard verileri'])
    } finally {
      setLoading(false)
    }
  }, [endpointBase, hrefBase, productsHref])

  useEffect(() => {
    void load()
  }, [load])

  const filteredRecent = filter.trim()
    ? recent.filter(
        (r) =>
          r.title.toLowerCase().includes(filter.toLowerCase()) ||
          r.type.toLowerCase().includes(filter.toLowerCase())
      )
    : recent

  const recentHighlights = ['Ürün', 'Blog', 'Medya']
    .map((type) => recent.find((item) => item.type === type))
    .filter((item): item is RecentItem => item !== undefined)

  const availableStatistics = statistics.filter(
    (item): item is StatisticItem & { value: number } => item.value !== null
  )
  const totalContent = availableStatistics.reduce((total, item) => total + item.value, 0)
  const maxStatistic = Math.max(...availableStatistics.map((item) => item.value), 1)

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="İçerik yönetim paneli özeti"
      actions={
        <Button variant="secondary" size="sm" icon={<RefreshCw className="h-4 w-4" />} onClick={() => void load()}>
          Yenile
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Link key={kpi.label} href={kpi.href ?? '#'}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {kpi.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                    {kpi.unavailable ? (
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-error">
                        <TriangleAlert className="h-4 w-4" /> Veri alınamadı
                      </p>
                    ) : (
                      <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}>
                  İstatistik Özeti
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Yayındaki içeriklerin güncel dağılımı</p>
              </div>
              {!loading && totalContent > 0 && (
                <Badge variant="outline" className="shrink-0">
                  {totalContent.toLocaleString('tr-TR')} kayıt
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              {!loading && dataErrors.length > 0 && (
                <div className="mb-5 flex items-start gap-3 rounded-lg border border-error/25 bg-error/10 px-4 py-3 text-sm text-error">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    <span className="font-medium">{dataErrors.join(', ')} alınamadı.</span>{' '}
                    Gösterilen toplam yalnızca erişilebilen servisleri kapsıyor.
                  </p>
                </div>
              )}
              {loading ? (
                <div className="space-y-6 py-4" aria-label="İstatistikler yükleniyor">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                      <div className="h-3 animate-pulse rounded-full bg-muted" />
                    </div>
                  ))}
                </div>
              ) : availableStatistics.length === 0 ? (
                <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
                  <p className="text-sm text-muted-foreground">
                    {dataErrors.length > 0 ? 'İstatistik verileri alınamadı' : 'Gösterilecek içerik verisi bulunamadı'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 py-2 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
                  <div
                    className="space-y-6"
                    role="img"
                    aria-label={`Toplam ${totalContent} içerik: ${availableStatistics
                      .map((item) => `${item.label} ${item.value}`)
                      .join(', ')}`}
                  >
                    {statistics.map((item) => {
                      if (item.value === null) {
                        return (
                          <div key={item.label} className="rounded-md" aria-label={`${item.label} verisi alınamadı`}>
                            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                              <span className="font-medium text-muted-foreground">{item.label}</span>
                              <span className="flex items-center gap-1.5 text-xs font-medium text-error">
                                <TriangleAlert className="h-3.5 w-3.5" /> Veri alınamadı
                              </span>
                            </div>
                            <div className="h-3 rounded-full border border-dashed border-error/40 bg-error/5" />
                          </div>
                        )
                      }

                      const share = totalContent > 0 ? Math.round((item.value / totalContent) * 100) : 0
                      const relativeWidth = (item.value / maxStatistic) * 100

                      return (
                        <Link key={item.label} href={item.href} className="group block rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40">
                          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                            <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                              {item.label}
                            </span>
                            <span className="tabular-nums text-muted-foreground">
                              <strong className="font-semibold text-foreground">{item.value.toLocaleString('tr-TR')}</strong>
                              {' · '}{share}%
                            </span>
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full transition-[width,filter] duration-500 group-hover:brightness-110"
                              style={{
                                width: item.value > 0 ? `${Math.max(relativeWidth, 2)}%` : '0%',
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="rounded-xl border border-border bg-muted/30 p-5 text-center md:text-left">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {dataErrors.length > 0 ? 'Erişilebilen toplam' : 'Toplam içerik'}
                    </p>
                    <p className="mt-2 text-4xl font-semibold tabular-nums text-foreground">
                      {totalContent.toLocaleString('tr-TR')}
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 md:block md:space-y-2">
                      {availableStatistics.map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Son Eklenenler</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {loading ? (
                  <li className="text-sm text-muted-foreground">Yükleniyor...</li>
                ) : dataErrors.includes('Blog verisi') ? (
                  <li className="flex items-center gap-2 text-sm text-error">
                    <TriangleAlert className="h-4 w-4" /> Blog verisi alınamadı
                  </li>
                ) : recent.length === 0 ? (
                  <li className="text-sm text-muted-foreground">Henüz içerik yok</li>
                ) : (
                  recentHighlights.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href} className="flex items-center justify-between gap-2 rounded-md py-1 text-sm hover:text-primary">
                      <span className="truncate">{item.title}</span>
                      <Badge variant="outline" className="shrink-0">
                        {item.type}
                      </Badge>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Son İçerikler</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Filtrele..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={[
                { key: 'title', label: 'Başlık' },
                { key: 'type', label: 'Tür' },
                {
                  key: 'date',
                  label: 'Tarih',
                  className: 'text-muted-foreground',
                },
              ]}
              data={filteredRecent.map((r) => ({
                title: r.title,
                type: <Badge variant="outline">{r.type}</Badge>,
                date: r.date ?? 'Tarih bilgisi yok',
              }))}
              stickyHeader
              emptyMessage="Filtreye uygun içerik bulunamadı"
              rowActions={(_, index) => (
                <TableRowAction
                  onClick={() => {
                    const item = filteredRecent[index]
                    if (item) router.push(item.href)
                  }}
                >
                  Görüntüle
                </TableRowAction>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
