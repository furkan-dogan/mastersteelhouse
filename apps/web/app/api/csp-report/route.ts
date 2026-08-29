import { NextRequest, NextResponse } from 'next/server'

// Lightweight first-party CSP violation sink. It only logs a truncated,
// non-sensitive summary to server logs — it never forwards the report
// anywhere, never stores full payloads, and caps body size to resist abuse.
const MAX_BODY_BYTES = 8 * 1024

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'Payload too large.' }, { status: 413 })
  }

  let raw: string
  try {
    raw = await request.text()
  } catch {
    return new NextResponse(null, { status: 204 })
  }

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'Payload too large.' }, { status: 413 })
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    const reports = Array.isArray(parsed) ? parsed : [parsed]

    for (const entry of reports.slice(0, 20)) {
      if (typeof entry !== 'object' || entry === null) continue
      const body = (entry as Record<string, unknown>).body ?? entry
      const violatedDirective =
        typeof body === 'object' && body !== null
          ? (body as Record<string, unknown>)['effectiveDirective'] ?? (body as Record<string, unknown>)['violated-directive']
          : undefined
      const blockedUrl =
        typeof body === 'object' && body !== null
          ? (body as Record<string, unknown>)['blockedURL'] ?? (body as Record<string, unknown>)['blocked-uri']
          : undefined

      console.warn('[csp-report]', { violatedDirective, blockedUrl })
    }
  } catch {
    // Not valid JSON — ignore rather than log arbitrary bytes.
  }

  return new NextResponse(null, { status: 204 })
}
