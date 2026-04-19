'use client';
import { motion } from 'framer-motion';
import { revealTextWords, staggerContainer } from '@/lib/motion';

export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span className={className} initial="hidden" animate="visible" variants={staggerContainer}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={revealTextWords} className="inline-block pr-2">{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
