import { Ship } from 'lucide-react';
import { team } from '@/data/team';
import { operators } from '@/data/operators';
import { founder } from '@/data/founder';
import { TEAM_READY, OPERATORS_READY, FOUNDER_READY, showSection } from '@/data/flags';
import Avatar from '@/components/Avatar';
import { useLang } from '@/lib/i18n';

function PreviewNote({ ready }: { ready: boolean }) {
  const { t } = useLang();
  if (ready) return null;
  return <p className="mt-2 inline-block rounded-full bg-cta-50 px-3 py-1 text-xs font-semibold text-cta-700">{t('people.soon')}</p>;
}

export function FounderNote() {
  const { t } = useLang();
  if (!showSection(FOUNDER_READY)) return null;
  return (
    <section className="mx-auto max-w-4xl px-4 py-10" aria-label={t('people.founder')}>
      <figure className="flex flex-col items-center gap-5 rounded-3xl border border-line bg-white p-6 text-center shadow-soft sm:flex-row sm:text-left">
        <Avatar name={founder.name} photo={founder.photo} size="h-24 w-24 text-2xl" />
        <div>
          <blockquote className="font-display text-lg font-semibold text-navy">
            <p>“{founder.message}”</p><p className="mt-1">{founder.message2}</p>
          </blockquote>
          <figcaption className="mt-3 text-sm text-navy/75"><strong className="text-navy">{founder.name}</strong> — {founder.role}</figcaption>
          <PreviewNote ready={FOUNDER_READY} />
        </div>
      </figure>
    </section>
  );
}

export function TeamSection() {
  const { t } = useLang();
  if (!showSection(TEAM_READY)) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-14" aria-labelledby="team-title">
      <h2 id="team-title" className="font-display text-2xl font-extrabold text-navy sm:text-4xl">{t('people.team')}</h2>
      <p className="mt-2 text-navy/75">{t('people.teamSub')}</p>
      <PreviewNote ready={TEAM_READY} />
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {team.map((m, i) => (
          <li key={i} className="flex flex-col items-center rounded-2xl border border-line bg-white p-5 text-center shadow-soft">
            <Avatar name={m.name} photo={m.photo} size="h-20 w-20 text-xl" />
            <p className="mt-3 text-sm font-bold text-navy">{m.name}</p>
            <p className="text-xs text-navy/75">{m.role}</p>
            <p className="mt-1 text-xs text-turq-800">{m.years}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function OperatorsSection() {
  const { t } = useLang();
  if (!showSection(OPERATORS_READY)) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-14" aria-labelledby="ops-title">
      <h2 id="ops-title" className="font-display text-2xl font-extrabold text-navy sm:text-4xl">{t('people.ops')}</h2>
      <PreviewNote ready={OPERATORS_READY} />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {operators.map((o, i) => (
          <li key={i} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              {o.logo ? <img src={o.logo} alt="" className="h-12 w-12 rounded-xl object-contain" loading="lazy" />
                : <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-offwhite text-turq-700"><Ship className="h-6 w-6" aria-hidden /></span>}
              <div><p className="text-sm font-bold text-navy">{o.name}</p><p className="text-xs text-navy/75">{o.service}</p></div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-offwhite p-2"><dt className="text-navy/60">{t('people.licence')}</dt><dd className="font-semibold text-navy">{o.licence}</dd></div>
              <div className="rounded-lg bg-offwhite p-2"><dt className="text-navy/60">{t('people.fleet')}</dt><dd className="font-semibold text-navy">{o.fleet}</dd></div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
