import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #b88700 100%)',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>Master Steel House</div>
        <div style={{ marginTop: 12, fontSize: 64, fontWeight: 700, color: '#facc15', lineHeight: 1.1 }}>Profil Sistemleri</div>
        <div style={{ marginTop: 32, fontSize: 34, color: '#e2e8f0', maxWidth: 900 }}>
          Delikli Alçı Köşe, Kaba Sıva ve Tavan U-C Profili Çözümleri
        </div>
      </div>
    ),
    size,
  )
}
