import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { SectionMark } from './SectionMark';

/**
 * How it works, as two tracks side by side — a repair (book a check-in → bring
 * the bike → we look and quote → the work, once you agree → we call when it's
 * ready) and a fitting (book a session → ride and adjust → ride it in) — laid
 * out like a workshop's job sheet: numbered lines on the measuring scale. No
 * photos, so the page stays short. Under both, one honest line about what an
 * online booking covers (the appointment — never the estimate, parts or pick-up).
 */
export function Process({ values }: { values: SiteValues }) {
  const repair = values['process.repair'];
  const fit = values['process.fit'];
  const note = values['process.note'].trim();
  if (repair.length === 0 && fit.length === 0) return null;
  return (
    <section id="how" className="section process" aria-labelledby="how-title">
      <div className="page">
        <header className="section-head process__head">
          <SectionMark n={4} label="How it works" />
          <h2 id="how-title">
            <Emphasis text={values['process.title']} />
          </h2>
        </header>
        <div className="tracks">
          {repair.length > 0 && <Track id="repair" title="A repair" steps={repair} />}
          {fit.length > 0 && <Track id="fit" title="A fitting" steps={fit} />}
        </div>
        {note && (
          <p className="process__note">
            <span className="process__note-label">What a booking covers</span>
            <span className="prewrap">{note}</span>
          </p>
        )}
      </div>
    </section>
  );
}

function Track({ id, title, steps }: { id: string; title: string; steps: { title: string; text: string }[] }) {
  return (
    <section className={`track track--${id}`} aria-labelledby={`track-${id}`}>
      <h3 className="track__title" id={`track-${id}`}>
        {title}
      </h3>
      <span className="ticks track__ticks" aria-hidden="true" />
      <ol className="track__steps" role="list">
        {steps.map((s, i) => (
          <li className="track__step" key={`${i}-${s.title}`}>
            <span className="track__n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="track__step-title">{s.title}</span>
            {s.text && <span className="track__text">{s.text}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
