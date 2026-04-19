import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Hr,
  Link,
  Preview,
} from '@react-email/components';

type Props = {
  name: string;
  email: string;
  message: string;
  category?: string;
  phone?: string;
  company?: string;
};

export default function ContactEmail({ name, email, message, category, phone, company }: Props) {
  const date = new Date().toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </Head>
      <Preview>Nueva consulta de {name} — {category ?? 'General'}</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Text style={brand}>TOP SHOW PRO</Text>
            <Text style={brandSub}>Rental de tecnología para eventos</Text>
          </Section>

          {/* Badge categoría */}
          <Section style={{ padding: '24px 32px 0' }}>
            <Text style={badge}>{category ?? 'Consulta general'}</Text>
          </Section>

          {/* Título */}
          <Section style={{ padding: '8px 32px 0' }}>
            <Heading style={heading}>Nueva consulta recibida</Heading>
            <Text style={dateLine}>{date}</Text>
          </Section>

          <Hr style={divider} />

          {/* Datos de contacto */}
          <Section style={{ padding: '0 32px' }}>
            <Text style={sectionLabel}>DATOS DEL CONTACTO</Text>
            <Row style={fieldRow}>
              <Column style={fieldLabel}>Nombre</Column>
              <Column style={fieldValue}>{name}</Column>
            </Row>
            <Row style={fieldRow}>
              <Column style={fieldLabel}>Email</Column>
              <Column style={fieldValue}>
                <Link href={`mailto:${email}`} style={link}>{email}</Link>
              </Column>
            </Row>
            {phone && (
              <Row style={fieldRow}>
                <Column style={fieldLabel}>Teléfono</Column>
                <Column style={fieldValue}>
                  <Link href={`tel:${phone}`} style={link}>{phone}</Link>
                </Column>
              </Row>
            )}
            {company && (
              <Row style={fieldRow}>
                <Column style={fieldLabel}>Empresa</Column>
                <Column style={fieldValue}>{company}</Column>
              </Row>
            )}
          </Section>

          <Hr style={divider} />

          {/* Mensaje */}
          <Section style={{ padding: '0 32px 24px' }}>
            <Text style={sectionLabel}>MENSAJE</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>

          {/* CTA responder */}
          <Section style={{ padding: '0 32px 32px' }}>
            <Link href={`mailto:${email}?subject=Re: Consulta ${category ?? ''} - Top Show Pro`} style={ctaButton}>
              Responder a {name} →
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este mensaje fue enviado desde el formulario de contacto de{' '}
              <Link href="https://topshowpro.vercel.app" style={footerLink}>topshowpro.com.ar</Link>
            </Text>
            <Text style={footerText}>
              Top Show Pro · Av. Corrientes 1234, CABA · hola@topshowpro.com.ar
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── ESTILOS ─────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#0D0D0D',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: '32px 0',
};

const container: React.CSSProperties = {
  maxWidth: 600,
  margin: '0 auto',
  backgroundColor: '#131313',
  borderRadius: 4,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.06)',
};

const header: React.CSSProperties = {
  backgroundColor: '#0A0A0A',
  padding: '28px 32px',
  borderBottom: '2px solid #00BFFF',
};

const brand: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: '#FFFFFF',
  margin: 0,
  lineHeight: 1,
};

const brandSub: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.2em',
  color: '#5AA7E0',
  margin: '6px 0 0',
  textTransform: 'uppercase',
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'rgba(0,191,255,0.1)',
  color: '#00BFFF',
  border: '1px solid rgba(0,191,255,0.3)',
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  padding: '4px 10px',
  borderRadius: 2,
  margin: 0,
};

const heading: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 700,
  color: '#FFFFFF',
  margin: '12px 0 4px',
  lineHeight: 1.2,
};

const dateLine: React.CSSProperties = {
  fontSize: 12,
  color: '#7A7A7A',
  margin: '0 0 8px',
  textTransform: 'capitalize',
};

const divider: React.CSSProperties = {
  borderColor: 'rgba(255,255,255,0.06)',
  margin: '20px 0',
};

const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.2em',
  color: '#5AA7E0',
  textTransform: 'uppercase',
  margin: '0 0 12px',
};

const fieldRow: React.CSSProperties = {
  marginBottom: 10,
};

const fieldLabel: React.CSSProperties = {
  fontSize: 12,
  color: '#7A7A7A',
  width: 100,
  verticalAlign: 'top',
  paddingTop: 2,
};

const fieldValue: React.CSSProperties = {
  fontSize: 14,
  color: '#CCCCCC',
  fontWeight: 500,
};

const link: React.CSSProperties = {
  color: '#00BFFF',
  textDecoration: 'none',
};

const messageBox: React.CSSProperties = {
  fontSize: 14,
  color: '#CCCCCC',
  lineHeight: 1.7,
  backgroundColor: '#1A1A1A',
  padding: '16px 20px',
  borderRadius: 4,
  borderLeft: '3px solid #00BFFF',
  whiteSpace: 'pre-wrap',
  margin: 0,
};

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#00BFFF',
  color: '#000000',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.05em',
  padding: '12px 24px',
  borderRadius: 2,
  textDecoration: 'none',
};

const footer: React.CSSProperties = {
  backgroundColor: '#0A0A0A',
  padding: '20px 32px',
  borderTop: '1px solid rgba(255,255,255,0.06)',
};

const footerText: React.CSSProperties = {
  fontSize: 11,
  color: '#555555',
  margin: '0 0 4px',
  textAlign: 'center',
};

const footerLink: React.CSSProperties = {
  color: '#5AA7E0',
  textDecoration: 'none',
};
