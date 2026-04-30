'use client';

import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(
  () => import('@/components/ui/WhatsAppButton').then((module) => module.WhatsAppButton),
  { ssr: false },
);

export function LazyWhatsAppButton() {
  return <WhatsAppButton />;
}
