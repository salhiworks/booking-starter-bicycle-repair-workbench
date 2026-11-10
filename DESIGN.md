# Design — "Workbench"

**Chainline Bicycle Workshop** is a fictional independent workshop on Butler Street in
Lawrenceville, Pittsburgh. It repairs and services **road, gravel, commuter, hybrid and
touring bikes**, and offers **bike fitting** as its specialty. It does not service e-bike
motors, batteries or electrics. A *chainline* is the straight line a chain runs from the
chainring to the cog — when it is right, nothing rubs, skips or wears early. The name is a
mechanic's word and the workshop's promise: things lined up, done properly.

## Who it is for, and what they want to know

- **Commuters and everyday riders** whose bike has started making a noise, slipping gears or
  braking softly. They want to know: *can you look at it, what will it cost, how long will
  you keep it?* — and they often don't know what to book.
- **Road and gravel riders** who look after their bikes and plan longer rides (the Great
  Allegheny Passage starts in town): a tune-up, a safety check before a trip, wheel and tyre
  work.
- **Riders who want a bike fit** — on a new bike, before a long ride, or because something
  doesn't feel right — and want to know what a fit actually involves, how long it takes and
  what it costs, without medical promises.

Every section answers one of their questions: *Can you service my bike?* (the first screen's
"We work on" line and the one thing we don't). *Can I trust you?* (the bench photographs,
"nothing without your OK", torque, old parts on request). *What's the difference between an
assessment, a repair and a fitting?* (the three kinds, each length labelled for what it is).
*How much?* (Free · Labour from — parts extra · Fixed price). *How long will you keep it?*
(a ready date at check-in, never a promise before the bike is seen). *How do I book?* (every
Book button; the "not sure?" route). *What should I bring?* (Good to know; the fitting's own
"What to bring").

## The idea

A well-kept workbench in daylight: a white pegboard where every tool has its place, a long
bench, a truing stand — and a rider who can see exactly what is being done. The design takes
three things from that bench:

1. **Order.** Everything labelled, everything in its place. Services read like a workshop
   price board: name and purpose left, then two labelled figures — the time (Appointment ·
   Check-in · Session) and the price (Free · Labour from · Fixed price) — and a Book button.
2. **The measuring scale** — the one ornament. Fine ticks every 6 px with a longer one every
   fifth, like the edge of a steel rule. It sits where something is measured or checked: along
   the foot of the first photograph (the bench edge), in every section label, along the two
   job-sheet tracks of *How it works*, above the price note, along the booking sheet's header
   and the booking band's top edge. It never carries numbers — a scale with invented values
   would be the "fake technical diagram" this design refuses.
3. **The marker.** Workshops mark things with a paint pen or a strip of hi-vis tape: *this
   one*. The brand's one colour — workshop yellow `#f2c200`, owner-editable — is used only as a
   fill: the main buttons, a stroke under the owner's highlighted words, the "Not sure what
   your bike needs?" band, the booking band, selected choices in the booking sheet, a "Free"
   price. **Yellow never carries text on white**; text on yellow is ink (11.4:1).

What it avoids, on purpose: black-and-red racing branding, neon, speed lines, performance
dashboards, gradients, card grids, invented credentials, ratings or "years of experience",
and any diagram with made-up numbers.

## Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f4f4f1` shop white | the page |
| `--raised` | `#ffffff` | the first screen, the header, inputs, the booking sheet |
| `--oat` | `#e8e9e5` bench grey | *On the bench*, *The workshop*, the booking summary |
| `--ink` | `#16191c` chain black | headings, figures, focus rings, state edges — 16.9:1 on the page |
| `--ink-soft` | `#2e3338` | body text — 12.4:1 |
| `--muted` | `#555a5f` | labels, small print — 6.6:1 on the page, 6:1 on bench grey |
| `--forest` | `#1a1e22` graphite | *Bike fitting*, the footer, the booking sheet's header |
| `--on-forest` / `-soft` / `-faint` | `#f2f2ee` / `#c4c8cb` / `#9ba1a6` | text on graphite — 15.9 / 10.6 / 6.7:1 |
| `--accent` | `#f2c200` workshop yellow (**owner-editable**) | fills only; text on it is `--on-accent` (ink) |
| `--accent-glow` | = accent | the marker on graphite (focus, step numbers, the scale) — 11:1 |
| `--mark` | `#2c6e47` | the "open now" dot |
| `--clay` | `#b0261b` | errors (always with words) |

The owner picks a new marker colour in the dashboard → Website → Brand. The editor checks it
against near-black text at 4.5:1, so it must be a light, bright colour (safety orange, lime,
sky blue…); a dark colour is refused because the buttons' ink text would not read. Where a
marker colour would otherwise have to carry text or a state edge on white — links, focus
rings, a selected time's border, a chip's border — ink does instead (`--accent-text`,
`--accent-edge`, `--focus`), so the design stays accessible whatever the owner chooses.

The packaged dashboard gets one accent per appearance (`src/admin-theme.css`): **ink with
yellow text** in Light (a black workshop tag — yellow can't carry text on white), the
**yellow itself with ink text** in Dark.

## Type

- **Barlow Semi Condensed** 500/600 — headlines, figures (lengths, prices, step numbers), small
  capital labels. A low-contrast grotesk drawn from California highway signage; semi-condensed
  and semibold it reads like a component's spec plate: firm, technical and calm, never
  "racing". Sentence-case headlines, never shouted.
- **Barlow** 400/500/600 — everything else, with tabular figures.
- Heading style (owner): *Condensed* (default) or *Regular width* — the same layout with Barlow
  headings.
- Highlighted words (`*asterisks*` in any title) are underlined with a 0.2 em stroke of the
  marker colour, never recoloured.

## Layout and composition

Left-aligned, on a 12-column page up to 80 rem, gutters from 16 px. Square, machined edges;
2 px rounding on controls only; photographs never rounded.

1. **First screen** (white) — words left (eyebrow, headline with one marker stroke, one
   paragraph, *Book an appointment*, "Not sure what it needs? Book a free assessment", today's
   hours); the photograph right at 3:2 with the scale along its foot; under it, a 2 px ink rule
   and *We work on* — Road bikes · Gravel & all-road · Commuter & city bikes · Hybrid & touring
   — and "Not e-bike motors or batteries." Phones: words and both actions inside the first
   screen, then the photograph at full width (3:2 keeps the wheel whole), then the list.
2. **01 Services & prices** — three numbered facts on 2 px ink rules (a check-in is not the
   repair · "labour from" means parts extra · a ready date once we've seen it); the yellow
   *Not sure what your bike needs?* band with an ink *Book a Repair Assessment* button; then the
   three kinds as a price board — kind title and note left (sticky on desktop), rows right.
   Each row: name, what happens, *For*, then **two labelled figures** — the time with one honest
   line under it ("With a mechanic, bike in hand" · "The bike stays — the work is booked in
   after" · "The whole session, with you and your bike") and the price with its line ("Any work
   is quoted first" · "Parts extra — quoted first") — and *Book*. Under the board, the price
   note beside a length of scale.
3. **02 On the bench** (bench grey) — six details in three level columns, upright + wide in
   each; captions open with a small marker bar; a "Sample photos" line.
4. **03 Bike fitting** (graphite) — the rider on the trainer (4:5) with the saddle adjustment
   overlapping its corner, sticky on desktop; beside them: what a fit is for, *What a session
   involves* in five numbered steps (yellow numbers), *What it doesn't include* and *What to
   bring* side by side, and the fitting sessions from the engine — name, length · price, Book.
5. **04 How it works** (shop white) — two job sheets side by side, *A repair* (5 steps) and
   *A fitting* (3), each under a full-width scale; under them *What a booking covers* behind
   a marker-yellow left edge. No photographs, so the page stays short.
6. **05 The workshop** (bench grey) — words left; two overlapping wide frames right (the work
   stand, the bench); four standards on 2 px ink rules.
7. **06 Good to know** — nine questions as native disclosure rows; "Sample policies" label.
8. **Book an appointment** — the one band filled with the marker colour, the scale in ink
   along its top edge, three steps and an ink button.
9. **07 Visit** — hours with *Today* tagged in yellow, contact and directions, finding us.
10. **Footer** (graphite) — the name set huge in condensed capitals on a marker bar, the
    sections, contact, owner login.

## Photography

One workshop, one shoot (Anton Savinov on Unsplash): a white pegboard tool wall, a long white
bench, a blue truing stand, two mechanics. It is real bench work — truing, brakes, cassette,
cables, levers, a saddle clamp — not bikes parked outside or product shots. The whites of the
pegboard become the page's shop white; the tool blues and the sweatshirt orange are left as
they are (a touch quieter) and never copied into the palette, so the photographs stay the
colour on the page. The fitting photograph (gabbiistudios) is a rider on a trainer in a plain
light studio, shown on the graphite band as a separate fitting area. Every photo is labelled
*Sample* until the owner replaces it; nothing claims the people are the workshop's mechanics
or riders. Details: `PHOTOS.md`.

## Booking

The shared booking sheet, styled: a white sheet with a graphite header, the business name in
small yellow capitals and the measuring scale along its foot (full screen on phones, a side
sheet from 960 px). Step 1 groups services in the page's kinds and labels each length the same
way ("Check-in 20 min · labour from $95 + parts", "Session 2 h · $225 fixed price"). The
summary repeats the honest lines ("Your check-in — the bike stays, the repair follows",
"A starting price for labour — parts and extra work quoted before we start", "Paid in the
workshop, not online"). Selected days and times are filled yellow with an ink edge. The notes
field is **About your bike (optional)** — bike type, the issue, or for a fitting the riding
style and setup; nothing medical. The done step says **"Request received — we'll review your
appointment and confirm the time shortly."**, then — for a repair — that this books time with a
mechanic, not the repair, and for a fitting what to bring.

## Interaction and motion

- One entrance on the first screen (words rise, the photo settles); nothing else animates
  except hover states (the nav's marker underline, the arrow in buttons) and the FAQ's plus.
- `prefers-reduced-motion` removes all of it.
- Every tap target is at least 44 px; focus is a 2 px ink ring (yellow on graphite and on
  nothing else); the header keeps *Book* in reach on every screen; the phone menu closes on
  Esc.
- The Live Demo dock is the shared one; the booking sheet is a modal `<dialog>`, so the dock
  steps aside while it is open.

## Accessibility checks

Every text/background pair is at least 4.5:1 (lowest: `--muted` on bench grey, 6:1; the
contrast script in `concepts/bicycle-repair-workbench/contrast.mjs` checks the rendered page
and the sheet). Colour never carries meaning alone: "Free" is a word, selected choices also
have an ink edge and `aria-pressed`, the open dot has its sentence.
