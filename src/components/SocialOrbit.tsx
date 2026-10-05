import type { CSSProperties, ReactNode } from 'react';
import './SocialOrbit.css';

type Item = {
  name: string;
  href: string;
  logo: ReactNode;
  ring: 'inner' | 'mid' | 'outer';
  angle: number;
};

const img = (file: string, alt: string) => (
  <img src={`/socials/${file}`} alt={alt} className="orbit-logo" />
);

const items: Item[] = [
  { name: 'X', href: 'https://x.com/Harshit_io777', logo: img('x.ico', 'X'), ring: 'inner', angle: 0 },
  { name: 'GitHub', href: 'https://github.com/harshitio', logo: img('github.ico', 'GitHub'), ring: 'inner', angle: 120 },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/harshit-io-43661b42b/', logo: img('linkedin.ico', 'LinkedIn'), ring: 'inner', angle: 240 },
  { name: 'Instagram', href: 'https://instagram.com/harshit.dev1', logo: img('instagram.ico', 'Instagram'), ring: 'mid', angle: 90 },
  {
    name: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=braincore189@gmail.com',
    logo: (
      <svg viewBox="0 0 24 24" fill="#EA4335" aria-hidden="true" className="orbit-logo">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
    ring: 'mid',
    angle: 270,
  },
];

const rings: Item['ring'][] = ['inner', 'mid', 'outer'];

export default function SocialOrbit() {
  return (
    <div className="social-orbit" aria-label="Navigation">
      <div className="orbit-center">
        <img
          src="/harshit-profile.jpeg"
          alt="Harshit"
        />
      </div>

      {rings.map((ring) => (
        <div key={ring} className={`orbit orbit-${ring}`}>
          {items
            .filter((s) => s.ring === ring)
            .map((s) => (
              <div
                key={s.name}
                className="orbit-node"
                style={{ '--a': `${s.angle}deg` } as CSSProperties}
              >
                <a
                  className="orbit-icon"
                  href={s.href}
                  target={s.href.startsWith('#') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                >
                  <span className="orbit-logo-wrap">{s.logo}</span>
                </a>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
