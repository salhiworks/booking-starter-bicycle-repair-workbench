import type { SiteValues } from '../lib/content';
import { engine } from '../lib/engine';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

/** The Live Demo and preview mode show a fictional workshop: say so beside it. */
const SAMPLE_BUSINESS = __BOOKING_DEMO__ || engine.mode === 'preview';

/**
 * The workshop, on bench grey: a bike in the stand at the tool wall and a wheel
 * on the bench as two wide frames set off one another, who the workshop is in
 * a few paragraphs, and how it works as four plain standards. No named
 * mechanic, no awards, no years of experience: the workshop speaks as "we"
 * (the owner adds names and real qualifications themselves).
 */
export function Studio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const room = values['studio.photoRoom'];
  const work = values['studio.photoWork'];
  const facts = values['studio.facts'];
  const paragraphs = values['studio.text'].split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const sample = (id: string) => !ownerFields.includes(id);
  return (
    <section id="workshop" className="section band workroom" aria-labelledby="workroom-title">
      <div className="page workroom__grid">
        <header className="section-head workroom__head">
          <SectionMark n={5} label="The workshop" />
          <h2 id="workroom-title">
            <Emphasis text={values['studio.title']} />
          </h2>
        </header>
        <div className="workroom__text">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'workroom__lead prewrap' : 'prewrap'}>
              {p}
            </p>
          ))}
          {SAMPLE_BUSINESS && (
            <p className="sample-note">
              <span className="tag">Sample</span>
              {__BOOKING_DEMO__ ? 'This demo shows a fictional workshop' : 'Preview shows a fictional workshop'}: the workshop and the mechanics in the
              photographs are licensed stock images from another bicycle workshop — not its own people or space.
            </p>
          )}
        </div>
        {(room || work) && (
          <div className={`workroom__photos ${room && work ? '' : 'workroom__photos--single'}`}>
            {room && (
              <figure className="workroom__room">
                <Photo image={room} sizes="(min-width: 960px) 44vw, 100vw" className="workroom__photo" />
                {sample('studio.photoRoom') && <span className="tag tag--on-photo">Sample</span>}
                <figcaption className="workroom__caption">The work stand</figcaption>
              </figure>
            )}
            {work && (
              <figure className="workroom__work">
                <Photo image={work} sizes="(min-width: 960px) 34vw, 86vw" className="workroom__photo" />
                {sample('studio.photoWork') && <span className="tag tag--on-photo">Sample</span>}
                <figcaption className="workroom__caption">The bench</figcaption>
              </figure>
            )}
          </div>
        )}
        {facts.length > 0 && (
          <dl className="workroom__facts">
            {facts.map((fact, i) => (
              <div key={`${i}-${fact.title}`}>
                <dt>{fact.title}</dt>
                {fact.text && <dd>{fact.text}</dd>}
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
