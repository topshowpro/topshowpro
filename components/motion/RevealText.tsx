'use client';
import { motion } from 'framer-motion';
import { revealTextWords, staggerContainer } from '@/lib/motion';

export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0 0.25em' }}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {words.map((w, i) => {
        const isItalic = w.endsWith('.') || w.includes('!!!'); // simple heuristic or can be expanded
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom py-[2.5em] my-[-2.5em] px-[1em] mx-[-1em]">
            <motion.span 
              variants={revealTextWords} 
              className={`inline-block ${isItalic ? 'italic' : ''}`}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
