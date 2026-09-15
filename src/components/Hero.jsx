'use client'

import Reveal from './Reveal'

const HERO_IMAGE = '/hero-cleaning.jpg'

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden py-10 sm:py-16 md:py-24">
      {/* Background Image - fully visible, crisp, and vivid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Professional commercial cleaning team in Nigeria"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        {/* Soft edge gradient to blend seamlessly into the rest of the page */}
        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-white" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          {/* Glassmorphic frosted card for 100% text readability while keeping the full image visible */}
          <div className="rounded-3xl border border-white/60 bg-white/85 p-6 text-center shadow-2xl backdrop-blur-md sm:p-10 md:p-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-soft px-3.5 py-1 text-xs font-semibold text-brand-blue">
              ✨ Professional Cleaning & Hygiene Services in Ibadan
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              A spotless home & office,
              <br />
              <em className="text-brand-blue not-italic">without the hassle</em>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base md:mt-5 md:text-lg">
              Trained, insured cleaners, commercial equipment, and eco-friendly products. 
              Book in 60 seconds — we'll handle the rest.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-6 md:mt-8">
              <a
                href="#book"
                className="rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-blue"
              >
                Book your first clean
              </a>
              <a
                href="#services"
                className="rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-brand-blue hover:text-brand-blue"
              >
                See services →
              </a>
            </div>

            <div className="mt-7 flex items-center justify-center gap-3 text-xs text-slate-700 sm:text-sm md:mt-8">
              <div className="flex -space-x-2">
                {[12, 32, 44, 5].map((id) => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/80?img=${id}`}
                    alt=""
                    loading="lazy"
                    className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-xs sm:h-8 sm:w-8"
                  />
                ))}
              </div>
              <span>
                <strong className="font-semibold text-slate-900">5,000+ happy clients</strong>
                {' · '}
                4.9 / 5 ★★★★★
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
