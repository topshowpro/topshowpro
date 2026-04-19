import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
  category?: string;
  phone?: string;
  company?: string;
}) {
  if (!resend) {
    console.log('[Resend mock] contact form payload:', params);
    return { ok: true, mock: true };
  }
  const from = process.env.RESEND_FROM || 'Top Show Pro <onboarding@resend.dev>';
  const to = process.env.RESEND_TO || 'contacto@topshowpro.com';
  await resend.emails.send({
    from,
    to,
    subject: `Nueva consulta: ${params.category ?? 'General'}`,
    html: `<p><strong>${params.name}</strong> (${params.email})</p>
           <p>Empresa: ${params.company ?? '-'}<br/>Tel: ${params.phone ?? '-'}</p>
           <p>${params.message}</p>`,
  });
  return { ok: true };
}
