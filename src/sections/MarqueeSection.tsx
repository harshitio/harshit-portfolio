import { useEffect, useRef } from 'react';
import SafeImage from '../components/SafeImage';

const IMAGES = [
  '/marquee/m01.webp',
  '/marquee/m02.webp',
  '/marquee/m03.webp',
  '/marquee/m04.webp',
  '/marquee/m05.webp',
  '/marquee/m06.webp',
  '/marquee/m07.webp',
  '/marquee/m08.webp',
  '/marquee/m09.webp',
  '/marquee/m10.webp',
  '/marquee/m11.webp',
  '/marquee/m12.webp',
  '/marquee/m13.webp',
  '/marquee/m14.webp',
  '/marquee/m15.webp',
  '/marquee/m16.webp',
  '/marquee/m17.webp',
  '/marquee/m18.webp',
  '/marquee/m19.webp',
  '/marquee/m20.webp',
  '/marquee/m21.webp',
];

const ROW_1 = IMAGES.slice(0, 11);
const ROW_2 = IMAGES.slice(11);

function triple<T>(arr: T[]): T[] {
  return [...arr, ...arr, ...arr];
}

function ScrollRow({
  images,
  direction,
}: {
  images: string[];
  direction: 1 | -1;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateTransform = () => {
      frame = 0;
      const el = rowRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      const x = direction === 1 ? offset - 200 : -(offset - 200);
      el.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTransform);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [direction]);

  return (
    <div
      ref={rowRef}
      className="flex gap-3"
      style={{ willChange: 'transform', width: 'max-content' }}
    >
      {triple(images).map((src, i) => (
        <SafeImage
          key={i}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          fallbackSrc="/hero/blackhole.jpg"
          className="marquee-image rounded-2xl object-cover"
          style={{ width: 420, height: 270 }}
        />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-x-clip"
      style={{ overflowX: 'clip' }}
    >
      <ScrollRow images={ROW_1} direction={1} />
      <ScrollRow images={ROW_2} direction={-1} />
    </section>
  );
}
