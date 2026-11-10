# Bicycle Repair & Fitting Studio "Workbench" Starter — project rules

A one-page booking website for an independent bicycle workshop that repairs and services bikes
and offers bike fitting, shipped as **Chainline Bicycle Workshop** (a fictional workshop in
Lawrenceville, Pittsburgh: repair assessments, a pre-ride safety check, tune-ups, brake and
shifting work, wheel and tyre service for road, gravel, commuter and touring bikes, and bike
fitting) for the owner to make their own. Its identity lives in `src/site.config.ts`;
`CUSTOMIZE.md` is the prompt that personalizes it. Built around
**@profitstudio/booking-engine** **2.0.0-beta.3** (pinned; lock in `booking-engine.lock.json`).
The engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`
  (never re-derive them from `startsAt` in the browser: browser and server time-zone data can disagree).
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll confirm your appointment shortly.", confirmed → "Your appointment is booked.").
  Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one appointment + one rider, on one shared calendar (one mechanic's time).**
A booking is never the repair job: a servicing or repair booking is the **check-in** (the
time to look the bike over and agree the work — the bike stays, the work follows), an
assessment is time with a mechanic, a fitting is the whole session. The repair's scope, its
price, the parts and the ready date are agreed in the workshop. A new booking feature needs a
new engine version — never custom database code or browser-side logic in this project:

- estimates or prices computed from a bike, parts or the work chosen; a separate parts price
  beside the labour price; add-ons, bundles or several linked bookings;
- deposits, payments, checkout, crediting a fee against later work;
- repair tickets, work orders, parts inventory, "ready for pick-up" notifications, storage;
- several mechanics or fitters with separate calendars, work-stand or bay capacity;
- bike profiles, maintenance history, fit records or fit measurements stored online;
- photo uploads of the bike, serial numbers, rentals;
- advanced fitting analytics (motion capture, pressure mapping) or any health record.

The booking notes field is **About your bike (optional)**: bike type, the issue noticed, or
for a fitting the riding style and current setup. Never ask for medical history, injuries or
other sensitive details, serial numbers or photos. Proposed engine work:
`docs/ENGINE-PROPOSAL-bicycle-repair.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/New_York`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample services, hours, policies; "riders"/"appointments") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kinds (from the name, then the description), time terms (appointment · check-in · session), price terms (free · labour from · fixed price), the "not sure?" assessment, "For:" parsing, duration labels | `src/lib/services.ts` |
| What the owner can edit (texts, every section photo, the six frames on the bench, the two fitting photos, the bikes-we-work-on list, the three appointment facts, the "not sure?" band, the fitting steps, both how-it-works tracks, logo, marker colour, heading style) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variables (`--accent`, `data-headings`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero, Services — services & prices `#services`, Gallery — on the bench `#bench`, Fitting — bike fitting `#fitting`, Process — how it works `#how`, Studio — the workshop `#workshop`, GoodToKnow, Visit, Footer; `SectionMark` the number · scale · name label; `Emphasis` renders the owner's `*highlight*` with the marker stroke); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes (from `getOpeningTimes`, fallback to weekly hours) | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, prices, durations,
  hours, the address, phone and email are NOT content: they come from the engine. The engine does not allow
  default images inside list fields — that is why each frame on the bench (`gallery.photo1…6`) and each
  fitting photo (`fitting.photo`, `fitting.photo2`) is its own image field.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. Keep it that way for any
  new button. A service row's Book passes that service's engine id — never a hard-coded id. The "not sure?"
  link and band pass `generalAssessment(services)` — found by name, never hard-coded.
- **Kinds:** the engine has no categories, and service ids are database UUIDs unknown at build
  time, so `kindOf()` reads the NAME (then the description) against `RULES` (first match wins:
  fit/fitting/cleat → Bike fitting; assessment/inspection/check/diagnosis → Assessments & checks;
  tune-up/service/repair/brake/gears/wheel/tyre… → Servicing & repairs; no match → "More
  appointments"). A new kind or keyword goes in `RULES` (and a note field in `site.ts`); keep
  `concepts/bicycle-repair-workbench/kinds.test.mjs` (Niche Pack workspace) passing. Never
  hard-code a service, duration, price or id on the page.
- **For:** what a service is for is the part of its description after "For:", split at "·"
  (`splitDescription`). Never add a separate, hard-coded list.
- **Durations:** always labelled through `timeTerms()` — **Session** (fitting: the real length),
  **Appointment** (assessment/check: time with a mechanic), **Check-in** (servicing/repair: the
  bike stays, the work follows). Never write that a repair is done, ready or finished within an
  appointment's length, and never promise a ready date before the bike is seen.
- **Prices:** show the engine's price through `priceTerms()`: 0 → "Free" (any work quoted
  first); `priceFrom` → "Labour from" (parts and extra work quoted first); a fixed price →
  "Fixed price" (the appointment itself — the description says what is not included); none →
  "Quoted after inspection". Never present a starting price as a total, never suggest anything
  is paid online, and never fold parts into a fitting silently.
- **Fitting claims:** describe only equipment the workshop really uses (by default a trainer,
  measuring tools, a plumb line and a level). No motion capture, pressure mapping or lab
  equipment unless the owner really has it; no diagnosing, treating or preventing injuries or
  medical conditions; no performance promises.
- **Safety:** a check is a check, not a guarantee — never claim a bike is road-safe or safe to
  ride because it was booked or checked.
- **Default photos:** add your own variants to `public/photos/` (the original downloads and their script are
  not part of this starter), keep the default `src` in `site.ts` equal to a key in `photoVariants.ts`, record
  the source in `PHOTOS.md`. If the first-screen default changes, update the `<link rel="preload">` in
  `index.html` (`imagesizes` must match `HERO_SIZES` in `src/components/Hero.tsx`). The first-screen photo is
  3:2 on every screen: keep the whole wheel in the frame.
- **Sample photos:** every section photo carries a "Sample" label until the owner replaces that field
  (`ownerFields`); On the bench says the photographs are another bicycle workshop's, and in preview and the
  Live Demo the workshop section says the workshop and mechanics are stock. Never present a stock photo as
  the workshop's own space, mechanic, rider or work; never name a photographed person; never name or promote
  a brand visible in a photo; never invent a mechanic's name, years of experience, certifications, awards,
  reviews or testimonials.
- **Policies:** Good to know shows a "Sample policies" label until the owner edits `faq.items`.
- **Service photos** are the owner's (`service.image`, dashboard → Services; shown as a small thumb in the
  row). Never add stock pictures for single services.
- **Copy:** plain, precise, practical; "riders", "the bike", "a mechanic". Honest about limits ("if a repair
  isn't worth doing, we say so"); no guaranteed outcomes, turnaround or safety, no scarcity pressure, no
  "best in town", no racing hype. No e-bike electrical or battery work unless the owner really offers it.
- **Style:** plain CSS with the tokens; no UI kit. Keep 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, and every text/background pair at 4.5:1 (see DESIGN.md). The marker colour
  is owner-editable and is a FILL only: on it text is `--on-accent` (ink); text, focus rings and state edges
  on light backgrounds use `--accent-text` / `--focus` / `--accent-edge` (ink); on graphite use
  `--accent-glow`. Photographs are square-cornered.
- **Composition:** editorial and left-aligned (DESIGN.md → Layout). New sections open with `.section-head`
  (SectionMark + h2 + intro). The measuring scale (`.ticks`, never numbered) stays the one ornament — no
  bike icons, gear clip-art, speed lines or technical diagrams with values.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5181 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
