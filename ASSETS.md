# Assets and their terms

The code in this repository is MIT-licensed (`LICENSE`). The assets below are not: each keeps
its own terms.

## Photographs — Unsplash License

Eleven frames from eleven Unsplash photographs (ten from one workshop shoot by Anton Savinov,
one fitting photograph by gabbiistudios), downloaded into the project (never hot-linked), then
cropped, graded once for the whole set and exported for their frames. Only the processed
frames are in this repository. They are sample imagery from another bicycle workshop and
another studio: nobody shown works at or endorses the (fictional) workshop, nobody shown is
its customer, and none of it is the workshop's space or work. Tool, rim, saddle and trainer
makers' names visible in some frames are their owners' trademarks and are not covered by the
photo licence; nothing on the page names them or implies endorsement. Full details and crops:
`PHOTOS.md`.

| Files (`public/photos/`) | Source | Photographer | Licence (checked 2026-11-10) |
|---|---|---|---|
| `hero-truing-{800,1200,1600,2000}.{avif,webp}` | [Unsplash 3eIcZ0yxm2w](https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-bike-shop-3eIcZ0yxm2w) | Anton Savinov | Unsplash License |
| `bench-truing-{480,800,1200}.{avif,webp}` | [Unsplash yI1qrGwcHW0](https://unsplash.com/photos/a-person-working-on-a-bicycle-wheel-in-a-garage-yI1qrGwcHW0) | Anton Savinov | Unsplash License |
| `bench-pads-{800,1200,1600}.{avif,webp}` | [Unsplash GSYI4apPm0s](https://unsplash.com/photos/a-man-working-on-a-bicycle-wheel-in-a-shop-GSYI4apPm0s) | Anton Savinov | Unsplash License |
| `bench-cassette-{800,1200,1600}.{avif,webp}` | [Unsplash 2UGfEilXRx8](https://unsplash.com/photos/a-person-is-holding-a-wrench-and-working-on-a-bicycle-wheel-2UGfEilXRx8) | Anton Savinov | Unsplash License |
| `bench-caliper-{480,800,1200}.{avif,webp}` | [Unsplash RbjKpfcNENs](https://unsplash.com/photos/a-person-is-working-on-a-bike-in-a-bike-shop-RbjKpfcNENs) | Anton Savinov | Unsplash License |
| `bench-cable-{480,800,1200}.{avif,webp}` | [Unsplash QKd4BeoF2VU](https://unsplash.com/photos/a-person-holding-a-pair-of-scissors-next-to-a-bike-QKd4BeoF2VU) | Anton Savinov | Unsplash License |
| `bench-levers-{800,1200,1600}.{avif,webp}` | [Unsplash O0rn0jsMJ6c](https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-bike-shop-O0rn0jsMJ6c) | Anton Savinov | Unsplash License |
| `fit-side-{480,800,1200}.{avif,webp}` | [Unsplash WRhMRJsWi7g](https://unsplash.com/photos/man-cycling-on-stationary-bike-trainer-WRhMRJsWi7g) | gabbiistudios | Unsplash License |
| `fit-saddle-{480,800,1200}.{avif,webp}` | [Unsplash p0YAsHvmjyg](https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-shop-p0YAsHvmjyg) | Anton Savinov | Unsplash License |
| `room-stand-{800,1200,1600}.{avif,webp}` | [Unsplash -cxC8iFx6V4](https://unsplash.com/photos/a-man-working-on-a-bike-in-a-garage--cxC8iFx6V4) | Anton Savinov | Unsplash License |
| `room-bench-{800,1200,1600}.{avif,webp}` | [Unsplash jTmvKwtJeYk](https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-bike-shop-jTmvKwtJeYk) | Anton Savinov | Unsplash License |

**Terms.** Unsplash License (https://unsplash.com/license): free to download, copy, modify and
use, commercially or not, without permission or attribution (credit is given here anyway);
no selling the photos without significant modification; no compiling them to replicate a
similar or competing image service. People, trademarks and property shown keep their own
rights — do not imply that a person or brand in a photo endorses a business. **If you build
your own workshop's site from this starter, replace these with photographs of your own
workshop and your own work (and, with their consent, your riders).**

## Not in this repository (installed by `npm install`)

| Package | Licence | Notes |
|---|---|---|
| `@profitstudio/booking-engine` 2.0.0-beta.3 | MIT | The booking engine and the packaged dashboard |
| `react`, `react-dom` | MIT | |
| `@fontsource/barlow` | OFL-1.1 | Typeface (Barlow — Jeremy Tribby, github.com/jpt/barlow) |
| `@fontsource/barlow-semi-condensed` | OFL-1.1 | Typeface (Barlow Semi Condensed — Jeremy Tribby, github.com/jpt/barlow) |

Fonts are bundled into your build by Vite; the SIL Open Font License 1.1 allows that (keep the
fonts' licence files in `node_modules` — no action needed).

## Original work (MIT, see LICENSE)

- `public/favicon.svg` — drawn in SVG for this starter (a condensed C on chain black over a
  bar of marker yellow).
- Every ornament that is code: the measuring scale (`.ticks` and `--ticks` in
  `src/styles/tokens.css` / `base.css`, the scale along the first photo, the section labels,
  the job-sheet tracks and the booking sheet's header), the marker stroke under highlighted
  words, the section labels.
- The brand "Chainline Bicycle Workshop", its copy and its address are fictional, made for
  this starter (Butler Street in Lawrenceville is a real street; the number and business are
  invented); the `.example` addresses and `555` phone numbers are reserved for examples.
