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
          <span key={i} className="inline-block overflow-hidden align-bottom py-[0.8em] my-[-0.8em] px-[0.4em] mx-[-0.4em]">
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
