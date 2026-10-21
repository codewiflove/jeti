import { useState, useMemo } from 'react';
import { Calculator, Ship, SquareParking, Leaf, Building, Fish, Info } from 'lucide-react';
import { pricing } from '@/data/resorts';

export default function BudgetCalculator() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [tripType, setTripType] = useState<'oneway' | 'return'>('return');
  const [parkingType, setParkingType] = useState<'open' | 'covered'>('open');
  const [parkingNights, setParkingNights] = useState(2);
  const [snorkeling, setSnorkeling] = useState(false);

  const boatCost = useMemo(() => {
    const adultPrice = tripType === 'return' ? pricing.boatAdultReturn : pricing.boatAdultOneway;
    const childPrice = tripType === 'return' ? pricing.boatChildReturn : pricing.boatChildOneway;
    return adults * adultPrice + children * childPrice;
  }, [adults, children, tripType]);

  const parkingRate = parkingType === 'covered' ? pricing.parkingCovered : pricing.parkingOpen;
  const parkingCost = parkingRate * parkingNights;
  const conservationCost = adults * pricing.conservationAdult + children * pricing.conservationChild;
  const mdbCost = pricing.mdbFee * (adults + children);
  const snorkelingCost = snorkeling ? pricing.snorkelingPackage * adults : 0;
  const total = boatCost + parkingCost + conservationCost + mdbCost + snorkelingCost;

  const lineItems = [
    { icon: <Ship className="h-5 w-5" />, label: `Tiket Bot ${tripType === 'return' ? 'Pergi-Pulang' : 'Sehala'}`, detail: `${adults} dewasa + ${children} kanak-kanak`, cost: boatCost },
    { icon: <SquareParking className="h-5 w-5" />, label: `Parking ${parkingType === 'covered' ? 'Berpagar & Berbumbung' : 'Terbuka'}`, detail: `RM${parkingRate}/malam × ${parkingNights} malam`, cost: parkingCost },
    { icon: <Leaf className="h-5 w-5" />, label: 'Fi Konservasi Taman Laut', detail: `RM${pricing.conservationAdult} dewasa / RM${pricing.conservationChild} kanak-kanak`, cost: conservationCost },
    { icon: <Building className="h-5 w-5" />, label: 'Fi MDB (Marine Park Duty)', detail: `RM${pricing.mdbFee} × ${adults + children} penumpang`, cost: mdbCost },
    ...(snorkeling ? [{ icon: <Fish className="h-5 w-5" />, label: 'Pakej Snorkeling', detail: `RM${pricing.snorkelingPackage} × ${adults} dewasa`, cost: snorkelingCost }] : []),
  ];

  return (
    <section id="calculator" className="py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-50 px-4 py-1.5 text-xs font-bold text-secondary-600 ring-1 ring-secondary-200">
            <Calculator className="h-3.5 w-3.5" />
            Kalkulator Bajet Penuh
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-primary-700 sm:text-4xl">
            Kira Kos Perjalanan Anda
          </h2>
          <p className="mt-3 text-base text-primary-500 max-w-2xl mx-auto">
            Tiada caj tersembunyi. Setiap kos dipaparkan telus — bot, parking, fi taman laut, dan fi MDB.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* Controls */}
          <div className="lg:col-span-3 space-y-5 rounded-2xl bg-white p-6 ring-1 ring-sand-200 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-primary-700">Penumpang Dewasa</label>
                <div className="flex items-center justify-between rounded-xl border-2 border-sand-200 p-2">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="h-10 w-10 rounded-lg bg-sand-100 text-primary-700 font-bold text-lg hover:bg-sand-200 active:scale-90">-</button>
                  <span className="text-lg font-extrabold text-primary-700">{adults}</span>
                  <button onClick={() => setAdults(Math.min(20, adults + 1))} className="h-10 w-10 rounded-lg bg-secondary-500 text-white font-bold text-lg hover:bg-secondary-600 active:scale-90">+</button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-primary-700">Kanak-kanak</label>
                <div className="flex items-center justify-between rounded-xl border-2 border-sand-200 p-2">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="h-10 w-10 rounded-lg bg-sand-100 text-primary-700 font-bold text-lg hover:bg-sand-200 active:scale-90">-</button>
                  <span className="text-lg font-extrabold text-primary-700">{children}</span>
                  <button onClick={() => setChildren(Math.min(20, children + 1))} className="h-10 w-10 rounded-lg bg-secondary-500 text-white font-bold text-lg hover:bg-secondary-600 active:scale-90">+</button>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-primary-700">Jenis Perjalanan</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setTripType('oneway')} className={`rounded-xl border-2 p-3 text-sm font-bold transition-all ${tripType === 'oneway' ? 'border-secondary-500 bg-secondary-50 text-secondary-700' : 'border-sand-200 text-primary-500 hover:border-secondary-300'}`}>Sehala</button>
                <button onClick={() => setTripType('return')} className={`rounded-xl border-2 p-3 text-sm font-bold transition-all ${tripType === 'return' ? 'border-secondary-500 bg-secondary-50 text-secondary-700' : 'border-sand-200 text-primary-500 hover:border-secondary-300'}`}>Pergi-Pulang</button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-primary-700">Jenis Parking</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setParkingType('open')} className={`rounded-xl border-2 p-3 text-sm font-bold transition-all ${parkingType === 'open' ? 'border-secondary-500 bg-secondary-50 text-secondary-700' : 'border-sand-200 text-primary-500 hover:border-secondary-300'}`}>
                  Terbuka (RM10)
                </button>
                <button onClick={() => setParkingType('covered')} className={`rounded-xl border-2 p-3 text-sm font-bold transition-all ${parkingType === 'covered' ? 'border-secondary-500 bg-secondary-50 text-secondary-700' : 'border-sand-200 text-primary-500 hover:border-secondary-300'}`}>
                  Berpagar (RM15)
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-primary-700">Bilangan Malam Parking: <span className="text-secondary-600">{parkingNights} malam</span></label>
              <input
                type="range"
                min={1}
                max={14}
                value={parkingNights}
                onChange={(e) => setParkingNights(Number(e.target.value))}
                className="w-full accent-secondary-500"
              />
              <div className="mt-1 flex justify-between text-[10px] text-primary-400">
                <span>1 malam</span>
                <span>14 malam</span>
              </div>
            </div>

            <button
              onClick={() => setSnorkeling(!snorkeling)}
              className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all ${snorkeling ? 'border-secondary-500 bg-secondary-50' : 'border-sand-200 hover:border-secondary-300'}`}
            >
              <div className="flex items-center gap-3 text-left">
                <Fish className="h-6 w-6 text-secondary-500" />
                <div>
                  <span className="block text-sm font-bold text-primary-700">Pakej Snorkeling</span>
                  <span className="block text-xs text-primary-400">RM{pricing.snorkelingPackage}/orang • 3 spot</span>
                </div>
              </div>
              <div className={`flex h-6 w-11 items-center rounded-full transition-colors ${snorkeling ? 'bg-secondary-500' : 'bg-sand-300'}`}>
                <div className={`h-5 w-5 rounded-full bg-white transition-transform ${snorkeling ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </button>
          </div>

          {/* Breakdown */}
          <div className="lg:col-span-2 rounded-2xl bg-primary-700 p-6 text-white shadow-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-300">Pecahan Kos</h3>
            <div className="mt-4 space-y-3">
              {lineItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-primary-600 pb-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-600 text-secondary-300">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold truncate">{item.label}</span>
                    <span className="block text-xs text-sand-200/70">{item.detail}</span>
                  </div>
                  <span className="text-sm font-bold whitespace-nowrap">RM{item.cost}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-primary-500 pt-5">
              <span className="text-sm font-bold text-sand-200">Jumlah Keseluruhan</span>
              <span className="text-3xl font-extrabold text-accent-400">RM{total}</span>
            </div>

            <a
              href="#booking"
              className="mt-5 block rounded-xl bg-accent-500 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-accent-600"
            >
              Teruskan ke Tempahan
            </a>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary-600 p-3 text-xs text-sand-200/80">
              <Info className="h-4 w-4 flex-shrink-0 text-secondary-300 mt-0.5" />
              <span>Parking dikira mengikut hari kalendar (bukan 24 jam). Fi Taman Laut &amp; MDB wajib dibayar di kaunter jeti.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
