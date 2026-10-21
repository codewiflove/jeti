import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { galleryImages } from '@/data/guides';

export function Testimonials() {
  return (
    <section className="bg-primary-700 py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Kata Pelancong
          </h2>
          <p className="mt-3 text-base text-sand-200/80 max-w-2xl mx-auto">
            Pengalaman pelanggan yang telah menggunakan JetiKualaBesut untuk perjalanan ke Pulau Perhentian.
          </p>
        </div>

        <div className="mt-10 flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 w-80 snap-center rounded-2xl bg-white p-6 shadow-lg"
            >
              <Quote className="h-8 w-8 text-secondary-200" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? 'fill-accent-400 text-accent-400' : 'text-sand-200'}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-primary-600 leading-relaxed">{t.text}</p>
              <div className="mt-4 border-t border-sand-100 pt-4">
                <span className="block text-sm font-bold text-primary-700">{t.name}</span>
                <span className="block text-xs text-primary-400">{t.origin} • {t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-700 sm:text-4xl">
            Galeri Pulau Perhentian
          </h2>
          <p className="mt-3 text-base text-primary-500 max-w-2xl mx-auto">
            Glimpse keindahan yang menanti anda di Pulau Perhentian.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl ring-1 ring-sand-200 ${
                i === 0 ? 'col-span-2 row-span-2 sm:col-span-2' : ''
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
                  i === 0 ? 'h-64 sm:h-80' : 'h-32 sm:h-40'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
