type SiteSettings = {
  address?: string;
  email?: string;
  phone?: string;
  schedule?: string;
  socials?: {
    instagram?: string | null;
    facebook?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
  };
};

export function Footer({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer
      className="px-6 py-16"
      style={{ backgroundColor: 'var(--bg-elevated)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-3xl text-white mb-4">TOP SHOW PRO</p>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>{settings?.address}</p>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>{settings?.email}</p>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>{settings?.phone}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>
            Horario
          </p>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>{settings?.schedule}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>
            Redes
          </p>
          <div className="flex flex-col gap-2">
            {settings?.socials?.instagram && (
              <a href={settings.socials.instagram} className="font-sans text-sm transition" style={{ color: 'var(--text-muted)' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                Instagram
              </a>
            )}
            {settings?.socials?.facebook && (
              <a href={settings.socials.facebook} className="font-sans text-sm transition" style={{ color: 'var(--text-muted)' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                Facebook
              </a>
            )}
            {settings?.socials?.linkedin && (
              <a href={settings.socials.linkedin} className="font-sans text-sm transition" style={{ color: 'var(--text-muted)' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                LinkedIn
              </a>
            )}
            {settings?.socials?.youtube && (
              <a href={settings.socials.youtube} className="font-sans text-sm transition" style={{ color: 'var(--text-muted)' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      </div>
      <div
        className="max-w-7xl mx-auto mt-12 pt-6 text-center font-mono text-xs uppercase tracking-widest"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-faint)' }}
      >
        © {new Date().getFullYear()} Top Show Pro. Todos los derechos reservados.
      </div>
    </footer>
  );
}
