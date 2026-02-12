import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const baseClasses = [
  'inline-flex items-center justify-center font-semibold',
  'transition-all duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
].join(' ');

const variantClasses: Record<Variant, string> = {
  primary: [
    'bg-[#FF6B35] text-white',
    'hover:bg-[#e35f2d]',
    'focus-visible:ring-[#FF6B35]',
  ].join(' '),
  secondary: [
    'border border-gray-300 text-gray-900 bg-white',
    'hover:border-gray-400 hover:bg-gray-50',
    'focus-visible:ring-gray-400',
  ].join(' '),
  ghost: [
    'text-gray-700',
    'hover:text-[#025082]',
    'underline underline-offset-4',
  ].join(' '),
  dark: [
    'bg-white text-[#025082]',
    'hover:bg-gray-100',
    'focus-visible:ring-white',
  ].join(' '),
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
  xl: 'px-10 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
