
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) => {
  return (
    <div className={cn('hand-drawn-card group', className)}>
      <div className="p-3 rounded-full bg-blue-100 inline-block mb-4 text-blue-600 group-hover:animate-wiggle">
        {icon}
      </div>
      <h3 className="text-xl font-handwritten font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
