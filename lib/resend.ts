import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  category?: string;
  phone?: string;
  company?: string;
};

export async function sendContactEmail(params: ContactPayload) {
  if (!resend) {
    return { ok: false, error: 'Email service not configured' };
  }

  const from = process.env.RESEND_FROM || 'Top Show Pro <onboarding@resend.dev>';
  const to = process.env.RESEND_TO || 'info@topshowpro.com.ar';

  const date = new Date().toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = buildEmail({ ...params, date });

  await resend.emails.send({
    from,
    to,
    replyTo: params.email,
    subject: `Nueva consulta: ${params.category ?? 'General'} - ${params.name}`,
    html,
  });

  return { ok: true };
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:6px 16px 6px 0;font-size:12px;color:#7A7A7A;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:6px 0;font-size:14px;color:#CCCCCC;font-weight:500">${value}</td>
    </tr>`;
}

function buildEmail(p: ContactPayload & { date: string }): string {
  const fields = [
    row('Nombre', p.name),
    row('Email', `<a href="mailto:${p.email}" style="color:#1785d3;text-decoration:none">${p.email}</a>`),
    p.phone ? row('Tel&eacute;fono', `<a href="tel:${p.phone}" style="color:#1785d3;text-decoration:none">${p.phone}</a>`) : '',
    p.company ? row('Empresa', p.company) : '',
  ].join('');

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva consulta - Top Show Pro</title>
</head>
<body style="margin:0;padding:32px 0;background-color:#0D0D0D;font-family:Helvetica Neue,Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#131313;border:1px solid rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">

          <!-- Header -->
          <tr>
            <td style="background-color:#0A0A0A;padding:28px 32px;border-bottom:2px solid #1785d3">
              <div style="font-size:22px;font-weight:700;letter-spacing:0.15em;color:#FFFFFF;line-height:1">TOP SHOW PRO</div>
              <div style="font-size:11px;letter-spacing:0.2em;color:#5AA7E0;margin-top:6px;text-transform:uppercase">Rental de tecnolog&iacute;a para eventos</div>
            </td>
          </tr>

          <!-- Badge + Título -->
          <tr>
            <td style="padding:24px 32px 0">
              <span style="display:inline-block;background-color:rgba(23,133,211,0.1);color:#1785d3;border:1px solid rgba(23,133,211,0.3);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:4px 10px;border-radius:2px">${p.category ?? 'Consulta general'}</span>
              <h1 style="font-size:26px;font-weight:700;color:#FFFFFF;margin:12px 0 4px;line-height:1.2">Nueva consulta recibida</h1>
              <p style="font-size:12px;color:#7A7A7A;margin:0;text-transform:capitalize">${p.date}</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:20px 32px"><hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:0" /></td></tr>

          <!-- Datos -->
          <tr>
            <td style="padding:0 32px">
              <p style="font-size:10px;letter-spacing:0.2em;color:#5AA7E0;text-transform:uppercase;margin:0 0 12px">Datos del contacto</p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${fields}
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:20px 32px"><hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:0" /></td></tr>

          <!-- Mensaje -->
          <tr>
            <td style="padding:0 32px 24px">
              <p style="font-size:10px;letter-spacing:0.2em;color:#5AA7E0;text-transform:uppercase;margin:0 0 12px">Mensaje</p>
              <div style="font-size:14px;color:#CCCCCC;line-height:1.7;background-color:#1A1A1A;padding:16px 20px;border-radius:4px;border-left:3px solid #1785d3;white-space:pre-wrap">${p.message}</div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 32px">
              <a href="mailto:${p.email}?subject=Re: ${encodeURIComponent(`Consulta ${p.category ?? ''} - Top Show Pro`)}" style="display:inline-block;background-color:#1785d3;color:#000000;font-size:13px;font-weight:600;letter-spacing:0.05em;padding:12px 24px;border-radius:2px;text-decoration:none">Responder a ${p.name} &rarr;</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0A0A0A;padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06)">
              <p style="font-size:11px;color:#555555;margin:0 0 4px;text-align:center">Este mensaje fue enviado desde el formulario de contacto de <a href="https://topshowpro.vercel.app" style="color:#5AA7E0;text-decoration:none">topshowpro.com.ar</a></p>
              <p style="font-size:11px;color:#555555;margin:0;text-align:center">Top Show Pro &middot; hola@topshowpro.com.ar</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
