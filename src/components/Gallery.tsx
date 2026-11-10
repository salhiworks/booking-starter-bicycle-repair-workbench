import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';
import { SectionMark } from './SectionMark';

/**
 * The six frames as three columns of two: each column pairs an upright and a
 * wide frame (upright first, then wide first, then upright first), so the three
 * columns end level and every photo stays whole in its own shape. A removed
 * photo only shortens its column.
 */
const COLUMNS = [
  [
    { n: 1, shape: 'portrait' },
    { n: 2, shape: 'landscape' },
  ],
  [
    { n: 3, shape: 'landscape' },
    { n: 4, shape: 'portrait' },
  ],
  [
    { n: 5, shape: 'portrait' },
    { n: 6, shape: 'landscape' },
  ],
] as const;

type N = (typeof COLUMNS)[number][number]['n'];

interface Frame {
  n: number;
  shape: 'portrait' | 'landscape';
  photo: SiteImage;
  caption: string;
  sample: boolean;
}

/**
 * On the bench: workshop details with short captions — what the photo shows
 * and why it matters. Sample photos say so (and that they are another
 * workshop's) until the owner replaces them; there are no before-and-after pairs.
 */
export function Gallery({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const columns: Frame[][] = COLUMNS.map((col) =>
    col.flatMap(({ n, shape }) => {
      const photo = values[`gallery.photo${n as N}`];
      if (!photo) return [];
      return [{ n, shape, photo, caption: values[`gallery.caption${n as N}`].trim(), sample: !ownerFields.includes(`gallery.photo${n}`) }];
    }),
  ).filter((col) => col.length > 0);
  if (columns.length === 0) return null;
  const sample = columns.some((col) => col.some((f) => f.sample));
  return (
    <section id="bench" className="section band work" aria-labelledby="work-title">
      <div className="page">
        <header className="section-head work__head">
          <SectionMark n={2} label="On the bench" />
          <h2 id="work-title">
            <Emphasis text={values['gallery.title']} />
          </h2>
          {values['gallery.intro'] && <p className="section-intro">{values['gallery.intro']}</p>}
          {sample && (
            <p className="sample-note">
              <span className="tag">Sample photos</span>
              Example photography from another bicycle workshop — not this workshop’s mechanics or its own work.
            </p>
          )}
        </header>
        <div className="work__grid" data-columns={columns.length}>
          {columns.map((col, c) => (
            <ul className="work__col" role="list" key={c}>
              {col.map((f) => (
                <li key={`${f.n}-${f.photo.src}`} className={`work__item work__item--${f.shape}`}>
                  <figure>
                    <div className="work__frame">
                      <Photo
                        image={f.photo}
                        sizes="(min-width: 960px) 30vw, (min-width: 600px) 46vw, 100vw"
                        className={`work__photo work__photo--${f.shape}`}
                      />
                      {f.sample && <span className="tag tag--on-photo">Sample</span>}
                    </div>
                    {f.caption && <figcaption className="work__caption">{f.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
