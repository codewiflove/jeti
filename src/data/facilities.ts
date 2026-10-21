import type { Facility } from '@/types';

export const facilities: Facility[] = [
  { name: 'ATM Maybank / Bank Islam', category: 'Kewangan', distance: '2 km (Pekan Kuala Besut)', icon: 'Banknote', note: 'ATM terakhir sebelum jeti — pastikan ada wang tunai.' },
  { name: 'Surau Jeti Kuala Besut', category: 'Ibadah', distance: 'Di jeti', icon: 'Moon', note: 'Surau berhampiran kaunter tiket — tempat wudhu tersedia.' },
  { name: 'Klinik Kesihatan Kuala Besut', category: 'Kesihatan', distance: '3 km', icon: 'HeartPulse', note: 'Klinik kerajaan — buka setiap hari 8 pagi hingga 5 petang.' },
  { name: 'T-hotel Kuala Besut', category: 'Penginapan Transit', distance: '1 km', icon: 'BedDouble', note: 'Hotel transit bajet — sesuai untuk bot pagi awal.' },
  { name: 'Aroma Jiwa Cafe', category: 'Makanan & Minuman', distance: '500 m', icon: 'Coffee', note: 'Sarapan tempatan popular — nasi lemak dan kopi O.' },
  { name: 'Nasi Dagang Pak Long', category: 'Makanan & Minuman', distance: '800 m', icon: 'UtensilsCrossed', note: 'Nasi dagang Terengganu asli — buka dari 6 pagi.' },
  { name: 'Mee Celup Kuala Besut', category: 'Makanan & Minuman', distance: '1 km', icon: 'Soup', note: 'Mee celup dan sup laut — menu wajib sebelum ke jeti.' },
  { name: 'Stesen Minyak Petronas', category: 'Kenderaan', distance: '1.5 km', icon: 'Fuel', note: 'Stesen minyak terakhir — isi penuh sebelum parking.' },
];
