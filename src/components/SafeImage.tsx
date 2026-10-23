import { useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  /** A known local asset used when the requested image cannot be loaded. */
  fallbackSrc?: string;
}

/**
 * Keep image failures from becoming broken-image icons in the UI.
 * A new src automatically gets a fresh chance because failures are tracked
 * against the original src, not against the component instance.
 */
export default function SafeImage({
  src,
  fallbackSrc = '/og-image.jpg',
  onError,
  ...props
}: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const resolvedSrc = failedSrc === src ? fallbackSrc : src;

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    onError?.(event);
    if (resolvedSrc !== fallbackSrc) {
      setFailedSrc(src);
    }
  };

  return <img {...props} src={resolvedSrc} onError={handleError} />;
}
