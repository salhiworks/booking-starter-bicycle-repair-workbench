import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The workshop's service list: its kinds, honest price and time terms, and who
 * each service is for.
 *
 * The engine (2.0.0-beta.3) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when it
 * is built — so everything here is read from the service's own engine data:
 *
 *   1. its KIND, from its NAME against the rules below — first match wins,
 *      strongest signal first ("Fit Follow-up" is fitting; "Repair Assessment"
 *      is an assessment, not a repair; "Wheel & Tyre Service" is servicing);
 *      if the name has no workshop words, its DESCRIPTION; otherwise "More":
 *        - fit     Bike fitting          (fit, fitting, cleat, position)
 *        - check   Assessments & checks  (assessment, inspection, check, diagnosis)
 *        - service Servicing & repairs   (tune-up, service, overhaul, brake, gear, wheel, tyre…)
 *   2. what its TIME means (timeTerms): a fitting is a real SESSION of that
 *      length; an assessment or check is time WITH A MECHANIC; a servicing or
 *      repair booking is a CHECK-IN — the bike stays, and the work is done
 *      afterwards, when the scope is agreed and the parts are in;
 *   3. what its PRICE means (priceTerms): zero is free; a starting price
 *      (`priceFrom`) is LABOUR FROM — parts and extra work are quoted after
 *      inspection; a fixed price is the price of that appointment; no price is
 *      quoted after inspection — see src/lib/preset.ts;
 *   4. who it is for: the part of its description after "For:" (or "Good for:"),
 *      split at "·" — written by the owner in Dashboard → Services.
 *
 * A stable category field, a "drop-off" flag or a separate parts estimate needs
 * an engine version — see docs/ENGINE-PROPOSAL-bicycle-repair.md in the Niche
 * Pack workspace.
 */
export type KindId = 'check' | 'service' | 'fit' | 'more';

/** Content fields that belong to a kind (src/content/site.ts). */
export type KindNote = 'services.noteCheck' | 'services.noteService' | 'services.noteFit';

interface KindRule {
  id: KindId;
  label: string;
  note: KindNote | null;
  match: RegExp;
}

const RULES: KindRule[] = [
  {
    id: 'fit',
    label: 'Bike fitting',
    note: 'services.noteFit',
    match: /\b(bike[-\s]?fit(?:ting)?|fit(?:ting)?|re-?fit|cleats?|position(?:ing)?|saddle height)\b/i,
  },
  {
    id: 'check',
    label: 'Assessments & checks',
    note: 'services.noteCheck',
    match: /\b(assessments?|assess|inspections?|inspect|checks?|check-?ups?|diagnos(?:is|tic|e)|look-?over|estimate|consultation)\b/i,
  },
  {
    id: 'service',
    label: 'Servicing & repairs',
    note: 'services.noteService',
    match:
      /\b(tune-?ups?|service|servicing|overhaul|repairs?|brakes?|bleed|shift(?:ing)?|gears?|derailleurs?|drivetrain|chain|cassette|cables?|wheels?|tyres?|tires?|tubeless|truing|true|spokes?|punctures?|flat|hubs?|bearings?|headset|bottom bracket|maintenance|adjustments?)\b/i,
  },
];

const MORE = { id: 'more', label: 'More appointments', note: null } as const;

/** The order kinds are shown in: not sure → servicing → fitting. */
const ORDER: KindId[] = ['check', 'service', 'fit', 'more'];

export interface Kind {
  id: KindId;
  label: string;
  note: KindNote | null;
  services: Service[];
}

export function kindOf(service: Pick<Service, 'name' | 'description'>): KindRule | typeof MORE {
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const { lead } = splitDescription(service.description);
  return RULES.find((rule) => rule.match.test(lead)) ?? MORE;
}

/** Kept for the shared booking flow: workshop services carry no size, so the name always comes back whole. */
export function splitName(name: string): { base: string; size: string | null } {
  return { base: name, size: null };
}

/** Services in their kinds, keeping the owner's display order inside each; empty kinds are left out. */
export function kinds(services: readonly Service[]): Kind[] {
  const map = new Map<KindId, Kind>();
  for (const service of services) {
    const rule = kindOf(service);
    let k = map.get(rule.id);
    if (!k) {
      k = { id: rule.id, label: rule.label, note: rule.note, services: [] };
      map.set(rule.id, k);
    }
    k.services.push(service);
  }
  return ORDER.flatMap((id) => (map.has(id) ? [map.get(id)!] : []));
}

/**
 * The "Not sure what your bike needs?" route: the first assessment the owner
 * lists whose name says "repair", "general" or "diagnosis" (else one that says
 * "assessment", else the first check, else nothing). Read from the engine's services — never a hard-coded id.
 */
export function generalAssessment(services: readonly Service[]): Service | null {
  const checks = services.filter((s) => kindOf(s).id === 'check');
  return (
    checks.find((s) => /\b(repair|general|diagnos)/i.test(s.name)) ?? checks.find((s) => /\bassess/i.test(s.name)) ?? checks[0] ?? null
  );
}

/**
 * "We look the bike over… For: road · gravel · commuter" →
 * { lead: "We look the bike over…", suits: ["road", "gravel", "commuter"] }.
 * Without "For:" the whole description is the lead and the list is empty.
 */
export function splitDescription(description: string | null | undefined): { lead: string; suits: string[] } {
  const text = (description ?? '').trim();
  const match = /(?:^|[\s.])(?:for|suits|suited to|good for|ideal for|best for)\s*:\s*/i.exec(text);
  if (!match) return { lead: text, suits: [] };
  const lead = text.slice(0, match.index + (match[0].startsWith('.') ? 1 : 0)).trim();
  const suits = text
    .slice(match.index + match[0].length)
    .split(/\s*[·•;]\s*|\s+\|\s+/)
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean);
  return { lead, suits };
}

/** "20 min", "2 h", "1 h 30 min" — the appointment's length, straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/**
 * What the appointment's LENGTH means for this kind of service:
 *   fit     → "Session"    the fitting really takes this long, with you there;
 *   check   → "Appointment" time with a mechanic looking at the bike with you;
 *   service → "Check-in"   the time to look the bike over and agree the work —
 *                           the bike stays; the work itself is done afterwards.
 */
export interface TimeTerms {
  kind: KindId;
  /** Small label before the length: "Session", "Appointment", "Check-in". */
  label: string;
  /** One honest line under the length, or null. */
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name' | 'description'>): TimeTerms {
  const kind = kindOf(service).id;
  if (kind === 'fit') return { kind, label: 'Session', note: 'The whole session, with you and your bike' };
  if (kind === 'service') return { kind, label: 'Check-in', note: 'The bike stays — the work is booked in after' };
  if (kind === 'check') return { kind, label: 'Appointment', note: 'With a mechanic, bike in hand' };
  return { kind, label: 'Appointment', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>;

/** Whole dollars print without ".00" — "$95", not "$95.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site (src/lib/preset.ts):
 *   free    → no charge for this appointment
 *   from    → labour starts at this amount; parts and extra work are quoted after inspection
 *   fixed   → the price of this appointment (a fitting session, a written check)
 *   request → no price: quoted after inspection
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  /** Small label before the amount. */
  label: string;
  /** The amount, or the words standing in for it. */
  amount: string;
  /** One honest line under the amount, or null. */
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Price', amount: 'Quoted after inspection', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Price', amount: 'Free', note: 'Any work is quoted first' };
  const amount = money(service.priceCents, service.currency, locale);
  return service.priceFrom
    ? { kind: 'from', label: 'Labour from', amount, note: 'Parts extra — quoted first' }
    : { kind: 'fixed', label: 'Fixed price', amount, note: null };
}

/** One line: "labour from $95 + parts", "$30 fixed price", "Free", "Quoted after inspection". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `labour from ${t.amount} + parts`;
  if (t.kind === 'fixed') return `${t.amount} fixed price`;
  return t.amount;
}

/** Short form for the booking picker: "from $95", "$225", "Free". */
export function shortPrice(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}
