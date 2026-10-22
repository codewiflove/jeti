import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane,
  Train,
  Bus,
  Car,
  CreditCard,
  AlertTriangle,
  MapPin,
  Clock,
  Navigation,
  ArrowRight,
  Ship,
  Waves,
  Droplets,
  CheckCircle2,
  Calendar,
  Users,
  Anchor,
} from 'lucide-react';
import { journeyRoutes, wizardOrigins, feeTable, type JourneyRouteId } from '@/data/journey';
import { resorts, pricing } from '@/data/resorts';
import { boatSchedule } from '@/data/resorts';

export default function JourneyPage() {
  const [activeTab, setActiveTab] = useState<JourneyRouteId>('flight');
  const [wizardOrigin, setWizardOrigin] = useState<string>(wizardOrigins[0].label);
  const [wizardResort, setWizardResort] = useState<string>('');

  const selectedRoute = journeyRoutes.find((r) => r.id === activeTab)!;

  // Determine route from wizard origin
  const wizardRouteId = useMemo<JourneyRouteId>(() => {
    const found = wizardOrigins.find((o) => o.label === wizardOrigin);
    return found?.id || 'flight';
  }, [wizardOrigin]);

  const wizardRoute = journeyRoutes.find((r) => r.id === wizardRouteId)!;
  const wizardResortData = resorts.find((r) => r.name === wizardResort);

  // Estimate total time and cost
  const totalTimeEstimate = useMemo(() => {
    const times: Record<JourneyRouteId, string> = {
      flight: '~16-18 jam (jarak jauh) atau ~4 jam (dari KL)',
      ecrl: '~5-6 jam (dari KL)',
      bus: '~8-10 jam (semalaman)',
      car: '~5-7 jam (dari KL)',
    };
    return times[wizardRouteId];
  }, [wizardRouteId]);

  const totalCostEstimate = useMemo(() => {
    const transferCosts: Record<JourneyRouteId, number> = {
      flight: pricing.vanKBR,
      ecrl: pricing.vanECRL,
      bus: 0,
      car: pricing.parkingOpen * 3,
    };
    const boat = pricing.boatAdultReturn;
    const fees = pricing.mdbFeeLocal + pricing.marineParkFeeLocal;
    return transferCosts[wizardRouteId] + boat + fees;
  }, [wizardRouteId]);

  const resortOptions = resorts.map((r) => ({
    name: r.name,
    label: `${r.name} — ${r.beach} (Perhentian ${r.island})`,
  }));

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero Banner */}
      <div className="bg-primary-700 pt-10 pb-16 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-500/20 px-4 py-1.5 text-xs font-bold text-secondary-300 ring-1 ring-secondary-500/30">
            <Navigation className="h-3.5 w-3.5" />
            Panduan Perjalanan Door-to-Door
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl">
            Dari Pintu Anda ke Pintu Resort
          </h1>
          <p className="mt-3 text-base text-sand-200/90 max-w-2xl mx-auto">
            Garis masa langkah demi langkah dari titik permulaan anda sehingga kaki mencecah pantai resort.
            Pilih laluan & resort anda untuk jadual peribadi serta-merta.
          </p>
        </div>
      </div>

      {/* Interactive Route Wizard */}
      <section className="relative z-10 -mt-8 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-primary-100 sm:p-8">
            <h2 className="text-center text-lg font-bold text-primary-700">
              Jana Jadual Perjalanan Peribadi Anda
            </h2>
            <p className="mt-1 text-center text-xs text-primary-400">
              Pilih titik permulaan dan resort — sistem akan paparkan jadual lengkap dengan kos & tip.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Dropdown 1: Origin */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-primary-700">Saya datang dari...</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300" />
                  <select
                    value={wizardOrigin}
                    onChange={(e) => setWizardOrigin(e.target.value)}
                    className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-700 focus:border-secondary-500 focus:outline-none"
                  >
                    {wizardOrigins.map((opt) => (
                      <option key={opt.label} value={opt.label}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dropdown 2: Resort */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-primary-700">Saya menginap di resort...</label>
                <div className="relative">
                  <Anchor className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300" />
                  <select
                    value={wizardResort}
                    onChange={(e) => setWizardResort(e.target.value)}
                    className="w-full rounded-xl border-2 border-sand-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-700 focus:border-secondary-500 focus:outline-none"
                  >
                    <option value="">Pilih resort...</option>
                    {resortOptions.map((r) => (
                      <option key={r.name} value={r.name}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Auto-generated Personalized Timeline Card */}
            {wizardResort && (
              <div className="mt-6 rounded-2xl bg-primary-700 p-5 text-white animate-slide-up">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary-400" />
                  <span className="text-sm font-bold">Jadual Perjalanan Peribadi Anda</span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-primary-600 p-3">
                    <Clock className="h-5 w-5 text-secondary-300" />
                    <span className="mt-2 block text-xs text-sand-200/70">Anggaran Masa</span>
                    <span className="block text-sm font-bold">{totalTimeEstimate}</span>
                  </div>
                  <div className="rounded-xl bg-primary-600 p-3">
                    <CreditCard className="h-5 w-5 text-secondary-300" />
                    <span className="mt-2 block text-xs text-sand-200/70">Anggaran Kos/orang</span>
                    <span className="block text-sm font-bold">RM{totalCostEstimate}</span>
                    <span className="block text-[10px] text-sand-200/50">Bot + Fi + Transfer</span>
                  </div>
                  <div className="rounded-xl bg-primary-600 p-3">
                    {wizardResortData?.landing === 'wet' ? <Droplets className="h-5 w-5 text-secondary-300" /> : <Waves className="h-5 w-5 text-secondary-300" />}
                    <span className="mt-2 block text-xs text-sand-200/70">Pendaratan</span>
                    <span className="block text-sm font-bold">{wizardResortData?.landing === 'wet' ? 'Basah (Wet)' : 'Kering (Dry)'}</span>
                    <span className="block text-[10px] text-sand-200/50">{wizardResortData?.beach}</span>
                  </div>
                </div>

                {/* Landing detail */}
                {wizardResortData && (
                  <div className={`mt-3 flex items-center gap-2 rounded-lg p-3 text-xs ${wizardResortData.landing === 'wet' ? 'bg-secondary-500/20 text-secondary-200' : 'bg-primary-500/30 text-sand-100'}`}>
                    {wizardResortData.landing === 'wet' ? <Droplets className="h-4 w-4" /> : <Waves className="h-4 w-4" />}
                    <span className="font-semibold">{wizardResortData.landingNote}</span>
                  </div>
                )}

                {/* Cashless reminder */}
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-warning-500/20 p-3 text-xs text-warning-200">
                  <CreditCard className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Fi Taman Laut di kaunter jeti 100% Cashless — wajib kad debit/kredit. Bawa kad bank fizikal & MyKad/passport.</span>
                </div>

                <Link
                  to="/#booking"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-accent-500 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-600"
                >
                  Tempah Semua Logistik Ini Sekali Gus
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="mt-2 text-center text-[10px] text-sand-200/50">
                  Laluan disyorkan: {wizardRoute.label} • {wizardRoute.steps.length} langkah ke pintu resort
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fee Table + Cashless Warning */}
      <section className="mt-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-sand-200">
            <div className="bg-primary-700 px-6 py-4 text-white">
              <h2 className="text-lg font-bold">Jadual Fee Rasmi Jeti Kuala Besut</h2>
              <p className="text-xs text-sand-200/80 mt-0.5">Kadar mengikut kewarganegaraan — wajib dibayar di kaunter jeti</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sand-200 bg-sand-50 text-left text-xs font-bold uppercase text-primary-500">
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3 text-center">Fi Akses Jeti</th>
                    <th className="px-4 py-3 text-center">Fi Taman Laut</th>
                    <th className="px-4 py-3 text-center">Jumlah/orang</th>
                    <th className="px-4 py-3">Kaedah Bayaran</th>
                  </tr>
                </thead>
                <tbody>
                  {feeTable.map((row) => (
                    <tr key={row.category} className="border-b border-sand-100 last:border-0">
                      <td className="px-4 py-3 font-semibold text-primary-700">{row.category}</td>
                      <td className="px-4 py-3 text-center font-bold text-primary-600">RM{row.jetiFee}</td>
                      <td className="px-4 py-3 text-center font-bold text-secondary-600">RM{row.marineParkFee}</td>
                      <td className="px-4 py-3 text-center text-base font-extrabold text-accent-600">RM{row.total}</td>
                      <td className="px-4 py-3 text-xs text-primary-500">{row.paymentMethods}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cashless Alert */}
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-warning-500/10 p-4 ring-1 ring-warning-500/30">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning-600 mt-0.5" />
            <div>
              <span className="block text-sm font-bold text-warning-700">Penting: Kaunter Taman Laut 100% Cashless</span>
              <span className="block text-xs text-warning-600/90 mt-0.5">
                Fi Taman Laut di Jeti Kuala Besut wajib dibayar menggunakan kad (Debit/Kredit/Visa/Mastercard).
                Tunai TIDAK diterima. Pastikan anda membawa kad bank fizikal — jangan tinggal dalam kereta!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Route Tabs + Timeline */}
      <section className="mt-12 px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-extrabold text-primary-700 sm:text-3xl">
            Garis Masa Langkah demi Langkah
          </h2>
          <p className="mt-2 text-center text-sm text-primary-500">
            Pilih laluan anda untuk melihat setiap fasa perjalanan lengkap dengan tip & tindakan.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {journeyRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = activeTab === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => setActiveTab(route.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    isActive
                      ? 'border-secondary-500 bg-secondary-50'
                      : 'border-sand-200 bg-white hover:border-secondary-300'
                  }`}
                >
                  <Icon className={`h-7 w-7 ${isActive ? 'text-secondary-600' : 'text-primary-400'}`} />
                  <span className={`text-sm font-bold ${isActive ? 'text-secondary-700' : 'text-primary-600'}`}>
                    {route.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Origin Options for selected route */}
          <div className="mt-5 flex flex-wrap gap-2">
            {selectedRoute.originOptions.map((origin) => (
              <span key={origin} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600 ring-1 ring-primary-100">
                {origin}
              </span>
            ))}
          </div>

          {/* Vertical Timeline */}
          <div className="mt-8 relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-sand-200 sm:left-8" />

            <div className="space-y-6">
              {selectedRoute.steps.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <div key={i} className="relative pl-16 sm:pl-20">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 flex h-12 w-12 items-center justify-center rounded-full ring-4 ring-sand-50 sm:h-16 sm:w-16 ${
                      step.warn ? 'bg-warning-500' : 'bg-primary-700'
                    }`}>
                      <StepIcon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                    </div>

                    {/* Step card */}
                    <div className={`rounded-2xl p-5 ring-1 transition-all hover:shadow-md ${
                      step.warn ? 'bg-warning-500/5 ring-warning-500/20' : 'bg-white ring-sand-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary-600">
                          {step.phase}
                        </span>
                        {step.warn && (
                          <span className="rounded-full bg-warning-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-warning-700">
                            Amaran
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 text-base font-bold text-primary-700">{step.title}</h3>
                      <p className="mt-1 text-sm text-primary-500 leading-relaxed">{step.description}</p>

                      {/* Tip box */}
                      <div className={`mt-3 flex items-start gap-2 rounded-lg p-3 text-xs ${
                        step.warn ? 'bg-warning-500/10 text-warning-700' : 'bg-secondary-50 text-secondary-700'
                      }`}>
                        {step.warn ? <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" /> : <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                        <span className="leading-relaxed">{step.tip}</span>
                      </div>

                      {/* CTA */}
                      {step.cta && (
                        <Link
                          to={step.cta.href}
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent-600"
                        >
                          {step.cta.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-10 rounded-2xl bg-primary-700 p-6 text-center text-white">
            <Ship className="mx-auto h-10 w-10 text-secondary-400" />
            <h3 className="mt-3 text-xl font-bold">Sedia Untuk Tempah?</h3>
            <p className="mt-1 text-sm text-sand-200/80">Tempah tiket bot, parking, dan transfer sekali gus dalam widget tempahan kami.</p>
            <Link
              to="/#booking"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-600"
            >
              Tempah Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
