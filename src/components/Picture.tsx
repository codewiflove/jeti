import type { SiteImage } from '@/data/images';
import { srcSet } from '@/data/images';

interface Props {
  image: SiteImage;
  sizes: string;
  className?: string;
  priority?: boolean;
  alt?: string;
}

/** Responsive self-hosted image (AVIF → WebP fallback). Lazy by default. */
export default function Picture({ image, sizes, className, priority, alt }: Props) {
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />
      <img
        src={`${image.base}-960.webp`}
        srcSet={srcSet(image, 'webp')}
        sizes={sizes}
        alt={alt ?? image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        data-interim={image.interim || undefined}
        className={className}
      />
    </picture>
  );
}
