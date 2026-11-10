import type { Preset } from '@profitstudio/booking-engine';

/**
 * Chainline Bicycle Workshop's own preset (INTEGRATION.md §5): the sample
 * services, hours and policies preview mode shows, and the starter set the
 * dashboard offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = one appointment with one mechanic on
 * the workshop's one shared calendar. Its length means different things
 * (src/lib/services.ts → timeTerms):
 *   - an ASSESSMENT or CHECK is time with a mechanic, bike in hand: we look at
 *     it with you and tell you what it needs (the written check is done then);
 *   - a SERVICING or REPAIR booking is a CHECK-IN: the time to look the bike
 *     over and agree the work and the price. The bike stays; the work is done
 *     afterwards, when it is agreed and the parts are in — never "in 20 minutes";
 *   - a FITTING is a real session of that length, with the rider on the bike.
 * The buffer after each one is bench time to tag the bike and write it up.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service, so the site uses
 * three honest shapes (src/lib/services.ts → priceTerms):
 *   - 0 = free (the assessment: any work is quoted before it starts);
 *   - a starting price (`priceFrom: true`) = LABOUR FROM — the labour for the
 *     simplest version of that job; parts and extra work are quoted after
 *     inspection and nothing is done without the rider's OK;
 *   - a fixed price = the price of that appointment (a fitting session, the
 *     written safety check). Parts fitted during a fit (a stem, a saddle, cleats)
 *     are not included and are offered as a separate price.
 * Nothing is paid online: the engine books appointments only. The workshop
 * confirms every request (`autoConfirm: false`).
 *
 * Who a service is for is written at the end of its description after "For:",
 * separated by "·" — the website shows it as a short line.
 */
export const sitePreset = {
  id: 'bicycle-repair',
  label: 'Bicycle Repair & Fitting Studio',
  terminology: { customer: 'rider', customers: 'riders', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Bicycle Workshop',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 412-555-0100',
      address: '100 Example Street, Pittsburgh, PA',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 120,
    maxAdvanceDays: 45,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Tuesday to Saturday, a late Thursday for after-work check-ins; closed Sunday and Monday (bench days).
  workingHours: [
    { weekday: 2, start: '10:00', end: '18:30' },
    { weekday: 3, start: '10:00', end: '18:30' },
    { weekday: 4, start: '10:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '18:30' },
    { weekday: 6, start: '09:00', end: '16:00' },
  ],
  services: [
    {
      name: 'Repair Assessment',
      description:
        'Not sure what your bike needs? Bring it in and tell us what you have noticed — a noise, slipping gears, soft brakes. A mechanic looks it over with you and gives you a written estimate for labour and parts. No work starts until you say yes. For: any bike we work on · noises and problems you can’t pin down',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 0,
      priceFrom: false,
    },
    {
      name: 'Pre-Ride Safety Check',
      description:
        'A written check of brakes, tyres, wheels, drivetrain and the bolts that matter, done while you wait. You leave with a list of what is fine and what needs attention — a check, not a guarantee, and any work is quoted separately. For: before a long ride or a trip · a bike that has been stored a while',
      durationMinutes: 30,
      bufferAfterMinutes: 10,
      priceCents: 3000,
      priceFrom: false,
    },
    {
      name: 'Standard Tune-Up',
      description:
        'Drop-off. At check-in we look the bike over together and agree what the tune-up covers: gears and brakes adjusted, wheels trued in the frame, drivetrain cleaned and lubricated, bolts checked to torque. Worn parts are quoted before they are replaced; we give you a ready date at check-in. For: road · gravel · commuter and hybrid bikes',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 9500,
      priceFrom: true,
    },
    {
      name: 'Brake & Shifting Adjustment',
      description:
        'Drop-off for brakes that feel soft or rub and gears that skip or hesitate. At check-in we find the cause; cable, pad and hydraulic work is quoted before we start. Simple adjustments are often ready the same day — we tell you at check-in. For: rim and disc brakes · mechanical and electronic shifting',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 4500,
      priceFrom: true,
    },
    {
      name: 'Wheel & Tyre Service',
      description:
        'Drop-off for a wheel that wobbles, a flat that keeps coming back, or a tubeless setup. Truing and fitting labour starts at the price shown; tyres, tubes, sealant and spokes are extra and quoted first. For: truing · punctures · tubeless setup · tyre changes',
      durationMinutes: 15,
      bufferAfterMinutes: 10,
      priceCents: 2500,
      priceFrom: true,
    },
    {
      name: 'Bike Fit',
      description:
        'A full fitting session on your own bike, on a trainer: we talk through how and where you ride, measure your current setup, watch you pedal and adjust saddle height and setback, bar reach and height, and cleats. You leave with your new measurements written down. Replacement parts (a stem, a saddle, cleats) are optional and priced separately. For: road and gravel riders · new bikes · longer rides',
      durationMinutes: 120,
      bufferAfterMinutes: 15,
      priceCents: 22500,
      priceFrom: false,
    },
    {
      name: 'Fit Follow-up',
      description:
        'A shorter session after some weeks of riding on a new position: we check how it feels and make small changes. For: riders who have had a Bike Fit with us',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 6000,
      priceFrom: false,
    },
    {
      name: 'Cleat Setup',
      description:
        'Cleat position and angle on your shoes, checked on the bike while you pedal, with a quick look at saddle height. Bring the shoes you ride in; new cleats are extra. For: clipless pedals · new shoes',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 7500,
      priceFrom: false,
    },
  ],
} satisfies Preset;
