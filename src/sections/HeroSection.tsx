import { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SocialOrbit from '../components/SocialOrbit';
import { GITHUB_URL, X_URL } from '../lib/constants';

const H1_A = [...'harshit'];
const H1_B = [...'.io'];

const SPARKS = [
  { l: '6%', t: '18%', s: 3, d: 0, du: 2.6 },
  { l: '14%', t: '78%', s: 2, d: 0.7, du: 3.1 },
  { l: '24%', t: '32%', s: 4, d: 1.3, du: 2.2 },
  { l: '33%', t: '64%', s: 2, d: 0.4, du: 3.6 },
  { l: '42%', t: '24%', s: 3, d: 1.9, du: 2.9 },
  { l: '51%', t: '82%', s: 2, d: 1.1, du: 2.4 },
  { l: '58%', t: '44%', s: 4, d: 2.2, du: 3.3 },
  { l: '66%', t: '16%', s: 2, d: 0.9, du: 2.7 },
  { l: '72%', t: '70%', s: 3, d: 1.6, du: 3.9 },
  { l: '79%', t: '36%', s: 2, d: 0.2, du: 2.5 },
  { l: '86%', t: '58%', s: 4, d: 2.6, du: 3.2 },
  { l: '91%', t: '24%', s: 3, d: 1.4, du: 2.8 },
  { l: '46%', t: '52%', s: 2, d: 2.9, du: 3.5 },
  { l: '19%', t: '48%', s: 3, d: 0.5, du: 3.0 },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const orbitOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const orbitScale = useTransform(scrollY, [0, 450], [1, 0.82]);
  const orbitY = useTransform(scrollY, [0, 450], [0, -30]);

  // Interactive parallax: background drifts against the cursor, smoothed.
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { stiffness: 50, damping: 20 });
  const sY = useSpring(mY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(sX, [-0.5, 0.5], [14, -14]);
  const bgY = useTransform(sY, [-0.5, 0.5], [10, -10]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mX.set(e.clientX / window.innerWidth - 0.5);
      mY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mX, mY]);

  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-black text-white">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute -inset-10" style={{ x: bgX, y: bgY }}>
          <div
            className="hero-bg-drift h-full w-full"
            style={{
              backgroundImage: 'url(/hero/blackhole.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </motion.div>
      </div>

      <div className="pointer-events-none hidden lg:block absolute right-[2%] xl:right-[4%] top-1/2 -translate-y-1/2 z-30">
        <motion.div
          style={{ opacity: orbitOpacity, scale: orbitScale, y: orbitY }}
        >
          <SocialOrbit />
        </motion.div>
      </div>

      <div className="relative z-30 px-6 md:px-10 pt-6 md:pt-8">
        <nav className="flex justify-between items-center">
          <FadeIn delay={0} y={-20}>
            <a
              href="#"
              className="block font-black uppercase tracking-tight text-2xl md:text-3xl text-white"
              aria-label="Harshit.io"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              harshit<span className="tracking-[0.15em]">.io</span>
            </a>
          </FadeIn>
          <FadeIn
            delay={0}
            y={-20}
            className="max-[480px]:hidden flex gap-4 sm:gap-6 md:gap-10"
          >
            {['About', 'Projects', 'Now', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] text-white transition-opacity duration-200 hover:opacity-70 focus-visible:opacity-70"
              >
                {link}
              </a>
            ))}
          </FadeIn>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="max-[480px]:inline-block hidden border-2 border-white rounded-full px-5 py-2 text-sm font-medium uppercase tracking-wider"
          >
            Follow
          </a>
        </nav>
      </div>

      {/* Magic FX: breathing glow + counter-rotating spell rings over the hole */}
      <div className="pointer-events-none absolute left-[15%] top-[55%] z-[5]" aria-hidden="true">
        <div className="relative h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2">
          <div className="spell-glow absolute inset-[18%] rounded-full" />
          <div className="spell-ring-a absolute inset-0 rounded-full" />
          <div className="spell-ring-b absolute inset-[12%] rounded-full" />
        </div>
      </div>

      {/* Floating sparks */}
      <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
        {SPARKS.map((p, i) => (
          <span
            key={i}
            className="spark absolute rounded-full bg-white"
            style={{
              left: p.l,
              top: p.t,
              width: p.s,
              height: p.s,
              animationDelay: `${p.d}s`,
              animationDuration: `${p.du}s`,
              boxShadow: '0 0 8px 2px rgba(255,255,255,0.7)',
            }}
          />
        ))}
      </div>

      <div className="relative flex-1">
        <h1 className="absolute left-6 md:left-10 top-[16%] lg:top-1/2 lg:-translate-y-1/2 z-10 pointer-events-none font-black uppercase tracking-tight leading-[0.95] text-white text-[clamp(3rem,12vw,7.5rem)] lg:text-[clamp(3.5rem,8vw,7.5rem)]">
          {H1_A.map((ch, i) => (
            <motion.span
              key={`a-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="inline-block"
                animate={reduceMotion ? {} : { y: [0, -7, 0] }}
                transition={{ duration: 3.2 + (i % 3) * 0.6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.18 }}
              >
                {ch}
              </motion.span>
            </motion.span>
          ))}
          <br />
          <span className="tracking-[0.2em]">
            {H1_B.map((ch, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + (i + 7) * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="inline-block"
                  animate={reduceMotion ? {} : { y: [0, -7, 0] }}
                  transition={{ duration: 3.2 + ((i + 1) % 3) * 0.6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + (i + 7) * 0.18 }}
                >
                  {ch}
                </motion.span>
              </motion.span>
            ))}
          </span>
        </h1>
      </div>

      <div className="relative z-30 flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="text-white font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[320px]">
            I build useful products with AI and software — agents,
            automation systems, and experiments from idea to working product.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <div className="flex gap-3">
            <a
              href="#projects"
              className="inline-block rounded-full px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest border-2 border-white text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              View Projects
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest bg-white text-black transition-colors duration-200 hover:bg-gray-200"
            >
              GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
