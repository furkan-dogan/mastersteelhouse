'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, User } from 'lucide-react'
import FloatingLines from '@/components/floating-lines'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = useMemo(() => searchParams.get('next') || '/', [searchParams])
  const enabledWaves = useMemo<Array<'top' | 'middle' | 'bottom'>>(() => ['top', 'middle', 'bottom'], [])
  const linesGradient = useMemo(() => ['#1f4f6b', '#2c6f8c', '#ffc527'], [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = (await response.json()) as { message?: string }
      if (!response.ok) {
        setError(data.message || 'Giriş başarısız.')
        return
      }
      router.push(nextPath)
      router.refresh()
    } catch {
      setError('Giriş sırasında hata oluştu.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#5f7f93_0%,_#3f5f73_42%,_#233848_100%)] p-4">
      <div className="pointer-events-none absolute inset-0">
        <FloatingLines
          enabledWaves={enabledWaves}
          lineCount={5}
          lineDistance={6}
          bendRadius={5}
          bendStrength={-0.5}
          interactive
          parallax
          parallaxStrength={0.2}
          linesGradient={linesGradient}
          mixBlendMode="screen"
        />
      </div>
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/92 p-6 shadow-2xl backdrop-blur-md">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1c303e]/70">Master Steel House</p>
          <h1 className="text-2xl font-bold text-[#1c303e]">Admin Girişi</h1>
          <p className="text-sm text-[#1c303e]/70">Yetkili hesabınızla giriş yapın.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <div className="flex items-center gap-2 rounded-lg border border-[#1c303e]/15 bg-white px-3 transition-colors focus-within:border-[#ffc527]">
              <User className="h-4 w-4 text-[#1c303e]/60" />
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="h-11 w-full bg-transparent text-sm outline-none"
                autoComplete="username"
                placeholder="Kullanıcı adı"
                required
              />
            </div>
          </label>

          <label className="block space-y-1.5">
            <div className="flex items-center gap-2 rounded-lg border border-[#1c303e]/15 bg-white px-3 transition-colors focus-within:border-[#ffc527]">
              <Lock className="h-4 w-4 text-[#1c303e]/60" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 w-full bg-transparent text-sm outline-none"
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          {error ? (
            <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-lg bg-[#ffc527] text-sm font-semibold text-[#1c303e] transition-colors hover:bg-[#f0b300] disabled:opacity-60"
          >
            {submitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </main>
  )
}
