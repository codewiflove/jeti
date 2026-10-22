import { UserRound } from 'lucide-react';

/** Neutral avatar: real photo if provided, else initials, else silhouette. Never stock faces. */
export default function Avatar({ name, photo, size = 'h-16 w-16' }: { name: string; photo?: string; size?: string }) {
  if (photo) return <img src={photo} alt={name} loading="lazy" className={`${size} shrink-0 rounded-full object-cover`} />;
  const initials = name.startsWith('[') ? '' : name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  return (
    <span aria-hidden className={`${size} flex shrink-0 items-center justify-center rounded-full bg-turq-50 font-display font-bold text-turq-800 ring-2 ring-white`}>
      {initials || <UserRound className="h-1/2 w-1/2" />}
    </span>
  );
}
