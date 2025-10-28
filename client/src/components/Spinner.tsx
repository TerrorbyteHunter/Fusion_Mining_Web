// lightweight spinner wrapper around lucide Loader2
import { Loader2 } from 'lucide-react';

type Size = 'xs' | 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: Size;
  className?: string;
}

const sizeMap: Record<Size, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export default function Spinner({ size = 'sm', className = '' }: SpinnerProps) {
  return (
    <Loader2 className={`${sizeMap[size]} animate-spin ${className}`} aria-hidden />
  );
}

