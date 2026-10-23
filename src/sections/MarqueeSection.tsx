import { useEffect, useRef } from 'react';

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
    const onScroll = () => {
      const el = rowRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      el.style.transform = `translateX(${direction === 1 ? offset - 200 : -(offset - 200)}px)`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [direction]);

  return (
    <div
      ref={rowRef}
      className="flex gap-3"
      style={{ willChange: 'transform', width: 'max-content' }}
    >
      {triple(images).map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
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
