<<<<<<< Updated upstream
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
=======
# Master Steel House

Kurumsal web sitesi, profil sitesi ve yönetim panelini içeren monorepo yapı.

## İçerik
- `apps/web`: Kurumsal web sitesi
- `apps/profil`: Profil ürünleri sitesi
- `apps/admin`: Yönetim paneli

## Gereksinimler
- Node.js (LTS)
- pnpm (önerilir)
>>>>>>> Stashed changes

```bash
<<<<<<< Updated upstream
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
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
>>>>>>> Stashed changes
