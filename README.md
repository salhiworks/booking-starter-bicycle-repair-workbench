# Bicycle Repair & Fitting Studio Booking Website — "Workbench" Starter

A finished, premium booking website for an independent bicycle workshop that repairs and
services bikes and offers professional bike fitting, ready to make your own with Claude Code
and publish on Hostinger. It ships as **Chainline Bicycle Workshop**, a fictional workshop in
Lawrenceville, Pittsburgh, for road, gravel, commuter and touring bikes:

- a one-page workshop website — a first screen with real work at the bench (a wheel in the
  truing stand, the whole wheel in frame), a firm condensed headline, **Book an appointment**,
  the **"Not sure what it needs? Book a free assessment"** route, today's hours and the bikes
  the workshop takes (and the one thing it doesn't); **services & prices** that say plainly what
  you are booking — an *assessment* is time with a mechanic, a *servicing or repair* booking is
  a **check-in** (the bike stays, the work follows), a *fitting* is a real **session** — with
  prices as **Free**, **Labour from** (parts extra, quoted first) or a **Fixed price**; six
  frames *on the bench*; **bike fitting** on its own graphite band (what a session involves,
  what it doesn't include, what to bring, the fitting sessions); **how it works** as two job
  sheets (a repair, a fitting); the workshop; *Good to know* (sample policies, labelled);
  directions — from 320 px phones up, with booking in a sheet over the page;
- online booking — one appointment per booking, a day and time, contact details and an
  optional note **About your bike**, and an emailed 6-digit code; the workshop confirms each
  request ("Request received — we'll review your appointment and confirm the time shortly"),
  and agrees a repair's scope, price and ready date once it has seen the bike;
- the owner dashboard at `/admin/` — requests to confirm, services and prices, opening hours
  and closures, email health, and the website's own text, photos, marker colour and heading
  style.

The look — *Workbench*: a well-kept workbench in daylight. Shop-white pages, chain-black
type, bench grey and graphite bands, and one **marker colour** (workshop yellow by default)
used as a fill — the main buttons, a stroke under highlighted words, the "not sure?" band, the
booking band. The one ornament is the **measuring scale**: fine ticks with a longer one every
fifth, like the edge of a steel rule, never numbered. Barlow Semi Condensed headlines over
Barlow; square, machined edges.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0-beta.3** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your workshop. Claude edits a short list of
files (name, city, words, colours) — the booking system, the dashboard and the layout stay
as they are, so it is quick and cheap.

Services, prices, opening hours and contact details are **not** code: you set them in the
dashboard once the booking backend is connected. **Your own photographs** — the first
screen, the six frames on the bench, the two fitting photos and the two workshop photos — go
in the dashboard → Website; each sample photo stays labelled "Sample" until you replace it.
Mechanics' names and qualifications are yours to add: the starter invents none.

**A booking is an appointment, not the repair.** The booking engine books appointments on
one shared calendar. A repair or service booking is the **check-in** — the time to look the
bike over and agree the work — never the time the repair takes; a fitting is the whole
session. **Prices have three honest shapes:** *0* is shown as **Free**, a *starting price* as
**Labour from** (parts and extra work quoted first), a *fixed price* as the appointment's
**Fixed price** (fittings, the safety check). Nothing is paid online. Estimates, parts,
repair tracking, ready-for-pick-up messages, deposits, several mechanics' calendars, bike
profiles and fit records are not part of the engine (see *What the engine does not do* in
`CLAUDE.md`).

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells
you exactly what is left for you to do (your dashboard login and the two email secrets).
Full steps: the Profit Studio guide *Build a Premium Booking Website with Claude Code*,
Step 3, or `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App**
from it (Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero`, `Services`, `Gallery` — on the bench, `Fitting`, `Process` — how it works, `Studio` — the workshop, `GoodToKnow`, `Visit`…) and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample services and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How services find their kind (by the words in their names), what their time means (appointment · check-in · session), what their price means (free · labour from · fixed) and what they are for (from "For:" in the description) |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md`, `ASSETS.md` | The Unsplash photos (Unsplash License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5181
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed file by file in
[`ASSETS.md`](ASSETS.md).
