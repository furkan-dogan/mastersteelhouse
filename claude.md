# Master Steel House - Claude Hızlı Anlama Rehberi

Bu dosya, Claude'un bu repoyu gereksiz token harcamadan hızlıca kavraması için hazırlanmıştır.

## 1) Özel Komut Kuralı

Eğer kullanıcı şu komutu verirse:

`projeyi anla ve anladım de bana`

Claude aşağıdaki kısa protokolü uygular:

1. Sadece "Hızlı Okuma Rotası" bölümündeki dosyaları okur.
2. "Atlanacak Yerler" bölümündeki klasör/dosyaları ilk turda hiç taramaz.
3. Çıktı formatı:
   - İlk satır: `Anladım.`
   - Devamında en fazla 6 madde:
     - repo tipi
     - app'ler
     - veri kaynağı/CMS akışı
     - auth/media
     - önemli env'ler
     - gerekiyorsa 1 risk/not
4. Kod satırı satırı analiz, tüm component taraması, tüm route dosyalarının açılması yapılmaz.

## 2) Hızlı Okuma Rotası (İlk Tur)

Sırayla sadece bu dosyaları oku:

1. `README.md`
2. `package.json`
3. `pnpm-workspace.yaml`
4. `apps/web/package.json`
5. `apps/admin/package.json`
6. `apps/profil/package.json`
7. `apps/web/lib/cms-fetch.ts`
8. `apps/web/lib/cms-store.ts`
9. `apps/profil/lib/profile-content.ts`
10. `apps/admin/lib/r2-storage.ts`
11. `apps/admin/lib/auth.ts`
12. `apps/admin/middleware.ts`
13. `apps/admin/lib/*store.ts` (sadece dosya adları + `_cms/*.json` key eşleşmeleri)
14. `content/` altındaki JSON/Ts dosya adları
15. `apps/*/app` altındaki route listesi (sadece dosya isimleri)

Bu turdan sonra proje mimarisini anlamak için yeterli bağlam oluşur.

## 3) Atlanacak Yerler (Token Tasarrufu)

`projeyi anla` gibi ilk keşif görevlerinde bu alanları tarama:

1. `node_modules/`
2. `.next/` (ör: `apps/*/.next/`)
3. `.git/` (özellikle `objects/pack`)
4. `apps/web/public/` içindeki görsel/video/pdf dosyaları
5. `apps/profil/public/` içindeki görsel/video dosyaları
6. `apps/web/public/uploads/media/` (binary medya)
7. `pnpm-lock.yaml` (sorun paket çözümleme değilse)
8. `.DS_Store` ve benzeri sistem dosyaları
9. `sentry*.config.js` (sadece observability/sourcemap konusu yoksa)
10. `apps/*/components/ui/*` (ilk turda tekrarlı UI primitive'leri gereksiz)

Not: Sadece kullanıcı özel olarak isterse bu alanlara in.

## 4) Proje Haritası (Monorepo)

```txt
mastersteelhouse/
├─ apps/
│  ├─ web/        # Kurumsal site (Next.js App Router)
│  │  ├─ app/     # Sayfa rotaları
│  │  ├─ components/
│  │  ├─ lib/     # cms-fetch + katalog katmanı
│  │  └─ public/
│  ├─ admin/      # CMS/Admin paneli (Next.js)
│  │  ├─ app/
│  │  │  ├─ api/  # CRUD + public endpointler
│  │  │  └─ ...   # panel sayfaları
│  │  ├─ lib/     # store katmanı, auth, R2, media yardımcıları
│  │  └─ components/
│  └─ profil/     # Profil ürünleri sitesi (Next.js)
│     ├─ app/
│     ├─ components/
│     ├─ lib/     # profile-content okuyucuları
│     └─ public/
├─ content/       # CMS JSON kaynakları (web + profil)
├─ packages/
│  └─ shared-content/
└─ docs/
```

## 5) Veri Akışı (Kısa)

1. Admin panel (`apps/admin`) içerikleri `apps/admin/lib/*store.ts` ile yönetir.
2. R2 env varsa JSON veriler `_cms/*.json` key'lerine yazılır/okunur.
3. R2 yoksa yerel fallback: `content/*.json`.
4. Web (`apps/web/lib/cms-fetch.ts`) dev'de admin public API'den veya R2'den okur; olmazsa `content/` fallback.
5. Profil (`apps/profil/lib/profile-content.ts`) benzer şekilde R2 `_cms/*.json` veya `content/` kullanır.

## 6) Kritik İçerik Dosyaları

Web odaklı:

- `content/products-cms.json`
- `content/blog-cms.json`
- `content/references-cms.json`
- `content/videos-cms.json`
- `content/catalogs-cms.json`
- `content/documents-cms.json`
- `content/media-cms.json`

Profil odaklı:

- `content/profile-products-cms.json`
- `content/profile-blog-cms.json`
- `content/profile-news-cms.json`
- `content/profile-faq-cms.json`
- `content/profile-media-cms.json`
- `content/profile-documents-cms.json`
- `content/profile-catalogs-cms.json`
- `content/profile-videos-cms.json`
- `content/profile-references-cms.json`

## 7) Route Özeti

Web:

- `/`
- `/kurumsal/*`
- `/uretim/*`
- `/proje-sureci/*`
- `/urunler/[category]` ve `/urunler/[category]/[slug]`
- `/medya/blog`, `/medya/blog/[slug]`, `/medya/videolar`
- `/referanslar`, `/iletisim`, `/kvkk`, `/gizlilik-politikasi`

Profil:

- `/`
- `/urunler`, `/urunler/[slug]`
- `/kurumsal/*`
- `/medya/blog`, `/medya/blog/[slug]`, `/medya/videolar`, `/medya/kataloglar`
- `/referanslar`, `/iletisim`, `/kvkk`, `/gizlilik-politikasi`, `/sss`

Admin:

- `/login`, `/panel-secimi`, `/dashboard`, `/products`, `/references`, `/videos`, `/blog`, `/catalogs`, `/documents`, `/media`
- `/profil-cms/*`
- `/api/*` (yetkili)
- `/api/public/*` (web/profil tüketimi için açık GET endpointleri)

## 8) Önemli Env Değişkenleri

CMS ve storage:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_R2_PUBLIC_BASE_URL`
- `WEB_DEV_ADMIN_API_BASE`
- `WEB_DEV_MEDIA_PROXY_BASE`
- `CMS_REVALIDATE_SECONDS`
- `CMS_FORCE_NO_STORE`

Admin auth:

- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Site/analytics:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PROFILE_SITE_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_YANDEX_SITE_VERIFICATION`

## 9) Hızlı Çalıştırma

```bash
pnpm install
pnpm dev:web
pnpm dev:admin
pnpm dev:profil
```

