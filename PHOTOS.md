# Photographs

Eleven frames from eleven free photographs on Unsplash, downloaded into the project (never
hot-linked), cropped for their one use, given one shared light grade and exported as AVIF +
WebP at three or four widths by the Workbench photo pipeline. **This starter ships only those
processed frames** — the original downloads and the pipeline script stay with the Niche Pack
workspace (`concepts/bicycle-repair-workbench/photo-pipeline/photos.mjs`), so the repository
never redistributes an unaltered copy. No image-generation tool was used.

**One workshop, one shoot.** Ten of the eleven frames come from a single series published
on Unsplash by **Anton Savinov** ([@tonchik](https://unsplash.com/@tonchik)), photographed in
one bicycle workshop on one day: a white pegboard wall of tools, a long white bench, a blue
truing stand and a work stand, two mechanics (one in an orange sweatshirt, one in a black
beanie and T-shirt). That gives the site one light, one place and one way of working — wheel
truing, brakes, cassette, cables, levers, a saddle clamp — instead of a collage of unrelated
stock. The **bike fitting** photograph is the one exception: a rider on a road bike on an
indoor trainer in a plain light studio, by **gabbiistudios**
([@gabrielonodegba](https://unsplash.com/@gabrielonodegba)) — no stock series shows a fitting
in this workshop, and the plain studio reads as a separate fitting area rather than a
different shop. Real bike-fit photography in stock libraries is rare; the owner's own photo
of a fitting will be better than any stock frame.

The shared grade is a touch less saturation (the sweatshirt orange stays, but quieter) and
slightly firmer blacks, so the photographs sit on the shop-white page; nothing in any frame is
retouched.

They are the website's **defaults** (`src/content/site.ts`): the owner replaces each one in
the dashboard (Website). **They are another workshop's photographs, not Chainline's mechanics,
riders, work or rooms** (Chainline is fictional): the people did not visit the workshop, are
not named, and nothing implies endorsement. Every photo carries a **"Sample"** label on the
page until the owner replaces it; *On the bench* says "Example photography from another
bicycle workshop — not this workshop's mechanics or its own work", and in the Live Demo and
preview the workshop section says the workshop and the mechanics in the photographs are
licensed stock images.

People are identifiable in some frames (the mechanic at the truing stand in the first screen
and the saddle photo; the mechanic in the beanie in two frames; the rider on the trainer).
Alt texts only describe what is in the frame; the copy never claims the bikes shown were
worked on by the workshop.

**Brand marks.** A real workshop is full of branded tools, and these photographs are no
exception: the blue tool handles and the truing stand carry a tool maker's name (legible in a
few frames at full size — on the stand's upright in the first screen, on two wrenches), rims
carry their makers' decals, the commuter bike's saddle reads "Comfort", the trainer and the
rim in the fitting photograph carry their makers' names, and the beanie mechanic's T-shirt has
lettering on the back. The crops cut away the most prominent one (the truing stand's base in
the first screen) and none is the subject of a frame; the page never names a brand or implies
that any maker endorses or supplies the workshop. Frames where a brand was the subject (a
spoke-tension gauge with its maker's name, a frame with its maker's name across the down
tube) were not used. Product names and logos are the trademarks of their owners; the
Unsplash License covers the photographs, not those marks.

| Use (content field) | Files (`public/photos/`) | Source page | Photographer | Licence |
|---|---|---|---|---|
| First screen — a mechanic trues a road wheel in the stand in front of the tool wall (`hero.photo`, 3:2) | `hero-truing-{800,1200,1600,2000}` | https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-bike-shop-3eIcZ0yxm2w | Anton Savinov ([@tonchik](https://unsplash.com/@tonchik)) | Unsplash License |
| On the bench 1 — the truing stand's gauge at the rim (`gallery.photo1`, upright) | `bench-truing-{480,800,1200}` | https://unsplash.com/photos/a-person-working-on-a-bicycle-wheel-in-a-garage-yI1qrGwcHW0 | Anton Savinov | Unsplash License |
| On the bench 2 — a tool clipped at the rim in the truing stand (`gallery.photo2`, wide) | `bench-pads-{800,1200,1600}` | https://unsplash.com/photos/a-man-working-on-a-bicycle-wheel-in-a-shop-GSYI4apPm0s | Anton Savinov | Unsplash License |
| On the bench 3 — chain whip and lockring tool on a cassette (`gallery.photo3`, wide) | `bench-cassette-{800,1200,1600}` | https://unsplash.com/photos/a-person-is-holding-a-wrench-and-working-on-a-bicycle-wheel-2UGfEilXRx8 | Anton Savinov | Unsplash License |
| On the bench 4 — a screwdriver in a rim brake caliper's adjuster (`gallery.photo4`, upright) | `bench-caliper-{480,800,1200}` | https://unsplash.com/photos/a-person-is-working-on-a-bike-in-a-bike-shop-RbjKpfcNENs | Anton Savinov | Unsplash License |
| On the bench 5 — cable cutters by the rear derailleur (`gallery.photo5`, upright) | `bench-cable-{480,800,1200}` | https://unsplash.com/photos/a-person-holding-a-pair-of-scissors-next-to-a-bike-QKd4BeoF2VU | Anton Savinov | Unsplash License |
| On the bench 6 — a brake lever clamp tightened on a drop bar (`gallery.photo6`, wide) | `bench-levers-{800,1200,1600}` | https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-bike-shop-O0rn0jsMJ6c | Anton Savinov | Unsplash License |
| Bike fitting — a rider on a road bike on an indoor trainer, from the side (`fitting.photo`, upright) | `fit-side-{480,800,1200}` | https://unsplash.com/photos/man-cycling-on-stationary-bike-trainer-WRhMRJsWi7g | gabbiistudios ([@gabrielonodegba](https://unsplash.com/@gabrielonodegba)) | Unsplash License |
| Bike fitting — a saddle clamp tightened with a hex key (`fitting.photo2`, upright) | `fit-saddle-{480,800,1200}` | https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-shop-p0YAsHvmjyg | Anton Savinov | Unsplash License |
| The workshop — a bike in the work stand at the bench and tool wall (`studio.photoRoom`) | `room-stand-{800,1200,1600}` | https://unsplash.com/photos/a-man-working-on-a-bike-in-a-garage--cxC8iFx6V4 | Anton Savinov | Unsplash License |
| The workshop — cleaning a wheel's hub on the bench (`studio.photoWork`) | `room-bench-{800,1200,1600}` | https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-bike-shop-jTmvKwtJeYk | Anton Savinov | Unsplash License |

Downloaded 2026-11-10 at 3200 px wide (`images.unsplash.com/photo-<…>?w=3200&q=75&fm=jpg`);
photographer and licence checked the same day on each photo page — every one is a free
Unsplash photo under the Unsplash License (none is an Unsplash+ image).

## Crops

Fractions of the original (`photo-pipeline/photos.mjs`):

- **First screen** 3:2 from 3.5 % across, 91.5 % of the width, from the top — the whole wheel,
  both hands and the mechanic; the truing stand's base (and its maker's name) is cut away at
  the foot. One crop for every screen size: on phones it shows at full width, so the wheel
  stays whole.
- **On the bench**: uprights 4:5 full height (the gauge from 36 % across, the caliper from
  30 %, the cable cutters from 12 %); wides 3:2 full frame.
- **Bike fitting**: the rider 4:5 from 6 % across and 10 % down, 86 % of the width; the
  saddle 4:5 full height from 12 % across.
- **The workshop**: both 3:2 full frame.

## Replacing them

Upload your own in the dashboard → Website; the page keeps each frame's shape (3:2 or 4:5)
whatever you upload, and the "Sample" label disappears from that photo. To change a
**default** in the code instead, export AVIF + WebP variants into `public/photos/`, add them
to `src/content/photoVariants.ts`, point the field's default `src` at the new key, update the
hero preload in `index.html` if it is the first-screen photo, and record the source here and
in `ASSETS.md`.
