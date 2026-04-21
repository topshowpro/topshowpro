import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end?: string) {
  const s = new Date(start + 'T12:00:00Z').toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
  if (!end) return s;
  const e = new Date(end + 'T12:00:00Z').toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
  return `${s} — ${e}`;
}
