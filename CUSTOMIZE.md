# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session
opened in this folder. It changes identity and words only, so it finishes in one short
session.

```text
Customize this bicycle repair and fitting workshop starter for my business.

Workshop name: <YOUR WORKSHOP NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/New_York>
The bikes we work on, what we don't, and our personality in a few words: <e.g. road, gravel and cargo bikes, no e-bike electrics, friendly and precise>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the workshop name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my workshop: the name mark
   (brand.wordmark — one short word) and the line under it, the line above the headline,
   headline, introduction, the "not sure?" link, the "We work on" title and lines and the
   line about what we don't work on, the services intro, the three "How appointments work"
   facts, the three kind notes, the "Not sure?" band, the note about prices, the bench intro
   and captions, the bike fitting texts (intro, what a session involves, what it doesn't
   include, what to bring), both "How it works" step lists and "What a booking covers", the
   workshop text and facts, Good to know answers (my real policies), the finding-us note and
   the search title and description. Keep field ids, types, limits and photos. Keep the
   sample photos (they stay labelled "Sample" until I upload my own). Headlines may underline
   one or two words with the marker colour using *asterisks* — keep that style. Keep the
   honesty rules: a repair booking is a check-in, not the repair; "labour from" means parts
   are extra and quoted first; nothing is paid online; no ready date is promised before the
   bike is seen; a fitting makes no medical claims and only names equipment I really use.
4. Only if workshop yellow clearly doesn't fit my brand (otherwise skip this step and don't
   open these files): change the default of brand.accent in src/content/site.ts (a light,
   bright fill colour — safety orange, lime, sky blue — that keeps near-black text at 4.5:1),
   the colours in src/admin-theme.css and the bar in public/favicon.svg.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent services, prices, opening hours, mechanics' names, years of experience,
certifications, awards, reviews, testimonials, turnaround or safety guarantees, or fitting
equipment I have not given — services, prices and hours are set in the dashboard. When done,
run npm run build and fix any error, then show me the result with npm run dev.
```

## After the prompt

- **Your services:** dashboard → Services. One booking is one appointment for one rider —
  never the repair job itself.
  - **Kinds.** The page sorts services by the words in their names, checked in this order:
    *fit / fitting / cleat / position / saddle height* → **Bike fitting**; *assessment /
    inspection / check / diagnosis / estimate* → **Assessments & checks**; *tune-up /
    service / overhaul / repair / brake / bleed / shifting / gears / derailleur / chain /
    cable / wheel / tyre / tubeless / truing / spoke / puncture / hub / headset / bottom
    bracket* → **Servicing & repairs**. A name with none of these is sorted by its
    description, otherwise it appears under "More appointments".
  - **Time.** The page labels each length for what it is: a fitting's as **Session** (the
    rider is there the whole time), an assessment's or check's as **Appointment**, a
    servicing or repair booking's as **Check-in** ("the bike stays — the work is booked in
    after"). Keep drop-off lengths short (the check-in itself), and agree the ready date at
    check-in. The buffer after each is your bench time to tag the bike.
  - **Price — three shapes.** Set **0** for a free appointment (the page says "Free — any work
    is quoted first"). Switch on **Starting price** for labour that starts at that amount: the
    page says "Labour from $95 — parts extra, quoted first". Leave it off for a fixed price
    for the appointment itself — a fitting session, a written check (the page says "Fixed
    price $225"). Say in the description what is not included.
  - **"Not sure?"** The hero link and the yellow band open the booking with your first
    assessment chosen — preferably one whose name says *repair*, *general* or *diagnosis*,
    then any *assessment*. Keep one free assessment if you can.
- **What a service is for:** end its description with `For:` and the items separated by `·`
  — for example `For: road · gravel · commuter and hybrid bikes`.
- **Your photographs:** dashboard → Website → Welcome (one wide 3:2 photo — a bike or wheel
  in the stand, the whole wheel in frame), On the bench (six frames: three upright, three
  wide — your own work), Bike fitting (two upright photos: a rider on the bike, an
  adjustment), The workshop (two wide). Remove a photo to show the section without it. Each
  stays labelled "Sample" until you replace it.
- **Policies:** Good to know is labelled "Sample policies" until you edit it — write your own
  cancellation, late-arrival, pick-up and storage rules.
- **Mechanics and fitters:** add names, experience and real certifications in your own words —
  for example in *The workshop* text or its facts. Only state what you can show.
- Connect real bookings: README.md, step 3.
