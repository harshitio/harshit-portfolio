import FadeIn from '../components/FadeIn';
import { CONTACT_EMAIL, GITHUB_URL, X_URL, LINKEDIN_URL, INSTAGRAM_URL, GMAIL_COMPOSE_URL } from '../lib/constants';

const LINKS = [
  { label: 'Email', href: GMAIL_COMPOSE_URL, display: CONTACT_EMAIL },
  { label: 'X / Twitter', href: X_URL, display: '@Harshit_io777' },
  { label: 'GitHub', href: GITHUB_URL, display: 'harshitio' },
  { label: 'LinkedIn', href: LINKEDIN_URL, display: 'harshit-io' },
  { label: 'Instagram', href: INSTAGRAM_URL, display: '@harshit.dev1' },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-white px-5 py-20 max-[900px]:py-[60px]"
    >
      <div className="mx-auto max-w-[800px] w-full">
        <FadeIn delay={0} y={40}>
          <div className="text-center mb-12">
            <h2 className="font-black uppercase text-[#0C0C0C] text-[clamp(2.5rem,10vw,120px)] leading-none tracking-tight mb-6">
              Let's Talk
            </h2>
            <p className="text-[#666] text-[clamp(0.9rem,1.5vw,1.1rem)] max-w-lg mx-auto">
              Have a useful problem, an interesting product idea, or a system that could be simpler? I'm always open to a good conversation.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LINKS.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.08} y={20}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#0C0C0C]/15 p-5 transition-colors duration-200 hover:border-[#0C0C0C]/40 group"
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#0C0C0C]">
                    {link.label}
                  </p>
                  <p className="text-sm text-[#888] mt-1">{link.display}</p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-[#888] group-hover:text-[#0C0C0C] transition-colors duration-200"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} y={20}>
          <p className="text-center text-[0.8rem] text-[#888] mt-12">
            Open to interesting projects, collaborations, and conversations about AI products.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
