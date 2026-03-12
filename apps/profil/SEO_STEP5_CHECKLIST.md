# SEO Step 5 - Yayın Öncesi Doğrulama (Profil Web)

Bu adım, teknik kurgu sonrası canlıya çıkmadan önce doğrulama ve izleme kurulumlarını tamamlamak içindir.

## 1) Search Console / Bing doğrulama

Vercel Environment Variables:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION=...`
- `NEXT_PUBLIC_YANDEX_SITE_VERIFICATION=...`

Not: Değerler boş bırakılırsa meta tag üretilmez.

## 2) Sitemap ve robots doğrulama

Canlıda şu URL’leri kontrol et:

- `/robots.txt`
- `/sitemap.xml`

Beklenti:
- robots içinde sitemap URL görünmeli
- sitemap içinde ürün + blog detay sayfaları listelenmeli

## 3) Rich Results / Schema doğrulama

Google Rich Results Test ile kontrol edilecek sayfalar:

- `/`
- `/urunler`
- `/urunler/delikli-alci-kose-profili`
- `/medya/blog`
- `/medya/blog/<slug>`
- `/sss`

Beklenti:
- Product, FAQPage, BlogPosting, BreadcrumbList parse edilmeli

## 4) Sosyal paylaşım önizleme

Kontrol URL’leri:

- `/opengraph-image`
- `/twitter-image`

Beklenti:
- 1200x630 görsel doğru render olmalı
- paylaşım preview’larında başlık/açıklama/görsel uyumlu olmalı

## 5) İç link ve crawl

Elle kontrol:

- Blog liste -> blog detay linkleri çalışıyor mu
- Ürün liste -> ürün detay linkleri çalışıyor mu
- Detay sayfalardan ilgili sayfalara dönüş linkleri var mı

## 6) Son doğrulama komutları

```bash
corepack pnpm --filter mastersteelhouse-profil build
```
