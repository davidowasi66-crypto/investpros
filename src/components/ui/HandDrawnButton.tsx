
import React from 'react';
import { cn } from '@/lib/utils';

interface HandDrawnButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const HandDrawnButton = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: HandDrawnButtonProps) => {
  const variantStyles = {
    default: 'hand-drawn-btn bg-white text-black',
    primary: 'hand-drawn-btn bg-blue-500 text-white',
    secondary: 'hand-drawn-btn bg-gray-200 text-black',
    outline: 'hand-drawn-btn bg-transparent text-black',
  };

  const sizeStyles = {
    sm: 'text-sm px-4 py-1',
    md: 'text-base px-6 py-2',
    lg: 'text-lg px-8 py-3',
  };

  return (
    <button
      className={cn(variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default HandDrawnButton;
