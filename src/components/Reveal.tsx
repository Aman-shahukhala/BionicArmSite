import type { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type RevealVariant = 'up' | 'scale' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  threshold,
  rootMargin,
}: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold, rootMargin });

  const baseClass =
    variant === 'scale'
      ? 'reveal-scale'
      : variant === 'left'
        ? 'reveal-left'
        : variant === 'right'
          ? 'reveal-right'
          : 'reveal';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
