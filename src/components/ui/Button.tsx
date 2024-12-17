import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue',
            'disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-electric-purple/20 hover:bg-electric-purple/30 border border-electric-purple text-white hover:shadow-[0_0_15px_#9945FF]':
                variant === 'primary',
              'bg-gray-700/50 hover:bg-gray-700/70 text-white': variant === 'secondary',
              'border border-neon-blue bg-transparent hover:bg-neon-blue/10 text-neon-blue':
                variant === 'outline',
              'h-8 px-3 text-sm': size === 'sm',
              'h-10 px-4': size === 'md',
              'h-12 px-6 text-lg': size === 'lg',
            },
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;