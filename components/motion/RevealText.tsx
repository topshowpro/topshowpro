'use client';

export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0 0.25em' }}>
      {words.map((word, index) => {
        const isItalic = word.endsWith('.') || word.includes('!!!');

        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom py-[2.5em] my-[-2.5em] px-[1em] mx-[-1em]">
            <span
              className={`inline-block reveal-word ${isItalic ? 'italic' : ''}`}
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}
