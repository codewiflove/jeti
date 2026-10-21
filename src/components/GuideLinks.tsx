import {
  CalendarClock,
  SquareParking,
  Route,
  MapPin,
  Building2,
  Fish,
  ArrowRight,
} from 'lucide-react';
import { guides } from '@/data/guides';

const iconMap: Record<string, React.ReactNode> = {
  CalendarClock: <CalendarClock className="h-6 w-6" />,
  SquareParking: <SquareParking className="h-6 w-6" />,
  Route: <Route className="h-6 w-6" />,
  MapPin: <MapPin className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
  Fish: <Fish className="h-6 w-6" />,
};

export default function GuideLinks() {
  return (
    <section id="guides" className="bg-sand-100 py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-700 sm:text-4xl">
            Panduan Lengkap Jeti Kuala Besut
          </h2>
          <p className="mt-3 text-base text-primary-500 max-w-2xl mx-auto">
            Semua yang anda perlu tahu sebelum bergerak ke Pulau Perhentian — dari jadual bot hingga lokasi ATM terakhir.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl bg-white p-6 ring-1 ring-sand-200 transition-all hover:shadow-lg hover:ring-secondary-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 transition-colors group-hover:bg-secondary-500 group-hover:text-white">
                {iconMap[guide.icon]}
              </div>
              <h3 className="mt-4 text-lg font-bold text-primary-700 group-hover:text-secondary-600 transition-colors">
                {guide.title}
              </h3>
              <p className="mt-2 text-sm text-primary-500 leading-relaxed">
                {guide.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-500 transition-transform group-hover:gap-2">
                Baca panduan <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
