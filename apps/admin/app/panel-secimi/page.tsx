'use client'

import Link from 'next/link'
import { Building2, Layers3 } from 'lucide-react'

export default function PanelSecimiPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#5f7f93_0%,_#3f5f73_42%,_#233848_100%)] p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <div className="w-full rounded-3xl border border-white/20 bg-white/92 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1c303e]/70">Master Steel House</p>
            <h1 className="mt-2 text-3xl font-bold text-[#1c303e]">Panel Seçimi</h1>
            <p className="mt-2 text-sm text-[#1c303e]/70">Lütfen yönetmek istediğiniz paneli seçin.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/dashboard"
              className="group rounded-2xl border border-[#1c303e]/10 bg-white p-6 transition hover:border-[#ffc527]/80 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc527]/20 text-[#1c303e]">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-[#1c303e]">Çelik Ev Admin</h2>
              <p className="mt-2 text-sm text-[#1c303e]/70">Mevcut içerik yönetim panelini aç.</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#b88700] group-hover:underline">Panele git →</span>
            </Link>

            <Link
              href="/profil-cms/dashboard"
              className="group rounded-2xl border border-[#1c303e]/10 bg-white p-6 transition hover:border-[#ffc527]/80 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc527]/20 text-[#1c303e]">
                <Layers3 className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-[#1c303e]">Profil Admin</h2>
              <p className="mt-2 text-sm text-[#1c303e]/70">Profil tarafı içerik yönetim panelini aç.</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#b88700] group-hover:underline">Detaya git →</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
