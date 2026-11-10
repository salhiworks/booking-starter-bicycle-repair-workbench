import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, durationSpoken, generalAssessment, kinds, priceTerms, splitDescription, timeTerms } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { SectionMark } from './SectionMark';

/** "Book a Repair Assessment", "Book an Assessment". */
const bookPhrase = (name: string) => {
  const n = name.replace(/^(a|an|the)\s+/i, '');
  return `Book ${/^[aeiou]/i.test(n) ? 'an' : 'a'} ${n}`;
};

interface ServicesProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Services & prices, straight from the engine: every name, length and price is
 * the one the booking uses. First, three plain facts the owner can edit — a
 * check-in is not the repair, "labour from" means parts are extra, the ready
 * date comes at check-in. Then the "not sure?" band (opens the booking with the
 * assessment chosen), then the services in their kinds — Assessments & checks,
 * Servicing & repairs, Bike fitting — each row with what happens, what it is
 * for, the appointment's length labelled for what it is (Appointment ·
 * Check-in · Session), its price in honest terms (Free · Labour from · Fixed
 * price) and a Book button that opens the booking with it chosen. Under the
 * list, the owner's note about prices.
 */
export function Services({ values, services, business, onRetry, onBook }: ServicesProps) {
  const locale = business?.locale ?? 'en-US';
  const all = services.status === 'ready' ? services.data : [];
  const groups = kinds(all);
  const terms = values['services.terms'];
  const unsure = generalAssessment(all);
  const unsureTitle = values['services.unsureTitle'].trim();

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="page">
        <header className="section-head services__head">
          <SectionMark n={1} label="Services & prices" />
          <h2 id="services-title">
            <Emphasis text={values['services.title']} />
          </h2>
          {values['services.intro'] && <p className="section-intro">{values['services.intro']}</p>}
        </header>

        {terms.length > 0 && (
          <ul className="terms" role="list">
            {terms.map((t, i) => (
              <li className="term" key={`${i}-${t.title}`}>
                <p className="term__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="term__title">{t.title}</p>
                {t.text && <p className="term__text">{t.text}</p>}
              </li>
            ))}
          </ul>
        )}

        {services.status === 'loading' && (
          <div className="services__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading services…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Our services and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load our services and prices just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && all.length === 0 && (
          <p className="quiet-state">Our services will be listed here soon. Call or email the workshop to book in the meantime.</p>
        )}

        {unsure && unsureTitle && (
          <aside className="unsure" aria-labelledby="unsure-title">
            <div className="unsure__text">
              <h3 id="unsure-title" className="unsure__title">
                {unsureTitle}
              </h3>
              {values['services.unsureText'] && <p className="unsure__body">{values['services.unsureText']}</p>}
            </div>
            <a className="button button--on-signal unsure__book" href="#book" onClick={bookLink(onBook, unsure.id)}>
              {bookPhrase(unsure.name)}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </aside>
        )}

        {all.length > 0 && (
          <div className="menu">
            {groups.map((g) => {
              const note = g.note ? values[g.note] : '';
              return (
                <section className={`kind kind--${g.id}`} id={`services-${g.id}`} key={g.id} aria-labelledby={`services-${g.id}-title`}>
                  <div className="kind__head">
                    <h3 className="kind__title" id={`services-${g.id}-title`}>
                      {g.label}
                    </h3>
                    {note && <p className="kind__note">{note}</p>}
                  </div>
                  <ul className="menu-list" role="list">
                    {g.services.map((s) => {
                      const { lead, suits } = splitDescription(s.description);
                      const price = priceTerms(s, locale);
                      const time = timeTerms(s);
                      return (
                        <li className="item" key={s.id}>
                          <div className="item__main">
                            {s.image && (
                              <img
                                className="item__thumb"
                                src={s.image.url}
                                alt={s.image.alt}
                                width={s.image.width ?? 160}
                                height={s.image.height ?? 160}
                                loading="lazy"
                                decoding="async"
                              />
                            )}
                            <h4 className="item__name">{s.name}</h4>
                            {lead && <p className="item__lead">{lead}</p>}
                            {suits.length > 0 && (
                              <p className="item__for">
                                <span className="item__for-label">For</span> {suits.join(' · ')}
                              </p>
                            )}
                          </div>
                          <dl className="item__figures">
                            <div className={`item__figure item__figure--time item__figure--${time.kind}`}>
                              <dt>{time.label}</dt>
                              <dd>
                                <span className="item__amount">
                                  <span aria-hidden="true">{durationLabel(s.durationMinutes)}</span>
                                  <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                                </span>
                                {time.note && <span className="item__fine">{time.note}</span>}
                              </dd>
                            </div>
                            <div className={`item__figure item__figure--price item__figure--${price.kind}`}>
                              <dt>{price.label}</dt>
                              <dd>
                                <span className="item__amount">{price.amount}</span>
                                {price.note && <span className="item__fine">{price.note}</span>}
                              </dd>
                            </div>
                          </dl>
                          <a className="button button--small button--quiet item__book" href="#book" onClick={bookLink(onBook, s.id)}>
                            Book<span className="sr-only"> {s.name}</span>
                            <span className="button__arrow" aria-hidden="true">
                              →
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}

            {values['services.priceNote'] && (
              <aside className="price-note" aria-label="About prices">
                <span className="ticks price-note__ticks" aria-hidden="true" />
                <p className="prewrap">{values['services.priceNote']}</p>
              </aside>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
