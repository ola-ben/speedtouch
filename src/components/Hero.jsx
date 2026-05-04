import { useState } from 'react'
import Reveal from './Reveal'

// Mixkit hosts CC0 videos and permits hotlinking. Swap the ID for any of:
//   21380 — Woman cleaning her house in detail
//   43377 — Young woman cleaning happily
//   23181 — A tired woman cleaning
//   45039 — Vacuum cleaning a sofa
// For production, prefer downloading the .mp4 into src/assets/ and importing it.
const HERO_VIDEO = 'https://assets.mixkit.co/videos/43373/43373-720.mp4'
const HERO_POSTER =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80&auto=format&fit=crop'

function Hero() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {videoOk ? (
          <video
            className="h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setVideoOk(false)}
            onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
          />
        ) : (
          <img
            src={HERO_POSTER}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-white/15 via-white/40 to-white" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-5 text-center sm:px-6 md:pb-32 md:pt-5">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-pink bg-white/80 px-3 py-1 text-xs font-medium text-brand-pink-deep backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink-deep" />
            Trusted by 5,000+ homes
          </span>

          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight text-slate-900 drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)] sm:text-6xl md:mt-8 md:text-7xl lg:text-8xl">
            A spotless home,
            <br />
            <span className="italic bg-linear-to-r from-brand-blue to-brand-pink-deep bg-clip-text text-transparent">
              without the hassle
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-800 drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)] md:mt-7 md:text-lg">
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
