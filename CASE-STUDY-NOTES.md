# Voyara Travel — Case Study Notes

## Purpose

This repository is a sanitized portfolio case study derived from a real client project. It demonstrates a digital platform for travel agencies and tour operators — destination discovery, excursion/hotel/transfer catalogs, a booking journey, and an internal CRM (admin dashboard + agent portal). All real client branding, contact details, business history and identifying content have been removed and replaced with the fictional demo brand **Voyara Travel**. It is not a real operating agency.

Attributed to: **Carmine D'Alise** — Travel, Hospitality & Maritime Digital Solutions ([www.cdalise.com](https://www.cdalise.com), info@cdalise.com).

## Features

- Multi-language public site (EN, AR, IT, RU, DE) with RTL support for Arabic
- Tour, hotel, and transfer catalogs with detail pages and booking forms
- Shopping cart (React Context + localStorage)
- "Make Your Trip" custom booking wizard
- Contact page with form, FAQ, and WhatsApp-style CTA (demo/placeholder number)
- Events page with review carousel
- Printable PDF quotes and booking confirmations (jsPDF)
- Internal SaaS: admin dashboard and agent portal behind a demo (non-secure) login gate
- Site-wide access gate (password-protected preview, separate from the CRM login)

## Architecture Overview

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling**: Tailwind CSS v4 + CSS Modules for dashboard/agent
- **Data**: catalog content (tours, hotels, transfers, events, reviews) lives as static TypeScript modules under `lib/`
- **Backend**: Supabase (Postgres) for bookings/contact form submissions, with Row Level Security policies defined in `supabase/schema.sql`
- **PDF generation**: client-side via `jspdf` for quotes and booking confirmations

## External Services (need fresh demo credentials)

- **Supabase** — requires a new project; the original project URL/anon key have been removed from `.env.local` and replaced with placeholders. Run `supabase/schema.sql` against a fresh project to recreate the schema.
- **Stripe** — test-mode placeholder keys only (`pk_test_your_key` / `sk_test_your_key`); payments are not actually wired up to a live flow.
- **Resend** (transactional email in `app/api/notify/route.ts`) — `RESEND_API_KEY` left blank; needs a demo API key to send notification emails.

## Environment Configuration

See `.env.example` for the full list (no real values included):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `RESEND_API_KEY`
- `SITE_ACCESS_PASSWORD` — gates the whole site behind a simple password (demo purposes)
- `SITE_SESSION_SECRET` — random 96-char hex secret used to sign the site-access session cookie

## Sanitized Elements

- Brand name "Cyro Tours" / "Cyro" replaced throughout with "Voyara Travel" (all 5 languages, code, metadata, CRM logos)
- Real domain `cyrotours.com` replaced with placeholder `voyara-travel-demo.example`
- All real contact info (phone `+20 102 259 9839`, WhatsApp/Viber links, `gm@cyrotours.com`) replaced with `info@cdalise.com`; phone/WhatsApp CTAs now use an obviously fake placeholder number `+00 000 000 0000` / `000000000000`
- Real social handles (`facebook.com/people/Cyro-tours/...`, `tiktok.com/@cyrotours.official`, `youtube.com/@cyrotours.official`, `instagram.com/cyrotours.official`, `m.me/cyrotours`) replaced with placeholder demo handles
- Real street address ("Mall 8, in front of Casino Royal, Naama Bay — Unit 10, 1st floor") replaced with a labeled placeholder ("Demo Business Center, Example City")
- Removed fabricated/real company history: "operating since 1975" and "License #145 — Egypt Ministry of Tourism" claims removed everywhere (about, terms, footer, PDFs, printable sign)
- `app/about/page.tsx` fully rewritten as a portfolio case-study description per brief, attributed to Carmine D'Alise, with no invented clients/results/partnerships
- Real client logo files (`public/logo.png`, `public/logo-banner.png`) are no longer referenced by any page — all logo usages (nav, footer, login, printable sign) were replaced with a simple text/initial-based placeholder mark built in code. The image files themselves are still present on disk (unused) — **flagged for human review/removal**, see TODO
- `public/documents/license.pdf` (an unreferenced real business license document) was deleted
- `lib/reviews.ts`: real Google/Tripadvisor reviews naming real guides (Mostafa, Seif Sabry, Islam, Eslam, Osama) and even a different real company name ("Sun Pyramids Tours") were replaced with clearly-labeled generic "Demo Traveler" sample reviews
- `app/events/PartnersStrip.tsx` (claimed real partnerships with AirCairo, Steigenberger, Le Meridien, ASTA, IATA, GetYourGuide) removed from the events page — kept in the repo but unused, since implying real-world partnerships in a demo is misleading
- Confidential commercial documents deleted entirely (not rebranded): `docs/pitch.html`, `docs/proposta-professionale.html`, `docs/proposta-professionale.md`, `docs/roadmap-v2.html`, `docs/roadmap-v2.md`
- `README.md` rewritten to describe the Voyara Travel case study, no client-specific setup notes
- `.env.local` real Supabase URL/anon key, real-looking access password (`CyroTest2026!`) and session secret replaced with placeholders; new `.env.example` created
- `supabase/schema.sql` reviewed — contains only table/RLS definitions, no seed data or real PII, no changes needed

## Privacy Checks Performed

- Case-insensitive search for "cyro" across the entire repository (excluding `node_modules`) — zero remaining hits
- Searched for the real phone number, WhatsApp links, Viber links, email addresses, street address, license number, founding year/history — all replaced or removed
- Searched `public/` for filenames referencing the client brand — none found; flagged the two real logo image files and the license PDF (PDF deleted, logo files flagged below)
- Reviewed `supabase/schema.sql` for hardcoded real project refs, seed data, or PII — none present
- Reviewed testimonials/reviews data for real personal names and other real company mentions — sanitized (see above)
- Reviewed a false "partners" strip implying real-world brand partnerships — removed from the page

## Local Dev Instructions

```bash
npm install
cp .env.example .env.local   # fill in your own demo Supabase/Stripe values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `supabase/schema.sql` in a fresh Supabase project's SQL editor to create the tables the app expects.

## Deploy Instructions (generic Vercel/Next.js)

1. Push this repository to your own GitHub/GitLab repo.
2. Import the repo into Vercel (or any Next.js-compatible host).
3. Set the environment variables from `.env.example` in the hosting provider's dashboard using your own demo Supabase project and Stripe test keys.
4. Deploy — Next.js 16 App Router builds and runs out of the box on Vercel.
5. Since `robots: { index: false, follow: false }` is set in `app/layout.tsx`, the demo will not be indexed by search engines by default; remove that if you want it discoverable.

## Round 2 — Final Asset Cleanup & Build Verification (2026-09-14)

- **`public/logo.png` and `public/logo-banner.png`** — deleted permanently. No other image/asset filenames referencing the original client brand were found in `public/`.
- **`app/events/PartnersStrip.tsx`** — deleted permanently (was unused/unimported, contained real brand partnership claims).
- **Security check before build**:
  - `.env.local` — contains only placeholders (`your-project.supabase.co`, `your-anon-key-here`, Stripe `pk_test_your_key`/`sk_test_your_key`, empty `RESEND_API_KEY`, demo password, freshly-generated session secret). No real credentials present.
  - `.env.example` — placeholders only, matches `.env.local` structure.
  - `.gitignore` — `.env*` excludes `.env.local` from Git; added `!.env.example` exception so the example file stays trackable.
  - No `sk_live`/`pk_live` keys, no real Supabase URLs, no real phone/email/social IDs found anywhere in the repo (excluding `node_modules`).
- **`npm install`** — ✅ succeeded. Note: the environment's shell had `NODE_ENV=production` set globally, which silently made npm skip all `devDependencies` (Tailwind, ESLint, TypeScript — only 61/62 packages installed instead of ~400). Re-ran with `NODE_ENV=development` to get all 399 packages. **`package-lock.json` was NOT modified** (same hash before/after).
- **`npm run build`** — ✅ succeeded (all 27 routes compiled) after one fix: added `turbopack.root` to `next.config.ts`. Root cause: a stray, unrelated `.git`/`package-lock.json` exist in the Windows user home directory (`C:\Users\aeria`, outside this project — pre-existing environment issue, not part of this case study), which confused Turbopack's workspace-root auto-detection and broke module resolution (`Cannot find module '@tailwindcss/postcss'`) even though the package was correctly installed. Explicitly pinning `turbopack.root` to the project directory fixed it. This is an environment/config fix only — no functionality, architecture, or design changed.
- **`npm run lint`** — ⚠️ 10 errors / 8 warnings, all **pre-existing**, unrelated to the sanitization work (unescaped apostrophes in JSX text, a couple of React-Compiler purity rules like `setState` inside `useEffect` and `Date.now()` during render, a few unused-var/exhaustive-deps warnings). None of these block the build (Next 16's build step does not run ESLint as a gate here) or affect runtime functionality, so per instructions ("fix only what's needed to make the project work") they were left untouched. Listed here for visibility:
  - `app/not-found.tsx`, `app/packages/create/page.tsx`, `app/quick-booking/page.tsx`, `app/tours/[slug]/page.tsx` — unescaped `'` in JSX (cosmetic lint rule)
  - `app/packages/create/page.tsx` — `Date.now()` called during render (pre-existing)
  - `lib/cart-context.tsx`, `lib/cms.ts`, `lib/useCrmAccess.ts` — `setState` called synchronously inside `useEffect` (pre-existing pattern, common and functional but flagged by React Compiler lint rules)
  - Various unused-variable / exhaustive-deps warnings in `EgyptGallery.tsx`, `tours/page.tsx`, `vetrina/page.tsx`, `pdf-quote.ts`
- **Final global search** — re-confirmed zero case-insensitive "cyro" hits outside `CASE-STUDY-NOTES.md`; no `cyrotours` domain hits; no real phone numbers, real emails, or real social IDs found.

## Remaining TODO (needs human review)

- **New Supabase project** — the app currently has no working Supabase credentials; someone needs to create a fresh project, run `supabase/schema.sql`, and fill in `.env.local`.
- **Stripe** — only placeholder test keys are present; payment flow is not actually exercised end-to-end.
- **Resend** — no API key set; the `/api/notify` contact-form email notification will not send until one is added.
- **Demo reviews in `lib/reviews.ts`** — replaced with generic "Demo Traveler" placeholders; if a more polished-looking sample review section is wanted, a human should write new copy (do not restore the original real reviews).
- **WhatsApp/Viber/tel CTAs** using the placeholder number `+00 000 000 0000` (`000000000000`) will not functionally work (by design — they are clearly fake). A human should decide whether to hide these CTAs entirely or wire them to a real demo number before any live demo/interview walkthrough.
- **Pre-existing lint errors/warnings** listed above — optional cleanup, not blocking.
- **Note on dev environment**: if running `npm install` locally and it seems to install far fewer packages than expected, check `NODE_ENV` isn't set to `production` in your shell — it silently skips devDependencies.
