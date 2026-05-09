/**
 * EventAmbientBg
 * Renders a full-page ambient color wash derived from the event's hero image palette —
 * similar to how Spotify / YouTube Music tint their backgrounds with album art colors.
 *
 * This is a pure server component: no 'use client', no JS at runtime, zero flash.
 * Colors come from Sanity's auto-extracted image palette metadata.
 */

export interface SanityPaletteSwatch {
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
}

export interface SanityPalette {
  dominant?: SanityPaletteSwatch;
  vibrant?: SanityPaletteSwatch;
  darkVibrant?: SanityPaletteSwatch;
  muted?: SanityPaletteSwatch;
  darkMuted?: SanityPaletteSwatch;
  lightVibrant?: SanityPaletteSwatch;
  lightMuted?: SanityPaletteSwatch;
}

interface EventAmbientBgProps {
  palette?: SanityPalette | null;
}

/** Converts a hex color to an rgba string with specified opacity */
function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/** Darkens a hex color so it never looks washed out on a dark page */
export function getEventColors(
  palette: SanityPalette | null | undefined,
): { primary: string; secondary: string; tertiary: string } {
  const fallback = '#1785d3'; // design-system cyan
  const primary =
    palette?.darkVibrant?.background ||
    palette?.dominant?.background ||
    palette?.vibrant?.background ||
    fallback;
  const secondary =
    palette?.vibrant?.background ||
    palette?.dominant?.background ||
    fallback;
  const tertiary =
    palette?.darkMuted?.background ||
    palette?.muted?.background ||
    fallback;
  return { primary, secondary, tertiary };
}

export function EventAmbientBg({ palette }: EventAmbientBgProps) {
  const { primary, secondary, tertiary } = getEventColors(palette);

  return (
    <div
      aria-hidden="true"
      className="event-ambient-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Blob 1 — top-right: darkVibrant / dominant */}
      <div
        className="event-ambient-blob event-ambient-blob--a"
        style={{
          position: 'absolute',
          top: '-8%',
          right: '-4%',
          width: 'max(70vw, 420px)',
          height: 'max(70vw, 420px)',
          maxWidth: '900px',
          maxHeight: '900px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${hexToRgba(primary, 0.42)} 0%, ${hexToRgba(primary, 0.18)} 40%, transparent 70%)`,
          filter: 'blur(90px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 2 — center-left: vibrant */}
      <div
        className="event-ambient-blob event-ambient-blob--b"
        style={{
          position: 'absolute',
          top: '25%',
          left: '-6%',
          width: 'max(55vw, 320px)',
          height: 'max(55vw, 320px)',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${hexToRgba(secondary, 0.32)} 0%, ${hexToRgba(secondary, 0.12)} 45%, transparent 72%)`,
          filter: 'blur(100px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 3 — bottom-right: muted */}
      <div
        className="event-ambient-blob event-ambient-blob--c"
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '-2%',
          width: 'max(45vw, 280px)',
          height: 'max(45vw, 280px)',
          maxWidth: '600px',
          maxHeight: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${hexToRgba(tertiary, 0.28)} 0%, ${hexToRgba(tertiary, 0.10)} 50%, transparent 75%)`,
          filter: 'blur(110px)',
          willChange: 'transform',
        }}
      />

      {/* Dark vignette so text always remains legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.55) 100%)',
        }}
      />
    </div>
  );
}

