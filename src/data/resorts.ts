import type { Resort, BoatSchedule } from '@/types';

export const resorts: Resort[] = [
  { name: 'Arwana Perhentian Resort', island: 'Besar', beach: 'Teluk Pauh', landing: 'dry', landingNote: 'Turun di jeti kayu resort — kaki kekal kering.' },
  { name: 'Tuna Bay Island Resort', island: 'Besar', beach: 'Teluk Pauh', landing: 'dry', landingNote: 'Jeti tetap — turun terus ke resort.' },
  { name: 'Perhentian Island Resort', island: 'Besar', beach: 'Teluk Pauh', landing: 'dry', landingNote: 'Jeti kayu panjang — pendaratan kering.' },
  { name: 'Coral View Island Resort', island: 'Besar', beach: 'Teluk Setumbin', landing: 'dry', landingNote: 'Jeti tetap resort — turun tanpa basah.' },
  { name: 'BuQari Resort', island: 'Besar', beach: 'Kampung Pasir Hantu', landing: 'dry', landingNote: 'Jeti kampung — berjalan kaki ke resort.' },
  { name: 'Mama\'s Chalet', island: 'Besar', beach: 'Kampung Pasir Hantu', landing: 'dry', landingNote: 'Jeti kampung — berjalan kaki singkat.' },
  { name: 'Bubu Long Beach Resort', island: 'Kecil', beach: 'Long Beach', landing: 'wet', landingNote: 'Pendaratan basah — bot berhampiran pantai, turun dalam air setakat lutut.' },
  { name: 'Senja Bay Resort', island: 'Kecil', beach: 'Coral Bay', landing: 'wet', landingNote: 'Pendaratan basah di Coral Bay — bersedia untuk turun dalam air.' },
  { name: 'Abdul Chalet', island: 'Kecil', beach: 'Coral Bay', landing: 'wet', landingNote: 'Pendaratan basah — pakai selipar jeli disyorkan.' },
  { name: 'Panorama Diving Resort', island: 'Kecil', beach: 'Long Beach', landing: 'wet', landingNote: 'Pendaratan basah di Long Beach — simpan telefon dalam beg kalis air.' },
  { name: 'Sahabat Resort', island: 'Kecil', beach: 'Kampung Pasir Hantu', landing: 'dry', landingNote: 'Jeti kampung — pendaratan kering.' },
  { name: 'Matahari Chalet', island: 'Kecil', beach: 'Long Beach', landing: 'wet', landingNote: 'Pendaratan basah — bot singgah di tepi pantai Long Beach.' },
];

export const boatSchedule: BoatSchedule[] = [
  { time: '09:00', label: 'Bot Pertama', available: true },
  { time: '10:30', label: 'Bot Pagi', available: true },
  { time: '12:00', label: 'Bot Tengah Hari', available: true },
  { time: '13:30', label: 'Bot Petang', available: true },
  { time: '15:00', label: 'Bot Petang Akhir', available: true },
  { time: '16:30', label: 'Bot Senja', available: true },
  { time: '18:00', label: 'Bot Terakhir', available: false },
];

export const pricing = {
  boatAdultOneway: 40,
  boatAdultReturn: 70,
  boatChildOneway: 25,
  boatChildReturn: 40,
  parkingOpen: 10,
  parkingCovered: 15,
  // Fi Akses Jeti (MDB) — per orang
  mdbFeeLocal: 5,
  mdbFeeForeign: 20,
  // Fi Taman Laut — per orang
  marineParkFeeLocal: 5,
  marineParkFeeForeign: 30,
  snorkelingPackage: 80,
  vanKBR: 120,
  vanTGG: 90,
  vanECRL: 25,
};
