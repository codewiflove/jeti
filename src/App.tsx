import { useState } from 'react';
import JettyStatusBar from '@/components/JettyStatusBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BookingWidget from '@/components/BookingWidget';
import BudgetCalculator from '@/components/BudgetCalculator';
import GuideLinks from '@/components/GuideLinks';
import ArrivalGuide from '@/components/ArrivalGuide';
import FacilitiesDirectory from '@/components/FacilitiesDirectory';
import { Testimonials, Gallery } from '@/components/TestimonialsGallery';
import Footer from '@/components/Footer';
import ETicketModal from '@/components/ETicketModal';
import type { BookingDetails } from '@/types';

export default function App() {
  const [ticketDetails, setTicketDetails] = useState<BookingDetails | null>(null);

  return (
    <div className="min-h-screen bg-sand-50">
      <JettyStatusBar />
      <Navbar />
      <Hero />
      <BookingWidget onBook={setTicketDetails} />
      <BudgetCalculator />
      <ArrivalGuide />
      <GuideLinks />
      <FacilitiesDirectory />
      <Testimonials />
      <Gallery />
      <Footer />
      <ETicketModal details={ticketDetails} onClose={() => setTicketDetails(null)} />
    </div>
  );
}
