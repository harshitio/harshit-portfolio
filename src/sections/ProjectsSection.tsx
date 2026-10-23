import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LiveProjectButton from '../components/LiveProjectButton';
import SafeImage from '../components/SafeImage';

const MotionSafeImage = motion.create(SafeImage);

interface ProjectImage {
  src: string;
  caption: string;
}

interface Project {
  number: string;
  name: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  built: string[];
  stack: string[];
  images: ProjectImage[];
  status: 'live' | 'prototype' | 'archived' | 'experimental';
  lesson: string;
  repo?: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Quote Generator',
    category: 'AI Productivity · Web App',
    tagline:
      'Turn a one-line client brief into a polished, branded, print-ready quotation in seconds.',
    problem:
      'Freelancers and agencies rebuild quotes from scratch every time — same scope, same pricing, retyped daily. Slow quotes cost deals.',
    solution:
      'An AI quoting tool. Drop in a one-line brief, and the system drafts the full quotation — scope, deliverables, timeline, pricing, payment schedule, terms. Every figure stays editable, and totals recalculate live.',
    result:
      'Quotes in seconds instead of hours. Every quote on-brand and consistent.',
    built: [
      'Vite + React 19 + TypeScript SPA with custom Tailwind v4 theme.',
      '44 shadcn UI components and a fully typed QuoteSheet engine.',
      'Vercel server function drafts complete quotations from a one-line brief via the Gemini API.',
      'Local-first quote store, live tax/total recalculation.',
    ],
    stack: ['Vite', 'React 19', 'TypeScript', 'Tailwind v4', 'shadcn/ui', 'Gemini API'],
    images: [
      { src: '/projects/quote-generator/col2-image.webp', caption: 'Branded, print-ready quote sheet with live recalculation' },
      { src: '/projects/quote-generator/col1-image1.webp', caption: 'Start from a saved layout or a blank sheet' },
      { src: '/projects/quote-generator/col1-image2.webp', caption: 'AI drafts the full quote from a one-line brief' },
    ],
    status: 'live',
    lesson: 'The useful part was not the AI — it was the editable output. People trust what they can tweak.',
    repo: 'https://github.com/harshitio/velcora-quote-generator-P1',
    live: 'https://velcora-quote-generator-p1.vercel.app',
  },
  {
    number: '02',
    name: 'Lead Pipeline CRM',
    category: 'Sales Ops · Web App',
    tagline:
      'Capture every lead from one form, auto-score it, and move it through the pipeline to won.',
    problem:
      'Agencies lose track of incoming demand. Leads land in DMs and inboxes, never get followed up, and deals quietly die.',
    solution:
      'A single-tenant CRM on Supabase. One intake form captures the lead, auto-scores it 0–100 (hot / warm / cold), and drops it into a kanban pipeline: new → qualified → proposal → won or lost.',
    result:
      'Every lead captured with a score and a next action. Zero leads slip through.',
    built: [
      'Pipeline CRM from scratch — intake form, auto-score engine, and kanban pipeline.',
      'Supabase schema with RLS, anon + authenticated access for the no-login single-tenant flow.',
      'Auto-scoring with hot / warm / cold priority, dynamic date handling, email validation.',
      'Vercel-ready with SPA rewrite, engines pinned, build + typecheck + lint passing.',
    ],
    stack: ['Vite', 'React 18', 'TypeScript', 'Tailwind 3', 'Supabase'],
    images: [
      { src: '/projects/lead-pipeline/col2-image.webp', caption: 'Intake form — auto-scored, hot / warm / cold' },
      { src: '/projects/lead-pipeline/col1-image1.webp', caption: 'Overview — every lead and stage at a glance' },
      { src: '/projects/lead-pipeline/col1-image2.webp', caption: 'Kanban pipeline — new → qualified → won' },
    ],
    status: 'live',
    lesson: 'Auto-scoring changes behavior. When leads have a number attached, people actually follow up.',
    repo: 'https://github.com/harshitio/velcora-single-tenant-lead-pipeline-crm-p5',
    live: 'https://velcora-single-tenant-lead-pipeline.vercel.app',
  },
  {
    number: '03',
    name: 'Enterprise Doc Processing',
    category: 'Document AI · Web App',
    tagline:
      'Extract, audit, and automate enterprise financial paperwork — invoices, POs, leases — in seconds.',
    problem:
      'Finance teams key invoices, POs, and leases into systems by hand. Slow, error-prone, and nobody checks the math until an audit finds out.',
    solution:
      'A multimodal OCR workbench. Ingest PDFs, PNGs, JPGs, TXT, or CSV; the engine parses structured fields, validates line-item math, flags risk anomalies, and triggers ERP webhooks.',
    result:
      'Documents processed in seconds. Every field extracted, every total verified, every anomaly flagged.',
    built: [
      'Intake workbench: upload, paste text, or generate test invoices across six document types.',
      'Multimodal OCR pipeline that parses structured fields and feeds the inspector.',
      'Structured Inspector — validates line-item math and detects risk anomalies.',
      'Automation & API hub: rule-based triggers, live webhook log, SDK surface.',
    ],
    stack: ['TypeScript', 'Vite', 'React', 'Multimodal OCR'],
    images: [
      { src: '/projects/doc-pipeline/col1-image1.webp', caption: 'Document Workbench — ingest, paste, or generate test invoices' },
      { src: '/projects/doc-pipeline/col1-image2.webp', caption: 'Structured Inspector — parsed fields with math + risk validation' },
      { src: '/projects/doc-pipeline/col2-image.webp', caption: 'Automation & API — workflow rules, webhook log, SDK' },
    ],
    status: 'prototype',
    lesson: 'Validation is more valuable than extraction. Finding the wrong number matters more than reading the right one.',
    repo: 'https://github.com/harshitio/velcora-enterprise--doc---P6',
    live: 'https://velcora-enterprise-doc-p6.vercel.app',
  },
  {
    number: '04',
    name: 'Salon OS',
    category: 'Vertical SaaS · Web App',
    tagline:
      'Unified scheduling, real-time inventory, stylist commissions, and AI client retention for salons.',
    problem:
      'Salons juggle chairs, bookings, color stock, stylist pay, and client reminders across notebooks and apps. Double-bookings and no-shows eat the margin.',
    solution:
      'A salon operating system: chair scheduling matrix, barcode color inventory with auto-deduct, stylist roster with commission splits, and AI automations for SMS / WhatsApp reminders.',
    result:
      'Every chair filled and tracked, stock never runs dry, commissions split automatically.',
    built: [
      'Overview command center: today\'s chairs, active services, low-stock alerts, daily gross with commission splits.',
      'Appointments workspace with a chair scheduling matrix plus a client booking demo portal.',
      'Color bar: barcode inventory tracking with station-mix simulation and auto-deduct on service completion.',
      'AI automations — SMS / WhatsApp client retention bot, no-show alerts, and an AI Copilot layer.',
    ],
    stack: ['TypeScript', 'Vite', 'React', 'Tailwind', 'AI Automations'],
    images: [
      { src: '/projects/salon-os/col1-image1.webp', caption: 'Overview — chairs booked, stock alerts, daily gross' },
      { src: '/projects/salon-os/col1-image2.webp', caption: 'Appointments — chair scheduling matrix + client booking' },
      { src: '/projects/salon-os/col2-image.webp', caption: 'Inventory — color bar with barcode tracking and auto-deduct' },
    ],
    status: 'prototype',
    lesson: 'Vertical SaaS works when you understand the daily workflow. The value is in the small details that save real minutes.',
  },
  {
    number: '05',
    name: 'AI Business Agent',
    category: 'AI Co-Pilot · Chat App',
    tagline:
      'A business operations co-pilot with five tuned workflow modes — qualify leads, draft emails, summarize meetings, research markets, write proposals.',
    problem:
      'Every business task lives in a different tool. Qualifying a lead, drafting outreach, summarizing a meeting — all need different thinking, so teams wing it.',
    solution:
      'One co-pilot, five specialist modes. Each mode carries a tuned system prompt — Lead Qualifier, Email Drafter, Meeting Summarizer, Market Researcher, Proposal Writer.',
    result:
      'Specialist-grade output in seconds — scored leads, ready-to-send emails, meeting action items, competitive research.',
    built: [
      'Co-pilot on Next.js 16 + the AI SDK with a branded chat experience and persistent sessions.',
      'Five workflow modes — each with icon, color, badge, starter prompts, and a tuned system prompt.',
      'Lead Qualifier outputs a structured Qualification Card: lead score, red flags, next action.',
      'Session auth, chat history persistence, multi-model switcher across leading LLMs.',
    ],
    stack: ['Next.js 16', 'AI SDK', 'TypeScript', 'Drizzle'],
    images: [
      { src: '/projects/ai-agent/col1-image1.webp', caption: 'Onboarding — five workflow modes with starter prompts' },
      { src: '/projects/ai-agent/col1-image2.webp', caption: 'Chat thread — prompt runs through the co-pilot' },
      { src: '/projects/ai-agent/col2-image.webp', caption: 'Model switcher — run the agent on your choice of LLM' },
    ],
    status: 'prototype',
    lesson: 'The useful part of an agent is not just the model — it is the workflow, state, and checks around it.',
    repo: 'https://github.com/harshitio/velcora-ai-agent-P7',
    live: 'https://velcora-ai-agent-p6.vercel.app',
  },
  {
    number: '06',
    name: 'Knowledge Chatbot Hub',
    category: 'Customer Intelligence · Platform',
    tagline:
      'Turn documents into a live knowledge base, power an AI chatbot, and orchestrate conversations across webchat, Slack, WhatsApp, and email.',
    problem:
      'Support teams drown in tickets. Customer questions repeat across channels — and every answer lives in someone\'s head or a folder nobody can search.',
    solution:
      'A customer-intelligence platform: ingest documents into a knowledge base, embed them for retrieval, generate sourced answers. Plus an omnichannel conversation hub with sentiment, intent, and urgency tagging.',
    result:
      'AI answers customers 24/7 with sourced, confidence-scored answers from your documents.',
    built: [
      'AI Playground — live chat modal with instant welcome message, 99.8% confidence score, and source citations.',
      'Knowledge base: ingest documents, get sourced answers with confidence scores via the Gemini-backed engine.',
      'Conversation Hub — triage, sentiment, intent, and urgency tagging across channels.',
      'Architecture view (4-tier ingest → embed → retrieve → generate), ROI calculator, security matrix.',
    ],
    stack: ['Vite', 'React 19', 'TypeScript', 'Tailwind v4', 'Gemini', 'Express'],
    images: [
      { src: '/projects/chatbot-hub/col1-image1.webp', caption: 'Autonomy platform with Live Studio, Vector Hub, ROI, Pricing' },
      { src: '/projects/chatbot-hub/col1-image2.webp', caption: 'AI Playground — sourced answers with confidence score + citations' },
      { src: '/projects/chatbot-hub/col2-image.webp', caption: 'Knowledge Base — ingest documents, get sourced answers' },
    ],
    status: 'prototype',
    lesson: 'Confidence scoring changes trust. When users see a score, they trust the answer more than when they don\'t.',
    repo: 'https://github.com/harshitio/velcora-ai-knowledge-chatbot-hub-P10',
    live: 'https://velcora-ai-knowledge-chatbot-hub-p1.vercel.app',
  },
  {
    number: '07',
    name: 'High-Fidelity Studio',
    category: 'Data Intelligence · Web App',
    tagline:
      'An autonomous web scraper, data-intelligence studio, and workflow-automation builder with a deep-focus suite.',
    problem:
      'Market research means manually copy-pasting from messy websites, cleaning data in spreadsheets, and redoing the same extraction every week.',
    solution:
      'A cinematic single-page workspace. Paste any URL into the Scraper Studio and get structured JSON — title, summary, key metrics, sentiment, confidence. Plus a data engine, visual automation builder, and focus station.',
    result:
      'Any website becomes clean, structured data in one click — repeatable workflows run on cron instead of weekends.',
    built: [
      'Scraper Studio: paste any URL, get structured JSON via the Gemini-powered backend.',
      'Preset scrape targets — TechCrunch, GitHub Trending, e-commerce price matrix, Hacker News.',
      'Automation Builder: visual extract → AI → dispatch pipelines with cron deployment.',
      'Focus Station: Pomodoro timer with task queues and procedural ambient soundscapes.',
    ],
    stack: ['Vite', 'React 19', 'TypeScript', 'Tailwind', 'Gemini', 'Express'],
    images: [
      { src: '/projects/high-fidelity/col1-image1.webp', caption: 'Clarity in an endlessly noisy universe' },
      { src: '/projects/high-fidelity/col1-image2.webp', caption: 'Scraper Studio — preset targets + JSON / grid / cURL outputs' },
      { src: '/projects/high-fidelity/col2-image.webp', caption: 'Automation + Focus — pipelines, cron, Pomodoro, ambient sound' },
    ],
    status: 'prototype',
    lesson: 'The scraper is the hook, but the automation pipeline is the product. Extraction without workflow is just a demo.',
  },
  {
    number: '08',
    name: 'Lead Engine',
    category: 'Lead Generation · n8n Workflow',
    tagline:
      'Turn any list of business queries into a clean, deduped email database — scraped from the map index with zero per-lead fees.',
    problem:
      'Building a lead list means hours of manual searching and spreadsheet cleaning — and most scraping tools charge per record.',
    solution:
      'A map-index email engine. Give it a query list — like "cafes in Mumbai" — and it searches the map index, extracts emails with pure regex, dedupes everything, and pushes the clean list into Google Sheets.',
    result:
      'A ready-to-pitch email database from any query list — deduped, clean, and in your CRM sheet for $0 in API costs.',
    built: [
      'Query runner: feeds each query through map-index search, extracts business listing URLs.',
      'Email extractor in pure code — regex-based extraction, no third-party APIs, no per-lead fees.',
      'Dedupe and filtering so the final list is clean, unique, and dump-ready for outreach.',
      'Google Sheets sink with per-query background execution.',
    ],
    stack: ['n8n', 'Web Scraping', 'Google Sheets', 'Regex', 'Automation'],
    images: [
      { src: '/projects/lead-engine/col1-image1.webp', caption: 'The full 26-node engine — query runner, extractor, dedupe, sheet sink' },
      { src: '/projects/lead-engine/col1-image2.webp', caption: 'Map-index search — matching business listings from each query' },
      { src: '/projects/lead-engine/col2-image.webp', caption: 'Email extraction — regex parser pulling clean emails' },
    ],
    status: 'live',
    lesson: 'The best automation is invisible. This runs on cron and nobody thinks about it — that\'s the point.',
    repo: 'https://github.com/harshitio/velcora-lead-gen-system-P3',
  },
  {
    number: '09',
    name: 'SDR Pipeline',
    category: 'Sales Automation · n8n Workflow',
    tagline:
      'Four autonomous agents run your entire sales outreach — capture, qualify, follow up, and recover no-shows without a single manual email.',
    problem:
      'Outreach dies from inconsistency. Leads land, nobody follows up on time, follow-up counts are never tracked, and no-shows never get a second chance.',
    solution:
      'A 36-node sales operating system with four autonomous agents — CRM ingestion, multi-touch follow-up, calendar concierge, and no-show recovery.',
    result:
      'Every lead touched on schedule, every follow-up personalized, bookings pulled out instantly, no-shows recovered automatically.',
    built: [
      'Four-agent architecture — CRM ingestion, multi-touch follow-up, calendar concierge, no-show recovery.',
      'CRM Agent: scheduled sync from lead list into master CRM sheet with data formatting.',
      'Follow-Up Agent: LLM engine personalizes three sequential emails by name, role, company, industry.',
      'Concierge and No-Show Agents: calendar-triggered status flips and automatic reschedule outreach.',
    ],
    stack: ['n8n', 'Google Sheets', 'Gmail', 'Google Calendar', 'LLM', 'Automation'],
    images: [
      { src: '/projects/sdr-pipeline/col1-image1.webp', caption: 'The full 36-node pipeline — CRM, follow-up, concierge, no-show' },
      { src: '/projects/sdr-pipeline/col1-image2.webp', caption: 'Follow-up engine — three-touch LLM-personalized sequences' },
      { src: '/projects/sdr-pipeline/col2-image.webp', caption: 'CRM + calendar automation — bookings pulled out instantly' },
    ],
    status: 'live',
    lesson: 'Agents work best when each one does one thing well. The pipeline is just four specialists connected by data.',
    repo: 'https://github.com/harshitio/velcora-lead-gen-system-P3',
  },
];

function ImageLightbox({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: ProjectImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    },
    [index, images.length, onClose, onIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  if (index < 0 || index >= images.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <MotionSafeImage
        key={images[index]!.src}
        src={images[index]!.src}
        alt={images[index]!.caption}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.45, bounce: 0.16 }}
        className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10 select-none"
        draggable={false}
      />
      <p className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 text-center text-white/70 text-sm max-w-md px-4">
        {images[index]!.caption}
      </p>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-xl leading-none"
      >
        ✕
      </button>
      {images.length > 1 && (
        <>
          <button
            onClick={() => onIndex((index - 1 + images.length) % images.length)}
            aria-label="Previous"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-2xl leading-none"
          >
            ‹
          </button>
          <button
            onClick={() => onIndex((index + 1) % images.length)}
            aria-label="Next"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-2xl leading-none"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onIndex(i)}
                aria-label={`Screenshot ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-[#D7E2EA]/15 text-left transition-colors duration-300 hover:border-[#D7E2EA]/45 bg-[#0E0E0E]"
      aria-label={`View ${project.name} — ${project.tagline}`}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <SafeImage
          src={project.images[0]!.src}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-2 font-black text-white/[0.10] leading-none text-[clamp(4rem,9vw,7rem)]"
        >
          {project.number}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-80" />
        <span className="absolute top-3 left-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/60 bg-[#0C0C0C]/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
          {project.status}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="uppercase tracking-[0.25em] text-[#D7E2EA]/50 text-[11px] mb-2">
          {project.category}
        </p>
        <h3 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(1.3rem,3vw,1.8rem)] mb-2">
          {project.name}
        </h3>
        <p className="text-[#D7E2EA]/70 text-sm leading-relaxed line-clamp-2">{project.tagline}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/70 group-hover:text-[#D7E2EA] transition-colors duration-200">
          View Build
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </p>
      </div>
    </motion.button>
  );
}

function ProjectDetail({ project, index }: { project: Project; index: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const flipped = index % 2 === 1;

  const Btn =
    'inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/60 px-6 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA] hover:text-[#0C0C0C]';

  return (
    <div className="project-detail relative py-20 sm:py-28 md:py-36 border-b border-[#D7E2EA]/10">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-0 font-black text-[#D7E2EA]/[0.06] leading-none text-[clamp(8rem,24vw,320px)]"
      >
        {project.number}
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <p className="uppercase tracking-[0.3em] text-[#D7E2EA]/60 text-xs sm:text-sm">
              Project {project.number}
            </p>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/50 bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 px-2.5 py-0.5 rounded">
              {project.status}
            </span>
          </div>
          <h3 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(2.2rem,6vw,5rem)] mb-4">
            {project.name}
          </h3>
          <p className="text-[#D7E2EA]/70 text-base sm:text-lg max-w-3xl">{project.tagline}</p>
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-start ${
            flipped ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="min-w-0">
            <div className="grid gap-6">
              <div>
                <p className="uppercase tracking-widest text-[#D7E2EA]/50 text-xs mb-2">
                  The Problem
                </p>
                <p className="text-[#D7E2EA]/85 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <p className="uppercase tracking-widest text-[#D7E2EA]/50 text-xs mb-2">
                  What I Built
                </p>
                <p className="text-[#D7E2EA]/85 leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <p className="uppercase tracking-widest text-[#D7E2EA]/50 text-xs mb-2">
                  How It Was Built
                </p>
                <ol className="grid gap-2.5">
                  {project.built.map((step, i) => (
                    <li key={i} className="flex gap-3 text-[#D7E2EA]/85 leading-relaxed">
                      <span className="font-medium text-[#D7E2EA]/40 shrink-0 w-5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="uppercase tracking-widest text-[#D7E2EA]/50 text-xs mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#D7E2EA]/30 px-4 py-1.5 text-sm text-[#D7E2EA]/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="uppercase tracking-widest text-[#D7E2EA]/50 text-xs mb-2">
                  The Result
                </p>
                <p className="text-[#D7E2EA]/85 leading-relaxed">{project.result}</p>
              </div>
              <div className="border-t border-[#D7E2EA]/10 pt-4">
                <p className="uppercase tracking-widest text-[#D7E2EA]/50 text-xs mb-2">
                  Lesson
                </p>
                <p className="text-[#D7E2EA]/85 leading-relaxed italic">{project.lesson}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Btn}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Btn}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.live && <LiveProjectButton href={project.live} />}
            </div>
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <button
                  onClick={() => setLightboxIndex(0)}
                  className="group w-full block cursor-zoom-in"
                >
                  <SafeImage
                    src={project.images[0]!.src}
                    alt={project.images[0]!.caption}
                    className="w-full aspect-[4/3] object-cover object-top rounded-3xl border border-[#D7E2EA]/15 transition-[filter] duration-200 group-hover:brightness-110"
                    loading="lazy"
                  />
                </button>
                <p className="text-xs text-[#D7E2EA]/50 mt-2 text-right">
                  {project.images[0]!.caption}
                </p>
              </div>
              <div>
                <button onClick={() => setLightboxIndex(1)} className="group w-full block cursor-zoom-in">
                  <SafeImage
                    src={project.images[1]!.src}
                    alt={project.images[1]!.caption}
                    className="w-full aspect-[16/10] object-cover object-top rounded-3xl border border-[#D7E2EA]/15 transition-[filter] duration-200 group-hover:brightness-110"
                    loading="lazy"
                  />
                </button>
                <p className="text-xs text-[#D7E2EA]/50 mt-2">{project.images[1]!.caption}</p>
              </div>
              <div>
                <button onClick={() => setLightboxIndex(2)} className="group w-full block cursor-zoom-in">
                  <SafeImage
                    src={project.images[2]!.src}
                    alt={project.images[2]!.caption}
                    className="w-full aspect-[16/10] object-cover object-top rounded-3xl border border-[#D7E2EA]/15 transition-[filter] duration-200 group-hover:brightness-110"
                    loading="lazy"
                  />
                </button>
                <p className="text-xs text-[#D7E2EA]/50 mt-2">{project.images[2]!.caption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={project.images}
            index={lightboxIndex}
            onIndex={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#projects') {
        setExpanded(true);
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (expanded) {
      const el = document.getElementById('projects-list');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [expanded]);

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28"
    >
      <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-10 sm:mb-14">
        Projects
      </h2>

      {!expanded && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.number}
                project={project}
                index={i}
                onOpen={() => setExpanded(true)}
              />
            ))}
          </div>

          <div className="mt-14 sm:mt-20 -translate-y-[5%] text-center">
            <p className="text-[#D7E2EA]/60 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Every project is built from scratch — real engines, real deployments, no templates.
            </p>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-3 rounded-full border-2 border-[#D7E2EA] px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA] hover:text-[#0C0C0C]"
            >
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
          </div>
        </>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            id="projects-list"
            key="projects-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ProjectDetail project={project} index={i} />
                </motion.div>
              ))}
            </div>
            <div className="pb-16 sm:pb-24 text-center">
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="inline-flex items-center gap-3 rounded-full border border-[#D7E2EA]/60 px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/80 transition-colors duration-200 hover:bg-[#D7E2EA] hover:text-[#0C0C0C]"
              >
                Collapse Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
