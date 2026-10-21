import { useState, useEffect } from 'react';
import { Anchor, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Tempah', href: '#booking' },
  { label: 'Jadual & Harga', href: '#schedule' },
  { label: 'Panduan Parking', href: '#calculator' },
  { label: 'Cara ke Jeti', href: '#guides' },
  { label: 'Panduan Resort', href: '#guides' },
  { label: 'Kemudahan', href: '#facilities' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-primary-700 shadow-lg' : 'bg-primary-700/95 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500">
              <Anchor className="h-6 w-6 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-extrabold tracking-tight">JetiKualaBesut</span>
              <span className="hidden sm:block text-[10px] text-secondary-200 font-medium">
                Hab Sehenti Pulau Perhentian
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-sand-100 transition-colors hover:bg-primary-600 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="ml-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-accent-600 hover:shadow-lg active:scale-95"
            >
              Tempah Sekarang
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Tukar menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-sand-100 transition-colors hover:bg-primary-600 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-accent-500 px-4 py-3 text-center text-sm font-bold text-white"
              >
                Tempah Sekarang
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
