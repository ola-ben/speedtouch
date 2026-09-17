'use client'

import Reveal from './Reveal'

const HERO_IMAGE = '/hero-nigerian-service.jpg'

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Professional Nigerian Cleaning Service in Ibadan"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        {/* Cinematic contrast overlay: preserves true blacks, highlights edge sharpness, and eliminates milky white fog */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/45 to-slate-950" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-5 text-center sm:px-6 md:pb-32 md:pt-5">
        <Reveal>
          {/* Spacer preserving the exact height of the previous badge so nothing shifts */}
          <div className="h-[26px]" aria-hidden="true" />

          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:mt-8 md:text-7xl lg:text-8xl">
            A spotless home,
            <br />
            <em className="font-semibold italic bg-linear-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              without the hassle
            </em>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base font-normal text-slate-200 md:mt-7 md:text-lg">
            Professional cleaners, eco-friendly products, and a satisfaction
            guarantee. Book in 60 seconds — we'll handle the rest.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:mt-10 md:gap-x-8 md:gap-y-4">
            <a
              href="#book"
              className="rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600 hover:shadow-blue-500/50"
            >
              Book your first clean
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-white/90 underline underline-offset-4 transition hover:text-white"
            >
              See services →
            </a>
          </div>

          <div className="mt-9 flex items-center justify-center gap-3 text-sm text-slate-300 md:mt-14">
            <span>
              <span className="font-semibold text-white">5,000+ happy clients</span>
              {' · '}
              <span className="text-amber-400 font-medium">4.9 / 5 ★★★★★</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
