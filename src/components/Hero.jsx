'use client'

import Reveal from './Reveal'

const HERO_IMAGE = '/hero-cleaning.jpg'

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="Speedtouch Professional Cleaners in Ibadan"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/40 via-white/70 to-white" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-5 text-center sm:px-6 md:pb-32 md:pt-5">
        <Reveal>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
            A spotless home,
            <br />
            <em className="text-brand-blue">without the hassle</em>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-700 md:mt-7 md:text-lg">
            Professional cleaners, eco-friendly products, and a satisfaction
            guarantee. Book in 60 seconds — we'll handle the rest.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:mt-10 md:gap-x-8 md:gap-y-4">
            <a
              href="#book"
              className="rounded-full bg-slate-900 px-7 py-3.5 text-sm font-medium text-white shadow-md transition hover:bg-brand-blue"
            >
              Book your first clean
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-slate-900 underline underline-offset-4 transition hover:text-brand-blue"
            >
              See services →
            </a>
          </div>

          <div className="mt-9 flex items-center justify-center gap-3 text-sm text-slate-700 md:mt-14">
            <div className="flex -space-x-2">
              {[12, 32, 44, 5].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/80?img=${id}`}
                  alt=""
                  loading="lazy"
                  className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
            </div>
            <span>
              <span className="font-semibold text-slate-900">5,000+ happy clients</span>
              {' · '}
              4.9 / 5 ★★★★★
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
