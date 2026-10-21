import { Anchor, Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-sand-100">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500">
                <Anchor className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-extrabold">JetiKualaBesut</span>
            </div>
            <p className="mt-4 text-sm text-sand-200/80 leading-relaxed">
              Hab komuniti & logistik jeti Kuala Besut — tiket bot laju, tempahan parking selamat,
              van lapangan terbang, dan panduan lengkap ke Pulau Perhentian.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-300">Panduan</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#schedule" className="hover:text-white transition-colors">Jadual & Harga Tiket Bot</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Panduan Parking</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Cara ke Jeti</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Panduan Pendaratan Resort</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">Kemudahan Sekitar Jeti</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-300">Hubungi Kami</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary-400" />
                <span>+60 19-558 4736</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary-400" />
                <span>info@jetikualabesut.my</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-secondary-400 mt-0.5" />
                <span>Jeti Kuala Besut, 22300 Kuala Besut, Terengganu</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-300">Ikuti Kami</h3>
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 transition-colors hover:bg-secondary-500" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 transition-colors hover:bg-secondary-500" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 transition-colors hover:bg-secondary-500" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-600 pt-6 text-center text-xs text-sand-200/60">
          &copy; 2026 JetiKualaBesut. Dibina untuk komuniti jeti Kuala Besut &amp; pelancong Pulau Perhentian.
        </div>
      </div>
    </footer>
  );
}
