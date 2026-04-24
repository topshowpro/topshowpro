import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/resend';
import { verifyTurnstile } from '@/lib/turnstile';
import { sanityClient } from '@/sanity/lib/client';

const schema = z.object({
  category: z.string(),
  name: z.string().min(2),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(10),
  turnstileToken: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const shouldEnforceCaptcha = Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
    if (shouldEnforceCaptcha) {
      const okCaptcha = await verifyTurnstile(data.turnstileToken);
      if (!okCaptcha) return NextResponse.json({ error: 'Captcha inválido' }, { status: 400 });
    }

    if (sanityClient && process.env.SANITY_API_WRITE_TOKEN) {
      const writeClient = sanityClient.withConfig({
        token: process.env.SANITY_API_WRITE_TOKEN,
        useCdn: false,
      });
      await writeClient.create({
        _type: 'lead',
        ...data,
        createdAt: new Date().toISOString(),
        read: false,
      });
    }

    await sendContactEmail(data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error', err);
    return NextResponse.json({ error: 'Error procesando' }, { status: 500 });
  }
}
