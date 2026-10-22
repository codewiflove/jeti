import type { LucideIcon } from 'lucide-react';
import { Plane, Train, Bus, Car, CreditCard, Anchor, MapPin, Luggage, Coffee, Calendar, Navigation, SquareParking, AlertTriangle, Ship, Waves } from 'lucide-react';

export type JourneyRouteId = 'flight' | 'ecrl' | 'bus' | 'car';

export interface JourneyStep {
  phase: string;
  title: string;
  description: string;
  tip: string;
  cta?: { label: string; href: string };
  icon: LucideIcon;
  warn?: boolean;
}

export interface JourneyRoute {
  id: JourneyRouteId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  originOptions: string[];
  steps: JourneyStep[];
}

export const journeyRoutes: JourneyRoute[] = [
  {
    id: 'flight',
    label: 'Flight Antarabangsa',
    shortLabel: 'Flight',
    icon: Plane,
    originOptions: ['Paris / Eropah', 'Kuala Lumpur (KLIA)', 'Singapura', 'Hong Kong', 'Australia'],
    steps: [
      {
        phase: 'Langkah 1',
        title: 'Penerbangan Antarabangsa ke KLIA',
        description: 'Penerbangan jarak jauh (12-14 jam) dari Eropah/Antarabangsa mendarat di KLIA Terminal 1 atau 2.',
        tip: 'Untuk masuk ke pulau pada hari yang sama, pastikan penerbangan sambungan domestik mendarat di KBR sebelum jam 3:00 petang.',
        icon: Plane,
      },
      {
        phase: 'Langkah 2',
        title: 'Penerbangan Domestik KLIA ke Kota Bharu (KBR)',
        description: 'Penerbangan 55 minit (AirAsia / Malaysia Airlines / Firefly). KBR lebih dekat & kerap berbanding TGG.',
        tip: 'Jangan risau jika penerbangan domestik lewat. Sistem kami mempunyai Live Flight Tracking — masukkan nombor penerbangan semasa tempahan, jadual bot & van akan dilaraskan secara automatik tanpa caj tersembunyi.',
        cta: { label: 'Tambah Airport Transfer + Bot', href: '/#booking' },
        icon: Plane,
      },
      {
        phase: 'Langkah 3',
        title: 'Land Transfer KBR ke Jeti Kuala Besut',
        description: 'Pemandu kami menunggu di pintu keluar KBR memegang papan nama anda. Perjalanan 50-60 minit terus ke pejabat melapor.',
        tip: 'Tiada risau teksi sapu atau sesat. Pemandu menurunkan anda betul-betul di hadapan kaunter pendaftaran tiket kami.',
        cta: { label: 'Tempah Van/MPV dari KBR', href: '/#booking' },
        icon: Navigation,
      },
      {
        phase: 'Langkah 4',
        title: 'Kaunter & Fee Wajib di Jeti',
        description: 'Imbas E-Tiket QR di kaunter kami, kemudian jalan 2 minit ke laluan pelepasan jeti.',
        tip: 'AMARAN PELANCONG ASING: Fi Akses Jeti RM20/seorang. Fi Taman Laut RM30/seorang — WAJIB GUNA KAD DEBIT/KREDIT/VISA/MASTERCARD. Tunai TIDAK diterima!',
        icon: CreditCard,
        warn: true,
      },
      {
        phase: 'Langkah 5',
        title: 'Bot Laju ke Pulau Perhentian',
        description: 'Naik bot laju mengikut waktu pelepasan seterusnya. Bot beroperasi 8:00 AM - 5:00 PM. Perjalanan 30-40 minit.',
        tip: 'Jaket keselamatan wajib dipakai sepanjang perjalanan. Simpan telefon kamera dalam beg kalis air.',
        cta: { label: 'Tempah Kombo Flight + Speedboat', href: '/#booking' },
        icon: Ship,
      },
      {
        phase: 'Langkah 6',
        title: 'Pendaratan Depan Pintu Resort',
        description: 'Bot menghantar anda terus ke resort yang dipilih semasa tempahan.',
        tip: 'Jeti Terus (Dry Landing): PIR, Tuna Bay, Arwana, Coral View — kaki kekal kering. Air Cetek (Wet Landing): Long Beach & Coral Bay — pakai selipar jeli/kasut air, seluar pendek & beg kalis air.',
        icon: Waves,
      },
    ],
  },
  {
    id: 'ecrl',
    label: 'Kereta Api Laju ECRL',
    shortLabel: 'ECRL',
    icon: Train,
    originOptions: ['Lembah Klang (ITT Gombak)', 'Kuantan', 'Kuala Terengganu', 'Dungun'],
    steps: [
      {
        phase: 'Langkah 1',
        title: 'Tren ECRL ke Stesen Jerteh',
        description: 'Perjalanan tren selesa dari ITT Gombak merentasi Pantai Timur, turun di Stesen ECRL Jerteh (stesen paling hampir dengan Kuala Besut).',
        tip: 'Pilih tren pagi supaya tiba di Stesen Jerteh sebelum jam 3:30 petang bagi mengejar bot terakhir jam 5:00 petang.',
        icon: Train,
      },
      {
        phase: 'Langkah 2',
        title: 'Shuttle Stesen Jerteh ke Jeti',
        description: 'Van shuttle kami sedia menunggu mengikut waktu ketibaan tren ECRL. Perjalanan 20km / 25-30 minit terus ke pejabat melapor.',
        tip: 'Elakkan menunggu e-hailing yang sukar didapati pada waktu puncak di Jerteh. Van terus menghantar anda ke pejabat melapor & kafe transit.',
        cta: { label: 'Tempah Kombo Shuttle ECRL + Bot', href: '/#booking' },
        icon: Navigation,
      },
      {
        phase: 'Langkah 3',
        title: 'Imbas QR & Bayar 2 Fee Wajib',
        description: 'Warganegara: RM5 (Jeti) + RM5 (Taman Laut) = RM10. Bukan Warganegara: RM20 + RM30 = RM50.',
        tip: 'Sediakan Kad Debit/Kredit fizikal atau PayWave untuk bayaran Fi Taman Laut di kaunter — 100% Cashless, tunai tidak diterima.',
        icon: CreditCard,
        warn: true,
      },
      {
        phase: 'Langkah 4',
        title: 'Bot Terus ke Resort',
        description: 'Pelepasan bot laju 30-40 minit terus ke pintu resort mengikut zon pantai/resort yang didaftarkan.',
        tip: 'Maklumat pendaratan (Jetty Drop-off vs Wet Landing) tertera siap-siap pada pas QR telefon anda. Semak status ombak semasa di Live Jetty Status Bar.',
        cta: { label: 'Tempah Bot Laju', href: '/#booking' },
        icon: Ship,
      },
    ],
  },
  {
    id: 'bus',
    label: 'Bas Ekspres',
    shortLabel: 'Bas',
    icon: Bus,
    originOptions: ['TBS Kuala Lumpur', 'Pulau Pinang', 'Johor Bahru', 'Ipoh', 'Melaka'],
    steps: [
      {
        phase: 'Langkah 1',
        title: 'Ketibaan Awal Pagi di Terminal Bas',
        description: 'Bas ekspres malam tiba di Terminal Bas Kuala Besut sekitar 5:00 AM - 6:30 AM.',
        tip: 'Jarak Terminal Bas ke kawasan Jeti hanyalah 800 meter (5-8 minit berjalan kaki) melalui laluan pejalan kaki yang rata.',
        icon: Bus,
      },
      {
        phase: 'Langkah 2',
        title: 'Solat, Segarkan Diri & Simpan Beg',
        description: 'Singgah di Masjid/Surau berhampiran jeti untuk solat Subuh dan membersihkan diri. Letakkan beg besar di ruang simpanan pejabat kami (Luggage Drop).',
        tip: 'Anda tidak perlu mengusung beg berat ke merata tempat sementara menunggu bot pertama jam 8:00 pagi. Lokasi Surau, Tandas Bersih & ATM terakhir tertera dalam e-tiket.',
        cta: { label: 'Aktifkan Luggage Drop', href: '/#booking' },
        icon: Luggage,
      },
      {
        phase: 'Langkah 3',
        title: 'Port Sarapan Pagi & Kopi',
        description: 'Nikmati kopi segar dan sarapan pagi di Aroma Jiwa Cafe / Transit Cafe atau port Nasi Dagang & Mee Celup sekitar jeti.',
        tip: 'Pelancong yang menempah tiket bot dengan kami menerima Baucar Diskaun Kopi/Sarapan Pagi sementara menunggu waktu boarding.',
        cta: { label: 'Pakej Early Bird: Bot + Sarapan', href: '/#booking' },
        icon: Coffee,
      },
      {
        phase: 'Langkah 4',
        title: 'Boarding Bot Pertama (8:00 AM)',
        description: 'Bayar Fi Jeti (RM5) + Fi Taman Laut (RM5 wajib guna kad bank) dan naik bot pertama terus ke resort.',
        tip: 'Tiba di resort seawal 8:40 pagi! Walaupun check-in bilik biasanya jam 2:00 petang, anda boleh letak beg di lobi dan terus mula aktiviti snorkeling.',
        cta: { label: 'Tempah Bot 8:00 AM + Snorkeling', href: '/#booking' },
        icon: Ship,
      },
    ],
  },
  {
    id: 'car',
    label: 'Pandu Sendiri',
    shortLabel: 'Kereta',
    icon: Car,
    originOptions: ['Kuala Lumpur (LPT2)', 'Kuantan', 'Kuala Terengganu (Jambatan Sultan Mahmud)', 'Kota Bharu'],
    steps: [
      {
        phase: 'Langkah 1',
        title: 'Pandu ke Zon Turun Bagasi (Drop-off Zone)',
        description: 'Gunakan Pin Waze #1 dalam e-tiket untuk menurunkan ahli keluarga dan beg berat betul-betul berhampiran pejabat pendaftaran & pintu jeti.',
        tip: 'Jangan terus masuk ke tapak parking dengan beg berat! Turunkan penumpang dan bagasi dahulu supaya keluarga tidak perlu berjalan jauh di bawah panas matahari.',
        cta: { label: 'Dapatkan 2 Pin Lokasi', href: '/#booking' },
        icon: MapPin,
      },
      {
        phase: 'Langkah 2',
        title: 'Masuk Tapak Parking Selamat',
        description: 'Pemandu masuk ke kawasan parking berpagar/berbumbung menggunakan Pin Waze #2 (3-5 minit jalan kaki ke kaunter).',
        tip: 'PERINGATAN KIRAAN PARKING: Parking di Kuala Besut dikira PER HARI KALENDAR (bukan per 24 jam). Masuk Jumaat, keluar Ahad = 3 Hari.',
        cta: { label: 'Pra-Tempah Slot Parking', href: '/#booking' },
        icon: SquareParking,
      },
      {
        phase: 'Langkah 3',
        title: 'Kaunter Fee & Bot ke Resort',
        description: 'Imbas E-Tiket QR, bayar Fi Jeti/Taman Laut (guna kad), dan naik bot terus ke jeti/pantai resort anda.',
        tip: 'Pastikan kad debit/kredit TIDAK ditinggalkan di dalam kereta yang telah diparkir — kaunter Taman Laut wajib bayar guna kad!',
        icon: CreditCard,
        warn: true,
      },
    ],
  },
];

export interface WizardOriginOption {
  id: JourneyRouteId;
  label: string;
}

export const wizardOrigins: WizardOriginOption[] = [
  { id: 'flight', label: 'Antarabangsa / Eropah (Flight)' },
  { id: 'flight', label: 'Kuala Lumpur (Flight ke KBR)' },
  { id: 'ecrl', label: 'Kuala Lumpur (ECRL ke Jerteh)' },
  { id: 'bus', label: 'Bas Ekspres (Malam)' },
  { id: 'car', label: 'Pandu Kereta Sendiri' },
];

export const feeTable = [
  { category: 'Warganegara (MyKad)', jetiFee: 5, marineParkFee: 5, total: 10, paymentMethods: 'Fi Jeti: Tunai/QR/Kad • Fi Taman Laut: WAJIB KAD' },
  { category: 'Bukan Warganegara', jetiFee: 20, marineParkFee: 30, total: 50, paymentMethods: 'Fi Jeti: Tunai/QR/Kad • Fi Taman Laut: WAJIB KAD' },
];
