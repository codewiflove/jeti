/**
 * "Kenali Team Jeti". PLACEHOLDERS — fill with real staff (with consent) then set TEAM_READY = true in flags.ts.
 * photo: path under /public/images/team/ (e.g. '/images/team/ali.webp'); leave undefined to show initials.
 */
export interface TeamMember {
  name: string;
  role: string;
  years: string;
  photo?: string;
  placeholder: boolean;
}

export const team: TeamMember[] = [
  { name: '[Sahkan: nama]', role: '[Sahkan: jawatan — cth kaunter tiket]', years: '[Sahkan: tahun pengalaman]', placeholder: true },
  { name: '[Sahkan: nama]', role: '[Sahkan: jawatan — cth pemandu van]', years: '[Sahkan: tahun pengalaman]', placeholder: true },
  { name: '[Sahkan: nama]', role: '[Sahkan: jawatan — cth jurumudi bot]', years: '[Sahkan: tahun pengalaman]', placeholder: true },
  { name: '[Sahkan: nama]', role: '[Sahkan: jawatan — cth penjaga parking]', years: '[Sahkan: tahun pengalaman]', placeholder: true },
];
