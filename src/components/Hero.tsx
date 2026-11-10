import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import { bookLink } from '../lib/bookLink';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 58vw, 100vw';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  /** Fields the owner has set — the photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
  /** The engine id of the free/general assessment, when the owner lists one ("Not sure?" route). */
  unsureId: string | null;
  onBook: StartBooking;
}

/**
 * The first screen. Left: what the workshop is (eyebrow), a firm condensed
 * headline with one marker stroke, one paragraph on how repairs and fittings
 * start, Book an appointment and the "not sure? book a free assessment" route,
 * today's hours. Right: real work at the bench — a wheel in the truing stand,
 * the whole wheel in frame — with the measuring scale along its foot. Under
 * both, the bikes the workshop works on and the one thing it doesn't.
 * Phones: the words and both actions first, inside the first screen, then the
 * photo at full width (3:2, so the wheel stays whole), then the list.
 */
export function Hero({ values, ownerFields, status, unsureId, onBook }: HeroProps) {
  const sample = !ownerFields.includes('hero.photo');
  const photo = values['hero.photo'];
  const unsureLabel = values['hero.unsureLabel'].trim();
  const listTitle = values['hero.listTitle'].trim();
  const list = values['hero.list'];
  const notList = values['hero.notList'].trim();
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
            {unsureLabel && (
              <a className="quiet-link hero__unsure" href={unsureId ? '#book' : '#services'} onClick={unsureId ? bookLink(onBook, unsureId) : undefined}>
                {unsureLabel}
                <span aria-hidden="true">&nbsp;→</span>
              </a>
            )}
          </div>
          {status && (
            <p className="open-status hero__status hero__enter" data-open={status.open}>
              <span className="open-status__dot" aria-hidden="true" />
              {status.text}
            </p>
          )}
        </div>

        {photo && (
          <figure className="hero__visual">
            <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />
            {sample && <span className="tag tag--on-photo">Sample</span>}
            <span className="ticks hero__ticks" aria-hidden="true" />
          </figure>
        )}

        {((list.length > 0 && listTitle) || notList) && (
          <div className="hero__list hero__enter">
            {list.length > 0 && listTitle && (
              <>
                <p className="hero__list-title">{listTitle}</p>
                <ul role="list">
                  {list.map((item, i) => (
                    <li key={`${i}-${item.text}`}>{item.text}</li>
                  ))}
                </ul>
              </>
            )}
            {notList && <p className="hero__not">{notList}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
