import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
const MARK_HELP = 'Wrap a few words in *asterisks* to underline them with your marker colour.';
const SAMPLE_HELP = 'A “Sample” label stays on it until you replace it with a photo of your own workshop or your own work.';

/**
 * On the bench: six frames in three columns, each column one upright and one
 * wide frame (alternating), so every photo stays whole in its own shape. Each
 * frame is its own field (no default images inside lists).
 */
const GALLERY = [
  {
    n: 1,
    shape: 'portrait',
    src: '/photos/bench-truing-800.webp',
    alt: 'A mechanic’s hand sets the gauge of a truing stand beside the rim of a road wheel, in front of a pegboard of tools.',
    caption: 'Wheel truing — the rim checked against the gauge',
  },
  {
    n: 2,
    shape: 'landscape',
    src: '/photos/bench-pads-1200.webp',
    alt: 'A mechanic in an orange sweatshirt holds a small brake part against the rim of a road wheel clamped in a blue truing stand.',
    caption: 'Rim and brake track looked at up close',
  },
  {
    n: 3,
    shape: 'landscape',
    src: '/photos/bench-cassette-1200.webp',
    alt: 'A hand holds a chain whip and a lockring tool on the cassette of a rear wheel with a disc rotor.',
    caption: 'Cassette off for cleaning and a wear check',
  },
  {
    n: 4,
    shape: 'portrait',
    src: '/photos/bench-caliper-800.webp',
    alt: 'A mechanic turns a small screwdriver in the adjuster of a rim brake caliper on a road bike in a work stand.',
    caption: 'A rim brake centred, one turn at a time',
  },
  {
    n: 5,
    shape: 'portrait',
    src: '/photos/bench-cable-800.webp',
    alt: 'A hand holds blue-handled cable cutters beside the rear derailleur and chain of a road bike.',
    caption: 'Cables cut clean, ends capped',
  },
  {
    n: 6,
    shape: 'landscape',
    src: '/photos/bench-levers-1200.webp',
    alt: 'A mechanic in a black beanie and glasses tightens the brake lever clamp on a drop handlebar in front of a tool wall.',
    caption: 'Brake levers set where the rider’s hands reach',
  },
] as const;

const GALLERY_SIZE = { portrait: { width: 800, height: 1000, ratio: 4 / 5 }, landscape: { width: 1200, height: 800, ratio: 3 / 2 } } as const;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the marker colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer. One short word reads best.',
          default: 'Chainline',
          maxLength: 20,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line under the name mark',
          help: 'What you are, in two or three words. Shown small under the name in the header.',
          default: 'Bicycle Workshop & Fitting',
          maxLength: 30,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is white. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Marker colour',
          help: 'A bright colour used as a fill: the main buttons, the stroke under highlighted words, selected choices and the “not sure?” band. Text on it is near-black, so pick a light, bright colour — workshop yellow, safety orange, lime, sky blue. Dark colours are refused because black text would not read on them.',
          default: '#f2c200',
          contrastWith: '#16191c',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'condensed',
          options: [
            { value: 'condensed', label: 'Condensed', description: 'Firm, semi-condensed headings — the original design.' },
            { value: 'regular', label: 'Regular width', description: 'The same layout with wider, rounder headings.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Chainline Bicycle Workshop — repairs, servicing & bike fitting in Pittsburgh',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent bicycle workshop in Lawrenceville, Pittsburgh: repair assessments, tune-ups, brakes, gears and wheels for road, gravel and commuter bikes — and bike fitting. Book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the buttons, one photo and the short list of bikes you work on.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Bicycle workshop · Lawrenceville, Pittsburgh',
          maxLength: 64,
        },
        { type: 'text', id: 'hero.title', label: 'Headline', help: MARK_HELP, default: 'Repairs and bike fitting, *done properly.*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'An independent workshop for road, gravel and everyday bikes. Every repair starts with a mechanic looking at your bike and a clear estimate — nothing is done without your OK. Every fit starts with how you ride.',
          maxLength: 280,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', default: 'Book an appointment', maxLength: 28, required: true },
        {
          type: 'text',
          id: 'hero.unsureLabel',
          label: 'Second link',
          help: 'Opens the booking with your free assessment chosen (the first service whose name says “assessment”). Leave empty to hide it.',
          default: 'Not sure what it needs? Book a free assessment',
          maxLength: 56,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo',
          help: `Wide (3:2) — real work at the bench reads best: a wheel in the truing stand, a bike in the work stand. Keep the whole wheel in the frame. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-truing-1200.webp',
            alt: 'A mechanic in an orange sweatshirt and black beanie trues a road wheel in a blue truing stand, in front of a white pegboard full of tools.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'text',
          id: 'hero.listTitle',
          label: 'Bikes you work on — title',
          help: 'A short list under the headline, so riders know at once whether you take their bike. Leave empty to hide it.',
          default: 'We work on',
          maxLength: 32,
        },
        {
          type: 'list',
          id: 'hero.list',
          label: 'Bikes you work on — lines',
          itemLabel: 'Line',
          maxItems: 6,
          fields: [{ type: 'text', id: 'text', label: 'Line', default: '', maxLength: 32, required: true }],
          default: [{ text: 'Road bikes' }, { text: 'Gravel & all-road' }, { text: 'Commuter & city bikes' }, { text: 'Hybrid & touring' }],
        },
        {
          type: 'text',
          id: 'hero.notList',
          label: 'What you don’t work on',
          help: 'One honest line beside the list. Leave empty to hide it.',
          default: 'Not e-bike motors or batteries.',
          maxLength: 72,
        },
      ],
    },
    {
      id: 'services',
      label: 'Services & prices',
      description:
        'Service names, lengths and prices come from Services in this dashboard. A price of 0 shows as “Free”; a “from” price as labour from, with parts quoted first; a fixed price as the price of that appointment. The page groups services by the words in their names: assessment, inspection or check → Assessments & checks; tune-up, service, brake, gear, wheel or tyre → Servicing & repairs; fit, fitting or cleat → Bike fitting. Servicing and repairs show their length as a check-in (the bike stays); fittings as a session. End a description with “For:” and items separated by “·” to show what it is for.',
      fields: [
        { type: 'text', id: 'services.title', label: 'Title', help: MARK_HELP, default: 'Services & *prices*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'services.intro',
          label: 'Introduction',
          default: 'Book the appointment that fits what you need. Repairs start with a look at the bike; fittings are a full session with you on it.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'services.terms',
          label: 'How appointments work',
          help: 'Three short facts shown above the list: what the time means, how prices work and when the bike is ready.',
          itemLabel: 'Fact',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 44, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 200, rows: 2 },
          ],
          default: [
            {
              title: 'A check-in is not the repair',
              text: 'For servicing and repairs, the time shown is your check-in with a mechanic. The bike stays with us and the work is done after.',
            },
            {
              title: '“Labour from” — parts are extra',
              text: 'Starting prices are for labour on the simplest version of the job. Parts and extra work are quoted first; nothing is done without your OK.',
            },
            {
              title: 'A ready date once we’ve seen it',
              text: 'We give you a ready date at check-in, depending on the work and on parts. We call or text when the bike is ready.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'services.noteCheck',
          label: 'Note beside “Assessments & checks”',
          default: 'Start here if you’re not sure what your bike needs.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteService',
          label: 'Note beside “Servicing & repairs”',
          default: 'Drop-off appointments: we check the bike in with you, agree the work, and call when it’s ready.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteFit',
          label: 'Note beside “Bike fitting”',
          default: 'Real sessions, with you on your own bike. The fixed price is the session; parts are optional and extra.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'text',
          id: 'services.unsureTitle',
          label: '“Not sure?” — title',
          help: 'A band that opens the booking with your assessment chosen. Leave empty to hide it.',
          default: 'Not sure what your bike needs?',
          maxLength: 48,
        },
        {
          type: 'longText',
          id: 'services.unsureText',
          label: '“Not sure?” — text',
          default: 'Book a free repair assessment. Bring the bike, tell us what you’ve noticed, and a mechanic will look at it with you and give you a written estimate.',
          maxLength: 240,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.priceNote',
          label: 'About prices',
          help: 'Shown under the list. Keep it honest: a starting price is not a quote, and nothing is paid online.',
          default:
            'Prices marked “labour from” are for the simplest version of that job. Worn parts, seized bolts, hydraulic brakes and older or unusual bikes can take longer or cost more — we quote labour and parts in writing before any work starts and call you if anything changes. Booking online reserves time with a mechanic; you pay in the workshop, never online.',
          maxLength: 480,
          rows: 4,
        },
      ],
    },
    {
      id: 'gallery',
      label: 'On the bench',
      description:
        'Six frames of real workshop detail. Each sample photo carries a “Sample” label until you replace it — show your own bench and your own work. Remove a photo to show fewer.',
      fields: [
        { type: 'text', id: 'gallery.title', label: 'Title', help: MARK_HELP, default: 'On the *bench*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'gallery.intro',
          label: 'Introduction',
          default: 'Good work on a bike is mostly small things done carefully: a wheel brought back to true, a brake centred, a cable cut clean and capped, every bolt back to its torque.',
          maxLength: 260,
          rows: 2,
        },
        ...GALLERY.flatMap((g) => [
          {
            type: 'image' as const,
            id: `gallery.photo${g.n}` as const,
            label: `Photo ${g.n} (${g.shape === 'portrait' ? 'upright' : 'wide'})`,
            help: `${g.shape === 'portrait' ? 'Upright (4:5)' : 'Wide (3:2)'}. ${SAMPLE_HELP}`,
            default: { src: g.src, alt: g.alt, width: GALLERY_SIZE[g.shape].width, height: GALLERY_SIZE[g.shape].height },
            aspectRatio: GALLERY_SIZE[g.shape].ratio,
          },
          {
            type: 'text' as const,
            id: `gallery.caption${g.n}` as const,
            label: `Caption ${g.n}`,
            help: 'What the photo shows, in a few words. Leave empty for none.',
            default: g.caption,
            maxLength: 64,
          },
        ]),
      ],
    },
    {
      id: 'fitting',
      label: 'Bike fitting',
      description:
        'What a fitting involves, what it doesn’t, and what to bring. Keep it true to your own equipment: no motion capture, pressure mapping or medical claims unless you really offer them.',
      fields: [
        { type: 'text', id: 'fitting.title', label: 'Title', help: MARK_HELP, default: 'A bike that *fits you*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'fitting.intro',
          label: 'Introduction',
          default:
            'A fitting is time spent on your own bike, on a trainer, while we watch, measure and adjust. It’s for riders who want to be comfortable for longer — on a new bike, before a long ride, or when something just doesn’t feel right.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'fitting.steps',
          label: 'What a session involves',
          itemLabel: 'Step',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Step', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 220, rows: 2 },
          ],
          default: [
            { title: 'Talk it through', text: 'How often and how far you ride, on what roads, and what you’d like to feel different.' },
            { title: 'Measure the bike as it is', text: 'Saddle height and setback, bar reach and drop, cleat position — written down before we change anything.' },
            { title: 'Watch you ride', text: 'You pedal on a trainer while we look at your position from the side and the front.' },
            { title: 'Adjust, one change at a time', text: 'Saddle, bars and cleats, ridden again after each change so you feel the difference.' },
            { title: 'Leave with your numbers', text: 'Your new measurements on paper, so the next bike can start from them.' },
          ],
        },
        {
          type: 'longText',
          id: 'fitting.notIncluded',
          label: 'What a fitting doesn’t include',
          help: 'Keep this honest — it protects you and the rider.',
          default:
            'We use measuring tools, a plumb line, a level and our eyes — not 3D motion capture or pressure mapping. A fit is about comfort and position on the bike; it isn’t a medical assessment, and we don’t diagnose or treat injuries. A new stem, saddle or cleats are never fitted without asking, and are priced separately.',
          maxLength: 480,
          rows: 4,
        },
        {
          type: 'longText',
          id: 'fitting.bring',
          label: 'What to bring',
          default: 'Your bike, the shoes and pedals you ride in, and the shorts and jersey you’d normally wear. Arrive with tyres pumped up.',
          maxLength: 280,
          rows: 2,
        },
        {
          type: 'image',
          id: 'fitting.photo',
          label: 'Main photo (upright)',
          help: `Upright (4:5) — a rider on a bike, seen from the side, reads best. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/fit-side-800.webp',
            alt: 'A rider in a grey jersey and black shorts pedals a road bike mounted on an indoor trainer, seen from the side against a plain light background.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'image',
          id: 'fitting.photo2',
          label: 'Second photo (upright)',
          help: `Upright (4:5) — an adjustment up close. Remove it to show the main photo alone. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/fit-saddle-800.webp',
            alt: 'A mechanic in an orange sweatshirt tightens the clamp of a saddle on its seatpost with a hex key, in front of a tool wall.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'process',
      label: 'How it works',
      description: 'How a repair goes and how a fitting goes, step by step. Online booking only reserves the appointment; keep the steps true to how your workshop works.',
      fields: [
        { type: 'text', id: 'process.title', label: 'Title', help: MARK_HELP, default: 'How it *works*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'process.repair',
          label: 'A repair — steps',
          itemLabel: 'Step',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Step', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 220, rows: 2 },
          ],
          default: [
            { title: 'Book a check-in', text: 'Choose an assessment or a drop-off service and a time. We confirm the request by email.' },
            { title: 'Bring the bike', text: 'Tell us what you’ve noticed — the noise, the wobble, when it happens.' },
            { title: 'We look and quote', text: 'A mechanic inspects the bike with you and writes down the work, the parts and the price.' },
            { title: 'The work, once you agree', text: 'We start when you say yes. If parts need ordering, or we find something else, we call first.' },
            { title: 'We call when it’s ready', text: 'Pick the bike up, and we’ll show you what was done.' },
          ],
        },
        {
          type: 'list',
          id: 'process.fit',
          label: 'A fitting — steps',
          itemLabel: 'Step',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Step', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 220, rows: 2 },
          ],
          default: [
            { title: 'Book a session', text: 'The time shown is the whole session, with you and your bike.' },
            { title: 'Ride and adjust', text: 'Bring your bike, shoes and kit; we fit you on a trainer.' },
            { title: 'Ride it in', text: 'Give the new position a few weeks, then come back for a follow-up if anything needs a tweak.' },
          ],
        },
        {
          type: 'longText',
          id: 'process.note',
          label: 'What a booking covers',
          help: 'Shown under the steps. Keep it true: online booking reserves the appointment; estimates, parts and pick-up are handled by the workshop directly.',
          default:
            'Booking online reserves time with a mechanic. Estimates, parts and pick-up are arranged with you in the workshop, by phone or by text — not through the booking system.',
          maxLength: 300,
          rows: 3,
        },
      ],
    },
    {
      id: 'studio',
      label: 'The workshop',
      description: 'The workshop itself: two photos, a few paragraphs and how you work. No awards, certificates or years of experience unless they are really yours.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: MARK_HELP, default: 'One bench, *done right*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'Chainline is a small workshop on Butler Street: a work stand by the window, a long bench, a truing stand and a wall where every tool has its place. Bikes are checked in at the front and worked on where you can see them.\n\nWe work on road, gravel, commuter and touring bikes, and we’re honest about the rest: if a repair isn’t worth doing, or a part is better replaced, we say so and tell you why.',
          maxLength: 900,
          rows: 7,
        },
        {
          type: 'image',
          id: 'studio.photoRoom',
          label: 'Photo of the workshop (wide)',
          help: `The workshop, wide (3:2). ${SAMPLE_HELP}`,
          default: {
            src: '/photos/room-stand-1200.webp',
            alt: 'A mechanic in a black T-shirt and gloves works on a bike clamped in a work stand at a white bench, under a pegboard wall of tools.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'studio.photoWork',
          label: 'Second photo (wide)',
          help: `Wide (3:2). Remove it to show the first photo alone. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/room-bench-1200.webp',
            alt: 'A mechanic sprays cleaner onto the hub of a road wheel laid on the bench, in front of rows of tools on a pegboard.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'list',
          id: 'studio.facts',
          label: 'How we work',
          itemLabel: 'Fact',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'text', label: 'Detail', default: '', maxLength: 110 },
          ],
          default: [
            { title: 'Nothing without your OK', text: 'Labour and parts are quoted before any work starts.' },
            { title: 'Old parts on request', text: 'Ask, and we’ll keep the worn parts to show you.' },
            { title: 'Torque, not guesswork', text: 'Bolts that matter go back to the maker’s figure.' },
            { title: 'Honest about limits', text: 'If a repair isn’t worth it, we tell you.' },
          ],
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'Practical answers before a first visit. These are sample policies — make them yours.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: MARK_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 12,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'What should I book if I’m not sure what’s wrong?',
              answer: 'A Repair Assessment. It’s free: a mechanic looks at the bike with you, finds the cause and gives you a written estimate. You decide what happens next.',
            },
            {
              question: 'Should I bring the bike to the assessment?',
              answer: 'Yes — always bring the bike. We can’t assess or quote without seeing it. Clean is nice, but not required.',
            },
            {
              question: 'Is the repair done during the appointment?',
              answer:
                'Usually not. An assessment or check-in is the time to look the bike over and agree the work. The repair happens after, on the bench. Small adjustments are sometimes done the same day — we’ll tell you at check-in.',
            },
            {
              question: 'Are parts included in the starting price?',
              answer:
                'No. “Labour from” prices cover labour only, for the simplest version of the job. Parts — cables, pads, chains, tyres — are quoted separately, before we start.',
            },
            {
              question: 'How long will my bike stay at the workshop?',
              answer:
                'It depends on the work and on whether parts need ordering. We give you a ready date at check-in and call if it changes. We don’t promise a date before we’ve seen the bike.',
            },
            {
              question: 'What if my bike needs more than we agreed?',
              answer: 'We stop and call you first. Nothing extra is done or charged without your OK.',
            },
            {
              question: 'What should I bring to a bike fitting?',
              answer: 'Your bike, the shoes and pedals you ride with, and the kit you’d usually wear. Tell us in the booking note how you ride and anything you’d like to change.',
            },
            {
              question: 'Which bikes do you work on?',
              answer:
                'Road, gravel, commuter, hybrid and touring bikes, with rim or disc brakes and mechanical or electronic shifting. We don’t service e-bike motors, batteries or electrics, and we’ll tell you if a bike is outside what we do well.',
            },
            {
              question: 'How do I change or cancel an appointment?',
              answer: 'Call or email us at least 24 hours ahead so someone else can have the time. Running late? Call — we may need to move a fitting.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: MARK_HELP, default: 'Book an *appointment*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose an assessment, a drop-off service or a fitting, and a time. No account needed — it takes about a minute, and we read your note about the bike before we confirm.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: MARK_HELP, default: 'Find the *workshop*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'On Butler Street in Lawrenceville, between 44th and 45th Street — a ground-floor workshop with a roll-up door. Buses stop on Butler Street nearby, there’s bike parking out front, and metered parking on the street. Bring the bike in through the front door.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Repairs, servicing and bike fitting — Lawrenceville, Pittsburgh.',
          maxLength: 100,
        },
      ],
    },
  ],
});
