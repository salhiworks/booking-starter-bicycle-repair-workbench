import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { durationLabel, kindOf, priceTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

interface FittingProps {
  values: SiteValues;
  ownerFields: string[];
  services: Service[];
  business: Business | null;
  onBook: StartBooking;
}

/**
 * Bike fitting, on graphite — the workshop's specialty given its own room.
 * Left: the rider on the bike (a tall frame) with an adjustment beside it.
 * Right: what the fitting is for, what a session involves (numbered, along the
 * measuring scale), what it doesn't include (no motion capture, pressure
 * mapping or medical claims — owner-editable, but honest by default), what to
 * bring — and the fitting services from the engine as a compact list with
 * their session length and price, each bookable. Nothing here is hard-coded:
 * services, lengths and prices come from the engine.
 */
export function Fitting({ values, ownerFields, services, business, onBook }: FittingProps) {
  const locale = business?.locale ?? 'en-US';
  const fits = services.filter((s) => kindOf(s).id === 'fit');
  const steps = values['fitting.steps'];
  const photo = values['fitting.photo'];
  const photo2 = values['fitting.photo2'];
  const notIncluded = values['fitting.notIncluded'].trim();
  const bring = values['fitting.bring'].trim();
  const sample = (id: string) => !ownerFields.includes(id);
  return (
    <section id="fitting" className="section dark fitting" aria-labelledby="fitting-title">
      <div className="page fitting__grid">
        {(photo || photo2) && (
          <div className={`fitting__photos ${photo && photo2 ? '' : 'fitting__photos--single'}`}>
            {photo && (
              <figure className="fitting__main">
                <Photo image={photo} sizes="(min-width: 960px) 30vw, 70vw" className="fitting__photo" />
                {sample('fitting.photo') && <span className="tag tag--on-photo">Sample</span>}
              </figure>
            )}
            {photo2 && (
              <figure className="fitting__detail">
                <Photo image={photo2} sizes="(min-width: 960px) 16vw, 40vw" className="fitting__photo" />
                {sample('fitting.photo2') && <span className="tag tag--on-photo">Sample</span>}
              </figure>
            )}
          </div>
        )}

        <div className="fitting__body">
          <header className="section-head fitting__head">
            <SectionMark n={3} label="Bike fitting" tone="on-dark" />
            <h2 id="fitting-title">
              <Emphasis text={values['fitting.title']} />
            </h2>
            {values['fitting.intro'] && <p className="section-intro">{values['fitting.intro']}</p>}
          </header>

          {steps.length > 0 && (
            <>
              <h3 className="fitting__label">What a session involves</h3>
              <ol className="fit-steps" role="list">
                {steps.map((s, i) => (
                  <li className="fit-step" key={`${i}-${s.title}`}>
                    <span className="fit-step__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="fit-step__title">{s.title}</span>
                    {s.text && <span className="fit-step__text">{s.text}</span>}
                  </li>
                ))}
              </ol>
            </>
          )}

          {(notIncluded || bring) && (
            <div className="fitting__notes">
              {notIncluded && (
                <div className="fitting__note">
                  <h3 className="fitting__label">What it doesn’t include</h3>
                  <p className="prewrap">{notIncluded}</p>
                </div>
              )}
              {bring && (
                <div className="fitting__note">
                  <h3 className="fitting__label">What to bring</h3>
                  <p className="prewrap">{bring}</p>
                </div>
              )}
            </div>
          )}

          {fits.length > 0 && (
            <ul className="fit-list" role="list" aria-label="Fitting sessions">
              {fits.map((s) => {
                const price = priceTerms(s, locale);
                return (
                  <li className="fit-list__row" key={s.id}>
                    <span className="fit-list__name">{s.name}</span>
                    <span className="fit-list__meta">
                      <span>
                        <span className="sr-only">Session length: </span>
                        {durationLabel(s.durationMinutes)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        <span className="sr-only">{price.label}: </span>
                        {price.kind === 'from' ? `from ${price.amount}` : price.amount}
                      </span>
                    </span>
                    <a className="button button--small fit-list__book" href="#book" onClick={bookLink(onBook, s.id)}>
                      Book<span className="sr-only"> {s.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
