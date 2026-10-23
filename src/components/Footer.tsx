import { GITHUB_URL, X_URL, LINKEDIN_URL, INSTAGRAM_URL, GMAIL_COMPOSE_URL } from '../lib/constants';
import SafeImage from './SafeImage';

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10">
      <div className="mx-auto max-w-[1100px] w-full px-5 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 mb-14">
          <div className="flex items-center gap-5">
            <SafeImage
              src="/harshit-profile.jpeg"
              alt="Harshit"
              fallbackSrc="/og-image.jpg"
              className="w-14 h-14 rounded-full object-cover border border-[#D7E2EA]/20"
            />
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-white">
                Harshit<span className="text-[#D7E2EA]/50">.io</span>
              </h2>
              <p className="text-[0.8rem] text-[#D7E2EA]/40 mt-0.5">
                AI product builder
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Now', href: '#now' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[0.85rem] text-[#D7E2EA]/50 no-underline transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-[#D7E2EA]/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[0.8rem] text-[#D7E2EA]/30">
            &copy; {new Date().getFullYear()} Harshit.io &mdash; built with React, Tailwind, and too much coffee.
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: 'X', href: X_URL },
              { label: 'GitHub', href: GITHUB_URL },
              { label: 'LinkedIn', href: LINKEDIN_URL },
              { label: 'Instagram', href: INSTAGRAM_URL },
              { label: 'Email', href: GMAIL_COMPOSE_URL },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.8rem] text-[#D7E2EA]/40 no-underline transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
