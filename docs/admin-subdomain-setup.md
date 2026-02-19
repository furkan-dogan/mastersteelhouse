# Admin Subdomain Setup

## 1) Deploy ayrimi
- Web: `mastersteelhouse.com`
- Admin: `admin.mastersteelhouse.com`

Ayni repodan iki ayri Vercel proje olusturun:
- `mastersteelhouse-web` -> root `apps/web`
- `mastersteelhouse-admin` -> root `apps/admin`

## 2) DNS
- Cloudflare DNS'te `admin` icin `CNAME` kaydi olusturun.
- Hedef: Vercel'in verdigi domain (`cname.vercel-dns.com` veya proje alan adi).

## 3) Web env
`apps/web` proje env:
- `NEXT_PUBLIC_ADMIN_URL=https://admin.mastersteelhouse.com`

## 4) Admin env
`apps/admin` proje env:
- `ADMIN_USER=admin`
- `ADMIN_PASSWORD=admin123` (ilk kurulumdan sonra degistirin)
- `ADMIN_SESSION_SECRET=<uzun-rastgele-secret>`

## 5) Login
- Admin login sayfasi: `/login`
- Middleware tum admin route ve API'lerini korur.
- Public route:
  - `/login`
  - `/api/auth/login`

## 6) Lokal calisma
- Web: `pnpm --filter mastersteelhouse-web dev`
- Admin: `pnpm --filter mastersteelhouse-admin dev`
- Lokal web'de admin butonu local test icin env ile degistirilebilir:
  - `NEXT_PUBLIC_ADMIN_URL=http://localhost:3002`
