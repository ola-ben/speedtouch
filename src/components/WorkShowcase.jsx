import Reveal from './Reveal'
import { Play, Sparkles } from 'lucide-react'

function WorkShowcase() {
  return (
    <section className="bg-slate-50/50 py-20 md:py-28 border-y border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-pink-deep">
              Our Work In Action
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 items-start">
          {/* Landscape Video Card */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-card transition hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
                  <iframe
                    className="h-full w-full border-0"
                    src="https://www.youtube.com/embed/Gr8u4MS8Q0U"
                    title="Speedtouch Deep Cleaning Showcase"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="mt-5 px-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue-soft px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
                    <Sparkles className="h-3 w-3" />
                    Deep Clean Walkthrough
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">
                    Watch our step-by-step cleaning process
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    See how our trained team targets dust, sanitizes surfaces, and transforms a standard space into a spotless home.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Portrait Short Video Card */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={200} className="w-full max-w-sm">
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-card transition hover:shadow-lg">
                <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <iframe
                    className="h-full w-full border-0"
                    src="https://www.youtube.com/embed/wIubbANMLAI"
                    title="Speedtouch Transformation Short"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="mt-5 px-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-pink-soft px-2.5 py-0.5 text-xs font-semibold text-brand-pink-deep">
                    <Play className="h-3 w-3 fill-current" />
                    Transformation Reel
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">
                    Quick transformation snippet
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    A quick behind-the-scenes look at the speed, care, and quality our crew brings to every single job.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkShowcase
