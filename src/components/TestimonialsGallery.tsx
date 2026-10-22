import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { googleReview } from '@/data/reviews';
import Avatar from '@/components/Avatar';
import { useLang } from '@/lib/i18n';
import type { Testimonial } from '@/types';

const firstName = (n: string) => n.split(/\s+/)[0];

export function GoogleScore({ dark = false }: { dark?: boolean }) {
  const { t } = useLang();
  if (typeof googleReview.score !== 'number') return null;
  const body = (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${dark ? 'bg-white/10 text-white' : 'bg-white text-navy ring-1 ring-line'}`}>
      <Star className="h-4 w-4 fill-cta-500 text-cta-500" aria-hidden />{googleReview.score.toFixed(1)} Google
      {typeof googleReview.count === 'number' && <span className="opacity-75">({googleReview.count} {t('proof.reviews')})</span>}
    </span>
  );
  return googleReview.url ? <a href={googleReview.url} target="_blank" rel="noopener noreferrer">{body}</a> : body;
}

function Card({ t: item }: { t: Testimonial }) {
  const { t } = useLang();
  return (
    <figure className="flex w-80 shrink-0 snap-center flex-col rounded-2xl bg-white p-6 shadow-card">
      <Quote className="h-7 w-7 text-turq-200" aria-hidden />
      <div className="mt-2 flex gap-0.5" role="img" aria-label={`${item.rating}/5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} aria-hidden className={`h-4 w-4 ${i < item.rating ? 'fill-cta-500 text-cta-500' : 'text-line'}`} />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy/85">{item.text}</blockquote>
      {item.staffMention && <p className="mt-3 text-xs font-semibold text-turq-800">{t('proof.helpedBy')} {item.staffMention}</p>}
      <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <Avatar name={item.name} photo={item.photo} size="h-10 w-10 text-sm" />
        <span><span className="block text-sm font-bold text-navy">{firstName(item.name)}</span>
          <span className="block text-xs text-navy/70">{item.country ?? item.origin} • {item.date}</span></span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const { t } = useLang();
  return (
    <section className="bg-navy px-4 py-16 sm:py-20" aria-labelledby="testi-title">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="testi-title" className="font-display text-3xl font-extrabold text-white sm:text-4xl">{t('proof.title')}</h2>
            <p className="mt-2 max-w-2xl text-white/80">{t('proof.sub')}</p>
          </div>
          <GoogleScore dark />
        </div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {testimonials.map((x) => <Card key={x.name} t={x} />)}
        </div>
      </div>
    </section>
  );
}

/** Compact proof row near the booking CTA — existing testimonial content only. */
export function ProofRow() {
  const { t } = useLang();
  const picks = testimonials.slice(0, 3);
  return (
    <div className="mt-4 rounded-2xl border border-line bg-white p-4" aria-label={t('proof.title')}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex -space-x-2">
          {picks.map((p) => <Avatar key={p.name} name={p.name} photo={p.photo} size="h-8 w-8 text-[11px]" />)}
        </div>
        <GoogleScore />
      </div>
      <p className="mt-3 line-clamp-2 text-sm italic text-navy/85">“{picks[0]?.text}”</p>
      <p className="mt-1 text-xs text-navy/70">— {picks[0] && firstName(picks[0].name)}, {picks[0]?.country ?? picks[0]?.origin}</p>
    </div>
  );
}
