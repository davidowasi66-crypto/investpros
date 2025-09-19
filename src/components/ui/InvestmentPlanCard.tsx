
import React from 'react';
import { cn } from '@/lib/utils';
import HandDrawnButton from './HandDrawnButton';
import { ArrowRight } from 'lucide-react';

interface InvestmentPlanCardProps {
  title: string;
  percentage: number;
  duration: string;
  features: string[];
  popular?: boolean;
  className?: string;
}

const InvestmentPlanCard = ({
  title,
  percentage,
  duration,
  features,
  popular = false,
  className,
}: InvestmentPlanCardProps) => {
  return (
    <div 
      className={cn(
        'hand-drawn-card group relative',
        popular ? 'border-blue-500 border-3' : '',
        className
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white font-handwritten font-bold px-4 py-1 rounded-full border-2 border-black">
          Popular
        </div>
      )}
      
      <div className="mb-6 text-center">
        <h3 className="text-xl font-handwritten font-bold mb-2">{title}</h3>
        <div className="flex items-center justify-center">
          <span className="text-4xl font-bold text-blue-600">{percentage}%</span>
          <span className="text-lg text-gray-600 ml-2">/ {duration}</span>
        </div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M5 13l4 4L19 7" 
                className="group-hover:animate-hand-draw"
                style={{ strokeDasharray: '1000', strokeDashoffset: '0' }}
              />
            </svg>
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="text-center">
        <HandDrawnButton 
          variant={popular ? "primary" : "default"} 
          className="w-full font-handwritten group-hover:animate-wiggle"
        >
          Invest Now <ArrowRight className="ml-2 inline-block h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </HandDrawnButton>
      </div>
    </div>
  );
};

export default InvestmentPlanCard;
