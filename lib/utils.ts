import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end?: string) {
  const s = new Date(start).toLocaleDateString('es-AR');
  if (!end) return s;
  const e = new Date(end).toLocaleDateString('es-AR');
  return `${s} — ${e}`;
}
