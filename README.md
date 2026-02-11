# Master Steel House

Kurumsal web sitesi, profil sitesi ve yönetim panelini içeren monorepo yapı.

## İçerik
- `apps/web`: Kurumsal web sitesi
- `apps/profil`: Profil ürünleri sitesi
- `apps/admin`: Yönetim paneli

## Gereksinimler
- Node.js (LTS)
- pnpm (önerilir)

```bash
pnpm install
```

## Geliştirme
```bash
pnpm --filter mastersteelhouse-web dev
pnpm --filter mastersteelhouse-admin dev
pnpm --filter mastersteelhouse-profil dev
```

## Build
```bash
pnpm --filter mastersteelhouse-web build
pnpm --filter mastersteelhouse-admin build
pnpm --filter mastersteelhouse-profil build
```

## Ortam Değişkenleri
Gerekli değişkenleri ilgili uygulamanın `.env.local` dosyasına ekleyin.

Örnek:
```
MONGODB_URI=...
MONGODB_DB=mastersteelhouse
ADMIN_USER=...
ADMIN_PASSWORD=...
MEDIA_SERVER_URL=...
```

## Medya Sunucusu
Medya yüklemeleri VPS üzerindeki medya sunucusuna yönlendirilir. Admin panelindeki Medya Merkezi, bu sunucudaki dosyaları listeler ve yönetir.

## Notlar
- `.env` dosyaları `.gitignore` içindedir.
- Prod ortamda env değerlerini Vercel’den tanımlayın.
