'use client'

import { useCallback, useEffect, useState } from 'react'
import { Package, BookOpenText, Image as ImageIcon, BarChart3, Search, RefreshCw } from 'lucide-react'
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
}

type RecentItem = {
  id: string
  title: string
  type: string
  date?: string
}

type StatisticItem = {
  label: string
  value: number
  href: string
  color: string
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
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const isProfileCms = hrefBase === '/profil-cms'
  const productsHref = isProfileCms ? '/profil-cms' : '/products'

  const load = useCallback(async () => {
    setLoading(true)

    try {
      const responses = await Promise.all([
        fetch(`${endpointBase}/products`, { cache: 'no-store' }),
        fetch(`${endpointBase}/blog`, { cache: 'no-store' }),
        fetch(`${endpointBase}/media`, { cache: 'no-store' }),
      ])
      const [productsRes, blogRes, mediaRes] = responses

      const products = productsRes.ok ? ((await productsRes.json()) as { products?: unknown[] }) : null
      const blog = blogRes.ok ? ((await blogRes.json()) as { posts?: { slug: string; title: string; date?: string }[] }) : null
      const media = mediaRes.ok ? ((await mediaRes.json()) as { items?: unknown[] }) : null
      const productCount = products?.products?.length ?? 0
      const blogCount = blog?.posts?.length ?? 0
      const mediaCount = media?.items?.length ?? 0

      const nextKpis: Kpi[] = [
        {
          label: 'Toplam Ürün',
          value: productCount,
          icon: <Package className="h-5 w-5" />,
          href: productsHref,
        },
        {
          label: 'Blog Yazıları',
          value: blogCount,
          icon: <BookOpenText className="h-5 w-5" />,
          href: `${hrefBase}/blog`,
        },
      ]

      nextKpis.push({
        label: 'Medya Dosyası',
        value: mediaCount,
        icon: <ImageIcon className="h-5 w-5" />,
        href: `${hrefBase}/media`,
      })

      setKpis(nextKpis)
      setStatistics([
        { label: 'Ürünler', value: productCount, href: productsHref, color: '#0872c9' },
        { label: 'Blog yazıları', value: blogCount, href: `${hrefBase}/blog`, color: '#8b5cf6' },
        { label: 'Medya dosyaları', value: mediaCount, href: `${hrefBase}/media`, color: '#10b981' },
      ])

      const items: RecentItem[] = []
      blog?.posts?.slice(0, 5).forEach((p) => {
        items.push({ id: `blog-${p.slug}`, title: p.title, type: 'Blog', date: p.date })
      })

      setRecent(items.slice(0, 8))
    } catch {
      const fallback: Kpi[] = [
        { label: 'Ürünler', value: '-', icon: <Package className="h-5 w-5" />, href: productsHref },
        { label: 'Blog', value: '-', icon: <BookOpenText className="h-5 w-5" />, href: `${hrefBase}/blog` },
      ]

      fallback.push({ label: 'Medya', value: '-', icon: <ImageIcon className="h-5 w-5" />, href: `${hrefBase}/media` })
      setKpis(fallback)
      setStatistics([])
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

  const totalContent = statistics.reduce((total, item) => total + item.value, 0)
  const maxStatistic = Math.max(...statistics.map((item) => item.value), 1)

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
                    <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>
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
              {loading ? (
                <div className="space-y-6 py-4" aria-label="İstatistikler yükleniyor">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                      <div className="h-3 animate-pulse rounded-full bg-muted" />
                    </div>
                  ))}
                </div>
              ) : totalContent === 0 ? (
                <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
                  <p className="text-sm text-muted-foreground">Gösterilecek içerik verisi bulunamadı</p>
                </div>
              ) : (
                <div className="grid gap-8 py-2 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
                  <div
                    className="space-y-6"
                    role="img"
                    aria-label={`Toplam ${totalContent} içerik: ${statistics
                      .map((item) => `${item.label} ${item.value}`)
                      .join(', ')}`}
                  >
                    {statistics.map((item) => {
                      const share = Math.round((item.value / totalContent) * 100)
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
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Toplam içerik</p>
                    <p className="mt-2 text-4xl font-semibold tabular-nums text-foreground">
                      {totalContent.toLocaleString('tr-TR')}
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 md:block md:space-y-2">
                      {statistics.map((item) => (
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
                ) : recent.length === 0 ? (
                  <li className="text-sm text-muted-foreground">Henüz içerik yok</li>
                ) : (
                  recent.slice(0, 5).map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="truncate text-foreground">{item.title}</span>
                      <Badge variant="outline" className="shrink-0">
                        {item.type}
                      </Badge>
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
                date: r.date ?? '-',
              }))}
              stickyHeader
              emptyMessage="Filtreye uygun içerik bulunamadı"
              rowActions={(_, index) => (
                <TableRowAction
                  onClick={() => {
                    const item = filteredRecent[index]
                    if (item?.type === 'Blog') router.push(`${hrefBase}/blog`)
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
