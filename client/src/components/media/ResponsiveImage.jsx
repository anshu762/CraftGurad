import { useState } from 'react';

const THEME_PATTERNS = {
  kasuti:  { base: '#F3E7DB', accent: '#8C5A42', icon: '🧵' },
  ilkal:   { base: '#E8EDF0', accent: '#3B4A5A', icon: '🧶' },
  neutral: { base: '#EDE6DA', accent: '#A3432F', icon: '📷' },
};

/**
 * Responsive image with graceful fallback.
 * If `src` is missing, or the image fails to load, renders a branded,
 * on-theme placeholder instead of a broken-image icon or blank box.
 */
export default function ResponsiveImage({
  src,
  alt,
  aspect = '4/5',
  theme = 'neutral',
  label,
  priority = false,
  fill = false,
  className = '',
}) {
  const [errored, setErrored] = useState(!src);
  const pattern = THEME_PATTERNS[theme] || THEME_PATTERNS.neutral;

  const sizingClass = fill ? 'absolute inset-0 w-full h-full' : 'w-full';
  const sizingStyle = fill ? {} : { aspectRatio: aspect };

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${sizingClass} overflow-hidden flex items-center justify-center ${className}`}
        style={{
          ...sizingStyle,
          backgroundColor: pattern.base,
          backgroundImage: `repeating-linear-gradient(45deg, ${pattern.accent}22 0, ${pattern.accent}22 2px, transparent 2px, transparent 14px)`,
        }}
      >
        <div className="text-center px-4">
          <span className="block text-3xl mb-2" aria-hidden="true">{pattern.icon}</span>
          <span className="eyebrow !text-[11px] block" style={{ color: pattern.accent }}>
            {label || 'Documentation pending'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setErrored(true)}
      className={`${sizingClass} object-cover ${className}`}
      style={sizingStyle}
    />
  );
}