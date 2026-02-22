import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Sayfa bulunamadi</h1>
        <p className="mt-2 text-sm text-slate-600">Aradiginiz sayfa tasinmis veya kaldirilmis olabilir.</p>
        <Link href="/" className="mt-5 inline-flex rounded-lg bg-[#eab308] px-4 py-2 text-sm font-semibold text-black hover:bg-[#facc15] transition">
          Anasayfaya Don
        </Link>
      </div>
    </main>
  )
}
