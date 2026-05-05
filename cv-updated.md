# OLADIMEJI BENJAMIN OLAOLUWA

No 23 Rose Wale, Iwo Road, Ibadan, Oyo State, Nigeria
+234 706 302 6374 · benjaminsolaben@gmail.com
[github.com/ola-ben](https://github.com/ola-ben)

---

## CAREER PROFILE

Junior Full-Stack Developer who owns production web apps end-to-end. Currently leading **Ajani** ([ajani.ai](https://ajani.ai)) — a React + Express 5 + MongoDB booking marketplace for hotels, shortlets, and event halls in Oyo State — and built **EatOrder**, a deployed food delivery + reservations platform on Vercel/Render with Supabase Postgres and Row Level Security. Comfortable with React 18/19, Tailwind v4, Framer Motion, TanStack React Query, REST API design, JWT-based RBAC, and modern deploy pipelines. Cares about clean architecture, accessible UX, performance, and shipping real features fast.

---

## WORK EXPERIENCE

### Junior Full-Stack Developer

**K3Bot / AjaniAI** — Ibadan, Oyo State, Nigeria · [ajani.ai](https://ajani.ai)
_October 2025 – Present_

- Sole developer on the Ajani platform — own frontend, backend, database, and deploy pipeline end-to-end, reporting directly to the founder.
- Translate product direction into shipped features on a weekly cadence: scope tickets, build, test, deploy, and iterate from daily reviews.
- Architect and ship the React + Vite frontend, Express 5 / MongoDB REST API, JWT-based RBAC, and Cloudinary asset pipeline.
- Build and maintain the three audience surfaces — buyer search & booking flow, vendor portal (listings, availability, payouts, accept/reject), and admin moderation panel.
- Run DevOps for the project: Vercel + Render deploys, env-var management, Resend transactional email, PDFKit receipts, and analytics instrumentation.

### Front-End Engineer | MIS Specialist (Intern)

**State Operations Coordinating Unit (SOCU)** — Oyo State Government Secretariat, Ibadan
_January 2025 – December 2025_

- Supported the National Social Safety Nets Project (NASSP) by managing data systems that tracked poor and vulnerable households across rural communities in Oyo State.
- Designed and developed front-end web interfaces using HTML, CSS, JavaScript, and React.js to visualize data collected from field operations.
- Maintained and updated the Social Register Database, ensuring data integrity, security, and timely reporting.
- Created dashboards and tools for internal stakeholders to access program data and monitor poverty-alleviation interventions.
- Collaborated with data enumerators, M&E teams, and program officers to streamline data collection, validation, and reporting processes.
- Provided technical support for MIS infrastructure and helped automate report generation for improved decision-making.

---

## PROJECTS

### Ajani — Full-stack hotels, shortlets & event-halls booking platform for Oyo State

**[ajani.ai](https://ajani.ai)**
_React 18 · Vite · Tailwind v4 · Framer Motion · React Query · React Router 7 · Express 5 · MongoDB / Mongoose · Supabase Auth · Cloudinary · Resend · JWT_

- Architected an end-to-end booking marketplace covering customer search, vendor onboarding, admin moderation, payments, reviews, and AI-assisted price intelligence — **three audiences (buyers, vendors, admins) on one codebase**.
- Designed a layered **Express 5 REST API** (`routes → middlewares → controllers → services → models`) with JWT auth, RBAC, helmet, CORS allow-listing, express-rate-limit, hpp, mongo-sanitize, and centralized error handling.
- Modeled domain entities (`User`, `Listing`, `Booking`, `Review`, `Payment`, corporate accounts) in MongoDB via Mongoose; integrated **Cloudinary** image uploads (multer), **Resend / nodemailer** transactional email, and PDF receipts via `pdfkit`.
- Built a **Vite + React 18** frontend with route-level code splitting, **TanStack React Query** caching, **Framer Motion** shared-element transitions (Airbnb-style search popovers via `layoutId`), and SEO-friendly slugs + sitemap.
- Shipped an **Airbnb-inspired hero search** (portal-rendered Where/When/Who popovers, two-month range calendar, location autocomplete) plus a **vendor portal** (AI listing description generator, touch-drag availability calendar, payouts, accept/reject by email-link) and **admin panel** (AI Price Intelligence, automation, field-agent management).
- Instrumented **multi-step analytics** (search → view → booking funnel, IntersectionObserver impression batching) feeding downstream BI; built a one-click `/booking-action` page so vendors approve/reject from an email link.

### EatOrder — Full-stack food delivery + reservations platform

**[eatorder-green.vercel.app](https://eatorder-green.vercel.app)** · [github.com/ola-ben/eatorder](https://github.com/ola-ben/eatorder)
_React · Express · Supabase · PostgreSQL · Vercel · Render_

- Built and deployed an end-to-end food delivery platform with real-time customer ordering, table reservations, role-gated admin panel, and a query-based AI assistant — covering 15+ restaurants in Ibadan.
- Designed Postgres schema (`orders`, `order_items`, `reservations`) with **Row Level Security** policies and an auth-aware `SECURITY DEFINER` function — customers query Supabase directly while admin actions route through an Express service-role API on Render.
- Engineered a **Vite + React 19** frontend with route-level code splitting, **persisted React Query cache** (localStorage, 5-min staleTime), and skeleton loaders — eliminating perceived cold-start latency on Render's free tier.
- Implemented **Framer Motion** micro-interactions, mobile-first responsive design (5-tab bottom nav / desktop top nav), JWT-based RBAC via `app_metadata.role`, and a custom animated toast system using `useToaster()`.
- Wrote a layered Express backend (`routes → middleware → controllers → db`) with helmet, CORS allow-listing, and centralized error handling — deployed via GitHub auto-deploys.

### Speedtouch — Cinematic, installable landing site for a cleaning service

**[speedtouch-virid.vercel.app](https://speedtouch-virid.vercel.app)**
_React 19 · Vite · Tailwind CSS v4 · React Router 7 · Lucide / React Icons · vite-plugin-pwa · IntersectionObserver_

- Built a marketing site for a Nigerian cleaning service end-to-end: routed home and **/products** pages, a Jumia-style commerce strip with NGN pricing (`toLocaleString('en-NG')`), a service directory with mobile swipe carousel, and a brand-themed multi-section flow.
- Designed a **cinematic hero** with an autoplaying CC0 video background (Mixkit, hotlink-friendly), `onError` graceful fallback to a poster image, `isolate` stacking context, and a faded white gradient overlay so the dark Fraunces headline reads cleanly over the moving footage on mobile and desktop.
- Engineered a **mobile-first horizontal swipe carousel** (`snap-x snap-mandatory`, hidden scrollbar utility) with a live `1 / 6` index counter driven by `onScroll` distance-from-center math — and made entrance animations skip below `sm` via a custom `<Reveal>` component that respects `prefers-reduced-motion`.
- Wired **route-level code splitting** with `React.lazy` + `<Suspense>`, a hash-aware `<ScrollToTop>` for cross-route nav (`/#services` from `/products`), and a CSS-keyframed marquee in Tailwind v4's `@theme` for a service ticker.
- Made the site an **installable PWA** with `vite-plugin-pwa` (autoUpdate service worker, Workbox precache, custom SVG mark with maskable icon), and tuned **Vercel** deploy with SPA rewrites + 1-year `Cache-Control: immutable` on hashed assets and `must-revalidate` on `index.html`.

---

## EDUCATION

**B.Sci Economics** — Ladoke Akintola University of Technology, Ogbomoso, Oyo State, Nigeria
_Dec 2020 – Mar 2024_

**Diploma, Front-End Web Development** — Udemy _(2023)_
**Diploma, Facebook Front-End Web Development** — Coursera _(2024)_

---

## TECHNICAL SKILLS

**Frontend** · React 18 / 19, Vite, Tailwind CSS v4, Framer Motion, React Router 7, TanStack React Query, React Hook Form, Lucide / React Icons, Leaflet, JavaScript (ES6+), HTML5, CSS3
**Backend** · Node.js, Express 4 / 5, REST API design, Mongoose, Multer, Helmet, express-rate-limit, express-validator, hpp, mongo-sanitize
**Database & Auth** · MongoDB, PostgreSQL, Supabase (Auth, Database, Row Level Security), JWT, bcrypt
**Email & PDF** · Resend, Nodemailer, PDFKit
**Cloud & Tooling** · Cloudinary, Vercel, Render, cPanel, Git, GitHub, npm
**AI / Productivity** · Claude (Sonnet, Opus) for pair-programming and code review, Claude Code CLI, DeepSeek, ChatGPT, Cursor — comfortable scoping and shipping features alongside an AI agent
**Practices** · Role-based access control (RBAC), JWT authentication, route-level code splitting, persisted client caching, responsive mobile-first design, accessibility, analytics instrumentation, SEO-friendly slugs

---

## SOFT SKILLS

Communication · Problem Solving · Creativity · Teamwork · Time Management · Attention to Detail · Continuous Learning

---

## PORTFOLIO

GitHub · [github.com/ola-ben](https://github.com/ola-ben)
Ajani (live) · [ajani.ai](https://ajani.ai)
EatOrder (live) · [eatorder-green.vercel.app](https://eatorder-green.vercel.app)
Omnifood (live) · [omini-food-iota.vercel.app](https://omini-food-iota.vercel.app)

---

## REFERENCES

Available upon request.

---

_Open to junior / mid full-stack and front-end opportunities — remote or Ibadan-based._
