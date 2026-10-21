import {
  Banknote,
  Moon,
  HeartPulse,
  BedDouble,
  Coffee,
  UtensilsCrossed,
  Soup,
  Fuel,
  MapPin,
} from 'lucide-react';
import { facilities } from '@/data/facilities';

const iconMap: Record<string, React.ReactNode> = {
  Banknote: <Banknote className="h-5 w-5" />,
  Moon: <Moon className="h-5 w-5" />,
  HeartPulse: <HeartPulse className="h-5 w-5" />,
  BedDouble: <BedDouble className="h-5 w-5" />,
  Coffee: <Coffee className="h-5 w-5" />,
  UtensilsCrossed: <UtensilsCrossed className="h-5 w-5" />,
  Soup: <Soup className="h-5 w-5" />,
  Fuel: <Fuel className="h-5 w-5" />,
};

export default function FacilitiesDirectory() {
  return (
    <section id="facilities" className="py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-700 sm:text-4xl">
            Kemudahan Sekitar Jeti
          </h2>
          <p className="mt-3 text-base text-primary-500 max-w-2xl mx-auto">
            Lokasi penting sebelum menaiki bot — ATM terakhir, surau, klinik, hotel transit, dan port sarapan.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {facilities.map((f) => (
            <div
              key={f.name}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-200 transition-all hover:shadow-md"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                {iconMap[f.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-primary-700">{f.name}</span>
                  <span className="flex-shrink-0 rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-semibold text-primary-500">
                    {f.category}
                  </span>
                </div>
                <span className="mt-1 flex items-center gap-1 text-xs text-secondary-600 font-medium">
                  <MapPin className="h-3 w-3" />
                  {f.distance}
                </span>
                <p className="mt-1.5 text-xs text-primary-400 leading-relaxed">{f.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
