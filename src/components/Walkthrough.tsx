import { journeyRoutes } from '@/data/journey';
import { images, type SiteImage } from '@/data/images';
import Picture from '@/components/Picture';
import { useLang } from '@/lib/i18n';

// Captions come verbatim from src/data/journey.ts (looked up by step title).
function step(routeId: string, titleStart: string) {
  const s = journeyRoutes.find((r) => r.id === routeId)?.steps.find((x) => x.title.startsWith(titleStart));
  return s ? { title: s.title, text: s.description } : null;
}

const ITEMS: { image: SiteImage; route: string; title: string }[] = [
  { image: images.van, route: 'flight', title: 'Land Transfer KBR' },
  { image: images.counter, route: 'flight', title: 'Kaunter & Fee Wajib' },
  { image: images.parking, route: 'car', title: 'Masuk Tapak Parking' },
  { image: images.facilities, route: 'bus', title: 'Solat, Segarkan Diri' },
  { image: images.boarding, route: 'flight', title: 'Bot Laju ke Pulau' },
];

export default function Walkthrough() {
  const { t } = useLang();
  return (
    <section className="py-14 sm:py-20" aria-labelledby="walk-title">
      <div className="mx-auto max-w-7xl px-4">
        <h2 id="walk-title" className="font-display text-2xl font-extrabold text-navy sm:text-4xl">{t('walk.title')}</h2>
        <p className="mt-2 text-navy/75">{t('walk.sub')}</p>
      </div>
      <ol className="no-scrollbar mx-auto mt-8 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {ITEMS.map((it, i) => {
          const c = step(it.route, it.title);
          if (!c) return null;
          return (
            <li key={it.title} className="w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-soft sm:w-80">
              <div className="relative aspect-[4/3] overflow-hidden bg-line">
                <Picture image={it.image} sizes="320px" className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">{i + 1}</span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-navy">{c.title}</h3>
                <p className="mt-1 line-clamp-3 text-sm text-navy/75">{c.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mx-auto mt-3 max-w-7xl px-4 text-xs text-navy/60">{t('img.interim')}</p>
    </section>
  );
}
