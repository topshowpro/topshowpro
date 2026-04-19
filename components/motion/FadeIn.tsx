'use client';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion';

export function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={fadeIn}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
