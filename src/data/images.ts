/**
 * Site imagery. Every entry with `interim: true` is a free-licence Pexels stock photo,
 * self-hosted under /public/images (credits: public/images/CREDITS.md).
 * INTERIM: replace with real photos of Jeti Kuala Besut, our vans, parking and boats.
 * To swap: drop new files as /images/<key>-{480,960,1600}.{avif,webp} (or change `base`) and set interim: false.
 */
export interface SiteImage {
  base: string;
  alt: string;
  widths: number[];
  width: number;
  height: number;
  interim: boolean;
}

const img = (key: string, alt: string, width: number, height: number, widths = [480, 960, 1600]): SiteImage => ({
  base: `/images/${key}`, alt, widths, width, height, interim: true,
});

export const images = {
  hero: img('hero', 'Pandangan udara bot laju di air turquoise', 1600, 899),
  van: img('van', 'Van putih di kawasan parkir', 1600, 2400),
  counter: img('jetty-wood', 'Jeti kayu di atas air jernih', 1600, 2133),
  parking: img('parking', 'Kawasan parking kereta terbuka', 1600, 1067),
  facilities: img('village', 'Perkampungan pesisir pantai dan bot berlabuh', 1600, 900),
  boarding: img('boarding', 'Bot laju di laut turquoise berhampiran pulau', 1600, 2400),
  jetty: img('jetty-aerial', 'Pandangan udara jeti dan bot laju', 1600, 2843),
} satisfies Record<string, SiteImage>;

export function srcSet(i: SiteImage, ext: 'avif' | 'webp') {
  return i.widths.map((w) => `${i.base}-${w}.${ext} ${w}w`).join(', ');
}
