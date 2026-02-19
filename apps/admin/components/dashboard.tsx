'use client'

import { useCallback, useEffect, useState } from 'react'
import { Package, BookOpenText, Newspaper, Image as ImageIcon, BarChart3, Search, RefreshCw } from 'lucide-react'
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

export function Dashboard() {
  const router = useRouter()
  const [kpis, setKpis] = useState<Kpi[]>([])
  const [recent, setRecent] = useState<RecentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  const load = useCallback(async () => {
    try {
      const [productsRes, blogRes, newsRes, mediaRes] = await Promise.all([
        fetch('/api/products', { cache: 'no-store' }),
        fetch('/api/blog', { cache: 'no-store' }),
        fetch('/api/news', { cache: 'no-store' }),
        fetch('/api/media', { cache: 'no-store' }),
      ])

      const products = productsRes.ok ? ((await productsRes.json()) as { products?: unknown[] }) : null
      const blog = blogRes.ok ? ((await blogRes.json()) as { posts?: { slug: string; title: string; date?: string }[] }) : null
      const news = newsRes.ok ? ((await newsRes.json()) as { posts?: { slug: string; title: string; date?: string }[] }) : null
      const media = mediaRes.ok ? ((await mediaRes.json()) as { items?: unknown[] }) : null

      setKpis([
        {
          label: 'Toplam Ürün',
          value: products?.products?.length ?? 0,
          icon: <Package className="h-5 w-5" />,
          href: '/',
        },
        {
          label: 'Blog Yazıları',
          value: blog?.posts?.length ?? 0,
          icon: <BookOpenText className="h-5 w-5" />,
          href: '/blog',
        },
        {
          label: 'Haberler',
          value: news?.posts?.length ?? 0,
          icon: <Newspaper className="h-5 w-5" />,
          href: '/news',
        },
        {
          label: 'Medya Dosyası',
          value: media?.items?.length ?? 0,
          icon: <ImageIcon className="h-5 w-5" />,
          href: '/media',
        },
      ])

      const items: RecentItem[] = []
      blog?.posts?.slice(0, 5).forEach((p) => {
        items.push({ id: `blog-${p.slug}`, title: p.title, type: 'Blog', date: p.date })
      })
      news?.posts?.slice(0, 5).forEach((n) => {
        items.push({ id: `news-${n.slug}`, title: n.title, type: 'Haber', date: n.date })
      })
      setRecent(items.slice(0, 8))
    } catch {
      setKpis([
        { label: 'Ürünler', value: '-', icon: <Package className="h-5 w-5" />, href: '/' },
        { label: 'Blog', value: '-', icon: <BookOpenText className="h-5 w-5" />, href: '/blog' },
        { label: 'Haberler', value: '-', icon: <Newspaper className="h-5 w-5" />, href: '/news' },
        { label: 'Medya', value: '-', icon: <ImageIcon className="h-5 w-5" />, href: '/media' },
      ])
    } finally {
      setLoading(false)
    }
  }, [])

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
        {/* KPI Cards */}
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

        {/* Chart placeholder + Recent */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}>
                İstatistik Özeti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
                <p className="text-sm text-muted-foreground">Chart alanı (placeholder)</p>
              </div>
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

        {/* List with FilterBar + Table */}
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
                    if (item?.type === 'Blog') router.push('/blog')
                    else if (item?.type === 'Haber') router.push('/news')
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
