import { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SocialOrbit from '../components/SocialOrbit';
import { GITHUB_URL, X_URL } from '../lib/constants';

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

      <div className="relative flex-1">
        <h1 className="absolute left-6 md:left-10 top-[16%] lg:top-1/2 lg:-translate-y-1/2 z-10 pointer-events-none font-black uppercase tracking-tight leading-[0.95] text-white text-[clamp(3rem,12vw,7.5rem)] lg:text-[clamp(3.5rem,8vw,7.5rem)]">
          harshit
          <br />
          <span className="tracking-[0.2em]">.io</span>
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
