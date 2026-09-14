# Voyara Travel — Portfolio Case Study

**Live demo:** [voyara-travel-demo-navy.vercel.app](https://voyara-travel-demo-navy.vercel.app)

A frontend case study for a travel agency / tour operator booking platform. "Voyara Travel" is a fictional demo brand built to showcase UI/UX, booking flows and multi-language support for a digital travel product. No real business, client data or live backend is involved — see [`CASE-STUDY-NOTES.md`](CASE-STUDY-NOTES.md) for full background on scope and sanitization.

Built and maintained by **Carmine D'Alise** — Travel, Hospitality & Maritime Digital Solutions ([www.cdalise.com](https://www.cdalise.com) · info@cdalise.com).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| PDF export | [jsPDF](https://github.com/parallax/jsPDF) (booking summaries / quotes) |
| Deployment | [Vercel](https://vercel.com) |

This build is intentionally **frontend-only** — no database, no payment processing, no email service wired up. Forms simulate a successful booking (confirmation UI, PDF download, WhatsApp handoff) without persisting data anywhere. This keeps the demo simple, fast and dependency-free; a production version would connect these flows to a real backend (Supabase, Stripe, etc.).

## Pages

- **Home** — hero, search, popular packages, reviews
- **Packages** — curated trip packages, package detail view
- **Create Package** — custom package builder with PDF quote export
- **Booking** — quick request form (flights / hotels / visas / packages)
- **About** — case study background
- **Contact** — contact form + info

## Languages

**EN, AR, IT, RU, DE** — language switcher on every page, automatic RTL layout for Arabic.

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required to run this demo.

## About This Project

This repository is a sanitized, trimmed-down portfolio case study — see [`CASE-STUDY-NOTES.md`](CASE-STUDY-NOTES.md) for the full history: original scope, what was removed and why, and privacy/sanitization checks performed.
