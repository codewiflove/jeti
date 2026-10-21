import { Waves, Clock, Sun, AlertTriangle } from 'lucide-react';

export default function JettyStatusBar() {
  const jettyStatus: 'open' | 'caution' | 'closed' = 'open';
  const waveHeight = '0.6 m';
  const nextBoat = '10:30';
  const today = new Date().toLocaleDateString('ms-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const statusConfig = {
    open: {
      label: 'Jeti Beroperasi',
      color: 'bg-success-500',
      textColor: 'text-white',
      icon: <Sun className="h-4 w-4" />,
    },
    caution: {
      label: 'Amaran Ombak Sederhana',
      color: 'bg-warning-500',
      textColor: 'text-primary-900',
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    closed: {
      label: 'Jeti Ditutup',
      color: 'bg-error-500',
      textColor: 'text-white',
      icon: <AlertTriangle className="h-4 w-4" />,
    },
  };

  const config = statusConfig[jettyStatus];

  return (
    <div className={`w-full ${config.color} ${config.textColor} text-xs sm:text-sm`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-4 gap-y-1 px-4 py-2 flex-wrap">
        <div className="flex items-center gap-2 font-semibold">
          {config.icon}
          <span>{config.label}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{today}</span>
        </div>
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4" />
          <span>Ombak: <strong>{waveHeight}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Bot seterusnya: <strong>{nextBoat}</strong></span>
        </div>
      </div>
    </div>
  );
}
