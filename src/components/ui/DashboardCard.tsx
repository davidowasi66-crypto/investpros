
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  trend,
  className,
}: DashboardCardProps) => {
  return (
    <div className={cn('hand-drawn-card', className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
          
          {trend && (
            <div className={`flex items-center mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M12 7a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L12 4.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0112 7z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V2a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M12 13a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L12 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0112 13z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12 13a1 1 0 01-1-1V8a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-sm">{trend.value}%</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-gray-50 text-primary border border-gray-100">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
