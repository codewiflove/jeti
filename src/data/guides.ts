import type { GuideLink, GalleryImage } from '@/types';

export const guides: GuideLink[] = [
  {
    title: 'Jadual & Harga Tiket Bot',
    description: 'Waktu bot lengkap, tambang dewasa & kanak-kanak, serta tips tempahan bot laju ke Pulau Perhentian.',
    icon: 'CalendarClock',
    href: '/jadual-dan-harga-tiket-bot',
  },
  {
    title: 'Panduan Parking Jeti',
    description: 'Kadar parking hari kalendar vs 24 jam, peta zon turun bagasi, dan tempahan slot berpagar selamat.',
    icon: 'SquareParking',
    href: '/panduan-parking-jeti-kuala-besut',
  },
  {
    title: 'Cara ke Jeti Kuala Besut',
    description: 'Panduan pemanduan dari KBR, TGG, Stesen ECRL Jerteh, dan Terminal Bas Kuala Besut dengan jarak dan masa.',
    icon: 'Route',
    href: '/cara-ke-jeti-kuala-besut',
  },
  {
    title: 'Panduan Pendaratan Resort',
    description: 'Senarai resort Perhentian Besar & Kecil dengan info pendaratan basah (wet) atau kering (dry) supaya anda bersedia.',
    icon: 'MapPin',
    href: '/panduan-pendaratan-resort-perhentian',
  },
  {
    title: 'Kemudahan Sekitar Jeti',
    description: 'Lokasi ATM terakhir, surau, klinik, hotel transit, dan port sarapan sebelum menaiki bot ke pulau.',
    icon: 'Building2',
    href: '/kemudahan-sekitar-jeti',
  },
  {
    title: 'Tips Snorkeling & Taman Laut',
    description: 'Panduan snorkeling, fi konservasi Taman Laut, peraturan marin, dan cara tempahan pakej snorkeling berkualiti.',
    icon: 'Fish',
    href: '/tips-snorkeling-taman-laut',
  },
];

// INTERIM: Pexels stock photos self-hosted in /public/images (see CREDITS.md). Swap for real Kuala Besut / Perhentian photos.
export const galleryImages: GalleryImage[] = [
  { url: '/images/longboat-960.webp', alt: 'Bot panjang di pantai Pulau Perhentian dengan bukit hijau' },
  { url: '/images/hero-960.webp', alt: 'Pandangan udara bot laju di air turquoise' },
  { url: '/images/snorkel-960.webp', alt: 'Snorkeling di kalangan hidupan marin tropika' },
  { url: '/images/clearsea-960.webp', alt: 'Pemandangan laut biru jernih dengan bot di Pulau Perhentian' },
  { url: '/images/moored-960.webp', alt: 'Bot berlabuh berhampiran pantai tropika' },
  { url: '/images/village-960.webp', alt: 'Kampung nelayan di persisiran turquoise' },
];
