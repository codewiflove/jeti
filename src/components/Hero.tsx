import { Ship, ShieldCheck, Clock3, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-700">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(10,37,64,0.7) 0%, rgba(10,37,64,0.85) 100%), url(https://images.pexels.com/photos/15923579/pexels-photo-15923579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-500/20 px-4 py-1.5 text-xs font-semibold text-secondary-200 backdrop-blur-sm ring-1 ring-secondary-500/30">
            <Star className="h-3.5 w-3.5 fill-secondary-300 text-secondary-300" />
            Hab Komuniti & Logistik Jeti Kuala Besut
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Tiket Bot Laju ke{' '}
            <span className="text-secondary-300">Pulau Perhentian</span>
          </h1>

          <p className="mt-5 text-lg text-sand-100 sm:text-xl">
            Hab sehenti untuk tiket bot laju, tempahan parking selamat, van lapangan terbang,
            dan panduan lengkap jeti Kuala Besut — semua dalam satu laman web.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#booking"
              className="rounded-xl bg-accent-500 px-7 py-3.5 text-center text-base font-bold text-white shadow-lg transition-all hover:bg-accent-600 hover:shadow-xl active:scale-95"
            >
              Tempah Bot Sekarang
            </a>
            <a
              href="#calculator"
              className="rounded-xl bg-white/10 px-7 py-3.5 text-center text-base font-bold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Kira Bajet Perjalanan
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Ship className="h-7 w-7 text-secondary-300" />
              <span className="text-xs text-sand-100 font-medium">7 Bot Sehari</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <ShieldCheck className="h-7 w-7 text-secondary-300" />
              <span className="text-xs text-sand-100 font-medium">Parking Selamat</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Clock3 className="h-7 w-7 text-secondary-300" />
              <span className="text-xs text-sand-100 font-medium">E-Tiket QR Segera</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
