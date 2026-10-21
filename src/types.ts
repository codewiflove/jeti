export interface Resort {
  name: string;
  island: 'Besar' | 'Kecil';
  beach: string;
  landing: 'wet' | 'dry';
  landingNote: string;
}

export interface BoatSchedule {
  time: string;
  label: string;
  available: boolean;
}

export interface Facility {
  name: string;
  category: string;
  distance: string;
  icon: string;
  note: string;
}

export interface Testimonial {
  name: string;
  origin: string;
  rating: number;
  text: string;
  date: string;
}

export interface GuideLink {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export type BookingTab = 'boat' | 'transfer' | 'parking';

export interface BookingDetails {
  island: 'Besar' | 'Kecil';
  resortName: string;
  landing: 'wet' | 'dry' | null;
  date: string;
  adults: number;
  children: number;
  tripType: 'oneway' | 'return';
  parkingType: 'none' | 'open' | 'covered';
  parkingNights: number;
  snorkeling: boolean;
  transferFrom: string;
}
