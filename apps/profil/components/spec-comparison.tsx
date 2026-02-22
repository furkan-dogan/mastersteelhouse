import { profileProducts } from '@/lib/products'

export function SpecComparison() {
  return (
    <section id="uygulama" className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Karsilastirma</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900">Teknik Ozet Tablosu</h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Urun</th>
                <th className="px-4 py-3 font-semibold">Malzeme</th>
                <th className="px-4 py-3 font-semibold">Et Kalinligi</th>
                <th className="px-4 py-3 font-semibold">Standart Boy</th>
              </tr>
            </thead>
            <tbody>
              {profileProducts.map((item) => (
                <tr key={item.slug} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-900">{item.name}</td>
                  <td className="px-4 py-3 text-slate-700">{item.specs[0]?.value}</td>
                  <td className="px-4 py-3 text-slate-700">{item.specs[1]?.value}</td>
                  <td className="px-4 py-3 text-slate-700">{item.specs[2]?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
