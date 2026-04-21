'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { modalLedOpen } from '@/lib/motion';

type LedDisplayProps = {
  images: { url: string }[];
  title?: string;
};

export function LedDisplay({ images, title }: LedDisplayProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;

  return (
    <>
      <button
        onClick={() => { setCurrent(0); setOpen(true); }}
        className="relative block w-full aspect-video overflow-hidden group"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <Image
          src={images[0].url}
          alt={title ?? 'Gallery'}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          style={{ backgroundColor: 'rgba(23,133,211,0.1)' }}>
          <span className="font-mono text-xs uppercase tracking-widest text-white">Ver galería</span>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(23,133,211,0.03) 2px, rgba(23,133,211,0.03) 4px)',
          }}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-4xl w-full p-0 overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(23,133,211,0.2)' }}
        >
          <DialogTitle className="sr-only">{title ?? 'Galería'}</DialogTitle>
          <motion.div
            variants={modalLedOpen}
            initial="hidden"
            animate="visible"
          >
            <div className="relative aspect-video">
              <Image
                src={images[current].url}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(23,133,211,0.05) 2px, rgba(23,133,211,0.05) 4px)',
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto" style={{ backgroundColor: 'var(--bg-base)' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="relative flex-shrink-0 w-16 h-12 overflow-hidden transition"
                    style={{
                      border: i === current ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                      opacity: i === current ? 1 : 0.5,
                    }}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
