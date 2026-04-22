import Image from 'next/image';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

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
    <footer className="bg-bg-elevated border-t border-white/5 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image
            src="/Top-show-pro_logo.png"
            alt="Top Show Pro"
            width={160}
            height={40}
            loading="lazy"
            className="h-8 w-auto mb-4"
            style={{ filter: 'invert(1) hue-rotate(180deg)' }}
          />
          <p className="font-sans text-sm text-fg-muted">{settings?.address}</p>
          <p className="font-sans text-sm text-fg-muted">{settings?.email}</p>
          <p className="font-sans text-sm text-fg-muted">{settings?.phone}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-fg-faint mb-4">Horario</p>
          <p className="font-sans text-sm text-fg-muted">{settings?.schedule}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-fg-faint mb-4">Redes</p>
          <div className="flex flex-row gap-5">
            {settings?.socials?.instagram && (
              <a 
                href={settings.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent-cyan hover:scale-110 transition-all duration-300" 
                aria-label="Instagram"
              >
                <Instagram size={22} strokeWidth={1.5} />
              </a>
            )}
            {settings?.socials?.facebook && (
              <a 
                href={settings.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent-cyan hover:scale-110 transition-all duration-300" 
                aria-label="Facebook"
              >
                <Facebook size={22} strokeWidth={1.5} />
              </a>
            )}
            {settings?.socials?.linkedin && (
              <a 
                href={settings.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent-cyan hover:scale-110 transition-all duration-300" 
                aria-label="LinkedIn"
              >
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
            )}
            {settings?.socials?.youtube && (
              <a 
                href={settings.socials.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent-cyan hover:scale-110 transition-all duration-300" 
                aria-label="YouTube"
              >
                <Youtube size={22} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center font-mono text-xs text-fg-faint uppercase tracking-widest">
        © {new Date().getFullYear()} Top Show Pro. Todos los derechos reservados.
        <span className="mx-2">•</span>
        <a 
          href="https://www.digitalboost.com.ar/continua" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-accent-cyan transition-colors"
        >
          Desarrollado por Digital Boost
        </a>
      </div>
    </footer>
  );
}