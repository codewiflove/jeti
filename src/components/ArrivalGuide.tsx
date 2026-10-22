import { Car, Bus, Plane, MapPin, CheckCircle2, Luggage, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const personas = [
  {
    icon: <Car className="h-7 w-7" />,
    title: 'Naik Kereta Sendiri',
    subtitle: 'Self-Drive',
    color: 'primary' as const,
    problem: 'Takut kereta calar/tak selamat, keliru zon turun bagasi, terkejut kiraan parking per hari.',
    solutions: [
      'Kombo Tiket Bot + Tempahan Slot Parking Berpagar/Berbumbung',
      '2 Pin Waze/Maps berbeza: Zon Turun Bagasi (Drop-off) & Tapak Parking',
      'Pengiraan parking telus per hari kalendar (bukan 24 jam)',
      'Peta zon turun bagasi dekat pintu jeti',
    ],
  },
  {
    icon: <Bus className="h-7 w-7" />,
    title: 'Naik Bas Ekspres',
    subtitle: 'Tiba Awal Pagi 5:00-6:30',
    color: 'secondary' as const,
    problem: 'Bas malam tiba sebelum kaunter & bot pertama bermula. Tercari surau, tandas, sarapan & tempat simpan beg.',
    solutions: [
      'Panduan laluan jalan kaki 5 minit (800m) dari Terminal Bas ke jeti',
      'Luggage Drop awal — simpan beg sebelum bersarapan',
      'Surau & tandas bersih untuk mandi & solat Subuh',
      'Port sarapan: Aroma Jiwa Cafe, Nasi Dagang, Mee Celup',
    ],
  },
  {
    icon: <Plane className="h-7 w-7" />,
    title: 'Naik Flight (KBR / TGG)',
    subtitle: 'Airport Transfer + Bot',
    color: 'accent' as const,
    problem: 'Risau flight delay menyebabkan terlepas bot terakhir, atau ditipu teksi sapu di lapangan terbang.',
    solutions: [
      'Kombo Seamless Flight-to-Island: Van/MPV + Tiket Bot sekali gus',
      'Live Flight Tracking — masuk nombor penerbangan, jadual auto-larasan',
      'Panduan Cut-Off Time: ketibaan terakhir KBR sebelum 3:00 petang',
      'Cadangan Hotel Transit jika flight mendarat waktu malam',
    ],
  },
];

const colorMap = {
  primary: { bg: 'bg-primary-50', ring: 'ring-primary-100', icon: 'bg-primary-700 text-white', badge: 'bg-primary-100 text-primary-700', dot: 'bg-primary-500' },
  secondary: { bg: 'bg-secondary-50', ring: 'ring-secondary-100', icon: 'bg-secondary-500 text-white', badge: 'bg-secondary-100 text-secondary-700', dot: 'bg-secondary-500' },
  accent: { bg: 'bg-accent-500/10', ring: 'ring-accent-500/20', icon: 'bg-accent-500 text-white', badge: 'bg-accent-500/15 text-accent-600', dot: 'bg-accent-500' },
};

export default function ArrivalGuide() {
  return (
    <section id="arrival" className="bg-sand-100 py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-700 sm:text-4xl">
            Cara Anda Tiba di Jeti Kuala Besut
          </h2>
          <p className="mt-3 text-base text-primary-500 max-w-2xl mx-auto">
            Panduan &amp; tawaran khusus mengikut cara ketibaan anda — kereta sendiri, bas ekspres, atau penerbangan.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {personas.map((p) => {
            const c = colorMap[p.color];
            return (
              <div key={p.title} className={`rounded-2xl ${c.bg} p-6 ring-1 ${c.ring} transition-all hover:shadow-lg`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${c.icon}`}>
                  {p.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary-700">{p.title}</h3>
                <span className={`mt-1 inline-block rounded-full ${c.badge} px-3 py-0.5 text-xs font-semibold`}>
                  {p.subtitle}
                </span>

                <div className="mt-4 rounded-lg bg-white/60 p-3">
                  <span className="block text-xs font-bold uppercase text-primary-400">Masalah Utama</span>
                  <p className="mt-1 text-xs text-primary-500 leading-relaxed">{p.problem}</p>
                </div>

                <div className="mt-4">
                  <span className="block text-xs font-bold uppercase text-primary-400">Solusi JetiKualaBesut</span>
                  <ul className="mt-2 space-y-2">
                    {p.solutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-primary-600">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${c.dot} text-white rounded-full mt-0.5`} />
                        <span className="leading-snug">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Luggage Drop Callout */}
        <div className="mt-8 flex items-center gap-4 rounded-2xl bg-primary-700 p-5 text-white">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-500">
            <Luggage className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <span className="block text-sm font-bold">Luggage Drop Awal</span>
            <span className="block text-xs text-sand-200/80 mt-0.5">
              Simpan beg anda di pejabat urusan jeti sebelum bersarapan atau menunggu bot. Bebas berjalan tanpa beg berat.
            </span>
          </div>
          <MapPin className="h-5 w-5 text-secondary-300 flex-shrink-0 hidden sm:block" />
        </div>

        {/* CTA to Journey Page */}
        <div className="mt-6 text-center">
          <Link
            to="/panduan-perjalanan-ke-perhentian"
            className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-600 hover:shadow-xl active:scale-95"
          >
            Lihat Panduan Lengkap Door-to-Door
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2 text-xs text-primary-400">
            Garis masa langkah demi langkah dari pintu rumah ke pintu resort
          </p>
        </div>
      </div>
    </section>
  );
}
