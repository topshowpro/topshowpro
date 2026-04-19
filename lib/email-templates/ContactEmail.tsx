import { Html, Body, Container, Heading, Text, Hr } from '@react-email/components';

export default function ContactEmail({
  name,
  email,
  company,
  phone,
  category,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  category?: string;
  message: string;
}) {
  return (
    <Html>
      <Body style={{ background: '#0A0A0A', color: '#FFFFFF', fontFamily: 'system-ui' }}>
        <Container style={{ padding: 32, maxWidth: 600 }}>
          <Heading style={{ color: '#00BFFF' }}>Nueva consulta de {category}</Heading>
          <Text>
            <strong>{name}</strong> ({email})
          </Text>
          <Text>Empresa: {company ?? '-'}</Text>
          <Text>Teléfono: {phone ?? '-'}</Text>
          <Hr />
          <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
