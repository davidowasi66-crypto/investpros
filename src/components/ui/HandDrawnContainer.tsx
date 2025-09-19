
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HandDrawnContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'dashed';
}

const HandDrawnContainer = ({
  children,
  className,
  variant = 'default',
  ...props
}: HandDrawnContainerProps) => {
  const variantStyles = {
    default: 'hand-drawn-container',
    outlined: 'hand-drawn-container border-dashed',
    dashed: 'hand-drawn-container border-dotted',
  };

  return (
    <div
      className={cn(variantStyles[variant], 'animate-fade-in', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default HandDrawnContainer;
