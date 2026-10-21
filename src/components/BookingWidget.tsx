import { useState, useMemo } from 'react';
import {
  Ship,
  Plane,
  SquareParking,
  Calendar,
  Minus,
  Plus,
  ArrowRightLeft,
  MapPin,
  Waves,
  Droplets,
  Search,
  Fish,
  CheckCircle2,
} from 'lucide-react';
import { resorts, pricing, boatSchedule } from '@/data/resorts';
import type { BookingTab, BookingDetails } from '@/types';

interface Props {
  onBook: (details: BookingDetails) => void;
}

export default function BookingWidget({ onBook }: Props) {
  const [activeTab, setActiveTab] = useState<BookingTab>('boat');
  const [resortQuery, setResortQuery] = useState('');
  const [selectedResort, setSelectedResort] = useState<typeof resorts[number] | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [island, setIsland] = useState<'Besar' | 'Kecil'>('Besar');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [tripType, setTripType] = useState<'oneway' | 'return'>('oneway');
  const [parkingType, setParkingType] = useState<'none' | 'open' | 'covered'>('none');
  const [parkingNights, setParkingNights] = useState(2);
  const [snorkeling, setSnorkeling] = useState(false);
  const [transferFrom, setTransferFrom] = useState('KBR');
  const [selectedTime, setSelectedTime] = useState('');

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
    return rate * parkingNights;
  }, [parkingType, parkingNights]);

  const conservationCost = adults * pricing.conservationAdult + children * pricing.conservationChild;
  const mdbCost = pricing.mdbFee * (adults + children);
  const snorkelingCost = snorkeling ? pricing.snorkelingPackage * adults : 0;
  const transferCost = activeTab === 'transfer'
    ? transferFrom === 'KBR' ? pricing.vanKBR : transferFrom === 'TGG' ? pricing.vanTGG : pricing.vanECRL
    : 0;

  const total = boatCost + parkingCost + conservationCost + mdbCost + snorkelingCost + transferCost;

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
      adults,
      children,
      tripType,
      parkingType,
      parkingNights,
      snorkeling,
      transferFrom,
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
            {/* Boat Tab */}
            {activeTab === 'boat' && (
              <div className="space-y-5 animate-fade-in">
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

                {/* Date & Time */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary-700">Tarikh Perjalanan</label>
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

                {/* Live Flight Tracking (dummy) */}
                <div className="rounded-xl bg-primary-50 p-4 ring-1 ring-primary-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary-700">
                    <Plane className="h-4 w-4 text-secondary-500" />
                    Penjejakan Penerbangan Langsung
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      { flight: 'MH1234', route: 'KUL → KBR', status: 'Tiba 09:15', onTime: true },
                      { flight: 'AK6789', route: 'PEN → TGG', status: 'Tiba 10:40', onTime: true },
                    ].map((f) => (
                      <div key={f.flight} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
                        <span className="font-semibold text-primary-700">{f.flight}</span>
                        <span className="text-primary-500">{f.route}</span>
                        <span className={`font-bold ${f.onTime ? 'text-success-600' : 'text-warning-600'}`}>{f.status}</span>
                      </div>
                    ))}
                  </div>
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
                      { id: 'open' as const, label: 'Parking Terbuka', sub: 'RM10 / malam', price: pricing.parkingOpen },
                      { id: 'covered' as const, label: 'Berpagar & Berbumbung', sub: 'RM15 / malam', price: pricing.parkingCovered },
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
                  <Counter
                    label="Bilangan Malam Parking"
                    sublabel="Kiraan hari kalendar"
                    value={parkingNights}
                    onChange={setParkingNights}
                    min={1}
                    max={14}
                  />
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
