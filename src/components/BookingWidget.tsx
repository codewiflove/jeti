import { useState, useMemo } from 'react';
import {
  Ship,
  Plane,
  SquareParking,
  Calendar,
  CalendarDays,
  Minus,
  Plus,
  ArrowRightLeft,
  MapPin,
  Waves,
  Droplets,
  Search,
  Fish,
  CheckCircle2,
  CreditCard,
  AlertTriangle,
  Bus,
  BaggageClaim,
  Clock,
} from 'lucide-react';
import { resorts, pricing, boatSchedule } from '@/data/resorts';
import type { BookingTab, BookingDetails, Nationality } from '@/types';

interface Props {
  onBook: (details: BookingDetails) => void;
}

function calcCalendarDays(departDate: string, returnDate: string): number {
  if (!departDate || !returnDate) return 1;
  const d1 = new Date(departDate);
  const d2 = new Date(returnDate);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 1;
  const diff = Math.round((d2.getTime() - d1.getTime()) / 86400000);
  return Math.max(1, diff + 1);
}

export default function BookingWidget({ onBook }: Props) {
  const [activeTab, setActiveTab] = useState<BookingTab>('boat');
  const [resortQuery, setResortQuery] = useState('');
  const [selectedResort, setSelectedResort] = useState<typeof resorts[number] | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [island, setIsland] = useState<'Besar' | 'Kecil'>('Besar');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [tripType, setTripType] = useState<'oneway' | 'return'>('oneway');
  const [nationality, setNationality] = useState<Nationality>('local');
  const [parkingType, setParkingType] = useState<'none' | 'open' | 'covered'>('none');
  const [snorkeling, setSnorkeling] = useState(false);
  const [transferFrom, setTransferFrom] = useState('KBR');
  const [flightNumber, setFlightNumber] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const parkingDays = useMemo(() => {
    if (tripType === 'return' && date && returnDate) {
      return calcCalendarDays(date, returnDate);
    }
    return 1;
  }, [tripType, date, returnDate]);

  const mdbFee = nationality === 'local' ? pricing.mdbFeeLocal : pricing.mdbFeeForeign;
  const marineParkFee = nationality === 'local' ? pricing.marineParkFeeLocal : pricing.marineParkFeeForeign;

  const suggestions = useMemo(() => {
    if (!resortQuery.trim()) return resorts;
    const q = resortQuery.toLowerCase();
    return resorts.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.beach.toLowerCase().includes(q) ||
        r.island.toLowerCase().includes(q)
    );
  }, [resortQuery]);

  const boatCost = useMemo(() => {
    const adultPrice = tripType === 'return' ? pricing.boatAdultReturn : pricing.boatAdultOneway;
    const childPrice = tripType === 'return' ? pricing.boatChildReturn : pricing.boatChildOneway;
    return adults * adultPrice + children * childPrice;
  }, [adults, children, tripType]);

  const parkingCost = useMemo(() => {
    if (parkingType === 'none') return 0;
    const rate = parkingType === 'covered' ? pricing.parkingCovered : pricing.parkingOpen;
    return rate * parkingDays;
  }, [parkingType, parkingDays]);

  const mdbCost = mdbFee * (adults + children);
  const marineParkCost = marineParkFee * (adults + children);
  const snorkelingCost = snorkeling ? pricing.snorkelingPackage * adults : 0;
  const transferCost = activeTab === 'transfer'
    ? transferFrom === 'KBR' ? pricing.vanKBR : transferFrom === 'TGG' ? pricing.vanTGG : pricing.vanECRL
    : 0;

  const total = boatCost + parkingCost + mdbCost + marineParkCost + snorkelingCost + transferCost;

  const handleSelectResort = (resort: typeof resorts[number]) => {
    setSelectedResort(resort);
    setResortQuery(resort.name);
    setIsland(resort.island);
    setShowSuggestions(false);
  };

  const handleBook = () => {
    onBook({
      island,
      resortName: selectedResort?.name || resortQuery || 'Belum dipilih',
      landing: selectedResort?.landing || null,
      date: date || 'Belum dipilih',
      returnDate: returnDate || 'Belum dipilih',
      adults,
      children,
      tripType,
      nationality,
      parkingType,
      parkingDays,
      snorkeling,
      transferFrom,
      flightNumber,
    });
  };

  const tabs: { id: BookingTab; label: string; icon: React.ReactNode }[] = [
    { id: 'boat', label: 'Bot Laju', icon: <Ship className="h-5 w-5" /> },
    { id: 'transfer', label: 'Van Lapangan Terbang', icon: <Plane className="h-5 w-5" /> },
    { id: 'parking', label: 'Parking & Snorkeling', icon: <SquareParking className="h-5 w-5" /> },
  ];

  return (
    <section id="booking" className="relative z-20 -mt-8 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-primary-100">
          {/* Tabs */}
          <div className="flex border-b border-sand-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 px-3 py-4 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-500 hover:bg-sand-50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-7">
            {/* Cashless Alert (all tabs) */}
            <div className="mb-5 flex items-start gap-3 rounded-xl bg-warning-500/10 p-3.5 ring-1 ring-warning-500/30">
              <CreditCard className="h-5 w-5 flex-shrink-0 text-warning-600 mt-0.5" />
              <div>
                <span className="block text-sm font-bold text-warning-700">Sediakan Kad Bank &amp; MyKad</span>
                <span className="block text-xs text-warning-600/90 mt-0.5">
                  Kaunter Taman Laut di Jeti Kuala Besut ialah 100% Cashless — wajib bayar guna Kad Debit/Kredit. Tunai TIDAK diterima.
                </span>
              </div>
            </div>

            {/* Boat Tab */}
            {activeTab === 'boat' && (
              <div className="space-y-5 animate-fade-in">
                {/* Nationality Selector */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary-700">Kewarganegaraan</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setNationality('local')}
                      className={`rounded-xl border-2 p-3.5 text-left transition-all ${nationality === 'local' ? 'border-secondary-500 bg-secondary-50' : 'border-sand-200 hover:border-secondary-300'}`}
                    >
                      <span className="block text-sm font-bold text-primary-700">Warganegara (MyKad)</span>
                      <span className="mt-0.5 block text-xs text-primary-400">Fi Jeti + Taman Laut: RM10/orang</span>
                    </button>
                    <button
                      onClick={() => setNationality('foreign')}
                      className={`rounded-xl border-2 p-3.5 text-left transition-all ${nationality === 'foreign' ? 'border-secondary-500 bg-secondary-50' : 'border-sand-200 hover:border-secondary-300'}`}
                    >
                      <span className="block text-sm font-bold text-primary-700">Bukan Warganegara</span>
                      <span className="mt-0.5 block text-xs text-primary-400">Fi Jeti + Taman Laut: RM50/orang</span>
                    </button>
                  </div>
                </div>

                {/* Island Selector */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary-700">Pilih Pulau</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Besar', 'Kecil'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setIsland(opt);
                          setSelectedResort(null);
                          setResortQuery('');
                        }}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          island === opt
                            ? 'border-secondary-500 bg-secondary-50'
                            : 'border-sand-200 bg-white hover:border-secondary-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold text-primary-700">Perhentian {opt}</span>
                            <p className="mt-0.5 text-xs text-primary-400">
                              {opt === 'Besar' ? 'Resort mewah, jeti tetap' : 'Backpacker, pendaratan basah'}
                            </p>
                          </div>
                          {island === opt && <CheckCircle2 className="h-5 w-5 text-secondary-500" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resort Search */}
                <div className="relative">
                  <label className="mb-2 block text-sm font-semibold text-primary-700">
                    Nama Resort (Panduan Pendaratan Automatik)
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300" />
                    <input
                      type="text"
                      value={resortQuery}
                      onChange={(e) => {
                        setResortQuery(e.target.value);
                        setShowSuggestions(true);
                        setSelectedResort(null);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="Taip nama resort, cth: Bubu Long Beach..."
                      className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-700 placeholder:text-primary-300 focus:border-secondary-500 focus:outline-none"
                    />
                  </div>

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-sand-200 bg-white shadow-xl no-scrollbar">
                      {suggestions.map((resort) => (
                        <button
                          key={resort.name}
                          onClick={() => handleSelectResort(resort)}
                          className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left hover:bg-sand-50 border-b border-sand-100 last:border-0"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-primary-700 truncate">{resort.name}</span>
                            <span className="flex items-center gap-1 text-xs text-primary-400">
                              <MapPin className="h-3 w-3" />
                              {resort.beach} • Perhentian {resort.island}
                            </span>
                          </div>
                          <span
                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                              resort.landing === 'wet'
                                ? 'bg-secondary-100 text-secondary-700'
                                : 'bg-sand-200 text-primary-600'
                            }`}
                          >
                            {resort.landing === 'wet' ? <Droplets className="h-3 w-3" /> : <Waves className="h-3 w-3" />}
                            {resort.landing === 'wet' ? 'Basah' : 'Kering'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Landing Info Banner */}
                  {selectedResort && (
                    <div
                      className={`mt-3 flex items-start gap-3 rounded-xl p-4 animate-slide-up ${
                        selectedResort.landing === 'wet'
                          ? 'bg-secondary-50 ring-1 ring-secondary-200'
                          : 'bg-sand-100 ring-1 ring-sand-300'
                      }`}
                    >
                      {selectedResort.landing === 'wet' ? (
                        <Droplets className="h-5 w-5 flex-shrink-0 text-secondary-600 mt-0.5" />
                      ) : (
                        <Waves className="h-5 w-5 flex-shrink-0 text-primary-500 mt-0.5" />
                      )}
                      <div>
                        <span className="block text-sm font-bold text-primary-700">
                          Pendaratan {selectedResort.landing === 'wet' ? 'Basah (Wet Landing)' : 'Kering (Dry Landing)'}
                        </span>
                        <span className="block text-xs text-primary-500 mt-0.5">{selectedResort.landingNote}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Trip Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary-700">Jenis Perjalanan</label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { id: 'oneway' as const, label: 'Sehala', price: `RM${pricing.boatAdultOneway}` },
                      { id: 'return' as const, label: 'Pergi-Pulang', price: `RM${pricing.boatAdultReturn}` },
                    ]).map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setTripType(opt.id)}
                        className={`flex items-center justify-between rounded-xl border-2 p-3.5 transition-all ${
                          tripType === opt.id
                            ? 'border-secondary-500 bg-secondary-50'
                            : 'border-sand-200 bg-white hover:border-secondary-300'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                          <ArrowRightLeft className="h-4 w-4" />
                          {opt.label}
                        </span>
                        <span className="text-xs font-bold text-secondary-600">{opt.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates & Time */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary-700">Tarikh Pergi</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-700 focus:border-secondary-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {tripType === 'return' && (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-primary-700">Tarikh Pulang</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300" />
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-700 focus:border-secondary-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary-700">Waktu Bot</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 px-4 text-sm text-primary-700 focus:border-secondary-500 focus:outline-none"
                    >
                      <option value="">Pilih waktu...</option>
                      {boatSchedule.map((s) => (
                        <option key={s.time} value={s.time} disabled={!s.available}>
                          {s.time} — {s.label} {!s.available ? '(Penuh)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Passengers */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Counter
                    label="Penumpang Dewasa"
                    sublabel="RM40 / RM70"
                    value={adults}
                    onChange={setAdults}
                    min={1}
                    max={20}
                  />
                  <Counter
                    label="Kanak-kanak"
                    sublabel="RM25 / RM40 (3-12 tahun)"
                    value={children}
                    onChange={setChildren}
                    min={0}
                    max={20}
                  />
                </div>
              </div>
            )}

            {/* Transfer Tab */}
            {activeTab === 'transfer' && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary-700">Pilihan Transfer</label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {([
                      { id: 'KBR', label: 'Lapangan Terbang Kota Bharu', sub: 'KBR', price: pricing.vanKBR, time: '~45 min' },
                      { id: 'TGG', label: 'Lapangan Terbang Kuala Terengganu', sub: 'TGG', price: pricing.vanTGG, time: '~1 jam 30 min' },
                      { id: 'ECRL', label: 'Stesen ECRL Jerteh', sub: 'ECRL', price: pricing.vanECRL, time: '~20 min' },
                    ]).map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setTransferFrom(opt.id)}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          transferFrom === opt.id
                            ? 'border-secondary-500 bg-secondary-50'
                            : 'border-sand-200 bg-white hover:border-secondary-300'
                        }`}
                      >
                        <span className="block text-sm font-bold text-primary-700">{opt.sub}</span>
                        <span className="mt-1 block text-xs text-primary-400 leading-snug">{opt.label}</span>
                        <span className="mt-2 block text-xs font-semibold text-secondary-600">RM{opt.price} • {opt.time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flight Number Input */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary-700">Nombor Penerbangan (Live Tracking)</label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-500" />
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="cth: AK6432, FY2104, MH1234..."
                      className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-700 placeholder:text-primary-300 focus:border-secondary-500 focus:outline-none"
                    />
                  </div>
                  {flightNumber && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg bg-secondary-50 p-3 text-xs text-secondary-700 animate-slide-up">
                      <CheckCircle2 className="h-4 w-4 text-secondary-500" />
                      <span>Penerbangan <strong>{flightNumber.toUpperCase()}</strong> dijejaki. Jika flight lewat, jadual bot &amp; van akan dilaraskan tanpa caj tersembunyi.</span>
                    </div>
                  )}
                </div>

                {/* Cut-off Time Warning */}
                <div className="flex items-start gap-3 rounded-xl bg-accent-500/10 p-4 ring-1 ring-accent-500/30">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-accent-600 mt-0.5" />
                  <div>
                    <span className="block text-sm font-bold text-accent-700">Panduan Masa Selamat (Cut-Off Time)</span>
                    <span className="block text-xs text-accent-600/90 mt-1">
                      Ketibaan flight paling lewat di KBR untuk bot hari yang sama: <strong>sebelum 3:00 petang</strong>.
                      Jika flight mendarat waktu malam, kami cadangkan Hotel Transit Kuala Besut untuk menginap semalaman.
                    </span>
                  </div>
                </div>

                {/* Bus Arrival Info */}
                <div className="rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary-700">
                    <Bus className="h-4 w-4 text-secondary-500" />
                    Datang Naik Bas Ekspres?
                  </div>
                  <p className="mt-2 text-xs text-primary-500 leading-relaxed">
                    Bas malam biasanya tiba di Terminal Bas Kuala Besut sekitar 5:00-6:30 pagi. Laluan jalan kaki 5 minit (800m) ke jeti. Tersedia: Luggage Drop awal, surau &amp; tandas untuk mandi/solat Subuh, serta port sarapan (Aroma Jiwa Cafe, Nasi Dagang, Mee Celup) sementara menunggu bot pertama jam 8:00 pagi.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Counter label="Penumpang" sublabel="Van share" value={adults} onChange={setAdults} min={1} max={10} />
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary-700">Tarikh Ketibaan</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-700 focus:border-secondary-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Parking & Snorkeling Tab */}
            {activeTab === 'parking' && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary-700">Jenis Parking</label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {([
                      { id: 'none' as const, label: 'Tiada Parking', sub: 'Tanpa kereta', price: 0 },
                      { id: 'open' as const, label: 'Parking Terbuka', sub: `RM${pricing.parkingOpen} / hari`, price: pricing.parkingOpen },
                      { id: 'covered' as const, label: 'Berpagar & Berbumbung', sub: `RM${pricing.parkingCovered} / hari`, price: pricing.parkingCovered },
                    ]).map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setParkingType(opt.id)}
                        className={`rounded-xl border-2 p-4 text-center transition-all ${
                          parkingType === opt.id
                            ? 'border-secondary-500 bg-secondary-50'
                            : 'border-sand-200 bg-white hover:border-secondary-300'
                        }`}
                      >
                        <SquareParking className="mx-auto h-6 w-6 text-primary-500" />
                        <span className="mt-2 block text-sm font-bold text-primary-700">{opt.label}</span>
                        <span className="mt-0.5 block text-xs text-primary-400">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {parkingType !== 'none' && (
                  <div className="rounded-xl bg-sand-100 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-primary-700">
                      <CalendarDays className="h-4 w-4 text-secondary-500" />
                      Parking Dikira Per Hari Kalendar
                    </div>
                    <p className="mt-2 text-xs text-primary-500 leading-relaxed">
                      Kadar parking dikira <strong>mengikut tarikh kalendar</strong>, bukan per 24 jam. Cth: masuk Jumaat 10 pagi, keluar Ahad 12 tengah hari = <strong>3 hari</strong> (Jumaat + Sabtu + Ahad).
                    </p>
                    {tripType === 'return' && date && returnDate ? (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary-50 p-2.5 text-xs text-secondary-700">
                        <CheckCircle2 className="h-4 w-4 text-secondary-500" />
                        <span>Auto-kira: {parkingDays} hari kalendar (Tarikh Pergi → Tarikh Pulang)</span>
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary-50 p-2.5 text-xs text-primary-500">
                        <Clock className="h-4 w-4 text-primary-400" />
                        <span>Pilih Tarikh Pergi &amp; Tarikh Pulang di tab Bot Laju untuk auto-kira hari parking.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Snorkeling */}
                <button
                  onClick={() => setSnorkeling(!snorkeling)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    snorkeling ? 'border-secondary-500 bg-secondary-50' : 'border-sand-200 bg-white hover:border-secondary-300'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <Fish className="h-6 w-6 text-secondary-500" />
                    <div>
                      <span className="block text-sm font-bold text-primary-700">Pakej Snorkeling</span>
                      <span className="block text-xs text-primary-400">RM{pricing.snorkelingPackage}/orang • 3 spot snorkeling</span>
                    </div>
                  </div>
                  <div className={`flex h-6 w-11 items-center rounded-full transition-colors ${snorkeling ? 'bg-secondary-500' : 'bg-sand-300'}`}>
                    <div className={`h-5 w-5 rounded-full bg-white transition-transform ${snorkeling ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </button>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Counter label="Penumpang Dewasa" sublabel="RM40 / RM70" value={adults} onChange={setAdults} min={1} max={20} />
                  <Counter label="Kanak-kanak" sublabel="RM25 / RM40" value={children} onChange={setChildren} min={0} max={20} />
                </div>
              </div>
            )}

            {/* Sticky Total Bar */}
            <div className="mt-6 flex items-center justify-between rounded-xl bg-primary-700 px-5 py-4 text-white">
              <div>
                <span className="block text-xs text-sand-200">Jumlah Anggaran</span>
                <span className="text-2xl font-extrabold">RM{total}</span>
                {parkingType !== 'none' && parkingDays > 0 && (
                  <span className="block text-[10px] text-sand-200/60">Termasuk {parkingDays} hari parking</span>
                )}
              </div>
              <button
                onClick={handleBook}
                className="rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-600 active:scale-95"
              >
                Tempah Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({
  label,
  sublabel,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  sublabel: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-700">{label}</label>
      <div className="flex items-center justify-between rounded-xl border-2 border-sand-200 bg-white p-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-sand-100 text-primary-700 transition-colors hover:bg-sand-200 disabled:opacity-40 active:scale-90"
          aria-label="Kurang"
        >
          <Minus className="h-5 w-5" />
        </button>
        <div className="text-center">
          <span className="text-xl font-extrabold text-primary-700">{value}</span>
          <span className="block text-[10px] text-primary-400">{sublabel}</span>
        </div>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-500 text-white transition-colors hover:bg-secondary-600 disabled:opacity-40 active:scale-90"
          aria-label="Tambah"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
