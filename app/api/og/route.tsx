import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Top Show Pro';
  const subtitle = searchParams.get('subtitle') ?? 'Rental de tecnología para eventos';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #131313 70%, #00BFFF 200%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 80,
            color: 'white',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 32, color: '#5AA7E0', marginTop: 16 }}>{subtitle}</div>
        <div
          style={{
            fontSize: 18,
            color: '#00BFFF',
            marginTop: 40,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Top Show Pro
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
