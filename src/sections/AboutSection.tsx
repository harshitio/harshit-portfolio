import FadeIn from '../components/FadeIn';
import SafeImage from '../components/SafeImage';
import moon from '../assets/about/moon.png';
import p59 from '../assets/about/p59.png';
import lego from '../assets/about/lego.png';
import group from '../assets/about/group.png';

const ABOUT_TEXT =
  'I am interested in practical AI: agents that complete useful workflows, automation that removes repetitive work, and products that people can understand and use. Most of my learning happens by building in public — making a version, testing it, finding what breaks, and trying again.';

const FOCUS_AREAS = [
  { value: 'AI Agents', label: 'Workflow automation & intelligent systems' },
  { value: 'SaaS Products', label: 'Full-stack apps from idea to deployment' },
  { value: 'Automation', label: 'Removing repetitive work with code' },
  { value: 'In Public', label: 'Sharing what I build, learn, and break' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#0C0C0C] flex min-h-screen flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[8%] left-[2%] sm:left-[3%] md:left-[4%] w-[80px] sm:w-[100px] md:w-[130px] opacity-40">
        <SafeImage src={moon} alt="" fallbackSrc="/hero/blackhole.jpg" loading="lazy" className="w-full" />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[5%] left-[4%] sm:left-[7%] md:left-[10%] w-[70px] sm:w-[90px] md:w-[110px] opacity-40">
        <SafeImage src={p59} alt="" fallbackSrc="/hero/blackhole.jpg" loading="lazy" className="w-full" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[8%] right-[2%] sm:right-[3%] md:right-[4%] w-[80px] sm:w-[100px] md:w-[130px] opacity-40">
        <SafeImage src={lego} alt="" fallbackSrc="/hero/blackhole.jpg" loading="lazy" className="w-full" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[5%] right-[4%] sm:right-[7%] md:right-[10%] w-[90px] sm:w-[110px] md:w-[140px] opacity-40">
        <SafeImage src={group} alt="" fallbackSrc="/hero/blackhole.jpg" loading="lazy" className="w-full" />
      </FadeIn>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            About
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <SafeImage
            src="/harshit-profile.jpeg"
            alt="Harshit"
            fallbackSrc="/og-image.jpg"
            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] rounded-2xl object-cover border-2 border-[#D7E2EA]/20"
          />
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <p className="text-center font-medium leading-relaxed text-[#D7E2EA] max-w-[600px] text-[clamp(1rem,2vw,1.35rem)]">
            {ABOUT_TEXT}
          </p>
        </FadeIn>

        <FadeIn delay={0.25} y={20}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-4">
            {FOCUS_AREAS.map((s) => (
              <div key={s.value} className="text-center">
                <p className="text-[clamp(1.2rem,3vw,2rem)] font-black text-white leading-none">
                  {s.value}
                </p>
                <p className="text-[#888] text-[clamp(0.65rem,1vw,0.8rem)] mt-2 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-6 md:mt-8">
          <FadeIn delay={0.3} y={20}>
            <a
              href="#projects"
              className="inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] border border-[#D7E2EA]/60 transition-colors duration-200 hover:bg-[#D7E2EA] hover:text-[#0C0C0C]"
            >
              See What I Build
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
